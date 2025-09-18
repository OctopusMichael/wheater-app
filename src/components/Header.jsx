import React from 'react'

const Header = () => {
  return (
    <div className='w-full flex justify-between items-center'>
        <img src="images/logo.svg" alt="logo" />
        <button className='rounded-[8px] bg-neutral-800 text-black px-4 py-2 hover:bg-red-400 flex gap-2 items-center text-neutral-0 text-bold'>
            <img src="images/icon-units.svg" alt="icon-units-dropdown" />
            Units
            <img src="images/icon-dropdown.svg" alt="icon-arrow" />
        </button>
    </div>
  )
}

export default Header