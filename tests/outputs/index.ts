import { loadFiles } from '../utils';

export default function files() {
  return loadFiles('*.json', __dirname);
}
