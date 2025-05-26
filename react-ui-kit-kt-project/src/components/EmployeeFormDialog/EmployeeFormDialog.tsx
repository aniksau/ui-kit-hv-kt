import { HvButton, HvDialog, HvDialogActions, HvDialogContent, HvDialogTitle, HvGrid, HvInput } from "@hitachivantara/uikit-react-core";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Employee } from "../../types/employees";
import { parseFieldStatus } from "../../functions";
import axios from "axios";
import { API_URL, ENDPOINTS } from "../../constants/endpoints";
import { Add, Delete } from "@hitachivantara/uikit-react-icons";
import './EmployeeFormDialog.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { resetEmployeeToEdit } from "../../store/employeeToEditSlice";
import { setEditedEmployee, setNewEmployee } from "../../store/employeeListSlice";

const defaultValues: Employee = {
    firstName: '',
    lastName: '',
    designation: '',
    skills: []
};

export const EmployeeFormDialog = (
    { isOpen,
        dialogCloseHandler,
    }: {
        isOpen: boolean,
        dialogCloseHandler: () => void
    }) => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<Employee>({ defaultValues });
    const { fields, append, remove } = useFieldArray({ control, name: 'skills' });

    const dispatch = useDispatch();

    const employeeDetails = useSelector((state: RootState) => state?.employeeToEdit?.targetEmployee);

    useEffect(() => {
        reset(employeeDetails);
    }, [JSON.stringify(employeeDetails)]);

    const formSubmitHandler = (data: Employee) => {
        employeeDetails?.id ? editHandler(data) : addHandler(data);
    };

    const addHandler = (data: Employee) => {
        axios.post(`${API_URL}/${ENDPOINTS.employees}`, data)
            .then(newEmployeeResponse => {
                reset(defaultValues);
                dispatch(setNewEmployee(newEmployeeResponse?.data));
                dialogCloseHandler();

            })
            .catch(error => { console.log('Failed to add') });
    };

    const editHandler = (data: Employee) => {
        axios.put(`${API_URL}/${ENDPOINTS.employees}/${employeeDetails.id}`, data)
            .then(editedEmployeeResponse => {
                onDialogClose();
                dispatch(resetEmployeeToEdit());
                dispatch(setEditedEmployee(editedEmployeeResponse?.data));
                dialogCloseHandler();
            })
            .catch(error => { console.log('Failed to edit') });
    };

    const onDialogClose = () => {
        reset(defaultValues);
        dialogCloseHandler();
    };

    return (
        <HvDialog
            open={isOpen}
            onClose={onDialogClose}
            fullWidth
        >
            <HvDialogTitle>
                {employeeDetails?.id ? 'Edit Employee' : 'Add New Employee'}
            </HvDialogTitle>
            <HvDialogContent>
                <form id="addEmployee" onSubmit={handleSubmit(formSubmitHandler)}>
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
                <HvButton type="submit" form="addEmployee">{employeeDetails.id ? 'Submit' : 'Add'}</HvButton>
                <HvButton variant="secondary" onClick={dialogCloseHandler} >Cancel</HvButton>
            </HvDialogActions>
        </HvDialog>
    )
};