// นำเข้า decorators และ interfaces ที่จำเป็น
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
export class DynamicInput implements OnChanges {
  @Input() value = 0;
  @Input() index = 0;
  @Input() removable = true;
  @Output() valueChange = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  protected internalValue = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && changes['value'].currentValue !== undefined) {
      this.internalValue = this.value;
    }
  }

  onModelChange(v: number) {
    const numValue = Number(v) || 0;

    this.internalValue = numValue;

    this.valueChange.emit(numValue);
  }

  onRemove() {
    this.remove.emit(this.index);
  }
}
