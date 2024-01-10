import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    removeMultipleFromCart,
  } = useCart();

  return (
    <div className="grid min-h-full sm:px-3">
      <div className="px-4 pt-8">
        <div className="flex flex-row justify-between">
          <div>
            <p className="text-xl font-medium dark:text-gray-200">
              Order Summary
            </p>
            <p className="text-gray-400">Check your items.</p>
          </div>
          {cartItems.length > 0 ? (
            <button
              onClick={clearCart}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Clear Cart
              </span>
            </button>
          ) : (
            ""
          )}
        </div>

        <div className=" mx-auto my-3 max-w-2xl ">
          <div className="rounded-lg bg-white shadow dark:bg-gray-800">
            <div className="px-4 py-6 sm:px-5 sm:py-10">
              <div className="flow-root">
                {cartItems.length > 0 ? (
                  <ul className="-my-6 divide-y divide-gray-200 dark:divide-gray-600">
                    {cartItems.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <Link
                          to={`/product/${item.id}`}
                          className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md "
                        >
                          <img
                            src={item.images.large}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </Link>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900  dark:text-gray-200">
                              <h3>
                                <Link to={`/product/${item.id}`}>
                                  {item.name}
                                </Link>
                              </h3>
                              <p className="ml-4">
                                {item.hp * item.quantity}
                                Ks
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              Price: {item.hp}Ks
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex  h-8 w-12 items-stretch text-gray-600 dark:text-gray-200">
                              <button
                                onClick={() => {
                                  const cartItem = cartItems.find(
                                    (product) => product.id === item.id
                                  );
                                  if (cartItem.quantity === 1) {
                                    removeFromCart(item);
                                    toast.error(
                                      `${item.name} removed from cart!`
                                    );
                                  } else {
                                    removeFromCart(item);
                                  }
                                }}
                                className="flex items-center justify-center rounded-l-md bg-gray-200 px-3 transition hover:bg-black hover:text-white dark:bg-gray-700 dark:hover:bg-black"
                              >
                                -
                              </button>
                              <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition dark:bg-gray-500">
                                {item.quantity}
                              </div>
                              <button
                                onClick={() => {
                                  addToCart(item);
                                }}
                                className="flex items-center justify-center rounded-r-md bg-gray-200 px-3 transition hover:bg-black hover:text-white dark:bg-gray-700 dark:hover:bg-black"
                              >
                                +
                              </button>
                            </div>

                            <div className="flex">
                              <button
                                type="button"
                                onClick={() => {
                                  removeMultipleFromCart(item);
                                  toast.error(
                                    `${item.name} removed from cart!`
                                  );
                                }}
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="dark:text-gray-200">"Please Add to Cart"</div>
                )}
                {/* Total */}
                <div className="">
                  <div className="mt-6 flex items-center justify-between dark:text-gray-300">
                    <p className="text-sm font-medium ">Total</p>
                    {/* <TotalPrice /> */}
                    <p className="text-2xl font-semibold ">
                      {getCartTotal()}Ks
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {cartItems.length > 0 ? (
              <div className="text-center mx-3">
                <button
                  onClick={() => {
                    clearCart();
                    toast.success("Order Created Successfully.");
                  }}
                  className="text-white w-1/2 mx-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Place Order
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
