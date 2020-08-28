import { User, TestRun } from './mongo.js';
import { readCSVObjects } from 'https://deno.land/x/csv/mod.ts';
import { exec } from 'https://deno.land/x/exec/mod.ts';

const decoder = new TextDecoder('utf-8');
const pathFeatures = 'Archive/src/test/resources/features/';

String.prototype.capitalize = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
};

const getMicroservices = async ({ request, response }) => {
  let microservices = [];
  try {
    const files = await Deno.readDirSync(pathFeatures);
    for (const file of files) {
      if (file.isDirectory) {
        microservices.push({ name: file.name });
      }
    }
    response.status = 200;
    response.body = {
      success: true,
      data: microservices,
    };
  } catch (err) {
    response.body = {
      success: false,
      error: 'Invalid path features',
    };
  }
};

const getTestCases = async ({ request, response }) => {
  let testCase = [];
  if (request.url.searchParams.get('microservice')) {
    try {
      const files = await Deno.readDirSync(
        pathFeatures + request.url.searchParams.get('microservice') + '/public'
      );
      for (const file of files) {
        if (!file.isDirectory) {
          let scenario = decoder.decode(
            await Deno.readFile(
              pathFeatures +
                request.url.searchParams.get('microservice') +
                '/public/' +
                file.name
            )
          );
          testCase.push({
            microservice: request.url.searchParams.get('microservice'),
            file: file.name,
            name: file.name
              .substring(0, file.name.length - 8)
              .replace(/_/g, ' ')
              .capitalize(),
            scenario: 'Given' + scenario.split('Given')[1],
          });
        }
      }
    } catch (err) {
      response.status = 400;
      response.body = {
        success: false,
        error: err,
      };
      return;
    }
  } else {
    try {
      const files = await Deno.readDirSync(pathFeatures);
      for (const file of files) {
        if (file.isDirectory) {
          const subfilesPublic = await Deno.readDirSync(
            pathFeatures + file.name + '/public'
          );
          for (const subfile of subfilesPublic) {
            let scenario = decoder.decode(
              await Deno.readFile(
                pathFeatures + file.name + '/public/' + subfile.name
              )
            );
            testCase.push({
              microservice: file.name,
              file: subfile.name,
              name: subfile.name
                .substring(0, subfile.name.length - 8)
                .replace(/_/g, ' ')
                .capitalize(),
              scenario: 'Given' + scenario.split('Given')[1],
            });
          }
        }
      }
    } catch (err) {
      response.status = 400;
      response.body = {
        success: false,
        error: err,
      };
      return;
    }
  }
  response.status = 200;
  response.body = {
    success: true,
    data: testCase,
  };
};

const getStatistic = async ({ response, request }) => {
  let statistic = {
    success: 0,
    failed: 0,
  };
  try {
    let testRun;
    testRun = await TestRun.find();
    testRun.map((data) => {
      if (data.state === 'success') {
        statistic.success++;
      } else {
        statistic.failed++;
      }
    });
  } catch (err) {
    response.status = 400;
    response.body = {
      success: false,
      error: err,
    };
    return;
  }
  response.status = 200;
  response.body = {
    success: true,
    data: statistic,
  };
};

const getTestRun = async ({ response, request }) => {
  let testRun;
  if (
    request.url.searchParams.get('month') &&
    request.url.searchParams.get('year')
  ) {
    try {
      const paramMonth = parseInt(request.url.searchParams.get('month'));
      const paramYear = parseInt(request.url.searchParams.get('year'));
      testRun = await TestRun.aggregate([
        {
          $project: {
            testCaseName: 1,
            state: 1,
            totalScenario: 1,
            duration: 1,
            executedAt: 1,
            year: { $year: '$executedAt' },
            month: { $month: '$executedAt' },
          },
        },
        { $match: { year: paramYear, month: paramMonth } },
      ]);
    } catch (err) {
      response.status = 400;
      response.body = {
        success: false,
        error: err,
      };
      return;
    }
  } else {
    try {
      testRun = await TestRun.find();
    } catch (err) {
      response.status = 400;
      response.body = {
        success: false,
        error: err,
      };
      return;
    }
  }

  response.status = 200;
  response.body = {
    success: true,
    data: testRun,
  };
};

//@desc execute test case
//@route POST /api/testrun
const addTestRun = async ({ response, request }) => {
  if (!request.hasBody) {
    response.status = 404;
    response.body = {
      success: false,
      data: 'No data provided',
    };
  } else {
    const body = await request.body();
    let data = await body.value;
    const file = data.feature;
    data.feature =
      data.feature !== ''
        ? data.feature
            .substring(0, data.feature.length - 8)
            .replace(/_/g, ' ')
            .capitalize()
        : 'All - ' + data.microservice;
    data.executedAt = new Date().addHours(7);
    let insert = await TestRun.insertOne(data);
    const cmd = Deno.run({
      cmd: [
        'mvn',
        'clean',
        'verify',
        `-Dcucumber.options='src/test/resources/features/${data.microservice}/public/${file}'`,
      ],
      cwd: `${Deno.cwd()}/Archive`,
      stdout: 'piped',
      stderr: 'piped',
    });
    await cmd.output()
    cmd.close()
    await exec(
      `cp -R "${Deno.cwd()}/Archive/target/site/serenity" "${Deno.cwd()}/reports/copy${
        insert.$oid
      }"`
    );

    const f = await Deno.open('Archive/target/site/serenity/results.csv');
    let csvResult = [];
    for await (const obj of readCSVObjects(f)) {
      csvResult.push(obj);
    }
    f.close();
    data = {
      state: '',
      totalScenario: csvResult.length,
      duration: 0,
    };
    let stateCount = 0;
    csvResult.map((value, index) => {
      data.duration = data.duration + parseFloat(value['Duration (s)']);
      if (value.Result.toLowerCase() === 'success') {
        stateCount++;
      }
    });
    data.duration = parseInt(data.duration);
    data.state = stateCount === csvResult.length ? 'success' : 'failed';
    // Updating the database
    await TestRun.updateOne({ _id: { $oid: insert.$oid } }, { $set: data });
    response.status = 201;
    response.body = {
      success: true,
      data: csvResult,
    };
  }
};

const registerUser = async ({ response, request }) => {
  if (!request.hasBody) {
    response.status = 404;
    response.body = {
      success: false,
      data: 'No data provided',
    };
  } else {
    const body = await request.body();
    let data = await body.value;
    data.createdAt = new Date().addHours(7);
    let user = await User.insertOne(data);
    response.status = 201;
    response.body = {
      success: true,
      data: user,
    };
  }
};

const loginUser = async ({ response, request }) => {
  let user;
  try {
    user = await User.findOne({
      email: request.url.searchParams.get('email'),
      password: request.url.searchParams.get('password'),
    });
    if (!user) {
      response.status = 400;
      response.body = {
        success: false,
        error: 'User not found',
      };
      return;
    }
  } catch (err) {
    response.status = 400;
    response.body = {
      success: false,
      error: err,
    };
    return;
  }
  response.status = 200;
  response.body = {
    success: true,
    data: user,
  };
};

export {
  loginUser,
  registerUser,
  getMicroservices,
  getTestCases,
  getStatistic,
  getTestRun,
  addTestRun,
};
