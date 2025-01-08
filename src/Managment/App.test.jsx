import { render, screen } from '@testing-library/react'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.jsx'

describe('App', () => {
  it('renders the App component', () => {
    render(    
      <BrowserRouter>
        <App />
        <AppRoutes/>
      </BrowserRouter>
  )
    
    // screen.debug(); // prints out the jsx in the App component unto the command line
  })
})