import { render, screen, fireEvent,waitFor } from '@testing-library/react'
import Login from '../src/components/Account/Login'



describe('Nav', () => {
    it('renders a heading', async () => {
      render(<Login />)
  await waitFor(()=> fireEvent.change(screen.getByRole("button")))
    })
  })