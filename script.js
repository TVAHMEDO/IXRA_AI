const apiKey = "AIzaSyCQwQGHKsfANuWOoDD-XFz-GG86y6li714"; // Your actual API key
const form = document.querySelector('#chat-form');
const chatLog = document.querySelector('#response-log');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const chatInput = document.querySelector('input[name="chat"]');
    const chatText = chatInput.value.trim().toLowerCase(); // Convert input to lowercase for consistent matching

    if (chatText === "") return; // Do nothing if input is empty

    // Define a dictionary of responses for unlimited keywords
    const responses = {
        "what is your name": "My name is AHMED_XD. I am today's your assistant.",
        "who is your creator": "I was created by a talented developer, and I'm here to assist you with anything you need!",
        "who is your developer": "My developer is a skilled coder passionate  AHMED_XD.",
        "what are my habits": "Your habits include learning, coding, and showing immense love for Isra. You're also passionate about technology and development.",
        "who do i love": "You love Isra deeply, and it shows in everything you do!",
        "isra": "You love Isra deeply, and it shows in everything you do!",
        "tell me a fun fact": "Did you know octopuses have three hearts? It's a fact you once shared as well!",
        "who is isra": "Isra is someone very special to you, and your love for her is inspiring!",
        "do you love isra": "I know you love Isra a lot, and that's truly amazing!",
        "what do you know about isra": "Isra is the person you hold close to your heart, and she's incredibly lucky to have your love.",
        "what is your purpose": "My purpose is to assist you with everything you need, from answering questions to brightening your day.",
        "do you know me": "Of course! You're an amazing person who loves coding, learning, and showing care for others.",
        "what is my favorite hobby": "Your favorite hobbies include coding, exploring technology, and thinking about Isra!"
    };

    // Check if the input matches any predefined keywords
    if (responses[chatText]) {
        const customResponse = responses[chatText];
        chatLog.innerHTML += `<div class="message">${chatText}</div>`;
        chatLog.innerHTML += `<div class="response">${customResponse}</div>`;
        chatInput.value = '';
        chatLog.scrollTop = chatLog.scrollHeight;
        return;
    }

    // Default response for unhandled inputs
    const defaultResponse = "I'm here to help with anything you'd like to ask. Let's talk!";
    chatLog.innerHTML += `<div class="message">${chatText}</div>`;
    chatLog.innerHTML += `<div class="response">${defaultResponse}</div>`;

    try {
        // Display user message in the chat
        const userMessage = `<div class="message">${chatText}</div>`;
        chatLog.innerHTML += userMessage;

        // Create payload for API request
        const requestBody = {
            contents: [
                {
                    parts: [
                        { text: chatText }
                    ]
                }
            ]
        };

        // Send request to Google's generative AI API
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) throw new Error("API request failed");

        const data = await response.json();
        let responseText = data.candidates[0].content.parts[0].text;

        // Fix the highlighting and bold text by handling ***text*** for <h3> and **text** for <b> tags
        responseText = responseText.replace(/\*\*\*(.*?)\*\*\*/g, "<h3>$1</h3>"); // Highlight text
        responseText = responseText.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>"); // Bold text

        // Display AI response in the chat
        const aiResponse = `<div class="response">${responseText}</div>`;
        chatLog.innerHTML += aiResponse;

    } catch (error) {
        console.error("Error:", error);
        chatLog.innerHTML += `<div class="response">Sorry, there was an error.</div>`;
    } finally {
        // Clear input field after submission
        chatInput.value = '';
        // Scroll to the bottom of the chat log
        chatLog.scrollTop = chatLog.scrollHeight;
    }
});