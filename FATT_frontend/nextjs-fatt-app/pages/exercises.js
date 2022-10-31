
export const getStaticPosts = async () => {

  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await res.json()

  return { 
    props: { ninjas: data } 
  }

}

const exercises = ( {ninjas} ) => {
  console.log(ninjas)
  return (
    <div>
      <h2>List of exercises</h2>
    </div>
)}
export default exercises