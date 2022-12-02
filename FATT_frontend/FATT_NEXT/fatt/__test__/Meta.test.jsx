import { render , screen} from '@testing-library/react'
import Login from '../src/components/Account/Login'
import react from 'react'
import Meta from '../src/components/Layout/Meta'

describe('Meta', () => {
    it('renders a Meta', () => {
      render(<Meta />)  
     screen.debug()
    })
  })