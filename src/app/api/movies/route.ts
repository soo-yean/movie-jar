import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import fs from "fs";
import path from "path";

const filePath = path.resolve("./data/movies.json");

function readMovies(): string[] {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function saveMovies(movies: string[]) {
  fs.writeFileSync(filePath, JSON.stringify(movies, null, 2), "utf-8");
}

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
