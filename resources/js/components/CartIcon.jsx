import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartIcon = () => {
  const { cartItems } = useCart();

  return (
    <Link
      to="/cart"
      type="button"
      className="relative inline-flex items-center rounded-lg p-2.5 text-center   text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
            dark:focus:ring-gray-700"
    >
      <svg
        className="h-5 w-6 text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
          d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"
        />
      </svg>

      {cartItems.length > 0 && (
        <div className="absolute -end-0 -top-0 inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-red-100 dark:border-gray-900 dark:bg-red-700 dark:text-red-200">
          {cartItems.length}
        </div>
      )}
    </Link>
  );
};

export default CartIcon;
