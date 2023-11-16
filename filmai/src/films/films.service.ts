import { Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist';

@Injectable()
export class FilmsService {
  constructor(@InjectRepository(Film)
  private filmRepository: Repository<Film>
  ) {

  }
  async create(createFilmDto: CreateFilmDto): Promise<Film> {
    return this.filmRepository.save(createFilmDto);
  }

  async findAll(): Promise<Film[]> {
    return this.filmRepository.find();
  }

  async findOneBy(id: number): Promise<Film> {
    return this.filmRepository.findOneBy({
      id: id
      });
  }

  async update(id: number, updateFilmDto: UpdateFilmDto): Promise<Film> {
    try {
      await this.filmRepository.update(id, updateFilmDto);
      return this.filmRepository.findOneBy({
        id: id 
        });
    } catch (error) {
      return error;
    } 
  }

  remove(id: number): Promise<DeleteResult> {
    return this.filmRepository.delete(id);
  }
}
