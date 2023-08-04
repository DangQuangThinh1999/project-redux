import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import CartButton from "./CartButton";
import { RootState } from "../../redux/store";
import LogoutButton from "./LogoutButton";
import LanguageButton from "./LanguageButton";
import { useTranslation } from "react-i18next";
import SearchInput from "./SearchInput";
const navList = ["products"];

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const activeLink = location.pathname.slice(11);
  const user = useSelector(
    (state: RootState) => state.rootReducer.auth.user?.email
  );
  const nameUser = user?.slice(0, user?.indexOf("@"));
  const isShowSearchInput = location.pathname !== "/dashboard";
  const path = location.pathname.slice(11);
  return (
    <header className="sticky top-0 w-full z-99999 h-[80px]">
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6 ">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg
            className="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
          <span className="font-semibold text-xl tracking-tight ">
            <Link to="/dashboard">Telephone</Link>
          </span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full  flex-grow lg:flex lg:w-auto ">
          <div className="text-sm lg:flex-grow flex  items-center">
            {navList.map((item) => (
              <Link
                key={item}
                to={item}
                className={`block font-bold mt-4 lg:inline-block lg:mt-0 ${
                  activeLink === item ? "text-white" : "text-teal-200"
                }  hover:text-white mr-4`}
              >
                {t(item.charAt(0).toUpperCase() + item.slice(1))}
              </Link>
            ))}
            <CartButton activeLink={activeLink} />
          </div>
          <div className="flex space-x-5 ">
            {isShowSearchInput && <SearchInput path={path} />}
            <div className="font-bold flex justify-center items-center">
              {t("Hi")}! {nameUser}
            </div>
            <LanguageButton />
            <LogoutButton />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
