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

    return `message: ${company.razaoSocial} criado com sucesso!`;
  }

  async GetAllCompany() {
    const empresas = await this.db.empresa.findMany();

    if (!empresas) {
      return null;
    }

    const dataEmpresaFilter = [];

    empresas.map((empresa) => {
      const empresaObj = {
        id: empresa.id,
        razaoSocial: empresa.razaoSocial,
        CNPJ: empresa.CNPJ,
        endereco: empresa.endereco,
        numero: empresa.numero,
        bairro: empresa.bairro,
        cidade: empresa.cidade,
        UF: empresa.UF,
        CEP: empresa.CEP,
        dataAbertura: empresa.dataAbertura,
      };

      dataEmpresaFilter.push(empresaObj);
    });

    return dataEmpresaFilter;
  }
}
