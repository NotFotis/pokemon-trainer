/* create a model to take data from the api  and to be able to manipulate them as needed*/

export interface Data{
    count: number;
    next: string;
    previous: string;
    results: Result[];
}

export interface Result{
    name:string;
    url:string;
}