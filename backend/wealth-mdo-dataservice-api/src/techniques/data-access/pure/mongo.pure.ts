import { ObjectId } from 'mongodb';

export function makeObjectId(id: string): ObjectId {
  return new ObjectId(id);
}

export function checkIfObjectId(objectIdString: string, looseObjectIdDetection?: boolean): string | false {
  const regex = new RegExp('(?<=ObjectId\\(\\\')(.*)(?=\\\')');
  const found = regex.exec(objectIdString);

  if (found && ObjectId.isValid(found[0])) {
    return found[0];
  }

  return looseObjectIdDetection
    && objectIdString.length === 24
    && ObjectId.isValid(objectIdString)
    && objectIdString;
}
