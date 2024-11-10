import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const SuccessAlert = (title?: string, text?: string | undefined, textBtn?: string | undefined, callBack?: () => void) => {
  MySwal.fire({
    title: <p>{title ? title : 'Genial!'}</p>,
    text: `${text ? text : ''}`,
    icon: 'success',
    iconColor: 'hsl(var(--nextui-success))',
    backdrop: false,
    background: 'hsl(var(--nextui-default-100))',
    color: 'hsl(var(--nextui-default-800))',
    confirmButtonText: `${textBtn ? textBtn : 'OK'}`,
    confirmButtonColor: 'hsl(var(--nextui-success))',
    focusConfirm: false,
    customClass: {
      popup: 'sweetAlertContainer',
    }
  }).then(() => {
    if (callBack)
      return callBack()
  })

  return (
    MySwal
  )
}

export const QuestionAlert = (title?: string, text?: string | undefined, textBtn?: string | undefined, callBack?: () => void) => {
  MySwal.fire({
    title: <p>{title ? title : 'Genial!'}</p>,
    text: `${text ? text : ''}`,
    icon: 'question',
    iconColor: 'hsl(var(--nextui-warning))',
    backdrop: false,
    background: 'hsl(var(--nextui-default-100))',
    color: 'hsl(var(--nextui-default-800))',
    showCancelButton: true,
    confirmButtonText: `${textBtn ? textBtn : 'OK'}`,
    confirmButtonColor: 'hsl(var(--nextui-warning))',
    cancelButtonText: 'Cancelar',
    focusConfirm: false,
    customClass: {
      popup: 'sweetAlertContainer',
    }
  }).then((result) => {
    if (callBack && result.isConfirmed)
      return callBack()
  })

  return (
    MySwal
  )
}



export const ErrorAlert = (title?: string, text?: string | undefined, textBtn?: string | undefined, callBack?: () => void) => {
  MySwal.fire({
    title: <p>{title ? title : 'Error'}</p>,
    text: `${text ? text : ''}`,
    icon: 'error',
    iconColor: 'hsl(var(--nextui-danger))',
    backdrop: false,
    background: 'hsl(var(--nextui-default-100))',
    color: 'hsl(var(--nextui-default-800))',
    confirmButtonText: `${textBtn ? textBtn : 'OK'}`,
    confirmButtonColor: 'hsl(var(--nextui-default-400))',
    focusConfirm: false,
    customClass: {
      popup: 'sweetAlertContainer',
    }
  }).then(() => {
    if (callBack)
      return callBack()
  })

  return (
    MySwal
  )
}