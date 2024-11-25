import type { Document, Model } from "mongoose";

export class MongoRepository<T extends Document> {
  public constructor(private readonly documentModel: Model<T>) {}

  public async create(item: Partial<T>): Promise<T> {
    const document = this.documentModel.create(item);
    return (await document).save();
  }

  public async find(): Promise<Array<T>> {
    return this.documentModel.find().lean();
  }

  public async findById(id: string): Promise<T | null> {
    return this.documentModel.findById(id);
  }

  public async update(id: string, item: Partial<T>): Promise<T | null> {
    return this.documentModel.findOneAndUpdate({ id }, item, { new: true });
  }

  public async delete(id: string): Promise<T | null> {
    return this.documentModel.findOneAndDelete({ id });
  }
}

