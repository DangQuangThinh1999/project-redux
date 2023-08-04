import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ItemCheckout from "../../components/Cart/ItemCheckout";
import FormCheckout from "../../components/Cart/Form/FormCheckout";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { dataUser, total } = useSelector(
    (state: RootState) => state.rootReducer.cart
  );
  const handleBackCart = () => {
    navigate("/dashboard/cart");
  };
  return (
    <div className="lg:container lg:mx-auto grid grid-cols-9 lg:grid-cols-12 ">
      <div className="col-span-9 lg:col-span-8 xl:col-span-9 bg-white h-auto lg:h-screen  lg:px-10 p-6 lg:py-12">
        <button onClick={handleBackCart} className="hover:underline">
          <svg
            className="inline"
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 1L1 5L5 9"
              stroke="#4B5563"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="cursor-pointer text-gray-500 font-normal text-base ml-2.5">
            Back
          </span>
        </button>
        <h3 className="font-semibold text-gray-800 text-4xl mt-2">Checkout</h3>

        <div className="mt-7 ">
          <p className="font-normal text-sm text-gray-600 mb-3">Your details</p>
          <h3 className="text-2xl text-gray-800 font-medium">
            Enter your details
          </h3>
          <FormCheckout />
        </div>
      </div>
      <div className=" col-span-9 lg:col-span-4 xl:col-span-3 bg-gray-100 lg:h-auto xl:h-screen px-8 py-14 xl:px-12 xl:py-20">
        <div className="flex flex-1">
          <h3 className="text-gray-800 font-semibold text-2xl">Items</h3>
          <div className="flex-auto"></div>
          <h5
            onClick={handleBackCart}
            className="text-gray-600 hover:text-gray-800 cursor-pointer text-base font-normal hover:underline"
          >
            Edit Cart
          </h5>
        </div>

        {dataUser.map((item) => (
          <ItemCheckout
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            cost={item.cost}
          />
        ))}
        <div
          className=" -bottom-7 px-8 xl:px-12 pb-5 md:-bottom-96 bg-gray-100
         md:pt-80 md:pb-10 lg:pb-10 lg:pt-0 lg:mt-10 lg:bottom-0 
          left-0 w-full text-lg font-medium text-gray-800"
        >
          <span
            aria-label="Total"
            className="float-left text-2xl text-gray-800 font-normal"
          >
            Total
          </span>
          <span
            aria-label="Total Price"
            className="float-right font-semibold text-gray-800 text-2xl"
          >
            ${total}
          </span>
          <div className="clear-both"></div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
