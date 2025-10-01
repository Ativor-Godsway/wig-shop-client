import ShopCard from "./shopCard";

const Collection = () => {
  const categories = [
    {
      name: "Frontal",
      description: "",
      image: `a.jpg`,
      bgColor: "bg-pink-200",
    },
    {
      name: "100% Human Hair",
      description: "Blend Hair",
      image: "b.jpg",
      bgColor: "bg-sky-200",
    },
    {
      name: "Blend Hair",
      description: "",
      image: "bg.jpeg",
      bgColor: "bg-emerald-200 ",
    },
    {
      name: "Luxury Hair",
      description: "Nothing interesting yet",
      image: "banner.jpeg",
      bgColor: "bg-purple-200",
    },
  ];

  return (
    <div className="pb-10 p-2 bg-white ">
      <h2 className="mt-10 text-2xl font-serif mb-2">Our Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-1 md:gap-5 md:px-5">
        {categories.map((category, index) => (
          <ShopCard category={category} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Collection;
