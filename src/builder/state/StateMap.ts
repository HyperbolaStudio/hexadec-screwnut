import {StateStorage} from './StateStorage'
export interface StateMap{
    [property:string]:StateStorage;
}