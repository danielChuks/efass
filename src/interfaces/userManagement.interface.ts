export interface User {
    username: string;
    password:string;
}

export interface UserResponse {
    responseMessage: string;
    responseCode: number;
    allUsers: User[];
}
