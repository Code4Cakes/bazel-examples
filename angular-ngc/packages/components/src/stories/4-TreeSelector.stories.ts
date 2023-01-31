import { storiesOf, moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { IntfBreadcrumbsComponent } from '../app/intf-breadcrumbs';
import { TreeSelectorModule } from '../app/tree-selector/tree-selector.module';
import { TreeSelectorComponent } from '../app/tree-selector/tree-selector.component';

storiesOf('Tree Selector', module)
  .addDecorator(
    moduleMetadata({
      declarations: [],
      imports: [BrowserAnimationsModule, TreeSelectorModule],
    })
  )
  .add('Default', () => ({
    template: `
      <tree-selector
        label="Tree Selector Label"
        description="Tree Selector Description"
        [data]="data"
        [treeOptions]="treeOptions"
      ></tree-selector>
    `,
    props: {
      data: [
        {
          id: '1',
          name: 'Lucy',
          children: [
            {
              id: '2',
              name: 'Mullen',
              children: [{ id: '5', name: 'Jerad' }],
            },
            {
              id: '3',
              name: 'Cat Jr',
            },
          ],
        },
        {
          id: '2',
          name: 'Anakin',
          children: [
            { id: '4', name: 'Luke' },
            {
              id: '5',
              name: 'Leia',
              children: [{ id: '6', name: 'Ben' }],
            },
          ],
        },
      ],
      treeOptions: {
        nameKey: 'name',
        childrenKey: 'children',
      },
    },
  }));
