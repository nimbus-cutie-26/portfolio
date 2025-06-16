import { useEffect, useRef, useState } from "react";

type TypewriterHeadingProps = {
  text: string;
  typingSpeed?: number;
  trigger?: number;
};

export default function TypewriterHeading({
  text,
  typingSpeed = 70,
  trigger,
}: TypewriterHeadingProps): JSX.Element {
  const [displayedText, setDisplayedText] = useState("");
  const indexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);


  useEffect(() => {
    // Reset everything on trigger change
    if (intervalRef.current) clearInterval(intervalRef.current);
    indexRef.current = 0;
    setDisplayedText("");

    intervalRef.current = setInterval(() => {
      indexRef.current++;
      setDisplayedText(text.slice(0, indexRef.current));

      if (indexRef.current >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, typingSpeed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, typingSpeed, trigger]);

  return (
    <h2 className="mt-8 text-lg text-start">
      {displayedText}
      <span className="animate-pulse">|</span>
    </h2>
  );
}
