// because we will be using the Title component in multiple places

import React from 'react'

// we will get title , subTitle and align from props
const Title = ({title, subTitle, align}) => {
  return (

    // conditional classes based on align prop
    <div className={`flex flex-col justify-center items-center text-center ${align == "left" && "md:items-start md:text-left"}`}>

        {/* Title */}
      <h1 className='font-semibold text-4xl md:text-[40px]'>{title}</h1>

      {/* Subtitle */}
      <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-156'>{subTitle}</p>
    </div>
  )
}

export default Title
