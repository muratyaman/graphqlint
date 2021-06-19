import { DefinitionNode, FieldDefinitionNode, getLocation, ObjectTypeDefinitionNode, Source } from 'graphql';
import { checkName } from './str';
import { GraphQLintInfo, RuleRefType } from './types';

export type DefNodeList = DefinitionNode[] | ReadonlyArray<DefinitionNode>;
export type ObjTypeDefNodeList = ObjectTypeDefinitionNode[] | ReadonlyArray<ObjectTypeDefinitionNode>;
export type FieldDefNodeList = FieldDefinitionNode[] | ReadonlyArray<FieldDefinitionNode>;

export function getObjectTypeDefs(defs: DefNodeList): ObjectTypeDefinitionNode[] {
  const objDefs: ObjectTypeDefinitionNode[] = [];
  for (const def of defs) {
    if (isObjectTypeDefinitionNode(def)) {
      objDefs.push(def);
    }
  }
  return objDefs;
}

export function isObjectTypeDefinitionNode(def: DefinitionNode): def is ObjectTypeDefinitionNode {
  return def && def.kind && def.kind === 'ObjectTypeDefinition';
}

export function checkFieldNames(
  source: Source,
  nodeName: string,
  fields: FieldDefNodeList,
  nameCase: string,
  errors: GraphQLintInfo[],
  messagePrefix: string,
  ruleRef: RuleRefType,
): number {
  let errCount = 0;
  for (const field of fields) {
    if (!checkName(field.name.value, nameCase)) {
      errCount++;
      if (field.loc) {
        const { line, column } = getLocation(source, field.loc?.start);
        errors.push({
          ruleRef,
          message: messagePrefix + ': expecting ' + nameCase + ' for field name "' + nodeName + '.' + field.name.value + '"',
          line,
          column,
        });
      }
    }
  }
  return errCount;
}
