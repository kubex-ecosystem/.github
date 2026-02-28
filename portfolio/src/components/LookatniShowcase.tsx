'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Lock, Unlock, Play, FileTerminal } from 'lucide-react';

export const LookatniShowcase = () => {
    const [status, setStatus] = useState("IDLE");
    const [mode, setMode] = useState<"DEMO" | "LIVE">("DEMO");
    const [apiKey, setApiKey] = useState("");
    const [prompt, setPrompt] = useState("");
    const [output, setOutput] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const streamRef = useRef("");

    const slogans = [
        "Designed to exist. / Freedom, Engineered.",
        "When I think, I evolve. / Evolution is built in.",
        "The universe doesn’t stop. / Neither do we."
    ];

    const handleRun = async () => {
        if (!prompt.trim() || isGenerating) return;

        setIsGenerating(true);
        setStatus("GENERATING");
        setOutput("");
        streamRef.current = "";

        if (mode === "DEMO") {
            // Simulate Demo output
            const demoResponse = `// === src/main.go === //
package main

import "fmt"

func main() {
  // Slogans as system instructions:
  fmt.Println("${slogans[Math.floor(Math.random() * slogans.length)]}")
}
`;

            const chunks = demoResponse.split("");
            for (let i = 0; i < chunks.length; i++) {
                streamRef.current += chunks[i];
                setOutput(streamRef.current);
                await new Promise(r => setTimeout(r, 20));
            }
            setStatus("STANDBY");
            setIsGenerating(false);
            return;
        }

        // Live mode bypassing to lookatni-pro AI service backend (port 3001)
        try {
            const systemPrompt = "You are Lookatni Showcase AI. Generate portable, sovereign code using Lookatni Markers.";
            const res = await fetch("http://localhost:3001/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt, systemPrompt, apiKey, provider: "anthropic" })
            });

            if (!res.ok) throw new Error("API Bridge Error");
            const reader = res.body?.getReader();
            if (!reader) throw new Error("No reader");

            const dec = new TextDecoder();
            let buffer = "";
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += dec.decode(value, { stream: true });
                const lines = buffer.split('\\n');
                buffer = lines.pop() || "";

                for (const line of lines) {
                    if (line.startsWith("data: ")) {
                        const dataStr = line.substring(6).trim();
                        if (dataStr === "[DONE]") break;
                        try {
                            const data = JSON.parse(dataStr);
                            if (data.type === "content_block_delta" && data.delta?.text) {
                                streamRef.current += data.delta.text;
                                setOutput(streamRef.current);
                            }
                        } catch (e) { }
                    }
                }
            }
            setStatus("COMPLETED");
        } catch (error: any) {
            setOutput(`Error: ${error.message} - Make sure lookatni-pro is running on port 3001.`);
            setStatus("ERROR");
        } finally {
            setIsGenerating(false);
        }
    };

    const extractMagicHtml = () => {
        const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <title>Lookatni Magic Artifact</title>
  <style>
    body { background: black; color: #4ade80; font-family: monospace; padding: 2rem; }
    pre { white-space: pre-wrap; word-wrap: break-word; }
  </style>
</head>
<body>
  <h1>Lookatni Generated Code</h1>
  <pre>${output || "No code generated yet."}</pre>
</body>
</html>`;
        const blob = new Blob([htmlContent], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "magic-artifact.html";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <section className="w-full border border-green-900/40 bg-black/80 backdrop-blur-md rounded-md overflow-hidden my-12 font-mono" id="lookatni-showcase">
            <div className="bg-green-950/20 border-b border-green-900/40 p-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-green-500" />
                    <span className="text-[10px] text-green-700 tracking-[0.2em] uppercase">
                        Lookatni_Showcase_v2.0 // {status}
                    </span>
                </div>
                <span className="text-[10px] text-green-900 animate-pulse hidden md:block">
                    [ LUCID CO-AUTHORSHIP ENABLED ]
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[420px]">
                <div className="p-8 border-r border-green-900/20 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-2xl font-bold text-green-500 tracking-tighter uppercase">
                                Experience Sovereignty.
                            </h2>
                            <button
                                onClick={() => setMode(mode === "DEMO" ? "LIVE" : "DEMO")}
                                className="text-[10px] uppercase font-bold text-green-600 bg-green-950/40 px-3 py-1 rounded border border-green-900/50 flex items-center gap-2 hover:bg-green-900/40 transition-colors"
                                title="Toggle BYOK Live Mode"
                            >
                                {mode === "DEMO" ? <Lock size={12} /> : <Unlock size={12} className="text-red-400" />}
                                {mode === "DEMO" ? "Enable BYOK" : "Live Mode"}
                            </button>
                        </div>

                        <p className="text-sm text-green-800 mb-8 leading-relaxed">
                            Generate full-stack architectures instantly. No lock-in.
                            Just clean, portable code in Lookatni File Markers format.
                        </p>
                        <div className="space-y-4">
                            {mode === "LIVE" && (
                                <input
                                    type="password"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    placeholder="Anthropic API Key (sk-ant...)"
                                    className="w-full bg-green-950/30 border border-green-900/50 p-2 text-green-400 text-xs focus:outline-none focus:border-red-900/80 transition-colors mb-2"
                                />
                            )}
                            <div className="relative">
                                <input
                                    type="text"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleRun()}
                                    disabled={isGenerating}
                                    placeholder="Describe your project..."
                                    className="w-full bg-green-950/10 border border-green-900/50 p-4 pl-4 pr-24 text-green-400 text-sm focus:outline-none focus:border-green-500 transition-colors disabled:opacity-50"
                                />
                                <button
                                    onClick={handleRun}
                                    disabled={isGenerating}
                                    className="absolute right-2 top-2 bg-green-500 text-black px-6 py-2 text-xs font-bold hover:bg-green-400 transition-all uppercase disabled:opacity-50 flex items-center gap-1"
                                >
                                    <Play size={12} /> Run
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-4 border-t border-green-900/10 text-[10px] text-green-600 italic">
                        {slogans[0]}
                    </div>
                </div>

                <div className="bg-green-950/5 p-8 flex flex-col">
                    <div className="flex gap-2 mb-4">
                        <div className={`px-2 py-1 text-[9px] border uppercase font-bold ${mode === "DEMO" ? 'bg-green-900/20 text-green-500 border-green-900/50' : 'bg-red-900/20 text-red-500 border-red-900/50'}`}>
                            {mode}_MODE
                        </div>
                        <div className="px-2 py-1 bg-black text-[9px] text-green-800 border border-green-900/20 uppercase font-bold">
                            Lucid_Engine
                        </div>
                    </div>

                    <div className="flex-1 text-[11px] text-green-500/80 leading-relaxed overflow-y-auto whitespace-pre-wrap">
                        {!output && mode === "DEMO" ? (
                            <span className="opacity-50">// System idle. Enter prompt and press run.</span>
                        ) : !output && mode === "LIVE" ? (
                            <span className="opacity-50">// Live mode initialized. API Key required.</span>
                        ) : (
                            output
                        )}
                        {isGenerating && <span className="animate-pulse ml-1 text-green-400">█</span>}
                    </div>

                    <button
                        onClick={extractMagicHtml}
                        disabled={!output || isGenerating}
                        className="mt-6 w-full border border-green-500/50 text-green-500 py-3 text-xs font-bold hover:bg-green-500 hover:text-black transition-all uppercase tracking-widest disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-green-500 flex items-center justify-center gap-2"
                    >
                        <FileTerminal size={14} /> Extract "Magic HTML"
                    </button>
                </div>
            </div>
        </section>
    );
};
