import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonSearchbar, IonIcon, IonSpinner,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, closeOutline, trashOutline } from 'ionicons/icons';
import { IngredientCategory } from '@domain/entities/ingredient.entity';
import { FridgeStore } from '@features/fridge/state/fridge.store';

@Component({
  selector: 'app-fridge',
  host: { class: 'ion-page' },
  templateUrl: './fridge.page.html',
  styleUrls: ['./fridge.page.scss'],
  imports: [
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonSearchbar, IonIcon, IonSpinner,
  ],
})
export class FridgePage implements OnInit {
  protected readonly store = inject(FridgeStore);

  protected searchQuery     = signal('');
  protected readonly activeFilters = signal<Set<IngredientCategory>>(
    new Set(['proteina', 'carbohidrato', 'verdura']),
  );

  protected readonly filteredIngredients = computed(() => {
    const query   = this.searchQuery().toLowerCase();
    const filters = this.activeFilters();
    return this.store.ingredients().filter(
      (i) => filters.has(i.category) && (query === '' || i.name.toLowerCase().includes(query)),
    );
  });

  protected readonly showModal  = signal(false);
  protected newName             = '';
  protected newCategory: IngredientCategory = 'proteina';

  constructor() {
    addIcons({ addOutline, closeOutline, trashOutline });
  }

  async ngOnInit(): Promise<void> {
    await this.store.load();
  }

  protected toggleFilter(cat: IngredientCategory): void {
    this.activeFilters.update((s) => {
      const n = new Set(s);
      n.has(cat) ? n.delete(cat) : n.add(cat);
      return n;
    });
  }

  protected isActive(cat: IngredientCategory): boolean {
    return this.activeFilters().has(cat);
  }

  protected dotClass(cat: IngredientCategory): string {
    return { proteina: 'prot', carbohidrato: 'carb', verdura: 'verd' }[cat];
  }

  protected onSearch(e: CustomEvent): void {
    this.searchQuery.set((e.detail.value as string) ?? '');
  }

  protected openModal(): void  { this.newName = ''; this.newCategory = 'proteina'; this.showModal.set(true); }
  protected closeModal(): void { this.showModal.set(false); }

  protected async addIngredient(): Promise<void> {
    const name = this.newName.trim();
    if (!name) return;
    await this.store.add(name, this.newCategory);
    this.closeModal();
  }

  protected async remove(id: string, event: Event): Promise<void> {
    event.stopPropagation();
    await this.store.remove(id);
  }
}
