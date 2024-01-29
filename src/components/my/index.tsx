import SvgIcon from "../general/image/SvgIcon";
import { FC } from "react";
import Github from "../svg/Github";
import Instagram from "../svg/Instagram";
import Linkedin from "../svg/Linkedin";

const My: FC = () => {
  const svgClassName = `w-[30px] h-[30px] transition-all hover:scale-[1.3]`;
  const svgHoverClass = `text-gray-800 hover:text-gray-500 dark:text-white dark:hover:text-gray-400`;

  return (
    <>
      <h1 className="text-5xl font-bold ">Leo Liao</h1>
      <div className="my-4 flex gap-4">
        <a href="https://github.com/HongLinLiao" target="_blank">
          <SvgIcon
            icon={<Github />}
            className={`${svgClassName} ${svgHoverClass}`}
          />
        </a>
        <a href="https://www.instagram.com/leo__liaoo/" target="_blank">
          <SvgIcon
            icon={<Instagram />}
            className={`${svgClassName} ${svgHoverClass}`}
          />
        </a>
        <a
          href="https://www.linkedin.com/in/leo-liao-aa2b96187/"
          target="_blank"
        >
          <SvgIcon
            icon={<Linkedin />}
            className={`${svgClassName} ${svgHoverClass}`}
          />
        </a>
      </div>
    </>
  );
};

export default My;
