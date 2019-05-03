import {AbstractDefinitionMap} from './AbstractDefinitionMap'

interface State{
    name:string;
    value:any;
    bindPropName:string;
}

export interface StateMap extends AbstractDefinitionMap<State>{}