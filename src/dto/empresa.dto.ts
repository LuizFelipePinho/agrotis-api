import { IsEmail, IsDate, Length, IsInt, Max, IsEmpty } from 'class-validator';

export class CreateCompanyDto {
  @Length(0, 14)
  @IsEmpty()
  CNPJ: string;

  @IsEmail()
  email: string;

  @IsDate()
  dataAbertura: Date;

  @IsInt()
  @Max(8)
  CEP: number;

  @Max(64)
  endereco: string;

  @IsInt()
  numero: number;

  @Max(64)
  complemento: string;

  @Max(64)
  bairro: string;

  @Max(64)
  cidade: string;

  @Max(3)
  UF: string;
}

// id String @id @default(uuid())
// CNPJ String @unique
// email String @unique
// dataAbertura DateTime
// CEP Int
// endereco String
// numero Int
// complemento String
// bairro String
// cidade String
// UF String
