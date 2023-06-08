import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-offline-pop-up',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './offline-pop-up.component.html',
  styleUrls: ['./offline-pop-up.component.scss']
})
export class OfflinePopUpComponent {

}
