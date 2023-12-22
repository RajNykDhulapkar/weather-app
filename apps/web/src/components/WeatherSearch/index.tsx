"use client";
import { useEffect, useRef } from "react";

interface WeatherSearchProps {
  city: string;
  description?: string;
  onCityChange: (city: string) => void;
  onSearch: () => void;
}

const WeatherSearch: React.FC<WeatherSearchProps> = ({
  city,
  description,
  onCityChange,
  onSearch,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const mirrorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (mirrorRef.current && inputRef.current) {
      inputRef.current.style.width = `${mirrorRef.current.offsetWidth}px`;
    }
  }, [city]);

  return (
    <div className="text-muted-foreground flex justify-center text-3xl">
      <span>Right now in </span>
      <span className="relative font-medium text-foreground inline-flex ml-1 items-center">
        <input
          ref={inputRef}
          className="outline-none font-bold border-none focus:outline-none bg-transparent px-[1px]"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
        />
        <span
          ref={mirrorRef}
          className="absolute invisible font-bold px-[2px] top-full whitespace-nowrap"
        >
          {city || " "}
        </span>
      </span>

      <span>, it&apos;s {description || "loading..."}</span>
    </div>
  );
};

export default WeatherSearch;
