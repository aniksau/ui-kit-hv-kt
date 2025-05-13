import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import EmployeeList from "./components/EmployeeList/EmployeeList";
import { Header } from "./components/common/Header";

export const RouterSetup = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const onLogin = () => {
        setIsAuthenticated(true);
    };


    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<EmployeeList />} />
                {/* <Route path="/" element={<Navigate to="login" />} />
            <Route path="/login" element={<Login loginHandler={onLogin} />} />
            <Route path="/main" element={<Main isAuthenticated={isAuthenticated} />}>

            </Route> */}
            </Routes>
        </>
    )
}