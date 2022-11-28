import { render, screen, fireEvent,waitFor, getByLabelText } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import CreateWorkoutModal from '../src/components/Workout/CreateWorkoutModal'
const queryClient = new QueryClient();
const mockedSetDurantion = jest.fn();
describe('CreateWorkoutModal test debug', () => {
    it('Debug',  () => {
      render(
        <QueryClientProvider client={queryClient}> 
          <CreateWorkoutModal />
        </QueryClientProvider>    
      )
     screen.debug();
    })
})

describe('Test for create new Workout, duration  ', () => {
  it(' Workout',  () => {
    render(
      <QueryClientProvider client={queryClient}> 
        <CreateWorkoutModal />
      </QueryClientProvider>
          
    )  
    const inputDuration = screen.getByPlaceholderText(/Duration/i);
    fireEvent.change(inputDuration,{target: {value:"10"}})
  expect(inputDuration.value).toBe("10");
  
  const inputWorkout = screen.getByPlaceholderText(/Workout Name/i);
  fireEvent.change(inputWorkout,{target: {value:"Ninja"}})
  expect(inputWorkout.value).toBe("Ninja");
  })  })

  describe('CreateWorkoutModal test button', () => {
    it('Debug',  () => {
      render(
        <QueryClientProvider client={queryClient}> 
          <CreateWorkoutModal />
        </QueryClientProvider>

       

      )
     screen.debug();
     const buttenW= screen.getByRole("button");
     expect(buttenW).toBeInTheDocument();
    })
})
describe('Button should be not disabled', () => {
  it('Debug',  () => {
    render(
      <QueryClientProvider client={queryClient}> 
        <CreateWorkoutModal />
      </QueryClientProvider>
    
    )
   screen.debug();
   const buttenW= screen.getByRole("button");
   expect(buttenW).not.toBeDisabled();
  })
})