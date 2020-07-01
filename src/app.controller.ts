import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { dataType } from 'utils/types/data.type';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getData(): Promise<dataType> {
    const data = await this.appService.getData();
    return data;
  }

  @Post()
  async addFlow(
    @Body('category') category: string,
    @Body('code') code: string,
    @Body('name') name?: string,
  ): Promise<dataType> {
    const data = await this.appService.addFlow({ category, code, name });

    return data;
  }

  @Delete(':category/:code')
  async deleteFlow(
    @Param('category') category: string,
    @Param('code') code: string,
  ): Promise<dataType> {
    const data = await this.appService.deleteFlow({ category, code });

    return data;
  }
}
