import React from "react";

const SkeletonLogo = () => (
  <div>
    <style>
      {`
        @keyframes rolling {
          0% { transform: rotate(0deg); }
          25%{
            transform: rotate(90deg);
          }
            50%{
            transform: rotate(180deg);
            }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes bouncing {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-30px); }
          60% { transform: translateY(-15px); }
        }
        
        @keyframes circle-transition {
          0% { border-radius: 0; }
          100% { border-radius: 50%; }
        }
      `}
    </style>
    <div
      className="h-12 w-12 bg-gray-300 flex justify-center items-center m-auto"
      style={{
        animation:
          "rolling 2s linear infinite, bouncing 2s ease infinite, circle-transition 2s ease-in-out infinite",
      }}
    />
  </div>
);

export default SkeletonLogo;
