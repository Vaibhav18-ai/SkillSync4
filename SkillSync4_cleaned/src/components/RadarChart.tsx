import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  RadarController,
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, RadarController);

interface RadarChartProps {
  labels: string[];
  data: number[];
}

export const RadarChart: React.FC<RadarChartProps> = ({ labels, data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    chartInstanceRef.current = new ChartJS(ctx, {
      type: 'radar',
      data: {
        labels: labels.length > 0 ? labels : ['No Skills Rated'],
        datasets: [
          {
            label: 'Proficiency & Experience',
            data: data.length > 0 ? data : [0],
            backgroundColor: 'rgba(13, 148, 136, 0.25)',
            borderColor: 'rgb(13, 148, 136)',
            borderWidth: 2,
            pointBackgroundColor: '#0f766e',
            pointBorderColor: '#ffffff',
            pointHoverBackgroundColor: '#ffffff',
            pointHoverBorderColor: '#0f766e',
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            padding: 8,
            cornerRadius: 6,
            callbacks: {
              label: (context) => ` Strength: ${Number(context.raw).toFixed(1)} / 10`,
            },
          },
        },
        scales: {
          r: {
            angleLines: {
              color: 'rgba(226, 232, 240, 0.8)',
            },
            grid: {
              color: 'rgba(226, 232, 240, 0.8)',
            },
            pointLabels: {
              font: {
                size: 11,
                weight: 'bold',
              },
              color: '#334155',
            },
            ticks: {
              display: false,
              stepSize: 2,
            },
            min: 0,
            max: 10,
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [labels, data]);

  return (
    <div className="w-full h-full min-h-[200px] flex items-center justify-center relative">
      <canvas ref={canvasRef} />
    </div>
  );
};
