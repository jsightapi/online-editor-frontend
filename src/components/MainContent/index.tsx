import React, {useRef, useState, useEffect, useContext, useMemo, Fragment} from 'react';
import {Virtuoso, VirtuosoHandle} from 'react-virtuoso';
import {compact, each, groupBy, map, mapValues} from 'lodash';
import {useParams} from 'react-router-dom';
import {MainRouterParams} from 'types/router';
import {ApiInfo} from 'components/ApiInfo';
import {ServersInfo} from 'components/ServersInfo';
import {SchemaData} from 'components/CodeView/Code';
import {ReusableResource} from 'components/Resource/ReusableResource';
import {HttpInteractionType, JDocType, JsonRpcInteractionType} from 'types/exchange';
import {MainContext, GlobalSettingsContext, SidebarContext, CurrentUrlContext} from 'store';
import {ResourceState, SchemaViewType, SelectedLineType} from 'store/MainStore';
import {emptySchemaData} from 'utils/emptySchemaData';
import {HttpResource} from 'components/Resource/Http';
import './MainContent.styles.scss';
import {JsonRpcHeader} from 'components/Resource/JsonRpc/JsonRpcHeader';
import {JsonRpcResource} from 'components/Resource/JsonRpc';
import clsx from 'clsx';
import {editorModeType, ErrorType} from 'types';
import {Button} from 'components/Button';

import IconCopy from 'assets/images/icons/copy.svg';
import {toast} from 'react-toastify';
import {notificationIds} from 'utils/notificationIds';
import {convertJsight} from 'api/convertJsight';
import {showEditorError} from 'utils/showEditorError';

type SchemaPropertyType =
  | 'collapsedRules'
  | 'expandedTypes'
  | 'viewType'
  | 'expandDetailCard'
  | 'typeBlock';

interface MainContentProps {
  jdocExchange?: JDocType;
  jdocExchangeError?: boolean;
  jsightCode?: string;
  viewMode?: editorModeType;
}

export const MainContent = React.memo((props: MainContentProps) => {
  const {jdocExchange, jdocExchangeError, jsightCode, viewMode} = props;
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const virtuosoScrollerRef = useRef<any>(null);
  const [selectedLine, setSelectedLine] = useState<SelectedLineType | null>(null);
  const [jdocList, setJdocList] = useState<JSX.Element[]>([]);
  const [jdocPositions, setJdocPositions] = useState<string[]>([]);
  const {path} = useParams<MainRouterParams>();
  const {headersBodiesTypesCode, pathQueriesCode, typesExpand, rulesExpand} = useContext(
    GlobalSettingsContext
  );
  const {currentUrl, setCurrentUrl} = useContext(CurrentUrlContext);
  const {currentDocSidebar, setCurrentDocSidebar, currentOpenApiFormat} = useContext(
    SidebarContext
  );
  const [overscan, setOverscan] = useState(480);
  const [schemasView, setSchemasView] = useState<SchemaViewType[]>([]);
  const [schemasData, setSchemasData] = useState<{[key: string]: SchemaData[]}>({});
  const [resourceState, setResourceState] = useState<ResourceState[]>([]);

  const [openApiContent, setOpenApiContent] = useState<string>('');
  const [openApiLinesCount, setOpenApiLinesCount] = useState<number | undefined>();
  const [isOpenApiContentLoading, setIsOpenApiContentLoading] = useState<boolean>(false);

  // @ts-ignore
  window['mainContent'] = virtuosoRef;

  const showRightSidebar = useMemo(() => !!currentDocSidebar, [currentDocSidebar]);

  const copyToClipboard = () => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText && openApiContent) {
      navigator.clipboard.writeText(openApiContent);

      toast.success('OpenAPI copied', {
        toastId: notificationIds.SUCCESS_MESSAGE_DEFAULT_ID,
        position: 'bottom-center',
        className: 'notification-success success',
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        icon: <i className="icon-check" />,
      });

      return Promise.resolve();
    }

    return Promise.reject('The Clipboard API is not available.');
  };

  useEffect(() => {
    if (!currentUrl && path) {
      const currentPath = path[0] !== '@' ? '/' + path : path;
      const index = jdocPositions.indexOf(`${currentPath.replace(/({|})/gi, '-')}`);

      if (~index && virtuosoRef?.current) {
        virtuosoRef.current.scrollToIndex({
          index: index + 1,
          align: 'start',
          behavior: 'auto',
        });
        setCurrentUrl(path);
      }
    }
  }, [path, jdocPositions]);

  useEffect(() => {
    setSchemasView((prev) => {
      return prev.map((item) => {
        if (item.typeBlock === 'header-body') {
          item['viewType'] = headersBodiesTypesCode ? 'code' : 'table';
        }
        return item;
      });
    });
  }, [headersBodiesTypesCode]);

  useEffect(() => {
    setSchemasView((prev) => {
      return prev.map((item) => {
        if (item.typeBlock === 'path-query') {
          item['viewType'] = pathQueriesCode ? 'code' : 'table';
        }
        return item;
      });
    });
  }, [pathQueriesCode]);

  useEffect(() => {
    setSchemasView((prev) => {
      return prev.map((item) => {
        return {
          ...item,
          expandedTypes: typesExpand,
        };
      });
    });

    if (!typesExpand) {
      setSchemasData((prev) => {
        return mapValues(prev, () => {
          return [emptySchemaData];
        });
      });
    }
  }, [typesExpand]);

  useEffect(() => {
    setSchemasView((prev) => {
      return prev.map((item) => {
        return {
          ...item,
          collapsedRules: !rulesExpand,
        };
      });
    });
  }, [rulesExpand]);

  useEffect(() => {
    setOverscan(window.innerHeight / 2);
  }, []);

  useEffect(() => {
    if (currentDocSidebar === 'openapi') {
      toast.dismiss(notificationIds.ERROR_MESSAGE_HTMLDOC_ID);
    } else if (currentDocSidebar === 'htmldoc') {
      toast.dismiss(notificationIds.ERROR_MESSAGE_OPENAPI_ID);
    }
  }, [currentDocSidebar]);

  useEffect(() => {
    if (currentDocSidebar === 'openapi' && currentOpenApiFormat) {
      const convert = async () => {
        try {
          setIsOpenApiContentLoading(true);
          const result = await convertJsight(jsightCode, 'openapi-3.0.3', currentOpenApiFormat);
          setOpenApiContent(result as string);
          setIsOpenApiContentLoading(false);
          toast.dismiss();
        } catch (error) {
          showEditorError(error as ErrorType, notificationIds.ERROR_MESSAGE_OPENAPI_ID, () => {
            if (!(error as ErrorType).Line) {
              return;
            }
          });
        }
      };

      convert();
    }
  }, [currentDocSidebar, currentOpenApiFormat, jsightCode]);

  const updateSchemaView = (keyBlock: string, value: any, property: SchemaPropertyType) => {
    setSchemasView((prev) => {
      if (prev.find((item) => item.key === keyBlock)) {
        return prev.map((item) => {
          if (item.key === keyBlock) {
            item[property] = value;
            return item;
          }
          return item;
        });
      } else {
        const schemaView: SchemaViewType = {key: keyBlock};
        schemaView[property] = value;
        return [...prev, schemaView];
      }
    });
  };

  const setCollapsedRules = (keyBlock: string, value: boolean) => {
    updateSchemaView(keyBlock, value, 'collapsedRules');
  };

  const setExpandedTypes = (keyBlock: string, value: boolean) => {
    updateSchemaView(keyBlock, value, 'expandedTypes');
  };

  const setViewType = (keyBlock: string, value: string) => {
    updateSchemaView(keyBlock, value, 'viewType');
  };

  const setExpandDetailCard = (keyBlock: string, value: boolean) => {
    updateSchemaView(keyBlock, value, 'expandDetailCard');
  };

  const setTypeBlock = (keyBlock: string, value: string | undefined) => {
    updateSchemaView(keyBlock, value, 'typeBlock');
  };

  useEffect(() => {
    if (jdocExchange) {
      const {info, servers, tags, interactions, userTypes, userEnums} = jdocExchange;
      const jdocList: JSX.Element[] = [];
      const jdocPositions: string[] = [];
      jdocList.push(<div className="space-header" />);

      if (info) {
        jdocList.push(<ApiInfo apiInfo={info} key="apiInfo" />);
        jdocPositions.push('info');
      }

      if (servers) {
        jdocList.push(<ServersInfo serversInfo={servers} key="servers" />);
        jdocPositions.push('servers');
      }

      if (Object.values(tags).length > 0) {
        let index = 0;
        each(tags, (tag, tagKey) => {
          if (tag.interactionGroups.find((item) => item.protocol === 'json-rpc-2.0')) {
            jdocList.push(<JsonRpcHeader title={tag.title} />);
          } else {
            jdocList.push(
              <div>
                <h2 className="resource-header">{tag.title}</h2>
                <div className="resource-wrapper">
                  <div className="resource-spacer" />
                </div>
              </div>
            );
          }
          jdocPositions.push(`resource-${tagKey}`);

          tag.interactionGroups.forEach((interactionGroup) => {
            if (interactionGroup.protocol === 'http') {
              each(
                groupBy(
                  compact(
                    interactionGroup.interactions.map((interaction) =>
                      interactions.hasOwnProperty(interaction) ? interactions[interaction] : null
                    )
                  ),
                  'path'
                ),
                (interactionsByPath, interactionPath) => {
                  const resourceKey = `${interactionPath.replace(/({|})/gi, '-')}`;
                  jdocList.push(
                    <HttpResource
                      resourceKey={`${tagKey}-${resourceKey}`}
                      path={interactionPath}
                      index={index}
                      key={resourceKey}
                      interactions={interactionsByPath as HttpInteractionType[]}
                    />
                  );
                  jdocPositions.push(resourceKey);
                  setResourceState((prev) => [...prev, {method: ''}]);
                  index++;
                }
              );
            } else if (interactionGroup.protocol === 'json-rpc-2.0') {
              interactionGroup.interactions.forEach((interaction) => {
                if (interactions.hasOwnProperty(interaction)) {
                  const resource = interactions[interaction] as JsonRpcInteractionType;
                  const resourceKey = `${resource.path.replace(/({|})/gi, '-')}-${resource.method}`;

                  jdocList.push(
                    <JsonRpcResource interaction={resource} resourceKey={resourceKey} />
                  );
                  jdocPositions.push(resourceKey);
                }
              });
            }
          });
        });
      }

      if (userTypes) {
        jdocList.push(<h2 className="reusable-header">Types</h2>);
        jdocPositions.push('types');

        map(jdocExchange.userTypes, (userType, key) => {
          jdocList.push(
            <ReusableResource
              name={key}
              key={`reusable-type-${key}`}
              keyBlock={`rut-${key}`}
              className="reusable-resource"
              {...userType}
            />
          );
          jdocPositions.push(key);
        });
      }

      if (userEnums) {
        jdocList.push(<h2 className="reusable-header">Enums</h2>);

        map(jdocExchange.userEnums, (userEnum, key) => {
          jdocList.push(
            <ReusableResource
              name={key}
              annotation={userEnum.annotation}
              description={userEnum.description}
              key={`reusable-enum-${key}`}
              keyBlock={`rue-${key}`}
              content={userEnum.value}
              className="reusable-resource"
            />
          );
          jdocPositions.push(key);
        });
      }
      setJdocList(jdocList);
      setJdocPositions(jdocPositions);

      // @ts-ignore
      window['jdocPositions'] = jdocPositions;
    }
    return () => {
      setResourceState([]);
    };
  }, [jdocExchange]);

  useEffect(() => {
    const count = openApiContent.match(new RegExp('\n', 'g'))?.length || 1;
    setOpenApiLinesCount(count);
  }, [openApiContent]);

  const value = useMemo(
    () => ({
      showRightSidebar,
      selectedLine,
      schemasView,
      schemasData,
      resourceState,
      setSelectedLine,
      setExpandDetailCard,
      setCollapsedRules,
      setExpandedTypes,
      setViewType,
      setResourceState,
      setTypeBlock,
      setSchemasData,
    }),
    [selectedLine, schemasView, schemasData, resourceState]
  );

  const mainContentClasses = clsx('main-content', {
    scrollable: currentDocSidebar === 'openapi',
    disabled:
      (currentDocSidebar === 'openapi' && isOpenApiContentLoading) ||
      (currentDocSidebar === 'htmldoc' && jdocExchangeError),
  });

  return (
    <div className="main-content-wrapper">
      <div className={mainContentClasses}>
        {currentDocSidebar === 'openapi' && viewMode !== 'doc' && (
          <div className="openapi-wrapper">
            <div className="openapi-lines">
              {Array.from(Array(openApiLinesCount).keys()).map((num) => (
                <Fragment key={num + 1}>
                  {num + 1}
                  <br />
                </Fragment>
              ))}
            </div>
            <pre className="openapi-content">{openApiContent}</pre>
            <Button className="openapi-copy" title="Copy all" onClick={copyToClipboard}>
              Copy all
              <img src={IconCopy} alt="Copy all" />
            </Button>
          </div>
        )}
        {(currentDocSidebar !== 'openapi' || viewMode === 'doc') && (
          <MainContext.Provider value={value}>
            {currentDocSidebar === 'rules' && (
              <button
                style={{
                  right: `${
                    virtuosoScrollerRef.current?.offsetWidth -
                    virtuosoScrollerRef.current?.clientWidth +
                    45
                  }px`,
                }}
                className="sidebar-rules-close"
                onClick={() => {
                  setCurrentDocSidebar('htmldoc');
                  setSelectedLine(null);
                }}
              >
                <i className="icon-close" />
              </button>
            )}
            <Virtuoso
              data={jdocList}
              itemContent={(_, item) => item}
              ref={virtuosoRef}
              scrollerRef={(ref) => (virtuosoScrollerRef.current = ref)}
              increaseViewportBy={overscan}
            />
          </MainContext.Provider>
        )}
      </div>
    </div>
  );
});
