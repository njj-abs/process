import { map } from '@laufire/utils/collection';
import types from './types';

const process = (data) => map(data, (value) => types[value.type](value));

export default process;
