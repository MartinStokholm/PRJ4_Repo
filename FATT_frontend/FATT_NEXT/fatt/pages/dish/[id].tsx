import { useRouter } from "next/router";
import { useDishData } from "../../src/hooks/useDishData";
import DishItem from "../../src/components/DishItem";
import LoadingSpinner from "../../src/components/LoadingSpinner";
import Error from "next/error";

const onSuccess = (data) => {
  console.log("Perform side effect after data fetching", data);
};

const onError = (error) => {
  console.log(`Perform side effect after encountered error\n ${error}`);
};

export default function DishPage() {
  // Get id from route
  const router = useRouter();
  const query = router.query;
  const id = parseInt(router.query.id as string, 10);
  console.log(router);
  console.log(id);

  // Get dish
  const { isLoading, data, isError, error } = useDishData(
    id,
    onSuccess,
    onError
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <>
        <Error statusCode={error.message} />
      </>
    );
  }

  return <DishItem dish={data} />;
}
