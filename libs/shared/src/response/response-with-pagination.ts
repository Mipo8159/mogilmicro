import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';
import { PaginationDto } from '../dto';
import { Type, applyDecorators } from '@nestjs/common';

export class ResponseWithPagination<T> extends PaginationDto {
  @ApiProperty({ description: 'Limit', type: 'number' })
  limit: number;

  @ApiProperty({ description: 'Offset', type: 'number' })
  offset: number;

  @ApiProperty({ description: 'Total entries', type: 'number' })
  total: number;

  @ApiProperty({ description: 'Data', default: [], isArray: true, items: {} })
  data: T[];
}

export const ApiOkResponsePaginated = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
) =>
  applyDecorators(
    ApiExtraModels(ResponseWithPagination),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseWithPagination) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    }),
  );
