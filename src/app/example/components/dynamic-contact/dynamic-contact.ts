import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { DynamicTel } from '../dynamic-tel/dynamic-tel';
import { createContact } from '../../helpers';
import { ContactModel } from '../../types';

@Component({
  selector: 'app-dynamic-contact',
  standalone: true,
  imports: [DynamicTel],
  templateUrl: './dynamic-contact.html',
  styleUrls: ['./dynamic-contact.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicContact {
  readonly contact = model<readonly ContactModel[]>([createContact()]);

  protected addContact(): void {
    this.contact.update((contacts) => {
      return [...contacts, createContact()];
    });
  }

  protected removeContact(index: number): void {
    this.contact.update((contacts) => {
      return contacts.filter((_value, i) => i !== index);
    });
  }

  protected changeContact(index: number, value: ContactModel): void {
    this.contact.update((contacts) => {
      return contacts.map((contact, i) => {
        if (i === index) {
          contact.name = value.name;
          contact.tels = value.tels;
        }
        return contact;
      });
    });
  }
}
