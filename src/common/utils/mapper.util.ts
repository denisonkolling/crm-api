import { plainToInstance } from 'class-transformer';

export class MapperUtil {

    static mapToDto<T, V>(cls: new () => T, plainObject: V): T {
        return plainToInstance(cls, plainObject);
    }

    static mapToDtoExcludeExtraneousValues<T, V>(cls: new () => T, plainObject: V): T {
        return plainToInstance(cls, plainObject, { excludeExtraneousValues: true });
    }

}