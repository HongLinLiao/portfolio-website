"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

const maps: { name: string; path: string }[] = [
  { name: "Home", path: "/home" },
];

export default function System() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [articleId, setArticleId] = useState<string>();

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && articleId) {
      router.push(`/articles/${articleId}`);
    }
  };

  return (
    <>
      <div className="my-5 border border-solid border-gray-400 rounded-sm px-10 py-5">
        <div className="mb-6">
          <span>Current Theme: </span>
          <select
            className="mx-4 w-[92px] h-[28px] text-center rounded-md border border-solid border-gray-500"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="system">System</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
        <label>
          Article Page:{" "}
          <input
            type="text"
            className="ml-4 text-center rounded-md border border-solid border-gray-500"
            placeholder="Press Enter"
            value={articleId}
            onChange={(e) => setArticleId(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </label>
      </div>
      <div className="my-5 border border-solid border-gray-400 rounded-sm px-10">
        {maps.map(({ name, path }) => (
          <Link
            href={path}
            key={path}
            className="block my-10 py-5 border border-solid rounded-lg bg-blue-300 text-center"
          >
            <span>{name}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
