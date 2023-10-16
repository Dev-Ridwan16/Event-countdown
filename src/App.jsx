import { useState } from "react";
import "./App.css";

import BG from "./assets/nut.jpeg";
import { useEffect } from "react";

function App() {
  const [eventDate, setEventDate] = useState("");
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (eventDate) {
      const interval = setInterval(() => {
        const now = new Date();
        const timeRemaining = new Date(eventDate) - now;

        if (timeRemaining <= 0) {
          clearInterval(interval);
          setCountdown({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          });
        } else {
          const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
          setCountdown({ days, hours, minutes, seconds });
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [eventDate]);

  const handleDateChange = (e) => {
    setEventDate(e.target.value);
  };

  const counterObject = [
    {
      name: "Day",
      initialValue: 0,
    },
    {
      name: "Hours",
      initialValue: 0,
    },
    {
      name: "Minutes",
      initialValue: 0,
    },
    {
      name: "Seconds",
      initialValue: 0,
    },
  ];

  return (
    <>
      <div className="app-container">
        {/* <div className="overlay"></div>
        <img
          src={BG}
          alt=""
          className="bg"
        /> */}
        <div className="body">
          <div className="header">
            <div className="header-content">
              <img
                src="https://dailypost.ng/wp-content/uploads/2018/05/NUT-696x497.jpg"
                alt="Nut-Logo"
              />

              <h1>Event Countdown</h1>

              <img
                src="https://pbs.twimg.com/media/E17w3xoXIAQwQyS.jpg"
                alt=""
              />
            </div>
          </div>

          <div className="let-count">
            <form>
              <label>
                Event Date:
                <input
                  type="datetime-local"
                  value={eventDate}
                  onChange={handleDateChange}
                />
              </label>
            </form>
            <div className="counter">
              <div className="count-wrapper">
                <p>{countdown.days}</p>
                <span>{countdown.days <= 1 ? "Day" : "Days"}</span>
              </div>
              :
              <div className="count-wrapper">
                <p>{countdown.hours}</p>
                <span>{countdown.hours <= 1 ? "Hour" : "Hours"}</span>
              </div>
              :
              <div className="count-wrapper">
                <p>{countdown.minutes}</p>
                <span>{countdown.minutes <= 1 ? "Minute" : "Minutes"}</span>
              </div>
              :
              <div className="count-wrapper">
                <p>{countdown.seconds}</p>
                <span>{countdown.seconds <= 1 ? "Second" : "Seconds"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
