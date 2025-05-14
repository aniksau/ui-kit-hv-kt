let employees = [
    {
        id: 1,
        avatar: `https://randomuser.me/api/portraits/men/1.jpg`,
        firstName: 'Avik',
        lastName: 'Mukherjee',
        designation: 'Trainee Engineer',
        skills: [{ skill: 'Linux' }, { skill: 'Perl' }]
    },
    {
        id: 2,
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        firstName: 'Pavan',
        lastName: 'Subbarao',
        designation: 'Manager',
        skills: [{ skill: 'Jira' }, { skill: 'Management' }]
    },
    {
        id: 3,
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        firstName: 'Jatin',
        lastName: 'Maheshwari',
        designation: 'Senior Engineer',
        skills: [{ skill: 'Java' }, { skill: 'Maven' }]
    }
];

const getRandomInt = () => {
    const min = 1;
    const max = 99;
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    if (employees.some(emp => emp.id === num)) getRandomInt();
    else return num;
};


exports.getAllEmployees = (req, res) => res.json(employees);

exports.getEmployeeById = (req, res) => {
    const employee = employees.find(e => e.id === parseInt(req.params.id));
    if (!employee) return res.status(404).send('Employee not found');
    res.json(employee);
};

exports.createEmployee = (req, res) => {
    const id = getRandomInt();
    const avatar = `https://randomuser.me/api/portraits/men/${id}.jpg`;
    const newEmployee = { ...req.body, id, avatar, };
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
