import { IsInt, IsOptional, IsString } from 'class-validator'

export class FindProductsDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  limit?: number
  
  @IsOptional()
  @IsInt()
  page?: number;

}
