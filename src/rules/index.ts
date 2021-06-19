export * from './RuleCheckDirectiveNames';
export * from './RuleCheckInterfaceFieldNames';
export * from './RuleCheckInterfaceNames';
export * from './RuleCheckScalarNames';
export * from './RuleCheckTypeFieldNames';
export * from './RuleCheckTypeNames';
export * from './RuleCheckUnionNames';
export * from './RuleRequireMutationType';
export * from './RuleRequireQueryType';
export * from './RuleRequireSchemaDef';

import { GraphQLintRule } from '../types';
import { RuleCheckDirectiveNames } from './RuleCheckDirectiveNames';
import { RuleCheckInterfaceFieldNames } from './RuleCheckInterfaceFieldNames';
import { RuleCheckInterfaceNames } from './RuleCheckInterfaceNames';
import { RuleCheckScalarNames } from './RuleCheckScalarNames';
import { RuleCheckTypeFieldNames } from './RuleCheckTypeFieldNames';
import { RuleCheckTypeNames } from './RuleCheckTypeNames';
import { RuleCheckUnionNames } from './RuleCheckUnionNames';
import { RuleRequireMutationType } from './RuleRequireMutationType';
import { RuleRequireQueryType } from './RuleRequireQueryType';
import { RuleRequireSchemaDef } from './RuleRequireSchemaDef';

export default function rules(): GraphQLintRule[] {
  return [
    new RuleRequireSchemaDef(),
    new RuleRequireMutationType(),
    new RuleRequireQueryType(),
    new RuleCheckTypeNames(),
    new RuleCheckTypeFieldNames(),
    new RuleCheckInterfaceNames(),
    new RuleCheckInterfaceFieldNames(),
    new RuleCheckUnionNames(),
    new RuleCheckScalarNames(),
    new RuleCheckDirectiveNames(),
  ];
}
