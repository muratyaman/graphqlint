import { loadFiles } from '../utils';

export default function files() {
  return loadFiles('*.gql', __dirname);
}
