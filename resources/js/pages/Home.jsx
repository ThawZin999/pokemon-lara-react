import React, { useEffect, useState } from "react";
import axios from "../api/pokemonaxios";
import { Spinner } from "flowbite-react";

export default function Home() {
  const [cards, setCards] = useState([]);
  const [loader, setLoader] = useState(true);

  const fetchCards = async () => {
    const resp = await axios.get("https://api.pokemontcg.io/v2/cards");
    setCards(resp.data.data);
    setLoader(false);
    console.log(cards);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <>
      {loader && (
        <div className="text-center ">
          <Spinner />
        </div>
      )}
      {!loader && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cards.map((d) => (
            <>
              <div className="h-auto w-3/4 mx-auto sm:w-full max-w-full rounded-lg mt-3 bg-white border border-gray-200  shadow-lg dark:bg-gray-800 dark:border-gray-700">
                <div key={d.id}>
                  <a href="#">
                    <img
                      className=" rounded-t-lg"
                      src={d.images.large}
                      alt="product image"
                    />
                  </a>
                  <div className="px-5 pb-5">
                    <a href="#">
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {d.name}
                      </h5>
                      <span className="text-sm">
                        Type: {d.types.join(", ")}
                      </span>
                    </a>
                    <div className="flex items-center mt-5 justify-between">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        HP:{d.hp}
                      </span>
                      <a
                        href="#"
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
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
}
