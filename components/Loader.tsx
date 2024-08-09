import React from "react";
import { FiLoader } from "react-icons/fi";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <FiLoader className="w-5 h-5 animate-spin" />
    </div>
  );
};

export default Loader;
