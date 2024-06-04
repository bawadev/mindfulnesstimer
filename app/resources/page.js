"use client"
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const JournalPage = () => {
  const [sessions, setSessions] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const savedSessions = JSON.parse(localStorage.getItem("sessions")) || [];
    setSessions(savedSessions);
  }, []);

  const getChartData = (emotions) => {
    return {
      labels: ["Happy", "Energized", "Relaxed", "Smart", "Love", "Hope"],
      datasets: [
        {
          data: emotions,
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(201, 203, 207, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 205, 86, 1)",
            "rgba(201, 203, 207, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const groupByDate = (sessions) => {
    const grouped = sessions.reduce((acc, session) => {
      const date = new Date(session.timestamp).toLocaleDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(session);
      return acc;
    }, {});
    return grouped;
  };

  const groupedSessions = groupByDate(sessions);
  const currentDateString = currentDate.toLocaleDateString();
  const sessionsForCurrentDate = groupedSessions[currentDateString] || [];

  const handlePreviousDay = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.setDate(prevDate.getDate() - 1))
    );
  };

  const handleNextDay = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.setDate(prevDate.getDate() + 1))
    );
  };

  return (
    <>
      
      <div className="h-20" />
      <div className="container mx-auto p-4 mt-20">
        <h1 className="text-2xl font-bold text-center mb-8">Journal</h1>
        <div className="flex justify-center mb-4">
          <button
            onClick={handlePreviousDay}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mx-2"
          >
            Previous Day
          </button>
          <DatePicker
            selected={currentDate}
            onChange={(date) => setCurrentDate(date)}
            className="px-4 py-2 border rounded-lg mx-2 text-center"
          />
          <button
            onClick={handleNextDay}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mx-2"
          >
            Next Day
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">{currentDateString}</h2>
          {sessionsForCurrentDate.length === 0 ? (
            <p className="text-gray-700">No entries for this day.</p>
          ) : (
            sessionsForCurrentDate.map((session, idx) => session.note?(
              <div key={idx}>
                <span className="font-semibold">
                    Note at {new Date(session.timestamp).toLocaleTimeString()}
                  </span>
                <div className="p-4 rounded-lg text-xl shadow-inner mt-5">
                  <p className="text-gray-800">{session.note}</p>
                </div>
                <div className="flex justify-between items-center mb-4">
                  
                  <div className="w-1/2 mt-8">
                  
                  <div className="size-80"><Bar data={getChartData(session.emotions)} /></div>
                    
                  </div>
                  {/* Todo : a line separator */}
                </div>
              </div>
            ):(<></>))
          )}
        </div>
      </div>
    </>
  );
};

export default JournalPage;
