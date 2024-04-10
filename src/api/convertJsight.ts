import {ConvertDestinationType, OpenApiFormatType} from 'types/converter';
import {runRequest} from 'utils/runRequest';
import {v4 as uuidv4} from 'uuid';
import {convertJsightUrl} from './baseUrl';

export const convertJsight = (
  body = '',
  to: ConvertDestinationType,
  format?: OpenApiFormatType
) => {
  const uuid = localStorage.getItem('uuid') || '';

  if (!uuid) {
    localStorage.setItem('uuid', uuidv4());
  }

  const isOpenApi = to === 'openapi-3.0.3';

  const headers = {
    'X-Browser-UUID': uuid,
    'Content-Type': 'text/plain',
  };

  let url = `${convertJsightUrl}?to=${to}`;

  if (format) url += `&format=${format}`;

  return runRequest(url, {body, headers}, {responseAsText: isOpenApi});
};
