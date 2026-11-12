import { subscribeToNewsletter } from "@/lib/mail";
import { NextResponse } from "next/server";
import * as v from "valibot";

const newsletterSchema = v.object({
  email: v.pipe(
    v.string("Email is required"),
    v.nonEmpty("Please enter your email address"),
    v.email("Please enter a valid email address")
  ),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = v.safeParse(newsletterSchema, body);

    if (!result.success) {
      return NextResponse.json(
        { message: result.issues[0]?.message ?? "Invalid email address" },
        { status: 400 }
      );
    }

    const { email } = result.output;
    const res = await subscribeToNewsletter(email);

    if (!res.success) {
      return NextResponse.json(
        { message: res.message || "Failed to subscribe. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "You're subscribed! Thanks for joining." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
