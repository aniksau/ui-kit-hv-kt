import { useEffect, useState } from "react";
import {
    HvCard,
    HvCardContent,
    HvCardHeader,
    HvButton,
    HvTypography,
    HvGrid,
    HvAvatar,
    HvTag,
    HvActionBar,
    HvGlobalActions,
    HvBanner,
} from "@hitachivantara/uikit-react-core";
import './EmployeeList.css';
import { Employee } from "../../types/employees";
import axios, { AxiosError } from "axios";
import { Add, Caution, Delete, Edit } from "@hitachivantara/uikit-react-icons";
import { getRandomColorToken } from "../../constants/colors";
import { SnackbarType } from "../../types/snackbar";
import { API_URL, ENDPOINTS } from "../../constants/endpoints";
import { EmployeeFormDialog } from "../EmployeeFormDialog/EmployeeFormDialog";
import { useDispatch, useSelector } from "react-redux";
import { setEmployees } from "../../store/employeeListSlice";
import { RootState } from "../../store/store";
import { setEmployeeToEdit } from "../../store/employeeToEditSlice";

const defaultBanner: SnackbarType = {
    open: false,
    variant: '',
    message: ''
}

const EmployeeList = () => {
    const [employeeFetchError, setEmployeeFetchError] = useState(defaultBanner)
    const [employeeDialog, setEmployeeDialog] = useState(false);
    const dispatch = useDispatch();
    const employees = useSelector((state: RootState) => state.employeeList?.employeeList);

    useEffect(() => {
        getEmployees();
    }, []);

    const getEmployees = () => {
        axios.get<Employee[]>(`${API_URL}/${ENDPOINTS.employees}`)
            .then(response => {
                dispatch(setEmployees(response.data));
            })
            .catch((error: AxiosError) => {
                setEmployeeFetchError({
                    open: true,
                    variant: 'error',
                    message: `Unable to fetch employees ${error?.response?.data}`
                });
            });
    };

    const dialogOpenHandler = () => {
        setEmployeeDialog(true);
    };

    const dialogCloseHandler = () => {
        setEmployeeDialog(false);
    };

    const onEditEmployee = (emp: Employee) => {
        dispatch(setEmployeeToEdit(emp));
        dialogOpenHandler();
    };

    return (
        <>
            <HvBanner
                label={employeeFetchError.message}
                variant="error"
                showIcon
                onClose={() => setEmployeeFetchError(defaultBanner)}
                open={employeeFetchError.open}
            />
            <HvGlobalActions
                variant="global"
                title="Employees"
                position="sticky"
                className="employee-action">
                <HvButton className="add-employee-btn" startIcon={<Add />} onClick={() => dialogOpenHandler()}>
                    Add
                </HvButton>
            </HvGlobalActions>

            <HvGrid container>
                {employees.map((emp) => (
                    <HvGrid item key={emp.id} xs={12} sm={6} md={4}>
                        <HvCard bgcolor="atmo1" statusColor={getRandomColorToken()}>
                            <HvCardHeader
                                title={
                                    <div className="employee-title-container">
                                        <div>
                                            <HvTypography variant="title3">{`${emp.firstName} ${emp.lastName}`}</HvTypography>
                                            <HvTypography variant="caption1">{emp.designation}</HvTypography>
                                        </div>
                                        <HvAvatar size="lg" alt={`${emp.firstName}${emp.lastName}`} src={emp.avatar} />
                                    </div>
                                }
                            />
                            <HvCardContent>
                                <HvTypography variant="label">Skills</HvTypography>
                                {emp?.skills?.length ?
                                    <ul className="skill-list">
                                        {emp?.skills?.map((item, index) => (
                                            <li key={`skill${index}`}>
                                                <HvTag label={item.skill} size="md" color={getRandomColorToken()} />
                                            </li>
                                        ))}
                                    </ul>
                                    :
                                    <div className="no-skills-message">
                                        <Caution color='warning' size='sm' />
                                        <HvTypography variant="caption1">
                                            No skill available.
                                        </HvTypography>
                                    </div>
                                }

                            </HvCardContent>
                            <HvActionBar>
                                <HvButton
                                    onClick={() => onEditEmployee(emp)}
                                    icon
                                    color="primary"
                                    style={{ marginRight: 8 }}>
                                    <Edit />
                                </HvButton>
                                <HvButton onClick={() => { }} icon color="negative">
                                    <Delete />
                                </HvButton>
                            </HvActionBar>
                        </HvCard>
                    </HvGrid>
                ))}
            </HvGrid>

            <EmployeeFormDialog
                isOpen={employeeDialog}
                dialogCloseHandler={dialogCloseHandler}
            />
        </>
    );
};

export default EmployeeList;
