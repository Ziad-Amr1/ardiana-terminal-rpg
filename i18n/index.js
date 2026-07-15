// ./i18n/index.js
const en = require("./localization/en.json");

const t = (key, options = {}) => {
  if (!key) {
    throw new Error("No key provided");
  }

  if (typeof key !== "string") {
    throw new Error("Key must be a string");
  }

  let result = key.split(".").reduce((o, i) => {
    if (o === undefined || o === null) {
      return undefined;
    }

    return o[i];
  }, en);

  if (result === undefined) {
    throw new Error(`Translation for "${key}" not found`);
  }
  
  if (typeof options !== "object") {
    throw new Error("Options must be an object");
  }

  for (const key in options) {
    const value = options[key];
    const placeholder = `{{${key}}}`;
    result = result.replace(placeholder, value);
  }
  return result;
};

module.exports = { t };
