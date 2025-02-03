

import React from "react";
import ReactApexChart, { Props } from "react-apexcharts";
import { useSidebarContext } from "../layout/layout-context";
import { generateDateTimeArray } from "@/utils/helpers/formatDates";

type lineChartContent = {
    series: { name: string; data: number[]; }[];
    colors: Array<string>
    dates: { minDate: number, maxDate: number, intervalMin: number }
}

export const LineChart = ({ content }: { content: lineChartContent }) => {
    const { resolveTheme } = useSidebarContext()
    const labelsColor = resolveTheme == 'light' ? 'black' : 'white'

    const state: {
        series: Props["series"];
        options: Props["options"];
    } = {
        series: content.series,
        options: {
            chart: {
                height: '100px',
                type: 'line',
                zoom: {
                    enabled: true
                },
                dropShadow: {
                    enabled: true,
                    top: 6,
                    left: 2,
                    blur: 4,
                    opacity: resolveTheme == 'dark' ? 1 : 0.4,
                },
                defaultLocale: 'es',
                locales: [{
                    name: 'es',
                    options: {
                        toolbar: {
                            exportToSVG: 'Descargar SVG',
                            exportToPNG: 'Descargar PNG',
                            exportToCSV: 'Descargar CSV',
                        }
                    }
                }]
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },

            markers: {
                size: 6,
                strokeWidth: 0,
                hover: {
                    size: 9
                }
            },
            grid: {
                show: true,
                padding: {
                    bottom: 0
                }
            },
            xaxis: {
                type: 'datetime',
                categories: generateDateTimeArray(content.dates.minDate, content.dates.maxDate, content.dates.intervalMin),
                labels: {
                    formatter: (value) => {
                        const date = new Date(value);
                        return new Intl.DateTimeFormat("es-ES", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        }).format(date); // Ejemplo: "01 ene"
                    },
                    style: {
                        colors: labelsColor
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: labelsColor
                    }
                }
            },
            colors: content.colors,
            legend: {
                position: 'top', // Posición de la leyenda
                horizontalAlign: 'left', // Alineación horizontal
                markers: {
                    size: 10
                },
                itemMargin: {
                    horizontal: 10, // Margen horizontal entre los elementos de la leyenda
                    vertical: 0, // Margen vertical
                },
                onItemClick: {
                    toggleDataSeries: true, // Permite ocultar/mostrar series al hacer clic en la leyenda
                },
                onItemHover: {
                    highlightDataSeries: true, // Resalta la serie correspondiente al pasar el mouse por encima
                },
                labels: {
                    colors: labelsColor, // Color del texto en la leyenda, dinámico según el tema
                },
            },
            tooltip: {
                theme: resolveTheme,
                x: {
                    format: 'dd/MM/yy'
                }
            }
        }
    }

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <div id="chart" className="w-full overflow-hidden">
                <ReactApexChart options={state.options} height={350} series={state.series} type="line" />
            </div>
        </div>
    );
}
