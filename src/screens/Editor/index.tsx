import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useMemo,
  startTransition,
  useCallback,
  useContext,
} from 'react';
import clsx from 'clsx';
import {toast, ToastContainer} from 'react-toastify';
import {Resizable} from 're-resizable';
import {Editor} from 'components/Editor';
import {useDebounce} from 'hooks/useDebounce';
import {getJDocExchange} from 'api/getJDocExchange';
import {JDocType} from 'types/exchange';
import {MainContent} from 'components/MainContent';
import {Layout} from 'components/Layout';
import {showError} from 'utils/showError';
import {ErrorType} from 'types/error';
import {Header} from 'components/Header';
import {initCats} from 'screens/Editor/initCats';
import {initDogs} from 'screens/Editor/initDogs';
import {initPigs} from 'screens/Editor/initPigs';
import './Editor.styles.scss';
import 'react-toastify/dist/ReactToastify.css';
import {ContactForm} from 'components/Modals/ContactForm';
import {HeaderDoc} from 'components/Header/HeaderDoc';
import {screenWidthMultiplier} from 'utils/screenWidthMultiplier';
import {editorModeType, SidebarDocType} from 'types';
import {JDocContext, SidebarContext} from 'store';
import {onOrientationChange} from 'utils/onOrientationChange';
import {useHistory} from 'react-router-dom';
import {getExistingState} from 'api/codeSharing';
import {ErrorScreen} from 'screens/Error';
import {SharingForm} from 'components/Modals/SharingForm';
import {SharingContext} from 'store/SharingStore';
import {getDefaultErrorMessages} from 'utils/getError';

const {isExport} = window as any;

const SCROLLBAR_WIDTH = 20;

export const EditorScreen = () => {
  const {key, version} = useContext(SharingContext);

  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<editorModeType>(isExport ? 'doc' : 'editor');
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
  const [sharingModalVisible, setSharingModalVisible] = useState<boolean>(false);
  const [error, setError] = useState<{code: number; message: string} | null>(null);
  const [disableSharing, setDisableSharing] = useState<boolean>(false);
  const isEditor = useMemo(() => viewMode === 'editor', [viewMode]);
  const history = useHistory();

  const screenWidth = window.innerWidth;
  const getEditorWidth = (screenWidth: number) => {
    return (screenWidth / 2 - SCROLLBAR_WIDTH) / screenWidthMultiplier(screenWidth);
  };

  const getDocWidth = (screenWidth: number) => {
    const editorWidthNumber = typeof editorWidth === 'string' ? parseInt(editorWidth) : editorWidth;
    return screenWidth - editorWidthNumber;
  };

  const reloadedEditor = () => {
    setReloadEditor(false);
  };

  const editorWidthFinal = () => localStorage.getItem('editorWidth') || getEditorWidth(screenWidth);

  const [editorWidth, setEditorWidth] = useState<number | string>(editorWidthFinal());

  const onEditorResize = (ref: HTMLElement) => {
    const newWidth = ref.getBoundingClientRect().width / screenWidthMultiplier(screenWidth);
    const screenWidthWithMultiplier = screenWidth / screenWidthMultiplier(screenWidth);
    const minWidth = screenWidthWithMultiplier * 0.2;
    const maxWidth = screenWidthWithMultiplier * 0.8;
    const finalNewWidth =
      newWidth > maxWidth ? maxWidth : newWidth < minWidth ? minWidth : newWidth;
    localStorage.setItem('editorWidth', finalNewWidth.toString());
    setEditorWidth(finalNewWidth);
  };

  const setContent = (value: string) => {
    startTransition(() => {
      setJsightCode(value);
    });
    setDisableSharing(false);
  };

  useLayoutEffect(() => {
    if (key) {
      (async () => {
        try {
          const result = await getExistingState(key, version);
          setJsightCode(result.data.content.replace('\\n', '\n'));
          setReloadEditor(true);
          setDisableSharing(true);
        } catch (error) {
          if (error.Code) {
            setError({
              code: error.Code,
              message: error.Message || getDefaultErrorMessages(error.Code),
            });
          }
        }
      })();
    }
  }, [key, version]);

  useEffect(() => {
    const changeWidth = () => {
      const width = getEditorWidth(screenWidth);
      localStorage.setItem('editorWidth', width.toString());
      setEditorWidth(width);
    };

    onOrientationChange(changeWidth);
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

  const goToEditor = () => {
    setError(null);
    history.push('/');
  };

  const openSharingModal = () => {
    setSharingModalVisible(true);
  };

  if (error && error.code) {
    return <ErrorScreen goToEditor={goToEditor} code={error.code} message={error.message} />;
  }

  return (
    <JDocContext.Provider value={jdocExchange}>
      {!isExport ? (
        isEditor ? (
          <Header
            disableSharing={disableSharing}
            setInitialContent={setInitialContent}
            setViewMode={setViewMode}
            setContactModalVisible={setContactModalVisible}
            openSharingModal={openSharingModal}
          />
        ) : (
          <HeaderDoc openSharingModal={openSharingModal} setViewMode={setViewMode} />
        )
      ) : (
        <div />
      )}
      <div
        className={clsx('d-flex editor-wrapper', {
          'only-doc': !isEditor,
          exported: isExport,
        })}
      >
        <SidebarContext.Provider
          value={{editorWidth, currentDocSidebar, setCurrentDocSidebar, currentUrl, setCurrentUrl}}
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
                  reloadedEditor={reloadedEditor}
                />
              </Resizable>
            )}
            <div
              className="doc"
              style={{
                width: getDocWidth(screenWidth),
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
        <ToastContainer rtl={false} position="bottom-right" />
      </div>
      {!isExport && (
        <ContactForm
          modalIsOpen={contactModalVisible}
          onClose={() => setContactModalVisible(false)}
        />
      )}
      <SharingForm
        modalIsOpen={sharingModalVisible}
        onClose={() => {
          setSharingModalVisible(false);
          setDisableSharing(true);
        }}
      />
    </JDocContext.Provider>
  );
};

export default EditorScreen;
