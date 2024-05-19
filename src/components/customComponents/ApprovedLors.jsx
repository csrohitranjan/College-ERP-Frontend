import {
  TableHead,
  TableRow,
  TableHeader,
  Table,
  TableBody,
  TableCell,
} from "src/components/libraryComponents/table";
import { Store } from "../../api/Store";
import { useQuery } from "@tanstack/react-query";
import { useSnapshot } from "valtio";
import Loader from "./Loader";
import { Input } from "components/libraryComponents/input";
import { Button } from "../libraryComponents/button";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { formatDate, capitalizeFirstLetter } from "../../utils/generalUtils.js"
import { ToastContainer, toast } from "react-toastify";

const ApprovedLor = () => {
  const state = useSnapshot(Store);

  const [apiData, setapiData] = useState([]);
  const [error, setError] = useState(false);

  const { data } = useQuery({
    queryKey: ["GET_APPROVED_LOR"],
    queryFn: Store.approveLorGet,
  });

  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    Store.examRollNumber = event?.target?.value;
  };


  async function filterLors() {
    try {
      const res = await Store.filteringLor(state.examRollNumber);
      setapiData(res.data);
    } catch (error) {
      toast.error("Invalid Exam Roll Number");
      console.error(`Error in the filter lor function`, error);
    }
  }


  const user = apiData?.user;
  const filteredArray = apiData
    ? apiData.lors
      ?.map((item) => ({ ...item, ...user }))
      .filter((item) => item.status === "approved")
    : [];






  return (
    <div className="w-full border-dashed border-l border-white/80 bg-slate-900 text-white  h-auto overflow-y-scroll">
      {!data?.approvedLORs && (
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 size-20">
          <Loader />
        </div>
      )}
      <div className="flex justify-between items-center px-3 py-2">
        <span className="font-bold">Approved LOR List</span>

        <div className="flex gap-1 items-center">
          <Input
            className="text-black w-[150px] bg-gray-200 h-[30px]"
            placeholder="Exam Roll Number"
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
      <Table>
        <TableHeader>
          <TableRow className="bg-black text-white pointer-events-none">
            <TableHead className="text-center">Student Name</TableHead>
            <TableHead className="text-center">ExamRollNumber</TableHead>
            <TableHead className="text-center">CompanyName</TableHead>
            <TableHead className="text-center">CompanyAddress</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredArray === undefined && data?.approvedLORs
            ? data.approvedLORs?.map((lor, i) => {
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
                    {formatDate(lor?.updatedAt)}
                  </TableCell>
                  <TableCell className="border border-white/80">
                    {capitalizeFirstLetter(lor?.status)}
                  </TableCell>
                  <TableCell className="border border-white/80 cursor-pointer w-fit">
                    <a href={lor.lorPdfLink} style={{ color: lor.lorPdfLink ? 'green' : 'inherit' }}>Download</a>
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
                    {formatDate(lor?.updatedAt)}
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
          {/* )} */}
        </TableBody>
      </Table>

      <ToastContainer theme="dark" />
    </div>
  );
};

export default ApprovedLor;