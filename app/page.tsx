"use client";

import { useState } from "react";
import { improvePrompt } from "./lib/promptEngine";

const examples = [
  "Write a professional email requesting leave.",
  "Explain Machine Learning in simple English.",
  "Create a LinkedIn post about Artificial Intelligence.",
  "Write a Python program to calculate factorial.",
];

export default function Home() {
  const [category, setCategory] = useState("General");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const improve = () => {
    if (!prompt.trim()) return;
    setResult(improvePrompt(prompt, category));
  };

  const copy = async () => {
    if (!result) return;

    await navigator.clipboard.writeText(result);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    if (!result) return;

    const blob = new Blob([result], { type: "text/plain" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "improved-prompt.txt";

    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}

          <div>

            <span className="px-4 py-2 rounded-full bg-blue-600/20 text-blue-400 text-sm">
              🚀 AI Prompt Optimizer
            </span>

            <h1 className="text-5xl font-bold mt-6 leading-tight">
              Write Better Prompts.
              <br />
              Get Better AI Results.
            </h1>

            <p className="text-slate-400 mt-6 text-lg">
              PromptPilot AI improves your prompts instantly using intelligent
              prompt engineering. No API key required.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-10">

              {examples.map((item) => (
                <button
                  key={item}
                  onClick={() => setPrompt(item)}
                  className="rounded-xl border border-slate-700 p-4 text-left hover:border-blue-500 hover:bg-slate-900 transition"
                >
                  {item}
                </button>
              ))}

            </div>

          </div>

          {/* Right */}

          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl">

            <h2 className="text-2xl font-bold mb-6">
              Improve Your Prompt
            </h2>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mb-4 rounded-xl bg-slate-950 border border-slate-700 p-3"
            >
              <option>General</option>
              <option>Study</option>
              <option>Coding</option>
              <option>Business</option>
              <option>Writing</option>
              <option>Marketing</option>
            </select>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt..."
              className="w-full h-44 rounded-xl bg-slate-950 border border-slate-700 p-4"
            />

            <div className="flex justify-between text-sm text-slate-500 mt-2">
              <span>{prompt.length}/3000</span>
              <span>{3000 - prompt.length} remaining</span>
            </div>

            <button
              onClick={improve}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 rounded-xl py-4 font-semibold transition"
            >
              Improve Prompt
            </button>

            {result && (
              <div className="mt-8">

                <h3 className="font-semibold mb-3">
                  Improved Prompt
                </h3>

                <div className="rounded-xl bg-slate-950 border border-slate-700 p-5 whitespace-pre-wrap">
                  {result}
                </div>

                <div className="flex gap-3 mt-4">

                  <button
                    onClick={copy}
                    className="flex-1 rounded-xl bg-green-600 hover:bg-green-700 py-3"
                  >
                    {copied ? "Copied ✅" : "Copy"}
                  </button>

                  <button
                    onClick={download}
                    className="flex-1 rounded-xl bg-slate-700 hover:bg-slate-600 py-3"
                  >
                    Download
                  </button>

                </div>

              </div>
            )}

          </div>

        </div>

      </section>

      <footer className="border-t border-slate-800 py-8 text-center text-slate-400">

        <p className="font-semibold text-white">
          PromptPilot AI
        </p>

        <p className="mt-2">
          Improve AI prompts instantly without any API key.
        </p>

        <p className="mt-5">
          Developed by <span className="text-blue-400 font-semibold">Mohammad Hasnain</span>
        </p>

        <p className="mt-2 text-sm">
          Built with Next.js • React • TypeScript • Tailwind CSS
        </p>

      </footer>

    </main>
  );
}
