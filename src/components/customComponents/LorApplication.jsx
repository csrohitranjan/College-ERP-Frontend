import { useState } from "react";
import { Button } from "../libraryComponents/button";
import { Link } from "react-router-dom";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "src/components/libraryComponents/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../libraryComponents/dialog";
import { Input } from "../libraryComponents/input";
import { Label } from "../libraryComponents/label";
import { Store } from "../../api/Store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useSnapshot } from "valtio";
import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";
import { formatDate, capitalizeFirstLetter } from "../../utils/generalUtils.js"



const LorApplication = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const state = useSnapshot(Store);
  const cache = useQueryClient();

  const { data } = useQuery({
    queryKey: ["GET_LORS"],
    queryFn: Store.getAllLors,
  });


  const applyLor = useMutation({
    mutationKey: ["APPLY_FOR_LOR"],
    mutationFn: Store.applyForLor,
    onSuccess: (res) => {
      if (res.stack) {
        toast.error(`${res?.response?.data.message}`);
      } else {
        cache.invalidateQueries(["GET_LORS"]);
        setOpen(false);
        toast.success(`${res?.data.message}`);
      }
    },

    onError: (err) => {
      console.log(err);
    },
  });



  async function lorApplication(data) {
    try {
      applyLor.mutate({
        companyName: data.companyName,
        companyAddress: data.companyAddress,
      });
    } catch (error) {
      console.log(`Error while applying the LOR`, lorApplication);
    } finally {
      reset({
        companyName: "",
        companyAddress: "",
      });
    }
  }


  return (
    <div className="w-full border-gray-200 border-l border-dashed bg-slate-900 text-white  h-auto overflow-y-scroll">
      {state.loading && (
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 size-20">
          <Loader />
        </div>
      )}

      <div className="flex justify-between items-center px-3 py-2">
        <span className="font-bold">All Requested Lor</span>
        <Button
          className="bg-black/100 hover:bg-black/50 mr-5 text-white"
          onClick={() => setOpen(true)}
        >
          Apply For Lor
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white text-black">
          {error && <div className="text-red-500 ">{error}</div>}

          {state.loading && !error && (
            <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 size-20">
              <Loader />
            </div>
          )}

          <DialogHeader className="mb-3">
            <DialogTitle className="text-2xl text-center">Request LOR</DialogTitle>
            <DialogDescription className="text-center">
              You are requesting for LOR
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(lorApplication)}>
            <div className="flex flex-col gap-5 mb-3">
              <div className="flex flex-col gap-2 ">
                {errors?.companyName?.message && (
                  <div className="text-red-500">
                    {errors?.companyName?.message}
                  </div>
                )}

                <Label>Company Name</Label>
                <Input
                  {...register("companyName")}
                  placeholder="Xyz Company"
                  className="border-2 border-black/80"
                />
              </div>

              <div className="flex flex-col gap-2">
                {errors?.companyAddress?.message && (
                  <div className="text-red-500">
                    {errors?.companyAddress?.message}
                  </div>
                )}

                <Label>Company Address</Label>
                <Input
                  {...register("companyAddress")}
                  placeholder="XYZ TOWN"
                  className="border-2 border-black/80"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="submit"
                className="w-full bg-black text-white"
                disabled={state.loading}
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
        <ToastContainer theme="dark" />
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow className="bg-black text-white pointer-events-none">
            <TableHead className="text-center">Reference Number</TableHead>
            <TableHead className="text-center">Company Name</TableHead>
            <TableHead className="text-center">Company Address</TableHead>

            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.userLors?.map((lor, i) => {
            return (
              <TableRow className="text-center poppins-regular" key={i}>
                <TableCell className="border border-white/80">
                  {lor.referenceNumber && lor.referenceNumber}
                </TableCell>
                <TableCell className="border border-white/80">
                  {lor?.companyName}
                </TableCell>
                <TableCell className="border border-white/80">
                  {lor?.companyAddress}
                </TableCell>
                <TableCell className="border border-white/80">
                  {formatDate(lor?.createdAt)}
                </TableCell>
                <TableCell className="border border-white/80">
                  {capitalizeFirstLetter(lor?.status)}
                </TableCell>
                <TableCell className="border border-white/80 cursor-pointer w-fit">
                  <a href={lor.lorPdfLink} style={{ color: lor.lorPdfLink ? 'green' : 'inherit' }}>Download</a>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};





export default LorApplication;