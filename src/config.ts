import { GraphQLintConfigRequired } from './types';

export const defaultConfig = (): GraphQLintConfigRequired => ({
  disable: [
    'require-schema',
  ],
  scalarNameCase: 'PascalCase',
  directiveNameCase: 'lower_case',
  typeNameCase: 'PascalCase',
  typeFieldNameCase: 'camelCase',
  interfaceNameCase: 'PascalCase',
  interfaceFieldNameCase: 'lower_case',
  enumNameCase: 'PascalCase',
  enumValueCase: 'UPPER_CASE',
});
