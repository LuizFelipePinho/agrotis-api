import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCompanyDto } from './dto/empresa.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/create')
  createCompany(@Body() data: CreateCompanyDto) {
    return this.appService.Create(data);
  }

  @Get('/list')
  getAllCompany() {
    return this.appService.GetAllCompany();
  }
}
