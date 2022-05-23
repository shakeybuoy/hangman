import React from 'react'

function Header() {
    let str = 'hangman'
    let arr = []
    let len = str.length;
    for (let i = 0; i <= len - 1; i++) {
        arr.push(str.charAt(i))
    }

    return (
        <div className="py-5 border-b-[1px] border-gray-600">
            <div className="items-center justify-center text-[#EDF4EE] lg:text-3xl text-2xl flex lg:font-semibold ">
                {arr.map(
                    (letter, index) => (<h1 key={index} className={`${index === 3 || index === 8 || index === 13 ? `bg-[#0ED644]` : index === 1 || index === 5 || index === 10 ? `bg-[#CCD851]` : `bg-[#404140]`} lg:w-10 w-7 flex items-center justify-center lg:h-10 lg:mx-1 mx-1 `}>{letter}</h1>)

                )

                }
            </div>
        </div>
    )
}


export default Header