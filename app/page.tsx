"use client";

import { useState } from "react";
import { improvePrompt } from "./lib/promptEngine";

export default function Home() {
  const [inputPrompt, setInputPrompt] = useState("");
  const [outputPrompt, setOutputPrompt] = useState("");
  const [category, setCategory] = useState("General");
  const [toast, setToast] = useState("");

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
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg transition">
          {toast}
        </div>
      )}

      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold">🚀 PromptPilot AI</h1>

          <div className="hidden md:flex gap-8 text-gray-300">
            <a href="#" className="hover:text-white transition">
              Home
            </a>
            <a href="#examples" className="hover:text-white transition">
              Examples
            </a>
            <a href="#features" className="hover:text-white transition">
              Features
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* ================= HERO ================= */}
        <section className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold">
            Improve Your AI Prompts
          </h1>
          <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
            Transform simple prompts into clear, detailed and professional AI
            instructions without using any API key.
          </p>
        </section>

        {/* ================= EXAMPLES ================= */}
        <section id="examples" className="mt-14">
          <h2 className="text-2xl font-bold mb-6">Example Prompts</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            <button
              onClick={() =>
                setInputPrompt(
                  "Write a professional email asking for one day leave."
                )
              }
              className="bg-slate-900 hover:bg-slate-800 rounded-xl p-5 text-left border border-slate-800 transition"
            >
              <div className="text-3xl mb-3">📧</div>
              <h3 className="font-semibold">Professional Email</h3>
              <p className="text-sm text-gray-400 mt-2">
                Create formal emails.
              </p>
            </button>

            <button
              onClick={() =>
                setInputPrompt(
                  "Create a LinkedIn post about Artificial Intelligence."
                )
              }
              className="bg-slate-900 hover:bg-slate-800 rounded-xl p-5 text-left border border-slate-800 transition"
            >
              <div className="text-3xl mb-3">💼</div>
              <h3 className="font-semibold">LinkedIn Post</h3>
              <p className="text-sm text-gray-400 mt-2">
                Professional social media content.
              </p>
            </button>

            <button
              onClick={() =>
                setInputPrompt("Explain Machine Learning in simple English.")
              }
              className="bg-slate-900 hover:bg-slate-800 rounded-xl p-5 text-left border border-slate-800 transition"
            >
              <div className="text-3xl mb-3">🎓</div>
              <h3 className="font-semibold">Study Helper</h3>
              <p className="text-sm text-gray-400 mt-2">
                Easy learning prompts.
              </p>
            </button>

            <button
              onClick={() =>
                setInputPrompt(
                  "Write a Python program to calculate factorial."
                )
              }
              className="bg-slate-900 hover:bg-slate-800 rounded-xl p-5 text-left border border-slate-800 transition"
            >
              <div className="text-3xl mb-3">💻</div>
              <h3 className="font-semibold">Programming</h3>
              <p className="text-sm text-gray-400 mt-2">Coding prompts.</p>
            </button>
          </div>
        </section>

        {/* ================= PROMPT EDITOR ================= */}
        <section className="mt-16">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* LEFT PANEL */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">✍️ Prompt Editor</h2>

              {/* Category */}
              <label className="block mb-2 text-sm text-gray-300">
                Prompt Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mb-5 rounded-xl bg-slate-950 border border-slate-700 p-3 outline-none focus:border-blue-500"
              >
                <option value="General">General</option>
                <option value="Study">Study</option>
                <option value="Programming">Programming</option>
                <option value="Business">Business</option>
                <option value="Email">Email</option>
                <option value="Marketing">Marketing</option>
              </select>

              {/* Prompt Input */}
              <label className="block mb-2 text-sm text-gray-300">
                Enter Your Prompt
              </label>
              <textarea
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Type your prompt here..."
                maxLength={3000}
                className="w-full h-56 rounded-xl bg-slate-950 border border-slate-700 p-4 resize-none outline-none focus:border-blue-500"
              />

              {/* Counter */}
              <div className="flex justify-between mt-2 text-sm text-gray-400">
                <span>{inputPrompt.length} / 3000</span>
                <span>{3000 - inputPrompt.length} remaining</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleImprove}
                  disabled={!inputPrompt.trim()}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100 transition rounded-xl py-3 font-semibold"
                >
                  🚀 Improve Prompt
                </button>

                <button
                  onClick={handleClear}
                  className="px-6 rounded-xl border border-slate-700 hover:bg-slate-800 transition"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
              <h2 className="text-2xl font-bold mb-6">✨ AI Output</h2>

              {outputPrompt ? (
                <div className="flex-1 flex flex-col justify-between">
                  <div className="w-full h-56 overflow-y-auto rounded-xl bg-slate-950 border border-slate-700 p-4 whitespace-pre-wrap font-mono text-sm text-gray-200">
                    {outputPrompt}
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={handleCopy}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition rounded-xl py-3 font-semibold"
                    >
                      📋 Copy Prompt
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition rounded-xl py-3 font-semibold"
                    >
                      ⬇️ Download .txt
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-center text-gray-500 py-12">
                  <div>
                    <div className="text-6xl mb-4">✨</div>
                    <h3 className="text-2xl font-bold mb-3 text-white">
                      AI Improved Prompt
                    </h3>
                    <p className="max-w-xs">
                      Click{" "}
                      <span className="text-blue-400 font-semibold">
                        Improve Prompt
                      </span>{" "}
                      to generate a professional prompt.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
