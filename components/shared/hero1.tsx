const SpaceSVG: React.FC = () => {
  return (
    <svg className="absolute inset-0 w-full h-full">
      {/* Background */}
      <rect x="0" y="0" width="100%" height="100%" fill="#0d1148" />

      {/* Stars */}
      <g id="stars">
        <circle cx="20%" cy="10%" r="1" fill="#ffffff" />
        <circle cx="70%" cy="20%" r="1" fill="#ffffff" />
        <circle cx="50%" cy="30%" r="1" fill="#ffffff" />
        {/* Add more stars as needed */}
      </g>

      {/* Solar System */}
      <g id="solar-system">
        <circle cx="50%" cy="50%" r="10" fill="#f9d71c" />
        <circle cx="45%" cy="50%" r="1" fill="#ffffff" />
        <circle cx="55%" cy="50%" r="1" fill="#ffffff" />
        <circle cx="45%" cy="45%" r="1" fill="#ffffff" />
        <circle cx="55%" cy="55%" r="1" fill="#ffffff" />
        {/* Add more planets and details */}
      </g>
    </svg>
  );
};

export default SpaceSVG;
