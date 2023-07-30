import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import SwiperComponent from '../components/swiperComponent';

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
    if (position.lat === null || position.lng === null) {
      alert("Set your location first")
      return
    }
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
    <div className='w-full h-full'>
      <div className='grid grid-cols-12 w-full'>
        <div className='grid col-span-4 bg-[#23BC86] border-r shadow-lg text-white'>
          <button className='border-white border-b' onClick={async () => {
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

          }}>MY LOCATION</button>
          <button className='border-white border-b' onClick={async () => await handleHospitals()}>HOSPITALS NEAR ME</button>
          <button className='grid gap-4 my-auto mx-auto' onClick={() => connectWalletProvider()}>
            <div className='grid place-items-center'>
              {
                localStorage.getItem('walletAddress') ? localStorage.getItem('walletAddress').slice(0, 10) + '....' + localStorage.getItem('walletAddress').slice(localStorage.getItem('walletAddress').length - 5, localStorage.getItem('walletAddress').length) : 'CONNECT TO METAMASK'
              }
            </div>
            <div className='grid place-items-center w-full'>
              <svg className='flex items-center justify-center' xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 212 189" id="metamask"><g fill="none" fill-rule="evenodd"><polygon fill="#CDBDB2" points="60.75 173.25 88.313 180.563 88.313 171 90.563 168.75 106.313 168.75 106.313 180 106.313 187.875 89.438 187.875 68.625 178.875"></polygon><polygon fill="#CDBDB2" points="105.75 173.25 132.75 180.563 132.75 171 135 168.75 150.75 168.75 150.75 180 150.75 187.875 133.875 187.875 113.063 178.875" transform="matrix(-1 0 0 1 256.5 0)"></polygon><polygon fill="#393939" points="90.563 152.438 88.313 171 91.125 168.75 120.375 168.75 123.75 171 121.5 152.438 117 149.625 94.5 150.188"></polygon><polygon fill="#F89C35" points="75.375 27 88.875 58.5 95.063 150.188 117 150.188 123.75 58.5 136.125 27"></polygon><polygon fill="#F89D35" points="16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813"></polygon><polygon fill="#D87C30" points="46.125 101.25 92.25 102.375 87.188 126 65.25 120.375"></polygon><polygon fill="#EA8D3A" points="46.125 101.813 65.25 119.813 65.25 137.813"></polygon><polygon fill="#F89D35" points="65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375"></polygon><polygon fill="#EB8F35" points="65.25 138.375 60.75 173.25 90.563 152.438"></polygon><polygon fill="#EA8E3A" points="92.25 102.375 95.063 150.188 86.625 125.719"></polygon><polygon fill="#D87C30" points="39.375 138.938 65.25 138.375 60.75 173.25"></polygon><polygon fill="#EB8F35" points="12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75"></polygon><polygon fill="#E8821E" points="88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938"></polygon><polygon fill="#DFCEC3" points="60.75 173.25 90.563 152.438 88.313 170.438 88.313 180.563 68.063 176.625"></polygon><polygon fill="#DFCEC3" points="121.5 173.25 150.75 152.438 148.5 170.438 148.5 180.563 128.25 176.625" transform="matrix(-1 0 0 1 272.25 0)"></polygon><polygon fill="#393939" points="70.313 112.5 64.125 125.438 86.063 119.813" transform="matrix(-1 0 0 1 150.188 0)"></polygon><polygon fill="#E88F35" points="12.375 .563 88.875 58.5 75.938 27"></polygon><path fill="#8E5A30" d="M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z"></path><g transform="matrix(-1 0 0 1 211.5 0)"><polygon fill="#F89D35" points="16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813"></polygon><polygon fill="#D87C30" points="46.125 101.25 92.25 102.375 87.188 126 65.25 120.375"></polygon><polygon fill="#EA8D3A" points="46.125 101.813 65.25 119.813 65.25 137.813"></polygon><polygon fill="#F89D35" points="65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375"></polygon><polygon fill="#EB8F35" points="65.25 138.375 60.75 173.25 90 153"></polygon><polygon fill="#EA8E3A" points="92.25 102.375 95.063 150.188 86.625 125.719"></polygon><polygon fill="#D87C30" points="39.375 138.938 65.25 138.375 60.75 173.25"></polygon><polygon fill="#EB8F35" points="12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75"></polygon><polygon fill="#E8821E" points="88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938"></polygon><polygon fill="#393939" points="70.313 112.5 64.125 125.438 86.063 119.813" transform="matrix(-1 0 0 1 150.188 0)"></polygon><polygon fill="#E88F35" points="12.375 .563 88.875 58.5 75.938 27"></polygon><path fill="#8E5A30" d="M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z"></path></g></g></svg>
            </div>
          </button>
        </div>
        <div className='col-span-8'>
          {
            position.lat && position.lng ?

              hospital.length !== 0 ?
                <div className='w-full h-[100vh] bg-[#10151C] grid gap-4 py-4'>
                  {
                    hospital.map(hos => {
                      return (
                        <li className='text-[#23BC86] gap-4 hover:cursor-pointer mx-auto' onClick={() => router.push(`/detail/${hos}`)}>{hos}</li>
                      )
                    })
                  }
                </div>
                :
                <GoogleMap
                  options={mapOptions}
                  zoom={14}
                  center={position}
                  id='map'
                  mapTypeId={google.maps.MapTypeId.ROADMAP}
                  mapContainerStyle={{ width: '100%', height: '100vh' }}
                  onLoad={() => console.log('Map Component Loaded...')}
                >
                  <MarkerF position={position} onLoad={() => console.log('Marker Loaded')} />
                </GoogleMap>
              :
              <SwiperComponent>
              </SwiperComponent>
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
