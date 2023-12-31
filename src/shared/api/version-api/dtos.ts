export const DBVersion = { A: 1, B: 2, C: 3 } as const;
export type DBVersion = (typeof DBVersion)[keyof typeof DBVersion];

/** DBVersion or 0 if database is not exists on a device */
export type DeviceDBVersion = DBVersion | 0;
