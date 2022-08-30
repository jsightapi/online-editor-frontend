import React, {useState, useEffect, useMemo, startTransition, useCallback, useContext} from 'react';
import clsx from 'clsx';
import {toast, ToastContainer} from 'react-toastify';
import {Resizable} from 're-resizable';
import {Editor} from 'components/Editor';
import {useDebounce} from 'hooks/useDebounce';
import {getJDocExchange} from 'api/getJDocExchange';
import {JDocType} from 'types/exchange';
import {MainContent} from 'components/MainContent';
import {Layout} from 'components/Layout';
import {showEditorError} from 'utils/showEditorError';
import {ErrorSimpleType, ErrorType} from 'types/error';
import {Header} from 'components/Header';
import {initCats, initDogs, initPigs} from './init';
import {Contacts} from 'components/Modals/Contacts';
import {HeaderDoc} from 'components/Header/HeaderDoc';
import {screenWidthMultiplier} from 'utils/screenWidthMultiplier';
import {editorModeType, ExamplesType, SidebarDocType} from 'types';
import {EditorContext, JDocContext, SidebarContext, SharingContext} from 'store';
import {CurrentUrlProvider} from 'store/CurrentUrlStore';
import {onOrientationChange} from 'utils/onOrientationChange';
import {ErrorScreen} from 'screens/Error';
import {SharingForm} from 'components/Modals/SharingForm';
import 'react-toastify/dist/ReactToastify.css';
import {HeaderMetaTags} from 'components/HeaderMetaTags';
import {AnnouncementBar} from 'components/AnnouncementBar';
import './Editor.styles.scss';

const {isExport} = window as any;

const SCROLLBAR_WIDTH = 20;

export const EditorScreen = () => {
  const {key, history} = useContext(SharingContext);
  const [viewMode, setViewMode] = useState<editorModeType>(isExport ? 'doc' : 'editor');
  const [jsightCode, setJsightCode] = useState<string>(
    key ? '' : localStorage.getItem('jsightCode') || initCats
  );
  // left sidebar
  const [codeContentsSidebar] = useState<boolean>(false);
  //documentation sidebar on the right
  const [currentDocSidebar, setCurrentDocSidebar] = useState<SidebarDocType>(null);
  const [jdocExchange, setJdocExchange] = useState<JDocType>();
  const [errorRow, setErrorRow] = useState<number | null>(null);
  const [scrollToRow, setScrollToRow] = useState<boolean>(false);
  const jsightCodeDebounced = useDebounce<string>(jsightCode, 600);
  const [reloadEditor, setReloadEditor] = useState<boolean>(false);
  const [contactModalVisible, setContactModalVisible] = useState<boolean>(false);
  const [sharingModalVisible, setSharingModalVisible] = useState<boolean>(false);
  const [error, setError] = useState<ErrorSimpleType | null>(null);
  const [disableSharing, setDisableSharing] = useState<boolean>(true);
  const isEditor = useMemo(() => viewMode === 'editor', [viewMode]);
  const [isShowAnnouncementBar, setIsShowAnnouncementBar] = useState<boolean>(
    !localStorage.getItem('announcement.bar.hidden')
  );

  const handleCloseAnnouncementBar = () => {
    setIsShowAnnouncementBar(false);
    localStorage.setItem('announcement.bar.hidden', 'true');
  };

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

  useEffect(() => {
    const changeWidth = () => {
      const width = getEditorWidth(screenWidth);
      localStorage.setItem('editorWidth', width.toString());
      setEditorWidth(width);
    };

    onOrientationChange(changeWidth);
  });

  useEffect(() => {
    if (jsightCodeDebounced !== undefined) {
      (async () => {
        if (!isExport) {
          try {
            const jdocExchange = await getJDocExchange(jsightCodeDebounced);
            startTransition(() => setJdocExchange(jdocExchange));
            toast.dismiss();
            setErrorRow(null);
          } catch (error) {
            showEditorError(error as ErrorType, () => {
              if (!(error as ErrorType).Line) {
                return;
              }

              setScrollToRow(true);
              setTimeout(() => setScrollToRow(false), 500);
            });
            (error as ErrorType).Line && setErrorRow((error as ErrorType).Line);
          } finally {
            localStorage.setItem('jsightCode', jsightCodeDebounced);
          }
        } else {
          // @ts-ignore
          setJdocExchange(window?.jdoc);
        }
      })();
    }
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

  const setInitialContent = (content: ExamplesType) => {
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

  const goToEditor = () => {
    setError(null);
    history.push('/');
  };

  const openSharingModal = () => {
    setSharingModalVisible(true);
  };

  const handleCurrentDocSidebar = useCallback((sidebar: SidebarDocType) => {
    setCurrentDocSidebar((prev) => (prev === sidebar ? null : sidebar));
  }, []);

  const handleJsightCode = useCallback((code: string) => setJsightCode(code), []);
  const handleDisableSharing = useCallback((value) => setDisableSharing(value), []);
  const handleError = useCallback((error) => setError(error), []);
  const handleReloadedEditor = useCallback(() => reloadedEditor(), []);

  const sidebarValue = useMemo(
    () => ({
      currentDocSidebar,
      setCurrentDocSidebar,
    }),
    [currentDocSidebar]
  );

  const editorValue = useMemo(
    () => ({
      editorWidth,
      isEditor,
    }),
    [isEditor, editorWidth]
  );

  if (error && error.code) {
    return <ErrorScreen goToEditor={goToEditor} code={error.code} message={error.message} />;
  }

  return (
    <JDocContext.Provider value={jdocExchange}>
      <HeaderMetaTags />
      <AnnouncementBar
        handleCloseClick={handleCloseAnnouncementBar}
        isShow={isShowAnnouncementBar}
      />
      {!isExport ? (
        <div className={'p-relative'}>
          {isEditor ? (
            <Header
              disableSharing={disableSharing}
              setInitialContent={setInitialContent}
              setViewMode={setViewMode}
              setContactModalVisible={setContactModalVisible}
              openSharingModal={openSharingModal}
            />
          ) : (
            <HeaderDoc openSharingModal={openSharingModal} setViewMode={setViewMode} />
          )}
        </div>
      ) : (
        <div />
      )}
      <div
        style={{top: isShowAnnouncementBar ? 97 : 64}}
        className={clsx('d-flex editor-wrapper', {
          'only-doc': !isEditor,
          exported: isExport,
        })}
      >
        <EditorContext.Provider value={editorValue}>
          <div className={classes}>
            <Resizable
              bounds="parent"
              style={{display: isEditor ? 'block' : 'none'}}
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
                errorRow={errorRow}
                scrollToRow={scrollToRow}
                reload={reloadEditor}
                setContent={handleJsightCode}
                setDisableSharing={handleDisableSharing}
                setError={handleError}
                reloadedEditor={handleReloadedEditor}
              />
            </Resizable>
            <div
              className="doc"
              style={{
                width: getDocWidth(screenWidth),
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
                    onClick={() => handleCurrentDocSidebar('content')}
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
        </EditorContext.Provider>
        <ToastContainer rtl={false} position="bottom-right" />
      </div>
      {!isExport && (
        <Contacts modalIsOpen={contactModalVisible} onClose={() => setContactModalVisible(false)} />
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
