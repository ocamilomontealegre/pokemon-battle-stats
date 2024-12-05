import {
  Types,
  type Document,
  type FilterQuery,
  type Model,
  type MongooseUpdateQueryOptions,
  type ProjectionType,
  type QueryOptions,
  type UpdateQuery,
  type UpdateWriteOpResult,
} from "mongoose";

interface IUpdate<T> {
  filter: FilterQuery<T>;
  updateData: UpdateQuery<T>;
  projection?: ProjectionType<T>;
  options?: MongooseUpdateQueryOptions<T>;
}

export class MongoRepository<T extends Document> {
  public constructor(private readonly model: Model<T>) {}

  public async create(item: Partial<T>): Promise<T> {
    return this.model.create(item);
  }

  public async createMany(items: Partial<T>[]): Promise<Omit<Partial<T>, "_id">[]> {
    return this.model.insertMany(items);
  }

  public async find({
    filter = {},
    projection,
    options,
  }: {
    filter?: FilterQuery<T>;
    projection?: ProjectionType<T>;
    options?: QueryOptions<T>;
  }): Promise<T[]> {
    return this.model.find(filter, projection, options);
  }

  public async findById({
    id,
    projection,
    options,
  }: {
    id: string;
    projection?: ProjectionType<T>;
    options?: QueryOptions<T>;
  }): Promise<T | null> {
    return this.model.findById({ _id: new Types.ObjectId(id) }, projection, options);
  }

  public async findByIdAndUpdate({
    filter,
    updateData,
    projection,
    options,
  }: IUpdate<T>): Promise<T | null> {
    const queryOptions = {
      ...options,
      projection,
    };

    return this.model.findByIdAndUpdate({ _id: filter }, updateData, queryOptions);
  }

  public async findByQueryAndUpdate({
    filter,
    updateData,
    projection,
    options,
  }: IUpdate<T>): Promise<T | null> {
    const queryOptions = {
      ...options,
      projection,
    };

    return this.model.findOneAndUpdate(filter, updateData, queryOptions);
  }

  public async updateMany({
    filter,
    updateData,
    options,
  }: IUpdate<T>): Promise<UpdateWriteOpResult> {
    return this.model.updateMany(filter, updateData, options);
  }

  public async findByIdAndDelete({
    id,
    projection,
    options,
  }: {
    id: string;
    projection?: ProjectionType<T>;
    options?: QueryOptions<T>;
  }): Promise<T | null> {
    const queryOptions = {
      ...options,
      projection,
    };

    return this.model.findByIdAndDelete({ _id: new Types.ObjectId(id) }, queryOptions);
  }

  public async findByQueryAndDelete({
    filter,
    projection,
    options,
  }: {
    filter: FilterQuery<T>;
    projection?: ProjectionType<T>;
    options?: QueryOptions<T>;
  }): Promise<T | null> {
    const queryOptions = {
      ...options,
      projection,
    };

    return this.model.findOneAndDelete(filter, queryOptions);
  }
}

