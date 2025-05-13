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
    HvDialog,
    HvInput,
    HvBox,
    HvDialogTitle,
    HvDialogContent,
    HvDialogActions
} from "@hitachivantara/uikit-react-core";
import './EmployeeList.css';
import { Employee } from "../../types/employees";
import axios from "axios";
import { APIS, endpoint } from "../../constants/endpoints";
import { Add, Delete, Edit } from "@hitachivantara/uikit-react-icons";
import { getRandomColorToken } from "../../constants/colors";
import { useForm, Controller } from "react-hook-form";
import { parseFieldStatus } from "../../functions";

const EmployeeList = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [openDialog, setOpenDialog] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<Employee>({
        defaultValues: {
            firstName: "",
            lastName: "",
            designation: "",
            avatar: "",
            skills: []
        }
    });

    useEffect(() => {
        axios.get<Employee[]>(`${endpoint}/${APIS.employees}`)
            .then((res) => res.data)
            .then(setEmployees)
            .catch((err) => console.error("Failed to fetch employees:", err));
    }, []);

    const handleAddClick = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const onSubmit = (data: Employee) => {
        console.log("Submitted employee:", data);
        handleDialogClose();
    };

    return (
        <>
            <HvGlobalActions
                variant="global"
                title="Employee"
                position="sticky"
                className="employee-action">
                <HvButton className="add-employee-btn" startIcon={<Add />} onClick={handleAddClick}>
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
                                <ul className="skill-list">
                                    {emp.skills.map((skill, index) => (
                                        <li key={`skill${index}`}>
                                            <HvTag label={skill} size="md" color={getRandomColorToken()} />
                                        </li>
                                    ))}
                                </ul>
                            </HvCardContent>
                            <HvActionBar>
                                <HvButton onClick={() => { }} icon color="primary" style={{ marginRight: 8 }}><Edit /></HvButton>
                                <HvButton onClick={() => { }} icon color="negative"><Delete /></HvButton>
                            </HvActionBar>
                        </HvCard>
                    </HvGrid>
                ))}
            </HvGrid>

            <HvDialog
                open={openDialog}
                onClose={handleDialogClose}
                fullWidth
            >
                <HvDialogTitle>Add New Employee</HvDialogTitle>
                <HvDialogContent>
                    <form id="addEmployee" onSubmit={handleSubmit(onSubmit)}>
                        <HvGrid container spacing="sm">
                            <HvGrid item xs={12}>
                                <Controller
                                    name="firstName"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Enter first name'
                                        }
                                    }}
                                    render={({ field }) => <HvInput
                                        {...field}
                                        label="First Name*"
                                        status={parseFieldStatus(errors?.firstName)}
                                        statusMessage={errors.firstName?.message || ''}
                                    />}
                                />
                            </HvGrid>
                            <HvGrid item xs={12}>
                                <Controller
                                    name="lastName"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Enter last name'
                                        }
                                    }}
                                    render={({ field }) => <HvInput
                                        {...field}
                                        label="Last Name*"
                                        status={parseFieldStatus(errors?.lastName)}
                                        statusMessage={errors.lastName?.message || ''}
                                    />}
                                />
                            </HvGrid>
                            <HvGrid item xs={12}>
                                <Controller
                                    name="designation"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Enter designation'
                                        }
                                    }}
                                    render={({ field }) => <HvInput
                                        {...field}
                                        label="Designation*"
                                        status={parseFieldStatus(errors?.designation)}
                                        statusMessage={errors.designation?.message || ''}
                                    />}
                                />
                            </HvGrid>
                        </HvGrid>
                    </form>
                </HvDialogContent>
                <HvDialogActions>
                    <HvButton type="submit" form="addEmployee">Add</HvButton>
                    <HvButton variant="secondary" onClick={handleDialogClose} >Cancel</HvButton>
                </HvDialogActions>
            </HvDialog>
        </>
    );
};

export default EmployeeList;
