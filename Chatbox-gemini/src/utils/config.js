export const config = {
  API_KEY: process.env.REACT_APP_GEMINI_API_KEY || '',
  API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT || "https://generativelanguage.googleapis.com/v1beta/models",
  MAX_MESSAGES: 50,
  DEFAULT_MODEL: "gemini-pro",
  SAFETY_FILTERS: true
};
