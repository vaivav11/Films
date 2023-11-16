import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmsModule } from './films/films.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './films/entities/film.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:'localhost',
      port: 5432,
      username: 'postgres',
      database: 'filmai',
      entities: [Film],
      synchronize: true,
    }), FilmsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
