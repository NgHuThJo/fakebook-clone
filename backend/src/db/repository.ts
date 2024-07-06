import { Document, FilterQuery, Model } from "mongoose";

class Repository<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async aggregate(pipeline: any[]) {
    return this.model.aggregate(pipeline);
  }

  async create(item: Partial<T>) {
    return this.model.create(item);
  }

  async deleteAll() {
    return this.model.deleteMany();
  }

  async deleteById(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  async deleteOne(filter: FilterQuery<T>) {
    return this.model.deleteOne(filter);
  }

  async find(filter: FilterQuery<T>, projection?: string) {
    return this.model.find(filter, projection);
  }

  async findAll(projection?: string) {
    return this.model.find({}, projection);
  }

  async findById(id: string, projection?: string) {
    return this.model.findById(id, projection);
  }

  async findOne(filter: FilterQuery<T>, projection?: string) {
    return this.model.findOne(filter, projection);
  }

  async update(item: Partial<T>, filter?: FilterQuery<T>, isNew = true) {
    return this.model.updateMany(filter, item, { new: isNew });
  }

  async updateById(id: string, filter?: FilterQuery<T>, isNew = true) {
    return this.model.findByIdAndUpdate(id, filter, { new: isNew });
  }

  async updateOne(item: Partial<T>, filter?: FilterQuery<T>, isNew = true) {
    return this.model.updateOne(filter, item, { new: isNew });
  }
}

export default Repository;
