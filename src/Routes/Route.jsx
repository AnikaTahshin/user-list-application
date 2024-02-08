import {
    createBrowserRouter,   
  } from "react-router-dom";
import App from "../App";
import UserDetails from "../component/UserDetails";
  const router = createBrowserRouter([  
      {
        path: "/",
        element: <App />,
       
      },  
      {
        path: "details",
        element: <UserDetails />, 
    } 
  ]);

  export default router