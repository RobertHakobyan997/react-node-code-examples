import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';
import Countries from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/countries';

import { countries } from '../../../test/data/countries/countries.const';

import { CountriesService } from './countries.service';
import { assert } from './countries.spec-setup';

describe('CountriesService', () => {
  let service: CountriesService;

  beforeEach(async () => {
    service = await assert();
  });

  it('should return all countries', async () => {
    jest.spyOn(service['dal'], 'findAll').mockResolvedValue(countries as Document<Countries>[]);
    const res = await service.findAll();
    expect(res).toEqual(countries);
    expect(res.length).toBe(countries.length);
  });
});
