const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function askGroqAI(userMessage, context = "") {
  const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

  if (!apiKey || apiKey === "your_groq_api_key_here") {
    return "⚠️ Please add your Groq API key in the `.env.local` file.\n\nGet a free key at: https://console.groq.com/keys";
  }

  const systemPrompt = `You are AstroBot 🚀, the AI assistant for AstroClub — a smart digital ecosystem for managing college club activities. 
You help students discover clubs, find events, track participation, and get personalized recommendations.
You are friendly, concise, and encouraging. Use emojis occasionally.
${context ? `\nContext about the user's data:\n${context}` : ""}
Keep responses brief (2-4 sentences max) unless asked for details.`;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || "API request failed");
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Groq AI Error:", error);
    return `❌ Error: ${error.message}`;
  }
}

export async function getEventRecommendations(userInterests, events) {
  const eventList = events.map((e) => `${e.title} (${e.type}) by ${e.clubName}`).join("\n");
  const prompt = `Based on these interests: ${userInterests.join(", ")}
  
Recommend the top 3 events from this list and explain why briefly:
${eventList}`;

  return askGroqAI(prompt);
}

export async function getClubRecommendations(userInterests, clubs) {
  const clubList = clubs.map((c) => `${c.name} (${c.category}): ${c.description}`).join("\n");
  const prompt = `Based on these interests: ${userInterests.join(", ")}

Recommend the top 3 clubs from this list and explain why in 1 line each:
${clubList}`;

  return askGroqAI(prompt);
}
