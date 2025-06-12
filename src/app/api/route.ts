import { NextResponse } from "next/server";

export async function GET() {
  //   const res = await fetch("", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "API-KEY": process.env,
  //     },
  //   });
  //   const data = await res.json();
  return NextResponse.json({ data: "doancd" });
}
