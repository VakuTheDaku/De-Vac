import '../styles/globals.css'
import getContract from '../utils/interactions'
import { ChakraProvider } from '@chakra-ui/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} getContract = {getContract}/>
    </ChakraProvider>
  )
}

export default MyApp;
