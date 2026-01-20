import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dynamic-input.html',
  styleUrl: './dynamic-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicInput {
  @Input() value = 0;
  @Input() index = 0;
  @Input() removable = true;
  @Output() valueChange = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  onModelChange(v: number) {
    this.valueChange.emit(Number(v) || 0);
  }

  onRemove() {
    this.remove.emit(this.index);
  }
}
