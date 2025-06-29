"use client";

import { format } from "date-fns";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";

type Letter = {
  id: string;
  emoji: string;
  message: string;
  created_at: string;
};

export default function LettersPage() {
  const [reloading, setReloading] = useState(false);

  const [emoji, setEmoji] = useState("💌");
  const [message, setMessage] = useState("");
  const [letters, setLetters] = useState<Letter[] | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMorePage, setHasMorePage] = useState(true);
  const limit = 6;

  //todo: refactor
  useEffect(() => {
    fetchLetters(page);
  }, [page]);

  const fetchLetters = async (pageNumber = page) => {
    if (letters !== null) setReloading(true);

    const res = await fetch(`./api/letters?page=${pageNumber}&limit=${limit}`);
    const data = await res.json();

    setLetters(data.letters);
    setHasMorePage(data.hasMore);

    setReloading(false);
  };

  const addLetter = async (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim()) {
      const res = await fetch("./api/letters", {
        method: "POST",
        body: JSON.stringify({ emoji: emoji, message: message }),
      });

      if (res.ok) {
        await fetchLetters();
        setMessage("");
        setEmoji("💌");

        toast("I miss you", {
          icon: "😢",
        });

        fetchLetters();
      }
    }
  };

  const selectEmoji = (emoji: EmojiClickData) => {
    setEmoji(emoji.emoji);
    setShowPicker(false);
  };

  if (letters === null) return <Loading />;

  return (
    <>
      <form
        onSubmit={addLetter}
        className="bg-pink-100 p-4 rounded-lg shadow w-full max-w-md mx-auto mt-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <button
            type="button"
            onClick={() => setShowPicker(!showPicker)}
            className="text-3xl cursor-pointer"
          >
            {emoji}
          </button>
          {showPicker && (
            <div className="absolute z-50">
              <EmojiPicker onEmojiClick={selectEmoji} />
            </div>
          )}
          <input
            type="text"
            placeholder="..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="submit"
            className="bg-pink-400 text-white px-4 py-2 rounded hover:bg-pink-500 transition cursor-pointer"
          >
            send
          </button>
        </div>
      </form>

      <div className="w-full max-w-md mx-auto mt-6 space-y-4">
        {/* {letters.length === 0 && (
          <p className="text-center text-gray-500">No letters yet...😿</p>
        )} */}

        {letters.map((letter) => (
          <div
            key={letter.id}
            className="flex flex-col bg-pink-50 border border-pink-200 rounded-lg px-4 py-3 shadow transition hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{letter.emoji}</span>
              <div className="flex-1">
                <p className="text-gray-800 break-words">{letter.message}</p>
                <p className="text-xs text-gray-400 italic text-right">
                  {letter.created_at
                    ? format(
                        new Date(letter.created_at),
                        "MMMM d, yyyy 'at' h:mm a"
                      )
                    : "Unknown date"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4 max-w-md mx-auto">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-pink-400 text-white rounded disabled:opacity-50 cursor-pointer"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!hasMorePage}
          className="px-4 py-2 bg-pink-400 text-white rounded disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </>
  );
}
