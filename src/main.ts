
import { createResponse } from 'create-response';
import URLSearchParams from 'url-search-params';
import { logger } from 'log';
import Middleware from './core/middleware';
import ResponseHelper from './core/response-helper';
import Cookie from './core/cookie';
import cookieMiddleware from './middlewares/cookie';
import renderMiddleware from './middlewares/render';
import eidMiddleware from './middlewares/eid';
import { Ctx } from './types';

const getEnv = (request) => {
  return {
    urlParams: new URLSearchParams(request.query),
  }
}

const middleware = new Middleware();
middleware.use(cookieMiddleware);
middleware.use(eidMiddleware);
middleware.use(renderMiddleware);

export async function responseProvider(request: EW.ResponseProviderRequest) {
  const env = getEnv(request);
  const responseHelper = new ResponseHelper();
  const cookie = new Cookie({
    request,
    responseHelper
  });

  const ctx: Ctx = {
    env,
    request,
    responseHelper,
    cookie
  };

  logger.log('middleware start');
  try {
    await middleware.run(ctx);
  } catch (e) {
    ctx.env.error = JSON.stringify({
      success: false,
      message: e.toString()
    });
  }
  logger.log('middleware end');

  if (!responseHelper.body) {
    responseHelper.setBody(JSON.stringify(ctx.env));
  }

  return createResponse(
    responseHelper.getStatus(),
    responseHelper.getHeader(),
    responseHelper.getBody(),
  );
}
