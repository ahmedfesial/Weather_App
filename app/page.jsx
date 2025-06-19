'use client'
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";



export default function Home() {

  const apiKey = '3fca7c09597e4b8192353547251806'

  const [getData, setGetData] = useState('')


  function getWeatherData(value){
     let city = value.query
     axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`)
     .then((response)=>{
      setGetData(response.data)
      console.log(response.data);
     })
     .catch((error)=>{
      toast.error(error.response.data.error.message)
     })
  }


    let formik = useFormik({
      initialValues:{
        query : ''
      },
      onSubmit: getWeatherData
    })



  return <>
  {/* Form  */}
   <form onSubmit={formik.handleSubmit}>
    <div>
      <div className="text-center mt-26">
        <h1 className="font-bold text-6xl">تعرف على الطقس الان</h1>
        <h3 className="text-3xl font-light my-5">ابحث عن حالة الطقس لاى مدينة فى العالم</h3>
        <div>
            <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} name="query" value={formik.values.query} className="border-1 w-md rounded-md p-3 focus:outline-none" placeholder="ادخل اسم المدينة"/>
            <button style={{backgroundColor:'rgba(83, 83, 216, 0.942)'}} className="border-1 py-3 px-4 rounded-md ms-2  text-white font-bold cursor-pointer hover:bg-blue-700! focus:border-blue-500">Search</button>
        </div>
      </div>
    </div>
  </form>

          {/*Show Data  */}
            {getData? <>
            <div key={getData?.location.tz_id}>
              <div className="flex flex-wrap flex-col justify-between w-70 mx-auto items-center  rounded-xl border-1 mt-7 p-5">
                  <h1 className="font-bold text-5xl mb-3">{getData?.location.name}</h1>
                <div className="flex flex-wrap justify-around w-50 mx-auto items-center">
                  <h1 className="text-5xl font-bold">{getData?.current.temp_c}°</h1>
                  <img src={getData?.current?.condition.icon}  alt="icon" />
                  <div>
                    <span className="ms-32 font-semibold">{getData?.current.condition.text}</span>
                  </div>
                </div>    
                <div className="flex flex-wrap justify-between w-40 mx-auto items-center mt-3 text-2xl font-bold">
                    <h1>{getData?.current.feelslike_c}</h1>
                    <h1>المموس</h1>
                </div>            
                <div className="flex flex-wrap justify-between w-40 mx-auto items-center my-5 text-2xl font-bold">
                    <h1>%{getData?.current.humidity}</h1>
                    <h1>الرطوبة</h1>
                </div>            
                <div className="flex flex-wrap justify-between w-40 mx-auto items-center text-2xl font-bold">
                    <h1>{getData?.current.wind_kph}</h1>
                    <h1>الرياح</h1>
                </div>            
                <h1 className="mt-3 font-semibold">{getData?.current.last_updated}</h1>
              </div>
            </div>
          </> : ''}  
  </>
}
