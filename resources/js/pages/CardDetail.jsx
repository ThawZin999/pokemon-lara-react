import { Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/pokemonaxios";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

export default function CardDetail() {
  const { addToCart } = useCart();
  const { id } = useParams();
  const [card, setCard] = useState({});
  const [loader, setLoader] = useState(true);

  const fetchCard = async () => {
    const resp = await axios.get(`https://api.pokemontcg.io/v2/cards/${id}`);
    setCard(resp.data.data);
    setLoader(false);
    console.log(card);
  };

  useEffect(() => {
    fetchCard();
  }, [id]);
  return (
    <>
      {loader && (
        <div className="text-center ">
          <Spinner />
        </div>
      )}
      {!loader && (
        <div className="md:w-[80%] mx-auto pt-6">
          <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img
              className=" rounded-t-lg w-1/2 md:h-auto p-3  md:rounded-none md:rounded-s-lg"
              src={card.images.large}
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {card.name}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {card.flavorText}
              </p>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                Price:{card.hp}Ks
              </div>
              <div className="flex flex-row justify-center mt-3">
                <button
                  onClick={() => {
                    addToCart(card);
                    toast.success("Added To Cart");
                  }}
                  className=" inline-flex  px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add To Cart
                  <svg
                    className="w-[20px] h-[20px] ml-1 text-white"
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
        </div>
      )}
    </>
  );
}
