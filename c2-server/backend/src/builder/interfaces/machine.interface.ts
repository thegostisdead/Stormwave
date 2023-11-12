export interface MachineInfo {
  username: string;
  uuid: string;
  publicIp: string;
  platform: string;
  arch: 'x64' | 'x86';
}
