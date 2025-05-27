import { useEffect, useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { Header } from "./Header";
import { Container } from "@mui/material";

export const Main = ({ isAuthenticated }: { isAuthenticated: boolean }) => {

    useEffect(() => console.log('On Main page'), []);

    return <Container maxWidth="xl">
        <Header />
        {isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />}
    </Container>
};
