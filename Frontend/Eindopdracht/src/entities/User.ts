
export default class User {
    public username: string;
    public token: string;
    public email?: string;
    public city?: string;
    public address?: string;

    public constructor(
            username: string, 
            token: string,
            email?: string,
            address?: string
    ) {
        this.username = username;
        this.token = token;
        this.email = email;
        this.address = address;
    }
}
