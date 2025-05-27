import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import EmployeeList from "./components/EmployeeList/EmployeeList";
import { Header } from "./components/common/Header";
import { Login } from "./components/Login";
import { Main } from "./components/common/Main";

export const RouterSetup = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const onLogin = () => {
        setIsAuthenticated(true);
    };

    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="login" />} />
                <Route path="/login" element={<Login loginHandler={onLogin} />} />
                <Route path="/main" element={<Main isAuthenticated={isAuthenticated} />}>
                    <Route path="/main/employee-list" element={<EmployeeList />} />
                </Route>
            </Routes>
        </>
    )
}