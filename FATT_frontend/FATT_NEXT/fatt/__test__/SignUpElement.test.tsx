import { render, screen, fireEvent,waitFor, getByLabelText } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import SignUp from '../src/components/Account/SignUp'
const queryClient = new QueryClient();

describe('Login test debug', () => {
    it('renders a heading', async () => {
      render(
        <QueryClientProvider client={queryClient}> 
          <SignUp />
        </QueryClientProvider>     
            )
     screen.debug();
    })
})

describe('Test change for Name Sign Up', () => {
    it(' Name',  () => {
      render(
        <QueryClientProvider client={queryClient}> 
          <SignUp />
        </QueryClientProvider>
            
      )

   
     fireEvent.change(screen.getByTestId("text"),{target: {value:'Mette'}})
    expect(screen.getByTestId("text")).toHaveAttribute('value','Mette')
    
    })
    
  })

  describe('test change for Password Sign Up', () => {
    it(' Password',  () => {
      render(
        <QueryClientProvider client={queryClient}> 
          <SignUp />
        </QueryClientProvider>
            
      )

   
     fireEvent.change(screen.getByTestId("Password"),{target: {value:'klasd5666'}})
    expect(screen.getByTestId("Password")).toHaveAttribute('value','klasd5666')
    
    })
    
  })


  describe('Test change for Email Sign Up ', () => {
    it(' Email',  () => {
      render(
        <QueryClientProvider client={queryClient}> 
          <SignUp />
        </QueryClientProvider>
            
      )

   
     fireEvent.change(screen.getByTestId("Email"),{target: {value:'maher@gmail.com'}})
    expect(screen.getByTestId("Email")).toHaveAttribute('value','maher@gmail.com')
    
    })
    
  })

  describe('value for Name ,Email , Password by ID ', () => {
    it('Name, Email , Password', async () => {
      render(
        <QueryClientProvider client={queryClient}> 
          <SignUp />
        </QueryClientProvider>
                 )

    screen.debug();
      screen.getByTestId("Email")
      screen.getByTestId("Password")
      screen.getByTestId("text")

    })
    
  })
