import { GraphQLintRuleInput, GraphQLintOutput, GraphQLintRule, RuleRefType } from '../types';

export class RuleRequireMutationType implements GraphQLintRule {

  constructor(
    public ruleRef: RuleRefType = 'require-mutation',
    public message: string = 'Mutation type is required',
  ) {
    // do nothing
  }

  check(input: GraphQLintRuleInput, output: GraphQLintOutput): boolean {
    let valid = false;
    const mt = input.schema.getMutationType();
    if (mt) {
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
