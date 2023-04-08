import { ApiProperty } from '@nestjs/swagger';

import { PagesPermissions } from '../core/schemas/pages-permissions.schema';
import { QuickFilter } from '../core/schemas/quick-filter.schema';

export class UserSettings {
  @ApiProperty({
    type: [ QuickFilter ],
    description: 'Array of quick filters'
   })
  quickFilters: QuickFilter[];

  @ApiProperty({
    type: [ PagesPermissions ],
    description: 'Array of pages permissions'
   })
  permissionRoute: PagesPermissions[];
}
