import {AbstractMap} from './AbstractMap'

interface State{
    name:string;
    value:any;
    bindPropName:string;
}

export interface StateMap extends AbstractMap<State>{}