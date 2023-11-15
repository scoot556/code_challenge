import { ArrowRightCircle } from 'lucide-react';
import Image from 'next/image';

export const ResultTable = (data: any) => {
    return (
        <table className="table-auto w-full">
            <thead>
                <tr className="bg-slate-100/60 text-gray-500 text-center">
                    <td className="p-4">
                        Win/Place
                    </td>
                    <td className="p-4" colSpan={2}/>
                    <td className="p-4">
                        Margin
                    </td>
                    <td className="p-4">
                        SP
                    </td>
                    <td className="p-4">
                        VIC
                    </td>
                </tr>
            </thead>
            <tbody>
                {data?.data?.raceResultsCollection?.slice(0,3).map((result: any) => {
                    let posSuffix;
                    switch(result?.position) {
                        case 1:
                            posSuffix = "st";
                            break;
                        case 2:
                            posSuffix = "nd";
                            break;
                        case 3:
                            posSuffix = "rd";
                            break;
                        default:
                            posSuffix = "th";
                            break;
                    }

                    let totalHundredths = result?.winningTime;
                    let minutes = Math.floor((totalHundredths % 360000) / 6000);
                    let seconds = Math.floor((totalHundredths % 6000) / 100);
                    let milliseconds = totalHundredths % 100;

                    let winningTimeFormatted = `${minutes.toString()}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;

                    return (
                    <tr key={result.horse.code} className="border-b text-center">
                        <td className="p-2 text-xl px-6 text-gray-500">
                           {result?.position}{posSuffix}
                        </td>
                        <td className="p-2">
                            <Image 
                                src={`https:${result?.horse?.silkUrl}`}
                                width={40}
                                height={40}
                                alt='horse silk image'
                            ></Image>
                        </td>
                        <td className="p-2 text-start">
                            <p className="font-bold">
                                {result?.raceEntryNumber}. <a href="https://www.racing.com/horses" rel="noreferrer" target="_blank">{result?.horse?.fullName}</a> ({result?.barrierNumber})
                            </p>
                            <p>
                                T: <a href="https://www.racing.com/horses" rel="noreferrer" target="_blank"><span className="text-gray-400">{result?.trainer?.shortName}</span></a> J: <a href="https://www.racing.com/jockeys" rel="noreferrer" target="_blank"><span className="text-gray-400">{result?.jockey?.shortName}</span></a>
                            </p>                            
                        </td>
                        <td className="p-2">
                            {result?.position === 1 ? winningTimeFormatted : result?.margin}
                        </td>
                        <td className="p-2">
                            {result?.odds.priceStart}
                        </td>
                        <td className="p-2">
                        {result?.position === 1 ? (
                            result?.odds?.parimutuel && (
                                <p>
                                        ${parseFloat(result?.odds?.parimutuel?.returnWin).toFixed(2)}
                                </p>
                            )):(
                                <p className="text-gray-400 pl-4">
                                    {"-"}
                                </p>
                            )}
                            {result?.odds?.parimutuel ? (
                                <p>
                                        ${parseFloat(result?.odds?.parimutuel?.returnPlace).toFixed(2)}
                                </p>
                            ):(
                                <p className="text-gray-400 pl-4">
                                    {"-"}
                                </p>
                            )}
                        </td>
                    </tr>
                )})}
            </tbody>
            <tfoot>
                <tr>
                    <td className='text-gray-400 w-full relative' colSpan={6}>
                        <div className='absolute inset-y-0 right-0 sm:right-[1rem] md:right-[1rem] lg:right-[1rem] xl:right-[3rem]'>
                            <div className='flex gap-1'>
                                <a href="https://www.racing.com" rel="noreferrer" target="_blank">
                                    <span>
                                        Full Results
                                    </span>                      
                                </a>
                                <ArrowRightCircle />  
                            </div>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}