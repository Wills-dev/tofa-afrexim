export const useGetDocumentUrl = () => {
  const parseDocumentUrl = (urlString: string) => {
    try {
      // Handle cases where URL might be wrapped in array format
      if (urlString.startsWith("[") && urlString.endsWith("]")) {
        const parsed = JSON.parse(urlString);
        return Array.isArray(parsed) ? parsed[0] : urlString;
      }
      return urlString;
    } catch {
      return urlString;
    }
  };
  return { parseDocumentUrl };
};
