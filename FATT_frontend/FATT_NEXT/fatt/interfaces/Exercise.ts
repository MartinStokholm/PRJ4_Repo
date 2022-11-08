export type Exercise = {
    id: number 
    name: string
    category: string
    durantion: number
    intensity: number
    repetitions: number
    sets: number
    picturePath: string;
    videoPath: string;
};

export type ExerciseIds = {
    exerciseIds: number[];
}

export type Exercises = {
    data: Exercise[];
}

export type ExerciseCreateNoIdDto = {
    name: string
    category: string
    durantion: number
    intensity: number
    repetitions: number
    sets: number
    picturePath: string;
    videoPath: string;
};

export type ExerciseFullDto = {
    id: number 
    name: string
    category: string
    durantion: number
    intensity: number
    repetitions: number
    sets: number
    picturePath: string;
    videoPath: string;
};


export type ExerciseSimpleDto = {
    id: number;
    name: string;
};

export type ExerciseThumbnailDto = {
    name: string;
    category: string;
    picturePath: string;
};

export type ExerciseUpdateDto = {
    intensity: string;
    reptitions: string;
    sets: number;
}