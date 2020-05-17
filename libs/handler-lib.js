export default function handler(lambda) {
  return async function (event, context) {
    let statusCode = 200;
    let responseBody = {};

    try {
      responseBody = await lambda(event, context);
    } catch (error) {
      statusCode = 500;
      responseBody = { error: error.message };
    }

    return {
      statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(responseBody),
    };
  };
}
