import { IRegister, ITableDataDeps, ITableDataDepsInsideDeps } from "@/helpers/interfaces";
import { useEffect } from "react";


export const useDepAcc = ({ tableDataMapped, dateRef }: { tableDataMapped: ITableDataDepsInsideDeps[], dateRef: React.MutableRefObject<any> }) => {
    let mergedData: any = []

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

        return changeDependencyRange(datePicked)
    }

    const changeDependencyRange = (range: string) => {
        const [minRange, maxRange] = range.split('-');
        const [minMonth, minYear] = minRange.split('/').map(Number);
        const [maxMonth, maxYear] = maxRange.split('/').map(Number);

        const tableFiltered = tableDataMapped.filter((dato) => {
            const [month, year] = dato.mes.split('/').map(Number);
            if (
                (year > minYear || (year === minYear && month >= minMonth)) &&
                (year < maxYear || (year === maxYear && month <= maxMonth))
            ) {
                return true;
            }
            return false;
        })
        // Agrupar dependencias y sumar los ingresos en un array
        const groupedData: ITableDataDepsInsideDeps[] = [];

        tableFiltered.forEach((dato: ITableDataDepsInsideDeps) => {
            const { dependencia, monto } = dato;
            const existingEntry = groupedData.find((item) => item.dependencia === dependencia);

            if (existingEntry) {
                existingEntry.monto += monto;
            } else {
                groupedData.push({
                    dependencia,
                    monto: monto,
                    cant_alumnos: 0,
                    mes: `${minRange} - ${maxRange}` // Mostrar el rango seleccionado
                });
            }
        });

        // Formatear los ingresos a dos decimales y agregar el símbolo "$"
        mergedData = groupedData.map((item) => ({
            ...item,
            monto: `${item.monto}`,
        }));
        return mergedData; // Actualizar la tabla con los datos agrupados
    }

    return { changeRange }
}