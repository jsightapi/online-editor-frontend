import React, {
  useState,
  FC,
  useEffect,
  useMemo,
  createContext,
  startTransition,
  useCallback,
} from 'react';
import clsx from 'clsx';
import {toast, ToastContainer} from 'react-toastify';
import {Resizable} from 're-resizable';
import {Editor} from 'components/Editor';
import {useDebounce} from 'hooks/useDebounce';
import {getJDocExchange} from 'api/getJDocExchange';
import {JDocType} from 'api/getResources.model';
import {MainContent} from 'components/MainContent';
import {Layout} from 'components/Layout';
import {showError} from 'utils/getError';
import {ErrorType} from 'types/error';
import {Header} from 'components/Header';
import {initCats} from 'screens/Editor/initCats';
import {initDogs} from 'screens/Editor/initDogs';
import {initPigs} from 'screens/Editor/initPigs';
import './Editor.styles.scss';
import 'react-toastify/dist/ReactToastify.css';
import {ContactForm} from 'components/Modals/ContactForm';
import {HeaderDoc} from 'components/Header/HeaderDoc';
import {AppProps} from 'App';
import {screenWidthMultiplier} from 'utils/screenWidthMultiplier';

const {isExport} = window as any;

const SCROLLBAR_WIDTH = 20;

export type SidebarDocType = 'content' | 'rules' | null;

interface SidebarContextInterface {
  currentDocSidebar: SidebarDocType;
  setCurrentDocSidebar: React.Dispatch<React.SetStateAction<SidebarDocType>>;
  currentUrl: string | null;
  setCurrentUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

export type editorModeType = 'editor' | 'doc';

export const JDocContext = createContext({} as JDocType | undefined);
export const SidebarContext = createContext({} as SidebarContextInterface);

export const EditorScreen: FC<AppProps> = ({onlyDoc}) => {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<editorModeType>(onlyDoc || isExport ? 'doc' : 'editor');
  // left sidebar
  const [codeContentsSidebar] = useState<boolean>(false);
  //documentation sidebar on the right
  const [currentDocSidebar, setCurrentDocSidebar] = useState<SidebarDocType>(null);
  const [jsightCode, setJsightCode] = useState<string>(
    localStorage.getItem('jsightCode') || initCats
  );
  const [jdocExchange, setJdocExchange] = useState<JDocType>();
  const [errorRow, setErrorRow] = useState<number | undefined>();
  const [scrollToRow, setScrollToRow] = useState<boolean>(false);
  const jsightCodeDebounced = useDebounce<string>(jsightCode, 600);
  const [reloadEditor, setReloadEditor] = useState<boolean>(false);
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

  const [editorWidth, setEditorWidth] = useState<number | string>(editorWidthFinal);

  const onEditorResize = (ref: HTMLElement) => {
    const newWidth = ref.getBoundingClientRect().width / screenWidthMultiplier(screenWidth);
    localStorage.setItem('editorWidth', newWidth.toString());
    setEditorWidth(newWidth);
  };

  const setContent = (value: string) => {
    startTransition(() => setJsightCode(value));
  };

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
          setErrorRow(undefined);
        } catch (error) {
          showError(error as ErrorType, () => {
            if (!(error as ErrorType).Line) {
              return;
            }

            setScrollToRow(true);
            setTimeout(() => setScrollToRow(false), 500);
          });
          (error as ErrorType).Line && setErrorRow((error as ErrorType).Line);
        } finally {
          localStorage.setItem('jsightCode', jsightCodeDebounced);
          setReloadEditor(false);
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

  const setInitJsightCode = (code: string) => {
    setJsightCode(code);
    setReloadEditor(true);
  };

  const setInitialContent = (content: string) => {
    localStorage.removeItem('jsightCode');
    switch (content) {
      case 'cats':
        setInitJsightCode(initCats);
        return;
      case 'dogs':
        setInitJsightCode(initDogs);
        return;
      case 'pigs':
        setInitJsightCode(initPigs);
        return;
      default:
        setInitJsightCode(initCats);
        return;
    }
  };

  const setDocSidebar = useCallback((sidebar: SidebarDocType) => {
    setCurrentDocSidebar((prev) => (prev === sidebar ? null : sidebar));
  }, []);

  return (
    <JDocContext.Provider value={jdocExchange}>
      {!isExport &&
        (isEditor ? (
          <Header
            setInitialContent={setInitialContent}
            setViewMode={setViewMode}
            setContactModalVisible={setContactModalVisible}
          />
        ) : (
          <HeaderDoc setViewMode={setViewMode} />
        ))}
      <div
        className={clsx('d-flex editor-wrapper', {
          'only-doc': !isEditor,
          exported: isExport,
        })}
      >
        <SidebarContext.Provider
          value={{currentDocSidebar, setCurrentDocSidebar, currentUrl, setCurrentUrl}}
        >
          <div className={classes}>
            {isEditor && (
              <Resizable
                bounds="parent"
                boundsByDirection={false}
                minWidth="0.5vw"
                minHeight="100%"
                handleStyles={{
                  left: {cursor: 'default'},
                  top: {cursor: 'default'},
                  bottom: {cursor: 'default'},
                }}
                size={{width: editorWidth, height: 'auto'}}
                onResizeStop={(e, dir, ref) => onEditorResize(ref)}
              >
                <Editor
                  content={jsightCode}
                  setContent={setContent}
                  errorRow={errorRow}
                  scrollToRow={scrollToRow}
                  reload={reloadEditor}
                />
              </Resizable>
            )}
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
