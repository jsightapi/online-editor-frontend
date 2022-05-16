import {createNewState, updateState} from 'api/codeSharing';
import {useHistory, useParams} from 'react-router-dom';
import {MainRouterParams} from 'types';

export function useSharing() {
  const history = useHistory();
  const {key} = useParams<MainRouterParams>();

  const createState = () => {
    const content = localStorage.getItem('jsightCode');

    if (content) {
      createNewState(content).then((response) => {
        history.push(`/r/${response.code}/${response.version}`);
      });
    }
  };

  const updateExistState = () => {
    const content = localStorage.getItem('jsightCode');

    if (content) {
      updateState(key, content).then((response) => {
        history.push(`/r/${response.code}/${response.version}`);
      });
    }
  };

  return [createState, updateExistState];
}
