export class SessionUtil{
    /* This util is made for use of the session storage of the browser */
    
    public static storageSave<T>(key: string, value: T): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    
    public static storageRead<T>(key: string): T | undefined {
        const storageValue = sessionStorage.getItem(key);
    
        try{
            if(storageValue) {                          //if storageValue has something
                return JSON.parse(storageValue) as T;   //return the storageValue in json format
            }
            //storageValue is empty
            return undefined;  //return undefined
    
        }catch(error){
            sessionStorage.removeItem(key); //remove the saved item
            return undefined; //return undefined
        }
    }
    public static storageRemove(key: string): void {
        sessionStorage.removeItem(key);
    }
}
