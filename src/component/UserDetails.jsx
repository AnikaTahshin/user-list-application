import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const UserDetails = () => {
const {id} = useParams()
const [data, setData] = useState([])

useEffect(() => {
  fetch(`https://dummyjson.com/users/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log('dataaaa',data)
      setData(data);
      
    });
}, []);
  return (
    
<div className='flex justify-center items-center mt-8'>
<div class="flex w-full flex-col  items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img class="object-cover rounded-t-lg md:rounded-none md:rounded-s-lg" src={data?.image} alt="" />
    <div class="flex flex-col justify-between p-4 leading-normal ml-20">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data?.firstName} {data?.lastName}</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{data?.email}</p>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{data?.address?.address}, {data?.address?.city}</p>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{data?.company?.name}</p>


    </div>
</div>
</div>

  );
};

export default UserDetails;
