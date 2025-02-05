'use client';

import { useState } from 'react';

const RatingFilter = () => {
  const [selectedRating, setSelectedRating] = useState('');
  
  const ratings = [
    { label: '전체', value: 'all' },
    { label: '4.8 - 5.0', value: '4.8-5.0' },
    { label: '4.5 - 4.8', value: '4.5-4.8' },
    { label: '4.0 - 4.5', value: '4.0-4.5' },
    { label: '3.0 - 4.0', value: '3.0-4.0' }
  ];

  return (
    <div className="w-[98px] space-y-2">
      <div className="w-[98px] h-[32px] text-[20px] font-bold text-[#2D3034] leading-[32px]" style={{ fontFamily: 'Pretendard' }}>
        RATING
      </div>
      {ratings.map((rating) => (
        <label key={rating.value} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="rating"
            value={rating.value}
            checked={selectedRating === rating.value}
            onChange={() => setSelectedRating(rating.value)}
            className="hidden"
          />
          <div
            className={`w-[20px] h-[20px] border border-[#6A42DB] rounded-md flex items-center justify-center 
              ${selectedRating === rating.value ? 'bg-[#EDEBFE] border-2 border-[#6A42DB]' : 'bg-white border-[#6A42DB]'}`}
          >
            {selectedRating === rating.value && <div className="w-[12px] h-[12px] bg-[#6A42DB] rounded-md"></div>}
          </div>
          <span className="text-[16px] font-medium leading-[26px] text-[#2D3034]" style={{ fontFamily: 'Pretendard' }}>
            {rating.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default RatingFilter;