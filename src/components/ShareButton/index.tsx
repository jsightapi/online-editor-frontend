import React, {useMemo} from 'react';
import {Button} from 'components/Button';
import {useSharing} from 'hooks/useSharing';
import {useParams} from 'react-router-dom';
import {MainRouterParams} from 'types';
import clsx from 'clsx';
import {Dropdown} from 'components/Dropdown';
import {DropdownToggle} from 'components/Dropdown/DropdownToggle';
import {DropdownMenu} from 'components/Dropdown/DropdownMenu';
import './ShareButton.styles.scss';

interface ShareButtonProps {
  openSharingModal(): void;
}

export const ShareButton: React.FC<ShareButtonProps> = ({openSharingModal}) => {
  const [createState, updateExistState] = useSharing();
  const {key, version} = useParams<MainRouterParams>();
  const isAbleUpdate = useMemo(() => key && version, [key, version]);

  const handleNewState = (updateOrCreateState: () => void) => {
    updateOrCreateState();
    openSharingModal();
  };

  return isAbleUpdate ? (
    <div className="group-share-button">
      <Dropdown>
        <DropdownToggle>
          <div>
            Share
            <i className="icon-link" />
          </div>
          <div>
            <i className="icon-arrow-down" />
          </div>
        </DropdownToggle>
        <DropdownMenu offsetX={-160}>
          <div className="menu-item" onClick={() => handleNewState(updateExistState)}>
            <div>
              <i className="icon-upload" />
            </div>
            <div>
              <div className="title">Update API</div>
              <div className="description">Save as a new version of the same API</div>
            </div>
          </div>
          <hr />
          <div className="menu-item" onClick={() => handleNewState(createState)}>
            <div>
              <i className="icon-plus" />
            </div>
            <div>
              <div className="title">Save API</div>
              <div className="description">Save as a completely new API</div>
            </div>
          </div>
        </DropdownMenu>
      </Dropdown>
    </div>
  ) : (
    <Button
      icon="link"
      className={clsx('share-button')}
      onClick={() => handleNewState(createState)}
    >
      Share
    </Button>
  );
};
