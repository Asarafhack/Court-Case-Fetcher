import { NextResponse } from "next/server";

// ✅ CORRECT relative paths
import { connectDB } from "../../../lib/db";
import Case from "../../../models/Case";
import { scrapeCase } from "../../../lib/scraper";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { caseType, caseNumber, year } = body;

    // ✅ Validation
    if (!caseType || !caseNumber || !year) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    // ✅ DB connection
    await connectDB();

    // ✅ Scraper call
    const scrapedData = await scrapeCase(caseType, caseNumber, year);

    // ✅ Save to DB
    const saved = await Case.create({
      caseType,
      caseNumber,
      year,
      responseData: scrapedData,
    });

    // ✅ Response
    return NextResponse.json({
      success: true,
      data: saved,
    });

  } catch (error: any) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Server error",
      },
      { status: 500 }
    );
  }
}