export interface AttrStorage{
    bindStateName:string;
    onChanged:(newVal:string,oldVal:string) => void;
}