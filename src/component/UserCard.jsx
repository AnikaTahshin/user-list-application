import React, { useEffect, useState } from "react";
import User from "./User";
import { Link } from "react-router-dom";
import { createToast } from "../utils/SweetAlertToast";

const UserCard = () => {
  const [apiData, setApiData] = useState([]);
  const [sortBy, setSortBy] = useState("Sort");
  const [sortModal, setSortModal] = useState(false);
  const [handleAddUserModal, setHandleAddUserModal] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //toggle the sorted list modal starts
  const handleSortBy = () => {
    setSortModal(!sortModal);
  };
  //toggle the sorted list modal ends

  // toggle add user modal starts
  const addUserModalFun = () => {
    setHandleAddUserModal(!handleAddUserModal);
  };

  // toggle add user modal starts

  //fetch user data starts
  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setApiData(data?.users);
        setFilterData(data?.users);
      });
  }, []);

  //fetch user data ends

  // add new user starts
  const addNewUser = (e) => {
    e.preventDefault();

    if (!firstName) {
      createToast("FirstName is Required");
    } else if (!lastName) {
      createToast("LastName is Required");
    } else if (!email) {
      createToast("Email is Required");
    } else if (!address) {
      createToast("Address is Required");
    } else if (!companyName) {
      createToast("Compnany Name is Required");
    } else if (!selectedImage) {
      createToast("Image is Required");
    } else {
      const newUser = {
        id: apiData.length + 1,
        firstName: firstName,
        lastName: lastName,
        image: URL.createObjectURL(selectedImage),
        email: email,
        address: { address: address, city: "" },
        company: { name: companyName },
      };

      setFilterData((prev) => [...prev, newUser]);
      createToast("User is Added", "success");
      setHandleAddUserModal(false);
    }
  };

  console.log("new userrr", filterData);
  // add new user ends

  //sort users by name starts
  const sortByName = () => {
    const sortedData = [...apiData].sort((a, b) =>
      a.firstName.localeCompare(b.firstName)
    );
    setFilterData(sortedData);
  };
  //sort users by name ends

  //sort users by email starts
  const sortByEmail = () => {
    const sortedData = [...apiData].sort((a, b) =>
      a.email.localeCompare(b.email)
    );
    setFilterData(sortedData);
  };
  //sort users by email ends

  //sort users by email starts
  const sortByCompanyName = () => {
    const sortedData = [...apiData].sort((a, b) =>
      a.company?.name.localeCompare(b.company?.name)
    );
    setFilterData(sortedData);
  };
  //sort users by email ends

  // search by first or last name starts
  const handleSearch = () => {
    if (inputSearch === "") {
      setFilterData(apiData);
    } else {
      const filterBySearch = apiData.filter(
        (item) =>
          item.firstName.toLowerCase().includes(inputSearch.toLowerCase())
        // ||
        // item.lastName.toLowerCase().includes(inputSearch.toLowerCase())
      );

      setFilterData(filterBySearch);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [inputSearch]);

  // search by first or last name ends

  useEffect(() => {
    switch (sortBy) {
      case "By Name":
        sortByName();
        break;
      case "By Email":
        sortByEmail();
        break;
      case "By Company Name":
        sortByCompanyName();
        break;
      default:
        setFilterData(apiData);
        break;
    }
  }, [sortBy]);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="w-[200px] md:w-[600px] my-10">
            <form>
              <div className="flex">
                <div className="flex flex-col justify-center items-center">
                  <button
                    onClick={() => handleSortBy()}
                    id="dropdown-button"
                    data-dropdown-toggle="dropdown"
                    className="md:w-30 text-[12px] flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
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
                      className=" bg-white absolute top-40 md:top-20 md:left-[200px] divide-y divide-gray-100 rounded-lg shadow w-50 dark:bg-gray-700"
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdown-button"
                      >
                        <Link>
                          <button
                            onClick={() => {
                              setSortBy("By Name");
                              setSortModal(false);
                            }}
                            type="button"
                            className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Sort By Name
                          </button>
                        </Link>
                        <Link>
                          <button
                            onClick={() => {
                              setSortBy("By Email");
                              setSortModal(false);
                            }}
                            type="button"
                            className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Sort By Email
                          </button>
                        </Link>
                        <Link>
                          <button
                            onClick={() => {
                              setSortBy("By Company Name");
                              setSortModal(false);
                            }}
                            type="button"
                            className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Sort By Company Name
                          </button>
                        </Link>
                      </ul>
                    </div>
                  )}
                </div>
                <div className="relative w-full md:w-[400px]">
                  <input
                    type="text"
                    onChange={(e) => setInputSearch(e.target.value)}
                    placeholder="Search By Name, Email, Company Name..."
                    className=" p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  />
                </div>
              </div>
            </form>
          </div>
          <button
            onClick={() => addUserModalFun()}
            className="bg-blue-500 mb-8 md:mb-0 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Add User
          </button>
        </div>

        {handleAddUserModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-[300px] md:w-[500px] shadow-lg rounded-md bg-white">
              <div className="text-center ">
                <h3 className="text-2xl font-bold text-gray-900">
                  Add New User
                </h3>
                <form onSubmit={addNewUser}>
                  <div className="mt-2 px-7 py-3">
                    <input
                      id="firstName"
                      name="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      type="text"
                      placeholder="First Name"
                      className="mb-2 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />

                    <input
                      id="lname"
                      name="lname"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      placeholder="Last Name"
                      className="mb-2 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <input
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      placeholder="Email"
                      className="mb-2 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />

                    <input
                      id="address"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      placeholder="Address"
                      className="mb-2 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />

                    <input
                      id="companyName"
                      name="companyName"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      type="text"
                      placeholder="Company Name"
                      className="mb-2 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />

                    {selectedImage && (
                      <div>
                        <img
                          alt="not found"
                          width={"100px"}
                          src={URL.createObjectURL(selectedImage)}
                        />
                        <br />
                        <button onClick={() => setSelectedImage(null)}>
                          Remove
                        </button>
                      </div>
                    )}
                    <input
                      type="file"
                      name="myImage"
                      onChange={(event) => {
                        console.log(event.target.files[0]);
                        setSelectedImage(event.target.files[0]);
                      }}
                    />
                  </div>
                  <div className="flex flex-row justify-around">
                    <button type="submit" className="p-2 bg-green-400">
                      Submit
                    </button>
                    <button
                      onClick={() => setHandleAddUserModal(false)}
                      // type="submit"
                      className="p-2 bg-green-400"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {isLoading ? (
          <div class="text-center">
            <div role="status">
              <svg
                aria-hidden="true"
                class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 px-6 grid-flow-row w-screen h-screen">
            {filterData.length > 0 ? (
              filterData.map((item) => <User key={item?.id} item={item} />)
            ) : (
              <div className="flex text-center">
                <p className="text-4xl ">No User Found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default UserCard;
