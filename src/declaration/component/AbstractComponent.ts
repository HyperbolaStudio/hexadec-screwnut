import {PropMap} from '../definitionMaps/PropMap'
import { StateMap } from '../definitionMaps/StateMap';
abstract class AbstractComponent{
    abstract build():any;
    abstract state():StateMap;
    abstract prop():PropMap;
}