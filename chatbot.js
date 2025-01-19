// loads the interactive devices 
document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.getElementById("send-button");
    const userInput = document.getElementById("user-input");
    const chatWindow = document.getElementById("chat-window");

// chatbot responses
    const responses = {
        "hello": "Hi there! How can I assist you today?",
        "overwhelmed": "It's normal to feel overwhelmed with school work; try directing yourself to the 'time management' page linked above!",
        "sad": "It's important to get the proper support when feeling sad. Click on the 'get help' page linked above.",
        "tired": "There can be multiple reasons for feeling tired. Click on the 'health tracker' page linked above for a better understanding of why you might be feeling this way.",
        "thank you": "You're welcome! Let me know if you need anything else.",
        "bye": "Goodbye! Take care and stay well."
    };


// changes responses to the alr created chatbot responses 
    const sendMessage = () => {
        const userMessage = userInput.value.trim().toLowerCase();
        if (!userMessage) return;

// Add user message to chat -- references next method
        appendMessage("user-message", userInput.value);

// bot response (based on valid input or not)
        const botResponse = responses[userMessage] || "I'm sorry, I didn't understand that. Could you rephrase?";
        appendMessage("bot-message", botResponse);

        userInput.value = "";
    };

// Adds a message to the chat
    const appendMessage = (className, message) => {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${className}`;
        messageDiv.textContent = message;
        chatWindow.appendChild(messageDiv);
// Auto-scroll as messages move downward
        chatWindow.scrollTop = chatWindow.scrollHeight; 
    };

// button/keyboard commands
    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

});