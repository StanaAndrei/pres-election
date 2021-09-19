import React from "react";


export default function ElectionStatsView({id, date}: any): React.ReactElement {

    const [href, setHref] = React.useState<string>('#');

    React.useEffect(() => {
        const [
            year,
            month,
            day,
            hour,
            minute,
        ] = date.split(/[\s-:]+/);
        setHref(`/election-stats?year=${year}&month=${month}&day=${day}&hour=${hour}&minute=${minute}`);
    }, [date]);

    return (
        <div>
            Election {id}:
            <pre>date:{date}</pre>
            see details <a href={href}>here</a>!
            <hr />
            <br />
        </div>
    )
}