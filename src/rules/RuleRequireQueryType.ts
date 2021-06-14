import { GraphQLintRuleInput, GraphQLintOutput, GraphQLintRule, RuleRefType } from '../types';

export class RuleRequireQueryType implements GraphQLintRule {

  constructor(
    public ruleRef: RuleRefType = 'require-query',
    public message: string = 'Query type is required',
  ) {
    // do nothing
  }

  check(input: GraphQLintRuleInput, output: GraphQLintOutput): boolean {
    let valid = false;
    const qt = input.schema.getQueryType();
    if (qt) {
      valid = true;
    } else {
      // TODO find in custom schema
    }
    if (!valid) {
      output.errors.push({
        ruleRef: this.ruleRef,
        message: this.message,
      });
    }
    return valid;
  }
}
