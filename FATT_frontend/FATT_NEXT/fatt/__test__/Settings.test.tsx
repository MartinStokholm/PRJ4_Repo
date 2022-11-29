import { render, screen, fireEvent,waitFor, getByLabelText } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Settings from '../src/components/Account/Settings'
const queryClient = new QueryClient();

describe('Settings test debug', () => {
    it('Debug',  () => {
      render(
        <QueryClientProvider client={queryClient}> 
          <Settings />
        </QueryClientProvider>    
      )
     screen.debug();
    })
})
describe('test set new email ', () => {
    it(' Email',  () => {
      render(
        <QueryClientProvider client={queryClient}> 
          <Settings />
        </QueryClientProvider>
            
      )  
    const newEmail = screen.getByPlaceholderText(/New email/i);
    fireEvent.change(newEmail,{target: {value:"mar@gmail.com"}})
  expect(newEmail.value).toBe("mar@gmail.com");
    
    })  })

    describe('test set new Password ', () => {
        it(' Password',  () => {
          render(
            <QueryClientProvider client={queryClient}> 
              <Settings />
            </QueryClientProvider>
                
          )            

        const newPassword = screen.getByPlaceholderText(/New Password/i);
        fireEvent.change(newPassword,{target: {value:"klasd5666"}})
      expect(newPassword.value).toBe("klasd5666");
        
        })  })


