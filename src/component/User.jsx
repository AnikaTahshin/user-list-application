import React from "react";
import { Link, useParams } from "react-router-dom";

const User = ({ item }) => {
  let { id } = useParams();
  return (
    <div className="flex flex-col justify-center items-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg" src={item?.image} alt="" />

      <div className="p-5 text-center">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {item?.firstName}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {item?.lastName}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {item?.email}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {item?.address?.address}, {item?.address?.city},{item?.address?.state}{" "}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {item?.company?.name}
        </p>

        <Link
          to={`details/${id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default User;
