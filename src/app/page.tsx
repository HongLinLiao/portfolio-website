import Avatar from "@/components/me/Avatar";
import My from "@/components/my";
import { ChevronDoubleDown } from "@/components/svg";
import clsx from "clsx";
import Link from "next/link";

export default function App() {
  return (
    <div
      className={clsx(
        "w-screen h-screen",
        "bg-[url('/images/banner.jpg')] bg-cover bg-center",
        "flex justify-center items-center"
      )}
    >
      <div
        className={clsx(
          "w-[280px] sm:w-[400px] p-5 sm:p-10",
          "rounded-2xl bg-gray-500/80 shadow-md shadow-white/30",
          "animate-opacity",
          "flex flex-col justify-center items-center gap-8 sm:gap-12"
        )}
      >
        <div
          className={clsx(
            "w-[85px] h-[85px]",
            "sm:w-[105px] sm:h-[105px] ",
            "rounded-[50%] shadow-md shadow-white/30",
            "flex justify-center items-center",
            "bg-gradient-to-r from-sky-500 to-indigo-500"
          )}
        >
          <div
            className={clsx(
              "w-[80px] h-[80px]",
              "sm:w-[100px] sm:h-[100px]",
              "rounded-[50%] overflow-hidden"
            )}
          >
            <Avatar />
          </div>
        </div>
        <div className="flex flex-col items-center gap-5">
          <div>
            <My className="flex flex-col items-center gap-1" />
            <p className="text-sm font-thin text-center">
              Frontend Engineer@LINE Taiwan
              <br />
              AIDA3 Freediver
            </p>
          </div>
          <Link href="/home">
            <ChevronDoubleDown
              className={clsx(
                "w-[40px] h-[40px]",
                "cursor-pointer animate-bounce",
                "text-white/80 hover:text-gray-200/30",
                "transition-all duration-200"
              )}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
