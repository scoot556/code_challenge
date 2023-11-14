'use client'
import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { ResultTable } from "./components/ResultTable";
import Image from "next/image";

export default function Home() {
  const [raceData, setRaceData] = useState<null|{Races: any}>(null);

  useEffect(() => {
    fetch('https://s3-ap-southeast-2.amazonaws.com/racevic.test-static/fe-test/racing-data-sample-v1.json')
    .then(response => response.json())
    .then(data => setRaceData(data))
    .catch(error => console.log(error))
    
  }, [])

  console.log("RACE DATA",raceData)

  return (
    <main className="flex min-h-screen">
      {raceData ? (
        <div className="w-full">
            <Header data={raceData?.Races?.[0]}/>
            <img src="https://s3-ap-southeast-2.amazonaws.com/racevic.static/2017-01-01/flemington/photofinishes/race-2.jpg" alt="race image" className="w-full"></img>
            <ResultTable data={raceData?.Races?.[0]?.raceCollection?.[1]}/>
        </div>
      ):(
        <div>loading</div>
      )}
     
    </main>
  )
}
