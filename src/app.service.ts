import { ConflictException, Injectable } from '@nestjs/common';
// import { Empresa } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateCompanyDto } from './dto/empresa.dto';

@Injectable()
export class AppService {
  constructor(private db: PrismaService) {}

  async Create(data: CreateCompanyDto) {
    const CompanyExist = await this.db.empresa.findUnique({
      where: { email: data.email },
    });

    const CNPJExist = await this.db.empresa.findUnique({
      where: { CNPJ: data.CNPJ },
    });

    if (CompanyExist || CNPJExist) {
      throw new ConflictException('Email ou CNPJ já cadastrado');
    }

    const company = await this.db.empresa.create({
      data: data,
    });

    return company;
  }
}
