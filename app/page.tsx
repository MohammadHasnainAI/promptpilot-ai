"use client";

import { useState } from "react";
import { improvePrompt } from "./lib/promptEngine";

export default function Home() {
  const [inputPrompt, setInputPrompt] = useState("");
  const [outputPrompt, setOutputPrompt] = useState("");
  const [category, setCategory] = useState("General");
  const [toast, setToast] = useState("");

  const examples = [
    "Write a professional email asking for a day off.",
    "Create a LinkedIn post about Artificial Intelligence.",
    "Explain Machine Learning in simple English.",
    "Write a Python program to calculate factorial.",
    "Create a marketing slogan for a coffee shop.",
  ];

  const handleImprove = () => {
    if (!inputPrompt.trim()) return;
    const improved = improvePrompt(inputPrompt, category);
    setOutputPrompt(improved);
  };

  const handleCopy = async () => {
    if (!outputPrompt) return;

    try {
      await navigator.clipboard.writeText(outputPrompt);
      setToast("✅ Prompt copied!");

      setTimeout(() => {
        setToast("");
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      alert("Could not copy the prompt.");
    }
  };

  const handleDownload = () => {
    if (!outputPrompt) return;

    const blob = new Blob([outputPrompt], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "improved-prompt.txt";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setToast("📄 Prompt downloaded!");

    setTimeout(() => {
      setToast("");
    }, 2000);
  };

  const handleClear = () => {
    setInputPrompt("");
    setOutputPrompt("");
    setToast("");
    setCategory("General");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white flex items-center justify-center px-6 py-10">
      {toast && (
        <div className="fixed top-6 right-6 z-50 rounded-xl bg-emerald-600 px-5 py-3 text-white shadow-xl animate-pulse">
          {toast}
        </div>
      )}

      <div className="w-full max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-lg shadow-2xl p-8 flex flex-col gap-8">
        <header className="text-center">
          <div className="text-6xl mb-3">🚀</div>
          <h1 className="text-5xl font-extrabold tracking-tight">
            PromptPilot AI
          </h1>
          <p className="text-slate-400 mt-3 text-lg">
            Transform your simple prompts into powerful AI instructions.
          </p>
        </header>

        {/* Example Prompts Section */}
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-gray-200">Example Prompts</h2>
          <div className="grid gap-2">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => setInputPrompt(example)}
                className="text-left bg-slate-900 border border-slate-800 rounded-2xl p-3 hover:border-blue-500 hover:bg-slate-800 transition text-sm text-gray-300 hover:text-white"
              >
                {example}
              </button>
            ))}
          </div>
        </section>

        {/* Input Section */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-sm font-medium text-gray-300">
              Prompt Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-3 text-white focus:outline-none focus:border-blue-500"
            >
              <option>General</option>
              <option>Email</option>
              <option>LinkedIn</option>
              <option>Coding</option>
              <option>Study</option>
              <option>Marketing</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="prompt" className="text-sm font-medium text-gray-300">
              Enter your prompt:
            </label>
            <textarea
              id="prompt"
              className="w-full h-40 p-4 bg-slate-950 border border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-none transition"
              placeholder="e.g., Write an email to my boss asking for a day off..."
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              maxLength={3000}
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{inputPrompt.length} / 3000</span>
              <span>{3000 - inputPrompt.length} remaining</span>
            </div>
          </div>

          <button
            onClick={handleImprove}
            disabled={!inputPrompt.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed py-4 rounded-2xl font-semibold transition mt-2"
          >
            Improve Prompt
          </button>

          <button
            onClick={handleClear}
            className="w-full mt-2 border border-slate-700 py-4 rounded-2xl hover:bg-slate-800 transition"
          >
            Clear
          </button>
        </section>

        {/* Output Section */}
        {outputPrompt ? (
          <section className="flex flex-col gap-2 mt-4 p-4 bg-slate-950 border border-slate-700 shadow-lg rounded-2xl relative">
            <label className="text-sm font-medium text-gray-300">Improved Prompt:</label>
            <pre className="text-gray-200 whitespace-pre-wrap font-sans">
              {outputPrompt}
            </pre>
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={handleCopy}
                className="bg-slate-800 hover:bg-slate-700 text-xs px-4 py-2 rounded-2xl transition"
              >
                Copy Prompt
              </button>

              <button
                onClick={handleDownload}
                className="bg-green-600 hover:bg-green-700 text-xs px-4 py-2 rounded-2xl transition"
              >
                Download .txt
              </button>
            </div>
          </section>
        ) : (
          <div className="mt-4 text-center text-gray-500">
            Your improved prompt will appear here.
          </div>
        )}

        <footer className="text-center text-slate-500 text-sm pt-4 border-t border-slate-800">
          Built with ❤️ using Next.js • React • TypeScript • Tailwind CSS
        </footer>
      </div>
    </main>
  );
}