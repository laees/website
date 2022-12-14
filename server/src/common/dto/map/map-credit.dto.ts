import { MapCredit } from '@prisma/client';
import { UserDto } from '../user/user.dto';
import { MapDto } from './map.dto';
import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { MapCreditType } from '../../enums/map.enum';
import { NestedDto } from '@lib/dto.lib';
import { Exclude } from 'class-transformer';

export class MapCreditDto implements MapCredit {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsEnum(MapCreditType)
    type: MapCreditType;

    @ApiProperty()
    @IsInt()
    userID: number;

    @ApiProperty()
    @IsInt()
    mapID: number;

    @NestedDto(UserDto, { type: () => UserDto })
    user: UserDto;

    @NestedDto(MapDto, { type: () => MapDto })
    map: MapDto;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;
}

export class CreateMapCreditDto extends PickType(MapCreditDto, ['userID', 'type'] as const) {}

export class UpdateMapCreditDto {
    @ApiPropertyOptional({ description: 'The new user ID to set', type: Number })
    @IsInt()
    @IsOptional()
    userID?: number;

    @ApiPropertyOptional({ description: 'The new map credit type to set', enum: MapCreditType })
    @IsEnum(MapCreditType)
    @IsOptional()
    type?: number;
}