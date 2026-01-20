import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { inject } from '@angular/core';
import { ContactStorage } from '../../services/contact.storage';
import { DisplayContact } from '../../components/display-contact/display-contact';

@Component({
  selector: 'app-example-display-page',
  standalone: true,
  imports: [DisplayContact],
  templateUrl: './example-display-page.html',
  styleUrls: ['./example-display-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleDisplayPage {
  private readonly dataStorage = inject(ContactStorage);
  protected readonly contacts = signal(this.dataStorage.get() ?? []);
}
