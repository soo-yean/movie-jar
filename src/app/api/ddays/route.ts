import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("ddays")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    console.error("[GET DDAYS ERROR]", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
