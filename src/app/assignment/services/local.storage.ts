import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  private readonly KEY = 'ng-section-data';

  load(): number[][] {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (!raw) return [[0]];
      const v = JSON.parse(raw);
      if (Array.isArray(v)) return v;
      return [[0]];
    } catch (e) {
      return [[0]];
    }
  }

  save(sections: number[][]) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(sections));
    } catch (e) {
      // ignore
    }
  }

  clear() {
    localStorage.removeItem(this.KEY);
  }
}
