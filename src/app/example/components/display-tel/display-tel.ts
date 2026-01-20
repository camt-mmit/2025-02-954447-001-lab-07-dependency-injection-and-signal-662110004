import { ChangeDetectionStrategy, Component, input, numberAttribute } from '@angular/core';
import { Contact } from '../../types';

@Component({
  selector: 'app-display-tel',
  standalone: true,
  imports: [],
  templateUrl: './display-tel.html',
  styleUrls: ['./display-tel.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayTel {
  readonly contact = input.required<Contact>();

  readonly number = input(NaN, { transform: numberAttribute });
}
