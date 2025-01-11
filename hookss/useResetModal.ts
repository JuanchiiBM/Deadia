const useResetModal = ({ setContentTable, setUpdate, onOpen}: any) => {
    const resetModal = () => {
        setContentTable(undefined)
        if (setUpdate)
        setUpdate(false)
        onOpen()
    }

    return resetModal
}

export default useResetModal