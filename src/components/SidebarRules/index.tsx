import React, {FC, useContext, useEffect, useRef} from 'react';
// import {AnnotationsContext} from 'screens/Main';
import './SidebarRules.styles.scss';

export const SidebarRules: FC = () => {
  // const {annotations, currentOffset} = useContext(AnnotationsContext);
  const divRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   divRef.current?.scrollTo(0, 0);
  // }, [currentOffset]);

  return (
    <div ref={divRef} className="sidebar-rules">
      {/* {annotations.map((annotation, key) => {
        return (
          <div
            style={{
              top:
                annotation.payload.ref.current?.getBoundingClientRect().top || 0 + window.scrollY,
              position: 'absolute',
            }}
            key={key}
          >
            {annotation.payload.name}
          </div>
        );
      })} */}
      Sidebar Rules
    </div>
  );
};
