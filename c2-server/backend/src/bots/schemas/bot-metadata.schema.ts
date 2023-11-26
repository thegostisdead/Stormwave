import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BotMetadataDocument = HydratedDocument<BotMetadata>;

@Schema()
export class BotMetadata {
  @Prop()
  botId: number;

  @Prop()
  deployedPayloads: string[];
}

export const BotMetadataSchema = SchemaFactory.createForClass(BotMetadata);
