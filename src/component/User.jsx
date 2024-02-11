import React from "react";
import { Link } from "react-router-dom";

const User = ({ item }) => {
 
  return (
    <div className="flex flex-col justify-center items-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg" height={250} width={250} src={item?.image} alt="" />

      <div className="p-5 text-center">
        <Link
          to={{
            pathname: `details/${item?.id}`,
           
          }}
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {item?.firstName} {item?.lastName}
          </h5>
        </Link>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        <span className="text-xl text-black font-medium"> Email :  </span>
         {item?.email}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <span className="text-xl text-black font-medium">Address :  </span>
        {item?.address?.address ? item?.address?.address : ''} {" "} {item?.address?.city ? item?.address?.city : ''} {" "}{item?.address?.state ? item?.address?.state : ''}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        <span className="text-xl text-black font-medium"> Company Name :  </span>
        {item?.company?.name}
        </p>

       
      </div>
    </div>
  );
};

export default User;
