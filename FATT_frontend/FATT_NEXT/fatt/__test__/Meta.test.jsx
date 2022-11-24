import { render , screen} from '@testing-library/react'
import Login from '../src/components/Account/Login'
import react from 'react'
import Meta from '../src/components/Layout/Meta'


/*
it('should first', () => { render(<Login/>)

//const myElement = screen.getByText(/Sign Up/);
screen.debug();
//expect(myElement).toBeInTheDocument();
})*/

describe('Meta', () => {
    it('renders a Meta', () => {
      render(<Meta />)
  
     screen.debug()
    })
  })