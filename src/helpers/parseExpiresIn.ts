export const parseExpiresIn = (expiresIn: string): number => {
  const timeUnit = expiresIn.slice(0, -1);
  const timeValue = parseInt(expiresIn.slice(0, -1));

  switch (timeUnit.toLowerCase()) {
    case "d":
      return timeValue;
    case "h":
      return timeValue / 24;
    case "m":
      return timeValue / 1440;
    case "s":
      return timeValue / 86400;

    default:
      // if format is unknown, default to 1 day
      return 1;
  }
};
