import {Body, Controller, Delete, Param, Post} from '@nestjs/common';
import {BuilderService} from "./builder.service";
import {MachineInfoDto} from "./dto/machine-info.dto";
import {CreateBlacklistEntryDto} from "./dto/create-blacklist-entry.dto";

@Controller('builder')
export class BuilderController {

    constructor(private builderService: BuilderService) {
    }

    @Post("/build")
    build(@Body() machineInfo: MachineInfoDto) {
        return this.builderService.build(machineInfo)
    }

    @Post("/blacklist")
    addBlackListEntry(@Body() ip: CreateBlacklistEntryDto) {
        return this.builderService.createBlacklist(ip.ip)
    }

    @Delete("/blacklist/:ip")
    deleteBlackListEntry(@Param("ip") ip: string) {
        return this.builderService.removeBlacklist(ip)
    }

    @Delete("/blacklist")
    clearBlackList() {
        return this.builderService.clearBlacklist()
    }

}
