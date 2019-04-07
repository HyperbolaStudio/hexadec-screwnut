import {SlotStorage} from './SlotStorage'
import { attr } from '../../decorators/attr';
export interface SlotMap{
    [property:string]:SlotStorage
}