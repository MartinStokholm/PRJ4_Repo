export type Workout = {
    id: number | null;
    name: string;
    category: string;
    intensity: string;
};

export type Workouts = {
    data: Workout[];
}