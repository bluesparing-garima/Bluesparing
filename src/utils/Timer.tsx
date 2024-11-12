import React, { useState, useEffect } from "react";
interface TimerProps {
    timer?: string;
}
interface ShowTimeProps {
    days: number, hours: number, minutes: number, seconds: number
}
const Timer: React.FC<TimerProps> = ({
    timer = "",
}) => {
    const [time, setTime] = useState<ShowTimeProps>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    useEffect(() => {
        convertMillisecondsToTime()
         // eslint-disable-next-line
    }, [])
    const convertMillisecondsToTime = () => {
        const ms = Number(timer);
        if (isNaN(ms)) {
            return
        }
        const totalSeconds = Math.floor(ms / 1000);
        const days = Math.floor(totalSeconds / (24 * 3600));
        const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        setTime({ days, hours, minutes, seconds })
    };
    return (
        <>
            <div>
                {time.days > 0 && `${time.days} days `}
                {time.hours > 0 && `${time.hours} hours `}
                {time.minutes > 0 && `${time.minutes} minutes `}
                {time.seconds > 0 && `${time.seconds} seconds`}
            </div>
        </>
    );
};
export default Timer;
