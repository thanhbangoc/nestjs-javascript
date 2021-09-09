import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cat } from './cat.entity';

@Injectable()
@Dependencies(getRepositoryToken(Cat))
export class CatsService {
  constructor(catsRepository) {
    this.catsRepository = catsRepository;
  }

  async create(createCatDto) {
    return this.catsRepository.save(createCatDto);
  }

  async findAll() {
    return this.catsRepository.find();
  }

  async findOne(id) {
    return this.catsRepository.findOne({
      where: {
        id,
      }
    });
  }

  async remove(id) {
    this.catsRepository.delete(id);
  }
}
