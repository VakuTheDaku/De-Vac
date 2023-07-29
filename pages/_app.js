import '../styles/globals.css'
import getContract from '../utils/interactions'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} 
  getContract = {getContract}/>
}

export default MyApp
