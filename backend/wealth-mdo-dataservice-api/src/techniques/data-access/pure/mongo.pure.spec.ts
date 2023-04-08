import { ObjectId } from 'mongodb';

import { checkIfObjectId, makeObjectId } from './mongo.pure';

describe('makeObjectId', () => {
  it('should return valid ObjectId', () => {
    expect(makeObjectId('608ba9cbc1656e7b68ab3ed3')).toBeInstanceOf(ObjectId);
  });

  it('should throw an error', () => {
    expect(() => makeObjectId('123')).toThrow(Error);
  });
});

describe('checkIfObjectId', () => {
  const objectId = 'ObjectId(\'608ba9cbc1656e7b68ab3ed3\')';

  it('should return valid ObjectId', () => {
    expect(checkIfObjectId(objectId)).toBe('608ba9cbc1656e7b68ab3ed3');
  });

  it('should return false because id is invalid', () => {
    expect(checkIfObjectId('123')).toBeFalsy();
  });

  it('should return true because of loosing detection', () => {
    expect(checkIfObjectId('123', true)).toBeFalsy();
  });
});
