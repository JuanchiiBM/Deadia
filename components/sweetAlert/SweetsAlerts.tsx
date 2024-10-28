import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const SuccessAlert = (title?: string, text?: string, textBtn?: string, callBack?: () => void) => {
  MySwal.fire({
    title: <p>{title ? title : 'Genial!'}</p>,
    text: `${text ? text : ''}`,
    icon: 'success',
    backdrop: false,
    background: '#CDE2E7',
    color: 'black',
    confirmButtonText: `${textBtn ? textBtn : 'OK'}`,
    confirmButtonColor: '#a5dc86',
    focusConfirm: false,
    customClass: {
      popup: 'sweetAlertContainer',
      confirmButton: 'sweetAlertConfirm'
    }
  }).then(() => {
    if (callBack)
      return callBack()
  })

  return (
    MySwal
  )
}


export const ErrorAlert = (title?: string, text?: string, textBtn?: string, callBack?: () => void) => {
  MySwal.fire({
    title: <p>{title ? title : 'Error'}</p>,
    text: `${text ? text : ''}`,
    icon: 'error',
    iconColor: '#b83e3a',
    backdrop: false,
    background: '#CDE2E7',
    color: 'black',
    confirmButtonText: `${textBtn ? textBtn : 'OK'}`,
    confirmButtonColor: '#cccccc',
    focusConfirm: false,
    customClass: {
      popup: 'sweetAlertContainer',
      confirmButton: 'sweetAlertConfirm sweetAlertConfirmLight'
    }
  }).then(() => {
    if (callBack)
      return callBack()
  })

  return (
    MySwal
  )
}