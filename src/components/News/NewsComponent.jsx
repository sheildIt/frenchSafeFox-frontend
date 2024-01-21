import { useState } from "react";

const NewsComponent = ({ viewType }) => {
  const news = [
    {
      id: 1,
      title: "WWW3 began",
      body: "Well we are doomed..it began today around 10 AM",
    },
    {
      id: 2,
      title: "Crypto crashed",
      body: "Crypto just crashed again, people are losing money..again",
    },
    {
      id: 3,
      title: "Lego layoffs",
      body: "Lego layed off 40 employees last month",
    },
  ];

  const truncateText = (text, limit) => {
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  return (
    <div className="flex flex-col">
      {viewType === "Overview" ? (
        <p className="text-2xl font-bold text-white">News</p>
      ) : (
        <p></p>
      )}
      {viewType === "Overview" ? (
        <ul className="flex flex-col mt-5 bg-purpleBlue w-[250px] h-[250px] xl:h-[300px] shadow-xl p-2 gap-2 rounded-lg">
          {news.map((newItem) => {
            return (
              <div
                key={newItem.id}
                className="max-w-sm w-30 h-20 lg:max-w-full lg:flex bg-mainBlue rounded-xl hover:bg-purple-600 cursor-pointer duration-200"
              >
                <div className="p-2 mb-2 flex-col justify-between leading-normal">
                  <div className="text-creme font-normal text-sm mb-2">
                    {newItem.title}
                  </div>
                  <p className="text-white/50 text-xs">
                    {truncateText(newItem.body, 40)}
                  </p>
                </div>
              </div>
            );
          })}
        </ul>
      ) : (
        <div className="flex-1 mx-3">
          <ul className="flex flex-col mt-2 w-full h-[260px] xl:h-[460px] p-2 gap-3 rounded-lg">
            {news.map((newItem) => {
              return (
                <div
                  key={newItem.id}
                  className="flex flex-row w-full hover:bg-purple-600 cursor-pointer duration-200 rounded-lg"
                >
                  <img
                    src="/images/1366.jpg"
                    className="rounded-lg w-28 xl:w-52"
                  />
                  <div className="flex flex-col ml-2 text-start">
                    <p className="text-white/75 text-base">{newItem.title}</p>
                    <p className="text-white/50 text-sm">
                      {truncateText(newItem.body, 70)}
                    </p>
                  </div>
                </div>
              );
            })}
          </ul>
          <div className="flex flex-row gap-2 mt-2 ml-2">
            <button className="mt-2 px-3 py-1 text-sm xl:text-base bg-purple-700 hover:bg-purple-500 duration-200">
              Generate
            </button>
            <div className="mt-2 px-3 py-1 text-sm xl:text-base bg-purple-700 hover:bg-purple-500 duration-200 cursor-pointer rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsComponent;
