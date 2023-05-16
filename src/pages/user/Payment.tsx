import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

export default function Payment() {
  return (
    <div>
      <h1 className="mb-5 mt-5 ml-5 text-5xl">Payment Options</h1>
      <section className=" p-10">
        <div className="h-52 w-52 cursor-pointer border-2 border-dashed border-black p-5">
          <span className="flex h-full flex-col items-center justify-center  ">
            <span className="flex flex-col gap-5">
              <AiOutlinePlus className=" m-auto  rounded-full border-2 border-dashed border-black p-1 text-5xl  " />
              <h2 className="text-center font-medium">
                Add <br />
                Payment Method
              </h2>
            </span>
          </span>
        </div>
      </section>
    </div>
  );
}
