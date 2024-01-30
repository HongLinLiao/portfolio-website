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
    }
  }, [innerHTML]);

  return <div ref={shadowHostRef}></div>;
};

export default ShadowDom;
