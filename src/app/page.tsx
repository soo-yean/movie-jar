"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import jar from "../jar.png";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

interface Movie {
  id: string;
  title: string;
  created_at?: string;
  watched?: boolean;
}

export default function Home() {
  const [movie, setMovie] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [randomMovie, setRandomMovie] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovies() {
      const res = await fetch("./api/movies");
      const data = await res.json();
      setMovies(data.filter((movie: Movie) => !movie.watched));
    }

    fetchMovies();
  }, []);

  const addMovie = async () => {
    if (movie.trim()) {
      const res = await fetch("./api/movies", {
        method: "POST",
        body: JSON.stringify({ title: movie.trim() }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        setMovies((prev) => [...prev, data.movies]);
        setMovie("");

        toast("Alright, I'll look forward to it!", {
          icon: "😚",
        });
      }
    }
  };

  // const deleteMovie = async (id: string) => {
  //   const res = await fetch(`./api/movies?id=${id}`, {
  //     method: "DELETE",
  //   });

  //   if (res.ok) {
  //     setMovies((prev) => prev.filter((movie) => movie.id !== id));
  //   } else {
  //     console.error("Failed to delete the movie.");
  //   }
  // };

  const drawRandomMovie = () => {
    if (movies.length === 0) return;

    const index = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[index];

    setTimeout(() => {
      setRandomMovie(randomMovie.title);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#f472b6", "#facc15", "#86efac", "#a78bfa"],
      });
    }, 300);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] bg-pink-50 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-rose-500">Our Movie Jar</h1>

      <div className="flex gap-2 mb-8">
        <input
          type="text"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          placeholder="wanna watch with me?"
          className="p-3 border rounded shadow-sm bg-white"
        />
        <button
          onClick={addMovie}
          className="bg-rose-400 hover:bg-rose-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          YES
        </button>
      </div>

      <AnimatePresence>
        {randomMovie && (
          <motion.div
            key={randomMovie}
            initial={{ scale: 0.6, y: 100, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="mt-4 bg-white  rounded-xl p-6 shadow-xl text-2xl text-rose-400 font-bold "
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1.05 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
              className="text-center italic"
            >
              {randomMovie}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Image
        onClick={drawRandomMovie}
        src={jar}
        className="cursor-pointer"
        width={300}
        height={500}
        alt="movie jar"
      />
    </main>
  );
}
