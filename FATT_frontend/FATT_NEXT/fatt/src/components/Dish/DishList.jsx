import DishItemThumbnail from "./DishItemThumbnail";

const DishList = ({ data }) => {
  return (
    <>
      {data?.data.map((dish) => {
        return (
          <div key={dish.id} className="w-1/2 md:w-1/4 mb-4 px-4 md:px-8">
            {" "}
            {<DishItemThumbnail dish={dish} />}
          </div>
        );
      })}
    </>
  );
};

export default DishList;
