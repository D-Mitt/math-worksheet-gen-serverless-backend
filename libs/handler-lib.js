export default function handler(lambda) {
  return async (event, context) => {
    let statusCode = 200;
    let responseBody = {};

    try {
      responseBody = await lambda(event, context);
    } catch (error) {
      statusCode = 500;
      let errorMessage = error.message;

      if (errorMessage && errorMessage.length > 6) {
        let httpStatus = errorMessage.substring(1, 4);
        errorMessage = errorMessage.substring(6, error.message.length);
        statusCode = setStatusCode(httpStatus);
      }

      responseBody = { error: errorMessage };
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

const setStatusCode = (httpStatus) => {
  console.log("httpsStatus: ", httpStatus);
  console.log("parsed: ", parseInt(httpStatus));
  switch (parseInt(httpStatus)) {
    case 401:
      return 401;
    case 402:
      return 402;
    case 403:
      return 403;
    case 404:
      return 404;
    case 422:
      return 422;
    default:
      return 500;
  }
};
