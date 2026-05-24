"use client";

import { useEffect, useRef, useState } from "react";
import { getLocationSuggestions } from "@/lib/destination-search";

type LocationInputProps = {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSelect?: () => void;
  type?: "text" | "date";
};

export function LocationInput({
  icon,
  placeholder,
  value,
  onChange,
  onSelect,
  type = "text",
}: LocationInputProps) {
  const wrapperRef = useRef<HTMLLabelElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const suggestions =
    type === "text" ? getLocationSuggestions(value, 6) : [];

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const pickSuggestion = (suggestion: string) => {
    onChange(suggestion);
    setOpen(false);
    setActiveIndex(-1);
    onSelect?.();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (type !== "text" || !open || suggestions.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      pickSuggestion(suggestions[activeIndex]);
    } else if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <label ref={wrapperRef} className="relative flex flex-1 items-center gap-2 rounded-full px-4 py-2.5 text-left transition hover:bg-slate-50">
      <span className="text-slate-500">{icon}</span>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => {
          onChange(event.target.value);
          if (type === "text") {
            setOpen(true);
            setActiveIndex(-1);
          }
        }}
        onFocus={() => type === "text" && setOpen(true)}
        onKeyDown={onKeyDown}
        className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-500 focus:outline-none"
        autoComplete="off"
      />

      {type === "text" && open && suggestions.length > 0 && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white py-1 shadow-lift"
        >
          {suggestions.map((suggestion, index) => (
            <li key={suggestion} role="option" aria-selected={index === activeIndex}>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => pickSuggestion(suggestion)}
                className={`w-full px-4 py-2.5 text-left text-sm transition hover:bg-slate-50 ${
                  index === activeIndex
                    ? "bg-slate-100 font-medium text-slate-900"
                    : "text-slate-700"
                }`}
              >
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      )}
    </label>
  );
}
