import { Job } from 'bull';
import {OnQueueActive, Process, Processor} from '@nestjs/bull';

@Processor('build')
export class BuildConsumer {
    @Process('build-job')
    handleBuild(job: Job) {
        const { machineData } = job.data;

        console.log('Start build...');
        console.log('completed!!');
        // TODO run build command
    }

    @OnQueueActive()
    onActive(job: Job) {
        console.log(
            `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
        );
    }
}
