import { IsEmail, IsNotEmpty } from 'class-validator';

export class MachineInfoDto {

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    uuid: string;

    @IsNotEmpty()
    privateIp: string;

    @IsNotEmpty()
    platform: string;

    @IsNotEmpty()
    arch: 'x64' | 'x86';
}
