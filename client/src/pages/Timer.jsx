import { useState, useEffect } from "react";

export default function App() {
    const [time, setTime] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState("Focus");
    const [cycles, setCycles] = useState(0);

    useEffect(() => {
        let timer;

        if (isRunning) {
            timer = setInterval(() => {
                setTime((prev) => {
                    if (prev === 1) {
                        handleTimerEnd();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isRunning, mode]);

    const handleTimerEnd = () => {
        if (mode === "Focus") {
            setMode("Break");
            setTime(5 * 60);
        } else {
            setMode("Focus");
            setTime(25 * 60);
            setCycles((c) => c + 1);
        }
    };

    // 🔹 Controls
    const startFocus = () => {
        setMode("Focus");
        setTime(25 * 60);
        setIsRunning(false);
    };

    const startBreak = () => {
        setMode("Break");
        setTime(5 * 60);
        setIsRunning(false);
    };

    const skipBreak = () => {
        if (mode === "Break") {
            startFocus();
        }
    };

    const extendBreak = () => {
        if (mode === "Break") {
            setTime((prev) => prev + 2 * 60);
        }
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(mode === "Focus" ? 25 * 60 : 5 * 60);
    };

    const formatTime = () => {
        const mins = Math.floor(time / 60).toString().padStart(2, "0");
        const secs = (time % 60).toString().padStart(2, "0");
        return `${mins}:${secs}`;
    };

    return (
        <div
            className={`min-h-screen flex items-center justify-center ${
                mode === "Focus" ? "bg-blue-50" : "bg-green-50"
            }`}
        >
            <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center gap-6 w-96">

                <h1 className="text-2xl font-bold text-gray-800">
                    Focus Tracker
                </h1>

                {/* MODE BADGE */}
                <div
                    className={`text-sm font-semibold px-4 py-1 rounded-full ${
                        mode === "Focus"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-green-100 text-green-600"
                    }`}
                >
                    {mode === "Focus" ? "Focus Time" : "Break Time"}
                </div>

                {/* TIMER */}
                <div
                    className={`text-7xl font-mono font-bold ${
                        mode === "Focus"
                            ? "text-blue-600"
                            : "text-green-600"
                    }`}
                >
                    {formatTime()}
                </div>

                {/* BUTTONS */}
                <div className="flex gap-3 flex-wrap justify-center">

                    {/* Start / Pause */}
                    <button
                        onClick={() => setIsRunning(!isRunning)}
                        className={`px-5 py-2 rounded-lg text-white font-medium ${
                            isRunning
                                ? "bg-gray-500 hover:bg-gray-600"
                                : mode === "Focus"
                                ? "bg-blue-500 hover:bg-blue-600"
                                : "bg-green-500 hover:bg-green-600"
                        }`}
                    >
                        {isRunning ? "Pause" : "Start"}
                    </button>

                    {/* Reset */}
                    <button
                        onClick={handleReset}
                        className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
                    >
                        Reset
                    </button>

                    {/* Break Controls */}
                    {mode === "Break" && (
                        <>
                            <button
                                onClick={skipBreak}
                                className="px-5 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white"
                            >
                                Skip Break
                            </button>

                            <button
                                onClick={extendBreak}
                                className="px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white"
                            >
                                +2 Min
                            </button>
                        </>
                    )}

                    {/* Focus Controls */}
                    {mode === "Focus" && (
                        <button
                            onClick={startBreak}
                            className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
                        >
                            Take Break
                        </button>
                    )}
                </div>

                <p className="text-gray-400 text-sm">
                    Cycles completed: {cycles}
                </p>
            </div>
        </div>
    );
}