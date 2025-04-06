import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[GET MOVIES ERROR]", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const { title } = await req.json();

  if (!title || typeof title !== "string") {
    return NextResponse.json(
      { error: "Invalid movie title." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("movies")
    .insert([{ title }])
    .select();

  if (error) {
    console.error("[ADD MOVIES ERROR]", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data[0]);
}

// export async function DELETE(req: Request) {
//   const { id } = await req.json();

//   if (!id || typeof id !== "string") {
//     return NextResponse.json(
//       { error: "Missing or invalid movie ID." },
//       { status: 400 }
//     );
//   }

//   const { error } = await supabase.from("movies").delete().eq("id", id);

//   if (error) {
//     console.error("[DELETE MOVIES ERROR]", error.message);
//     return NextResponse.json({ message: "Movie deleted successfully." });
//   }
// }
