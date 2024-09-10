// Get the available voices and choose a specific one (e.g., Google UK English Male)
let voices = window.speechSynthesis.getVoices();

// Choose a specific voice (e.g., Google UK English Male)
let selectedVoice = voices.find(voice => voice.name === 'Google UK English Male') || voices[0]; // Fallback to the first voice if not found

// Function to trigger speech for a given text
function speakDescription(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.pitch = 1;      // Set the pitch of the voice
        utterance.rate = 1;       // Set the speaking rate (1 is normal speed)

        // Set the language and voice if available
        if (selectedVoice) {
            utterance.voice = selectedVoice;  // Set the chosen voice
            utterance.lang = selectedVoice.lang;  // Set the language of the voice (auto from the selected voice)
        } else {
            utterance.lang = 'en-GB';  // Default to British English if no voice is found
        }

        // Speak the text
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Sorry, your browser does not support text to speech!');
    }
}

// Ensure voices are loaded before executing
window.speechSynthesis.onvoiceschanged = function() {
    voices = window.speechSynthesis.getVoices();  // Reload the voices if they change
    selectedVoice = voices.find(voice => voice.name === 'Google UK English Male') || voices[0]; // Reassign the voice
};
