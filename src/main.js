import { Client } from 'node-appwrite';

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  // Why not try the Appwrite SDK?
  //
  const client = new Client()
     .setEndpoint('https://cloud.appwrite.io/v1')
     .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
     .setKey(process.env.APPWRITE_API_KEY);

  // You can log messages to the console
  log('Hello, Logs!');

  // If something goes wrong, log an error
  error('Hello, Errors!');

  // The `req` object contains the request data
  if (req.method === 'POST' && req.path == '/webhook') {
    // Send a response with the res object helpers
    // `res.send()` dispatches a string back to the client
    return res.json('Hello, World!');
  }

  // The `req` object contains the request data
  if (req.method === 'GET') {
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
