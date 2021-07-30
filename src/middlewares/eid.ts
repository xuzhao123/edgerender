import { Ctx } from "../types";

const eid = async (ctx: Ctx, next) => {
  const { cookie } = ctx;
  let eid = cookie.get('e_id');
  if (!eid) {
    const ran = Math.random();
    if (ran > 0.9) {
      eid = 'pt100';
    } else if (ran > 0.8) {
      eid = 'pt90';
    } else if (ran > 0.7) {
      eid = 'pt80';
    } else if (ran > 0.6) {
      eid = 'pt70';
    } else if (ran > 0.5) {
      eid = 'pt60';
    } else {
      eid = 'pt50';
    }

    cookie.set(eid, 'e_id');
  }

  await next();
};

export default eid;