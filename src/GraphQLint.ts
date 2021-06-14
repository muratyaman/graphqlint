import { buildASTSchema, parse } from 'graphql';
import * as t from './types';
import { defaultConfig } from './config';
import loadRules from './rules';

export class GraphQLint {
  
  private config: t.GraphQLintConfigRequired;
  
  private rules: t.GraphQLintRule[];
  
  constructor(
    configOverride: t.GraphQLintConfig | null = null,
    rulesOverride: t.GraphQLintRule[] = [],
  ) {
    this.config = defaultConfig();
    if (configOverride) this.config = this.getConfig(configOverride);
    this.rules = rulesOverride.length ? rulesOverride : loadRules();
  }
  
  getConfig(configOverride: t.GraphQLintConfig | null | undefined): t.GraphQLintConfigRequired {
    let config = { ...this.config };
    if (configOverride) {
      config = { ...config, ...configOverride };
      if (typeof configOverride.disable !== 'undefined') {
        config.disable = configOverride.disable; // do not combine arrays
      }
    }
    return config;
  }

  getRules(disable: t.RuleRefType[]): t.GraphQLintRule[] {
    if (disable.length) {
      return this.rules.filter(r => !disable.includes(r.ruleRef));
    } else {
      return [ ...this.rules ];
    }
  }

  lint(userInput: t.GraphQLintInput): t.GraphQLintOutput {
    const errors: t.GraphQLintInfo[] = [], warnings: t.GraphQLintInfo[] = [];
    const output = { valid: false, errors, warnings };
    const { source = '' } = userInput;
    const config = this.getConfig(userInput.config ?? null);
    const { disable = [] } = config;
    
    try {
      if (source && source.trim() !== '') {
        const ast = parse(source);
        const input: t.GraphQLintRuleInput = {
          config,
          source,
          ast,
          schema: buildASTSchema(ast),
          meta: {},
        };

        const rules = this.getRules(disable);

        let invalid = 0;
        for (const rule of rules) {
          invalid += rule.check(input, output) ? 0 : 1;
        }

        output.valid = invalid === 0;
      } else {
        throw new Error('source is missing');
      }

    } catch (err) {

      console.error(err);
      errors.push({ message: err.message, ruleRef: null });
    }

    return output;
  }
}
