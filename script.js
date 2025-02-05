const textInput = document.getElementById("text-input");
const speakBtn = document.getElementById("speak-btn");
const stopBtn = document.getElementById("stop-btn");
const languageSelect = document.getElementById("language-select");
const voiceSelect = document.getElementById("voice-select");
const waveAnimation = document.getElementById("wave");

// Speech Synthesis API
let speech = new SpeechSynthesisUtterance();
let voices = [];

// Load available voices
function loadVoices() {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = ""; // Clear previous options

    voices.forEach(voice => {
        const option = document.createElement("option");
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang}) ${voice.gender === "male" ? "♂️" : "♀️"}`;
        voiceSelect.appendChild(option);
    });

    // Select the first available voice by default
    if (voices.length > 0) {
        voiceSelect.value = voices[0].name;
    }
}

// Ensure voices are loaded properly
speechSynthesis.onvoiceschanged = loadVoices;

// Function to start speaking
speakBtn.addEventListener("click", () => {
    if (textInput.value.trim() === "") {
        alert("Please enter text to speak.");
        return;
    }

    speech.text = textInput.value;
    speech.lang = languageSelect.value;

    // Set the selected voice
    const selectedVoice = voices.find(voice => voice.name === voiceSelect.value);
    if (selectedVoice) {
        speech.voice = selectedVoice;
    }

    speechSynthesis.speak(speech);
    waveAnimation.style.display = "flex"; // Show wave animation
});

// Function to stop speaking
stopBtn.addEventListener("click", () => {
    speechSynthesis.cancel();
    waveAnimation.style.display = "none"; // Hide wave animation
});

// Event listener to hide wave animation when speech ends
speech.onend = () => {
    waveAnimation.style.display = "none";
};
