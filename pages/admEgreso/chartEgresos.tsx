import React, { useRef, useEffect, useState } from "react";
import dayjs from 'dayjs';
import Chart, { Props } from "react-apexcharts";
import '@/styles/apexCharts.css';


interface ChartEgresosProps {
    //url: string
    setData: React.Dispatch<React.SetStateAction<any>>
    data: any
}

interface SeriesData {
    name: string;
    data: number[];
}

interface ChartData {
    series: SeriesData[];
    minFecha: string;
    maxFecha: string;
}

export const ChartEgresos: React.FC<ChartEgresosProps> = ({ setData, data }) => {
    const chartRef = useRef<any>(null);
    const [chartData, setChartData] = useState<ChartData>({ series: [], minFecha: '', maxFecha: '' });

    // Funcion para cargar el ApexChart
    const processDataForChart = (data: any[]) => {
        let sortedData;
        let minFecha;
        let maxFecha;
        let allMonths: string[] = [];
        let series: SeriesData[] = [];
        if (data != undefined) {
            sortedData = data.sort((a, b) => {
                const [monthA, yearA] = a.date.split("/").map(Number);
                const [monthB, yearB] = b.date.split("/").map(Number);
                return yearA !== yearB ? yearA - yearB : monthA - monthB;
            });

            minFecha = sortedData[0].date;
            maxFecha = sortedData[sortedData.length - 1].date;

            let current = dayjs(`${minFecha.split("/")[1]}-${minFecha.split("/")[0]}-01`);
            const end = dayjs(`${maxFecha.split("/")[1]}-${maxFecha.split("/")[0]}-01`);
            while (current.isBefore(end) || current.isSame(end, 'month')) {
                allMonths.push(current.format("MM/YYYY"));
                current = current.add(1, 'month');
            }

            const articulos = Array.from(new Set(data.map(item => item.article)));
            series = articulos.map(article => {
                const monthlyData = allMonths.map(month => {
                    const monthlySum = data
                        .filter(item => item.article === article && item.date === month)
                        .reduce((acc, curr) => acc + Number(curr.amount), 0);
                        
                    return monthlySum || 0;
                });
                return { name: article, data: monthlyData };
            });

            setChartData({ series, minFecha, maxFecha });
        }
    };

    const generateMonths = () => {
        const start = dayjs(`${chartData.minFecha.split("/")[1]}-${chartData.minFecha.split("/")[0]}-01`);
        const end = dayjs(`${chartData.maxFecha.split("/")[1]}-${chartData.maxFecha.split("/")[0]}-01`);
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
                text: 'Egresos',
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

    const showAllSeries = () => {
        if (chartRef.current) {
            chartData.series.forEach((serie) => {
                chartRef.current.chart.showSeries(serie.name);
            });
        }
    };

    useEffect(() => {
        showAllSeries()
        processDataForChart(data)
    }, [data]);

    return (
        <div id="chart" className='bg-background-200 p-5 rounded-lg my-[25px] shadow-md'>
            <Chart ref={chartRef} options={options} series={chartData.series} type="area" height={400} />
        </div>
    );
};
