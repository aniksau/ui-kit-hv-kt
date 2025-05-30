export interface Employee {
    id?: number;
    avatar?: string;
    firstName: string;
    lastName: string;
    designation: string;
    skills?: Skill[];
}

interface Skill {
    skill: string
}
