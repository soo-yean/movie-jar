import { NextRequest, NextResponse } from "next/server";
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
  const movies = readMovies();
  return NextResponse.json({ movies });
}

export async function POST(req: NextRequest) {
  const { title } = await req.json();
  const movies = readMovies();
  if (!movies.includes(title)) {
    movies.push(title);
    saveMovies(movies);
  }
  return NextResponse.json({ movies });
}

export async function DELETE(req: NextRequest) {
  const { title } = await req.json();
  let movies = readMovies();
  movies = movies.filter((m) => m !== title);
  saveMovies(movies);
  return NextResponse.json({ movies });
}
