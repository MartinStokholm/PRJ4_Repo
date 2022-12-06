


import { render, screen, fireEvent,waitFor, getByLabelText } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Login from '../src/components/Account/Login'

const queryClient = new QueryClient();

describe('Login test debug', () => {
    it('renders a heading', () => {
      render(
        <QueryClientProvider client={queryClient}> 
          <Login />
        </QueryClientProvider>
      )
     screen.debug();
    })
    
  })
  describe('Login test display Email and Password ', () => {
    it('Email and Password', () => {
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
    it('Email and Password', () => {
      render(
        <QueryClientProvider client={queryClient}> 
          <Login />
        </QueryClientProvider>
            
      )

    screen.debug();
      screen.getByTestId("Email")
      screen.getByTestId("Password")

    })
    
  })

  describe('test change for Email ', () => {
    it('Email and Password',  () => {
      render(
        <QueryClientProvider client={queryClient}> 
          <Login />
        </QueryClientProvider>
            
      )

   
     fireEvent.change(screen.getByTestId("Email"),{target: {value:'naer@gmail.com'}})
     expect(screen.getByTestId("Email")).toHaveAttribute('value','naer@gmail.com')
    
    })
    
  })

  describe('test change for Password ', () => {
    it(' Password',  () => {
      render(
        <QueryClientProvider client={queryClient}> 
          <Login />
        </QueryClientProvider>
            
      )

   
     fireEvent.change(screen.getByTestId("Password"),{target: {value:'klasd5666'}})
    expect(screen.getByTestId("Password")).toHaveAttribute('value','klasd5666')
    
    })
    
  })