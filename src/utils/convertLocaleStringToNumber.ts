export const convertLocaleStringToNumber = (localeString: string): number => {
    return parseInt(localeString.replaceAll(",", ""));
  };
  
  export function formatFilename(filename: string | File): string {
    if (filename instanceof File) {
      filename = filename.name;
    }
    if (!filename) {
      return "No File Chosen"
    }
    const fileExtension = filename.substring(filename.lastIndexOf("."));
    const start = filename.substring(0, 8);
    const end = filename.substring(
      filename.lastIndexOf(".") - 4,
      filename.lastIndexOf(".")
    );
    return `${start}.....${end}${fileExtension}`;
  }