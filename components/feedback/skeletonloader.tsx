const SkeletonLoader = () => (
  <ul className="grid-container w-full gap-6 mb-12 p-5 md:mb-4">
    {Array.from({ length: 4 }).map((_, index) => (
      <li
        key={index}
        className="relative dark:bg-gray-800 bg-gray-50 dark:text-white text-black rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl animate-pulse"
      >
        <div className="flex flex-col items-center p-6 space-y-4">
          <div className="flex justify-center items-center w-16 h-16 mb-4 dark:bg-gray-700 bg-gray-200 rounded-lg">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
          <div className="space-y-1 text-center">
            <div className="h-5 bg-gray-300 rounded w-32"></div>
            <div className="h-3 bg-gray-200 rounded w-24 mt-2"></div>
          </div>
        </div>
      </li>
    ))}
  </ul>
);
