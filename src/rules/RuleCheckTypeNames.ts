import { GraphQLintRuleInput, GraphQLintOutput, GraphQLintRule, RuleRefType } from '../types';
import { getObjectTypeDefs } from '../gql';
import { checkName } from '../str';

export class RuleCheckTypeNames implements GraphQLintRule {

  constructor(
    public ruleRef: RuleRefType = 'check-type-names',
    public message: string = 'Invalid type name',
  ) {
    // do nothing
  }

  check(input: GraphQLintRuleInput, output: GraphQLintOutput): boolean {
    let errCount = 0;
    const objDefs = getObjectTypeDefs(input.ast.definitions ?? []);
    const { typeNameCase } = input.config;
    for (const objDef of objDefs) {
      if (!checkName(objDef.name.value, typeNameCase)) {
        errCount++;
        const location = { line: 1, column: 1 }; // TODO
        output.errors.push({
          ruleRef: this.ruleRef,
          message: this.message + ': expecting ' + typeNameCase + ' for type "' + objDef.name.value + '"',
          ...location,
        });
      }
    }
    return errCount === 0;
  }
}
