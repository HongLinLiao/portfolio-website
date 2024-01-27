import Link from "next/link";

const maps: { name: string; path: string }[] = [
  { name: "Home", path: "/home" },
];

export default function System() {
  return (
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
  );
}
