import { useMutation } from "@tanstack/react-query";
import { Store } from "../../api/Store";
import { useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-dropdown-menu";

import { Button } from "../libraryComponents/button";
import { useSnapshot } from "valtio";
import { Input } from "../libraryComponents/input";
// import { useState } from "react";
import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";

const ChangePassword = () => {
  // const [error, setError] = useState("");

  const { reset, handleSubmit, register } = useForm();

  const state = useSnapshot(Store);

  const changePassword = useMutation({
    mutationKey: ["CHANGE_PASSWORD"],
    mutationFn: Store.changePassword,

    onSuccess: (res) => {
      if (res.stack) {
        toast.error(res.response.data.message);
      } else {
        toast.success(res.data.message);
      }
    },
  });

  const submitHandler = (data) => {
    try {
      changePassword.mutate({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
    } catch (error) {
      console.log("Error in the change password Handler", error);
    } finally {
      reset({
        oldPassword: "",
        newPassword: "",
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {/* {!state.loading && error && <div className="text-red-500">{error}</div>} */}

      {state.loading && (
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 size-20">
          <Loader />
        </div>
      )}

      <form
        className="grid grid-cols-1 grid-rows-3 gap-y-6 items-center w-[400px] px-4"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="text-start col-start-1 col-end-3 space-y-4">
          <Label className="text-sm text-white" htmlFor="fullName">
            Old Password
          </Label>
          <Input
            {...register("oldPassword")}
            placeholder="Enter your old password"
            className="bg-white text-black w-full "
          />
        </div>

        <div className="text-start col-start-1 col-end-3 space-y-4">
          <Label className="text-sm text-white" htmlFor="firstName">
            New Password
          </Label>
          <Input
            {...register("newPassword")}
            placeholder="Enter your new password"
            className="bg-white text-black w-full "
          />
        </div>

        <div className="col-start-1 col-end-3">
          <Button
            type="submit"
            className="w-full text-white bg-slate-900 hover:bg-slate-950"
          >
            Submit
          </Button>
        </div>
      </form>

      <ToastContainer theme="dark" />
    </div>
  );
};

export default ChangePassword;
