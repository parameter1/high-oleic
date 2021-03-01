import { parse } from 'vue-currency-input';
import options from '../currency-options';

export default (value) => parse(value, options);
