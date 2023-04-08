import { DevGuard } from './dev.guard';
import { assert } from './dev.guard.spec-setup';

describe('DevGuard', () => {
  let devGuard: DevGuard;

  beforeAll(async () => {
    devGuard = await assert();
  });

  describe('canActivate', () => {
    it('should return true if dev env', async () => {
      const result = await devGuard.canActivate();
      expect(result).toBeTruthy();
    });
  });
});
