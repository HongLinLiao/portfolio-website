import { FC, ReactNode } from "react";
import SystemProvider from "../provider/SystemProvider";

interface Props {
  children: ReactNode;
  isMobileFullScreen?: boolean;
}

const MainLayout: FC<Props> = ({ children, isMobileFullScreen = false }) => {
  return (
    <SystemProvider>
      <div
        className={`mx-auto 2xl:w-[1320px] xl:w-[1140px] lg:w-[960px] md:w-[720px] sm-[540px] ${
          isMobileFullScreen ? "w-full" : "w-[90%]"
        }`}
      >
        {children}
      </div>
    </SystemProvider>
  );
};

export default MainLayout;
