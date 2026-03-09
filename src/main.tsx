import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import './index.css'
import App from './App.tsx'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading: 'Poppins, Manrope, Segoe UI, sans-serif',
    body: 'Poppins, Manrope, Segoe UI, sans-serif',
  },
  colors: {
    gold: {
      50: '#fef9e7',
      100: '#fdf0c4',
      200: '#fbe89d',
      300: '#f9df76',
      400: '#f7d750',
      500: '#f0b20f',
      600: '#b98405',
      700: '#9f7304',
      800: '#856203',
      900: '#6b5002',
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </StrictMode>,
)
