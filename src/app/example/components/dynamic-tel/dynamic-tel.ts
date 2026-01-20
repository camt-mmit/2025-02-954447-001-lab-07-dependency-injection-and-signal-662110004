import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { createContact, createTel } from '../../helpers';
import { ContactModel, TelModel } from '../../types';

@Component({
  selector: 'app-dynamic-tel',
  standalone: true,
  imports: [],
  templateUrl: './dynamic-tel.html',
  styleUrls: ['./dynamic-tel.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicTel {
  readonly number = input<number | null>(null);
  readonly contact = input<ContactModel>(createContact());
  readonly removable = input(false);

  readonly remove = output<void>();
  readonly contactChange = output<ContactModel>();

  protected changeName(name: string): void {
    const current = this.contact();
    this.contactChange.emit({
      ...current,
      name,
    });
  }

  protected addTel(): void {
    const current = this.contact();
    this.contactChange.emit({
      ...current,
      tels: [...current.tels, createTel()],
    });
  }

  protected removeTel(index: number): void {
    const current = this.contact();
    this.contactChange.emit({
      ...current,
      tels: current.tels.filter((_value, i) => i !== index),
    });
  }

  protected changeTel(index: number, value: string): void {
    const current = this.contact();
    this.contactChange.emit({
      ...current,
      tels: current.tels.map((tel: TelModel, i) => {
        if (i === index) {
          return { ...tel, value };
        }
        return tel;
      }),
    });
  }
}
