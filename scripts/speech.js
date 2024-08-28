document.getElementById("speakBtn").addEventListener("click", function() {
    // Get the available voices
    let voices = window.speechSynthesis.getVoices();

    // Choose a specific voice (e.g., the first available voice)
    let selectedVoice = voices.find(voice => voice.name === 'Google UK English Male') || voices[0]; // Fallback to the first voice if not found

    fetch("data/data.json")
    .then(response => response.json())
    .then(SCP => {
        SCP.forEach(subject => {
            // Create a new SpeechSynthesisUtterance object
            let utterance = new SpeechSynthesisUtterance();
            // Set the text to the summary of the SCP
            utterance.text = `${subject.name}: ${subject.summary}`;
            // Set the language to English
            utterance.lang = 'en-GB';
            // Set the chosen voice
            utterance.voice = selectedVoice;
            // Speak the text
            window.speechSynthesis.speak(utterance);
        });
    })
    .catch(error => console.error("Error fetching SCP data:", error));
});

// Ensure voices are loaded before executing
window.speechSynthesis.onvoiceschanged = function() {
    let voices = window.speechSynthesis.getVoices();
};
