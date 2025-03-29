export function storeInSessionStorage<IUser>(key: string, data: IUser): void {
    try {
        const jsonData = JSON.stringify(data);
        sessionStorage.setItem(key, jsonData);
    } catch (error) {
        throw error
    }
}
export function getFromSessionStorage<IUser>(key: string): IUser |null{
    try {
        const storedData = sessionStorage.getItem(key);
        if (storedData) {
            return JSON.parse(storedData) ;
        }
        return null;
    } catch (error) {
        throw error
        return null;
    }
}
export function updateSessionStorage<IUser>(key: string, newData: Partial<IUser>): void {
    try {
        const existingData = sessionStorage.getItem(key);
        const parsedData = existingData ? JSON.parse(existingData) : {};
        const updatedData = { ...parsedData, ...newData };
        sessionStorage.setItem(key, JSON.stringify(updatedData));
    } catch (error) {
        throw error
    }
}
export function updateLocalStorage(newData:any): void {
    const key = 'user'
    try {
        const existingData = localStorage.getItem(key);
        const parsedData = existingData ? JSON.parse(existingData) : {};
        const updatedData = { ...parsedData, ...newData };
        localStorage.setItem(key, JSON.stringify(updatedData));
    } catch (error) {
        throw error
    }
}
