import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("letters")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("[GET LETTERS ERROR]", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const hasMore = to + 1 < (count ?? 0);

  return NextResponse.json({
    letters: data,
    hasMore,
  });
}

export async function POST(req: Request) {
  const { emoji, message, sender } = await req.json();

  const { data, error } = await supabase
    .from("letters")
    .insert([{ emoji, message, sender }])
    .select();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data[0]);
}
