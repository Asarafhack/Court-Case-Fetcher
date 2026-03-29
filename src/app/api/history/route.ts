import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Case from "../../../models/Case";

export async function GET() {
  try {
    await connectDB();

    const cases = await Case.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: cases,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch history" },
      { status: 500 }
    );
  }
}