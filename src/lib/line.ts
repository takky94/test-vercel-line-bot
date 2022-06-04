import { Client, middleware as _middleware } from "@line/bot-sdk";
import { ENV } from "../env";

const config = {
  channelAccessToken: ENV.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: ENV.LINE_CHANNEL_SECRET,
};

export const client = new Client(config);
export const middleware = _middleware(config);
