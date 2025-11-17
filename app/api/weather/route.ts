import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city") || "Delhi";

    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing Weather API Key" },
        { status: 500 }
      );
    }

    const baseUrl = "https://api.openweathermap.org/data/2.5";

    // Fetch current weather
    const currentRes = await fetch(
      `${baseUrl}/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    const currentData = await currentRes.json();

    if (currentData.cod !== 200) {
      return NextResponse.json(
        { error: currentData.message },
        { status: currentData.cod }
      );
    }

    // Fetch forecast
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
