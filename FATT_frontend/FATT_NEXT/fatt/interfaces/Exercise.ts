export type Exercise = {
    id: number | null
    name: string
    category: string
    durantion: number
    intensity: number
    repetitions: number
    sets: number
};

export type Exercises = {
    data: Exercise[];
}