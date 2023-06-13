import React from 'react';

const LargeCard = (props) => {
  const { children, cardname, count } = props;
  return (
    <div>
      <div className="relative overflow-hidden rounded-lg bg-white shadow">
        <div className="bg-gray-50 px-4 py-4 sm:px-6">
          <div className="text-start text-lg font-semibold">
            <div className="justify-left flex items-center gap-x-2 font-medium text-gray-600 hover:text-gray-500">
              {cardname}
              {count && (
                <span className="flex items-center justify-center rounded-2xl border-2 border-[#2f95fa] px-1 text-sm text-[#2f95fa]">
                  {count}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="h-[480px] overflow-y-auto px-4 pt-4 sm:px-6 sm:pt-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LargeCard;
