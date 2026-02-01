// 1. CONFIGURATION
//const KEY = "PASTE_YOUR_API_KEY_HERE"; 
const MODEL = "gemini-3-flash-preview"; 

// 2. MAIN QUERY FUNCTION
async function startQuery() {
    const input = document.getElementById('userInput');
    const btn = document.getElementById('btn');
    const text = input.value.trim();
    
    if (!text) return;
    if (KEY === "PASTE_YOUR_API_KEY_HERE") {
        addMsg("SYSTEM: Please paste your API key in script.js", "debug-msg");
        return;
    }

    addMsg(text, 'user');
    input.value = '';
    btn.disabled = true;

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`;
        
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: text }] }] })
        });

        const data = await response.json();

        if (data.error) {
            addMsg(`Error: ${data.error.message}`, "debug-msg");
        } else {
            const reply = data.candidates[0].content.parts[0].text;
            addMsg(reply, 'ai');
        }
    } catch (err) {
        addMsg("NETWORK ERROR: Check connection.", "debug-msg");
    } finally {
        btn.disabled = false;
    }
}

// 3. UI HELPER FUNCTION
function addMsg(msg, type) {
    const chat = document.getElementById('chat');
    const div = document.createElement('div');
    div.className = `msg ${type}`;
    div.innerText = msg;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}