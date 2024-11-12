import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
interface CountdownTimerProps {
  registerDate: any;
  status?: string;
  timer?: string;
}
const CountdownTimer: React.FC<CountdownTimerProps> = ({
  registerDate,
  status = "",
  timer = "",
}) => {
  const regDate = dayjs(registerDate);
  const calculateTimeLeft = () => {
    const now = dayjs();
    const diffInMilliseconds = now.diff(regDate);
    if (diffInMilliseconds <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const days = Math.floor(diffInSeconds / (24 * 60 * 60));
    const hours = Math.floor((diffInSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(diffInSeconds % 60);
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status !== "Doc Pending" && status !== "Rejected") {
      timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
    }
    return () => clearInterval(timer);
     // eslint-disable-next-line
  }, [regDate]);
  const convertMillisecondsToTime = (msString: string) => {
    const ms = Number(msString);
    if (isNaN(ms)) {
      return { day: 0, hour: 0, min: 0, second: 0 };
    }
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return {
      day: days,
      hour: hours,
      min: minutes,
      second: seconds,
    };
  };
  const operationTaskDone = (s: string) => {
    if (!s) {
      return false;
    }
    s = s.toLowerCase();
    if (
      s !== "accepted" &&
      s !== "quotation sent" &&
      s !== "payment pending" &&
      s !== "requested" &&
      s !== "payment request" &&
      s!=="doc pending" && 
      s!=="changes required"&&
      s !== ""
    ) {
      return true;
    }
    return false;
  };
  const { days, hours, minutes, seconds } = timeLeft;
  return (
    <>
      {operationTaskDone(status) ? (
        <>
          {(() => {
            const timeData = convertMillisecondsToTime(timer);
            const { day, hour, min, second } = timeData;
            return (
              <div>
                {day > 0 && (
                  <span>
                    {day} day{day !== 1 ? "s" : ""}{" "}
                  </span>
                )}
                {hour > 0 && (
                  <span>
                    {hour} hour{hour !== 1 ? "s" : ""}{" "}
                  </span>
                )}
                {min > 0 && (
                  <span>
                    {min} minute{min !== 1 ? "s" : ""}{" "}
                  </span>
                )}
                {second > 0 && (
                  <span>
                    {second} second{second !== 1 ? "s" : ""}{" "}
                  </span>
                )}
                {days === 0 &&
                  hours === 0 &&
                  minutes === 0 &&
                  seconds === 0 && <span>Time's up!</span>}
              </div>
            );
          })()}
        </>
      ) : (
        <div>
          {days > 0 && (
            <span>
              {days} day{days !== 1 ? "s" : ""}{" "}
            </span>
          )}
          {hours > 0 && (
            <span>
              {hours} hour{hours !== 1 ? "s" : ""}{" "}
            </span>
          )}
          {minutes > 0 && (
            <span>
              {minutes} minute{minutes !== 1 ? "s" : ""}{" "}
            </span>
          )}
          {seconds > 0 && (
            <span>
              {seconds} second{seconds !== 1 ? "s" : ""}{" "}
            </span>
          )}
        </div>
      )}
    </>
  );
};
export default CountdownTimer;
