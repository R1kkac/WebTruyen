import { NgModule } from "@angular/core";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule } from "@angular/forms";





@NgModule({
    exports:[
        MatProgressBarModule,
        MatButtonModule,
        MatCardModule,
        MatTabsModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatListModule,
        MatIconModule,
        MatDividerModule,
        MatTableModule,
        MatAutocompleteModule,
        FormsModule
    ]
})
export class MaterialModulo{
}