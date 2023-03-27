import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { getCategories } from '../services'
import { useRef } from 'react';

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((newCategories) => setCategories(newCategories))
  }, []);

  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    const letters = "abcdefghijklmnopqrstuvwxyz-^,/(!$%&|¨´{ç}][=ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let interval = null;

    element.onmouseover = event => {
      let iteration = 0;

      clearInterval(interval);

      interval = setInterval(() => {
        event.target.innerText = event.target.innerText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return event.target.dataset.value[index];
            }

            return letters[Math.floor(Math.random() * 56)]
          })
          .join("");

        if (iteration >= event.target.dataset.value.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 80);
    }
  }, []);

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer  font-Teko text-6xl text-[#5fdeb3]">
              <h1 ref={ref} data-value="CodeCove">CodeCove</h1>
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category, index) => (
            <Link key={index} href={`/category/${category.slug}`}><span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">{category.name}
            </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Header;