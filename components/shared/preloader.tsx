// components/Preloader.js
import React from "react";

const Preloader = () => {
  return (
    <div className="preloader">
      {/* Add your preloader animation or image here */}
      <div className="spinner">
        {/* Example of a simple spinner */}
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
      <style>{`
        .preloader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          z-index: 9999;
        }
        .spinner {
          width: 40px;
          height: 40px;
          position: relative;
        }
        .double-bounce1,
        .double-bounce2 {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #333;
          opacity: 0.6;
          position: absolute;
          top: 0;
          left: 0;
          animation: bounce 2s infinite ease-in-out;
        }
        .double-bounce2 {
          animation-delay: -1s;
        }
        @keyframes bounce {
          0%,
          100% {
            transform: scale(0);
          }
          50% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
