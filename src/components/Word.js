import React from 'react';

const Word = ({ selectedWord, correctLetters }) => {

    return (
        <div className="">
            <div className="mt-4 px-3 flex justify-center items-center h-20 border-[1px] popup ">
                {selectedWord.split('').map((letter, i) => {
                    return (
                        <div key={i}>
                            {correctLetters.includes(letter) ?
                                <h1 className="text-xl bg-[#0ED644] mx-[2px] flex justify-center items-center w-14 h-14">{letter}</h1> :
                                <h1 className="text-xl bg-[#404140] mx-[2px] flex justify-center items-center w-14 h-14"> </h1>
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Word