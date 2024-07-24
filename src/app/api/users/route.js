import { userSchema } from "@/schema/user"
import { NextResponse } from "next/server"
import connectDB from "@/app/lib/connectDB"
import User from "@/app/models/User"

export async function GET(request) {
  try {
    return NextResponse.json("user")

  } catch (error) {
    console.error({ error });
  }
}

export async function POST(request) {
  try {
    connectDB()

    const body = await request.json()
    await userSchema.validate(body, { abortEarly: false })

    const isEmailExist = await User.findOne({ email: body.email })

    if (isEmailExist) {
      return NextResponse.json(
        { error: "Email Already Exist!" },
        { status: 404 })
    }

    const user = await User.create(body)

    return NextResponse.json(user)

  } catch (error) {
    console.error({ error });
    const errorArray = new Map()
    error?.inner?.forEach((e) => {
      errorArray.set(e.path, e.message)
    })

    const errors = Array.from(errorArray, ([param, msg]) => ({ param, msg }))
    return NextResponse.json(
      { error: errors.length > 0 ? errors : error.message },
      { status: 400 })
  }
}