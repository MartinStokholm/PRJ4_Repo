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
     fireEvent.change(screen.getByTestId("newEmail"),{target: {value:'mar@gmail.com'}})
    expect(screen.getByTestId("newEmail")).toHaveAttribute('value','mar@gmail.com')
    
    })  })

    describe('test set new Password ', () => {
        it(' Password',  () => {
          render(
            <QueryClientProvider client={queryClient}> 
              <Settings />
            </QueryClientProvider>
                
          )
    
       
         fireEvent.change(screen.getByTestId("newPassword"),{target: {value:'klasd5666'}})
        expect(screen.getByTestId("newPassword")).toHaveAttribute('value','klasd5666')
        
        })  })
describe('value for newEmail ,newPassword by ID ', () => {
    it('Name, Email , Password',  () => {
      render(
        <QueryClientProvider client={queryClient}> 
          <Settings />
        </QueryClientProvider>
            
      )

   // screen.debug();
     
      screen.getByTestId("newPassword")
      screen.getByTestId("newEmail")

    })

})

describe('value for Name ,Email , Password by ID ', () => {
    it('Name, Email , Password',  () => {
      render(
        <QueryClientProvider client={queryClient}> 
          <Settings />
        </QueryClientProvider>
            
      )

    screen.debug();
      screen.getByTestId("email")
      screen.getByTestId("password")
    //  screen.getByTestId("newEmail")

    })

})

