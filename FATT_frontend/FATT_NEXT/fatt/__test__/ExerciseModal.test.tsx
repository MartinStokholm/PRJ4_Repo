

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
          const inputPicturePath = screen.getByPlaceholderText(/PicturePath/i);
          fireEvent.change(inputPicturePath,{target: {value:"https://www.verywellfit.com/thmb/dAjxGFh3F4U4uiakraA1wTYn26M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-157284836-56da7e615f9b5854a9df3c28.jpg"}})
        expect(inputPicturePath.value).toBe("https://www.verywellfit.com/thmb/dAjxGFh3F4U4uiakraA1wTYn26M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-157284836-56da7e615f9b5854a9df3c28.jpg");

            const inputVideoPath = screen.getByPlaceholderText(/VideoPath/i);
            fireEvent.change(inputVideoPath,{target: {value:"https://www.youtube.com/watch?v=oHWY59O9KKM&ab_channel=FitnessWorld"}})
            expect(inputVideoPath.value).toBe("https://www.youtube.com/watch?v=oHWY59O9KKM&ab_channel=FitnessWorld");
            })  })
    