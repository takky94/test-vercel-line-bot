import {
  Client,
  FollowEvent,
  middleware as _middleware,
  WebhookEvent,
} from "@line/bot-sdk";
import { ENV } from "../env";

const config = {
  channelAccessToken: ENV.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: ENV.LINE_CHANNEL_SECRET,
};

export const client = new Client(config);
export const middleware = _middleware(config);

/** BOTの友達追加に対するレスポンス */
const greeting = async (e: FollowEvent) => {
  const displayName = e.source.userId
    ? `${(await client.getProfile(e.source.userId)).displayName}さん\n`
    : "";

  return client.replyMessage(e.replyToken, {
    type: "text",
    text: `${displayName}友達追加ありがとうございますンゴねぇ`,
  });
};

/** WebhookEventのtypeごとに色々やる */
export const handleWebhookEvent = async (e: WebhookEvent) => {
  const response = [];

  switch (e.type) {
    case "follow":
      await response.push(greeting(e));
      break;
  }

  return response;
};
