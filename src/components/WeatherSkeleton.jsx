import React from "react";

const WeatherSkeleton = () => {
  return (
    <section className="p-4 mt-6 flex justify-between gap-10">
      <div className="text-white mb-4 w-2/3 h-auto flex flex-col justify-between">
        {/* Hero Section Skeleton */}
        <div className="w-full h-64 bg-neutral-700/50 rounded-3xl flex items-center justify-between p-6 animate-pulse">
          <div className="flex flex-col justify-center items-start">
            {/* City name skeleton */}
            <div className="h-8 bg-neutral-600/60 rounded-lg w-48 mb-2"></div>
            {/* Date skeleton */}
            <div className="h-5 bg-neutral-600/40 rounded-lg w-32"></div>
          </div>
          <div className="flex justify-center items-center gap-4 p-4">
            {/* Weather icon skeleton */}
            <div className="w-24 h-24 bg-neutral-600/60 rounded-full"></div>
            {/* Temperature skeleton */}
            <div className="h-16 bg-neutral-600/60 rounded-lg w-24"></div>
          </div>
        </div>

        {/* Grid Cards Skeleton */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          {[1, 2, 3, 4].map((item) => (
            <div 
              key={item}
              className="flex flex-col justify-center items-center bg-neutral-700/50 rounded-2xl h-24 animate-pulse"
            >
              <div className="h-4 bg-neutral-600/60 rounded w-16 mb-2"></div>
              <div className="h-6 bg-neutral-600/60 rounded w-12"></div>
            </div>
          ))}
        </div>

        {/* Daily Forecast Title Skeleton */}
        <div className="h-6 bg-neutral-600/60 rounded-lg w-32 mt-5 mb-5 animate-pulse"></div>

        {/* Daily Forecast Cards Skeleton */}
        <div className="grid grid-cols-7 gap-2">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <div
              key={day}
              className="p-2 bg-neutral-700/50 rounded-lg flex flex-col justify-center items-center animate-pulse"
            >
              {/* Day name skeleton */}
              <div className="h-4 bg-neutral-600/60 rounded w-8 mb-2"></div>
              {/* Weather icon skeleton */}
              <div className="w-10 h-10 bg-neutral-600/60 rounded-full my-8"></div>
              {/* Temperature skeleton */}
              <div className="flex justify-between w-full gap-2">
                <div className="h-4 bg-neutral-600/60 rounded w-6"></div>
                <div className="h-4 bg-neutral-600/40 rounded w-6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Forecast Sidebar Skeleton */}
      <div className="bg-neutral-700/50 text-white mb-4 w-1/3 h-auto rounded-3xl p-4 flex flex-col justify-around">
        {/* Header skeleton */}
        <div className="flex justify-between items-center mb-2 animate-pulse">
          <div className="h-6 bg-neutral-600/60 rounded-lg w-32"></div>
          <div className="h-10 bg-neutral-600/60 rounded-lg w-24"></div>
        </div>

        {/* Hourly items skeleton */}
        <div className="flex flex-col gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((hour) => (
            <div 
              key={hour}
              className="flex justify-between items-center bg-neutral-600/50 rounded-2xl h-auto p-4 animate-pulse"
            >
              <div className="flex gap-2 items-center">
                {/* Weather icon skeleton */}
                <div className="w-[25px] h-[25px] bg-neutral-500/60 rounded-full"></div>
                {/* Time skeleton */}
                <div className="h-4 bg-neutral-500/60 rounded w-12"></div>
              </div>
              {/* Temperature skeleton */}
              <div className="h-5 bg-neutral-500/60 rounded w-8"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeatherSkeleton;