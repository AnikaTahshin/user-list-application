import React, { useEffect, useState } from "react";
import User from "./User";
import { Link } from "react-router-dom";

const UserCard = () => {
  const [apiData, setApiData] = useState([]);
  const [searchBy, setSearchBy] = useState('Search')
  const [searchModal, setSearchModal] = useState(false)

  function handleSearchBy() {
    setSearchModal(!searchModal)
    
  }

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setApiData(data?.users);
      });
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="w-[300px] md:w-[600px] my-10">
          <form>
            <div className="flex">
              <label
                for="search-dropdown"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Your Email
              </label>
              <div className="flex flex-col justify-center items-center">
              <button
              onClick={() => handleSearchBy()}
                id="dropdown-button"
                data-dropdown-toggle="dropdown"
                className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                type="button"
              >
                {searchBy}
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {searchModal && 
              <div
                id="dropdown"
                className=" bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdown-button"
                >
                  <Link>
                    <button onClick={() => {setSearchBy('Search By Name'); setSearchModal(false)}}
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                     Search By Name
                    </button>
                  </Link>
                  <Link>
                    <button onClick={() => {setSearchBy('Search By Email'); setSearchModal(false)}}
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Search By Email
                    </button>
                  </Link>
                  <Link>
                    <button
                    onClick={() => {setSearchBy('Search By Company Name'); setSearchModal(false)}}
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                     Search By Company Name
                    </button>
                  </Link>
                  
                </ul>
              </div>}
              </div>
              <div className="relative w-full">
                <input
                  type="search"
                  id="search-dropdown"
                  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="Search By Name, Email, Company Name..."
                  required
                />
                {/* <button
                  type="submit"
                  className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search</span>
                </button> */}
              </div>
            </div>
          </form>
        </div>
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 grid-flow-row w-screen h-screen mx-6">
          {apiData.map((item) => (
            <User key={item?.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default UserCard;
