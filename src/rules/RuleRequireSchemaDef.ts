import { GraphQLintRuleInput, GraphQLintOutput, GraphQLintRule, RuleRefType } from '../types';

export class RuleRequireSchemaDef implements GraphQLintRule {

  constructor(
    public ruleRef: RuleRefType = 'require-schema',
    public message: string = 'Schema definition is required',
  ) {
    // do nothing
  }

  check(input: GraphQLintRuleInput, output: GraphQLintOutput): boolean {
    let valid = false;
    const st = input.ast?.definitions.find(d => d.kind === 'SchemaDefinition');
    if (st) valid = true;
    if (!valid) {
      output.errors.push({
        ruleRef: this.ruleRef,
        message: this.message,
      });
    }
    return valid;
  }
}
