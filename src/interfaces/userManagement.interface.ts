export interface Users {
    username: string;
    password: string;
    role: string;
}
export interface UsersList {
    allUsers: Users[];
    responseCode: number;
    responseMessage: string;
}