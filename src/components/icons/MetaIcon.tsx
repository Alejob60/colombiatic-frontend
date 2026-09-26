import React from 'react';

interface MetaIconProps extends React.SVGProps<SVGSVGElement> {}

const MetaIcon: React.FC<MetaIconProps> = (props) => {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-22C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-2 5h4a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3zm2 2v6h2V9h-2z" />
    </svg>
  );
};

export default MetaIcon;