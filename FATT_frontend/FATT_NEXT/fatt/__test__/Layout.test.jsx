import { render, screen, fireEvent,waitFor, getByLabelText } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Layout from '../src/components/Layout/Layout'

const queryClient = new QueryClient();

describe('Layout test', () => {
    it('Layout',  () => {
      render(
        <QueryClientProvider client={queryClient}> 
          <Layout />
        </QueryClientProvider>      
      
      )     
      screen.debug();
    }) })
 