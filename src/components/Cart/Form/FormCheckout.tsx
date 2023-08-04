import style from "./formStyle.module.scss";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export type dataForm = {
  name: string;
  phone: string;
  home: string;
  email: string;
};

const FormCheckout = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<dataForm>({
    criteriaMode: "all",
  });
  const onSubmit = (data: dataForm) => console.log(data);
  return (
    <form
      className={style.wrapper}
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 ">
        <div>
          <input
            className="border-b-2 border-gray-300 pb-3 text-base text-gray-600 font-normal placeholder-gray-600 focus:outline-none"
            placeholder="Email address"
            {...register("email", {
              required: "Please enter a valid email address.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "This input is email only.",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ messages }) => {
              return (
                messages &&
                Object.entries(messages).map(([type, message], index) => (
                  <p key={type}>{message}</p>
                ))
              );
            }}
          />
        </div>
        <div>
          <input
            className="border-b-2 border-gray-300 pb-3 text-base text-gray-600 font-normal placeholder-gray-600 focus:outline-none"
            placeholder="Your Name"
            {...register("name", {
              required: "Please enter a valid your name.",
              pattern: {
                value: /[^A-Za-z -]/g,
                message:
                  "Allow only alphabets, spaces, and hyphens in the name",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ messages }) => {
              return (
                messages &&
                Object.entries(messages).map(([type, message], index) => (
                  <p key={type}>{message}</p>
                ))
              );
            }}
          />
        </div>
        <div>
          <input
            className="border-b-2 border-gray-300 pb-3 text-base text-gray-600 font-normal placeholder-gray-600 focus:outline-none"
            placeholder="Home address"
            {...register("home", {
              required: "Please enter a valid home address.",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="home"
            render={({ messages }) => {
              return (
                messages &&
                Object.entries(messages).map(([type, message], index) => (
                  <p key={type}>{message}</p>
                ))
              );
            }}
          />
        </div>
        <div>
          <input
            className="border-b-2 border-gray-300 pb-3 text-base text-gray-600 font-normal placeholder-gray-600 focus:outline-none"
            placeholder="Phone number"
            {...register("phone", {
              required: "Please enter a valid phone number.",
              pattern: {
                value: /^-?\d*$/,
                message: "This input is number.",
              },
              minLength: {
                value: 9,
                message: "This input must exceed 10 characters",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="phone"
            render={({ messages }) => {
              return (
                messages &&
                Object.entries(messages).map(([type, message], index) => (
                  <p key={type}>{message}</p>
                ))
              );
            }}
          />
        </div>
      </div>
      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 text-white p-4 text-lg my-3 mt-10 w-full md:w-auto"
        value=" Proceed to shipping"
      />
    </form>
  );
};

export default FormCheckout;
