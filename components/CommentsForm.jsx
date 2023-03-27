import React, { useEffect, useRef, useState } from 'react'
import { submitComment } from '../services';


const CommentsForm = () => {

  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();


  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name');
    emailEl.current.value = window.localStorage.getItem('email');
  }, [])

  const handleCommentSubmission = () => {
    setError(false);

    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = { name, email, comment }

    if (storeData) {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email);
    } else {
      window.localStorage.removeItem('name', name);
      window.localStorage.removeItem('email', email);
    }
    submitComment(commentObj)
    .then((res) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    })
  }



  return (
    <div className=' shadow-lg rounded-lg p-8 pb-12 mb-8 text-[#000]'>
      <h3 className='text-xl text-[#f6f6f7] mb-8 font-semibold border-b pb-4'>Leave a Reply</h3>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea ref={commentEl} className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-third text-[#010026]" name="comment" placeholder="Write your comments here..."
        />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
        <input
          type="text"
          ref={nameEl}
          className="py-2 outline-none w-full rounded-lg h-10 focus:ring-2 focus:ring-gray-200 bg-third  text-[#010026]" name="name" placeholder="Name"
        />
        <input
          type="text"
          ref={emailEl}
          className="py-2 outline-none w-full rounded-lg h-10 focus:ring-2 focus:ring-gray-200 bg-third  text-[#010026]" name="email" placeholder="Email"
        />
      </div>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <div>
          <input ref={storeDataEl} type="checkbox" id="storeData" name='storeData' value="true"/>
          <label className='text-[#fff] cursor-pointer text-xs ml-2 htmlFor="storeData"'>Save my e-mail and name for the next time I comment</label>
        </div>
      </div>

      {error && <p className='text-xl text-[#923535]'>All the fields are required</p>}
      <div className='mt-8'>
        <button
          type='button'
          onClick={handleCommentSubmission}
          className="transition duration-500 ease text-[#fff]  font-semibold text-lg bg-secondary rounded-full px-8 py-3 hover:text-primary inline-block hover:bg-third">
          Post Comment
        </button>
        {showSuccessMessage && <span
          className='text-xl font-semibold float-right mt-3 text-[#00ff00]'
        >
          Comment submitted for review</span>}
      </div>
    </div>
  )
}

export default CommentsForm;