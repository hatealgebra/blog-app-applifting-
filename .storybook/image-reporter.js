const fs = require('fs');
const { S3 } = require('@aws-sdk/client-s3');
const { uploadDiff } = require('../src/helpers/imageUpload');

const { S3_BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } =
  process.env;

const s3 = new S3({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

class ImageReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  async onTestResult(test, testResult, aggregateResults) {
    if (
      testResult.numFailingTests &&
      testResult.failureMessage.match(/snapshot/) &&
      testResult.failureMessage.match(/different/)
    ) {
      // location of local generated snapshots
      try {
        console.log('hey');
        const files = fs.readdirSync(
          './src/components/__snapshots__/__diff_output__'
        );
        console.log(files);

        files.forEach(async (value) => {
          // path to where they snapshots are stored in s3
          console.log(value);

          await uploadDiff(
            `./src/components/__snapshots__/__diff_output__/${value}`,
            value
          );
        });
      } catch (e) {
        console.error(e);
      }
    }
  }
}

module.exports = ImageReporter;
