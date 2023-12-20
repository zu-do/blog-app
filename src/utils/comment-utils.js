import { format, parseISO } from "date-fns";

export const getFormatedDate = (date) => {
  const createdAtDate = parseISO(date);
  const formattedDateTime = format(createdAtDate, "yyyy-MM-dd HH:mm:ss");
  return formattedDateTime;
};
