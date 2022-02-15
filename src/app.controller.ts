import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Delete('/delete/:id')
  deleteCompany(@Param('id') id: string) {
    return this.appService.DeleteCompany(id);
  }
}
