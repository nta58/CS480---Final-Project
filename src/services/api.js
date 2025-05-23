const API_BASE_URL = "http://localhost:3000";

/**
 * Detects emotion from a base64-encoded image using the selected model
 * @param {string} imageBase64 - Base64 encoded image
 * @param {string} modelChoice - Either "huggingFace" or "keras"
 * @returns {Promise<Object>} - Emotion detection results
 */
export const detectEmotion = async (imageBase64, modelChoice) => {
	try {
		const response = await fetch(`${API_BASE_URL}/detect`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				image: imageBase64,
				model: modelChoice,
			}),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error || "Failed to detect emotion");
		}

		return await response.json();
	} catch (error) {
		console.error("Error detecting emotion:", error);
		throw error;
	}
};
