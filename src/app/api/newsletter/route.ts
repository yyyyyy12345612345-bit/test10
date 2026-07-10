import { NextResponse } from "next/server";
import { isValidEmail } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, source = "homepage" } = body;

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Valid email address is required" },
        { status: 400 }
      );
    }

    // TODO: Store in DB (Supabase/Prisma)
    // await prisma.newsletterSubscriber.upsert({
    //   where: { email },
    //   create: { email, source },
    //   update: { isActive: true },
    // });

    // TODO: Add to email platform (Resend, Klaviyo, Mailchimp)
    // await addToEmailList(email);

    console.log(`Newsletter signup: ${email} from ${source}`);

    return NextResponse.json(
      { message: "Successfully subscribed! Welcome to the inner circle." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}
