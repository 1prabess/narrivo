"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };
  return (
    <button onClick={toggleTheme}>
      <Sun className="hidden dark:block" />
      <Moon className="block dark:hidden" />
    </button>
  );
};

export default ThemeToggle;
