import { Application, Router, send } from 'https://deno.land/x/oak/mod.ts';
// import { exec } from "https://deno.land/x/exec/mod.ts";
import { getTestCases, addTestRun } from './controller.js';

const app = new Application();
const router = new Router();

router
  .get('/api/testcase', getTestCases)
  .post('/api/testrun', addTestRun);

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
