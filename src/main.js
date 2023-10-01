import { Client, Databases } from 'node-appwrite';
import { sendRevTelegram, revenueCatInfos, revReplaceVariables } from './revenuecat.js';
// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {

  const {
    APPWRITE_FUNCTION_PROJECT_ID,
    APPWRITE_API_KEY,
    COLLECTION_ID,
    DATABASE_ID,
  } = process.env;

  // Why not try the Appwrite SDK?
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(APPWRITE_API_KEY);

  const database = new Databases(client);

  // The `req` object contains the request data
  if (req.method === 'POST' && req.path == '/webhook-revenueCat') {
    const botId = req.query.botId;

    if (!botId) {
      return res.json({
        ok: false,
        message: 'This is not a valid webhook endpoint'
      });
    }

    try {
      const botInfo = await database.getDocument(DATABASE_ID, COLLECTION_ID, botId);
      const { botName, defaultCurrency, revenueCats, telegrams } = botInfo;

      if ((revenueCats.length != 0 || telegrams.length != 0) && telegrams.length == revenueCats.length) {
        
        for (let i = 0; i < telegrams.length; i++) {
          const { telegramToken, chatIds } = telegrams[i];
          const { revCatProjectId, htmlText, name } = revenueCats[i];

          const revenueCat = revenueCatInfos(req, { revCatProjectId, htmlText, name, botName, defaultCurrency });

          log(`===> start send telegram chats: ${chatIds} for bot: ${botName} and revenueCat: ${name} and revCatProjectId: ${revCatProjectId}`);

          if (!telegramToken) {
            error(`==> This bot telegram token is not valid: ${telegramToken}`)
            return res.json({
              ok: false,
              message: 'This bot telegram token is not valid'
            });
          }
          

          if (!chatIds || !chatIds.length) {
            error(`==> This bot has no chat ids: ${chatIds}`)
            return res.json({
              ok: false,
              message: 'This bot has no chat ids'
            });
          }

          // replace variables
          const text = revReplaceVariables(htmlText, revenueCat);

          if (!revCatProjectId) {
            log(`===> send telegram chats: ${chatIds} for bot: ${botName} and revenueCat: ${name} without revenueCatProjectId`);
            await sendRevTelegram(chatIds, telegramToken, text, log, error);
          } else {
            log(`===> not valid projectId`);
          }
        }
      } else {
        return res.json({
          ok: false,
          message: 'This bot has no revenue cats or telegram channels'
        });
      }


      return res.json({
        ok: true,
        message: `webhook received for botId: ${botId} and botName: ${botName}`
      });

    } catch (error) {
      error('Error getting bot info' + JSON.stringify(error));

      return res.json({
        ok: false,
        message: 'This is not a valid webhook endpoint'
      });
    }
  }

  // The `req` object contains the request data
  if (req.method === 'GET' && (req.path == '/' || req.path == '/webhook-revenueCat')) {
    // Send a response with the res object helpers
    // `res.send()` dispatches a string back to the client
    return res.json({
      ok: true,
      message: 'ready to receive webhooks!'
    });
  }

  // `res.json()` is a handy helper for sending JSON
  return res.json({
    ok: false,
    message: 'This is not a valid webhook endpoint'
  });
};
