import { IDataEgressViewArtList, IDataEgressViewCatList } from "@/helpers/interfaces";

export const useDepAcc = ({ tableDataMapped, dateRef }: { tableDataMapped: (IDataEgressViewCatList[] | IDataEgressViewArtList[]), dateRef: React.MutableRefObject<any> }) => {
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
        const groupedData: IDataEgressViewCatList[] & IDataEgressViewArtList[] = [];

        //@ts-ignore
        if (tableFiltered[0].articulo) {
            //@ts-ignore
            tableFiltered.forEach((dato: IDataEgressViewArtList) => {
                const { articulo, monto, unidades_compradas } = dato;
                //@ts-ignore
                const existingEntry = groupedData.find((item) => item.articulo === articulo);

                if (existingEntry) {
                    existingEntry.monto += monto;
                    existingEntry.unidades_compradas += unidades_compradas
                } else {
                    //@ts-ignore
                    groupedData.push({
                        articulo,
                        monto: monto,
                        unidades_compradas: unidades_compradas,
                        mes: `${minRange} - ${maxRange}` // Mostrar el rango seleccionado
                    });
                }
            });
        } else {
            tableFiltered.forEach((dato: IDataEgressViewCatList) => {
                const { categoria, monto, unidades_compradas } = dato;
                const existingEntry = groupedData.find((item) => item.categoria === categoria);

                if (existingEntry) {
                    existingEntry.monto += monto;
                    existingEntry.unidades_compradas += unidades_compradas
                } else {
                    groupedData.push({
                        categoria,
                        monto: monto,
                        unidades_compradas: unidades_compradas,
                        mes: `${minRange} - ${maxRange}` // Mostrar el rango seleccionado
                    });
                }
            });
        }


        // Formatear los ingresos a dos decimales y agregar el símbolo "$"
        mergedData = groupedData.map((item) => ({
            ...item,
            monto: `${item.monto}`,
        }));
        return mergedData; // Actualizar la tabla con los datos agrupados
    }

    return { changeRange }
}