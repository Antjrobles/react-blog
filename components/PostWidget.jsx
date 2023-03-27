import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

import { getRecentPosts, getSimilarPosts } from '../services';


const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug)
        .then((result) => setRelatedPosts(result));
    } else {
      getRecentPosts()
        .then((result) => setRelatedPosts(result));
    }
  }, [slug])

  console.log(relatedPosts)
  return (
    <div className='bg-third shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='text-xl text-[#010026] mb-8 font-semibold border-b pb-4'>
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts.map((post) => (
        <div key={post.title} className="flex items-center mb-4 w-full">
          <div className='w-16 flex-none '>
            <img
              alt={post.title}
              height='60px'
              width='60px'
              className='align-middle rounded-full'
              src={post.featuredImage.url}
            />
          </div>
          <div className='flex-grow ml-4'>
            <p className='text-[#221b1b] font-extralight'>
              {moment(post.createdAt).format('DD, MMMM, YYYY')}
              <Link href={`/post/${post.slug}`} key={post.title} className="text-[white] ml-2 ">
                {post.title}
              </Link>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget