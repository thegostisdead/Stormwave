export interface Bot {
  uuid: string;
  hostname: string;
  id: number;
  deployedPayloads: string[];
  lastSeen: Date;
  os: string;
  arch: string;
}
