import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Skeleton = ({ children }: Props) => {
  return (
    <div className="w-full h-full">
      <div className="animate-pulse">{children}</div>
    </div>
  );
};

export default Skeleton;
