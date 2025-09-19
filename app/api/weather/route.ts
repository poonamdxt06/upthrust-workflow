import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city") || "Delhi";

    const apiKey = process.env.WEATHER_API_KEY;
    const baseUrl = process.env.NEXT_PUBLIC_WEATHER_API_URL;

    // Current weather
    const currentRes = await fetch(
      `${baseUrl}/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    const currentData = await currentRes.json();

    // Forecast (5-day / 3-hour)
    const forecastRes = await fetch(
      `${baseUrl}/forecast?q=${city}&units=metric&appid=${apiKey}`
    );
    const forecastData = await forecastRes.json();

    return NextResponse.json({
      current: currentData,
      forecast: forecastData,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
      // Remove the following JSX code; API route files should only contain server-side logic.