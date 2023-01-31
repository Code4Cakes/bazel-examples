import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { TreeSelectorComponent } from './tree-selector.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as axe from 'axe-core';

describe('TreeSelectorComponent', () => {
  let component: TreeSelectorComponent;
  let fixture: ComponentFixture<TreeSelectorComponent>;
  const mockForm: FormGroup = new FormGroup({
    selectedItem: new FormControl(null, {}),
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TreeSelectorComponent],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeSelectorComponent);
    component = fixture.componentInstance;
    component.form = mockForm;
    component.data = [
      {
        id: '1',
        name: 'Lucy',
        children: [
          {
            id: '2',
            name: 'Mullen',
            children: [
              {
                id: '2',
                name: 'Susan',
                children: [],
              },
            ],
          },
          {
            id: '3',
            name: 'Cat Jr',
          },
          {
            id: '4',
            name: 'Vader',
          },
        ],
      },
    ];
    component.treeOptions = {
      nameKey: 'name',
      childrenKey: 'children',
    };
    component.label = 'Cat Family Tree';
    component.required = false;
    fixture.detectChanges();
  });

  describe('Init', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be accessible', async () => {
      await axe.run(fixture.nativeElement).then(results => {
        results.violations.forEach(v => console.error(v));
        expect(results.violations.length).toBe(0);
      });
    });

    it('should not add depth guide to root level', () => {
      expect(component.showDepthAtRoot).toBe(false);
    });
  });

  describe('data with multiple root items', () => {
    beforeEach(() => {
      component.data = [
        {
          id: '1',
          name: 'Peter',
          children: [
            {
              id: '2',
              name: 'Susan',
              children: [],
            },
          ],
        },
        {
          id: '3',
          name: 'Edmond',
          children: [],
        },
        {
          id: '4',
          name: 'Lucy',
          children: [
            {
              id: '5',
              name: 'Tumnus',
              children: [],
            },
          ],
        },
      ];
      fixture.detectChanges();
    });

    it('should create a new root so all elements display', () => {
      expect(component.items.length).toBe(5);
    });

    it('should show the depth guide at the root level', () => {
      expect(component.showDepthAtRoot).toBe(true);
    });
  });

  describe('It should have an initial selected value of', () => {
    it('null if initialValue is null', () => {
      component.value = null;
      component.setByValue();
      expect(component.selectedItem).toBe(null);
    });

    it('the specified initalValue if provided', () => {
      component.value = { id: '2' };
      component.setByValue();
      expect(component.selectedItem.data.name).toBe('Mullen');
      expect(component.selectedItem.childCount).toBe(1);
    });
  });

  describe('input behavior', () => {
    it('should emit the input value to the parent', () => {
      spyOn(component.formChange, 'emit');
      component.setByValue();
      component.sendFormInfo();
      expect(component.formChange.emit).toHaveBeenCalled();
    });

    it('should get the correct display text', () => {
      const result = component.getDisplayText(component.items[0]);
      expect(result).toBe('Lucy');
    });
  });
});
