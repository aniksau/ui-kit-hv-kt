import { HvButton, HvInput, HvLogin, HvTypography } from "@hitachivantara/uikit-react-core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = ({ loginHandler }: { loginHandler: any }) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    const onLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (credentials.username === 'admin' && credentials.password === 'abcd123') {
            loginHandler();
            navigate("/main/employee-list");
        } else {
            alert('Invalid credentials!');
        }
    };

    return <HvLogin background="https://lumada-design.github.io/assets/login-bg1.png" >
        <form
            className="grid gap-sm w-300px m-auto pt-150px"
            onSubmit={onLoginSubmit}
        >
            <HvTypography variant="title2">
                Welcome
            </HvTypography>
            <HvInput
                className="h-90px"
                label="Username"
                name="username"
                placeholder="Enter text"
                required
                onChange={(event) => setCredentials({ ...credentials, username: event?.target?.value })}
            />
            <HvInput
                className="h-90px"
                label="Password"
                name="password"
                placeholder="Enter text"
                required
                type="password"
                onChange={(event) => setCredentials({ ...credentials, password: event?.target?.value })}
            />
            <HvButton
                className="w-120px justify-self-end mt-sm"
                type="submit"
                variant="primary"
            >
                Login
            </HvButton>
        </form>
    </HvLogin>

};