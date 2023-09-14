import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { getStoryContext } from '@storybook/test-runner';
import { cleanDiffs, imageUpload } from '../src/helpers/aws.helper';

const { UPDATE_S3 } = process.env;

const snapshotsDir =
  process.env.SNAPSHOTS_DIR || 'src/components/__snapshots__';
const customSnapshotsDir = `${process.cwd()}/${snapshotsDir}`;
const skipSnapshots = process.env.SKIP_SNAPSHOTS === 'true';

let errors = [];

// TODO: Add mocking for vidstack player
// TODO: Refactor tests with help of https://dev.to/scottnath/shared-tests-how-to-write-reusable-storybook-interaction-tests-489c

const config = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
    cleanDiffs();
  },
  // async postRender(page, context) {
  //   const {
  //     parameters: { tests },
  //   } = await getStoryContext(page, context);

  //   if (tests?.disableSnapshots) {
  //     return;
  //   }

  //   if (skipSnapshots) {
  //     return;
  //   }

  //   if (errors.length > 0) {
  //     throw errors.join('\n\n');
  //   }

  //   const image = await page.screenshot({ fullPage: false });

  //   if (UPDATE_S3) {
  //     imageUpload(image, context.id);
  //   } else {
  //     console.log('hey');
  //     expect(image).toMatchImageSnapshot({
  //       customSnapshotsDir,
  //       customSnapshotIdentifier: context.id,
  //       failureThreshold: 0.01,
  //       failureThresholdType: 'percent',
  //     });
  //   }
  // },
};

export default config;
