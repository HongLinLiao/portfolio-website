import { FC, ReactNode, ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
};

const SvgIcon: FC<Props> = ({ icon, ...props }) => {
  return <button {...props}>{icon}</button>;
};

export default SvgIcon;
