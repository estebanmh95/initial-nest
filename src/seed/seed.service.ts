import { Injectable } from '@nestjs/common';
import { BrandsService } from 'src/brands/brands.service';
import { CarsService } from 'src/cars/cars.service';
import { BRAND_SEED } from './data/brands.seed';
import { CARS_SEED } from './data/cars.seed';

@Injectable()
export class SeedService {
  constructor(
    private readonly carsSerive: CarsService,
    private readonly brandsSerive: BrandsService,
  ) {}
  populateDB() {
    this.brandsSerive.fillBrandsWithSeedData(BRAND_SEED);
    this.carsSerive.fillCarsWithSeedData(CARS_SEED);
    return 'SEED d';
  }
}
