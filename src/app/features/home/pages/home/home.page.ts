import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon, IonButtons, IonSpinner,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { powerOutline, addOutline, closeOutline } from 'ionicons/icons';
import { AuthStore } from '@features/auth/state/auth.store';
import { HomeStore } from '@features/home/state/home.store';
import { RecipeHistoryStore } from '@features/recipe-history/state/recipe-history.store';

@Component({
  selector: 'app-home',
  host: { class: 'ion-page' },
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon, IonButtons, IonSpinner,
  ],
})
export class HomePage implements OnInit {
  private readonly router      = inject(Router);
  private readonly authStore   = inject(AuthStore);
  protected readonly homeStore = inject(HomeStore);
  protected readonly historyStore = inject(RecipeHistoryStore);

  protected readonly fabOpen        = signal(false);
  protected readonly showAddMember  = signal(false);
  protected readonly selectedMember = signal<string>('all');
  protected newMemberName = '';

  protected get userName(): string {
    const user = this.authStore.currentUser();
    return user?.fullName || user?.email.value || 'Usuario';
  }

  constructor() {
    addIcons({ powerOutline, addOutline, closeOutline });
  }

  async ngOnInit(): Promise<void> {
    await Promise.all([this.homeStore.load(), this.historyStore.load()]);
  }

  protected selectMember(id: string): void {
    this.selectedMember.set(id);
  }

  protected get recentRecipes() {
    const selected = this.selectedMember();
    const all = this.historyStore.recipes();
    if (selected === 'all') return all.slice(0, 4);
    return all.filter((r) => r.cookedForId === selected).slice(0, 4);
  }

  protected toggleFab(): void    { this.fabOpen.update((v) => !v); }
  protected closeFab(): void     { this.fabOpen.set(false); }

  protected goToFridge(): void        { this.fabOpen.set(false); this.router.navigate(['/fridge']); }
  protected goToShoppingList(): void  { this.fabOpen.set(false); this.router.navigate(['/shopping-list']); }
  protected goToHistory(): void       { this.router.navigate(['/history']); }

  protected openAddMember(): void  { this.newMemberName = ''; this.showAddMember.set(true); }
  protected closeAddMember(): void { this.showAddMember.set(false); }

  protected async addMember(): Promise<void> {
    const name = this.newMemberName.trim();
    if (!name) return;
    await this.homeStore.addProfile(name);
    this.closeAddMember();
  }

  protected async removeMember(id: string, event: Event): Promise<void> {
    event.stopPropagation();
    await this.homeStore.removeProfile(id);
    if (this.selectedMember() === id) this.selectedMember.set('all');
  }

  protected async logout(): Promise<void> {
    this.authStore.logout();
    await this.router.navigate(['/auth/login']);
  }
}
