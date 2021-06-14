import { DefinitionNode, ObjectTypeDefinitionNode } from 'graphql';

export type DefNodeList = DefinitionNode[] | ReadonlyArray<DefinitionNode>;
export type ObjTypeDefNodeList = ObjectTypeDefinitionNode[] | ReadonlyArray<ObjectTypeDefinitionNode>;

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
