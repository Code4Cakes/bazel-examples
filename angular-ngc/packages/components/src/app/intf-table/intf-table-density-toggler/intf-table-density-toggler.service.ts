import { Injectable } from '@angular/core';

enum Density {
  CompactView = 'middle',
  ComfyView = 'default',
}

@Injectable()
export class IntfTableDensityTogglerService {
  private static instance: IntfTableDensityTogglerService;
  static Density = Density;
  Density = Density;
  density = Density.ComfyView;

  static getInstance(): IntfTableDensityTogglerService {
    if (!IntfTableDensityTogglerService.instance) {
      IntfTableDensityTogglerService.instance = new IntfTableDensityTogglerService();
    }
    return IntfTableDensityTogglerService.instance;
  }

  changeViewDensity(view) {
    this.density = view;
  }
}
