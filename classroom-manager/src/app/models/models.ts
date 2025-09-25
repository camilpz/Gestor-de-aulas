export interface Classroom{
    id: string,
    name: string,
    teachersId: string[],
    studentsId: number[],
    resourcesIds?: number[],
    resources?: Array<{
        id: string,
        name: string,
        quantity: {
            total: number,
            available: number,
            inUse: number,
            underMaintenance: number
        }
    }>
}

export interface Teacher{
    id: string,
    name: string,
    subject: string
}

export interface Student{
    id: string,
    name: string,
    age: number
}

export interface Resource{
    id: string,
    name: string,
    quantity: {
        total: number,
        available: number,
        inUse: number,
        underMaintenance: number
    }
}