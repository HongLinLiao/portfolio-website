import { FC } from "react";
import Link from "next/link";

import SvgIcon from "../general/image/SvgIcon";

import clsx from "clsx";
import { Github, Instagram, Linkedin } from "../svg";

interface Props {
  className?: string;
  showTitle?: boolean;
}

const My: FC<Props> = ({ showTitle = true, className }) => {
  const svgStyle = `w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] text-gray-800 dark:text-white`;
  const svgHoverStyle = clsx(
    `transition-all`,
    `hover:scale-[1.2] hover:text-gray-500 hover:dark:text-gray-400`
  );

  return (
    <div className={className}>
      {showTitle && (
        <h1 className="mb-4 text-3xl sm:text-5xl font-bold">Leo Liao</h1>
      )}
      <div className="flex gap-4">
        <Link
          href="https://github.com/HongLinLiao"
          className="flex justify-center"
          target="_blank"
        >
          <SvgIcon
            icon={<Github />}
            className={`${svgStyle} ${svgHoverStyle}`}
          />
        </Link>
        <Link
          href="https://www.instagram.com/leo__liaoo/"
          className="flex justify-center"
          target="_blank"
        >
          <SvgIcon
            icon={<Instagram />}
            className={`${svgStyle} ${svgHoverStyle}`}
          />
        </Link>
        <Link
          href="https://www.linkedin.com/in/leo-liao-aa2b96187/"
          className="flex justify-center"
          target="_blank"
        >
          <SvgIcon
            icon={<Linkedin />}
            className={`${svgStyle} ${svgHoverStyle}`}
          />
        </Link>
      </div>
    </div>
  );
};

export default My;
