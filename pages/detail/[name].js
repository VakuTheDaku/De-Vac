import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function Search({ getContract }) {
  const router = useRouter();

  // Get the query parameter from the URL
  const { name } = router.query;
  const [record, setRecord] = useState([])
  const [vaccine, setVaccine] = useState()
  let fetchAllRecords = async () => {
    let count = await getContract(window).getRecordCount();

    for (let i = 0; i < count; i++) {
      let record = await getContract(window).getRecord(i);
      console.log("record", record)
      if (record[1] === name) {
        setRecord(record[4].toNumber())
        setVaccine(record[3])
      }
      else {
        setRecord(null)
      }
    }

  };
  useEffect(() => {
    fetchAllRecords()
  }, [name])
  return (
    <div className='w-full h-full'>
      <div className='grid grid-cols-12 w-full'>
        <div className='grid col-span-4 bg-[#23BC86] border-r shadow-lg text-white'>
          <div className='h-[100vh] grid place-items-center bg-[#10151C]'>
            <div className='grid'>
              <div className='font-uppercase font-bold'>
                {name}
              </div>
              {
                record === null ?
                  <div className='flex items-center justify-center text-red-800'>
                    No records found
                  </div>
                  :
                  <div>
                    <div>
                      Vaccine - <div className='text-[#23BC86]'>{vaccine}</div>
                    </div>
                    <div>count of vaccine/ medicine : <div className='text-[#23BC86]'>{record}</div></div>
                  </div>
              }

            </div>
          </div>
        </div>
        <div className='col-span-8 grid place-items-center h-[100vh]'>
          <div className='w-[400px] h-[400px] absolute bg-opacity-40 rounded-full bg-[#B2F4D3]'>
          </div>
          <div className='text-[96px] font-bold'>
            DE-VAC
          </div>
        </div>
      </div>
    </div>

  );
}

export default Search;
