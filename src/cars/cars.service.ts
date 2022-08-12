import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    { id: uuid(), brand: 'Toyota', model: 'Corolla' },
    // { id: uuid(), brand: 'Honda', model: 'Civic' },
    // { id: uuid(), brand: 'Jeep', model: 'Cherokee' },
  ];

  findAll() {
    return this.cars;
  }

  findById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException(`Car with id '${id}' not found`);

    return car;
  }

  addNewCar(createCarDto: CreateCarDto) {
    const newCar: Car = {
      ...createCarDto,
      id: uuid(),
    };
    this.cars.push(newCar);
    return newCar;
  }

  update(id: string, createCarDto: UpdateCarDto) {
    let updatedCar = this.findById(id);
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        updatedCar = {
          id,
          brand: createCarDto.brand ? createCarDto.brand : car.brand,
          model: createCarDto.model ? createCarDto.model : car.model,
        };
        return updatedCar;
      }
      return car;
    });
    return updatedCar;
  }

  delete(id: string) {
    const updatedCar = this.findById(id);
    this.cars = this.cars.filter((car) => car.id !== updatedCar.id);

    return;
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
