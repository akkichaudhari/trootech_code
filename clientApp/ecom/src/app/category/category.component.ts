import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryFormComponent } from './category-form/category-form.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  categories: any[] = [];
  bsModalRef: BsModalRef = undefined!;

  constructor(private categoryService: CategoryService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  openCatForm() {
    this.bsModalRef = this.modalService.show(CategoryFormComponent,
      { class: 'modal-xl' });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (response: any) => {
        this.categories = response.data;
      },
      (error: any) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  openEditModal(categoryId: number): void {
    const initialState = {
      categoryId: categoryId
    };
    this.bsModalRef = this.modalService.show(CategoryFormComponent, { initialState });
    this.bsModalRef.content.bsModalRef = this.bsModalRef;
  }

  deleteCategory(categoryId: number): void {
    // Implement the delete functionality here
    // For example, you can display a confirmation dialog and make an HTTP request to delete the category
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(categoryId)
        .subscribe(
          () => {
            // Remove the deleted category from the categories array
            this.loadCategories()
            console.log('Category deleted successfully');
          },
          (error) => {
            console.error('Error deleting category:', error);
          }
        );
    }
  }
}