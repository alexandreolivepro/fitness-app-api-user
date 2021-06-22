import { Document, ObjectId } from 'mongoose';

interface UsersModel extends Document {
    firstname: string;
    lastname: string;
    password: string;
    username: string;
    email: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export = UsersModel;
