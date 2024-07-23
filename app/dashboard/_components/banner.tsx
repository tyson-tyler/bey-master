"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faCog,
  faBell,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const ButtonGroup = () => {
  return (
    <>
      <style jsx>{`
        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes shrink {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(0.9);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes glow {
          0% {
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 1);
          }
          100% {
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
          }
        }

        .wiggle:hover {
          animation: wiggle 1s ease-in-out infinite;
        }

        .pulse:hover {
          animation: pulse 1s ease-in-out infinite;
        }

        .shrink:hover {
          animation: shrink 0.3s forwards;
        }

        .float:hover {
          animation: float 3s ease-in-out infinite;
        }

        .glow:hover {
          animation: glow 1.5s ease-in-out infinite;
        }
      `}</style>
      <div className="flex space-x-4 justify-center w-full mt-[-10px]">
        <button className="hover:bg-blue-500 border-blue-500 border-2 hover:text-white flex justify-center items-center p-4 text-blue-500 bg-none w-[50px] h-[50px] rounded-full shadow-lg transform transition duration-500 wiggle">
          <FontAwesomeIcon icon={faHome} className="w-4 h-4" />
        </button>
        <button className="hover:bg-green-500 flex justify-center w-[50px] h-[50px] items-center border-2 border-green-500 text-green-500 hover:text-white p-4 rounded-full shadow-lg transform transition duration-500 pulse">
          <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
        </button>
        <button className="hover:bg-red-500 hover:text-white w-[50px] h-[50px] p-4 border-2  flex justify-center items-center border-red-500 text-red-500 rounded-full shadow-lg transform transition duration-500 shrink">
          <FontAwesomeIcon icon={faCog} className="w-4 h-4" />
        </button>
        <button className="hover:bg-yellow-500 border-2 border-yellow-500 w-[50px] h-[50px]  flex justify-center items-center hover:text-white text-yellow-500  p-4 rounded-full shadow-lg transform transition duration-500 float">
          <FontAwesomeIcon icon={faBell} className="w-4 h-4" />
        </button>
        <button className="hover:bg-purple-500 hover:text-white p-4 text-purple-500 w-[50px]  flex justify-center items-center h-[50px] border-2 border-purple-500 rounded-full shadow-lg transform transition duration-500 glow">
          <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};

export default ButtonGroup;
