export const useResetModal = ({ setContentModal, setUpdate, onOpen}: any) => {
    const resetModal = () => {
        setContentModal(undefined)
        if (setUpdate)
        setUpdate(false)
        onOpen()
    }

    return { resetModal }
}