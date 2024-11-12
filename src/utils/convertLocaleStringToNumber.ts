/**
 * Convert a number that was previously converted to locale string (i.e. to display in the UI) to number to be saved to
 * the DB or to be used in a form.
 * @param localString A number currently in locale string format.
 */
export const convertLocaleStringToNumber = (localeString: string): number => {
    return parseInt(localeString.replaceAll(",", ""));
  };
  