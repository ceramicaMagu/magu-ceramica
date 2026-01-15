import { RootState } from "@/state/redux/store";
import { StatusItem } from "@/types/redux";
import { useSelector } from "react-redux";

interface Props {
    slice: 'auth' | 'shop',
    key: string
}

const useReduxStatus = ({ slice, key }: Props) => {
    const selectorStatus = useSelector((state: RootState) => state[slice]).status?.[key]
    const emptyStatus: StatusItem = { response: '', message: '', loading: false }

    return selectorStatus ?? emptyStatus
};

export default useReduxStatus;