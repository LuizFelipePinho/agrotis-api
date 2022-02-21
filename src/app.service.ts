import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
// import { CreateCompanyDto } from './dto/empresa.dto';
// import { AuthRequest } from './models/authRequest';
// import { AuthRequest } from './auth/models/authRequest';

@Injectable()
export class AppService {
  constructor(private db: PrismaService) {}

  async Create(data, user) {
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
      data: {
        ...data,
        author: {
          connect: {
            email: user.email,
          },
        },
      },
    });

    return `${company.razaoSocial} criado com sucesso!`;
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

  async DeleteCompany(id) {
    const idExist = await this.db.empresa.findUnique({
      where: { id: id },
    });

    if (!idExist) {
      throw new NotFoundException('Empresa não existe');
    }

    const deleteComp = await this.db.empresa.delete({
      where: { id: id },
    });

    return deleteComp;
  }

  async updatedCompany(id, data) {
    const companyExist = await this.db.empresa.findUnique({
      where: { id },
    });

    if (companyExist) {
      const atData = await this.db.empresa.update({
        where: { id },
        data: { ...data },
      });

      return atData;
    }
  }
}
