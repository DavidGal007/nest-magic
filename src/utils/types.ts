export type CreateUserProfileParams = {
    firstName: string;
    lastName: string;
    age: number;
    dob: string;
}

export type CreateUserPostParams = {
    title: string;
    desciption: string;
}

export type UserDetails = {
    email: string;
    displayName: string;
    isVerified: boolean;
    authStrategy: string;
    username: string;
    avatarPath: string;
    password: string
}