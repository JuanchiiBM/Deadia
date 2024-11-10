"use client"
import React, { useState, useEffect, useRef } from 'react';
import dynamic from "next/dynamic";
import Selects from './options';
import { DataTableRef } from 'datatables.net-react';
import { CalendarDate, now } from '@internationalized/date';
import { useDisclosure } from '@nextui-org/react';
import { GETFunction } from '@/utils/globals';
import TableVerEgreso from './dataTable';


const Chart = dynamic(
    () => import("@/pages/inventario/chart").then((mod) => mod.ChartIngresos
    ),
    {
        ssr: false,
    }
);

let nextTableData: any = [];
let newColumns: any = [];
let jsonData

interface ITableDataDeps {
    list: {
        deps: [{
            dependencia: string
            mes: string
            monto: number
        }]
    }

    filter: {
        dependency: [{
            id: number
            name: string
        }]
    }
}

interface ITableDataDep {
    filter: {
        classroom: [{
            id: number
            code: string
        }]
    }

    list: {
        grades: [{
            curso: string,
            aula: string,
            fec_inicio: string,
            fec_finalizacion: string,
            ingreso: number
        }]
    }
}

interface ITableDataClassrooms {
    list: {
        classrooms: [{
            aula: string
            dni: string
            fec_compra: string
            ingreso: number
            mail: string
            nombre: string
        }]
    }
}

const today = now('UTC');
const startOfYear = new CalendarDate(today.year, 1, 1);

const Inventario = () => {
    const [chartContent, setChartContent] = useState([{}])
    const [tableData, setTableData] = useState([]);
    const [tableLoader, setTableLoader] = useState(true);
    const [tableKey, setTableKey] = useState(0);
    const [lastTable, setLastTable] = useState('0');
    const [dateSelected, setDateSelected] = useState<any[]>()
    const [optionsDeps, setOptionsDeps] = useState<{ value: string; label: string; }[]>([{ value: '0', label: 'Todas' }])
    const dateRef = useRef<any>()
    const tableRef = useRef<DataTableRef>(null);
    const [columns, setColumns] = useState([
        { data: 'dependencia', title: 'Dependencia' },
        { data: 'fecha', title: 'Fecha' },
        { data: 'ingreso', title: 'Ingreso Acumulado' },
    ]);


    // Función para actualizar el JSON y las columnas
    const changeJson = async (value: any, ret?: boolean) => {
        // Configura las columnas y URL según el valor seleccionado
        setTableData([])
        if (dateSelected) {
            setTableLoader(true)
            switch (value) {
                case '0':
                    newColumns = [
                        { data: 'dependencia', title: 'Dependencia' },
                        { data: 'fecha', title: 'Fecha' },
                        { data: 'ingreso', title: 'Ingreso Acumulado' },
                    ];
                    jsonData = await GETFunction(`api/income?start_date=${dateSelected[0]}&end_date=${dateSelected[1]}`, setTableLoader) as ITableDataDeps
                    const options = [{ value: '0', label: 'Todas' }, ...jsonData.filter.dependency.map((val) => ({
                        value: val.id.toString(),
                        label: val.name
                    }))]
                    setOptionsDeps(options)

                    nextTableData = jsonData.list.deps.map((dato) => ({
                        dependencia: dato.dependencia,
                        fecha: dato.mes,
                        ingreso: dato.monto,
                    }));
                    break;
                case '1':
                    newColumns = [
                        { data: 'curso', title: 'Curso' },
                        { data: 'aula', title: 'Aula' },
                        { data: 'fec_inicio', title: 'Fecha de Inicio' },
                        { data: 'fec_finalizacion', title: 'Fecha de Finalizacion' },
                        { data: 'ingreso', title: 'Ingreso' }
                    ];
                    jsonData = await GETFunction(`api/income?start_date=${dateSelected[0]}&end_date=${dateSelected[1]}&id_dependency=${value}`, setTableLoader) as ITableDataDep
                    nextTableData = jsonData.list.grades.map((grade) => ({
                        curso: grade.curso,
                        aula: grade.aula,
                        fec_inicio: grade.fec_inicio,
                        fec_finalizacion: grade.fec_finalizacion,
                        ingreso: grade.ingreso
                    }));
                    break;
                case '2':
                    newColumns = [
                        { data: 'curso', title: 'Curso' },
                        { data: 'aula', title: 'Aula' },
                        { data: 'fec_inicio', title: 'Fecha de Inicio' },
                        { data: 'fec_finalizacion', title: 'Fecha de Finalizacion' },
                        { data: 'ingreso', title: 'Ingreso' }
                    ];
                    jsonData = await GETFunction(`api/income?start_date=${dateSelected[0]}&end_date=${dateSelected[1]}&id_dependency=${value}`, setTableLoader) as ITableDataDep
                    nextTableData = jsonData.list.grades.map((grade) => ({
                        curso: grade.curso,
                        aula: grade.aula,
                        fec_inicio: grade.fec_inicio,
                        fec_finalizacion: grade.fec_finalizacion,
                        ingreso: grade.ingreso
                    }));
                    break;
            }
            setTableKey(prevKey => prevKey + 1);
            setColumns(newColumns);
            setLastTable((prev) => prev =value)
            setChartContent(nextTableData)
            if (ret = true)
                return nextTableData
        }
    };

    const changeJsonForCurse = async (value: any) => {
        if (dateSelected) {
            newColumns = [
                { data: 'dni', title: 'DNI' },
                { data: 'nombre', title: 'Nombre' },
                { data: 'mail', title: 'Mail' },
                { data: 'fecha', title: 'Fecha de Inscripción'},
                { data: 'ingreso', title: 'Ingreso' },
            ];
            setTableData([])
            setTableLoader(true)
            jsonData = await GETFunction(`api/income?start_date=${dateSelected[0]}&end_date=${dateSelected[1]}&id_classroom=${value}`, setTableLoader) as ITableDataClassrooms
            nextTableData = jsonData.list.classrooms.map((alumno) => ({
                dni: alumno.dni,
                nombre: alumno.nombre,
                mail: alumno.mail,
                fecha: alumno.fec_compra,
                ingreso: alumno.ingreso
            }));

            setTableKey(prevKey => prevKey + 1);
            setColumns(newColumns);
        }
    }

    const changeDependencyRange = (range: string) => {
        if (nextTableData[0] && nextTableData[0].dependencia) {
            const [minRange, maxRange] = range.split('-');
            const [minMonth, minYear] = minRange.split('/').map(Number);
            const [maxMonth, maxYear] = maxRange.split('/').map(Number);

            const tableFiltered = nextTableData.filter((dato: any) => {
                const [month, year] = dato.fecha.split('/').map(Number);
                if (
                    (year > minYear || (year === minYear && month >= minMonth)) &&
                    (year < maxYear || (year === maxYear && month <= maxMonth))
                ) {
                    return true;
                }
                return false;
            })
            // Agrupar dependencias y sumar los ingresos en un array
            const groupedData: any[] = [];
            let mergedData: any = []

            tableFiltered.forEach((dato: any) => {
                const { dependencia, ingreso } = dato;
                const existingEntry = groupedData.find((item) => item.dependencia === dependencia);

                if (existingEntry) {
                    existingEntry.ingreso += ingreso;
                } else {
                    groupedData.push({
                        dependencia,
                        ingreso: ingreso,
                        fecha: `${minRange} - ${maxRange}` // Mostrar el rango seleccionado
                    });
                }
            });

            // Formatear los ingresos a dos decimales y agregar el símbolo "$"
            mergedData = groupedData.map((item) => ({
                ...item,
                ingreso: `${item.ingreso}`,
                acciones: null
            }));
            setTableData(mergedData); // Actualizar la tabla con los datos agrupados
        }
    }

    const changeRange = async () => {
        const datePicked = dateRef.current?.innerText.split('\n').filter((date: string) => {
            return date != '/'
        }).filter((date: string, index: number) => {
            if (index != 0 && index != 4) {
                return date
            }
        }).map((date: string, index: number) => {
            let newDate
            if (index == 0 || index == 3) {
                newDate = `${date}/`
                return newDate
            } else {
                return date
            }
        }).join('')

        changeDependencyRange(datePicked)
    }

    const selectDateRange = async () => {
        await setDateSelected(dateRef.current.innerText.split('\n').join('').split('-').map((date: any) => {
            const partsOfDate = date.split('/').reverse()
            partsOfDate[1].length == 1 ? partsOfDate[1] = `0${partsOfDate[1]}` : null
            partsOfDate[2].length == 1 ? partsOfDate[2] = `0${partsOfDate[2]}` : null
            return `${partsOfDate[0]}-${partsOfDate[1]}-${partsOfDate[2]}`
        }))
    }

    useEffect(() => {
        changeJson(lastTable)
    }, [dateSelected])

    useEffect(() => {
        setTableData((t) => t = nextTableData)
        changeRange()
    }, [columns])

    return (
        <>
            <h1 className='text-4xl'>Inventario</h1>
            <Chart chartContent={chartContent} />
            <Selects changeJson={changeJson} changeJsonForCurse={changeJsonForCurse} changeRange={changeRange} dateRef={dateRef} optionsDeps={optionsDeps} lastTable={lastTable} tableLoader={tableLoader} selectDateRange={selectDateRange} />
            <TableVerEgreso tableKey={tableKey} tableData={tableData} tableRef={tableRef} columns={columns} tableLoader={tableLoader} />
        </>
    )
}

export default Inventario