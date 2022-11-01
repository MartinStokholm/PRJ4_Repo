
export const getStaticProps = async () => {

  const res = await fetch('https://localhost:7257/api/Exercise/Full')
  const data = await res.json()

  return { 
    props: { exercises: data } 
  }

}
const Exercises = ({ exercises }) => {
  console.log(exercises)

  return (
    
    <div>
    
      <h1>All Exercises</h1>
      
      
      </div>
    
  );
}

export default Exercises