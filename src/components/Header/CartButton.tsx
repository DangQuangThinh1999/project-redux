import React from "react";
import { ReactComponent as CartIcon } from "@/assets/cart.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
interface CartButtonProps {
  activeLink: string;
}

const CartButton: React.FC<CartButtonProps> = ({ activeLink }) => {
  const amount = useSelector(
    (state: RootState) => state.rootReducer.cart.amount
  );
  const { t } = useTranslation();
  const textColor = activeLink === "cart" ? "text-white" : "text-teal-200";
  return (
    <Link to="cart" className="flex justify-center items-center  relative">
      <p
        className={`block font-bold mt-4 lg:inline-block lg:mt-0 ${textColor}  hover:text-white mr-1`}
      >
        {t("Cart")}
      </p>
      <CartIcon className="h-6 w-6 text-white " />
      <div className="font-black text-white text-sm absolute lg:-top-3 -right-1 top-0 ">
        {amount > 0 ? amount : ""}
      </div>
    </Link>
  );
};

export default CartButton;
