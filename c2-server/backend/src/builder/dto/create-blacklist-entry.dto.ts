import { IsIP, IsNotEmpty} from 'class-validator';

export class CreateBlacklistEntryDto {

    @IsNotEmpty()
    @IsIP()
    ip: string;

}
