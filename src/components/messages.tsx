type messagesType = {
  [key: string]: string;
};
export const getErrorMessage = ({
  code,
  message = "",
}: {
  code: string;
  message?: string;
}): string => {
  const messages: messagesType = {
    INVALID_LAT_LON: "Please input valid latitude and longitude value",
  };
  return message || messages[code] || "OOPS~ Something went wrong!";
};
