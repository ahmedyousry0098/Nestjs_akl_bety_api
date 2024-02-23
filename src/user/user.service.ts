import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { LoginDTO, RegisterDTO } from './dto/user.dto';
import {compareSync, hashSync} from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

    constructor(
        private _PrismaService: PrismaService,
        private _JwtService: JwtService
    ) {}

    async register(
        response: Response,
        userInfo: RegisterDTO
    ) {
        const {email, phone_number, password, role, age, username} = userInfo;
        const existingUser = await this._PrismaService.users.findUnique({
            where: {
                email,
                phone_number
            },
            select: {
                email: true,
            }
        })
        if (existingUser) {
            throw new ConflictException('User alredy exist')
        }
        const hashedPassword = hashSync(password)
        const newUser = await this._PrismaService.users.create({
            data: {
                username, 
                email,
                password: hashedPassword,
                phone_number, 
                age,
                role,
            },
        })
        if (!newUser) {
            throw new InternalServerErrorException('Something Went Wrong Please Try Again')
        }
        await this._PrismaService.location.create({
            data: {
                lat: userInfo.location.lat,
                lang: userInfo.location.lang,
                user_id: newUser.id
            }
        });
        return response.status(201).json({message: 'User Created Successfully'})
    };

    async login(
        response: Response,
        userInfo: LoginDTO
    ) {
        const {email, password} = userInfo;
        const user = await this._PrismaService.users.findFirst({
            where: {
                email
            }
        });
        if (!user) {
            throw new UnauthorizedException()
        }
        const isPasswordMatch = compareSync(password, user.password)
        if (!isPasswordMatch) {
            throw new UnauthorizedException()
        }
        const jwt = await this._JwtService.signAsync({id: user.id, email})
        return response.status(200).json({message: 'signed in successfully', token: jwt})
    }
}
