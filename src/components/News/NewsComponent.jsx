const NewsComponent = () => {
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
      <p className="text-2xl font-bold text-white">News</p>
      <ul className="flex flex-col mt-5 bg-purpleBlue w-[250px] h-[250px] xl:h-[300px] shadow-xl p-5 rounded-lg">
        {news.map((newItem) => {
          return (
            <div
              key={newItem.id}
              className="flex flex-row p-2 relative hover:bg-slate-600 duration-300 cursor-pointer rounded-lg"
            >
              <li className="border-b border-lightPurple/20">
                <p className="text-xs xl:text-normal mb-1">{newItem.title}</p>
                <p className="text-xs xl:text-normal mb-1 text-white/50 overflow-hidden overflow-ellipsis">
                  {truncateText(newItem.body, 40)}
                </p>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.0"
                stroke="currentColor"
                className="w-5 h-5 xl:w-6 xl:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default NewsComponent;
