import { ReadableStream, WritableStream } from 'streams';
import { TextEncoderStream, TextDecoderStream } from 'text-encode-transform';
import utils from '../utils';
import { Ctx } from "../types";

const render = async (ctx: Ctx, next) => {
  const { cookie, request, env, responseHelper } = ctx;
  const productId = env.urlParams.get('productId');

  // request html template from server
  const htmlRequest = utils.request({
    url: `https://m.aliexpress.com/item/${productId}.html`,
    headers: {
      referer: 'https://m.aliexpress.com',
      cookie: cookie.current(),
    }
  });

  // subRequest data from server
  const dataRequest = utils.request({
    url: `https://m.aliexpress.com/api/products/${productId}/fetch/function`,
    data: {
      pageName: 'fc-detail-msite',
      pageVersion: '41242c3f3f108b939a35f90b0cd9ad07'
    },
    headers: {
      referer: 'https://m.aliexpress.com',
      cookie: cookie.current(),
    }
  });

  let error;
  const htmlResponse = await htmlRequest.catch(e => {
    error = 'render html request error' + e.toString();
  });

  const readStream = new ReadableStream({
    async start(controller) {
      try {
        const htmlText = await htmlResponse?.text();

        if (!htmlText) {
          controller.enqueue(error);
          return;
        }

        const headTexts = htmlText.split('</head>');
        controller.enqueue(headTexts[0].replace('<head>', `<head>
          <script>
            window._init_data_={};
            window._edge_render_ = true;
          </script>
        `
        ));

        const dataResponse = await dataRequest;

        controller.enqueue(`<script> var _init_data_ = `);
        await utils.pushStream(controller, dataResponse.body.pipeThrough(new TextDecoderStream()));
        controller.enqueue(`;
        window.__INIT_DATA_CALLBACK__ = function (success, error) {
          success(window._init_data_);
        };
        </script>`);

        controller.enqueue('</head>');
        controller.enqueue(headTexts[1] || '');
      } catch (e) {
        controller.enqueue(e);
      }

      controller.close();
    }
  });

  responseHelper.setStatus(htmlResponse?.status);
  responseHelper.setBody(readStream.pipeThrough(new TextEncoderStream()))

  await next();
};

export default render;