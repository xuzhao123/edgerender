/**
 * Response Manager
 */
import { ReadableStream } from 'streams';

class ResponseHelper {
  status: number = 200;
  headers: {
    [key: string]: string[]
  } = {};
  body: string | ReadableStream = 'testtt';

  getStatus() {
    return this.status;
  }

  setStatus(status) {
    this.status = status;
  }

  getHeader() {
    return this.headers;
  }

  setHeader(name, header) {
    if (this.headers[name]) {
      this.headers[name].push(header);
    } else {
      this.headers[name] = [header];
    }
  }

  setHeaders(headers) {
    Object.keys(headers).forEach(key => {
      Object.assign(this.headers, {
        [key]: headers[key],
      })
    })
  }

  setBody(body) {
    this.body = body;
  }

  getBody() {
    return this.body;
  }
}

export default ResponseHelper;