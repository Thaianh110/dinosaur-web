import { CustomVarriant, InputForm, Pagination } from "components";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiDeleteProducts, apiGetProducts } from "apis";
import moment from "moment";
import { useSearchParams,createSearchParams,useNavigate, useLocation } from "react-router-dom";
import useDebounce from "hooks/useDebounce";
import EditProduct from "./EditProduct";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import icons from "ultils/icons";

const { MdDelete, MdAppRegistration,FaRegEdit } = icons;
const ManageOrder = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();
  const navigate = useNavigate()
  const location = useLocation()
 
  const [params] = useSearchParams()
  const [products, setProducts] = useState(null)
  const [count, setCount] = useState(0);
  const [editProduct, setEditProduct] = useState(null)
  const [customVarriant, setCustomVarriant] = useState(null);

  const [update, setUpdate] = useState(false)

  const render = useCallback(() => {
    setUpdate(!update)
  })

  const handleDeleteProduct = async (pid) => {
    Swal.fire({
      title: "Xoá sản phẩm?",
      text: "Bạn muốn xoá sản phẩm này chứ?",
      icon:'warning',
      showCancelButton: true,
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apiDeleteProducts(pid);
        if (response.success) {
          render();
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      }
    });
  };
  const fetchProduct = async(params) => {
    const response = await apiGetProducts({...params, limit: process.env.REACT_APP_LIMIT})
    if(response.success) {
      setCount(response.counts)
      setProducts(response.products)}
  };
  const queryDebounce = useDebounce(watch('q'),800)
  useEffect(() => {
    if (queryDebounce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({q:queryDebounce}).toString(),
      });
    } else navigate({
      pathname: location.pathname
    })
  }, [queryDebounce]);

  useEffect(() => {
    const searchParams = Object.fromEntries([...params])
    fetchProduct(searchParams);
  }, [params,update]);


  return (
    <div className="w-full flex flex-col gap-4 relative">
      {editProduct && (
        <div className="absolute inset-0 min-h-screen bg-gray-50">
          <EditProduct
            editProducts={editProduct}
            setEditProducts={setEditProduct}
            render={render}
          />
        </div>
      )}
      {customVarriant && (
        <div className="absolute inset-0 min-h-screen bg-gray-50">
          <CustomVarriant
            customVarriant={customVarriant}
            setCustomVarriant={setCustomVarriant}
            render={render}
          />
        </div>
      )}
      <div className="p-4 border-b w-full flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Manage Product</h1>
      </div>
      <div className="flex w-full justify-end items-center px-4 ">
        <form className="w-[45%]">
          <InputForm
            id="q"
            register={register}
            errors={errors}
            fullWidth
            placeholder="Tim kiem san pham"
          />
        </form>
      </div>
      <table className="table-auto">
        <thead className="font-bold text-white bg-gray-500 text-[13px] border border-blue-300">
          <tr className="text-lg">
            <th className="capitalize px-2 py-2 ">#</th>
            <th className="capitalize px-2 py-2 ">thumb </th>
            <th className="capitalize px-2 py-2 ">Title</th>
            <th className="capitalize px-2 py-2 ">Category</th>
            <th className="capitalize px-2 py-2 ">Price</th>
            <th className="capitalize px-2 py-2 ">Quantity</th>
            <th className="capitalize px-2 py-2 ">Sold</th>
            <th className="capitalize px-2 py-2 ">Brand</th>
            <th className="capitalize px-2 py-2 ">Color</th>
            <th className="capitalize px-2 py-2 ">Rating</th>
            <th className="capitalize px-2 py-2 ">Varriants</th>
            <th className="capitalize px-2 py-2 ">createdAt</th>
            <th className="capitalize px-2 py-2 ">Action</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((el, index) => (
            <tr className="border-b" key={el._id}>
              <td className="text-center">
                {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                  process.env.REACT_APP_LIMIT +
                  index +
                  1}
              </td>
              <td className="flex items-center justify-center py-1">
                <img src={el.thumb} alt="" className="w-12 h-12 object-cover" />
              </td>
              <td className="text-center py-2">{el.title}</td>
              <td className="text-center py-2">
                {el.category?.title || "unknown"}
              </td>
              <td className="text-center py-2">{el.price}</td>
              <td className="text-center py-2">{el.quantity}</td>
              <td className="text-center py-2">{el.sold}</td>
              <td className="text-center py-2">{el.brand}</td>
              <td className="text-center py-2">{el.color}</td>
              <td className="text-center py-2">{el.totalRating}</td>
              <td className="text-center py-2">{el.varriants.length || 0}</td>
              <td className="text-center py-2">
                {moment(el.updatedAt).format("DD/MM/YYYY")}
              </td>
              <td className=" text-center py">
                <span
                  onClick={() => setEditProduct(el)}
                  className="text-orange-400 hover:text-primary inline-flex"
                >
                  <FaRegEdit size={32} />
                </span>
                <span
                  onClick={() => handleDeleteProduct(el._id)}
                  className="text-orange-400 hover:text-primary inline-flex "
                >
                  <MdDelete size={32} />
                </span>
                <span
                  onClick={() => setCustomVarriant(el)}
                  className="text-orange-400 hover:text-primary inline-flex "
                >
                  <MdAppRegistration size={32} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-end items-center">
        <Pagination totalCount={count} />
      </div>
    </div>
  );
};

export default ManageOrder;
