import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import chalk from 'chalk';
import icons from 'log-symbols';
import { GraphQLint } from './GraphQLint';
import { GraphQLintInfo } from './types';

export function cli(args: string[] = [], logger = console): number {
  let exitCode = 0;

  try {

    const [node, thisFile, gqlFile] = args;
    if (!gqlFile) throw new Error('GraphQL schema file is required');

    const fp = resolve(gqlFile);
    if (!existsSync(fp)) throw new Error('File does not exist: ' + fp);
    
    const printError = makePrintError(logger);
    const printWarning = makePrintWarning(logger);

    const source = readFileSync(fp).toString();
    const config = {};
    const gl = new GraphQLint(config);
    const output = gl.lint({ source });
    if (!output.valid) {
      const ec = output.errors.length;
      const wc = output.warnings.length;
      if (ec) output.errors.forEach(printError);
      if (wc) output.warnings.forEach(printWarning);
      logger.log('');
      const summary = icons.error + ' ' +
        wc + ' problem' + (wc === 1 ? '': 's') +
        ' (' +
        ec + ' error' + (ec === 1 ? '' : 's') + ', ' +
        wc + ' warning' + (wc === 1 ? '' : 's') +
        ')';
      if (ec === 0 && wc > 0) {
        logger.warn(chalk.yellow(summary));
      } else if (ec > 0 && wc === 0) {
        logger.error(chalk.red(summary));
      } else if (ec === 0 && wc === 0) {
        logger.warn('No errors or warnings reported; that is odd!');
      }
      logger.log('');
    }
    exitCode = output.valid ? 0 : 1;

  } catch (err) {

    exitCode = 1;
    logger.error(err.message);
  }

  return exitCode;
}

export function makePrintError(logger = console) {
  return function printError(msg: GraphQLintInfo): void {
    const { line = 0, column = 0, message, ruleRef } = msg;
    logger.error('  ' + chalk.gray(`${line}:${column}`) + '  ' + chalk.red('error') + '  ' + message + '  ' + chalk.gray(ruleRef));
  }
}

export function makePrintWarning(logger = console) {
  return function printWarning(msg: GraphQLintInfo): void {
    const { line = 0, column = 0, message, ruleRef } = msg;
    logger.warn('  ' + chalk.gray(`${line}:${column}`) + '  ' + chalk.yellow('warning') + '  ' + message + '  ' + chalk.gray(ruleRef));
  }
}
