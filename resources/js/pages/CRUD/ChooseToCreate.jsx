import React, { useEffect, useState } from "react";
import axios from "../../api/pokemonaxios";
import { Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCard } from "../../context/CardContext";

export default function Home() {
  const { chooseCard } = useCard();
  const [cards, setCards] = useState([]);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  const fetchCards = async () => {
    const resp = await axios.get("https://api.pokemontcg.io/v2/cards");
    setCards(resp.data.data);
    setLoader(false);
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
            <div
              key={d.id}
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
                  <span className="text-sm">Type: {d.types.join(", ")}</span>
                </a>
                <div className="flex items-center mt-5 justify-between">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    Price:{d.hp}Ks
                  </span>
                  <button
                    onClick={() => {
                      chooseCard(d);
                      navigate("/card/create");
                      toast.success("A Card is chosen to create");
                    }}
                    className="text-white bg-blue-700 inline-flex hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <span className="text-sm mr-2">Create</span>
                    <svg
                      className="w-[16px] h-[16px]text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.3"
                        d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
