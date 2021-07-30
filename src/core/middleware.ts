/**
 * Middleware Manager
 */
class MiddlewareManager {
  middlewares: Function[] = [];

  use(middleware) {
    if (typeof middleware !== 'function') {
      throw new TypeError('Middleware must be composed of functions!');
    }

    this.middlewares.push(middleware);
    // this.middlewares.splice(this.middlewares.length - 1, 0, middleware);
  }

  run(ctx, next?) {
    const { middlewares } = this;
    let index = -1;

    return dispatch(0);
    function dispatch(i) {
      if (i <= index) {
        return Promise.reject(new Error('next() called multiple times'));
      }
      index = i;
      let fn = middlewares[i];
      if (i === middlewares.length) {
        fn = next;
      }

      if (!fn) {
        return Promise.resolve();
      }

      try {
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }
}

export default MiddlewareManager;