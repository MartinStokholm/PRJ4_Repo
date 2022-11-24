import { render, screen } from '@testing-library/react'

import Nav from '../src/components/Layout/Nav'


describe('Nav', () => {
  it('renders a heading', () => {
    render(<Nav />)

   //screen.debug()
   const myel = screen.getByText(/Dishes/);
   expect(myel).toBeInTheDocument();
  })
})