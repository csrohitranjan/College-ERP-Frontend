import { useMutation } from "@tanstack/react-query";
import { Store } from "../../api/Store";
import { Label } from "../libraryComponents/label";
import { Input } from "../libraryComponents/input";
import { useForm } from "react-hook-form";
import { Button } from "../libraryComponents/button";
import { useSnapshot } from "valtio";
import Loader from "./Loader";
import { toast, ToastContainer } from "react-toastify";

const RegisterAdmin = () => {
  const state = useSnapshot(Store);
  const { register, handleSubmit, reset } = useForm();

  const registerAdmin = useMutation({
    mutationKey: ["REGISTER_ADMIN"],
    mutationFn: Store.registerAdmin,
    onSuccess: (res) => {
      Store.loading = false;   // Added Lter Not Well Tested
      if (res.stack) {
        console.log("error");
        toast.error(res.response.data.message);
      } else {
        toast.success(res.data.message);
      }
    },
  });

  const updateHandler = async (data) => {
    try {
      console.log("updated data", data);

      registerAdmin.mutate({
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
      });
    } catch (error) {
      console.log(`Error in the update handler function`, error);
    } finally {
      reset({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
      });
    }
  };




  return (
    <div className="flex flex-col items-center justify-center w-full text-white px-3">
      {state.loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loader />
        </div>
      )}

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[320px] max-w-full py-6 px-4 bg-gray-700 rounded-md shadow-md"
        onSubmit={handleSubmit(updateHandler)}
      >
        <div className="col-span-2 flex flex-col gap-2">
          <Label className="text-xs" htmlFor="fullName">
            Full Name
          </Label>
          <Input
            {...register("fullName")}
            placeholder="John Doe"
            className="input-field"
          />
        </div>

        <div className="col-span-2 flex flex-col gap-2">
          <Label className="text-xs" htmlFor="email">
            Email
          </Label>
          <Input
            {...register("email")}
            placeholder="admin@gmail.com"
            className="input-field"
          />
        </div>

        <div className="col-span-2 flex flex-col gap-2">
          <Label className="text-xs" htmlFor="phoneNumber">
            Phone Number
          </Label>
          <Input
            {...register("phoneNumber")}
            placeholder="999999999"
            className="input-field"
          />
        </div>

        <div className="col-span-2 flex flex-col gap-2">
          <Label className="text-xs" htmlFor="password">
            Password
          </Label>
          <Input
            {...register("password")}
            placeholder="********"
            type="password"
            className="input-field"
          />
        </div>

        <div className="col-span-2 flex justify-center">
          <Button
            type="submit"
            className="w-full py-2 bg-black hover:bg-green-600 text-white rounded-md transition duration-300"
          >
            Register
          </Button>
        </div>
      </form>

      <ToastContainer theme="dark" />
    </div>
  );







};




export default RegisterAdmin;
