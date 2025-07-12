"use client";

import axios from "axios";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import type { Movie } from "@/index";

export default function MovieListPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  function fetchMovies() {
    isLoading(true);
    axios.get("./api/movies").then((res) => {
      setMovies(res.data);
    });
    isLoading(false);
  }

  const toggleWatched = async (id: string, current?: boolean) => {
    const { data, error } = await supabase
      .from("movies")
      .update({ watched: !current })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;

    return data;
  };

  const handleCheckbox = async (id: string, current?: boolean) => {
    try {
      const updatedMovies = await toggleWatched(id, current);
      setMovies((prev) => {
        const updated = prev.map((movie) =>
          movie.id === id ? updatedMovies : movie
        );
        return updated.sort((a, b) => Number(a.watched) - Number(b.watched));
      });
    } catch (error) {
      console.error("Error updating movie: ", error);
    }
  };

  if (loading) return <Loading />;

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
              className="cursor-pointer accent-pink-400 w-4 h-4"
              checked={movie.watched}
              onChange={() => handleCheckbox(movie.id, movie.watched)}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
