
export function storeInSessionStorage<IUser>(key: string, data: IUser): void {
    try {
        const jsonData = JSON.stringify(data);
        sessionStorage.setItem(key, jsonData);
    } catch (error) {
        console.error("Error storing data in sessionStorage:", error);
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
        console.error("Error retrieving data from sessionStorage:", error);
        return null;
    }
}
