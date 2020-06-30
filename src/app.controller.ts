import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { dataType } from './data.type';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(): dataType {
    return this.appService.getData();
  }

  @Post()
  addFlow(
    @Body('category') category: string,
    @Body('code') code: string,
    @Body('name') name?: string,
  ): dataType {
    return this.appService.addFlow({ category, code, name });
  }

  @Delete(':category/:code')
  deleteFlow(
    @Param('category') category: string,
    @Param('code') code: string,
  ): dataType {
    return this.appService.deleteFlow({ category, code });
  }
}
