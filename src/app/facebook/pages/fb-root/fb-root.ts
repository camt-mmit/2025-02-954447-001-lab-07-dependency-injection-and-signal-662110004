import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-fb-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './fb-root.html',
  styleUrl: './fb-root.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FbRoot {}
