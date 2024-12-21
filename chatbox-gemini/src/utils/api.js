import axios from "axios";

// Correct endpoint for Gemini API
const API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export async function fetchGeminiResponse(prompt, model = "gemini-pro", filters = true) {
  const headers = {
      "Content-Type": "application/json",
        };

          const payload = {
              contents: [
                    {
                            parts: [
                                      {
                                                  text: prompt
                                                            }
                                                                    ]
                                                                          }
                                                                              ],
                                                                                  safetySettings: filters ? [
                                                                                        {
                                                                                                category: "HARM_CATEGORY_HARASSMENT",
                                                                                                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                                                                                                              },
                                                                                                                    {
                                                                                                                            category: "HARM_CATEGORY_HATE_SPEECH",
                                                                                                                                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                                                                                                                                          },
                                                                                                                                                {
                                                                                                                                                        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                                                                                                                                                                threshold: "BLOCK_MEDIUM_AND_ABOVE"
                                                                                                                                                                      },
                                                                                                                                                                            {
                                                                                                                                                                                    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                                                                                                                                                                                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                                                                                                                                                                                                  }
                                                                                                                                                                                                      ] : [],
                                                                                                                                                                                                          generationConfig: {
                                                                                                                                                                                                                temperature: 0.7,
                                                                                                                                                                                                                      topK: 40,
                                                                                                                                                                                                                            topP: 0.95,
                                                                                                                                                                                                                                  maxOutputTokens: 1024,
                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                        };

                                                                                                                                                                                                                                          try {
                                                                                                                                                                                                                                              const response = await axios.post(
                                                                                                                                                                                                                                                    `${API_ENDPOINT}?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
                                                                                                                                                                                                                                                          payload,
                                                                                                                                                                                                                                                                { headers }
                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                            return response.data.candidates[0].content.parts[0].text;
                                                                                                                                                                                                                                                                              } catch (error) {
                                                                                                                                                                                                                                                                                  console.error("Error fetching Gemini response:", error);
                                                                                                                                                                                                                                                                                      return "An error occurred while communicating with the assistant.";
                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                        }