import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCart, totalQuantity } from "../../redux/slice/cartSlice";

export interface ProductProps {
  src: string;
  name: string;
  cost: number;
}

const Product: React.FC<ProductProps> = ({ src, name, cost }) => {
  const [show, setshow] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addCart({ id: src, name: name, cost: cost }));
    dispatch(totalQuantity());
  };
  return (
    <div className="flex flex-col ">
      <div className=" bg-white">
        <img
          className=" h-80 w-80 rounded-lg"
          src={require(`@/assets/${src}.jpg`)}
          alt={src}
        />
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div className="flex justify-center items-center">
          <p className="tracking-tight text-2xl font-semibold leading-6 text-gray-800">
            {name}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <button
            aria-label="show menu"
            onClick={() => setshow(!show)}
            className="focus:outline-none focus:ring-2 focus:ring-offset-2
             focus:ring-gray-800 py-2.5 px-2 bg-gray-800 text-white hover:text-gray-400"
          >
            <svg
              className={`fill-stroke ${show ? "block" : "hidden"}`}
              width={10}
              height={6}
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5L5 1L1 5"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              className={`fill-stroke ${show ? "hidden" : "block"}`}
              width={10}
              height={6}
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        id="menu1"
        className={` flex-col jusitfy-start items-start mt-12 ${
          show ? "flex" : "hidden"
        }`}
      >
        <div>
          <p className="tracking-tight text-base font-medium leading-4 text-gray-800 flex">
            Capacity: 356GB
          </p>
        </div>
        <div className="mt-6">
          <p className="tracking-tight text-base font-medium leading-4 text-gray-800">
            {cost}$
          </p>
        </div>
        <div className="flex jusitfy-between flex-col lg:flex-row items-center mt-10 w-full  space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
          <div className="w-full">
            <button className=" focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-gray-800 w-full tracking-tight py-4 text-lg leading-4 hover:bg-gray-300 hover:text-gray-800  bg-white border border-gray-800">
              More information
            </button>
          </div>
          <div className="w-full">
            <button
              onClick={handleAddToCart}
              className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2  text-white w-full tracking-tight py-4 text-lg leading-4  hover:bg-teal-500 bg-gray-800 border border-gray-800"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
