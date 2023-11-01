import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCreateCategoryMutation } from "../../service/categoryService";
import "./Category.scss";
import { TableCategory } from "./TableCategory";
import { useParams } from "react-router-dom";

import { Pagination } from "../../components/Pagination/Pagination";
import {
  useCreateCategoryMutation,
  useGetCategoryQuery,
} from "../../service/categoryService";
export const Category = () => {
  const [category, setCateory] = useState("");
  let { page } = useParams();
  if (!page) {
    page = 1;
  }
  const { data, isLoading } = useGetCategoryQuery({ page: page || 1 });
  const [createCategory, response] = useCreateCategoryMutation();
  console.log("response:", response);
  const handleSubmit = () => {
    createCategory(category);
  };
  useEffect(() => {
    const errorMes = response?.error?.data?.mes;
    const successMes = response?.data?.mes;
    if (errorMes) {
      toast.error(errorMes);
    } else {
      toast.success(successMes);
    }
  }, [response?.data?.mes, response?.error?.data?.mes]);
  return (
    <div className="">
      <div className="w-1/2 text-field">
        <input
          autoComplete="off"
          type="text"
          placeholder="Enter name"
          value={category}
          onChange={(e) => setCateory(e.target.value)}
        />
      </div>
      <div
        className="mt-3 inline-block px-2 py-1 bg-blue-500 text-white cursor-pointer"
        onClick={(e) => handleSubmit(e)}>
        Create
      </div>
      <div className="mt-8">
      {data && (
          <>
            <TableCategory data={data} isLoading={isLoading}></TableCategory>
            <Pagination
              page={parseInt(page)}
              totalPage={parseInt(data?.totalPages)}
              path="dashboard/category"
              count={data?.count}></Pagination>
          </>
        )}
      </div>
    </div>
  );
};