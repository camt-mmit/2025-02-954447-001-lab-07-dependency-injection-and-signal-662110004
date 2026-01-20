import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicSection } from '../../components/dynamic-section/dynamic-section';

@Component({
  selector: 'app-assg-display-page',
  standalone: true,
  imports: [CommonModule, DynamicSection],
  templateUrl: './assg-display-page.html',
  styleUrl: './assg-display-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignmentDisplayPage {}
