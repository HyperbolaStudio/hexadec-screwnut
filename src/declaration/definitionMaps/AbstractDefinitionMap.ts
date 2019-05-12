export interface AbstractDefinitionMap<ValueType>{
    [property:string]:ValueType;
}
export interface AnyMap extends AbstractDefinitionMap<any>{}