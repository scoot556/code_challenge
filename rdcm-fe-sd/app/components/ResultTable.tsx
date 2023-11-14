export const ResultTable = (data: any) => {
    console.log(data?.data);

    return (
        // {data ? (
        //    <div>
        //    </div>
        // ):(<div>No data</div>)}
        <table className="table-auto w-full">
            <thead>
                <tr>
                    <td>
                        Win/Place
                    </td>
                    <td>

                    </td>
                    <td>

                    </td>
                    <td>
                        Margin
                    </td>
                    <td>
                        SP
                    </td>
                    <td>
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

                    return (
                    <tr key={result.horse.code}>
                        <td>
                           {result?.position}{posSuffix}
                        </td>
                        <td>
                            <img src={result?.horse?.silkUrl}></img>
                        </td>
                        <td>
                            <p>
                                {result?.raceEntryNumber}. {result?.horse?.fullName} ({result?.raceEntryNumber})
                            </p>
                            <p>
                                T: {result?.trainer?.shortName} J: {result?.jockey?.shortName}
                            </p>                            
                        </td>
                        <td>
                            {result?.position === 1 ? result?.winningTime : result?.margin}
                        </td>
                        <td>
                            {result?.odds.priceStart}
                        </td>
                        <td>
                        {result?.position === 1 ? (
                            <p>
                                {result?.odds?.parimutuel?.returnWin}
                            </p>):(
                                <p>
                                    {"-"}
                                </p>
                            )}
                        {result?.odds?.parimutuel?.returnPlace}
                        </td>
                    </tr>
                )})}
            </tbody>
        </table>
    )
}