import React, { useEffect } from 'react';
import { checkWin } from '../helpers/helper';

const Popup = ({ correctLetters, wrongLetters, selectedWord, setPlayable, playAgain }) => {
    let finalMessage = '';
    let finalMessageRevealWord = '';
    let playable = true;

    if (checkWin(correctLetters, wrongLetters, selectedWord) === 'win') {
        finalMessage = 'Congratulations! You won! 😃';
        finalMessageRevealWord = `You correctly guessed: ${selectedWord}`;
        playable = false;
    } else if (checkWin(correctLetters, wrongLetters, selectedWord) === 'lose') {
        finalMessage = 'Unfortunately you lost. 😕';
        finalMessageRevealWord = `The Word Was : ${selectedWord}`;
        playable = false;
    }

    useEffect(() => {
        setPlayable(playable);
    });

    return (
        <div className="popup-container" style={finalMessage !== '' ? { display: 'flex' } : {}}>
            <div className="popup rounded-lg font-medium mx-10 p-10">
                <button className="" onClick={playAgain}>
                    <svg fill="#eeeeee" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="50px" height="50px"><path d="M 25.970703 1.9863281 A 1.50015 1.50015 0 0 0 24.939453 2.4394531 L 21.068359 6.3105469 A 1.50015 1.50015 0 0 0 20.785156 6.59375 L 20.439453 6.9394531 A 1.50015 1.50015 0 0 0 20.439453 9.0605469 L 24.939453 13.560547 A 1.50015 1.50015 0 1 0 27.060547 11.439453 L 24.654297 9.0332031 C 32.649194 9.3765807 39 15.918478 39 24 C 39 29.075961 36.48322 33.534381 32.634766 36.251953 A 1.5002303 1.5002303 0 1 0 34.365234 38.703125 C 38.97678 35.446698 42 30.070039 42 24 C 42 14.597089 34.745957 6.8649392 25.542969 6.078125 L 27.060547 4.5605469 A 1.50015 1.50015 0 0 0 25.970703 1.9863281 z M 14.578125 9.0117188 A 1.50015 1.50015 0 0 0 13.634766 9.296875 C 9.0232192 12.553302 6 17.929961 6 24 C 6 33.402911 13.254043 41.135061 22.457031 41.921875 L 20.939453 43.439453 A 1.50015 1.50015 0 1 0 23.060547 45.560547 L 26.931641 41.689453 A 1.50015 1.50015 0 0 0 27.214844 41.40625 L 27.560547 41.060547 A 1.50015 1.50015 0 0 0 27.560547 38.939453 L 23.060547 34.439453 A 1.50015 1.50015 0 0 0 21.984375 33.984375 A 1.50015 1.50015 0 0 0 20.939453 36.560547 L 23.345703 38.966797 C 15.350806 38.623419 9 32.081522 9 24 C 9 18.924039 11.51678 14.465619 15.365234 11.748047 A 1.50015 1.50015 0 0 0 14.578125 9.0117188 z" />
                    </svg>
                </button>
                <h2 className="mt-10"><span className="uppercase text-xl"> {finalMessageRevealWord}</span></h2>
                <h2 className="text-xl">{finalMessage}</h2>
            </div>
        </div>
    )
}

export default Popup