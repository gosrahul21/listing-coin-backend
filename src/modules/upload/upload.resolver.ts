import { UploadService } from './upload.service';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  /**
   * POST /upload
   * This API endpoint is used to upload a new image.
   */
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(@UploadedFile() file: any) {
    console.log(file);
    const result = await this.uploadService.uploadToDisk(file);
    // Logging or any other additional logic can be added here
    return { name: result };
  }
}
