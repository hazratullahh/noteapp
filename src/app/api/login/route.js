import { NextResponse } from "next/server";
import { loginSchema } from "@/schema/auth";
import { signJwtAccessToken } from "@/app/lib/jwt";
import connectDB from "@/app/lib/connectDB";
import User from "@/app/models/User";

export async function POST(request) {
  try {
    connectDB();

    const body = await request.json();

    await loginSchema.validate(body, { abortEarly: false })

    const user = await User
      .findOne({ email: body.email })
      .select("+password");

    if (!user || !(await user.matchPassword(body.password))) {
      return NextResponse.json({ error: "invalid credentials" });
    }

    const accessToken = signJwtAccessToken({ user });

    user.password = undefined
    user.resetPasswordToken = undefined
    return NextResponse.json({ ...user._doc, accessToken });

  } catch (error) {
    const errorArray = new Map();
    error.inner.forEach((e) => {
      errorArray.set(e.path, e.message);
    });

    const errors = Array.from(errorArray, ([param, msg]) => ({ param, msg }));

    return NextResponse.json({ errors }, { status: 400 });
  }
}
