


import { render, screen, fireEvent,waitFor, getByLabelText } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Login from '../src/components/Account/Login'

const queryClient = new QueryClient();

describe('Login test debug', () => {
    it('renders a heading', async () => {
      render(
        <QueryClientProvider client={queryClient}> 
          <Login />
        </QueryClientProvider>

       
      
      )
     screen.debug();
    })
    
  })
  describe('Login test display Email and Password ', () => {
    it('Email and Password', async () => {
      render(
        <QueryClientProvider client={queryClient}> 
          <Login />
        </QueryClientProvider>
            
      )

      const myPassword = screen.getByText(/Password/);
      expect(myPassword).toBeInTheDocument();
      const myEmail = screen.getByText(/Email/);
      expect(myEmail).toBeInTheDocument();

    })
    
  })
  describe('value for Email and Password by ID ', () => {
    it('Email and Password', async () => {
      render(
        <QueryClientProvider client={queryClient}> 
          <Login />
        </QueryClientProvider>
            
      )

    
      screen.getByTestId("Email")
      screen.getByTestId("Password")
  //await waitFor(()=> fireEvent.change(screen.getByRole("button")))
     //fireEvent.change(getByLabelText(/Password/i),{target: {value:'a'}})
     //screen.getByRole('button')
    })
    
  })