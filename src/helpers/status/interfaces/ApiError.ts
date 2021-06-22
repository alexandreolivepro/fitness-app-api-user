import Message from './Message';

interface ApiError {
    status: { messages: Message[] };
}

export = ApiError;
