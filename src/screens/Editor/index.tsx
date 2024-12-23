import React, {
  useState,
  useEffect,
  useMemo,
  startTransition,
  useCallback,
  useContext,
  useRef,
} from 'react';
import clsx from 'clsx';
import {toast, ToastContainer} from 'react-toastify';
import {Resizable} from 're-resizable';
import {Editor} from 'components/Editor';
import {useDebounce} from 'hooks/useDebounce';
import {JDocType} from 'types/exchange';
import {MainContent} from 'components/MainContent';
import {Layout} from 'components/Layout';
import {showEditorError} from 'utils/showEditorError';
import {ErrorSimpleType, ErrorType} from 'types/error';
import {Header} from 'components/Header';
import {initCats, initDogs, initPigs, initJsonRpc} from './init';
import {Contacts} from 'components/Modals/Contacts';
import {HeaderDoc} from 'components/Header/HeaderDoc';
import {screenWidthMultiplier} from 'utils/screenWidthMultiplier';
import {
  editorModeType,
  ExamplesType,
  OpenApiFormatType,
  SidebarDocType,
  HtmlDocPanelType,
} from 'types';
import {EditorContext, JDocContext, SidebarContext, SharingContext} from 'store';
import {CurrentUrlProvider} from 'store/CurrentUrlStore';
import {onOrientationChange} from 'utils/onOrientationChange';
import {notificationIds} from 'utils/notificationIds';
import {ErrorScreen} from 'screens/Error';
import {SharingForm} from 'components/Modals/SharingForm';
import 'react-toastify/dist/ReactToastify.css';
import {AnnouncementBar} from 'components/AnnouncementBar';
import {convertJsight} from 'api/convertJsight';

import IconOpenAPI from 'assets/images/icons/openapi.svg';
import IconHTMLDoc from 'assets/images/icons/htmldoc.svg';
import IconContents from 'assets/images/icons/contents.svg';

import './Editor.styles.scss';
import {getExistingState} from 'api/codeSharing';
import {getDefaultErrorMessages} from 'utils/getError';

const {isExport} = window as any;

const SCROLLBAR_WIDTH = 20;

export const EditorScreen = () => {
  const {key, version, history} = useContext(SharingContext);
  const [viewMode, setViewMode] = useState<editorModeType>(isExport ? 'doc' : 'editor');
  const [jsightCode, setJsightCode] = useState<string>(
    key ? '' : localStorage.getItem('jsightCode') || initCats
  );
  const [jdocExchangeError, setJdocExchangeError] = useState(false);
  // left sidebar
  const [codeContentsSidebar] = useState<boolean>(false);
  //documentation sidebar on the right
  const [currentDocSidebar, setCurrentDocSidebar] = useState<SidebarDocType>('openapi');
  const [currentOpenApiFormat, setCurrentOpenApiFormat] = useState<OpenApiFormatType>('yaml');
  const [currentHtmlDocPanel, setCurrentHtmlDocPanel] = useState<HtmlDocPanelType>('none');
  const [openApiContent, setOpenApiContent] = useState<string>('');
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
  const [isJdocLoading, setIsJdocLoading] = useState<boolean>(false);
  const [isShowAnnouncementBar, setIsShowAnnouncementBar] = useState<boolean>(
    !localStorage.getItem('announcement.bar.hidden')
  );
  const dontUpdateSharingBtn = useRef<boolean>(false);

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
    dontUpdateSharingBtn.current = false;
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

  const updateJdocExchange = useCallback(
    async (
      jsightCodeDebounced: string,
      currentDocSidebar: SidebarDocType,
      currentOpenApiFormat?: OpenApiFormatType
    ) => {
      if (isExport) {
        // @ts-ignore
        setJdocExchange(window?.jdoc);
        return;
      }

      try {
        setIsJdocLoading(true);
        if (currentDocSidebar === 'openapi') {
          const content =
            jsightCodeDebounced === ''
              ? ''
              : await convertJsight(jsightCodeDebounced, 'openapi-3.0.3', currentOpenApiFormat);
          startTransition(() => setOpenApiContent(content as string));
        } else {
          const content = await convertJsight(jsightCodeDebounced, 'jdoc-2.0');
          startTransition(() => setJdocExchange(content as JDocType));
        }
        toast.dismiss();
        setErrorRow(null);
        setJdocExchangeError(false);
        setIsJdocLoading(false);
      } catch (error) {
        showEditorError(
          error as ErrorType,
          currentDocSidebar === 'openapi'
            ? notificationIds.ERROR_MESSAGE_OPENAPI_ID
            : notificationIds.ERROR_MESSAGE_HTMLDOC_ID,
          () => {
            if (!(error as ErrorType).Line) {
              return;
            }

            setScrollToRow(true);
            setTimeout(() => setScrollToRow(false), 500);
          }
        );
        (error as ErrorType).Line && setErrorRow((error as ErrorType).Line);
        setJdocExchangeError(true);
      } finally {
        localStorage.setItem('jsightCode', jsightCodeDebounced);
      }
    },
    []
  );

  useEffect(() => {
    const changeWidth = () => {
      const width = getEditorWidth(screenWidth);
      localStorage.setItem('editorWidth', width.toString());
      setEditorWidth(width);
    };

    onOrientationChange(changeWidth);
  });

  useEffect(() => {
    if (key) {
      getExistingState(key, version)
        .then((result) => {
          dontUpdateSharingBtn.current = true;
          setInitJsightCode(result.data.content);
          !version && history.push(`/r/${result.code}/${result.version}`);
        })
        .catch(({Code: code}) => code && setError({code, message: getDefaultErrorMessages(code)}));
    } else {
      setDisableSharing(false);
    }
  }, [history, key, version]);

  useEffect(() => {
    // JSight document changed
    // or sidebar tab switched
    // or OpenAPI format changed
    updateJdocExchange(jsightCodeDebounced, currentDocSidebar, currentOpenApiFormat);
  }, [jsightCodeDebounced, currentDocSidebar, currentOpenApiFormat, updateJdocExchange]);

  useEffect(() => {
    if (viewMode === 'doc') {
      // switched from Editor to Preview
      updateJdocExchange(jsightCodeDebounced, 'htmldoc');
    }
  }, [viewMode, jsightCodeDebounced, updateJdocExchange]);

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
      case 'json-rpc':
        setInitJsightCode(initJsonRpc);
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
    setCurrentDocSidebar((prev) => (prev === sidebar ? 'htmldoc' : sidebar));
  }, []);

  const handleCurrentHtmlDocPanel = useCallback((htmldocpanel: HtmlDocPanelType) => {
    setCurrentHtmlDocPanel((prev) => (prev === htmldocpanel ? 'none' : htmldocpanel));
  }, []);

  const handleJsightCode = useCallback((code: string) => {
    setJsightCode(code);
    if (!dontUpdateSharingBtn.current) {
      setDisableSharing(false);
    }
  }, []);
  const handleReloadedEditor = useCallback(() => reloadedEditor(), []);

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
      currentOpenApiFormat,
      setCurrentOpenApiFormat,
      currentHtmlDocPanel,
      setCurrentHtmlDocPanel,
    }),
    [currentDocSidebar, currentOpenApiFormat, currentHtmlDocPanel]
  );

  const editorValue = useMemo(
    () => ({
      editorWidth,
      isEditor,
    }),
    [isEditor, editorWidth]
  );

  const topOffset = useMemo(() => (isShowAnnouncementBar ? 97 : 64), [isShowAnnouncementBar]);

  if (error && error.code) {
    return <ErrorScreen goToEditor={goToEditor} code={error.code} message={error.message} />;
  }

  return (
    <JDocContext.Provider value={jdocValue}>
      <AnnouncementBar
        handleCloseClick={handleCloseAnnouncementBar}
        isShow={isShowAnnouncementBar}
      />
      {!isExport ? (
        <div className={'p-relative'}>
          {isEditor ? (
            <SidebarContext.Provider value={sidebarValue}>
              <Header
                disableSharing={disableSharing}
                setInitialContent={setInitialContent}
                setViewMode={setViewMode}
                setContactModalVisible={setContactModalVisible}
                openSharingModal={openSharingModal}
                sharingContent={jsightCode}
              />
            </SidebarContext.Provider>
          ) : (
            <HeaderDoc openSharingModal={openSharingModal} setViewMode={setViewMode} />
          )}
        </div>
      ) : (
        <div />
      )}
      <div
        style={{top: topOffset, height: `calc(100% - ${topOffset}px)`}}
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
                reloadedEditor={handleReloadedEditor}
                globalTestId="jsightEditor"
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
                    <MainContent
                      openApiContent={openApiContent}
                      jdocExchange={jdocExchange}
                      disabled={isJdocLoading || jdocExchangeError}
                      viewMode={viewMode}
                    />
                  </Layout>
                </SidebarContext.Provider>
              </CurrentUrlProvider>
              {isEditor && (
                <div className="side-panel right-side">
                  <div
                    onClick={() =>
                      currentDocSidebar !== 'openapi' && handleCurrentDocSidebar('openapi')
                    }
                    className={clsx('side-panel-element', {
                      active: currentDocSidebar === 'openapi',
                    })}
                  >
                    <img src={IconOpenAPI} alt="OpenAPI" /> OpenAPI
                  </div>
                  <div
                    onClick={() => handleCurrentDocSidebar('htmldoc')}
                    className={clsx('side-panel-element', {
                      active: currentDocSidebar === 'htmldoc',
                    })}
                  >
                    <img src={IconHTMLDoc} alt="HTMLDoc" /> HTML Doc
                  </div>
                  <div
                    onClick={() =>
                      currentDocSidebar !== 'openapi' && handleCurrentHtmlDocPanel('content')
                    }
                    className={clsx('side-panel-element', {
                      active: currentHtmlDocPanel === 'content',
                      disabled: currentDocSidebar === 'openapi',
                    })}
                    title={
                      currentDocSidebar === 'openapi' ? 'Not available while in OpenAPI view' : ''
                    }
                  >
                    <img src={IconContents} alt="Contents" /> Contents
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
