import { Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { toast } from "react-toastify";

export default function CardIndex() {
  const [cards, setCards] = useState([]);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      const resp = await axios.get("/index-card");
      setCards(resp.data.data);
      setLoader(false);
      console.log(cards);
    };
    fetchCards();
  }, []);

  const handleStatus = (cardId, curretStatus) => {
    axios.put(`/update-status/${cardId}`).then(() => {
      setCards((cards) =>
        cards.map((card) =>
          card.id === cardId ? { ...card, status: curretStatus ? 0 : 1 } : card
        )
      );
      toast.success("Card Status Changed Successfully.");
    });
  };

  const handleDelete = async (e, cardId) => {
    e.preventDefault();
    const resp = await axios.delete(`/delete-card/${cardId}`);
    if (resp.data.message) {
      setCards((cards) => cards.filter((card) => card.id !== cardId));
      toast.success("Card Deleted Successfully.");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className=" h-full">
        <div className="mx-auto max-w-screen-xl md:p-6 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md md:rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <div className="p-3 flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-start md:space-x-3 flex-shrink-0">
                <Link
                  to="/card/choose-to-create"
                  className="inline-flex items-center justify-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 max-w-xs"
                >
                  Create Card
                </Link>
              </div>
            </div>
            {loader && (
              <div className="text-center">
                <Spinner />
              </div>
            )}
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-center text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-3 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-3 py-3 ">
                      InActive/Active
                    </th>
                    <th scope="col" className="px-3 py-3 ">
                      Actions
                    </th>
                  </tr>
                </thead>

                {!loader && (
                  <tbody>
                    {cards.map((d) => (
                      <tr
                        key={d.id}
                        className="text-center border-b dark:border-gray-700"
                      >
                        <th scope="row" className="px-3 py-3">
                          <img
                            className="w-auto h-20 mr-3"
                            alt=""
                            src={d.image}
                          />
                        </th>
                        <td className="px-3 py-3">{d.name}</td>
                        <td className="px-3 py-3">{d.price}</td>
                        <td className="px-3 py-3 ">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={d.status === 1}
                              onChange={() => handleStatus(d.id, d.status)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                          </label>
                        </td>
                        <td className="px-3 py-3">
                          <div className="rounded-md inline-flex shadow-sm">
                            <Link
                              to={`/card/edit/${d.id}`}
                              className="px-3 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 rounded-l-lg hover:bg-green-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-green-400 dark:focus:ring-blue-500 dark:focus:text-white"
                            >
                              Edit
                            </Link>
                            <div className="px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-red-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-blue-500 dark:focus:text-white">
                              <form
                                method="post"
                                onSubmit={(e) => handleDelete(e, d.id)}
                              >
                                <input type="submit" value="Delete" />
                              </form>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
