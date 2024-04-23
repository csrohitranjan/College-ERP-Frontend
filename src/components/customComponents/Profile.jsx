import { useMutation, useQuery } from "@tanstack/react-query";
import { Store } from "../../api/Store";
import { Label } from "../libraryComponents/label";
import { Input } from "../libraryComponents/input";
import { useForm } from "react-hook-form";
import { Button } from "../libraryComponents/button";
import { useState } from "react";
import { useSnapshot } from "valtio";
import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";

const Profile = () => {
  const [error, setError] = useState("");
  const state = useSnapshot(Store);

  const { data } = useQuery({
    queryKey: ["GET_CURRENT_USER"],
    queryFn: Store.getUserData,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const updateOperation = useMutation({
    mutationKey: ["UPDATE_PROFILE"],
    mutationFn: Store.updateData,

    onSuccess: (res) => {
      if (res.stack) {
        toast.error(`${res.response.data.message}`);
      } else {
        toast.success(`${res.data.message}`);
      }
    },
  });

  const updateHandler = async (data) => {

    try {
      updateOperation.mutate({
        currentSemester: data.semester,
        email: data.email,
        gender: data.gender,
        phoneNumber: data.phoneNumber,
      });
    } catch (error) {
      console.log("Error in the Updte handler Function", error);
    } finally {
      reset({
        currentSemester: "",
        email: "",
        gender: "",
        phoneNumber: "",
      });
    }
  };


  return (
    <div className="flex flex-col text-center justify-center items-center w-full text-white relative px-3 ">
      {error && <div className="text-red-500">{error}</div>}

      {state.loading && (
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 size-20">
          <Loader />
        </div>
      )}

      <form
        className="grid grid-cols-2 grid-rows-7 gap-x-4 items-center w-[800px] px-4 h-[500px]"
        onSubmit={handleSubmit(updateHandler)}
      >
        <div className="text-start flex flex-col gap-2">
          <Label className="text-sm" htmlFor="fullName">
            Name
          </Label>
          <Input
            {...register("fullName")}
            id="fullName"
            placeholder={data?.data?.user?.fullName}
            className="bg-white text-black w-full "
            readOnly
          />
        </div>

        <div className="text-start flex flex-col gap-2">
          <Label className="text-sm" htmlFor="firstName">
            Father's Name
          </Label>
          <Input
            {...register("fatherName")}
            id="fatherName"
            placeholder={data?.data?.user?.fatherName}
            className="bg-white text-black w-full "
            readOnly
          />
        </div>

        <div className="text-start flex flex-col gap-2 w-full ">
          <Label className="text-sm" htmlFor="firstName">
            Class Roll No
          </Label>
          <Input
            {...register("classRollNumber")}
            id="classRollNumber"
            placeholder={data?.data?.user?.classRollNumber}
            className="bg-white text-black"
            readOnly
          />
        </div>

        <div className="text-start flex flex-col gap-2 w-full ">
          <Label className="text-sm" htmlFor="firstName">
            Registration No
          </Label>
          <Input
            {...register("registrationNumber")}
            id="registrationNumber"
            placeholder={data?.data?.user?.registrationNumber}
            className="bg-white text-black"
            readOnly
          />
        </div>

        <div className="text-start flex flex-col gap-2 w-full ">
          <Label className="text-sm" htmlFor="firstName">
            Exam Roll No
          </Label>
          <Input
            {...register("examRollNumber")}
            placeholder={
              !data?.data?.user?.examRollNumber
                ? "John"
                : data?.data?.user?.examRollNumber
            }
            className="bg-white text-black"
            readOnly
          />
        </div>

        <div className="text-start flex flex-col gap-2">
          <Label className="text-sm" htmlFor="Programme">
            Current Semester
          </Label>
          <select
            {...register("semester")}
            className="w-full text-black gray-300 rounded-md h-[36px] px-2 text-sm"
          >
            <option value="" hidden>
              {!data?.data?.user?.currentSemester
                ? "Semester"
                : data?.data?.user?.currentSemester}
            </option>
            <option value="First">First</option>
            <option value="Second">Second</option>
            <option value="Third">Third</option>
            <option value="Fourth">Fourth</option>
            <option value="Fifth">Fifth</option>
            <option value="Sixth">Sixth</option>
          </select>
        </div>

        <div className="col-start-1 flex flex-col gap-2 col-end-3 text-start">
          <Label className="text-sm" htmlFor="email">
            Email
          </Label>
          <Input
            {...register("email")}
            placeholder={
              !data?.data?.user?.email
                ? "example@email.com"
                : data?.data?.user?.email
            }
            className="bg-white text-black"
          />
          {errors?.email && (
            <span className="text-red-500">{errors?.email?.message}</span>
          )}
        </div>

        <div className="text-start flex flex-col gap-2">
          <Label className="text-sm" htmlFor="gender">
            Gender
          </Label>
          <select
            {...register("gender")}
            id="gender"
            className="w-full text-black gray-300 rounded-md h-[36px] px-2 text-sm"
          >
            <option value="" hidden>
              {!data?.data?.user?.gender ? "Gender" : data?.data?.user?.gender}
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="text-start flex flex-col gap-2">
          <Label className="text-sm" htmlFor="phoneNumber">
            Mobile Number
          </Label>
          <Input
            {...register("phoneNumber")}
            id="phoneNumber"
            placeholder={data?.data?.user?.phoneNumber}
            className="bg-white text-black"
          />
          {errors?.phoneNumber && (
            <span className="text-red-500">{errors?.phoneNumber?.message}</span>
          )}
        </div>

        <div className="text-start flex flex-col gap-2 w-full ">
          <Label className="text-sm" htmlFor="firstName">
            Programme
          </Label>
          <Input
            {...register("programme")}
            id="programme"
            placeholder={
              !data?.data?.user?.programme
                ? "Your Programme"
                : data?.data?.user?.programme
            }
            className="bg-white text-black"
            readOnly
          />
        </div>

        <div className="text-start flex flex-col gap-2 w-full ">
          <Label className="text-sm" htmlFor="firstName">
            Department
          </Label>
          <Input
            {...register("department")}
            id="department"
            placeholder={
              !data?.data?.user?.department
                ? "Your Department"
                : data?.data?.user?.department
            }
            className="bg-white text-black"
            readOnly
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



export default Profile;
