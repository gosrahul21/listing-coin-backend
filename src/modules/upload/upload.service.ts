import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { Readable } from 'stream';
import { promisify } from 'util';
@Injectable()
export class UploadService {
  /**
   *
   * This is the service function which used to save image in disk
   */
  async uploadToDisk(upload: any) {
    const stream = upload.buffer;
    const fName = `${Date.now()}-file.${upload.mimetype.split('/')[1]}`;
    return this.writeImageToDisk(stream, fName);
  }

  async writeImageToDisk(stream: Readable, fName: string) {
    const writeStream = createWriteStream(`upload/` + fName);

    const finishPromise = promisify(writeStream.on).bind(writeStream)('finish');

    writeStream.write(stream);
    writeStream.end();

    await finishPromise;

    // this.logger.log('Photo Uploaded');

    return fName;
  }
}
