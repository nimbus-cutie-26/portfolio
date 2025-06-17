import React, { useEffect, useState, useRef } from "react";

interface Splash {
    id: number;
    x: number;
    y: number;
    color: string;
}

const colors = ["bg-blue-400", "bg-pink-500", "bg-green-400", "bg-yellow-400", "bg-purple-500"];

const SplashCursor: React.FC = () => {
    const [splashes, setSplashes] = useState<Splash[]>([]);
    const [currentColor, setCurrentColor] = useState<string>("bg-blue-400");
    const lastTimeRef = useRef<number>(0);
    const delay = 100;

    const createSplash = (e: MouseEvent, color: string) => {
        const now = Date.now();
        if (now - lastTimeRef.current < delay) return;

        lastTimeRef.current = now;

        const splash: Splash = {
            id: now,
            x: e.clientX,
            y: e.clientY,
            color,
        };

        setSplashes((prev) => [...prev, splash]);

        setTimeout(() => {
            setSplashes((prev) => prev.filter((s) => s.id !== splash.id));
        }, 500);
    };

    const handleMouseMove = (e: MouseEvent) => {
        createSplash(e, currentColor);
    };

    const handleClick = () => {
        // Pick a new color different from the current
        const nextColor = colors[Math.floor(Math.random() * colors.length)];
        setCurrentColor(nextColor);
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("click", handleClick);
        };
    }, [currentColor]);

    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none cursor-none">
            {splashes.map((splash) => (
                <span
                    key={splash.id}
                    className={`absolute w-6 h-6 ${splash.color} rounded-full opacity-50 animate-splash`}
                    style={{ top: splash.y - 12, left: splash.x - 12 }}
                />
            ))}
        </div>
    );
};

export default SplashCursor;
