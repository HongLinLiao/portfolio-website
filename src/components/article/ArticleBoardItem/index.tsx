"use client";

import { FC, useState } from "react";
import { Article } from "@/utils/article";
import MonthDate from "@/components/general/date/MonthDate";
import Spinner from "@/components/spinner";
import clsx from "clsx";
import Image from "next/legacy/image";

interface Props extends Article {
  className?: string;
}

const getDefaultImage = (id: string) =>
  `https://picsum.photos/2000?random=${id}`;

const ArticleBoardItem: FC<Props> = ({
  className,
  title,
  date,
  banner,
  id,
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      className={clsx(
        "w-full h-full overflow-hidden",
        "flex flex-col",
        "rounded-md bg-gray-200 dark:bg-zinc-800 shadow",
        className
      )}
    >
      <div className="overflow-hidden">
        <div
          className={clsx(
            !imgLoaded && "h-full",
            "flex justify-center items-center",
            "bg-gray-300 dark:bg-zinc-700"
          )}
        >
          {!imgLoaded && <Spinner />}
        </div>
        <Image
          src={banner || getDefaultImage(id)}
          alt={title}
          onLoad={() => setImgLoaded(true)}
          loading="lazy"
          quality={50}
          width="0"
          height="0"
          layout="responsive"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div
        className={clsx(
          "h-[120px]",
          "px-6 py-7",
          "flex flex-col gap-4 justify-center items-center"
        )}
      >
        <h3 className="text-lg font-bold text-center">{title}</h3>
        <MonthDate date={date} className="text-sm opacity-60" />
      </div>
    </div>
  );
};

export default ArticleBoardItem;
