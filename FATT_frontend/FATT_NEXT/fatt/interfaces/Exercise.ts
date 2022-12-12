export type Exercise = {
  Id: number;
  Name: string;
  Category: string;
  Intensity: string;
  Equipment: string;
  Repetitions: string;
  Sets: string;
  PicturePath: string;
  VideoPath: string;
};

export type ExerciseIds = {
  ExerciseIds: number[];
};

export type Exercises = {
  Data: Exercise[];
};

export type ExerciseNoIdDto = {
  Name: string;
  Category: string;
  Intensity: string;
  Equipment: string;
  Repetitions: string;
  Sets: string;
  PicturePath: string;
  VideoPath: string;
};

export type ExerciseFullDto = {
  Id: number;
  Name: string;
  Category: string;
  Equipment: string;
  Intensity: string;
  Repetitions: number;
  Sets: number;
  PicturePath: string;
  VideoPath: string;
};

export type ExerciseSimpleDto = {
  Id: number;
  Name: string;
};

export type ExerciseThumbnailDto = {
  Id: number;
  Category: string;
  PicturePath: string;
};

export type ExerciseUpdateDto = {
  Intensity: string;
  Reptitions: string;
  Sets: number;
};
