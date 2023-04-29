import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function Search({getContract}) {
  const router = useRouter();

  // Get the query parameter from the URL
  const { name } = router.query;
  const [record, setRecord] = useState([])
  let fetchAllRecords = async () => {
    let count = await getContract(window).getRecordCount();

    for (let i = 0; i < count; i++) {
      let record = await getContract(window).getRecord(i);
      console.log(record)
        if(record[1]===name){
            setRecord(record[4].toNumber())
        }
        else{
            setRecord(0)
        }
    }

  };
  useEffect(()=>{
    fetchAllRecords()
  }, [name])
  return (
    <div>
      The Search Keyword {name}.
      count of vaccine/ medicine : {record}
    </div>
  );
}

export default Search;