import React, { useEffect, useState } from 'react';
import VacationModel from '../../../Models/VacationModel';
import vacationsService from '../../../Services/VacationsService';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);



function VacationsChart(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>([]);

  useEffect(() => {
    vacationsService.getAllVacations()
      .then((fetchedVacations) => {
        setVacations(fetchedVacations);
      })
      .catch((err:any) => {console.error(err);
        // Handle error, e.g., show an error message
      });
  }, []);

  // Extract data for the chart
  const labels = vacations.map((vacation) => vacation.target);
  const followersCount = vacations.map((vacation) => vacation.followersCount);

  // Define chart data
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Followers Count',
        data: followersCount,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div style={{ margin: '20px', padding: '20px', backgroundColor: '#f2f2f2' }}>
      <h2>Vacations Chart</h2>
      <Bar data={chartData} />
    </div>
  );
}

export default VacationsChart;
