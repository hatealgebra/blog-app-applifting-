import { toMatchImageSnapshot } from 'jest-image-snapshot';
import {  getStoryContext, } from "@storybook/test-runner";

const snapshotsDir = process.env.SNAPSHOTS_DIR || 'src/__snapshots__';
const customSnapshotsDir = `${process.cwd()}/${snapshotsDir}`;
const skipSnapshots = process.env.SKIP_SNAPSHOTS === "true";

let errors = [];

// TODO: Add mocking for vidstack player
const config = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },
  async postRender(page, context) {

    const {
        parameters: { tests },
    } = await getStoryContext(page, context);

    if (tests?.disableSnapshots) {
      return;
    }

    if (skipSnapshots) {
      return;
    }

    
    if(errors.length > 0){
      throw(errors.join("\n\n"));
    }

    const image = await page.screenshot({ fullPage: false });
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir,
      customSnapshotIdentifier: context.id,
      failureThreshold: 0.03,
      failureThresholdType: 'percent',
    });
  },
};

export default config;
