document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.getElementById("send-button");
    const userInput = document.getElementById("user-input");
    const chatWindow = document.getElementById("chat-window");

    // predefined responses
    const responses = {
        "hello": "Hi there! I'm here for you. How are you feeling today?",
        "hi": "Hi there! I'm here for you. How are you feeling today?",
        "hey": "Hi there! I'm here for you. How are you feeling today?",
        "overwhelmed": "I'm sorry you're feeling overwhelmed. It's completely normal to feel this way sometimes. Would you like to talk about what's causing it? You can also visit the time management page above.",
        "stressed": "I'm sorry you're feeling overwhelmed. It's completely normal to feel this way sometimes. Would you like to talk about what's causing it? You can also visit the time management page above.",
        "sad": "I'm here to listen. Feeling sad can be hard to manage, but you're not alone. What’s been on your mind? You can also visit the get help page above.",
        "tired": "It sounds like you’ve been running on empty. Rest is so important. Is there something specific wearing you out? You can also visit the health tracker page above.",
        "thank you": "You're so welcome! I'm glad I could help. Let me know if there's anything else on your mind.",
        "thanks": "You're so welcome! I'm glad I could help. Let me know if there's anything else on your mind.",
        "bye": "Goodbye! Remember, you matter and deserve kindness. Take care!",
        "happy": "That's wonderful to hear! What’s making you happy today?",
        "excited": "Exciting times! Tell me more—what’s got you feeling this way?",
        "good": "I’m so glad to hear that! What’s been going well for you?"
    };

    // fallback responses
    const empatheticFallbacks = [
        "I'm here for you. It’s okay to feel this way—take your time and share as much as you'd like.",
        "That sounds tough. I'm listening if you want to tell me more about it.",
        "Sometimes, just letting it all out can help. Go ahead—I’m here.",
        "You don’t have to hold it all in. I’m here to listen without judgment."
    ];

    const positiveFallbacks = [
        "That’s fantastic! Tell me more about what’s making you happy.",
        "I’m thrilled to hear you’re feeling good! What’s been the highlight of your day?",
        "Your happiness is contagious! What’s been going so well for you?",
        "That’s so great! Anything you’d like to share about why you’re feeling this way?"
    ];

    const neutralFallbacks = [
        "Thanks for sharing. Want to tell me more about that?",
        "I hear you. Feel free to elaborate if you'd like.",
        "Tell me more.",
        "I’m listening—what else is on your mind?"
    ];

    // generate a random fallback response
    const getFallbackResponse = (mood) => {
        switch (mood) {
            case "positive":
                return positiveFallbacks[Math.floor(Math.random() * positiveFallbacks.length)];
            case "negative":
                return empatheticFallbacks[Math.floor(Math.random() * empatheticFallbacks.length)];
            case "neutral":
            default:
                return neutralFallbacks[Math.floor(Math.random() * neutralFallbacks.length)];
        }
    };

    // identify the mood of the message
    const identifyMood = (message) => {
        const positiveWords = ["happy", "excited", "great", "good", "awesome", "fantastic"];
        const negativeWords = ["down", "bad", "upset", "unhappy", "depressed", "miserable"];
        if (positiveWords.some((word) => message.includes(word))) {
            return "positive";
        } else if (negativeWords.some((word) => message.includes(word))) {
            return "negative";
        }
        return "neutral";
    };

    // send user message and generate a chatbot response
    const sendMessage = () => {
        const userMessage = userInput.value.trim().toLowerCase();
        if (!userMessage) return;

        // add user message to chat
        appendMessage("user-message", userMessage);

        // prioritize exact or partial match from responses
        const matchedKey = Object.keys(responses).find((key) => userMessage.includes(key));
        let botResponse = matchedKey ? responses[matchedKey] : null;

        // if no match, use a fallback response based on mood
        if (!botResponse) {
            const mood = identifyMood(userMessage);
            botResponse = getFallbackResponse(mood);
        }

        // add bot response to chat
        appendMessage("bot-message", botResponse);

        // clear input field
        userInput.value = "";
    };

    // append a message to the chat window
    const appendMessage = (className, message) => {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${className}`;
        messageDiv.textContent = message;
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll
    };

    // button and keyboard commands
    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });
});
