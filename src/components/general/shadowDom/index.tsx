"use client";
import { FC, useEffect, useRef } from "react";

interface Props {
  innerHTML: string;
}

const ShadowDom: FC<Props> = ({ innerHTML }) => {
  const shadowHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shadowHostRef.current && !shadowHostRef.current.shadowRoot) {
      const shadowRoot = shadowHostRef.current.attachShadow({ mode: "open" });
      shadowRoot.innerHTML = innerHTML;

      const style = document.createElement("style");
      style.textContent = `
        * {
          word-wrap: break-word; /* 在单词边界处换行 */
          overflow-wrap: break-word; /* 老版本浏览器支持的属性 */
        }
        code {
          margin: 0 8px;
          padding: 4px;
          border-radius: 5px;
          color: red;
          background-color: #f4f4f4;
        }
        pre > code {
          color: black;
          display: block;
          padding: 10px;
          background-color: #f4f4f4;
          border-radius: 5px;
          font-family: 'Courier New', Courier, monospace;
          font-size: 14px;
          line-height: 1.5;
          overflow-x: auto;
          white-space: pre-wrap;
        }
      `;
      shadowRoot.appendChild(style);
    }
  }, [innerHTML]);

  return <div ref={shadowHostRef}></div>;
};

export default ShadowDom;
