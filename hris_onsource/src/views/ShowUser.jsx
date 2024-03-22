import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';


function ShowUser() {
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });
  return (
    <>
    <div  className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] ">
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 m-5">

    <div ref={contentToPrint} className='w-full' >
      <h1>Hello world! i can print now easy!</h1>
    </div>
    {/* <button onClick={() => {
      handlePrint(null, () => contentToPrint.current);
    }}>
      PRINT
    </button> */}
    </div>
   
    </div> 

    
    </>
  )
}

export default ShowUser