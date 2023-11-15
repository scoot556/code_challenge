import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const Header = ({ onRaceNumberChange, raceNumber, ...data }:any) => {
    const [lightboxDisplay, setLightboxDisplay] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedRaceNumber, setSelectedRaceNumber] = useState(raceNumber);
    const date = new Date(data?.data?.raceCollection?.[raceNumber]?.dateUTC);

    const day = date.getUTCDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    const formattedDate = `${day} ${month} ${year}`;

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12;


    const formattedTime = `${hours}:${minutes} ${ampm}`;

    const showLightbox = () => {
        setLightboxDisplay(true);
    }

    const hideLightbox = () => {
        setLightboxDisplay(false);
    }

    const handleRaceChange = (e:any) => {
        e.preventDefault();
        setShowDropdown(false);
        onRaceNumberChange(e.target.value);
        setSelectedRaceNumber(e.target.value);
    }

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }


    console.log(data);
    return (
        <div>
            <div className="flex flex-row justify-between w-full bg-gray-950/80 h-24 p-4">
                {showDropdown ? (
                        <select onChange={handleRaceChange} className="bg-white w-10 h-10 rounded-full flex justify-center align-middle items-center mt-2 mb-2" value={selectedRaceNumber}>
                            {/* <option defaultValue={0}></option> */}
                            {data.data.raceCollection.map((num:any) => {
                                return (
                                    <option key={num.raceNumber} value={num.raceNumber-1}>{num.raceNumber}</option>
                                )
                            })}
                        </select>
                    ): (
                        <button className="bg-white w-10 h-10 rounded-full flex justify-center align-middle items-center mt-2 mb-2" onClick={toggleDropdown}>
                            <span className="text-xl">
                                {data?.data?.raceCollection?.[raceNumber]?.raceNumber}
                            </span>
                        </button>
                    )}
                <div className="flex flex-col h-full">
                    <div>
                    <span className="text-2xl text-white">
                            {data?.data?.meet?.trackName}
                    </span>
                    <span className="text-gray-300 px-2">
                            |
                    </span>
                    <span className="text-gray-300">
                            {formattedDate}
                    </span>
                    </div>
                    <div className="text-white">
                        <span className="pr-2">{formattedTime}</span>
                        <span className="pr-2">{data?.data?.raceCollection?.[raceNumber]?.distance}m</span>
                        <span className="pr-2">{data?.data?.raceCollection?.[raceNumber]?.name}</span>
                    </div>                
                </div>
                <div className="text-white flex flex-col h-full text-end pr-4 pt-1">
                    <span>
                        Track Condition
                    </span>
                    <span>
                        Good 3
                    </span>
                </div>
            </div>
            <div className="relative w-full h-full hover:cursor-pointer" style={{ height: '40vh' }} onClick={showLightbox}>
                    <Search className="text-white absolute bottom-2 left-[1rem] z-10" size="2rem"/>
                    <Image 
                        src="https://s3-ap-southeast-2.amazonaws.com/racevic.static/2017-01-01/flemington/photofinishes/race-2.jpg" 
                        alt="race image" 
                        className="w-full object-cover"
                        fill={true}
                        priority={true}
                    ></Image>
            </div>
            { lightboxDisplay ? (
                <div onClick={hideLightbox} className="fixed top-0 left-0 z-10 flex items-center w-[100%] justify-center align-middle bg-white bg-opacity-50 h-[100%]">
                    <Image 
                        src="https://s3-ap-southeast-2.amazonaws.com/racevic.static/2017-01-01/flemington/photofinishes/race-2.jpg" 
                        alt="race image" 
                        className="object-contain px-6"
                        fill={true}
                        priority={true}
                    ></Image>
                </div>
            ): ''}            
        </div>
    )
}