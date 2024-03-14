import React, { useEffect } from 'react';
import './TextToSpeech.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

function TextToSpeech({ selectedClassName }) {
    useEffect(() => {
        const speakNote = () => {
            const textContent = document.querySelector('.' + selectedClassName).innerText;
            const utterance = new SpeechSynthesisUtterance(textContent);
            window.speechSynthesis.speak(utterance);
        };
        const volumeButton = document.getElementById('volumeButton');
        if (volumeButton) {
            volumeButton.addEventListener('click', speakNote);
        }
        return () => {
            if (volumeButton) {
            volumeButton.removeEventListener('click', speakNote);
            }
        };
        }, [selectedClassName]);
  return (
    <button id="volumeButton" title="Read aloud">
        <FontAwesomeIcon icon={faVolumeHigh} className="volume-icon" />
    </button>
  )
}

export default TextToSpeech
