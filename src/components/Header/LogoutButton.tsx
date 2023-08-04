import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/authSlice";
import { useTranslation } from "react-i18next";
const LogoutButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <button
      onClick={handleLogout}
      className="inline-block text-sm px-4 
       leading-none border rounded text-white border-white 
       hover:border-transparent hover:text-teal-500 hover:bg-white  "
    >
      {t("Logout")}
    </button>
  );
};

export default LogoutButton;
