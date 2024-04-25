import {
  TableHead,
  TableRow,
  TableHeader,
  Table,
  TableBody,
  TableCell,
} from "../libraryComponents/table";
import { Store } from "../../api/Store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnapshot } from "valtio";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { Input } from "components/libraryComponents/input";
import { Button } from "../libraryComponents/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../libraryComponents/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useForm } from "react-hook-form";
import { Dialog } from "@radix-ui/react-dialog";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { formatDate, capitalizeFirstLetter } from "../../utils/generalUtils.js"



const PendingLor = () => {
  const [open, setOpen] = useState(false);
  const [lorId, setlorId] = useState("");
  const [apiData, setapiData] = useState([]);
  const [error, setError] = useState(false);

  const { data } = useQuery({
    queryKey: ["GET_PENDING_LOR"],
    queryFn: Store.getPendingLor,
  });

  const cache = useQueryClient();
  const state = useSnapshot(Store);
  const inputRef = useRef(null);

  const validationSchema = z.object({
    recipient: z.string().nonempty("Recipient is required"),
    companyName: z.string().nonempty("Company name is required"),
    companyAddress: z.string().nonempty("Company address is required"),
    recipientDepartment: z.string().optional(),
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });



  const approveLor = useMutation({
    mutationKey: ["APPROVE_LOR"],
    mutationFn: Store.approveLor,
    onSuccess: (res) => {
      if (res.stack) {
        toast.error(res?.response?.data?.message);
      } else {
        toast.success(res.data.message);
        cache.invalidateQueries(["GET_PENDING_LOR"]);
        reset({
          recipient: "",
          recipientDepartment: "",
          companyName: "",
          companyAddress: "",
        });
        setOpen(false);
      }
    },
  });


  const Editlor = useMutation({
    mutationKey: ["EDIT_LOR"],
    mutationFn: Store.updateLor,

    onSuccess: (res) => {
      console.log("TEST", res)
      if (res.stack) {
        toast.error(res?.response?.data?.message);
      } else {
        // toast.success(res.message);   // This Gives message that LOR update Successfully.
        approveLor.mutate({
          lorId: lorId,
        });
      }
    },
  });



  const toggleUpdate = (companyName, companyAddress, recipient) => {
    reset({
      companyName: companyName,
      companyAddress: companyAddress,
      recipient: recipient,
    });
  };

  const submitHandler = (inputData) => {
    console.log("inputData", inputData);

    try {
      Editlor.mutate({
        recipient: inputData.recipient,
        recipientDepartment:
          inputData.recipientDepartment !== ""
            ? inputData.recipientDepartment
            : data.pendingLORs.recipientDepartment,
        companyName:
          inputData.companyName !== ""
            ? inputData.companyName
            : data.pendingLORs.companyName,
        companyAddress:
          inputData.companyAddress !== ""
            ? inputData.companyAddress
            : data.pendingLORs.companyAddress,
        lorId: lorId,
      });
    } catch (error) {
      console.log(`Error in the submit handler function`, error);
    }
  };


  const rejectLor = useMutation({
    mutationKey: ["REJECT_LOR"],
    mutationFn: Store.rejectLor,

    onSuccess: (res) => {
      if (res.stack) {
        toast.error(res.response.data.message);
      } else {
        toast.success(res.message);
        cache.invalidateQueries(["GET_PENDING_LOR"]);
      }
    },
  });

  const rejectHandler = (lorId) => {
    try {
      rejectLor.mutate({
        lorId: lorId,
      });
    } catch (error) {
      console.log(`Error in the reject handler`, error);
    }
  };



  const handleInputChange = (event) => {
    console.log("event", event?.target?.value);
    Store.examRollNumber = event?.target?.value;
  };

  state.examRollNumber && console.log(state.examRollNumber);

  async function filterLors() {
    "filter lors function triggered";
    try {
      const res = await Store.filteringLor(state.examRollNumber);
      // res.data && error && setError(false);

      setapiData(res.data);
    } catch (error) {
      // setError(true);
      toast.error("Invalid Exam Roll Number");
      console.error(`Error in the filter lor function`, error);
    }
  }

  const user = apiData?.user;

  const filteredArray = apiData
    ? apiData.lors
      ?.map((item) => ({ ...item, ...user }))
      .filter((item) => item.status === "pending")
    : [];


  return (
    <div className="w-full border-gray-200 border-l border-dashed bg-slate-900 text-white h-auto overflow-y-scroll">
      {!data?.pendingLORs && (
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 size-20">
          <Loader />
        </div>
      )}
      <div className="flex justify-between items-center px-3 py-2">
        <span className="font-bold">Pending Lor List</span>

        <div className="flex gap-1 items-center">
          <Input
            className="text-black w-[150px] bg-gray-200 h-[30px]"
            placeholder="Search"
            onChange={handleInputChange}
            ref={inputRef}
          />
          <Button
            className="bg-black/100 hover:bg-black/50 mr-5 text-white"
            onClick={() => {
              filterLors();
              inputRef.current.value = "";
              Store.examRollNumber = "";
            }}
          >
            Search
          </Button>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white text-black">
          <DialogHeader className="mb-3">
            <DialogTitle className="text-2xl text-center">Approve LOR</DialogTitle>
            <DialogDescription className="text-center">
              Approving Letter of Recommendations
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-1">
            {[
              { name: "recipient", label: "Recipient" },
              { name: "recipientDepartment", label: "Recipient Department" },
              { name: "companyName", label: "Company Name" },
              { name: "companyAddress", label: "Company Address" },
            ].map((field) => (
              <div key={field.name} className="flex flex-col space-y-1">
                <Label className="text-sm font-medium">{field.label}</Label>
                <Input
                  {...register(field.name)}
                  placeholder={field.label}
                  className={`border border-black/80 p-1 ${errors?.[field.name] && "border-red-500"
                    }`}
                />
                {errors?.[field.name] && (
                  <div className="text-red-500 text-xs">{errors?.[field.name]?.message}</div>
                )}
              </div>
            ))}
            <DialogFooter className="mt-2">
              <Button type="submit" className="w-full bg-black text-white py-2">
                Submit
              </Button>
            </DialogFooter>
          </form>

        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow className="bg-black text-white pointer-events-none">
            <TableHead className="text-center">Student Name</TableHead>
            <TableHead className="text-center">ExamRollNumber</TableHead>
            <TableHead className="text-center">CompanyName</TableHead>
            <TableHead className="text-center">CompanyAddress</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead
              className={`text-center ${filteredArray?.length > 0 ||
                (data?.pendingLORs?.length > 0 && "border-b border-white/80")
                }`}
            >
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredArray === undefined && data?.pendingLORs
            ? data?.pendingLORs?.map((lor, i) => {
              return (
                <TableRow className="text-center poppins-regular" key={i}>
                  <TableCell className="border border-white/80">
                    {lor?.user?.fullName}
                  </TableCell>
                  <TableCell className="border border-white/80">
                    {lor?.user?.examRollNumber}
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
                  <TableCell className="flex justify-around border-b  border-white/80">
                    <Link
                      onClick={() => {
                        setlorId(lor?._id);
                        setOpen(true);
                        toggleUpdate(
                          lor?.companyName,
                          lor?.companyAddress,
                          lor?.recipient
                        );
                      }}
                      className="bg-green-600 text-white px-2 rounded-md "
                    >
                      Approve
                    </Link>
                    <Link
                      onClick={() => {
                        rejectHandler(lor?._id);
                      }}
                      className="bg-red-600 text-white px-2 rounded-md"
                    >
                      Reject
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })
            : filteredArray?.map((lor, i) => {
              return (
                <TableRow className="text-center poppins-regular" key={i}>
                  <TableCell className="border border-white/80">
                    {lor?.fullName}
                  </TableCell>
                  <TableCell className="border border-white/80">
                    {lor?.examRollNumber}
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
                  <TableCell className="flex justify-around border-b border-white/80">
                    <Link
                      onClick={() => {
                        setlorId(lor?._id);
                        setOpen(true);
                        toggleUpdate(
                          lor?.companyName,
                          lor?.companyAddress,
                          lor?.recipient
                        );
                      }}
                      className="bg-green-600 text-white px-2 rounded-md"
                    >
                      Approve
                    </Link>
                    <Link
                      onClick={() => {
                        rejectHandler(lor?._id);
                      }}
                      className="bg-red-600 text-white px-2 rounded-md"
                    >
                      Reject
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      <ToastContainer theme="dark" />
    </div>
  );
};

export default PendingLor;