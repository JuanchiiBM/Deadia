"use client"
import React from 'react'
import dynamic from "next/dynamic";
import DataTable from 'datatables.net-react';
import '../../styles/dataTables.css'
import DT from 'datatables.net-dt';
import json from '@/public/data.json'


DataTable.use(DT);

// Procesar los datos para crear las series de ApexCharts
const sortedData = json.data.sort((a, b) => {
  const [monthA, yearA] = a.fecha.split("/").map(Number);
  const [monthB, yearB] = b.fecha.split("/").map(Number);
  return yearA !== yearB ? yearA - yearB : monthA - monthB;
});

const minFecha = sortedData[0].fecha;
const maxFecha = sortedData[sortedData.length - 1].fecha;
// Crear las series para cada dependencia
const series = ["Informática", "Idiomas"].map((dependencia) => ({
  name: dependencia,
  data: sortedData
    .filter((item) => item.dependencia === dependencia)
    .map((item) => Number(item.ingreso.replace("$", "")))
}));

const Chart = dynamic(
  () => import("@/pages/verIngreso/chart/chart").then((mod) => mod.ChartIngresos
  ),
  {
    ssr: false,
  }
);

const VerIngreso = () => {

  const columns = [
    { data: 'dependencia' },
    { data: 'fecha' },
    { data: 'ingreso' },
  ]

  return (
    <>
      <h1 className='text-4xl'>Ingresos</h1>
      <Chart series={series} minFecha={minFecha} maxFecha={maxFecha}/>
      <div className='w-full my-[50px] bg-background-200 flex justify-around p-5 rounded-lg shadow-md'>
        <div className='flex flex-col'>
          <label htmlFor="select-dependency">Dependencia:</label>
          <select name="" id="select-dependency" className='w-[170px] rounded-md bg-background'>
            <option value="0">Seleccione</option>
            <option value="1">Informatica</option>
            <option value="2">Idiomas</option>
          </select>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="select-curso">Curso:</label>
          <select name="" id="select-curso" className='w-[170px] rounded-md bg-background'>
            <option value="0">Seleccione</option>
            <option value="1">2</option>
          </select>
        </div>
      </div>
      <DataTable ajax="/data.json" className='order-column' columns={columns} options={{
        destroy: true,
        language: {
          "processing": "Procesando...",
          "lengthMenu": "Mostrar _MENU_ registros",
          "zeroRecords": "No se encontraron resultados",
          "emptyTable": "Ningún dato disponible en esta tabla",
          "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
          "infoFiltered": "(filtrado de un total de _MAX_ registros)",
          "search": "Buscar:",
          "loadingRecords": "Cargando...",
          "aria": {
            "sortAscending": ": Activar para ordenar la columna de manera ascendente",
            "sortDescending": ": Activar para ordenar la columna de manera descendente"
          },
          //@ts-ignore
          "autoFill": {
            "cancel": "Cancelar",
            "fill": "Rellene todas las celdas con <i>%d<\/i>",
            "fillHorizontal": "Rellenar celdas horizontalmente",
            "fillVertical": "Rellenar celdas verticalmente"
          },
          "decimal": ",",
          "searchBuilder": {
            "add": "Añadir condición",
            "button": {
              "0": "Constructor de búsqueda",
              "_": "Constructor de búsqueda (%d)"
            },
            "clearAll": "Borrar todo",
            "condition": "Condición",
            "conditions": {
              "date": {
                "before": "Antes",
                "between": "Entre",
                "empty": "Vacío",
                "equals": "Igual a",
                "notBetween": "No entre",
                "not": "Diferente de",
                "after": "Después",
                "notEmpty": "No Vacío"
              },
              "number": {
                "between": "Entre",
                "equals": "Igual a",
                "gt": "Mayor a",
                "gte": "Mayor o igual a",
                "lt": "Menor que",
                "lte": "Menor o igual que",
                "notBetween": "No entre",
                "notEmpty": "No vacío",
                "not": "Diferente de",
                "empty": "Vacío"
              },
              "string": {
                "contains": "Contiene",
                "empty": "Vacío",
                "endsWith": "Termina en",
                "equals": "Igual a",
                "startsWith": "Empieza con",
                "not": "Diferente de",
                "notContains": "No Contiene",
                "notStartsWith": "No empieza con",
                "notEndsWith": "No termina con",
                "notEmpty": "No Vacío"
              },
              "array": {
                "not": "Diferente de",
                "equals": "Igual",
                "empty": "Vacío",
                "contains": "Contiene",
                "notEmpty": "No Vacío",
                "without": "Sin"
              }
            },
            "data": "Data",
            "deleteTitle": "Eliminar regla de filtrado",
            "leftTitle": "Criterios anulados",
            "logicAnd": "Y",
            "logicOr": "O",
            "rightTitle": "Criterios de sangría",
            "title": {
              "0": "Constructor de búsqueda",
              "_": "Constructor de búsqueda (%d)"
            },
            "value": "Valor"
          },
          "searchPanes": {
            "clearMessage": "Borrar todo",
            "collapse": {
              "0": "Paneles de búsqueda",
              "_": "Paneles de búsqueda (%d)"
            },
            "count": "{total}",
            "countFiltered": "{shown} ({total})",
            "emptyPanes": "Sin paneles de búsqueda",
            "loadMessage": "Cargando paneles de búsqueda",
            "title": "Filtros Activos - %d",
            "showMessage": "Mostrar Todo",
            "collapseMessage": "Colapsar Todo"
          },
          "select": {
            "cells": {
              "1": "1 celda seleccionada",
              "_": "%d celdas seleccionadas"
            },
            "columns": {
              "1": "1 columna seleccionada",
              "_": "%d columnas seleccionadas"
            },
            "rows": {
              "1": "1 fila seleccionada",
              "_": "%d filas seleccionadas"
            }
          },
          "thousands": ".",
          "datetime": {
            "previous": "Anterior",
            "hours": "Horas",
            "minutes": "Minutos",
            "seconds": "Segundos",
            "unknown": "-",
            "amPm": [
              "AM",
              "PM"
            ],
            "months": {
              "0": "Enero",
              "1": "Febrero",
              "10": "Noviembre",
              "11": "Diciembre",
              "2": "Marzo",
              "3": "Abril",
              "4": "Mayo",
              "5": "Junio",
              "6": "Julio",
              "7": "Agosto",
              "8": "Septiembre",
              "9": "Octubre"
            },
            "weekdays": {
              "0": "Dom",
              "1": "Lun",
              "2": "Mar",
              "4": "Jue",
              "5": "Vie",
              "3": "Mié",
              "6": "Sáb"
            },
            "next": "Próximo"
          },
          "editor": {
            "close": "Cerrar",
            "create": {
              "button": "Nuevo",
              "title": "Crear Nuevo Registro",
              "submit": "Crear"
            },
            "edit": {
              "button": "Editar",
              "title": "Editar Registro",
              "submit": "Actualizar"
            },
            "remove": {
              "button": "Eliminar",
              "title": "Eliminar Registro",
              "submit": "Eliminar",
              "confirm": {
                "_": "¿Está seguro de que desea eliminar %d filas?",
                "1": "¿Está seguro de que desea eliminar 1 fila?"
              }
            },
            "error": {
              "system": "Ha ocurrido un error en el sistema (<a target=\"\\\" rel=\"\\ nofollow\" href=\"\\\">Más información&lt;\\\/a&gt;).<\/a>"
            },
            "multi": {
              "title": "Múltiples Valores",
              "restore": "Deshacer Cambios",
              "noMulti": "Este registro puede ser editado individualmente, pero no como parte de un grupo.",
              "info": "Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, haga clic o pulse aquí, de lo contrario conservarán sus valores individuales."
            }
          },
          "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
          "stateRestore": {
            "creationModal": {
              "button": "Crear",
              "name": "Nombre:",
              "order": "Clasificación",
              "paging": "Paginación",
              "select": "Seleccionar",
              "columns": {
                "search": "Búsqueda de Columna",
                "visible": "Visibilidad de Columna"
              },
              "title": "Crear Nuevo Estado",
              "toggleLabel": "Incluir:",
              "scroller": "Posición de desplazamiento",
              "search": "Búsqueda",
              "searchBuilder": "Búsqueda avanzada"
            },
            "removeJoiner": "y",
            "removeSubmit": "Eliminar",
            "renameButton": "Cambiar Nombre",
            "duplicateError": "Ya existe un Estado con este nombre.",
            "emptyStates": "No hay Estados guardados",
            "removeTitle": "Remover Estado",
            "renameTitle": "Cambiar Nombre Estado",
            "emptyError": "El nombre no puede estar vacío.",
            "removeConfirm": "¿Seguro que quiere eliminar %s?",
            "removeError": "Error al eliminar el Estado",
            "renameLabel": "Nuevo nombre para %s:"
          },
          "infoThousands": "."
        },
      }} >
        <thead>
          <tr>
            <th>Dependencia</th>
            <th>Fecha</th>
            <th>Ingreso</th>
          </tr>
        </thead>
      </DataTable>
    </>
  )
}

export default VerIngreso