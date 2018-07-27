class User {
    id: number;
    uid: String;
    firstName: String;
    lastName: String;
    mail: String;
    password: String;

    public constructor(firstName: String, lastName: String) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

export default User;
