import React from 'react'

const WrongLetters = ({ wrongLetters }) => {

    return (
        <div className="lg:w-[43%] ">
            <div className="flex w-80 justify-center items-center mt-4 h-20 border-[1px] border-red-500 bg-red-800 bg-opacity-40">
                {
                    wrongLetters.length > 0
                }
                {
                    wrongLetters.map((letter, i) =>
                        <h1 key={i} className="text-xl bg-red-500 mx-[2px] flex justify-center items-center w-10 h-10">{letter}</h1>
                    )
                }
            </div>
        </div>
    )
}

export default WrongLetters