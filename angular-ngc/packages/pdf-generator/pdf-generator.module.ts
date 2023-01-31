import { NgModule } from '@angular/core';
import { PdfGenerator } from '@intf/pdf-generator/pdf-generator.service';
import { EnvironmentModule } from '@intf/environments/src/environment.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [EnvironmentModule, HttpClientModule],
  providers: [PdfGenerator],
})
export class PdfGeneratorModule {}
