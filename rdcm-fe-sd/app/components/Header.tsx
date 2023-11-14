export const Header = (data :any) => {
    const date = new Date(data?.data?.raceCollection?.[1]?.dateUTC);

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


    console.log(data);
    return (
        <div className="flex flex-row justify-between w-full bg-slate-500/80 h-24 p-4">
            <div className="bg-white w-10 h-10 rounded-full flex justify-center align-middle items-center mt-2 mb-2">
                <span className="text-xl">
                    {data?.data?.raceCollection?.[1]?.raceNumber}
                </span>
            </div>
            <div className="flex flex-col h-full">
                <div>
                   <span className="text-xl">
                          {data?.data?.meet?.trackName}
                   </span>
                   <span className="text-slate-300">
                         |{formattedDate}
                   </span>
                </div>
                <div className="text-white">
                    <span className="pr-2">{formattedTime}</span>
   
                    <span className="pr-2">{data?.data?.raceCollection?.[1]?.distance}m</span>

                    <span className="pr-2">{data?.data?.raceCollection?.[1]?.name}</span>
                </div>
                {/* Track Name */}
               
            </div>
            <div className="text-white flex flex-col h-full">
                <span>
                    Track Condition
                </span>
                <span>
                    Good 3
                </span>
            </div>
        </div>
    )
}