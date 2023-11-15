'use client'
import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { ResultTable } from "./components/ResultTable";
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [raceData, setRaceData] = useState<null|{Races: any}>(null);
  const [isError, setIsError] = useState(false);
  const [raceNumber, setRaceNumber] = useState(1);

  const fetchRaceData = async() => {
    setIsError(false)
    fetch('https://s3-ap-southeast-2.amazonaws.com/racevic.test-static/fe-test/racing-data-sample-v1.json')
    .then(response => response.json())
    .then(data => setRaceData(data))
    .catch(error => {
      console.log(error)
      setIsError(true)
  })
  }

  useEffect(() => {
    fetchRaceData()
    // setTimeout(() => {
    //   setIsError(true)
    // }, 5000)
  }, [])

  const retryFetch = () => {
    fetchRaceData()
  }

  const handleRaceNumberChange = (newRaceNumber:number) => {
    setRaceNumber(newRaceNumber);
  }

  return (
    <main className="flex min-h-screen">
      {raceData ? (
        <div className="w-full">
            <Header data={raceData?.Races?.[0]} onRaceNumberChange={handleRaceNumberChange} raceNumber={raceNumber}/>
            <ResultTable data={raceData?.Races?.[0]?.raceCollection?.[raceNumber]}/>
        </div>
      ):(
        isError ? (
          <div className="flex min-h-screen m-auto align-middle items-center flex-col justify-center">
            <span className="text-2xl text-red-500">Error loading data</span>
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full" onClick={retryFetch}>
              Retry
            </button>
          </div>
        ):(
          <div className="flex min-h-screen m-auto align-middle items-center">
            <Loader2 className="animate-spin text-gray-500" size={100}/>
          </div>
        )
      )}
      
    </main>
  )
}
