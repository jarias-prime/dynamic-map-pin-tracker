"use client";

import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { Icon } from "@iconify/react";

import type { DropdownProps } from "./Dropdown.types";

export const Dropdown = ({
  options,
  value,
  placeholder = "Select an option",
  disabled = false,
  className,
  onChange,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);

    setIsOpen(false);
  };

  return (
    <div className={clsx("relative", className)} ref={dropdownRef}>
      <button
        type="button"
        className={clsx(
          "w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white text-left cursor-pointer",
          "transition duration-150 ease-in-out",
          "hover:border-gray-400",
          disabled && "bg-gray-100 cursor-not-allowed opacity-50",
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span
          className={clsx(
            "block truncate",
            selectedOption ? "text-gray-900" : "text-gray-500",
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <Icon
          icon={isOpen ? "ph:caret-up" : "ph:caret-down"}
          className="h-5 w-5 text-gray-400"
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-md max-h-60 rounded-md py-1 text-base overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={clsx(
                "w-full text-left px-3 py-2 cursor-pointer",
                "transition duration-150 ease-in-out",
                "hover:bg-background-primary-hover hover:text-white",
                "focus:bg-gray-100 focus:outline-none",
                option.value === value &&
                  "bg-background-primary-subdued text-txt-primary",
              )}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
