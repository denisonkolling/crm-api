import { Expose, Transform } from 'class-transformer';
export class TaskResponseDto {
    @Expose()
    id: string;

    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    @Transform(({ obj }) => obj.account?.id ?? null)
    accountId: string | null;

    @Expose()
    @Transform(({ obj }) => obj.account?.name ?? null)
    accountName: string | null;

    @Expose()
    @Transform(({ obj }) => obj.lead?.id ?? null)
    leadId: string | null;

    @Expose()
    @Transform(({ obj }) => obj.lead?.name ?? null)
    leadName: string | null;

    @Expose()
    @Transform(({ obj }) => obj.lead?.status ?? null)
    leadStatus: string | null;

    @Expose()
    @Transform(({ obj }) => obj.opportunity?.id ?? null)
    opportunityId: string | null;

    @Expose()
    @Transform(({ obj }) => obj.opportunity?.name ?? null)
    opportunityName: string | null;
}
