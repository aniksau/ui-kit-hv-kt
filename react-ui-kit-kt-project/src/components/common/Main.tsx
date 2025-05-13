import { useEffect, useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { Header } from "./Header";

export const Main = ({ isAuthenticated }: {isAuthenticated: boolean}) => {

    useEffect(() => console.log('On Main page'), []);

    return <>
        <Header />
        { isAuthenticated ? <Outlet /> : <Navigate to="/login" replace /> }
    </>
};
