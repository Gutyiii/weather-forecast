import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, TooltipItem } from 'chart.js';
import style from './CityChart.module.css';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

interface CityChartProps { maxTemps: number[]; }

const CityChart: React.FC<CityChartProps> = ({ maxTemps }) => {
  const data = {
    labels: maxTemps.map((_, index) => `Nap ${index + 1}`), 
    datasets: [
      {
        label: 'Maximumális napi hőmérséklet (°C)',
        data: maxTemps,
        fill: true,
        borderColor: '#fff', 
        backgroundColor: 'rgba(0, 0, 255, 0.2)', 
        tension: 0.4, 
        pointBackgroundColor: '#00f', 
        pointBorderColor: '#fff', 
        pointHoverBackgroundColor: '#fff', 
        pointHoverBorderColor: '#00f', 
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: '#fff' }
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem: TooltipItem<'line'>) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}°C`;
          }
        },
        bodyColor: '#fff' 
      }
    },
    scales: {
      x: {
        ticks: { color: '#fff' },
        grid: { color: '#fff' }
      },
      y: {
        ticks: { color: '#fff' },
        grid: { color: '#fff' }
      }
    }
  };

  return (
    <div className={style.chart_container}>
      <Line data={data} options={options} />
    </div>
  );
};

export default CityChart;
