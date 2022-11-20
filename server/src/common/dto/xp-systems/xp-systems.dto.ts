import { ApiProperty, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { DtoFactory } from '@lib/dto.lib';

// Could implement RankXpParams and CosXpParams in xp-systems.interface.ts but class-validator requires
// we give it this wacky structure.

// TODO: bunch of this can be readonly?
class CosXpTierScale {
    @ApiProperty()
    linear: number;

    @ApiProperty()
    staged: number;

    @ApiProperty()
    stages: number;

    @ApiProperty()
    bonus: number;
}

class CosXpUniqueTierScale extends PickType(CosXpTierScale, ['linear', 'staged'] as const) {}
class CosXpRepeatTierScale extends CosXpTierScale {}
class CosXpUnique {
    @ApiProperty({ type: () => CosXpUniqueTierScale })
    @Transform(({ value }) => DtoFactory(CosXpUniqueTierScale, value))
    tierScale: CosXpUniqueTierScale;
}
class CosXpRepeat {
    @ApiProperty({ type: () => CosXpRepeatTierScale })
    @Transform(({ value }) => DtoFactory(CosXpRepeatTierScale, value))
    tierScale: CosXpRepeatTierScale;
}

class CosXpCompletions {
    @ApiProperty({ type: () => CosXpUnique })
    @Transform(({ value }) => DtoFactory(CosXpUnique, value))
    unique: CosXpUnique;

    @ApiProperty({ type: () => CosXpRepeat })
    @Transform(({ value }) => DtoFactory(CosXpRepeat, value))
    repeat: CosXpRepeat;
}
class CosXpLevels {
    @ApiProperty()
    maxLevels: number;

    @ApiProperty()
    startingValue: number;

    @ApiProperty()
    linearScaleBaseIncrease: number;

    @ApiProperty()
    linearScaleInterval: number;

    @ApiProperty()
    linearScaleIntervalMultiplier: number;

    @ApiProperty()
    staticScaleStart: number;

    @ApiProperty()
    staticScaleBaseMultiplier: number;

    @ApiProperty()
    staticScaleInterval: number;

    @ApiProperty()
    staticScaleIntervalMultiplier: number;
}

class CosXpDto {
    @ApiProperty({ type: () => CosXpCompletions })
    @Transform(({ value }) => DtoFactory(CosXpCompletions, value))
    completions: CosXpCompletions;

    @ApiProperty({ type: () => CosXpLevels })
    @Transform(({ value }) => DtoFactory(CosXpLevels, value))
    levels: CosXpLevels;
}

class RankXpDto {
    // implements RankXpParams {
    formula: {
        A: number;
        B: number;
    };
    groups: {
        maxGroups: number;
        groupScaleFactors: number[];
        groupExponents: number[];
        groupMinSizes: number[];
        groupPointPcts: number[];
    };
    top10: {
        WRPoints: number;
        rankPercentages: number[];
    };
}

export class XpSystemsDto {
    @ApiProperty({ type: () => CosXpDto })
    @Transform(({ value }) => DtoFactory(CosXpDto, value))
    cosXP: CosXpDto;

    @ApiProperty({ type: () => CosXpDto })
    @Transform(({ value }) => DtoFactory(CosXpDto, value))
    rankXP: CosXpDto;
}
