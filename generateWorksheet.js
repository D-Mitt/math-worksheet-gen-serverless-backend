import { generateWorksheet } from "./libs/generateWorksheet-lib";
import handler from "./libs/handler-lib";

export const main = handler(async (event, context) => {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);
  const worksheet = generateWorksheet(data);
  return worksheet;
});
