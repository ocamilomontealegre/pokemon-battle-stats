import { Types, type Document, type Model } from "mongoose";

export class MongoRepository<T extends Document> {
  public constructor(private readonly documentModel: Model<T>) {}

  public async create(item: Partial<T>): Promise<T> {
    return this.documentModel.create(item);
  }

  public async find(): Promise<T[]> {
    return this.documentModel.find();
  }

  public async findById(id: string): Promise<T | null> {
    return this.documentModel.findById({ _id: new Types.ObjectId(id) });
  }

  public async update(id: string, item: Partial<T>): Promise<T | null> {
    return this.documentModel.findOneAndUpdate({ _id: id }, item, { new: true });
  }

  public async delete(id: string): Promise<T | null> {
    return this.documentModel.findOneAndDelete({ id });
  }
}

