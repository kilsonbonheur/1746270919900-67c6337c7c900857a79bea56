import en from "./en";
import fr from "./fr";

const translations = { en, fr };

export function t(language, path) {
  const keys = path.split(".");
  let result = translations[language];
  for (const key of keys) {
    if (result === undefined) return path;
    result = result[key];
  }
  return result || path;
}

export { en, fr };
export default translations;
