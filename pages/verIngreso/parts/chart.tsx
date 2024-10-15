import React, { useRef } from "react";
import dayjs from 'dayjs';
import Chart, { Props } from "react-apexcharts";
import '@/styles/apexCharts.css';

interface ChartIngresosProps {
  series: Props["series"];
  minFecha: string;
  maxFecha: string;
}

export const ChartIngresos: React.FC<ChartIngresosProps> = ({ series, minFecha, maxFecha }) => {
  const chartRef = useRef<any>(null); 
  const generateMonths = () => {
    const start = dayjs(`${minFecha.split("/")[1]}-${minFecha.split("/")[0]}-01`);
    const end = dayjs(`${maxFecha.split("/")[1]}-${maxFecha.split("/")[0]}-01`);
    let months = [];
    let current = start;

    while (current.isBefore(end) || current.isSame(end, 'month')) {
      months.push(current.format('MM/YYYY'));
      current = current.add(1, 'month');
    }

    return months;
  };

  const months = generateMonths();

  const options: Props["options"] = {
    chart: {
      type: 'area',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        }
      },
    },
    stroke: {
      curve: 'straight', // Líneas rectas
    },
    xaxis: {
      type: 'category',
      categories: months, // Meses con años desde 2022 hasta el mes actual
      labels: {
        style: {
          colors: 'hsl(var(--nextui-content2))', // Color de los meses en modo oscuro
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: 'hsl(var(--nextui-content2))' // Color de los números del eje Y
        }
      },
      title: {
        text: 'Ingresos',
        style: {
          color: 'hsl(var(--nextui-content2))' // Color del título del eje Y
        }
      }
    },
    tooltip: {

    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
      },
    },
    grid: {
      borderColor: 'hsl(var(--nextui-content2))',
    },
    legend: {
      labels: {
        colors: 'hsl(var(--nextui-content2))'
      },
      position: 'top',
    },
    colors: ['#00E396', '#008FFB', '#FFA500', '#EE82EE'], // Colores para las series
  };

  return (
    <div id="chart" className='bg-background-200 p-5 rounded-lg my-[25px] shadow-md'>
      <Chart ref={chartRef} options={options} series={series} type="area" height={400} />
    </div>
  );
};
