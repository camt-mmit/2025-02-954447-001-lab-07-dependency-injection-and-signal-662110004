import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-assg-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './assg-root.html',
  styleUrl: './assg-root.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignmentRoot {}
