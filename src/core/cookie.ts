/**
 * Cookie Manager
 */
import { Cookies, SetCookie } from 'cookies';
import ResponseHelper from './response-helper';

class Cookie {
  cookies: Cookies;
  responseHelper: ResponseHelper;
  cookieQueue = {};

  constructor({
    request,
    responseHelper
  }: {
    request: EW.ResponseProviderRequest,
    responseHelper
  }) {
    this.cookies = new Cookies(request.getHeader('Cookie'));
    this.responseHelper = responseHelper;
  }

  current() {
    return this.cookies.toHeader();
  }

  get(key: string, name?: string) {
    const cookie = this.cookies.get(key) || '';
    if (!name) {
      return cookie;
    }

    const cookieReg = new RegExp('(.*&?' + name + '=)(.*?)(&.*|$)');
    return cookie.match(cookieReg)?.[2] || '';
  }

  set(value: string, key: string, name?: string) {
    const cookie = new SetCookie();
    cookie.name = key;
    if (!name) {
      cookie.value = value;
    } else {
      let cookieStr = this.cookies.get(key) || '';

      const cookieRegExp = new RegExp('(.*&?' + name + '=)(.*?)(&.*|$)');
      if (cookieRegExp.test(cookieStr)) {
        cookieStr = RegExp.$1 + value + RegExp.$3;
      } else {
        cookieStr = (cookieStr ? cookieStr + '&' : '') + (name + '=' + value);
      }
      cookie.value = cookieStr;
    }

    this.cookies.add(key, cookie.value);
    this.responseHelper.setHeader('Set-Cookie', cookie.toHeader());
  }
}

export default Cookie;