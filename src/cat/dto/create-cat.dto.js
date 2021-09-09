import { IsNotEmpty, IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCatDto {
  @IsNotEmpty()
  @IsString()
  name;

  @IsNotEmpty()
  @IsNumber()
  age;


  @IsArray()
  @Type(() => SubDto)
  @ValidateNested({ each: true })
  sub;
}


export class SubDto {
  @IsNotEmpty()
  @IsString()
  name;

  @IsNotEmpty()
  @IsNumber()
  age;
}
