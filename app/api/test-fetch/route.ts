// app/api/test-fetch/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://localhost:3000/api/price-check", {
      method: "POST",
      body: JSON.stringify({
        shoppingList: ["milk", "bread"], // use actual product IDs from your DB
        zipCode: "11776",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in test-fetch:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
