import React, { useEffect, useState } from "react";
import { useCard } from "../../context/CardContext";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { toast } from "react-toastify";

export default function CardCreate() {
  const { cardData } = useCard();
  const navigate = useNavigate();

  const [cardName, setCardName] = useState("");
  const [cardPrice, setCardPrice] = useState("");
  const [cardImage, setCardImage] = useState("");

  useEffect(() => {
    if (!cardData || Object.keys(cardData).length === 0) {
      navigate("/card/choose-to-create");
      toast.error("Please Choose A Card.");
    } else {
      setCardName(cardData.name);
      setCardPrice(cardData.hp);
      setCardImage(cardData.images.small);
    }
  }, [cardData]);

  //   Create function
  const handleCreate = async (e) => {
    e.preventDefault();

    const card = {
      name: cardName,
      price: cardPrice,
      image: cardImage,
    };
    console.log(card);

    try {
      const res = await axios.post(`/create-card`, card);
      if (res.data.message) {
        navigate("/card/index");
        toast.success("Card Created Successfully");
      }
    } catch (error) {
      if (error.response.status === 422) {
        toast.error("Please Fill All Input");
      }
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 ">
      <div className=" pt-20 h-auto p-2">
        <div className="rounded-lg p-2 bg-white dark:bg-gray-800 relative shadow-md  overflow-hidden">
          <form method="POST" onSubmit={handleCreate}>
            <div className="grid gap-4 mb-4 sm:grid-cols-3  ">
              <div className="inline-flex">
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image
                </label>

                <img
                  className=" rounded-t-lg w-1/2 md:h-auto p-3  md:rounded-none md:rounded-s-lg"
                  src={cardImage}
                  alt=""
                />
              </div>
              <input type="hidden" value={cardImage} />

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Price
                </label>
                <input
                  type="number"
                  value={cardPrice}
                  onChange={(e) => setCardPrice(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="mr-1 -ml-1 w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Create Card
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
