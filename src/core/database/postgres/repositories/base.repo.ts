import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectLiteral,
  SaveOptions,
  UpdateResult,
  Repository,
  DeepPartial,
  ObjectId,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { handleError } from '../db.utils';

export abstract class BaseRepository<
  Entity extends ObjectLiteral,
> extends Repository<Entity> {
  public override find(options?: FindManyOptions<Entity>): Promise<Entity[]> {
    return handleError<Entity[]>(() => {
      return super.find(options);
    }, []);
  }

  public override findOne(
    options: FindOneOptions<Entity>,
  ): Promise<Entity | null> {
    return handleError<Entity>(() => {
      return super.findOne(options);
    });
  }

  public override findAndCount(
    options: FindManyOptions<Entity>,
  ): Promise<[Entity[], number]> {
    return handleError<[Entity[], number]>(() => {
      return super.findAndCount(options);
    });
  }

  public override save<T extends DeepPartial<Entity>>(
    entity: T,
    options?: SaveOptions & {
      reload: false;
    },
  ): Promise<T> {
    return handleError<T>(() => {
      return super.save(entity, options);
    });
  }

  public saveBulk<T extends DeepPartial<Entity>>(
    entities: T[],
    options?: SaveOptions & {
      reload: false;
    },
  ): Promise<T[]> {
    return handleError<T[]>(() => {
      return super.save(entities, options);
    });
  }

  public override update(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<Entity>,
    entity: QueryDeepPartialEntity<Entity>,
  ): Promise<UpdateResult> {
    return handleError(() => {
      return super.update(criteria, entity);
    });
  }
}
