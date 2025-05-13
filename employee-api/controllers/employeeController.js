let employees = [
    {
        id: 1,
        avatar: `https://randomuser.me/api/portraits/men/1.jpg`,
        firstName: 'Avik',
        lastName: 'Mukherjee',
        designation: 'Trainee Engineer',
        skills: ['Linux', 'Perl']
    },
    {
        id: 2,
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        firstName: 'Pavan',
        lastName: 'Subbarao',
        designation: 'Manager',
        skills: ['Jira', 'Management']
    },
    {
        id: 3,
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        firstName: 'Jatin',
        lastName: 'Maheshwari',
        designation: 'Senior Engineer',
        skills: ['Java', 'Apache']
    }
];

exports.getAllEmployees = (req, res) => res.json(employees);

exports.getEmployeeById = (req, res) => {
    const employee = employees.find(e => e.id === parseInt(req.params.id));
    if (!employee) return res.status(404).send('Employee not found');
    res.json(employee);
};

exports.createEmployee = (req, res) => {
    const id = employees.length + 1;
    const avatar = `https://randomuser.me/api/portraits/men/${id}.jpg`;
    const newEmployee = { id, avatar, ...req.body };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
};

exports.updateEmployee = (req, res) => {
    const index = employees.findIndex(e => e.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Employee not found');
    employees[index] = { ...employees[index], ...req.body };
    res.json(employees[index]);
};

exports.deleteEmployee = (req, res) => {
    employees = employees.filter(e => e.id !== parseInt(req.params.id));
    res.sendStatus(204);
};
