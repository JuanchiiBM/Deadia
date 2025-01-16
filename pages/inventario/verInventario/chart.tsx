import React, { useRef, useEffect, useState } from "react";
import dayjs from 'dayjs';
import Chart, { Props } from "react-apexcharts";
import '@/styles/apexCharts.css';

interface ChartProps {
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

export const ChartFinal: React.FC<ChartProps> = ({ chartContent }) => {
    const chartRef = useRef<any>(null);
    const [chartData, setChartData] = useState<ChartData>({ series: [], minFecha: '', maxFecha: '' });

    // Funcion para cargar el ApexChart
    const processDataForChart = (data: any[]) => {
        let sortedData;
        let minFecha;
        let maxFecha;
        let allMonths: string[] = [];
        let series: SeriesData[] = [];
        console.log(data[0])
        if (data[0] && (data[0].categoria || data[0].dependencia)) {
            if (data[0].categoria) {
                // Procesar el JSON por 'categoria'
                sortedData = data.sort((a, b) => {
                    const [monthA, yearA] = a.mes.split("/").map(Number);
                    const [monthB, yearB] = b.mes.split("/").map(Number);
                    return yearA !== yearB ? yearA - yearB : monthA - monthB;
                });
    
                minFecha = sortedData[0].mes;
                maxFecha = sortedData[sortedData.length - 1].mes;
    
                let current = dayjs(`${minFecha.split("/")[1]}-${minFecha.split("/")[0]}-01`);
                const end = dayjs(`${maxFecha.split("/")[1]}-${maxFecha.split("/")[0]}-01`);
                while (current.isBefore(end) || current.isSame(end, 'month')) {
                    allMonths.push(current.format("MM/YYYY"));
                    current = current.add(1, 'month');
                }
    
                const categorias = Array.from(new Set(data.map(item => item.categoria)));
                series = categorias.map(categoria => {
                    const monthlyData = allMonths.map(month => {
                        const monthlySum = data
                            .filter(item => item.categoria === categoria && item.mes === month)
                            .reduce((acc, curr) => acc + Number(curr.total_asignado), 0);
                        return monthlySum || 0;
                    });
                    return { name: categoria, data: monthlyData };
                });
            } else if (data[0].dependencia) {
                // Procesar el JSON por 'dependencia'
                sortedData = data.sort((a, b) => {
                    const [monthA, yearA] = a.mes.split("/").map(Number);
                    const [monthB, yearB] = b.mes.split("/").map(Number);
                    return yearA !== yearB ? yearA - yearB : monthA - monthB;
                });
    
                minFecha = sortedData[0].mes;
                maxFecha = sortedData[sortedData.length - 1].mes;
    
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
                            .filter(item => item.dependencia === dependencia && item.mes === month)
                            .reduce((acc, curr) => acc + Number(curr.total_asignado), 0);
                        return monthlySum || 0;
                    });
                    return { name: dependencia, data: monthlyData };
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
            animations: {
                enabled: true,
                easing: "easeinout",
                speed: 800, // Velocidad en milisegundos
                animateGradually: {
                    enabled: true,
                    delay: 150, // Retraso entre puntos
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350, // Velocidad al actualizar datos
                },
            },
        },
        stroke: {
            curve: 'straight', // Líneas rectas
        },
        xaxis: {
            type: 'category',
            categories: months,
            labels: {
                style: {
                    colors: 'hsl(var(--nextui-content2))',
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: 'hsl(var(--nextui-content2))'
                }
            },
            title: {
                text: 'Egresos',
                style: {
                    color: 'hsl(var(--nextui-content2))'
                }
            }
        },
        tooltip: {},
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
        colors: chartData.series.map((serie) => {
            if (serie.name === 'Informática') return '#318CE7'; // Azul Francia
            if (serie.name === 'Idiomas') return '#33FF57'; // Verde
            return '#008FFB'; // Azul predeterminado
        }),
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
        <div id="chart" className='bg-background-200 p-5 rounded-lg my-[25px] shadow-md overflow-hidden'>
            <Chart ref={chartRef} options={options} series={chartData.series} type="area" height={400} />
        </div>
    );
};
