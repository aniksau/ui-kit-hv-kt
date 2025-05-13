import { HvButton } from "@hitachivantara/uikit-react-core";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRoute = (props: any) => {
    const navigate = useNavigate();



    return <>
        <p>Global area</p>
        {props?.isAuthenticated ? <Outlet /> : <>Not logged in</>}     
    </>
};