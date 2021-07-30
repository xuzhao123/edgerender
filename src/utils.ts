
import { httpRequest } from 'http-request';

async function pushStream(controller, rs) {
  const reader = rs.getReader();
  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    controller.enqueue(value);
  }
}

function request({
  url,
  data = {},
  headers = {},
}) {
  const params = Object.keys(data).map(key => {
    if (data[key] == null) {
      return;
    }
    return `${key}=${data[key]}`;
  }).filter(Boolean).join('&');
  let requestUrl = url;
  if (params) {
    requestUrl += (url.indexOf('?') !== -1 ? '&' : '?') + params;
  }

  return httpRequest(requestUrl, { headers })
}

const utils = {
  pushStream,
  request,
}

export default utils;
