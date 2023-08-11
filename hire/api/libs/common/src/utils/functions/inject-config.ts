import { ConfigModule, ConfigService } from "@nestjs/config";

export const InjectConfig = (name: string) => ({
  name,
  imports: [ConfigModule],
  inject: [ConfigService],
});
