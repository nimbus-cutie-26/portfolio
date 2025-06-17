// src/Components/Preloader.tsx
import React, { useEffect, useState } from "react";

const Preloader: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(onFinish, 1000); // Wait for fade-out animation
        }, 2000); // Display duration of preloader

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-black text-white text-4xl font-bold transition-opacity duration-1000 z-50 ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
        >
            <div className="animate-pulse">Welcome to My Portfolio</div>
        </div>
    );
};

export default Preloader;
