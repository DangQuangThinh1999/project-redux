import { ReactComponent as HeartIcon } from "@/assets/heart.svg";
import { Item } from "../../redux/slice/cartSlice";
import Product from "./Product";
import { useTranslation } from "react-i18next";

interface ListProductProps {
  wareHouse: Item[];
}

const ListProduct: React.FC<ListProductProps> = ({ wareHouse }) => {
  const { t } = useTranslation();
  return (
    <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center">
      <div className="flex flex-col justify-start items-start">
        <div className=" flex justify-center items-center space-x-3">
          <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800">
            {t("Favourites")}
          </h1>
          <HeartIcon className="h-16 w-16" />
        </div>

        <div className=" mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-20 ">
          {wareHouse?.map((item) => (
            <Product
              key={item.id}
              src={item.id}
              name={item.name}
              cost={item.cost}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
