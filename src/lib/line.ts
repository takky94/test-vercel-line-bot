import {
  Client,
  FollowEvent,
  MessageEvent,
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
  const { replyToken } = e;
  const displayName = e.source.userId
    ? `${(await client.getProfile(e.source.userId)).displayName}さん\n`
    : "";

  await client.replyMessage(replyToken, {
    type: "text",
    text: `${displayName}友達追加ありがとうございますンゴねぇ`,
  });
};

/** なんか送られたメッセージに対するレスポンス */
const reply = async (e: MessageEvent) => {
  const { replyToken } = e;
  await client.replyMessage(replyToken, {
    type: "text",
    text: "アアアアアアアアアアア",
  });
};

/** WebhookEventのtypeごとに色々やる */
export const handleWebhookEvent = async (e: WebhookEvent) => {
  switch (e.type) {
    case "follow":
      await greeting(e);
      break;
    case "message":
      await reply(e);
      break;
  }
};
