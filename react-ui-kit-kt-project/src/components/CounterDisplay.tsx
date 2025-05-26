import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const CounterDisplay = () => {

    const count = useSelector((state: RootState) => {
        return state.counter.value;
    })

    return (
        <>
            Counter value:{count}
            <br />
            <br />
        </>
    )
};