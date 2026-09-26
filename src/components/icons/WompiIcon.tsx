import React from 'react';

interface WompiIconProps extends React.SVGProps<SVGSVGElement> {}

const WompiIcon: React.FC<WompiIconProps> = (props) => {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm-1.5-16.5h3v1.5h-3v-1.5zm0 3h3v1.5h-3v-1.5zm0 3h3v1.5h-3v-1.5zm0 3h3v1.5h-3v-1.5z" />
    </svg>
  );
};

export default WompiIcon;