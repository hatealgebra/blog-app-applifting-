import {  getStoryContext, } from "@storybook/test-runner";

const snapshotsDir = process.env.SNAPSHOTS_DIR || "__snapshots__";

const skipSnapshots = process.env.SKIP_SNAPSHOTS === "true";

let errors = [];



// TODO: Add mocking for vidstack player
const config = {
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

    const elementHandler =
    (await page.$("#root")) || (await page.$("#storybook-root"));
    const innerHTML = await elementHandler?.innerHTML();
    expect(innerHTML).toMatchSnapshot();
    
    if(errors.length > 0){
      throw(errors.join("\n\n"));
    }
  },
};

export default config;
