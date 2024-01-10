import React, { useEffect, useRef, useState } from "react";

import { Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import axios from "../api/pokemonaxios";

export default function Home() {
  const [cards, setCards] = useState([]);
  const { addToCart } = useCart();

  const [hasMore, setHasMore] = useState(true);
  const elementRef = useRef(null);

  const onIntersection = (entries) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
      fetchCards();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [cards]);

  const fetchCards = async () => {
    const resp = await axios(`https://api.pokemontcg.io/v2/cards?pageSize=10`);
    const data = await resp.data.data;
    if (data.length == 0) {
      setHasMore(false);
    } else {
      setCards((prevCards) => [...prevCards, ...data]);
      console.log(cards);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((d, index) => (
          <div
            key={`${d.id}-${index}`}
            // ref={index === cards.length - 1 ? observerRef : null}
            className="h-auto w-[70%] mx-auto sm:w-full max-w-full rounded-lg mt-3 bg-white border border-gray-200  shadow-lg dark:bg-gray-800 dark:border-gray-700"
          >
            <Link to={`/card-detail/${d.id}`}>
              <img
                className="h-auto pt-4 sm:pt-0 w-3/4 mx-auto sm:w-full rounded-t-lg"
                src={d.images.large}
                alt="product image"
              />
            </Link>
            <div className="px-5 py-3">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {d.name}
                </h5>
                <span className="text-sm dark:text-gray-300">
                  Type: {d.types.join(", ")}
                </span>
              </a>
              <div className="flex items-center mt-5 justify-between">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Price:{d.hp}Ks
                </span>
                <button
                  onClick={() => {
                    addToCart(d);
                    toast.success("Added To Cart");
                  }}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-[20px] h-[20px] text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 19 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm1-4H5m0 0L3 4m0 0h5.501M3 4l-.792-3H1m11 3h6m-3 3V1"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
        {hasMore && (
          <div ref={elementRef} className="text-center">
            <Spinner />
            <span className="ml-2 text-sm text-blue-500">Loading...</span>
          </div>
        )}
      </div>
    </>
  );
}
