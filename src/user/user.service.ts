import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const userExist = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userExist) {
      throw new ConflictException('Email já está cadastrado');
    }

    const createUser = await this.prisma.user.create({
      data: data,
    });
    delete createUser.password;
    return createUser;
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userExist = this.prisma.user.findUnique({
      where: { id },
    });

    if (!userExist) {
      throw new NotFoundException('User not exist');
    }

    const atData = await this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        password: await bcrypt.hash(updateUserDto.password, 10),
      },
    });

    return `${atData.id} atualizado com sucesso!`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
