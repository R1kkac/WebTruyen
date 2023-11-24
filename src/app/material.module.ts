import { NgModule } from "@angular/core";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
    exports:[
        MatProgressBarModule,
        MatButtonModule,
        MatCardModule,
        MatTabsModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule
    ]
})
export class MaterialModulo{
}