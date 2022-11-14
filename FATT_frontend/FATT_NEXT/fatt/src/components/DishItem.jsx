const DishItem = ({ dish }) => {
  return (
    <div className="bg-white max-w-m rounded overflow-hidden shadow-lg content-center h-200">
      <h1 className="bg-green-50"> {dish?.data.name}</h1>
      <h2>Category: {dish?.data.category}</h2>

      <img src={dish?.data.picturePath} width="500px" />

      <div>
        <p>Total Energy (kcal): {dish?.data.nutritionalValue}</p>
        <p>Recipe: {dish?.data.recipe}</p>
        <p>Ingredients: {dish?.data.ingredients}</p>
      </div>
    </div>
  );
};

export default DishItem;
