import ShopCard from "./shopCard";

const Services = () => {
  const categories = [
    {
      name: "Closure/Frontal Wig Making",
      description: "",
      image: `a.jpg`,
      category: "streetwear",
    },
    {
      name: "Frontal Installation & Styling",
      description: "Blend Hair",
      image: "b.jpg",
      category: "shoes",
    },
    {
      name: "Ponytails/Sew-ins",
      description: "",
      image: "e.jpg",
      category: "accessories",
    },
    {
      name: "Bridal Hairstyling / Makeup",
      description: "Nothing interesting yet",
      image: "f.jpg",
      category: "formal-wear",
    },
  ];

  return (
    <div className="p-2  bg-white ">
      <h2 className=" text-2xl font-serif text-center font-extralight  mb-4">
        Our Services
      </h2>
      <div className="w-full flex flex-col items-center">
        {categories.map((category, index) => (
          <div key={index} className="w-full flex flex-col items-center">
            <h3 className="text-lg font-serif mb-3 ">{category.name}</h3>
            <hr className="w-full" />
          </div>
        ))}
        <button className="mt-3 mb-2 btn bg-black text-white px-5 py-2 rounded-full m-auto">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Services;
