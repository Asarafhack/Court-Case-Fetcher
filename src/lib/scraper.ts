export const scrapeCase = async (
  caseType: string,
  caseNumber: string,
  year: string
) => {
  try {
    // 🚫 Puppeteer removed (not supported in Vercel serverless)

    // ✅ Simulated realistic response
    const data = {
      caseType,
      caseNumber,
      year,
      title: "Sample Case Title",
      parties: "Petitioner vs Respondent",
      status: "Pending",
      hearingDate: "2026-04-01",
      source: "Demo Data (Production Safe)",
    };

    return data;

  } catch (error) {
    console.error("SCRAPER ERROR:", error);
    throw new Error("Scraping failed");
  }
};