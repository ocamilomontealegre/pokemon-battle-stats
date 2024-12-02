import {
  Types,
  type Document,
  type FilterQuery,
  type Model,
  type ProjectionType,
  type QueryOptions,
  type UpdateQuery,
} from "mongoose";

export class MongoRepository<T extends Document> {
  public constructor(private readonly model: Model<T>) {}

  public async create(item: Partial<T>): Promise<T> {
    return this.model.create(item);
  }

  public async createMany(items: Partial<T>[]): Promise<Omit<Partial<T>, "_id">[]> {
    return this.model.insertMany(items);
  }

  public async find(
    filter: FilterQuery<T> = {},
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<T[]> {
    return this.model.find(filter, projection, options);
  }

  public async findById(
    id: string,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<T | null> {
    return this.model.findById({ _id: new Types.ObjectId(id) }, projection, options);
  }

  public async findByIdAndUpdate(
    id: string,
    updateData: Partial<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<T | null> {
    const queryOptions = {
      ...options,
      projection,
    };

    return this.model.findByIdAndUpdate(
      { _id: new Types.ObjectId(id) },
      updateData,
      queryOptions,
    );
  }

  public async findByQueryAndUpdate(
    filter: FilterQuery<T>,
    updateData?: UpdateQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<T | null> {
    const queryOptions = {
      ...options,
      projection,
    };

    return this.model.findOneAndUpdate(filter, updateData, queryOptions);
  }

  // public async updateMany(
  //   filter: FilterQuery<T>,
  //   updateData: UpdateQuery<T>,
  //   options: QueryOptions<T>,
  // ) {
  //   return this.model.updateMany();
  // }

  public async findByIdAndDelete(
    id: string,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<T | null> {
    const queryOptions = {
      ...options,
      projection,
    };

    return this.model.findByIdAndDelete({ _id: new Types.ObjectId(id) }, queryOptions);
  }

  public async findByQueryAndDelete(
    filter: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<T | null> {
    const queryOptions = {
      ...options,
      projection,
    };

    return this.model.findOneAndDelete(filter, queryOptions);
  }
}

