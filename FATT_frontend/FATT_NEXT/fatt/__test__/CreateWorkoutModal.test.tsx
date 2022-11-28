import { render, screen, fireEvent,waitFor, getByLabelText } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import CreateWorkoutModal from '../src/components/Workout/CreateWorkoutModal'
const queryClient = new QueryClient();
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
   fireEvent.change(screen.getByTestId("workoutName"),{target: {value:'Ninja'}})
  expect(screen.getByTestId("workoutName")).toHaveAttribute('value','Ninja')
  fireEvent.change(screen.getByTestId("duration"),{target: {value:'10'}})
  expect(screen.getByTestId("duration")).toHaveAttribute('value','10')
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