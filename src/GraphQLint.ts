import { buildASTSchema, GraphQLError, parse, Source } from 'graphql';
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
    const { sourceText = '' } = userInput;
    const config = this.getConfig(userInput.config ?? null);
    const { disable = [] } = config;
    
    try {
      if (!sourceText || sourceText.trim() === '') throw new Error('Source is missing');

      const source = new Source(sourceText);
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

    } catch (err) {

      if (!this.processGqlSyntaxError(err, errors)) {
        if (!this.processGqlSemanticErrors(err, errors)) {
          console.error(err);
          errors.push({ message: err.message, ruleRef: 'unknown' });
        }
      }

    }

    return output;
  }

  processGqlSyntaxError(err: GraphQLError, errors: t.GraphQLintInfo[]): boolean {
    if (err instanceof GraphQLError) {
      if (err.locations && err.locations.length > 0) {
        const errMsg: t.GraphQLintInfo = { message: err.message, ruleRef: 'graphql-syntax', line: 0, column: 0 };
        const loc0 = err.locations[0];
        if (loc0.line && loc0.column) {
          errMsg.line = loc0.line;
          errMsg.column = loc0.column;
        }
        errors.push(errMsg);
        return true;
      }
    }
    return false;
  }

  processGqlSemanticErrors(err: Error, errors: t.GraphQLintInfo[]): boolean {
    const lines = err.message.split('\n');
    if (lines.length > 1) {
      const messages = lines.filter(l => l.trim() !== '');
      for (const message of messages) {
        errors.push({ message, ruleRef: 'graphql-semantics', line: 0, column: 0 });
      }
      return messages.length > 0;
    }
    return false;
  }
}
