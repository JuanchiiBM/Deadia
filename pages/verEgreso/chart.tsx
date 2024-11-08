import React, { useRef, useEffect, useState } from "react";
import dayjs from 'dayjs';
import Chart, { Props } from "react-apexcharts";
import '@/styles/apexCharts.css';

interface ChartIngresosProps {
    chartContent: Array<object>
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

export const ChartIngresos: React.FC<ChartIngresosProps> = ({ chartContent }) => {
    const chartRef = useRef<any>(null);
    const [chartData, setChartData] = useState<ChartData>({ series: [], minFecha: '', maxFecha: '' });

    // Funcion para cargar el ApexChart
    const processDataForChart = (data: any[]) => {
        let sortedData;
        let minFecha;
        let maxFecha;
        let allMonths: string[] = [];
        let series: SeriesData[] = [];
        if (data[0] && (data[0].dependencia || data[0].curso)) {
            //console.log('1')
            if (data[0].dependencia) {
                //console.log('entra piola 2')
                // Procesar el JSON por 'dependencia'
                sortedData = data.sort((a, b) => {
                    const [monthA, yearA] = a.fecha.split("/").map(Number);
                    const [monthB, yearB] = b.fecha.split("/").map(Number);
                    return yearA !== yearB ? yearA - yearB : monthA - monthB;
                });
    
                minFecha = sortedData[0].fecha;
                maxFecha = sortedData[sortedData.length - 1].fecha;
    
                let current = dayjs(`${minFecha.split("/")[1]}-${minFecha.split("/")[0]}-01`);
                const end = dayjs(`${maxFecha.split("/")[1]}-${maxFecha.split("/")[0]}-01`);
                while (current.isBefore(end) || current.isSame(end, 'month')) {
                    allMonths.push(current.format("MM/YYYY"));
                    current = current.add(1, 'month');
                }
    
                const dependencias = Array.from(new Set(data.map(item => item.dependencia)));
                series = dependencias.map(dependencia => {
                    const monthlyData = allMonths.map(month => {
                        const monthlySum = data
                            .filter(item => item.dependencia === dependencia && item.fecha === month)
                            .reduce((acc, curr) => acc + Number(curr.ingreso), 0);
                        return monthlySum || 0;
                    });
                    return { name: dependencia, data: monthlyData };
                });
            } else if (data[0].curso) {
                //console.log('2')
                // Procesar el JSON por 'curso'
                sortedData = data.sort((a, b) => {
                    const [monthA, yearA] = a.fec_finalizacion.split("/").filter((dato: any, index: any) => { return index != 0 && dato}).map(Number)
                    const [monthB, yearB] = b.fec_finalizacion.split("/").filter((dato: any, index: any) => { return index != 0 && dato}).map(Number)
                    return yearA !== yearB ? yearA - yearB : monthA - monthB
                });
                console.log(sortedData)
                minFecha = sortedData[0].fec_finalizacion.split("/").filter((dato: any, index: any) => { return index != 0 && dato}).join('/')
                maxFecha = sortedData[sortedData.length - 1].fec_finalizacion.split("/").filter((dato: any, index: any) => { return index != 0 && dato}).join('/')
                console.log(minFecha)
                console.log(maxFecha)
    
                let current = dayjs(`${minFecha.split("/")[1]}-${minFecha.split("/")[0]}-01`);
                const end = dayjs(`${maxFecha.split("/")[1]}-${maxFecha.split("/")[0]}-01`);
                while (current.isBefore(end) || current.isSame(end, 'month')) {
                    allMonths.push(current.format("MM/YYYY"));
                    current = current.add(1, 'month');
                }
    
                const cursos = Array.from(new Set(data.map(item => item.curso)));
                series = cursos.map(curso => {
                    const monthlyData = allMonths.map(month => {
                        const monthlySum = data
                            .filter(item => item.curso === curso && item.fec_finalizacion.split("/").filter((dato: any, index: any) => { return index != 0 && dato}).join('/') === month)
                            .reduce((acc, curr) => acc + Number(curr.ingreso), 0);
                        return monthlySum || 0;
                    });
                    return { name: curso, data: monthlyData };
                });
            }
    
            setChartData({ series, minFecha, maxFecha });
        } else {
            setChartData({ series, minFecha: '', maxFecha: '' })
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
        processDataForChart(chartContent)
    }, [chartContent]);

    return (
        <div id="chart" className='bg-background-200 p-5 rounded-lg my-[25px] shadow-md'>
            <Chart ref={chartRef} options={options} series={chartData.series} type="area" height={400} />
        </div>
    );
};
