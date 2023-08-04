import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import EmptyCart from "../../components/Cart/EmptyCart";
import {
  clearCart,
  totalPrice,
  totalQuantity,
} from "../../redux/slice/cartSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ItemCart from "../../components/Cart/ItemCart";

const CartPage = () => {
  const { dataUser, resultSearchDataUser } = useSelector(
    (state: RootState) => state.rootReducer.cart
  );
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data =
    resultSearchDataUser.length > 0 ? resultSearchDataUser : dataUser;
  return (
    <div className=" overflow-x-auto shadow-md sm:rounded-lg mt-5">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400  ">
          <tr>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
              {t("Product")}
            </th>
            <th scope="col" className="px-6 py-3">
              {t("Quantity")}( max <span className="text-red-700">1000</span>)
            </th>
            <th scope="col" className="px-6 py-3">
              {t("Price")}
            </th>
            <th scope="col" className="px-6 py-3">
              {t("total")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 flex items-center justify-center"
            >
              {t("action")}
            </th>
          </tr>
        </thead>
        <tbody>
          {/*  render*/}
          {data.length > 0 &&
            data.map((item) => (
              <ItemCart
                key={item.id}
                src={item.id}
                cost={item.cost}
                name={item.name}
                quantity={item.quantity}
              />
            ))}
        </tbody>
      </table>
      {data.length > 0 ? (
        <div>
          <div className="w-full h-3 bg-red-950"></div>
          <div className="py-20 flex justify-center items-center space-x-10">
            <button
              onClick={() => {
                dispatch(clearCart());
                dispatch(totalQuantity());
              }}
              className="h-[50px] w-[200px] bg-red-500 text-white rounded-xl hover:bg-gray-200 hover:text-black"
            >
              {t("Clear Cart")}
            </button>
            <button
              onClick={() => {
                dispatch(totalPrice());
                navigate("/dashboard/checkout", {
                  replace: true,
                });
              }}
              className="h-[50px] w-[200px] bg-teal-500 text-white rounded-xl hover:bg-gray-200 hover:text-black"
            >
              {t("Checkout")}
            </button>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default CartPage;
