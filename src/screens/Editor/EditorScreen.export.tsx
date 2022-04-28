import React, {useState, FC, useEffect, useMemo, useCallback, startTransition} from 'react';
import clsx from 'clsx';
import {toast, ToastContainer} from 'react-toastify';
import {JDocType} from 'api/getResources.model';
import {MainContent} from 'components/MainContent';
import {Layout} from 'components/Layout';
import './Editor.styles.scss';
import 'react-toastify/dist/ReactToastify.css';
import {ContactForm} from 'components/Modals/ContactForm';
import {HeaderDoc} from 'components/Header/HeaderDoc.export';
import {screenWidthMultiplier} from 'utils/screenWidthMultiplier';
import {editorModeType, ErrorType, SidebarDocType} from 'types';
import {JDocContext, SidebarContext} from 'store';
import {getJDocExchange} from 'api/getJDocExchange';
import {showError} from 'utils/getError';
import {useDebounce} from 'hooks/useDebounce';
import {initCats} from 'screens/Editor/initCats';

const {isExport} = window as any;

const SCROLLBAR_WIDTH = 20;

export const EditorScreen: FC = () => {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<editorModeType>(isExport ? 'doc' : 'editor');
  // left sidebar
  const [codeContentsSidebar] = useState<boolean>(false);
  //documentation sidebar on the right
  const [currentDocSidebar, setCurrentDocSidebar] = useState<SidebarDocType>(null);
  const [jsightCode] = useState<string>(localStorage.getItem('jsightCode') || initCats);
  const [jdocExchange, setJdocExchange] = useState<JDocType>();
  const jsightCodeDebounced = useDebounce<string>(jsightCode, 600);
  const [contactModalVisible, setContactModalVisible] = useState<boolean>(false);
  const isEditor = useMemo(() => viewMode === 'editor', [viewMode]);

  const screenWidth = window.innerWidth;
  const getEditorWidth = (screenWidth: number) => {
    return (screenWidth / 2 - SCROLLBAR_WIDTH) / screenWidthMultiplier(screenWidth);
  };

  const editorWidthFinal =
    localStorage.getItem('oldScreenWidth') === screenWidth.toString()
      ? localStorage.getItem('editorWidth') || getEditorWidth(screenWidth)
      : getEditorWidth(screenWidth);

  const [editorWidth] = useState<number | string>(editorWidthFinal);

  useEffect(() => {
    const oldScreenWidth = localStorage.getItem('oldScreenWidth');
    if (screenWidth.toString() !== oldScreenWidth) {
      localStorage.setItem('oldScreenWidth', screenWidth.toString());
    }
  });

  useEffect(() => {
    (async () => {
      if (!isExport) {
        try {
          const jdocExchange = await getJDocExchange(jsightCodeDebounced);
          startTransition(() => setJdocExchange(jdocExchange));
          toast.dismiss();
        } catch (error) {
          showError(error as ErrorType, () => {
            if (!(error as ErrorType).Line) {
              return;
            }
          });
        } finally {
          localStorage.setItem('jsightCode', jsightCodeDebounced);
        }
      } else {
        // @ts-ignore
        setJdocExchange(window?.jdoc);
      }
    })();
    // eslint-disable-next-line
  }, [jsightCodeDebounced]);

  const classes = useMemo(
    () =>
      clsx({
        'editor-wrapper-inner': true,
        'rules-sidebar': currentDocSidebar === 'rules',
        'content-sidebar': currentDocSidebar === 'content',
        'code-sidebar': codeContentsSidebar,
      }),
    [codeContentsSidebar, currentDocSidebar]
  );

  const setDocSidebar = useCallback((sidebar: SidebarDocType) => {
    setCurrentDocSidebar((prev) => (prev === sidebar ? null : sidebar));
  }, []);

  return (
    <JDocContext.Provider value={jdocExchange}>
      {!isExport && <HeaderDoc setViewMode={setViewMode} />}
      <div
        className={clsx('d-flex editor-wrapper', {
          'only-doc': !isEditor,
          exported: isExport,
        })}
      >
        <SidebarContext.Provider
          value={{
            editorWidth: 0,
            currentDocSidebar,
            setCurrentDocSidebar,
            currentUrl,
            setCurrentUrl,
          }}
        >
          <div className={classes}>
            <div
              className="doc"
              style={{
                width: typeof editorWidth === 'string' ? parseInt(editorWidth) : editorWidth,
              }}
            >
              {jdocExchange ? (
                <Layout
                  isShowSidebar={isEditor ? currentDocSidebar === 'content' : true}
                  isShowSettings={!isEditor}
                  side={isEditor ? 'right' : 'left'}
                >
                  <MainContent jdocExchange={jdocExchange} showRightSidebar={!!currentDocSidebar} />
                </Layout>
              ) : (
                <div className="flex-fluid" />
              )}
              {isEditor && (
                <div className="side-panel right-side">
                  <div
                    onClick={() => setDocSidebar('content')}
                    className={clsx('side-panel-element', {
                      active: currentDocSidebar === 'content',
                    })}
                  >
                    <i className="icon-list" /> Contents
                  </div>
                </div>
              )}
            </div>
          </div>
        </SidebarContext.Provider>
        <ToastContainer rtl={true} position="bottom-right" />
      </div>
      <ContactForm
        modalIsOpen={contactModalVisible}
        onClose={() => setContactModalVisible(false)}
      />
    </JDocContext.Provider>
  );
};

export default EditorScreen;
