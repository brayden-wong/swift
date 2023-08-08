import { Inject } from '@nestjs/common';

const INJECT_DRIZZLE_TOKEN = Symbol('DRIZZLE_TOKEN_INJECTION_TOKEN');

export const getDrizzleToken = () => Inject(INJECT_DRIZZLE_TOKEN);
export const InjectDrizzle = () => Inject(getDrizzleToken());
