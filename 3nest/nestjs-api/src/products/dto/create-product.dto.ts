import { IsNotEmpty, IsNumber, IsString, Matches, MaxLength, Min, isNotEmpty } from 'class-validator'

export class CreateProductDto {
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  name: string;

  @IsNotEmpty()
  @Matches(/^[a-z0-9-]+$/, { message: 'slug must contain only lowercase letters, numbers and dashes' })
  @IsString()
  slug: string;

  @IsNotEmpty()
  @MaxLength(500)
  @IsString()
  description: string;

  @Min(1)
  @IsNumber({maxDecimalPlaces: 2})
  @IsNotEmpty()
  price: number;
}
