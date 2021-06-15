import { expect } from 'chai';
import { GraphQLint } from '../src/GraphQLint';
import { GraphQLintConfig } from '../src/types';
import loadInputs from './inputs';
import loadOutputs from './outputs';

describe('GraphQLint', () => {

  const inputs  = loadInputs();
  const outputs = loadOutputs();

  const validOutput = '00-valid.json'; // no errors, no warnings

  function expectation(obj: unknown, file = '00-valid.json'): void {
    expect(JSON.stringify(obj, null, '  ')).to.eq(outputs[file]);
  }

  function lintAndCheck(inputFile: string, outputFile = validOutput, config: GraphQLintConfig | null = null): void {
    const gl         = new GraphQLint(config);
    const sourceText = inputs[inputFile];
    const input      = { sourceText };
    const output     = gl.lint(input);
    expectation(output, outputFile);
  }

  it('should lint schema with invalid syntax', () => {
    lintAndCheck('00a-invalid-syntax.gql', '00a-invalid-syntax.json');
  });

  it('should lint schema with invalid semantics', () => {
    lintAndCheck('00b-invalid-semantics.gql', '00b-invalid-semantics.json');
  });

  it('should lint schema without schema, query and mutation - default config', () => {
    lintAndCheck('01a-query-mutation.gql'); // default settings: disable require-schema
  });

  it('should lint schema without schema but query and mutation - no rules disabled', () => {
    lintAndCheck('01b-query-mutation-invalid.gql', '01b-query-mutation-invalid.json', { disable: [] });
  });

  it('should lint schema with schema, query and mutation - no rules disabled', () => {
    lintAndCheck('01c-schema-query-mutation.gql', validOutput, { disable: [] });
  });

  it('should lint schema with query', () => {
    lintAndCheck('02a-query.gql', validOutput, { disable: ['require-schema', 'require-mutation'] });
  });

  it('should lint schema with query - invalid', () => {
    lintAndCheck('02b-query-invalid.gql', '02b-query-invalid.json', { disable: ['require-schema', 'require-mutation'] });
  });

  it('should lint schema with mutation', () => {
    lintAndCheck('03a-mutation.gql', validOutput, { disable: ['require-schema', 'require-query'] });
  });

  it('should lint schema without mutation - invalid', () => {
    lintAndCheck('03b-mutation-invalid.gql', '03b-mutation-invalid.json', { disable: ['require-schema', 'require-query'] });
  });

  it('should lint schema with types', () => {
    lintAndCheck('04a-type-names.gql');
  });

  it('should lint schema with types - invalid names', () => {
    lintAndCheck('04b-type-names-invalid.gql', '04b-type-names-invalid.json');
  });

  it('should lint schema with interfaces', () => {
    lintAndCheck('05a-interfaces.gql');
  });

  it('should lint schema with interfaces - invalid names', () => {
    lintAndCheck('05b-interfaces-invalid.gql', '05b-interfaces-invalid.json');
  });

  it('should lint schema with unions', () => {
    lintAndCheck('06a-unions.gql');
  });

  it('should lint schema with unions - invalid names', () => {
    lintAndCheck('06b-unions-invalid.gql', '06b-unions-invalid.json');
  });
});
