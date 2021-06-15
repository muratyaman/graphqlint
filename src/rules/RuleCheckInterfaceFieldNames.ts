import { visit } from 'graphql/language';
import { GraphQLintRuleInput, GraphQLintOutput, GraphQLintRule, RuleRefType } from '../types';
import { checkFieldNames } from '../gql';

export class RuleCheckInterfaceFieldNames implements GraphQLintRule {

  constructor(
    public ruleRef: RuleRefType = 'check-interface-field-names',
    public message: string = 'Invalid interface field name',
  ) {
    // do nothing
  }

  check(input: GraphQLintRuleInput, output: GraphQLintOutput): boolean {
    let errCount = 0;
    const { interfaceFieldNameCase: nameCase } = input.config;
    const { ruleRef, message } = this;

    visit(input.ast, {
      InterfaceTypeDefinition(node) {
        const { fields = [] } = node;
        errCount += checkFieldNames(input.source, node.name.value, fields, nameCase, output.errors, message, ruleRef);
      }
    });

    return errCount === 0;
  }
}
