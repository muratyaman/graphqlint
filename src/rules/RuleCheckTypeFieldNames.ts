import { visit, getLocation } from 'graphql/language';
import { GraphQLintRuleInput, GraphQLintOutput, GraphQLintRule, RuleRefType } from '../types';
import { checkName } from '../str';

export class RuleCheckTypeFieldNames implements GraphQLintRule {

  constructor(
    public ruleRef: RuleRefType = 'check-type-field-names',
    public message: string = 'Invalid type field name',
  ) {
    // do nothing
  }

  check(input: GraphQLintRuleInput, output: GraphQLintOutput): boolean {
    let errCount = 0;
    const { typeFieldNameCase } = input.config;
    const { ruleRef, message } = this;

    visit(input.ast, {
      ObjectTypeDefinition(node) {
        const { fields = [] } = node;
        for (const field of fields) {
          if (!checkName(field.name.value, typeFieldNameCase)) {
            errCount++;
            if (field.loc) {
              const { line, column } = getLocation(input.source, field.loc?.start);
              output.errors.push({
                ruleRef,
                message: message + ': expecting ' + typeFieldNameCase + ' for field "' + node.name.value + '.' + field.name.value + '"',
                line,
                column,
              });
            }
          }
        }
      }
    });

    return errCount === 0;
  }
}
