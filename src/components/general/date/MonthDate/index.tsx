import { parseISO, format } from "date-fns";
import { FC, TimeHTMLAttributes } from "react";

interface Props extends TimeHTMLAttributes<HTMLElement> {
  date: string;
}

const MonthDate: FC<Props> = ({ date, ...props }) => {
  const isoDate = parseISO(date);
  return (
    <time dateTime={date} {...props}>
      {format(isoDate, "LLLL d, yyyy")}
    </time>
  );
};

export default MonthDate;
