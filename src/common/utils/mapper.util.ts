import { ClassConstructor, plainToInstance } from 'class-transformer';
import { AccountDto } from 'src/accounts/dto/account.dto';
import { Account } from 'src/accounts/entities/account.entity';
import { CampaignDto } from 'src/campaigns/dto/campaign.dto';
import { Campaign } from 'src/campaigns/entities/campaign.entity';

export class MapperUtil {

    static convertToDto<T, V>(cls: new () => T, plainObject: V): T {
        return plainToInstance(cls, plainObject);
    }

    static mapToDtoExcludeExtraneousValues<T, V>(cls: new () => T, plainObject: V): T {
        return plainToInstance(cls, plainObject, { excludeExtraneousValues: true });
    }

    static mapToAccountDto(account: Account): AccountDto {
        return plainToInstance(
            AccountDto,
            {
                ...account,
                contacts: account.contacts?.toArray(),
            },
            { excludeExtraneousValues: true }
        );
    }

    static mapToCampaignDto(campaign: Campaign): CampaignDto {
        return plainToInstance(
            CampaignDto,
            {
                ...campaign,
                leads: campaign.leads?.toArray(),
            },
            { excludeExtraneousValues: true }
        );
    }

    static mapToDto<T>(
        dtoClass: ClassConstructor<T>,
        plainObject: Record<string, any>,
        options: { excludeExtraneousValues?: boolean } = {}
    ): T {
        // Define excludeExtraneousValues como true por padrão
        const mergedOptions = { excludeExtraneousValues: true, ...options };

        // Processa cada propriedade do objeto
        const processedObject = Object.entries(plainObject).reduce((acc, [key, value]) => {
            acc[key] =
                value && typeof value.toArray === 'function' // Verifica se é uma Collection ou similar
                    ? value.toArray() // Converte para array
                    : value; // Mantém o valor original para outros casos
            return acc;
        }, {} as Record<string, any>);

        // Converte o objeto processado para a instância do DTO
        return plainToInstance(dtoClass, processedObject, mergedOptions);
    }
}