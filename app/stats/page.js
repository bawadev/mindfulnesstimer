"use client"
import React, { useEffect, useState } from 'react';
import { Line, Bar, Doughnut, Radar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';



const InsightsPage = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const savedSessions = JSON.parse(localStorage.getItem('sessions')) || [];
    setSessions(savedSessions);
  }, []);

  const getChartData = () => {
    const labels = sessions.map((session) => new Date(session.timestamp).toLocaleDateString());
    const emotionsData = sessions.map((session) => session.emotions);

    const datasetConfig = (label, data, color) => ({
      label,
      data,
      borderColor: color,
      backgroundColor: color,
      fill: false,
    });

    const moodDistributionData = emotionsData.reduce((acc, session) => {
      session.forEach((value, index) => {
        acc[index] = acc[index] ? acc[index] + value : value;
      });
      return acc;
    }, []).map(value => value / sessions.length);

    return {
      moodDistribution: {
        labels: ["Happy", "Relaxed", "Love", "Hope", "Smart"],
        datasets: [{
          data: moodDistributionData,
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)', 
            'rgba(255, 159, 64, 0.2)', 
            'rgba(255, 205, 86, 0.2)', 
            'rgba(201, 203, 207, 0.2)', 
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgb(75, 192, 192)', 
            'rgb(255, 159, 64)', 
            'rgb(255, 205, 86)', 
            'rgb(201, 203, 207)', 
            'rgb(54, 162, 235)'
          ],
        }]
      },
      moodTrends: {
        labels,
        datasets: [
          datasetConfig("Happy", emotionsData.map(data => data[0]), 'rgba(75, 192, 192, 1)'),
          datasetConfig("Relaxed", emotionsData.map(data => data[1]), 'rgba(255, 159, 64, 1)'),
          datasetConfig("Love", emotionsData.map(data => data[2]), 'rgba(255, 205, 86, 1)'),
          datasetConfig("Hope", emotionsData.map(data => data[3]), 'rgba(201, 203, 207, 1)'),
          datasetConfig("Smart", emotionsData.map(data => data[4]), 'rgba(54, 162, 235, 1)'),
        ],
      },
      averageMood: {
        labels: ["Happy", "Relaxed", "Love", "Hope", "Smart"],
        datasets: [{
          data: moodDistributionData,
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)', 
            'rgba(255, 159, 64, 0.2)', 
            'rgba(255, 205, 86, 0.2)', 
            'rgba(201, 203, 207, 0.2)', 
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgb(75, 192, 192)', 
            'rgb(255, 159, 64)', 
            'rgb(255, 205, 86)', 
            'rgb(201, 203, 207)', 
            'rgb(54, 162, 235)'
          ],
        }]
      },
      emotionCorrelations: {
        labels: ["Happy", "Relaxed", "Love", "Hope", "Smart"],
        datasets: [
          datasetConfig("Happy", emotionsData.map(data => data[0]), 'rgba(75, 192, 192, 1)'),
          datasetConfig("Relaxed", emotionsData.map(data => data[1]), 'rgba(255, 159, 64, 1)'),
          datasetConfig("Love", emotionsData.map(data => data[2]), 'rgba(255, 205, 86, 1)'),
          datasetConfig("Hope", emotionsData.map(data => data[3]), 'rgba(201, 203, 207, 1)'),
          datasetConfig("Smart", emotionsData.map(data => data[4]), 'rgba(54, 162, 235, 1)'),
        ],
      },
      emotionBalance: {
        labels: ["Happy", "Relaxed", "Love", "Hope", "Smart"],
        datasets: [{
          data: moodDistributionData,
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)', 
            'rgba(255, 159, 64, 0.2)', 
            'rgba(255, 205, 86, 0.2)', 
            'rgba(201, 203, 207, 0.2)', 
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgb(75, 192, 192)', 
            'rgb(255, 159, 64)', 
            'rgb(255, 205, 86)', 
            'rgb(201, 203, 207)', 
            'rgb(54, 162, 235)'
          ],
        }]
      },
    };
  };

  const chartData = getChartData();

  return (
    <>
      
      <div className="h-20" />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mt-10 mb-10">Insights</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-zinc-100 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-center mb-4">Mood Distribution</h2>
            <p className="text-center text-gray-700 mb-4">
              This chart shows the average distribution of your emotions over the recorded sessions.
              It helps you understand which emotions are most prevalent in your daily life.
            </p>
            <div className="flex justify-center">
              <div className="w-full md:w-2/3">
                <Doughnut data={chartData.moodDistribution} />
              </div>
            </div>
          </div>

          <div className="bg-zinc-100 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-center mb-4">Mood Trends</h2>
            <p className="text-center text-gray-700 mb-4">
              This chart displays the trend of each emotion over time. 
              It helps you see how your emotional states have changed over the recorded sessions.
            </p>
            <div className="flex justify-center">
              <div className="w-full md:w-2/3">
                <Line data={chartData.moodTrends} />
              </div>
            </div>
          </div>

          <div className="bg-zinc-100 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-center mb-4">Average Mood</h2>
            <p className="text-center text-gray-700 mb-4">
              The radar chart illustrates your average emotional state. 
              It helps you see the balance between different emotions.
            </p>
            <div className="flex justify-center">
              <div className="w-full md:w-2/3">
                <Radar data={chartData.averageMood} />
              </div>
            </div>
          </div>

          <div className="bg-zinc-100 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-center mb-4">Emotion Correlations</h2>
            <p className="text-center text-gray-700 mb-4">
              This bar chart shows how different emotions correlate with each other.
              It helps you understand which emotions tend to occur together.
            </p>
            <div className="flex justify-center">
              <div className="w-full md:w-2/3">
                <Bar data={chartData.emotionCorrelations} />
              </div>
            </div>
          </div>

          <div className="bg-zinc-100 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-center mb-4">Emotion Balance</h2>
            <p className="text-center text-gray-700 mb-4">
              The pie chart represents the balance of your emotions. 
              It helps you see the proportion of each emotion in your overall emotional state.
            </p>
            <div className="flex justify-center">
              <div className="w-full md:w-2/3">
                <Pie data={chartData.emotionBalance} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InsightsPage;
