import React, { useEffect, useState } from "react";
import User from "./User";

const UserCard = () => {
  const [apiData, setApiData] = useState([]);

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
     <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 grid-flow-row w-screen h-screen mx-6">
     {apiData.map((item) => (
       
       <User key={item?.id} item={item} />
    
    ))}
     </div>
    </>
  );
};

export default UserCard;
