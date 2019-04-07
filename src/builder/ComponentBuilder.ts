import {ViewTemplate} from './ViewTemplate';
import {SlotMap} from './slot/SlotMap';
import {AttrMap} from './attr/AttrMap';
import { BasicTypes } from '../BasicTypes';
export abstract class ComponentBuilder{
    slotMap:SlotMap = {};
    attrMap:AttrMap = {};
    abstract build():ViewTemplate;
}