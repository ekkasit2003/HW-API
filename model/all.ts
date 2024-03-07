export interface Movie {
    mid:         number;
    title:       string;
    genre:       string;
    duration:    string;
    rating:      number;
    description: string;
}

export interface Person {
    pid:        number;
    name:       string;
    birthday:   string;
    gerder:     string;
    occupation: string;
    biography:  string;
}

export interface Star {
    MovieID:  number;
    PersonID: number;
    role:     string;
}

export interface Creators {
    MovieID:  number;
    PersonID: number;
    role:     string;
}
