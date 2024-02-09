import React, { useEffect, useState } from "react";
import User from "./User";
import { Link } from "react-router-dom";

const UserCard = () => {
  const [apiData, setApiData] = useState([]);
  const [sortBy, setSortBy] = useState("Search");
  const [sortModal, setSortModal] = useState(false);

  const [filterData, setFilterData] = useState([]);

  function handleSortBy() {
    setSortModal(!sortModal);
  }

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setApiData(data?.users);
        setFilterData(data?.users);
      });
  }, []);

  function sortByName() {
   

    if (sortBy === "Sort By Name") {
     
      const sortNameFilterData = apiData.slice().sort((a, b) => {
        
        return a.firstName.localeCompare(b.firstName);
      });

      
      setFilterData(sortNameFilterData);
    } else {
      
      setFilterData(adminData);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row justify-between items-center">
          <div className="w-[300px] md:w-[600px] my-10">
            <form>
              <div className="flex">
                <div className="flex flex-col justify-center items-center">
                  <button
                    onClick={() => handleSortBy()}
                    id="dropdown-button"
                    data-dropdown-toggle="dropdown"
                    className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                    type="button"
                  >
                    {sortBy}
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
                  {sortModal && (
                    <div
                      id="dropdown"
                      className=" bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdown-button"
                      >
                        <Link>
                          <button
                            onClick={() => {
                              setSortBy("Sort By Name");
                              setSortModal(false);
                              sortByName();
                            }}
                            type="button"
                            className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Search By Name
                          </button>
                        </Link>
                        <Link>
                          <button
                            onClick={() => {
                              setSortBy("Sort By Email");
                              setSortModal(false);
                            }}
                            type="button"
                            className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Search By Email
                          </button>
                        </Link>
                        <Link>
                          <button
                            onClick={() => {
                              setSortBy("Sort By Company Name");
                              setSortModal(false);
                            }}
                            type="button"
                            className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Search By Company Name
                          </button>
                        </Link>
                      </ul>
                    </div>
                  )}
                </div>
                <div className="relative w-full">
                  <input
                    type="search"
                    id="search-dropdown"
                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Search By Name, Email, Company Name..."
                    required
                  />
                </div>
              </div>
            </form>
          </div>

          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Add User
          </button>
        </div>
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 grid-flow-row w-screen h-screen mx-6">
          {filterData.map((item) => (
            <User key={item?.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default UserCard;
