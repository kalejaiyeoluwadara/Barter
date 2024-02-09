import React from "react";
import board2 from "../assets/images/board2.png";
import logo from "../assets/images/logo.png";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useGlobal } from "../context";
function Board2() {
  const { setPage } = useGlobal();
  return (
    <div className="h-screen w-screen px-8 flex-col bg-black flex items-center  pt-6 pb-12">
      <img className="" src={board2} alt="" />
      <div className="gap-3 flex flex-col  w-full items-start justify-center">
        <h2 className="text-[30px] mt-6 capitalize font-[600]">
          Connecting you with the best of the best
        </h2>
        <p className="text-[18px] text-start ">
          Discover a wide range of tutors as you embark on your academic
          comeback.
        </p>
        <div className="w-full mt-2 flex items-center justify-center">
          <button
            onClick={() => {
              setPage("signup");
              console.log("hello");
            }}
            className="px-8 text-[18px] flex items-center justify-center gap-2 font-[500] py-3 bg-blue-600 rounded-[8px]  "
          >
            Get Started
            {/* <MdOutlineShoppingCart size={22} /> */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Board2;
