import {
  MessageAPIResponseBase,
  TextMessage,
  WebhookEvent,
  WebhookRequestBody,
} from "@line/bot-sdk";
import { Middleware } from "@line/bot-sdk/dist/middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import { client, middleware } from "../../lib/line";

// ref: https://nextjs.org/docs/api-routes/api-middlewares#custom-config
export const config = {
  api: {
    bodyParser: false,
  },
};

// ref: https://nextjs.org/docs/api-routes/api-middlewares
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Middleware
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Function handler to receive the text.
const textEventHandler = async (
  event: WebhookEvent
): Promise<MessageAPIResponseBase | undefined> => {
  // Process all variables here.
  if (event.type !== "message" || event.message.type !== "text") {
    return;
  }

  // Process all message related variables here.
  const { replyToken } = event;
  const { text } = event.message;

  // Create a new message.
  const response: TextMessage = {
    type: "text",
    text,
  };

  // Reply to the user.
  await client.replyMessage(replyToken, response);
};

// ref: https://github.com/line/line-bot-sdk-nodejs/blob/next/examples/echo-bot-ts/index.ts
async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run the middleware
  await runMiddleware(req, res, middleware);

  const events: WebhookEvent[] = req.body.events;

  // Process all of the received events asynchronously.
  const results = await Promise.all(
    events.map(async (e: WebhookEvent) => {
      try {
        await textEventHandler(e);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error);
        }
        // Return an error message.
        return res.status(500).json({
          status: "error",
        });
      }
    })
  );

  // Return a successfull message.
  return res.status(200).json({
    status: "success",
    results,
  });
}

export default handler;
