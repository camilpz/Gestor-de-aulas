export interface Classroom{
    id: number,
    name: string,
    teachersId: number[],
    studentsId: number[],
    resourcesIds: number[]
}

export interface Teacher{
    id: number,
    name: string,
    subject: string
}

export interface Student{
    id: number,
    name: string,
    age: number
}

export interface Resource{
    id: number,
    name: string,
    quantity: {
        total: number,
        available: number,
        inUse: number,
        underMaintenance: number
    }
}