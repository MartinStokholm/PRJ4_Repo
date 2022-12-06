

import { render, screen, fireEvent,waitFor, getByLabelText } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Calender from '../src/components/Calendar/Calender'

const queryClient = new QueryClient();

describe('Calender test debug', () => {
    it('Calender',  () => {
      render(
        <QueryClientProvider client={queryClient}> 
          <Calender />
        </QueryClientProvider>      
      
      )
     screen.debug();
    }) })

    describe('Calender ', () => {
        it('renders Calender component', () => {
          render(
            <QueryClientProvider client={queryClient}> 
              <Calender />
            </QueryClientProvider>
                
          )
    
          const myCalender = screen.getByText(/Monday/);
          expect(myCalender).toBeInTheDocument();
            
        })
        
      })