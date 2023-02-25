export class StorageUtil{
    
    public static storageSave<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
    
    public static storageRead<T>(key: string): T | null {
        const storageValue = localStorage.getItem(key);
    
        try{
            if(storageValue) {                          //if storageValue has something
                return JSON.parse(storageValue) as T;   //return the storageValue in json format
            }
            //storageValue is empty
            return null;  //return null
    
        }catch(error){
            localStorage.removeItem(key); //remove the saved item
            return null;
        }
    }
}
