import { Component } from '@angular/core';
import {
  FormControl,
  FormControlName,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [MatInputModule, ReactiveFormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchControl = new FormControl('');
  results: any[] = [];
  loading = false;
  error = '';

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((term) => {
          if (!term || term.trim() === '') {
            this.results = [];
            return [];
          }
          this.loading = true;
          this.error = '';
          return this.searchService.search(term.trim());
        })
      )
      .subscribe({
        next: (data) => {
          this.loading = false;
          this.results = data;
        },
        error: (err) => {
          this.loading = false;
          this.error = 'Error al buscar datos.';
          console.error(err);
        },
      });
  }
}
