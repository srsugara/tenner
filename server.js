import { Application, Router, send } from 'https://deno.land/x/oak/mod.ts';
import { oakCors } from 'https://deno.land/x/cors/mod.ts';
import { staticFileMiddleware } from './staticFileMiddleware.js';
import {
  loginUser,
  registerUser,
  getMicroservices,
  getTestCases,
  getStatistic,
  getTestRun,
  addTestRun,
} from './controller.js';

const app = new Application();
const router = new Router();

router
  .get('/api/login', loginUser)
  .post('/api/register', registerUser)
  .get('/api/microservice', getMicroservices)
  .get('/api/testcase', getTestCases)
  .get('/api/statistic', getStatistic)
  .get('/api/testrun', getTestRun)
  .post('/api/testrun', addTestRun);

app.use(oakCors());
app.use(staticFileMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());

// const cmd = Deno.run({
//   cmd: ["pwd"],
//   stdout: "piped",
//   stderr: "piped"
// });

// const output = await cmd.output() // "piped" must be set
// const path = decoder.decode(output);
// let id = '13'
// await exec(`cp -R "/Users/srsugara/Public/Project TA/tenner-web/test3/tenner-app/Archive/target/site/serenity" "/Users/srsugara/Public/Project TA/tenner-web/test3/tenner-app/copy${id}"`)

// cmd.close()

// let htmlTagRegex =/\s*(<[^>]*>)/g
// let text = decoder.decode(await Deno.readFile('Archive/target/site/serenity/index.html'));
// text = text.replace(/(<([^>]+)>)/gi, '')

// text = text.replace(/\s/g,'')

// text = text.split('AverageExecutionTime')
// // text = text[1].split(htmlTagRegex)
// console.log(text)

// static file from public folder
app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/build`,
    index: 'index.html',
  });
});

await app.listen({ port: 9090 });
