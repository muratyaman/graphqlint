import { DocumentNode, GraphQLSchema, Source } from 'graphql';

export type NameCaseType = 'camelCase' | 'lower_case' | 'PascalCase' | 'UPPER_CASE'
  | string; // string ==> pattern, room for extension

export type RuleRefType =
    'unknown'
  | 'graphql-syntax'
  | 'graphql-semantics'
  | 'require-schema'
  | 'require-query'
  | 'require-mutation'
  | 'check-type-names'
  | 'check-type-field-names'
  | 'check-interface-names'
  | 'check-interface-field-names'
  | 'check-union-names'
  | 'check-enum-names'
  | 'check-enum-values'
  // | string; // TODO room for extension ?
;

export interface GraphQLintConfig {
  disable?: RuleRefType[];
  scalarNameCase?: NameCaseType;
  directiveNameCase?: NameCaseType;
  typeNameCase?: NameCaseType;
  typeFieldNameCase?: NameCaseType;
  interfaceNameCase?: NameCaseType;
  interfaceFieldNameCase?: NameCaseType;
  unionNameCase?: NameCaseType;
  enumNameCase?: NameCaseType;
  enumValueCase?: NameCaseType;
}

export type GraphQLintConfigRequired = Required<GraphQLintConfig>;

export interface GraphQLintInput {
  config?: GraphQLintConfig | null;
  sourceText?: string;
}

export interface GraphQLintRuleInput {
  config: GraphQLintConfigRequired;
  source: Source;
  ast: DocumentNode;
  schema: GraphQLSchema;
  meta: Record<string, unknown>;
}

export interface GraphQLintOutput {
  valid: boolean;
  errors: GraphQLintInfo[];
  warnings: GraphQLintInfo[];
}

export interface GraphQLintInfo {
  message: string;
  ruleRef: RuleRefType | null;
  line?: number;
  column?: number;
}

export interface GraphQLintRule {
  ruleRef: RuleRefType;
  check(input: GraphQLintRuleInput, output: GraphQLintOutput): boolean;
}
