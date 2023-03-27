import React from 'react'
import Image from 'next/image'

const Author = ({ author }) => {
  return (
    <div className="text-center mt-10 mb-8 p-8 relative rounded-lg bg-[#000] bg-opacity-20">
      <div className="absolute content-center -top-14 align-middle rounded-full">

      </div>
      <h3 className="text-white mt-4 mb-4 text-xl font-bold">
        <img
          src={author.photo.url}
          height="50"
          width="50"
          className="rounded-full inline-block mr-2"
        />  
        {author.name}
      </h3>
      <p className="text-white text-ls">{author.bio}</p>
    </div>
  )
}

export default Author