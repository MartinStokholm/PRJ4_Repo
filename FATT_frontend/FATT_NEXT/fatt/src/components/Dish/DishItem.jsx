const DishItem = ({ dish }) => {
  return (
    <div className="bg-white max-w-m rounded overflow-hidden shadow-lg content-center h-200">
      <h1 className="bg-green-50"> {dish?.data.name}</h1>

      <img src={dish?.data.picturePath} width="500px" />

      <div>
        <p>Preperation time: {dish?.data.preptime}</p>
        <p>Total Energy (kcal): {dish?.data.nutritionalValue}</p>
        <p>Ingredients: {dish?.data.ingredients}</p>
        <p>Recipe: {dish?.data.recipe}</p>
      </div>
    </div>
  );
};

export default DishItem;
