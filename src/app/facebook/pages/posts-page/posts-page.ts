import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  HostListener,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FbAuthService } from '../../services/fb-auth';
import { FbApiService } from '../../services/fb-api';
import { FbSettingsService } from '../../services/fb-settings';
import { FbPost, FbUser } from '../../types';

@Component({
  selector: 'app-posts-page',
  imports: [FormsModule, DatePipe, RouterLink],
  templateUrl: './posts-page.html',
  styleUrl: './posts-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsPage implements OnInit {
  private readonly auth = inject(FbAuthService);
  private readonly api = inject(FbApiService);
  private readonly settings = inject(FbSettingsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly isLoggedIn = this.auth.isLoggedIn;
  readonly clientId = this.settings.clientId;
  readonly hasClientId = computed(() => !!this.settings.clientId());

  user = signal<FbUser | null>(null);
  posts = signal<FbPost[]>([]);
  filter = signal('');
  nextCursor = signal<string | undefined>(undefined);
  hasMore = signal(false);
  loading = signal(false);

  readonly filteredPosts = computed(() => {
    const q = this.filter().toLowerCase();
    if (!q) return this.posts();
    return this.posts().filter(
      (p) => p.message?.toLowerCase().includes(q) || p.name?.toLowerCase().includes(q),
    );
  });

  readonly redirectUri = `${window.location.origin}/posts`;

  constructor() {
    effect(() => {
      if (this.filter() !== undefined) {
        const params = this.filter() ? { q: this.filter() } : {};
        this.router.navigate([], { queryParams: params, replaceUrl: true });
      }
    });
  }

  async ngOnInit(): Promise<void> {
    const code = this.route.snapshot.queryParamMap.get('code');
    const state = this.route.snapshot.queryParamMap.get('state');

    if (code && state === 'fbauth') {
      await this.router.navigate([], { queryParams: {}, replaceUrl: true });
      try {
        await this.auth.handleCallback(code, this.clientId(), this.redirectUri);
      } catch (e) {
        console.error('Token exchange error:', e);
      }
    }

    const q = this.route.snapshot.queryParamMap.get('q');
    if (q) this.filter.set(q);

    if (this.auth.isLoggedIn()) {
      this.loadUser();
      this.loadPosts();
    }
  }

  async login(): Promise<void> {
    await this.auth.login(this.clientId(), this.redirectUri);
  }

  logout(): void {
    this.auth.logout();
    this.user.set(null);
    this.posts.set([]);
    this.nextCursor.set(undefined);
  }

  private loadUser(): void {
    this.api.getMe(this.auth.token()!).subscribe((u) => this.user.set(u));
  }

  loadPosts(after?: string): void {
    const token = this.auth.token();
    if (!token || this.loading()) return;
    this.loading.set(true);

    this.api.getPosts(token, 100, after).subscribe({
      next: (res) => {
        this.posts.update((prev) => (after ? [...prev, ...res.data] : res.data));
        this.nextCursor.set(res.paging?.cursors?.after);
        this.hasMore.set(!!res.paging?.next);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  loadMore(): void {
    if (this.hasMore() && this.nextCursor()) {
      this.loadPosts(this.nextCursor());
    }
  }

  clearFilter(): void {
    this.filter.set('');
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const threshold = 200;
    const position = window.scrollY + window.innerHeight;
    const height = document.documentElement.scrollHeight;
    if (position >= height - threshold) {
      this.loadMore();
    }
  }
}
