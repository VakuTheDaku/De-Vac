import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import { useEffect, useMemo, useState } from 'react';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
const Home = ({ getContract }) => {
  const [position, setPosition] = useState({ lat: null, lng: null });
  const libraries = useMemo(() => ['places'], []);
  const [hospital, setHospital] = useState([])
  const router = useRouter()
  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );
  const handleHospitals = async () => {
    var request = {
      location: new google.maps.LatLng(position.lat, position.lng),
      radius: '1000',
      type: ['hospital'],
      key: process.env.GOOGLE_MAPS_API_KEY
    };
    const map = new google.maps.Map(document.getElementById('map'));
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
      const li = []
      results.forEach((result) => {
        console.log(result)
        setHospital(hos => [...hos, result.name])
      })
    })

  }
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  const connectWalletProvider = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        // Wallet not installed
        alert("Get MetaMask!");
        return;
      }

      // Change network to rinkeby
      await ethereum.enable();
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      // await ethereum.request({
      //     method: "wallet_switchEthereumChain",
      //     params: [{ chainId: `0x${Number(5).toString(16)}` }],
      //     // I have used Rinkeby, so switching to network ID 4
      // });
      console.log("Connected", accounts[0]);
      localStorage.setItem("walletAddress", accounts[0]);

      // For debugging
      fetchCurrentValue();
      //
    } catch (error) {
      console.log(error);
    }
  };



  let fetchCurrentValue = async () => {
    // let count_ = await getContract().createRecord(123, 'allergies', 'symptoms', 'diagonosis');
    console.log("window", window.ethereum)
    let count_ = await getContract(window).getRecordCount();
    console.log(count_.toString());
    // setCount(count_.toString());
  };



  let fetchAllRecords = async () => {
    let count = await getContract(window).getRecordCount();

    for (let i = 0; i < count; i++) {
      let record = await getContract(window).getRecord(i);
      console.log(record);
    }

  };
  return (
    <>
      <div className={styles.homeWrapper}>
        <div className={styles.sidebar}>
          <button onClick={async () => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  setPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  });
                },
                (error) => {
                  console.error(error);
                }
              );
            } else {
              console.error('Geolocation is not supported by this browser.');
            }

          }}>My location</button>
          <button onClick={async () => await handleHospitals()}>Hospitals near me</button>
          <div className='grid place-items-center'>
            <button className='btn btn-success' onClick={() => connectWalletProvider()}>
              Connect to Metamask
            </button>
          </div>
        </div>
        {
          hospital.length !== 0 ?
            hospital.map(hos => {
              return (
                <ul style={{width: '100%'}}>
                  <li style={{ text: "yellow" }} onClick={()=>router.push(`/detail/${hos}`)}>name : {hos}</li>
                </ul>
              )
            })
            :
            <GoogleMap
              options={mapOptions}
              zoom={14}
              center={position}
              id='map'
              mapTypeId={google.maps.MapTypeId.ROADMAP}
              mapContainerStyle={{ width: '800px', height: '800px' }}
              onLoad={() => console.log('Map Component Loaded...')}
            >
              <MarkerF position={position} onLoad={() => console.log('Marker Loaded')} />
            </GoogleMap>
        }
      </div>

    </>
  );
};

export default Home;
