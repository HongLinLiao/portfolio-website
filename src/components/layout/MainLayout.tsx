import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <div className="mx-auto 2xl:w-[1320px] xl:w-[1140px] lg:w-[960px] md:w-[720px] sm-[540px] w-full">
      {children}
    </div>
  );
};

export default MainLayout;
