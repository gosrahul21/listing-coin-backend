// token.controller.ts

import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Token } from './entities/token.entity';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('tokens')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createTokenDto: CreateTokenDto,
    @Req() req,
  ): Promise<Token> {
    const userId = req.decoded.userId;
    return this.tokenService.create({ userId, ...createTokenDto });
  }

  @Get()
  async findAll(): Promise<Token[]> {
    return this.tokenService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Token> {
    return this.tokenService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() token: UpdateTokenDto,
  ): Promise<Token> {
    return this.tokenService.update(id, token);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Token> {
    return this.tokenService.delete(id);
  }
}
