"use client"

import React from 'react'
import DataTable from 'datatables.net-react';
import '../../styles/dataTables.css'
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import { UseDisclosureProps } from '@nextui-org/react';
import SpinnerForTables from '@/components/spinnerTables/SpinnerForTables';
import SpinnerC from '@/components/spinner/Spinner';
import { IRegister } from '@/helpers/interfaces';
import { useJsonData } from '@/hooks/useJsonData';
import { useDataTableInscription } from '@/hooks/useDTInscription';
import { useDataTableActionsInscription } from '@/hooks/useDTAInscription';

DataTable.use(DT);

interface IDataTable extends UseDisclosureProps {
    setContentModal: React.Dispatch<React.SetStateAction<IRegister | any>>
    dateSelected: any[] | undefined
}

const DataTableRegistrarIngreso: React.FC<IDataTable> = ({ onOpen, setContentModal, dateSelected }) => {
    const {isLoading, jsonData} = useJsonData({url: `api/income/register?start_date=${dateSelected && dateSelected[0]}&end_date=${dateSelected && dateSelected[1]}`})
    const {tableData, columnsData} = useDataTableInscription({jsonData: jsonData})
    const {showSpinner} = useDataTableActionsInscription({ tableData: tableData, setContentModal: setContentModal, onOpen: onOpen})

    return (
        <div className='bg-background-200 rounded-lg'>
            {showSpinner && <SpinnerC />}
            {isLoading == true ?
                <SpinnerForTables /> :
                <DataTable data={tableData} className='order-column text-sm' columns={columnsData} options={{
                    destroy: true,
                    responsive: true,
                    language: {
                        url: '../dataTableLanguaje.json',
                    },
                }} >
                    <thead>
                        <tr>
                            {columnsData.map((col, index) => (
                                <th className='truncate' key={index}>{col.data}</th>
                            ))}
                        </tr>
                    </thead>
                </DataTable>
            }
        </div>
    )
}

export default DataTableRegistrarIngreso

/*
const [tableData, setTableData] = useState<any>(undefined)
    const [tableColumns, setTableColumns] = useState([
        { data: 'dni', title: 'DNI' },
        { data: 'nombre', title: 'Nombre' },
        { data: 'categoria', title: 'Categoría' },
        { data: 'dependencia', title: 'Dependencia' },
        { data: 'curso', title: 'Curso' },
        { data: 'aula', title: 'Aula' },
        { data: 'fecha', title: 'Fecha' },
        { data: 'monto', title: 'Monto' },
        { data: 'acciones', title: 'Acciones' }
    ]);
    const [showSpinner, setShowSpinner] = useState(false)

    const initializeDataTable = async () => {
        if (dateSelected) {
            setTableLoader(true)
            const jsonData = await GETFunction(`api/income/register?start_date=${dateSelected[0]}&end_date=${dateSelected[1]}`, setTableLoader) as IRegisters
            nextTableData = jsonData.list.map((dato) => ({
                id: dato.id,
                usuario: dato.usuario,
                dni: dato.dni_alumno,
                grado: dato.dni_alumno,
                nombre: dato.nom_alumno,
                mail: dato.mail,
                categoria: dato.dni_alumno, //dato.categoria == 'Militar' ? `${dato.categoria} (${dato.grado})` : `${dato.categoria}`,
                categoriaSinGrado: dato.dni_alumno,
                dependencia: dato.dependencia,
                curso: dato.curso,
                aula: dato.aula,
                fecha: dato.fec_compra,
                monto: dato.monto,
                acciones: () => {
                    return ReactDOMServer.renderToString(
                        <div id={`actions-${dato.id}`} style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                            <button className="edit-btn btn-sigma" id={`edit-btn-${dato.id}`}>
                                <FontAwesomeIcon icon={faPenToSquare} className="text-2xl text-default-400" /></button>
                            <button className="delete-btn btn-sigma" id={`delete-btn-${dato.id}`}> <FontAwesomeIcon icon={faTrashCan} className="text-2xl text-default-400" /> </button>
                        </div>
                    );
                }
            }))
            setTimeout(() => {
                setTableData(nextTableData)
            }, 100)
        }
    }

    const deleteRegister = (dato: IRegister) => {
        QuestionAlert('Borrar registro', 'Esta usted seguro de proceder con la accion?', 'Confirmar', async () => {
            setShowSpinner(true)
            const response = await DELETEFunction(`api/income/register/${dato.id}`)
            console.log(response)
            setShowSpinner(false)
            if (response.status == 'ok') {
                SuccessAlert('Exito', 'Registro eliminado correctamente')
                initializeDataTable()
            } else {
                ErrorAlert('Error', response.error)
            }
        })
    }

    const hydrateActions = () => {
        Array.from(document.getElementsByClassName('dt-paging-button')).forEach((button) => button.addEventListener('click', () => hydrateActions()))
        Array.from(document.getElementsByClassName('dt-input')).forEach((button) => button.addEventListener('change', () => hydrateActions()))
        if (tableData != undefined) {
            tableData.forEach((dato: IRegister) => {
                document.getElementById(`edit-btn-${dato.id}`)?.addEventListener('click', () => setContentModal(dato))
                document.getElementById(`delete-btn-${dato.id}`)?.addEventListener('click', () => deleteRegister(dato))
                if (onOpen)
                    document.getElementById(`edit-btn-${dato.id}`)?.addEventListener('click', () => onOpen())
            })
        }
    }

    useEffect(() => {
        if (dateSelected) {
            initializeDataTable()
        }
    }, [dateSelected])

    useEffect(() => {
        if (dateSelected) {
            hydrateActions()
        }
    }, [tableData])
    */