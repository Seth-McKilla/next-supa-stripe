import initStripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabase";

declare const process: {
  env: {
    STRIPE_SECRET_KEY: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
    typescript: true,
  });

  const customer = await stripe.customers.create({
    email: req.body.record.email,
  });

  await supabase
    .from("profile")
    .update({ stripe_customer: customer.id })
    .eq("id", req.body.record.id);

  res.send({ message: `Stripe customer created: ${customer.id}` });
}
