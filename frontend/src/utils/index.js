const stringToColor = (string) => {
  let hash = 0;
  let i;
  /* eslint-disable no-bitwise */
  for (i = 0; i < string?.length; i += 1) {
    hash = string?.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
};

export const stringAvatar = (name) => {
  return {
    sx: {
      mr: 1,
      bgcolor: stringToColor(name),
    },
    children: `${name?.split(" ")[0][0]}${name?.split(" ")[1]?.[0] || ""}`,
  };
};

export const convertDate = (dateStr) => {
  if (!dateStr) {
    console.error("Invalid date string:", dateStr);
    return "Invalid Date"; // Handle invalid cases gracefully
  }
  const date = new Date(dateStr);
  if (isNaN(date)) {
    console.error("Failed to parse date:", dateStr);
    return "Invalid Date";
  }
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString(options);
  return formattedDate;
};
