import { Document, FilterQuery, Model } from "mongoose";

class Repository<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(item: Partial<T>) {
    return await this.model.create(item);
  }

  async findById(id: string) {
    return await this.model.findById(id);
  }

  async findAll() {
    return await this.model.find();
  }

  async update(id: string, item: Partial<T>, isNew = true) {
    return await this.model.findByIdAndUpdate(id, item, { new: isNew });
  }

  async delete(id: string) {
    return await this.model.findByIdAndDelete(id);
  }

  async aggregate(pipeline: any[]) {
    return await this.model.aggregate(pipeline);
  }

  async find(item: FilterQuery<T>) {
    return await this.model.find(item);
  }

  async findOne(item: FilterQuery<T>) {
    return await this.model.findOne(item);
  }
}

export default Repository;
