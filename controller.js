import {TestRun} from './mongo.js';

//@desc Get all products
//@route Get /api/v1/products
const getTestCases = async (context) => {
  let microservices = [];
  const decoder = new TextDecoder('utf-8');
  const pathFeatures = 'Archive/src/test/resources/features/';
  const files = await Deno.readDirSync(pathFeatures);
  for (const file of files) {
    if (file.isDirectory) {
      let detail = {
        public: [],
        exclusive: [],
      };
      let scenario;
      const subfilesPublic = await Deno.readDirSync(
        pathFeatures + file.name + '/public'
      );
      for (const subfile of subfilesPublic) {
        scenario = decoder.decode(
          await Deno.readFile(
            pathFeatures + file.name + '/public/' + subfile.name
          )
        );
        subfile.scenario = 'Given ' + scenario;
        detail.public.push(subfile);
      }
      const subfilesExclusive = await Deno.readDirSync(
        pathFeatures + file.name + '/exclusive'
      );
      for (const subfile of subfilesExclusive) {
        scenario = decoder.decode(
          await Deno.readFile(
            pathFeatures + file.name + '/public/' + subfile.name
          )
        );
        subfile.scenario = 'Given ' + scenario;
        detail.exclusive.push(subfile);
      }
      file.detail = detail;
      microservices.push(file);
    }
  }

  context.response.body = {
    success: true,
    data: microservices,
  };
};

//@desc Adds a product
//@route POST /api/v1/products
const addTestRun = async ({ response, request }) => {
  const body = await request.body();
  if (!request.hasBody) {
    response.status = 404;
    response.body = {
      success: false,
      data: 'No data provided',
    };
  } else {
    const data = await body.value;
    await TestRun.insertOne({
      data,
    });
    response.status = 201;
    response.body = {
      success: true,
      data: 'Test run added to database',
    };
  }
};

export { getTestCases, addTestRun };
