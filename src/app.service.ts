import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import CompareEmail from './auth/utils/compareAuthor';

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

  async DeleteCompany(id, dataUserLogged) {
    const idExist = await this.db.empresa.findUnique({
      where: { id: id },
      include: {
        author: true,
      },
    });

    if (!idExist) {
      throw new NotFoundException('Empresa não existe');
    }

    const IsAuthor = CompareEmail(idExist.author.email, dataUserLogged.email);

    if (!IsAuthor) {
      throw new ForbiddenException('Company created by another user');
    }

    const deleteComp = await this.db.empresa.delete({
      where: { id: id },
    });

    return `${deleteComp.razaoSocial} deleted successfully!`;
  }

  async updatedCompany(id, data, dataUserLogged) {
    const companyExist = await this.db.empresa.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });

    const IsAuthor = CompareEmail(
      companyExist.author.email,
      dataUserLogged.email,
    );

    if (!IsAuthor) {
      throw new ForbiddenException('Company created by another user');
    }

    if (companyExist) {
      const atData = await this.db.empresa.update({
        where: { id },
        data: { ...data },
      });

      return atData;
    }
  }
}
