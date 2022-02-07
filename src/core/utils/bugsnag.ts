import Bugsnag from "@bugsnag/js";
import BugsnagPluginExpress from "@bugsnag/plugin-express";

import logger from "./logger";

const API_KEY = process.env.BUGSNAG_API || '';

export const shouldInitializeBugsang = (): boolean => {
  return !!API_KEY
}

export const initialize = () => {
  if (!API_KEY) {
    logger.warn('no bugsnag API key. Skipping bugsnag initiation.')

    return
  }

  return Bugsnag.start({
    apiKey: API_KEY,
    plugins: [BugsnagPluginExpress],
  })
}

export const notify = (errMsg: any) => {
  if (API_KEY) {
    Bugsnag.notify(errMsg)
  }
}
