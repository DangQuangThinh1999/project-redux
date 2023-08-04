import React, { useCallback, useMemo, useState } from "react";

import { useDispatch } from "react-redux";
import {
  removeItem,
  totalQuantity,
  updateQuantity,
} from "../../redux/slice/cartSlice";
import { ReactComponent as UpArrowIcon } from "@/assets/upArrow.svg";
import { ReactComponent as DownArrowIcon } from "@/assets/downArrow.svg";
import { useTranslation } from "react-i18next";

export interface ItemCartProps {
  src: string;
  name: string;
  cost: number;
  quantity: number | string;
}

const ItemCart: React.FC<ItemCartProps> = ({ src, name, cost, quantity }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(+quantity);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = +e.target.value;
    if (number > 0 && number < 1000) setValue(number);
  };

  const total = useMemo(() => {
    return value * cost;
  }, [value, cost]);

  const handleIncrease = useCallback(() => {
    setValue((value) => (value < 1000 ? value + 1 : 999));
  }, []);
  const handleDecrement = useCallback(() => {
    setValue((value) => (value > 1 ? value - 1 : 1));
  }, []);
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-[150px]">
      <td className="w-32 p-4">
        <img src={require(`@/assets/${src}.jpg`)} alt={src} />
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {name}
      </td>
      <td className="px-6 py-4 w-[200px]">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleDecrement}
            className={`
            ${open ? "block" : "hidden"}
            inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6
            text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none
             hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400
              dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`}
            type="button"
          >
            <span className="sr-only">Quantity button</span>
            <DownArrowIcon />
          </button>
          <div>
            <input
              type="number"
              className="bg-gray-50 w-[70px] border border-gray-300
                      text-gray-900 text-sm rounded-lg focus:ring-blue-500
                       focus:border-blue-500 block px-2.5 py-1
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                         dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={value}
              onChange={(e) => handleQuantity(e)}
              required
              readOnly={open ? false : true}
            />
          </div>
          <button
            onClick={handleIncrease}
            className={`
            
            ${open ? "block" : "hidden"}
            inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500
             bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100
              focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600
             dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700
            `}
            type="button"
          >
            <span className="sr-only">Quantity button</span>
            <UpArrowIcon />
          </button>
        </div>
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        ${cost}
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        ${total}
      </td>
      <td className="px-6 py-4 flex  flex-col justify-center h-[150px] items-center space-y-4">
        <button
          onClick={() => {
            dispatch(removeItem(src));
            dispatch(totalQuantity());
          }}
          className="font-medium text-red-600 dark:text-red-500 hover:underline"
        >
          {t("Remove")}
        </button>
        <button
          onClick={() => setOpen(true)}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          {t("Edit")}
        </button>
        <button
          onClick={() => {
            dispatch(updateQuantity({ id: src, quantity: value }));
            if (total <= 0) {
              dispatch(removeItem(src));
              dispatch(totalQuantity());
            }
            setOpen(false);
          }}
          className="font-medium text-teal-500 dark:text-red-500 hover:underline"
        >
          {t("Save")}
        </button>
      </td>
    </tr>
  );
};

export default ItemCart;
