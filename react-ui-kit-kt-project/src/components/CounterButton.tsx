import { HvButton, HvGrid, HvInput } from "@hitachivantara/uikit-react-core";
import { useDispatch } from "react-redux";
import { decrement, increment, incrementByValue } from "../store/counterSlice";
import { useState } from "react";

export const CounterButton = () => {

    const dispatch = useDispatch();

    const [value, setValue] = useState(0);

    return (
        <>
            <HvGrid container spacing={1}>
                <HvGrid item>
                    <HvButton onClick={() => dispatch(increment())}>
                        Increment
                    </HvButton>
                </HvGrid>
                <HvGrid item>
                    <HvButton variant="secondary" onClick={() => dispatch(decrement())}>
                        Decrement
                    </HvButton>
                </HvGrid>
                <HvGrid item>
                    <HvInput type="number" onChange={(e) => setValue(Number(e?.target?.value))} />
                    <HvButton onClick={() => dispatch(incrementByValue(value))}>Increment by {value}</HvButton>
                </HvGrid>
            </HvGrid>
        </>
    );
};