"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [movie, setMovie] = useState("");
  const [movies, setMovies] = useState<string[]>([]);
  const [randomMovie, setRandomMovie] = useState<string | null>(null);

  useEffect(() => {
    fetch("./api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data.movies));
  }, []);

  const addMovie = async () => {
    if (movie.trim()) {
      const res = await fetch("./api/movies", {
        method: "POST",
        body: JSON.stringify({ title: movie.trim() }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setMovies(data.movies);
      setMovie("");
    }
  };

  // const deleteMovie = async (title: string) => {
  //   const res = await fetch("./api/movies", {
  //     method: "DELETE",
  //     body: JSON.stringify({ title }),
  //     headers: { "Content-Type": "application/json" },
  //   });
  //   const data = await res.json();
  //   setMovies(data.movies);
  //   setRandomMovie(null);
  // };

  const drawRandomMovie = () => {
    if (movies.length === 0) return;
    const index = Math.floor(Math.random() * movies.length);
    setRandomMovie(movies[index]);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-pink-50 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-rose-500">Our Movie Jar</h1>

      <div>{randomMovie}</div>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          placeholder="wanna watch with me?"
          className="p-3 border rounded shadow-sm bg-white"
        />
        <button
          onClick={addMovie}
          className="bg-rose-400 hover:bg-rose-500 text-white px-4 py-2 rounded"
        >
          YES
        </button>
      </div>

      <div className="mb-6">
        <button
          onClick={drawRandomMovie}
          className="bg-lime-400 hover:bg-lime-500 text-white px-6 py-3 rounded-lg transition shadow-md"
        >
          PICK
        </button>
      </div>
    </main>
  );
}
