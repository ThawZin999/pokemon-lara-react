import React, { useEffect, useState } from "react";
import { useCard } from "../../context/CardContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";
import { toast } from "react-toastify";

export default function CardCreate() {
  const { cardId } = useParams();
  const navigate = useNavigate();

  const [cardName, setCardName] = useState("");
  const [cardPrice, setCardPrice] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchCard = async () => {
      const resp = await axios.get(`/edit-card/${cardId}`);
      setCardName(resp.data.data.name);
      setCardPrice(resp.data.data.price);
      setLoader(false);
      console.log(resp.data.data);
    };
    fetchCard();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();

    const card = {
      name: cardName,
      price: cardPrice,
    };

    try {
      const res = await axios.put(`/update-card/${cardId}`, card);
      if (res.data.message) {
        toast.success("Card Updated Successfully");
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
          <div className="overflow-x-auto">
            <div className="p-3 flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-start md:space-x-3 flex-shrink-0">
              <Link
                to="/card/index"
                className="inline-flex items-center justify-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 max-w-xs"
              >
                Back
              </Link>
            </div>
          </div>
          <form method="PUT" onSubmit={handleEdit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2  ">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  defaultValue={cardName}
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
                  defaultValue={cardPrice}
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
              Edit Card
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
