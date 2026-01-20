import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicInput } from '../dynamic-input/dynamic-input';
import { LocalStorage } from '../../services/local.storage';

@Component({
  selector: 'app-dynamic-section',
  standalone: true,
  imports: [CommonModule, DynamicInput],
  templateUrl: './dynamic-section.html',
  styleUrl: './dynamic-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSection {
  private storage = inject(LocalStorage);

  sections: number[][] = [];

  constructor() {
    const loaded = this.storage.load();
    this.sections = Array.isArray(loaded)
      ? loaded.map((sec) => [...sec.map((n) => Number(n || 0))])
      : [[0]];
  }

  private persist(sections = this.sections) {
    try {
      this.storage.save(sections);
    } catch {
      // ignore
    }
  }

  /* ---------- Section ---------- */

  addSection() {
    const next = [...this.sections, [0]];
    this.sections = next;
    this.persist(next);
  }

  removeSection(idx: number) {
    if (this.sections.length <= 1) return;

    const next = this.sections.filter((_, i) => i !== idx);
    this.sections = next;
    this.persist(next);
  }

  /* ---------- Input ---------- */

  addInput(sectionIdx: number) {
    const next = this.sections.map((sec, i) => (i === sectionIdx ? [...sec, 0] : sec));

    this.sections = next;
    this.persist(next);
  }

  removeInput(sectionIdx: number, inputIdx: number) {
    const sec = this.sections[sectionIdx];
    if (!sec || sec.length <= 1) return;

    const next = this.sections.map((s, i) =>
      i === sectionIdx ? s.filter((_, j) => j !== inputIdx) : s,
    );

    this.sections = next;
    this.persist(next);
  }

  updateValue(sectionIdx: number, inputIdx: number, value: number) {
    const next = this.sections.map((sec, i) =>
      i === sectionIdx ? sec.map((v, j) => (j === inputIdx ? Number(value) || 0 : v)) : sec,
    );

    this.sections = next;
    this.persist(next);
  }

  /* ---------- Result ---------- */

  result(sectionIdx: number) {
    const sec = this.sections[sectionIdx] || [];
    const sum = sec.reduce((a, b) => a + b, 0);

    return sum.toLocaleString('th-TH', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }

  /* ---------- trackBy ---------- */

  trackByIndex(index: number) {
    return index;
  }
}
