import { ApiProperty } from '@nestjs/swagger';

export class RegisteredUser {
  @ApiProperty({ type: String, description: 'ObjectId in authorization database', example: '62135cce635d5cf9bcdc09ce' })
  userId: string;

  @ApiProperty({ example: 'max' })
  firstName: string;

  @ApiProperty({ example: 'hurt' })
  lastName: string;

  @ApiProperty({ example: 'max.hurt@mmc.com' })
  userEmail: string;

  @ApiProperty({ type: String, description: 'Employee Id. Can be string or number', example: '666666' })
  employeeId: string | number;

  @ApiProperty({ description: 'Always MERCER', example: 'MERCER' })
  domain: string;

  @ApiProperty({ description: 'Role in MDO application or no access', example: 'security admin' })
  clientAcess: string;

  @ApiProperty({ example: 'wealth-mdo-admin-be' })
  appName: string;
}
