

import { render, screen, fireEvent,waitFor, getByLabelText } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import ExerciseModal from '../src/components/Exercise/ExerciseModal'

const queryClient = new QueryClient();

describe('ExerciseModal test debug', () => {
    it('ExerciseModal',  () => {
      render(
        <QueryClientProvider client={queryClient}> 
          <ExerciseModal />
        </QueryClientProvider>      
      
      )
     
      expect(screen.getByText(/Create exercise/)).toBeInTheDocument();
      


     screen.debug();
    }) })
 
    describe('ExerciseModal test button', () => {
        it('ExerciseModal',  () => {
          render(
            <QueryClientProvider client={queryClient}> 
              <ExerciseModal />
            </QueryClientProvider>
    
           
    
          )
         //screen.debug();
         const buttenW= screen.getByRole("button");
         expect(buttenW).toBeInTheDocument();
        })
    })
    describe('Button should be not disabled', () => {
        it('Debug',  () => {
          render(
            <QueryClientProvider client={queryClient}> 
              <ExerciseModal />
            </QueryClientProvider>
          
          )
         //screen.debug();
         const buttenW= screen.getByRole("button");
         expect(buttenW).not.toBeDisabled();
        })
    })
        describe('Test for add new Category, VideoPath  ', () => {
            it(' ExerciseModal',  () => {
              render(
                <QueryClientProvider client={queryClient}> 
                  <ExerciseModal />
                </QueryClientProvider>
                    
              )  
              const inputCategory = screen.getByPlaceholderText(/Category/i);
              fireEvent.change(inputCategory,{target: {value:"Endurance"}})
            expect(inputCategory.value).toBe("Endurance");
            
            const inputVideoPath = screen.getByPlaceholderText(/VideoPath/i);
            fireEvent.change(inputVideoPath,{target: {value:"https://www.youtube.com/watch?v=oHWY59O9KKM&ab_channel=FitnessWorld"}})
            expect(inputVideoPath.value).toBe("https://www.youtube.com/watch?v=oHWY59O9KKM&ab_channel=FitnessWorld");
            })  })
    