import { ReactComponent as DropDownIcon } from "@/assets/dropdown.svg";
import { useTranslation } from "react-i18next";
import { useState } from "react";
const dataLanguage = [
  {
    id: "en",
    text: "English",
  },
  {
    id: "vn",
    text: "Vietnamese",
  },
];
const LanguageButton = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { i18n, t } = useTranslation();
  const [activeLanguage, setActiveLanguage] = useState("en");
  const handleChangeLanguage = (language: string) => {
    setActiveLanguage(language);
    setOpen(false);
    i18n.changeLanguage(language);
  };
  return (
    <div className="relative flex justify-center items-center">
      <button
        onClick={() => setOpen((value) => !value)}
        className="flex  text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
      >
        {t("Languages")}
        <DropDownIcon />
      </button>
      <div
        className="top-9 absolute right-0 z-10 mt-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className={`${open ? "block" : "hidden"}`} role="none">
          {dataLanguage.map((item) => (
            <p
              key={item.id}
              onClick={() => handleChangeLanguage(item.id)}
              className={`${
                activeLanguage === item.id ? "bg-[#22577a] text-white" : ""
              } text-gray-700 block px-4 py-2 text-sm hover:underline`}
              role="menuitem"
            >
              {t(item.text)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageButton;
