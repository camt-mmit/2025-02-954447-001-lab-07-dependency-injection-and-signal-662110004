import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FbSettingsService } from '../../services/fb-settings';

@Component({
  selector: 'app-setting-page',
  imports: [FormsModule],
  templateUrl: './setting-page.html',
  styleUrl: './setting-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingPage {
  private readonly settings = inject(FbSettingsService);

  clientIdInput = signal(this.settings.clientId());

  save(): void {
    this.settings.setClientId(this.clientIdInput());
  }
}
