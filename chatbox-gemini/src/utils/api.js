import axios from "axios";

const API_ENDPOINT = "https://api.openai.com/v1/chat/completions"; // Replace with the Gemini API endpoint

/**
 * Fetch response from the Gemini API.
 * @param {string} prompt - The user input.
 * @param {string} model - The selected Gemini model.
 * @param {boolean} filters - Whether filters are enabled.
 * @returns {Promise<string>} - The response from the assistant.
 */
export async function fetchGeminiResponse(prompt, model, filters) {
  const headers = {
    Authorization: `Bearer YOUR_GEMINI_API_KEY`, // Replace with your actual API key
    "Content-Type": "application/json",
  };

  const payload = {
    model: model || "gpt-4", // Default to a Gemini model
    messages: [{ role: "user", content: prompt }],
    filters: filters ? "enabled" : "disabled", // Pass filters as specified
  };

  try {
    const response = await axios.post(API_ENDPOINT, payload, { headers });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    return "An error occurred while communicating with the assistant.";
  }
}