import React from 'react';

interface AWSIconProps extends React.SVGProps<SVGSVGElement> {}

const AWSIcon: React.FC<AWSIconProps> = (props) => {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm-4.5-9h3v3h-3v-3zm4.5 0h3v3h-3v-3zm4.5 0h3v3h-3v-3zm-9-4.5h3v3h-3v-3zm4.5 0h3v3h-3v-3zm4.5 0h3v3h-3v-3zm-9-4.5h3v3h-3v-3zm4.5 0h3v3h-3v-3zm4.5 0h3v3h-3v-3z" />
    </svg>
  );
};

export default AWSIcon;