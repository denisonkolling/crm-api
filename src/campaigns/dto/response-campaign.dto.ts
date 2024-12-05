import { Expose, Type } from "class-transformer";
import { LeadResponseDto } from "src/leads/dto/response-lead.dto";


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
    @Type(() => LeadResponseDto)
    leads: LeadResponseDto[];
}