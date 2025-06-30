import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    console.error("[GET EVENTS ERROR]", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const { date, title, emoji, label } = await req.json();

  const { data, error } = await supabase
    .from("events")
    .insert([{ date, title, emoji, label }])
    .select();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data[0]);
}
