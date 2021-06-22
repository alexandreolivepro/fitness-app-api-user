interface FiltersUser {
    username?: string;
    email?: string;
    firstname?: string;
    lastname?: string;
    role?: string;
    search?: string;
}

export type ListObjectUser = 'username' | 'email' | 'firstname' | 'lastname' | 'role';

export default FiltersUser;
