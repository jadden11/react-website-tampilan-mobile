import Card from "./Card";

const Recommended = () => {
  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-poppins font-semibold text-center pb-8 underline text-pink-700">
        Recommended
      </h2>
      <div className="overflow-x-auto flex gap-4 snap-x snap-mandatory px-4">
        <div className="min-w-[300px] snap-center">
          <Card />
        </div>
      </div>
    </div>
  );
};

export default Recommended;
