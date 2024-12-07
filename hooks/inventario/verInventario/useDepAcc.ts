import { IDataInventoryViewCatList, IDataInventoryViewDepList } from "@/helpers/interfaces";

export const useDepAcc = ({ tableDataMapped, dateRef }: { tableDataMapped: (IDataInventoryViewDepList[] | IDataInventoryViewCatList[]), dateRef: React.MutableRefObject<any> }) => {
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
        const groupedData: IDataInventoryViewDepList[] & IDataInventoryViewCatList[] = [];

        //@ts-ignore
        if (tableFiltered[0].dependencia) {
            //@ts-ignore
            tableFiltered.forEach((dato: IDataInventoryViewDepList) => {
                const { dependencia, total_asignado } = dato;
                //@ts-ignore
                const existingEntry = groupedData.find((item) => item.dependencia === dependencia);

                if (existingEntry) {
                    existingEntry.total_asignado += total_asignado;
                } else {
                    //@ts-ignore
                    groupedData.push({
                        dependencia,
                        total_asignado: total_asignado,
                        tipos_producto: dato.tipos_producto,
                        total_consumido: dato.total_consumido,
                        mes: `${minRange} - ${maxRange}` // Mostrar el rango seleccionado
                    });
                }
            });
        } else {
            //@ts-ignore
            tableFiltered.forEach((dato: IDataInventoryViewCatList) => {
                const { categoria, total_asignado } = dato;
                //@ts-ignore
                const existingEntry = groupedData.find((item) => item.categoria === categoria);

                if (existingEntry) {
                    existingEntry.total_asignado += total_asignado;
                } else {
                    //@ts-ignore
                    groupedData.push({
                        categoria,
                        total_asignado: total_asignado,
                        tipos_producto: dato.tipos_producto,
                        total_consumido: dato.total_consumido,
                        mes: `${minRange} - ${maxRange}` // Mostrar el rango seleccionado
                    });
                }
            });
        }


        // Formatear los ingresos a dos decimales y agregar el símbolo "$"
        mergedData = groupedData.map((item) => ({
            ...item,
            total_asignado: `${item.total_asignado}`,
        }));
        return mergedData; // Actualizar la tabla con los datos agrupados
    }

    return { changeRange }
}