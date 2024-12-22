// chatbox-gemini/src/utils/api.js

import axios from "axios";

// Correct endpoint for Gemini API
const API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

/**
 * Fetches a response from the Gemini API based on the provided prompt.
 * @param {string} prompt - The user input.
 * @param {string} model - The model to use (e.g., "gemini-pro" or "gemini-pro-vision").
 * @param {boolean} filters - Whether to apply safety filters.
 * @returns {Promise<string>} - The response string from the Gemini API.
 */
export async function fetchGeminiResponse(prompt, model = "gemini-pro", filters = true) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const payload = {
      // This payload structure follows the Google PaLM API style for generative language
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      // Only apply safety settings if filters is true
      safetySettings: filters
        ? [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_VIOLENCE",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ]
        : [],
      model,
    };

    const response = await axios.post(API_ENDPOINT, payload, { headers });
    
    // The response data structure may change depending on the API.
    // Adjust this parsing as needed.
    if (response && response.data && response.data.contents) {
      // Extract the assistant's reply (assuming first content -> first part -> text)
      return response.data.contents[0]?.parts[0]?.text || "No response received.";
    } else {
      return "No valid response from server.";
    }
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    return "Error: Unable to fetch response at this time.";
  }
}