import { TuseDTA } from "@/utils/types/tables"

const useSetDTAContent = ({module, urlDelete, urlPut}: TuseDTA) => {
    const useDTAContent = {
        module: module,
        urlDelete: urlDelete,
        urlPut: urlPut
    }

    return useDTAContent
}

export default useSetDTAContent