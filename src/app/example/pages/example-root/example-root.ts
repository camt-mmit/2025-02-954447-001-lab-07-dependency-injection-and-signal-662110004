import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-example-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './example-root.html',
  styleUrls: ['./example-root.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleRoot {}
