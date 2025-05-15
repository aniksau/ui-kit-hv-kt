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
    HvDialogTitle,
    HvDialogContent,
    HvDialogActions,
    HvSnackbar,
} from "@hitachivantara/uikit-react-core";
import './EmployeeList.css';
import { Employee } from "../../types/employees";
import axios from "axios";
import { APIS, endpoint } from "../../constants/endpoints";
import { Add, Caution, Delete, Edit } from "@hitachivantara/uikit-react-icons";
import { getRandomColorToken } from "../../constants/colors";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { parseFieldStatus } from "../../functions";
import { SnackbarType } from "../../types/snackbar";

const defaultValues: Employee = {
    firstName: "",
    lastName: "",
    designation: "",
    avatar: "",
    skills: []
};

const defaultSnackbar: SnackbarType = {
    open: false,
    variant: '',
    message: ''
}

const EmployeeList = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [openDialog, setOpenDialog] = useState(false);

    const [snackbar, setSnackbar] = useState(defaultSnackbar);

    const [targetEmployee, setTargetEmployee] = useState<Employee>({} as Employee);

    const { control, handleSubmit, reset, formState: { errors } } = useForm<Employee>({ defaultValues });
    const { fields, append, remove } = useFieldArray({ control, name: 'skills' });

    useEffect(() => {
        axios.get<Employee[]>(`${endpoint}/${APIS.employees}`)
            .then((res) => res.data)
            .then(setEmployees)
            .catch((err) => console.error("Failed to fetch employees:", err));
    }, []);

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const onSubmit = (data: Employee) => {
        axios.post<Employee>(`${endpoint}/${APIS.employees}`, data)
            .then(response => {
                setEmployees([...employees, response.data]);
                handleDialogClose();
                reset();
                setSnackbar({ open: true, variant: 'success', message: 'Employee added.' });
            })
            .catch(err => {
                setSnackbar({ open: true, variant: 'error', message: err?.response?.data?.errorMessage });
            });
    };

    const onEditEmployee = (emp: Employee) => {
        setTargetEmployee(emp);
        handleDialogOpen();
        reset(emp);
    };

    return (
        <>
            <HvGlobalActions
                variant="global"
                title="Employees"
                position="sticky"
                className="employee-action">
                <HvButton className="add-employee-btn" startIcon={<Add />} onClick={handleDialogOpen}>
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
                                <HvButton onClick={() => onEditEmployee(emp)} icon color="primary" style={{ marginRight: 8 }}><Edit /></HvButton>
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

                            {fields.map((field, index) => (
                                <HvGrid item key={`field${index}`} sm={12} className="skill-field-container">
                                    <Controller
                                        name={`skills.${index}.skill`}
                                        control={control}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: 'Enter a skill'
                                            }
                                        }}
                                        render={({ field }) => <HvInput
                                            {...field}
                                            label={`Skill ${index + 1}`}
                                            status={parseFieldStatus(errors.skills?.[index]?.skill)}
                                            statusMessage={errors.skills?.[index]?.skill?.message || ''}
                                        />}
                                    />
                                    <HvButton
                                        icon
                                        color="negative"
                                        variant="secondary"
                                        onClick={() => remove(index)}>
                                        <Delete />
                                    </HvButton>
                                </HvGrid>
                            ))}
                        </HvGrid>
                        <HvButton
                            onClick={() => append({ skill: '' })}
                            style={{ marginTop: 16 }}
                            variant="secondary"
                            startIcon={<Add />}
                        >Add Skill</HvButton>
                    </form>
                </HvDialogContent>
                <HvDialogActions>
                    <HvButton type="submit" form="addEmployee">Add</HvButton>
                    <HvButton variant="secondary" onClick={handleDialogClose} >Cancel</HvButton>
                </HvDialogActions>
            </HvDialog>
            <HvSnackbar
                label={snackbar?.message}
                variant={snackbar?.variant}
                showIcon
                open={snackbar.open}
                onClose={() => setSnackbar(defaultSnackbar)}
            />
        </>
    );
};

export default EmployeeList;
