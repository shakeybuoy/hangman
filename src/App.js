import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';
import wordBank from './helpers/wordlist.txt'
import { showNotification as show } from './helpers/helper';
import Footer from './components/Footer';
const apiKey = process.env.REACT_APP_API_KEY;
const keys = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
]

export const generateWordSet = async () => {
  let wordSet;
  let todaysWord;
  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split("\n");
      todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
      wordSet = new Set(wordArr);
    });
  return { wordSet, todaysWord };
};


let selectedWord = ' ';

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  // eslint-disable-next-line
  const [showNotification, setShowNotification] = useState(false);
  // eslint-disable-next-line
  const [wordSet, setWordSet] = useState(new Set());
  // eslint-disable-next-line
  const [correctWord, setCorrectWord] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
      selectedWord = words.todaysWord.trim();
      fetch(`https://words.bighugelabs.com/api/2/${apiKey}/${selectedWord}/json`)
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          let arr = myJson;
          let syn = arr.noun.syn;
          setData(syn)
        });
    });
  }, []);

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown)

  },
    [correctLetters, wrongLetters, playable]);

  useEffect(() => {
    const handleMouseClick = event => {
      if (event.target.matches("[data-key]") === true) {
        const keys = event.target.dataset.key;
        const letter = keys.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }

    }
    window.addEventListener('click', handleMouseClick);
    return () => window.removeEventListener('click', handleMouseClick)

  },
    [correctLetters, wrongLetters, playable]);



  function playAgain() {
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
      selectedWord = words.todaysWord.trim();
      fetch(`https://words.bighugelabs.com/api/2/${apiKey}/${selectedWord}/json`)
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          let arr = myJson;
          let syn = arr.noun.syn;
          setData(syn)
        });
    });

  }

  return (
    <>
      <Header />
      <div className="">
        <section className="flex flex-col lg:flex-row lg:justify-around items-center mt-10">
          <Figure wrongLetters={wrongLetters} />
          <div className="flex lg:w-3/6 w-full flex-col justify-center items-center">
            <Word selectedWord={selectedWord} correctLetters={correctLetters} />
            <div className="text-xs mx-5 space-x-3 lg:text-sm mt-5 text-center">
              Synonyms : {
                data.length > 0 ?
                  data.map((e, i) => i <= 5 ? <span key={i} >{e}</span> : <></>)
                  : <span>Synonyms not available</span>
              }
            </div>
            <WrongLetters wrongLetters={wrongLetters} />
          </div>
        </section>
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
      <section className="flex flex-col lg:my-14 my-10 lg:gap-y-3 gap-y-3 justify-center items-center text-lg">
        <div className="flex lg:gap-x-4 gap-x-1 justify-center mx-10">
          {keys.map((key, index) => (index < 10 ? <button className="lg:w-16 lg:h-16 h-10 w-8 flex justify-center items-center bg-slate-600 bg-opacity-40 lg:rounded-md rounded" data-key={key} key={index}>{key}</button> : <></>))}
        </div>
        <div className="flex lg:gap-x-4 gap-x-1 justify-center">
          {keys.map((key, index) => (index > 9 && index < 19 ? <button className="lg:w-16 lg:h-16 h-10 w-8 flex justify-center items-center bg-slate-600 bg-opacity-40 lg:rounded-md rounded" data-key={key} key={index}>{key}</button> : <></>))}
        </div>
        <div className="flex lg:gap-x-4 gap-x-1 justify-center">
          {keys.map((key, index) => (index > 18 && index < 27 ? <button className="lg:w-16 lg:h-16 h-10 w-8 flex justify-center items-center bg-slate-600 bg-opacity-40 lg:rounded-md rounded" data-key={key} key={index}>{key}</button> : <></>))}
        </div>

      </section>
      <Footer />
    </>
  );
}

export default App;