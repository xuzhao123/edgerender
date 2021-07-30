import { getInfoByDomain } from "../domain-util";
import { Ctx } from "../types";

const cookie = async (ctx: Ctx, next) => {
  const { env, cookie } = ctx;
  const siteCookie = cookie.get('aep_usuc_f', 'site');
  const domain = env.urlParams.get('domain') || '';
  const { site } = getInfoByDomain(domain);
  if (site !== siteCookie) {
    cookie.set(site, 'aep_usuc_f', 'site');
  }

  await next();
};

export default cookie;