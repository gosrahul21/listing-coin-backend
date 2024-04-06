import { IsMongoId } from 'class-validator';

export class IDInputDto {
  @IsMongoId({
    message: 'Valid MongoDB ObjectId is required',
  })
  _id: string;
}
