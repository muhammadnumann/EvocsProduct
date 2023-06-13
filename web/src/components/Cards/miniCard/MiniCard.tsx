import React from 'react';

const MiniCard = (props) => {
  const { children, cardname } = props;
  return (
    <div>
      <div className="relative overflow-hidden rounded-lg bg-white shadow ">
        <div className="flex h-[52px] items-center justify-center bg-gray-50 px-4">
          <div className="text-center text-sm">
            <div className="font-medium text-gray-600 hover:text-gray-500 ">
              {cardname}
              <span className="sr-only"> stats</span>
            </div>
          </div>
        </div>
        <div className="flex h-[120px] flex-col items-center justify-center px-4 pt-4 text-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MiniCard;
