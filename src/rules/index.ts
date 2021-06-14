export * from './RuleRequireMutationType';
export * from './RuleRequireQueryType';
export * from './RuleRequireSchemaDef';
export * from './RuleCheckTypeNames';

import { GraphQLintRule } from '../types';
import { RuleCheckTypeNames } from './RuleCheckTypeNames';
import { RuleRequireMutationType } from './RuleRequireMutationType';
import { RuleRequireQueryType } from './RuleRequireQueryType';
import { RuleRequireSchemaDef } from './RuleRequireSchemaDef';

export default function rules(): GraphQLintRule[] {
  return [
    new RuleRequireSchemaDef(),
    new RuleRequireMutationType(),
    new RuleRequireQueryType(),
    new RuleCheckTypeNames(),
  ];
}
