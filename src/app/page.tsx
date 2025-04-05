"use client";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-pink-50 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-rose-500">Our Movie Jar</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="wanna watch with me?"
          className="p-3 border rounded shadow-sm bg-white"
        />
        <button className="bg-rose-400 hover:bg-rose-500 text-white px-4 py-2 rounded">
          YES
        </button>
      </div>

      <div className="mb-6">
        <button className="bg-lime-400 hover:bg-lime-500 text-white px-6 py-3 rounded-lg transition shadow-md">
          PICK
        </button>
      </div>
    </main>
  );
}
