export const convertLocaleStringToNumber = (localeString: string): number => {
    return parseInt(localeString.replaceAll(",", ""));
  };
  