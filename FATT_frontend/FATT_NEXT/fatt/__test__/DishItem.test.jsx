import { render, screen, fireEvent,waitFor, getByLabelText } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import DishItem from '../src/components/Dish/DishItem'

const queryClient = new QueryClient();

describe('DishItem test debug', () => {
    it('DishItem',  () => {
      render(
        <QueryClientProvider client={queryClient}> 
          <DishItem />
        </QueryClientProvider>      
      
      )
     
     expect(screen.queryByText(/Preperation time: 20/)).toBeNull();
     expect(screen.queryByText(/Total Energy 398 kcal/)).toBeNull();



     screen.debug();
    }) })