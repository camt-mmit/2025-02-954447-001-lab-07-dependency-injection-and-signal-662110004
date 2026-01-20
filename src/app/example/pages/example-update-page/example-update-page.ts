import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { DynamicContact } from '../../components/dynamic-contact/dynamic-contact';
import { createContacts, toContacts } from '../../helpers';
import { ContactStorage } from '../../services/contact.storage';

@Component({
  selector: 'app-example-update-page',
  standalone: true,
  imports: [DynamicContact],
  templateUrl: './example-update-page.html',
  styleUrls: ['./example-update-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleUpdatePage {
  private readonly dataStorage = inject(ContactStorage);
  protected readonly contacts = signal(createContacts(this.dataStorage.get() ?? undefined));

  constructor() {
    effect(() => {
      const modelData = this.contacts();
      this.dataStorage.set(toContacts(modelData));
    });
  }
}
