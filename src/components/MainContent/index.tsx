import React, {FC, useRef, useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import {MainRouterParams} from 'types/router';
import {ApiInfo} from 'components/ApiInfo';
import {ServersInfo} from 'components/ServersInfo';
import {getTreeResources} from 'api/getResources';
import {Resource} from 'components/Resource';
import {isEqual, map} from 'lodash';
import {ReusableResource} from 'components/Resource/ReusableResource';
import {JDocType} from 'api/getResources.model';
import {Virtuoso} from 'react-virtuoso';
import {SidebarContext, MainContext} from 'store';
import {ResourceState, SchemaViewType, SelectedLineType} from 'store/MainStore';
import {usePrevious} from 'hooks/usePrevious';

import './MainContent.styles.scss';

interface MainContentProps {
  jdocExchange: JDocType;
  showRightSidebar: boolean;
}

export const MainContent: FC<MainContentProps> = React.memo(
  ({jdocExchange, showRightSidebar}) => {
    const divRef = useRef<HTMLDivElement | null>(null);
    const virtuosoRef = useRef<any>(null);
    const [selectedLine, setSelectedLine] = useState<SelectedLineType | null>(null);
    const [jdocList, setJdocList] = useState<JSX.Element[]>([]);
    const [jdocPositions, setJdocPositions] = useState<any>([]);
    const {path} = useParams<MainRouterParams>();
    const {currentUrl, currentDocSidebar, setCurrentDocSidebar} = useContext(SidebarContext);
    const [overscan, setOverscan] = useState(480);
    const [schemasView, setSchemasView] = useState<SchemaViewType[]>([]);
    const [resourceState, setResourceState] = useState<ResourceState[]>([]);

    const prevPath = usePrevious(path);
    const prevCurrentUrl = usePrevious(currentUrl);

    const {isExport} = window as any;

    useEffect(() => {
      setOverscan(window.innerHeight / 2);
    }, []);

    useEffect(() => {
      if (currentDocSidebar === 'content') {
        setSelectedLine(null);
      }
    }, [currentDocSidebar]);

    const updateSchemaView = (
      keyBlock: string,
      value: any,
      property: 'collapsedRules' | 'expandedTypes' | 'viewType' | 'expandDetailCard'
    ) => {
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

    useEffect(() => {
      const {info, servers, tags, resourceMethods, userTypes, userEnums} = jdocExchange;
      const resources = getTreeResources(tags, resourceMethods);

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

      if (resources.length) {
        let index = 0;
        resources.map((item, resourceIndex) => {
          jdocList.push(
            <div className="group-header">
              <h2>{item.title}</h2>
              <hr />
            </div>
          );
          jdocPositions.push('resources');

          item.resources.map((resource: any, itemIndex: number) => {
            jdocList.push(
              <Resource
                resourceKey={`${resourceIndex}-${itemIndex}`}
                key={`${resourceIndex}-${itemIndex}-${resource.path}`}
                resource={resource}
                index={index + itemIndex}
              />
            );
            jdocPositions.push(`${resource.path.slice(1).replace(/({|})/gi, '-')}`);
            setResourceState((prev) => [...prev, {method: ''}]);
          });
          index += item.resources.length;
        });
      }

      if (userTypes) {
        jdocList.push(
          <div className="group-header">
            <h2>Types</h2>
          </div>
        );
        jdocPositions.push('types');

        map(jdocExchange.userTypes, (userType, key) => {
          jdocList.push(
            <ReusableResource
              name={key}
              key={`reusable-type-${key}`}
              keyBlock={`rut-${key}`}
              className="type-resource"
              {...userType}
            />
          );
          jdocPositions.push(key);
        });
      }

      if (userEnums) {
        jdocList.push(
          <div className="group-header">
            <h2>Enums</h2>
          </div>
        );

        map(jdocExchange.userEnums, (userEnum, key) =>
          jdocList.push(
            <ReusableResource
              keyBlock={`rue-${key}`}
              content={userEnum.value}
              name={key}
              key={`reusable-enum-${key}`}
            />
          )
        );
      }

      setJdocList(jdocList);
      setJdocPositions(jdocPositions);
    }, [jdocExchange]);

    useEffect(() => {
      const currentPath = isExport ? currentUrl : path;
      if (!currentPath) return;

      const index = jdocPositions.indexOf(`${currentPath?.replace(/({|})/gi, '-')}`);

      if (~index && virtuosoRef?.current && (prevCurrentUrl !== currentUrl || prevPath !== path)) {
        virtuosoRef.current.scrollToIndex({
          index: index + 1,
          align: 'start',
          behavior: 'auto',
        });
      }
    }, [path, currentUrl, virtuosoRef, jdocPositions]);

    return (
      <div className="main-content-wrapper">
        <div ref={divRef} className="main-content">
          <MainContext.Provider
            value={{
              showRightSidebar,
              selectedLine,
              setSelectedLine,
              schemasView,
              setExpandDetailCard,
              setCollapsedRules,
              setExpandedTypes,
              setViewType,
              resourceState,
              setResourceState,
            }}
          >
            {currentDocSidebar === 'rules' && (
              <button
                className="sidebar-rules-close"
                onClick={() => {
                  setCurrentDocSidebar(null);
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
              increaseViewportBy={overscan}
            />
          </MainContext.Provider>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.showRightSidebar === nextProps.showRightSidebar &&
    isEqual(prevProps.jdocExchange, nextProps.jdocExchange)
);
