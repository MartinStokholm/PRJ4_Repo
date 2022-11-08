export type Account = {
    id?: number | null 
    name: string
    weigth: number
    gender: string
    age: number
    email: string
}

export type Accounts = {
    data: Account[];
}
