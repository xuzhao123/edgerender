import URLSearchParams from 'url-search-params';
import Cookie from './core/cookie';
import ResponseHelper from "./core/response-helper";

export interface Ctx {
  env: {
    urlParams: URLSearchParams;
    error?: string;
    [key: string]: any;
  };
  request: EW.ResponseProviderRequest;
  responseHelper: ResponseHelper;
  cookie: Cookie;
}