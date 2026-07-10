import { NextResponse } from "next/server";

// Stripe webhook handler
// Processes payment confirmations and fulfills orders
export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: any;

  try {
    // In production, verify the webhook signature:
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);

    // For development, parse directly
    event = JSON.parse(body);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        console.log("Payment succeeded:", paymentIntent.id);

        // TODO: Fulfill order
        // await fulfillOrder(paymentIntent.metadata.orderId);
        // await sendOrderConfirmationEmail(paymentIntent.metadata.userEmail);
        // await updateInventory(paymentIntent.metadata.orderId);
        // await awardLoyaltyPoints(paymentIntent.metadata.userId, paymentIntent.amount);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        console.log("Payment failed:", paymentIntent.id);
        // TODO: Mark order as failed, notify customer
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object;
        console.log("Refund issued:", charge.id);
        // TODO: Update order status, issue store credit if needed
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
