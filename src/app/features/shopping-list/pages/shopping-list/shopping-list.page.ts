import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonIcon, IonSpinner,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, closeOutline, trashOutline } from 'ionicons/icons';
import { IngredientCategory } from '@domain/entities/ingredient.entity';
import { ShoppingListStore } from '@features/shopping-list/state/shopping-list.store';

@Component({
  selector: 'app-shopping-list',
  host: { class: 'ion-page' },
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
  imports: [
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonIcon, IonSpinner,
  ],
})
export class ShoppingListPage implements OnInit {
  protected readonly store = inject(ShoppingListStore);

  protected readonly showModal  = signal(false);
  protected newName             = '';
  protected newCategory: IngredientCategory = 'proteina';

  constructor() {
    addIcons({ addOutline, closeOutline, trashOutline });
  }

  async ngOnInit(): Promise<void> {
    await this.store.load();
  }

  protected dotClass(cat: IngredientCategory): string {
    return { proteina: 'prot', carbohidrato: 'carb', verdura: 'verd' }[cat];
  }

  protected openModal(): void  { this.newName = ''; this.newCategory = 'proteina'; this.showModal.set(true); }
  protected closeModal(): void { this.showModal.set(false); }

  protected async addItem(): Promise<void> {
    const name = this.newName.trim();
    if (!name) return;
    await this.store.add(name, this.newCategory);
    this.closeModal();
  }

  protected async toggle(id: string): Promise<void> {
    await this.store.toggle(id);
  }

  protected async remove(id: string, event: Event): Promise<void> {
    event.stopPropagation();
    await this.store.remove(id);
  }
}
