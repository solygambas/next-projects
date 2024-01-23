import { NextResponse } from "next/server";
import courses from "./data.json";

export async function GET(request) {
  return NextResponse.json(courses);
}
