import { visit, getLocation } from 'graphql/language';
import { GraphQLintRuleInput, GraphQLintOutput, GraphQLintRule, RuleRefType } from '../types';
import { checkName } from '../str';

export class RuleCheckUnionNames implements GraphQLintRule {

  constructor(
    public ruleRef: RuleRefType = 'check-union-names',
    public message: string = 'Invalid union name',
  ) {
    // do nothing
  }

  check(input: GraphQLintRuleInput, output: GraphQLintOutput): boolean {
    let errCount = 0;
    const { unionNameCase: nameCase } = input.config;
    const { ruleRef, message } = this;

    visit(input.ast, {
      UnionTypeDefinition(node) {
        if (!checkName(node.name.value, nameCase)) {
          errCount++;
          if (node.loc) {
            const { line, column } = getLocation(input.source, node.loc?.start ?? 0);
            output.errors.push({
              ruleRef,
              message: message + ': expecting ' + nameCase + ' for union name "' + node.name.value + '"',
              line,
              column,
            });
          }
        }
      }
    });

    return errCount === 0;
  }
}
