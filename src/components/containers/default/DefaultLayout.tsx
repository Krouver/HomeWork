import { Outlet } from "react-router-dom";
import DefaultHeader from "./DefaultHeader";

const DefaultLayout = () => {
  return (                                //---------------------------------------------------яку функцію виконує Outlet?
    <>
      <DefaultHeader />
      <div className="container">
        <Outlet/>          
      </div>
      
    </>
  );
};

export default DefaultLayout;
