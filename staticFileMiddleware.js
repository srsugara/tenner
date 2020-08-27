import {Context, send} from 'https://deno.land/x/oak/mod.ts';

export const staticFileMiddleware = async (ctx, next) => {
  const path = `${Deno.cwd()}/reports${ctx.request.url.pathname}`;
  
  if (await fileExists(path)) {
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}/reports`
    })
  } else {
    await next();
  }
}


async function fileExists(path) {
  try {
    const stats = await Deno.lstat(path);
    return stats && stats.isFile;
  } catch(e) {
    if (e && e instanceof Deno.errors.NotFound) {
      return false;
    } else {
      throw e;
    }
  }
}