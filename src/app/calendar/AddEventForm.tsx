// "use client";

// import { useState } from "react";
// import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

// export default function AddEventForm({
//   onSuccess,
// }: {
//   onSuccess?: () => void;
// }) {
//   const [title, setTitle] = useState("");
//   const [date, setDate] = useState("");
//   const [label, setLabel] = useState("T");
//   const [emoji, setEmoji] = useState("💓");
//   const [showPicker, setShowPicker] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const selectEmoji = (emoji: EmojiClickData) => {
//     setEmoji(emoji.emoji);
//     setShowPicker(false);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const res = await fetch("./api/events", {
//       method: "POST",
//       body: JSON.stringify({
//         title: title,
//         date: date,
//         emoji: emoji,
//         label: label,
//       }),
//     });

//     if (res.ok) {
//       const data = await res.json();
//       console.log("data?", data);
//       alert("Event added");
//       setTitle("");
//       setDate("");
//       setEmoji("");
//       setLabel("T");

//       onSuccess?.();
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-pink-100 p-4 rounded-lg shadow w-full max-w-md mx-auto mt-6"
//     >
//       <div>
//         <input
//           type="text"
//           placeholder="Event"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <input
//           type="text"
//           placeholder="Date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//         />

//         <button type="button" onClick={() => setShowPicker(!showPicker)}>
//           {emoji}
//         </button>

//         {showPicker && (
//           <div className="absolute z-50">
//             <EmojiPicker onEmojiClick={selectEmoji} />
//           </div>
//         )}

//         <button type="submit">ok</button>
//       </div>
//     </form>
//   );
// }

"use client";

import { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

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

    const res = await fetch("./api/events", {
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
      const data = await res.json();
      console.log("data?", data);
      alert("Event added 💌");
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
        <label className="text-sm font-medium text-pink-800">Emoji</label>
        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className="text-2xl hover:scale-110 transition-transform"
        >
          {emoji}
        </button>
      </div>

      {showPicker && (
        <div className="absolute top-full mt-2 z-50">
          <EmojiPicker onEmojiClick={selectEmoji} />
        </div>
      )}

      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-pink-800">Title</label>
        <input
          type="text"
          placeholder="e.g. Movie Night"
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

      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-pink-800">Label</label>
        <div className="flex justify-between">
          <label className="flex items-center space-x-2 text-sm text-pink-800">
            <input
              type="radio"
              value="T"
              checked={label === "T"}
              onChange={() => setLabel("T")}
              className="accent-pink-500"
            />
            <span>Together</span>
          </label>
          <label className="flex items-center space-x-2 text-sm text-pink-800">
            <input
              type="radio"
              value="S"
              checked={label === "S"}
              onChange={() => setLabel("S")}
              className="accent-pink-500"
            />
            <span>Me (Soo)</span>
          </label>
          <label className="flex items-center space-x-2 text-sm text-pink-800">
            <input
              type="radio"
              value="A"
              checked={label === "A"}
              onChange={() => setLabel("A")}
              className="accent-blue-400"
            />
            <span>Adam 💙</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-pink-400 text-white font-semibold py-2 px-4 rounded-lg hover:bg-pink-500 transition-colors"
      >
        {loading ? "Saving..." : "Add Event"}
      </button>
    </form>
  );
}
