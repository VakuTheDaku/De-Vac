import { useState } from "react";

export default function Add({ getContract }) {
    const [state, setState] = useState()
    function handleChange(evt) {

        const value = evt.target.value;

        setState({
            ...state,
            [evt.target.name]: value
        });
    }
    async function createRecord() {
        console.log(state)
        await getContract(window).createRecord(String(state.org), state.patient, state.medicine, parseInt(state.count))

    }
    return (
        <>
            <div className="min-h-screen bg-[#2AAE7F]">
                <div className='absolute -z-10 opacity-20 w-screen col-span-8 grid place-items-center h-[100vh]'>
                    <div className='w-[400px] h-[400px] absolute bg-opacity-40 rounded-full bg-[#B2F4D3]'>
                    </div>
                    <div className='text-[96px] font-bold'>
                        DE-VAC
                    </div>
                </div>
                <div className="p-10 z-10 bg-transparent">
                    <div className="shadow-lg bg-black bg-opacity-25 pt-10 rounded-md p-10">
                        <div className="grid place-items-center ">
                            <div className=" text-white px-5 py-3 mb-3 glass rounded-md"  >
                                ADD RECORD
                            </div>
                        </div>
                        <div >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <div className="grid place-items-center gap-3">
                                    <div className="">
                                        <span className="text-xsm w-1/3"><h4>Org name :</h4></span>
                                        <input required type={"text"} className="bg-black bg-opacity-25 input w-full text-white" name="org" onChange={handleChange} />
                                    </div>
                                </div>
                                <div>
                                    <div className="">
                                        <span className="text-xsm w-1/3"><h4>Pub key of authorized person :</h4></span>
                                        <input required type={"text"} className="bg-black bg-opacity-25 input w-full text-white" name="patient" onChange={handleChange} />
                                    </div>
                                </div>
                                <div>
                                    <div className="">
                                        <span className="text-xsm w-1/3"><h4>Vaccine name : </h4></span>
                                        <input required type={"text"} className="bg-black bg-opacity-25 input w-full text-white" name="medicine" onChange={handleChange} />
                                    </div>
                                </div>
                                <div>
                                    <div className="">
                                        <span className="text-xsm w-1/3"><h4>Count :</h4></span>
                                        <input required type={"number"} className="bg-black bg-opacity-25 input w-full text-white" name="count" onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-center mt-4" style={{ marginTop: '60px' }}>
                                <button className="btn glass bg-[#23BC86] w-20 rounded-full h-10 text-white font-uppercase" onClick={() => createRecord()}>
                                    <h3>Add</h3>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}