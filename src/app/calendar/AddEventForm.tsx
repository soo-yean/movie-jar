"use client";

import { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import toast from "react-hot-toast";

export default function AddEventForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [label, setLabel] = useState("T");
  const [emoji, setEmoji] = useState("💓");
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectEmoji = (emojiData: EmojiClickData) => {
    setEmoji(emojiData.emoji);
    setShowPicker(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("./api/calendar", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        date: date,
        emoji: emoji,
        label: label,
      }),
    });

    setLoading(false);

    if (res.ok) {
      toast("Event added!", {
        icon: "💓",
      });

      setTitle("");
      setDate("");
      setEmoji("💓");
      setLabel("T");

      onSuccess?.();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-pink-100 p-6 rounded-2xl shadow-xl w-full max-w-md mx-auto space-y-4 relative"
    >
      <div className="text-xl font-semibold text-pink-800">Add New Event</div>

      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium text-pink-800">
          Pick your emoji:
        </label>
        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className="text-2xl hover:scale-110 transition-transform cursor-pointer"
        >
          {emoji}
        </button>
      </div>

      {showPicker && (
        <div className="absolute z-50">
          <EmojiPicker className="cursor-pointer" onEmojiClick={selectEmoji} />
        </div>
      )}

      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-pink-800">Event</label>
        <input
          type="text"
          placeholder="What's happening?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-md border border-pink-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-pink-800">Date & Time</label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-md border border-pink-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />
      </div>

      <div className="flex flex-col space-y-2 pt-1.5">
        <div className="flex justify-between">
          <label className="flex items-center space-x-2 text-sm text-pink-800">
            <input
              type="radio"
              value="T"
              checked={label === "T"}
              onChange={() => setLabel("T")}
              className="accent-pink-500 cursor-pointer"
            />
            <span>Together👩‍❤️‍👨</span>
          </label>
          <label className="flex items-center space-x-2 text-sm text-pink-800">
            <input
              type="radio"
              value="S"
              checked={label === "S"}
              onChange={() => setLabel("S")}
              className="accent-pink-300 cursor-pointer"
            />
            <span>Soo💖</span>
          </label>
          <label className="flex items-center space-x-2 text-sm text-pink-800">
            <input
              type="radio"
              value="A"
              checked={label === "A"}
              onChange={() => setLabel("A")}
              className="accent-blue-400 cursor-pointer"
            />
            <span>Adam💙</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-pink-400 text-white font-semibold py-2 px-4 rounded-lg hover:bg-pink-500 transition-colors mt-3 cursor-pointer"
      >
        {loading ? "Saving..." : "Add Event"}
      </button>
    </form>
  );
}
