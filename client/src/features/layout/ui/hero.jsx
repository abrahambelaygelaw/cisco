import React, { useEffect, useState } from "react";
import UploadFile from "../../../components/uploadFile";
import {
  useCreateLayoutMutation,
  useUpdateLayoutMutation,
} from "../layoutApiSlice";
import { useFormik } from "formik";
import { heroSchema } from "../schema";
import { FaStarOfLife } from "react-icons/fa";

const Hero = ({ layout, refetch }) => {
  const hero = layout.find((v) => v.hasOwnProperty("hero"));

  const heroUpdate = hero?.hero?.length;
  const [doneUploading, setDoneUploading] = useState(false);

  const [createLayout, { isError, error, isSuccess, isLoading }] =
    useCreateLayoutMutation();
  const [
    updateLayout,
    {
      isError: isUpdateError,
      error: updateError,
      isSuccess: isUpdateSuccess,
      isLoading: isUpdateLoading,
    },
  ] = useUpdateLayoutMutation();
  const initialValues = {
    title: heroUpdate ? hero.hero[0].hero.title : "",
    picture: heroUpdate ? hero.hero[0].hero.picture : "",
    subTitle: heroUpdate ? hero.hero[0].hero.subTitle : "",
  };
  const onSubmit = async (values, { resetForm }) => {
    const heroData = {};
    heroData.type = "hero";
    heroData.title = values.title;
    heroData.picture = values.picture;
    heroData.subTitle = values.subTitle;

    try {
      if (heroUpdate) {
        await updateLayout(heroData).unwrap();
      } else {
        await createLayout(heroData).unwrap();
      }
      resetForm();
    } catch (error) {}
  };
  const {
    touched,
    errors,
    values,
    setValues,
    handleSubmit,
    setFieldValue,
    getFieldProps,
  } = useFormik({
    initialValues,
    validationSchema: heroSchema,
    onSubmit,
  });
  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      refetch();
    }
  }, [isSuccess, isUpdateSuccess]);

  useEffect(() => {
    if (values.picture) setDoneUploading(true);
  }, [values.picture]);

  return (
    <div>
      <h1 className=" font-poppins text-3xl text-white mb-2">Hero section</h1>
      <form onSubmit={handleSubmit}>
        <div className="max-w-[600px]">
          <div className="mt-4">
            <div className="mb-4">
              <label
                for="title"
                className="block mb-2 text-sm font-medium  text-white"
              >
                Title{" "}
                <span>
                  {
                    <FaStarOfLife className=" text-red-900 text-[10px] inline ml-1" />
                  }
                </span>
              </label>
              <input
                type="text"
                {...getFieldProps("title")}
                id="title"
                className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 text-white "
              />
              {touched.title && errors.title && (
                <p className="text-sm text-red-600 dark:text-red-500">
                  {errors.title}
                </p>
              )}
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-4">
              <label
                for="subTitle"
                className="block mb-2 text-sm font-medium  text-white"
              >
                Subtitle{" "}
                <span>
                  {
                    <FaStarOfLife className=" text-red-900 text-[10px] inline ml-1" />
                  }
                </span>
              </label>
              <input
                type="text"
                {...getFieldProps("subTitle")}
                id="subTitle"
                className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 text-white "
              />
              {touched.subTitle && errors.subTitle && (
                <p className="text-sm text-red-600 dark:text-red-500">
                  {errors.subTitle}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || isUpdateLoading || !doneUploading}
            className="bg-[#432830] disabled:bg-[#43283067] disabled:cursor-not-allowed  px-3 py-2 rounded-lg text-white inline-flex items-center"
          >
            {isLoading || isUpdateLoading ? (
              <>
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600 "
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
                <h3>Loading...</h3>
              </>
            ) : (
              "save"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Hero;
