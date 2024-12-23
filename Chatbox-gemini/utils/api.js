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
import axios from "axios";
import { config } from './config';

const API_BASE = `${config.API_ENDPOINT}`;

export async function fetchGeminiResponse(prompt, model = config.DEFAULT_MODEL, filters = config.SAFETY_FILTERS) {
  if (!config.API_KEY) {
    throw new Error("API key not configured");
  }

  try {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${config.API_KEY}`
    };

    const payload = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      safetySettings: filters ? [
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
      ] : [],
      model,
    };

    const endpoint = `${API_BASE}/${model}:generateContent`;
    const response = await axios.post(endpoint, payload, { headers });

    if (response?.data?.contents?.[0]?.parts?.[0]?.text) {
      return response.data.contents[0].parts[0].text;
    }

    throw new Error("Invalid response structure");
  } catch (error) {
    console.error("Gemini API Error:", error);
    if (error.response) {
      switch (error.response.status) {
        case 401:
          throw new Error("Authentication failed. Please check your API key.");
        case 429:
          throw new Error("Rate limit exceeded. Please try again later.");
        case 500:
          throw new Error("Gemini API server error. Please try again later.");
        default:
          throw new Error(`API Error: ${error.response.status}`);
      }
    }
    throw error;
  }
}      return "No valid response from server.";
    }
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    return "Error: Unable to fetch response at this time.";
  }
}
