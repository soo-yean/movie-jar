"use client";

import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

interface Movie {
  id: string;
  title: string;
  created_at?: string;
  watched?: boolean;
}

export default function MovieListPage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      const res = await fetch("./api/movies");
      const data = await res.json();
      setMovies(data);
    }
    fetchMovies();
  }, []);

  const markAsWatched = async (id: string) => {
    const { data, error } = await supabase
      .from("movies")
      .update({ watched: true })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;

    return data;
  };

  const handleCheckbox = async (id: string) => {
    console.log("id: ", id);

    try {
      const updatedMovies = await markAsWatched(id);
      setMovies((prev) =>
        prev.map((movie) => (movie.id === id ? updatedMovies : movie))
      );
    } catch (error) {
      console.error("Error updating movie: ", error);
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      {/* <h1 className="text-2xl font-bold text-center mb-4">Our Movie List</h1> */}
      <ul className="space-y-2">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className={`bg-pink-100 rounded-md p-3 shadow-sm flex items-center justify-between ${
              movie.watched ? "opacity-50" : ""
            }`}
          >
            <span>{movie.title}</span>
            <input
              type="checkbox"
              checked={movie.watched}
              onChange={() => handleCheckbox(movie.id)}
              disabled={movie.watched}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
