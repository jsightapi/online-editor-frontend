import React, {useState, useEffect, useMemo, useCallback, startTransition} from 'react';
import clsx from 'clsx';
import {toast, ToastContainer} from 'react-toastify';
import {JDocType} from 'types/exchange';
import {MainContent} from 'components/MainContent';
import {Layout} from 'components/Layout';
import './Editor.styles.scss';
import 'react-toastify/dist/ReactToastify.css';
import {Contacts} from 'components/Modals/Contacts';
import {screenWidthMultiplier} from 'utils/screenWidthMultiplier';
import {editorModeType, ErrorType, HtmlDocPanelType, SidebarDocType} from 'types';
import {JDocContext, SidebarContext, EditorContext, CurrentUrlProvider} from 'store';
import {showEditorError} from 'utils/showEditorError';
import {useDebounce} from 'hooks/useDebounce';
import {initCats} from 'screens/Editor/initCats';
import {convertJsight} from 'api/convertJsight';
import {notificationIds} from 'utils/notificationIds';

const {isExport} = window as any;

const SCROLLBAR_WIDTH = 20;

export const EditorScreen = () => {
  const viewMode: editorModeType = isExport ? 'doc' : 'editor';
  const jsightCode: string = localStorage.getItem('jsightCode') || initCats;
  const codeContentsSidebar = false;

  //documentation sidebar on the right
  const [currentDocSidebar, setCurrentDocSidebar] = useState<SidebarDocType>('htmldoc');
  const [currentHtmlDocPanel, setCurrentHtmlDocPanel] = useState<HtmlDocPanelType>('none');
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
          const jdocExchange = await convertJsight(jsightCodeDebounced, 'jdoc-2.0');
          startTransition(() => setJdocExchange(jdocExchange as JDocType));
          toast.dismiss();
        } catch (error) {
          showEditorError(error as ErrorType, notificationIds.ERROR_MESSAGE_DEFAULT_ID, () => {
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
        'rules-sidebar': currentHtmlDocPanel === 'rules',
        'content-sidebar': currentHtmlDocPanel === 'content',
        'code-sidebar': codeContentsSidebar,
      }),
    [codeContentsSidebar, currentHtmlDocPanel]
  );

  const handleCurrentHtmlDocPanel = useCallback((htmldocpanel: HtmlDocPanelType) => {
    setCurrentHtmlDocPanel((prev) => (prev === htmldocpanel ? 'none' : htmldocpanel));
  }, []);

  const jdocValue = useMemo(
    () => ({
      jdocExchange,
      jsightCode: jsightCodeDebounced,
    }),
    [jdocExchange, jsightCodeDebounced]
  );

  const sidebarValue = useMemo(
    () => ({
      currentDocSidebar,
      setCurrentDocSidebar,
      currentHtmlDocPanel,
      setCurrentHtmlDocPanel,
    }),
    [currentDocSidebar, currentHtmlDocPanel]
  );

  const editorValue = useMemo(
    () => ({
      editorWidth,
      isEditor,
    }),
    [isEditor, editorWidth]
  );

  return (
    <JDocContext.Provider value={jdocValue}>
      <div
        className={clsx('d-flex editor-wrapper', {
          'only-doc': !isEditor,
          exported: isExport,
        })}
      >
        <EditorContext.Provider value={editorValue}>
          <div className={classes}>
            <div
              className="doc"
              style={{
                width: typeof editorWidth === 'string' ? parseInt(editorWidth) : editorWidth,
              }}
            >
              <CurrentUrlProvider>
                <SidebarContext.Provider value={sidebarValue}>
                  <Layout isEditor={isEditor}>
                    <MainContent jdocExchange={jdocExchange} />
                  </Layout>
                </SidebarContext.Provider>
              </CurrentUrlProvider>
              {isEditor && (
                <div className="side-panel right-side">
                  <div
                    onClick={() => handleCurrentHtmlDocPanel('content')}
                    className={clsx('side-panel-element', {
                      active: currentHtmlDocPanel === 'content',
                    })}
                  >
                    <i className="icon-list" /> Contents
                  </div>
                </div>
              )}
            </div>
          </div>
        </EditorContext.Provider>
        <ToastContainer rtl={true} position="bottom-right" />
      </div>
      <Contacts modalIsOpen={contactModalVisible} onClose={() => setContactModalVisible(false)} />
    </JDocContext.Provider>
  );
};

export default EditorScreen;
