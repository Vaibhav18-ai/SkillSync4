import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController);

interface BarChartProps {
  labels: string[];
  data: number[];
  labelName?: string;
  minY?: number;
  maxY?: number;
}

export const BarChart: React.FC<BarChartProps> = ({
  labels,
  data,
  labelName = 'Score',
  minY = 0,
  maxY = 10,
}) => {
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
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: labelName,
            data,
            backgroundColor: 'rgba(13, 148, 136, 0.75)',
            borderColor: 'rgb(13, 148, 136)',
            borderWidth: 1.5,
            borderRadius: 6,
            hoverBackgroundColor: 'rgba(14, 116, 144, 0.9)',
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
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: (context) => ` ${labelName}: ${Number(context.raw).toFixed(2)}`,
            },
          },
        },
        scales: {
          y: {
            min: Math.floor(minY),
            max: Math.ceil(maxY),
            grid: {
              color: 'rgba(226, 232, 240, 0.7)',
            },
            ticks: {
              font: {
                size: 11,
              },
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 11,
                weight: 'bold',
              },
            },
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
  }, [labels, data, labelName, minY, maxY]);

  return (
    <div className="w-full h-full min-h-[190px] relative">
      <canvas ref={canvasRef} />
    </div>
  );
};
