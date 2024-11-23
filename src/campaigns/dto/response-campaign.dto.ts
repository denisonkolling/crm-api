import { Expose, Transform } from "class-transformer";

export class CampaignResponseDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    description: string;

    @Expose()
    status: string;

    @Expose()
    startDate: Date;

    @Expose()
    endDate: Date;

    @Expose()
    @Transform(({ obj }) => {
        // Assume que obj.leads é uma Collection do MikroORM
        return obj.leads?.isInitialized()
            ? Array.from(obj.leads).map((lead: { id: number }) => lead.id)
            : [];
    })
    leadsReferenceId: number[];
}