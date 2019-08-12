import { Model } from 'mongoose';
import { IRepository } from '../../core/application/common/repository.interface';

export abstract class BaseRepository<T> implements IRepository<T> {

  protected constructor(
    private readonly model: Model<T>,
  ) {
  }

  create(entity: any): Promise<T> {
    const newModel = new this.model(entity);
    return newModel.save();
  }

  async createBatch(entity: any[]): Promise<number> {
    await this.model.create(entity);
    return entity.length;
  }

  async update(entity: any): Promise<T> {
    delete entity._id;
    await this.model.updateOne({ id: entity.id }, entity);
    return entity;
  }

  async get(tid: any): Promise<T> {
    const result = await this.model.findOne({ id: tid }).exec();
    return result.toObject();
  }

  async getAll(criteria?: any): Promise<T[]> {

    if (criteria) {
      return this.model.find(criteria).exec();
    }
    return this.model.find().exec();
  }

  async delete(tid: any) {
    await this.model.deleteOne({ id: tid }).exec();
    return true;
  }

  async getCount(): Promise<number> {
    return await this.model.estimatedDocumentCount({});
  }

  getModel(): any {
    return this.model;
  }

}
