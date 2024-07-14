import React from "react";
import { Outlet } from "react-router";
import imagePath from "../images/path.PNG";

export default function Unauthenticated() {
  return (
    <div className="h-full flex flex-col lg:flex-row ">
      <div className="h-full lg:w-1/2">
        <Outlet />
      </div>
      <div className="w-full h-full lg:w-1/2 bg-white-500 md:flex justify-between items-center p-6 hidden">
        <img src={imagePath} className="w-full h-full" object-cover alt="" />
      </div>
    </div>
  );
}
