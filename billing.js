import stripePackage from "stripe";
import handler from "./libs/handler-lib";

export const main = handler(async (event, context) => {
  const { source } = JSON.parse(event.body);
  const description = "Worksheet Subscription charge";

  // Load our secret key from the  environment variables
  const stripe = stripePackage(process.env.stripeSecretKey);
  // hardcoded to 8 dollars
  const amount = 800;

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: "cad",
  });
  return { status: true };
});
