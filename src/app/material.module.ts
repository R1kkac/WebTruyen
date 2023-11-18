import { NgModule } from "@angular/core";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';



@NgModule({
    exports:[
        MatProgressBarModule,
        MatButtonModule,
        MatCardModule,
        MatTabsModule
    ]
})
export class MaterialModulo{
}