import { Document, FilterQuery, Model } from "mongoose";

class Repository<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async aggregate(pipeline: any[]) {
    return await this.model.aggregate(pipeline);
  }

  async create(item: Partial<T>) {
    return await this.model.create(item);
  }

  async deleteAll() {
    return await this.model.deleteMany();
  }

  async deleteById(id: string) {
    return await this.model.findByIdAndDelete(id);
  }

  async deleteOne(filter: FilterQuery<T>) {
    return await this.model.deleteOne(filter);
  }

  async find(filter: FilterQuery<T>) {
    return await this.model.find(filter);
  }

  async findAll() {
    return await this.model.find();
  }

  async findById(id: string) {
    return await this.model.findById(id);
  }

  async findOne(filter: FilterQuery<T>) {
    return await this.model.findOne(filter);
  }

  async update(item: Partial<T>, filter?: FilterQuery<T>, isNew = true) {
    return await this.model.updateMany(filter, item, { new: isNew });
  }

  async updateById(id: string, item: Partial<T>, isNew = true) {
    return await this.model.findByIdAndUpdate(id, item, { new: isNew });
  }

  async updateOne(item: Partial<T>, filter?: FilterQuery<T>, isNew = true) {
    return await this.model.updateOne(filter, item, { new: isNew });
  }
}

export default Repository;
