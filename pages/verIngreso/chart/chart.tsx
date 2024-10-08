import React from "react";
import dayjs from 'dayjs';
import Chart, { Props } from "react-apexcharts";
import '@/styles/apexCharts.css';

const generateMonths = () => {
  const start = dayjs('2022-01-01');
  const end = dayjs();
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
  colors: ['#00E396', '#008FFB'], // Colores para las series
};

/*
const series: Props["series"] = [
  {
    name: 'Series 1', // Tipo de dato 1
    data: 
  },
  {
    name: 'Series 2', // Tipo de dato 2
    data: Array(months.length).fill().map(() => Math.floor(Math.random() * 100)) // Datos aleatorios por mes
  }
];
*/

interface ChartIngresosProps {
  series: Props["series"];
}

export const ChartIngresos: React.FC<ChartIngresosProps> = ({ series }) => {
  return (
    <div id="chart" className='bg-background-200 p-5 rounded-lg my-[25px] shadow-md'>
      <Chart options={options} series={series} type="area" height={400} />
    </div>
  );
};
