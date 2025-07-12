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
  sender?: string;
  created_at: string;
};

export default function LettersPage() {
  // const [reloading, setReloading] = useState(false);

  const [emoji, setEmoji] = useState("💌");
  const [showPicker, setShowPicker] = useState(false);

  const [message, setMessage] = useState("");
  const [letters, setLetters] = useState<Letter[] | null>(null);
  const [sender, setSender] = useState<"S" | "A">("A");

  const [page, setPage] = useState(1);
  const [hasMorePage, setHasMorePage] = useState(true);
  const limit = 5;

  //todo: refactor
  useEffect(() => {
    fetchLetters(page);
  }, [page]);

  const fetchLetters = async (pageNumber = page) => {
    // if (letters !== null) setReloading(true);

    const res = await fetch(`./api/letters?page=${pageNumber}&limit=${limit}`);
    const data = await res.json();

    setLetters(data.letters);
    setHasMorePage(data.hasMore);

    // setReloading(false);
  };

  const addLetter = async (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim()) {
      const res = await fetch("./api/letters", {
        method: "POST",
        body: JSON.stringify({
          emoji: emoji,
          message: message,
          sender: sender,
        }),
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
    <div className="px-4 py-8 max-w-4xl mx-auto w-full">
      <form
        onSubmit={addLetter}
        className="bg-pink-100 p-4 rounded-lg shadow w-full mb-6"
      >
        <div className="flex items-center gap-4 mb-2">
          <p className="text-gray-700">A letter for...</p>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="sender"
              value="A"
              checked={sender === "A"}
              onChange={() => setSender("A")}
              className="accent-pink-400"
            />
            <span className="text-pink-500 font-medium">Soo💖</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="sender"
              value="S"
              checked={sender === "S"}
              onChange={() => setSender("S")}
              className="accent-blue-400"
            />
            <span className="text-blue-500 font-medium">Adam💙</span>
          </label>
        </div>

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

          <textarea
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

      <div className="w-full mt-10 space-y-4">
        {/* {letters.length === 0 && (
          <p className="text-center text-gray-500">No letters yet...😿</p>
        )} */}

        {letters.map((letter) => (
          // <div
          //   key={letter.id}
          //   className="flex flex-col bg-pink-50 border border-pink-200 rounded-lg px-4 py-3 shadow transition hover:shadow-md"
          // >
          <div
            key={letter.id}
            className={`flex flex-col rounded-lg px-4 py-3 shadow transition hover:shadow-md border-2 ${
              letter.sender === "A"
                ? "border-blue-300 bg-blue-50"
                : "border-pink-300 bg-pink-50"
            }`}
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

      <div className="flex justify-between items-center mt-10">
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
    </div>
  );
}
