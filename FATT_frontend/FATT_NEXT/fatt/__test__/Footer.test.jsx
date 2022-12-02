import { render, screen, fireEvent,waitFor, getByLabelText } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Footer from '../src/components/Layout/Footer'

const queryClient = new QueryClient();

describe('Footer test', () => {
    it('Footer',  () => {
      render(
        <QueryClientProvider client={queryClient}> 
          <Footer />
        </QueryClientProvider>      
      
      )     
      expect(screen.getByText(/About/)).toBeInTheDocument();
      expect(screen.getByText(/Profile/)).toBeInTheDocument();
      expect(screen.getByText(/Settings/)).toBeInTheDocument();
      expect(screen.getByText(/Log-in/)).toBeInTheDocument();
      expect(screen.getByText(/© 2022 All Rights Reserved./)).toBeInTheDocument();
     screen.debug();
    }) })
 