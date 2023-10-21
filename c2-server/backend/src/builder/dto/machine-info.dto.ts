import { IsEmail, IsNotEmpty } from 'class-validator';

export class MachineInfoDto {

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    uuid: string;

    @IsNotEmpty()
    publicIp: string;

    @IsNotEmpty()
    platform: string;

    @IsNotEmpty()
    arch: 'x64' | 'x86';
}
