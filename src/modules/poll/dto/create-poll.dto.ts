import { IsString, IsArray, ArrayMinSize } from "class-validator";

export class PollDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  options: string[];
}