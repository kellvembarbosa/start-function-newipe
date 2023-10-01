import { Client, Database, Query } from 'node-appwrite';
import { getCountryName, getTaxPercentage, getType, replaceVariables } from './utils';
import { sendTelegram } from './revenuecat';
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

  const database = new Database(client);

  // You can log messages to the console
  log('Hello, Logs!');

  // If something goes wrong, log an error
  error('Hello, Errors!');

  // The `req` object contains the request data
  if (req.method === 'POST' && req.path == '/webhook-revenueCat') {

    const botId = req.query.botId;

    let type = getType(req.body.event.type);

    const revenueCat = {
      type: type.typeShort,
      typeMessage: type.typeMessage,
      typeEmoji: type.typeEmoji,
      environment: req.body.event.environment,
      appUserId: req.body.event.app_user_id,
      productId: req.body.event.product_id,
      countryCode: req.body.event.country_code,
      countryName: getCountryName(req.body.event.country_code),
      storeCountry: req.body.event.store,
      taxPercentage: getTaxPercentage(req.body.event.tax_percentage),
    }

    if (!botId) {
      return res.json({
        ok: false,
        message: 'This is not a valid webhook endpoint'
      });
    }

    try {
      const botInfo = await database.getDocument(DATABASE_ID, COLLECTION_ID, botId);
      const { botName } = botInfo;

      if (!botTelegramToken) {
        return res.json({
          ok: false,
          message: 'This bot telegram token is not valid'
        });
      }

      if (!chatIds || !chatIds.length) {
        return res.json({
          ok: false,
          message: 'This bot has no chat ids'
        });
      }

      if (!revenueCatProjectId) {
        await sendTelegram(chatIds, botTelegramToken, log, error);
      }
      

      return res.json({
        ok: true,
        message: 'webhook received!'
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
  if (req.method === 'GET' && (req.path == '/' || req.path == '/webhook')) {
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
