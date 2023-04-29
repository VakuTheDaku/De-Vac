import '../styles/globals.css'
import getContract from './conn'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} 
  getContract = {getContract}/>
}

export default MyApp
