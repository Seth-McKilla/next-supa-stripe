import initStripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabase";

declare const process: {
  env: {
    API_ROUTE_SECRET: string;
    STRIPE_SECRET_KEY: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
    typescript: true,
  });

  switch (req.method) {
    case "POST":
      try {
        const customer = await stripe.customers.create({
          email: req.body.record.email,
        });

        await supabase
          .from("profile")
          .update({ stripe_customer: customer.id })
          .eq("id", req.body.record.id);

        return res.json({ message: `Stripe customer created: ${customer.id}` });
      } catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: error.message });
      }

    default:
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
