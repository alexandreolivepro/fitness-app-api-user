interface Write<T> {
    create: (item: T, callback: (error: string, result: T) => void) => void;
    update: (_id: string, item: T) => Promise<T>;
    delete: (_id: string) => Promise<T>;
}

export = Write;
