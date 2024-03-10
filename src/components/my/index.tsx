import { FC } from "react";
import Link from "next/link";

import SvgIcon from "../general/image/SvgIcon";
import Github from "../svg/Github";
import Instagram from "../svg/Instagram";
import Linkedin from "../svg/Linkedin";
import clsx from "clsx";

interface Props {
  className?: string;
}

const My: FC<Props> = ({ className }) => {
  const svgStyle = `w-[30px] h-[30px] text-gray-800 dark:text-white`;
  const svgHoverStyle = clsx(
    `transition-all`,
    `hover:scale-[1.2] hover:text-gray-500 hover:dark:text-gray-400`
  );

  return (
    <div className={className}>
      <h1 className="text-5xl font-bold">Leo Liao</h1>
      <div className="my-4 flex gap-4">
        <Link href="https://github.com/HongLinLiao" target="_blank">
          <SvgIcon
            icon={<Github />}
            className={`${svgStyle} ${svgHoverStyle}`}
          />
        </Link>
        <Link href="https://www.instagram.com/leo__liaoo/" target="_blank">
          <SvgIcon
            icon={<Instagram />}
            className={`${svgStyle} ${svgHoverStyle}`}
          />
        </Link>
        <Link
          href="https://www.linkedin.com/in/leo-liao-aa2b96187/"
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
