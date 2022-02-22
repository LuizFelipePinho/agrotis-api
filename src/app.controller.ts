import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('company')
export class AppController {
  constructor(private readonly appService: AppService) {}
  // a ideia é pegar os dados do usuario logado e relacionar com a empresa que ele está criando, pra quando quiser deletar, atualizar ou excluir fazer isso somente na empresa que ele criou
  @Post('/create')
  createCompany(@Body() data, @CurrentUser() user: User) {
    return this.appService.Create(data, user);
  }

  @Get('/list')
  getAllCompany() {
    return this.appService.GetAllCompany();
  }

  @Delete('/delete/:id')
  deleteCompany(@Param('id') id: string, @CurrentUser() user: User) {
    return this.appService.DeleteCompany(id, user);
  }

  @Put('/atCompany/:id')
  at(@Param('id') id: string, @Body() data, @CurrentUser() user: User) {
    return this.appService.updatedCompany(id, data, user);
  }
}
