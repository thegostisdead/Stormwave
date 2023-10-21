import { Job } from 'bull';
import { Process, Processor } from '@nestjs/bull';

@Processor('build')
export class BuildConsumer {
    @Process('build-job')

    handleBuild(job: Job) {
        const { machineData } = job.data;

        console.log('Start build for machine: ', machineData);
        console.log('completed!!');
        // TODO run build command
    }
}
