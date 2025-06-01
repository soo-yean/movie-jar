import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("letters")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[GET LETTERS ERROR]", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const { emoji, message } = await req.json();

  const { data, error } = await supabase
    .from("letters")
    .insert([{ emoji, message }])
    .select();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data[0]);
}
