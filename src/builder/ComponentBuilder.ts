import {ViewTemplate} from './ViewTemplate';
import {SlotMap} from './slot/SlotMap';
import {AttrMap} from './attr/AttrMap';
abstract class ComponentBuilder{
    slotMap:SlotMap = {};
    attrMap:AttrMap = {};
    abstract build():ViewTemplate;
}