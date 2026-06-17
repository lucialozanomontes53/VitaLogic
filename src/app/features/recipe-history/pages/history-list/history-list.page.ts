import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonIcon, IonSpinner,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, closeOutline, trashOutline } from 'ionicons/icons';
import { RecipeHistoryStore } from '@features/recipe-history/state/recipe-history.store';
import { HomeStore } from '@features/home/state/home.store';

@Component({
  selector: 'app-history-list',
  host: { class: 'ion-page' },
  templateUrl: './history-list.page.html',
  styleUrls: ['./history-list.page.scss'],
  imports: [
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonIcon, IonSpinner,
  ],
})
export class HistoryListPage implements OnInit {
  protected readonly store     = inject(RecipeHistoryStore);
  protected readonly homeStore = inject(HomeStore);

  protected readonly showModal = signal(false);
  protected newName            = '';
  protected selectedMemberId   = '';
  protected proteinsG          = 0;
  protected carbsG             = 0;
  protected vegetablesG        = 0;

  constructor() {
    addIcons({ addOutline, closeOutline, trashOutline });
  }

  async ngOnInit(): Promise<void> {
    await Promise.all([this.store.load(), this.homeStore.load()]);
  }

  protected openModal(): void {
    this.newName = ''; this.selectedMemberId = '';
    this.proteinsG = 0; this.carbsG = 0; this.vegetablesG = 0;
    this.showModal.set(true);
  }

  protected closeModal(): void { this.showModal.set(false); }

  protected async addRecipe(): Promise<void> {
    const name = this.newName.trim();
    if (!name) return;
    const member = this.homeStore.familyProfiles().find((p) => p.id === this.selectedMemberId);
    await this.store.add({
      name,
      cookedForId:   member?.id   ?? null,
      cookedForName: member?.name ?? 'Todos',
      macros: {
        proteinsG:   this.proteinsG,
        carbsG:      this.carbsG,
        vegetablesG: this.vegetablesG,
      },
    });
    this.closeModal();
  }

  protected async remove(id: string): Promise<void> {
    await this.store.remove(id);
  }
}
