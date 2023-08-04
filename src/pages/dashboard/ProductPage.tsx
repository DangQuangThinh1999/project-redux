import { useEffect } from "react";

import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchListData } from "../../redux/slice/cartSlice";

import PageLoading from "../PageLoading";
import ListProduct from "../../components/Product/ListProduct";
const ProductPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { resultSearchWareHouse, wareHouse, isLoading, error } = useSelector(
    (state: RootState) => state.rootReducer.cart
  );
  useEffect(() => {
    dispatch(fetchListData());
  }, [dispatch]);

  if (isLoading) {
    return <PageLoading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-[#edede9] ">
      <ListProduct
        wareHouse={
          resultSearchWareHouse.length > 0 ? resultSearchWareHouse : wareHouse
        }
      />
    </div>
  );
};

export default ProductPage;
