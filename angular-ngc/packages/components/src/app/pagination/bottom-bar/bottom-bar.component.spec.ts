import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { TestScheduler } from 'rxjs/testing';
import { BottomBarComponent } from './bottom-bar.component';

describe('PaginatorComponent', () => {
  let testScheduler;
  let component: BottomBarComponent;
  let fixture: ComponentFixture<BottomBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BottomBarComponent],
      imports: [FormsModule, MatButtonModule, MatIconModule],
    }).compileComponents();

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('unsubscribes on destroy', () => {
    const jumpToPageSpy = spyOn(component.jumpToPage, 'unsubscribe');
    const goToNextPageSpy = spyOn(component.goToNextPage, 'unsubscribe');
    const goToPreviousPageSpy = spyOn(
      component.goToPreviousPage,
      'unsubscribe'
    );

    fixture.destroy();
    expect(jumpToPageSpy).toHaveBeenCalled();
    expect(goToNextPageSpy).toHaveBeenCalled();
    expect(goToPreviousPageSpy).toHaveBeenCalled();
  });

  describe('page-button', () => {
    it('shows the correct number of pages based off records', () => {
      component.length = 100;
      component.pages = component.createPageListStartingAtOne();
      fixture.detectChanges();

      const button = fixture.debugElement.queryAll(
        By.css('button#page-button')
      );

      expect(button.length).toEqual(2);
      expect(button[0].nativeElement.textContent).toEqual(' 1 ');
      expect(button[1].nativeElement.textContent).toEqual(' 2 ');
    });

    it('first button has active index by default', () => {
      component.length = 100;
      fixture.detectChanges();

      const button = fixture.debugElement.queryAll(By.css('.active-index'));
      expect(button.length).toEqual(1);
    });

    it('can change pagination to the page index', () => {
      const spy = jest.spyOn(component.paginationChange, 'emit');
      component.length = 100;
      component.pages = component.createPageListStartingAtOne();

      fixture.detectChanges();
      const { nativeElement } = fixture.debugElement;

      const button = nativeElement.querySelectorAll('button#page-button');
      button[1].click();

      expect(component.currentIndex).toEqual(2);
      expect(spy).toHaveBeenCalledWith({ pageIndex: 1, pageSize: 50 });
    });
  });

  describe('arrow-button', () => {
    beforeEach(() => {
      component.length = 500;
    });

    it('hides arrow if current index is 1', () => {
      const button = fixture.debugElement.query(By.css('button#prev-arrow'));
      expect(button).toEqual(null);
    });

    it('hides arrow if current index is last', () => {
      component.currentIndex = 10;
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('button#next-arrow'));
      expect(button).toEqual(null);
    });

    it('index paginates forward', () => {
      testScheduler.run(() => {
        const spy = jest.spyOn(component.paginationChange, 'emit');
        component.currentIndex = 3;
        fixture.detectChanges();

        const { nativeElement } = fixture.debugElement;
        const button = nativeElement.querySelector('button#next-arrow');
        button.click();

        testScheduler.flush();

        expect(spy).toHaveBeenCalledTimes(1);
        expect(component.currentIndex).toEqual(4);
        expect(spy).toHaveBeenCalledWith({ pageIndex: 3, pageSize: 50 });
      });
    });

    it('index paginates back', () => {
      testScheduler.run(() => {
        const spy = jest.spyOn(component.paginationChange, 'emit');
        component.currentIndex = 3;
        fixture.detectChanges();

        const { nativeElement } = fixture.debugElement;
        const button = nativeElement.querySelector('button#prev-arrow');
        button.click();

        testScheduler.flush();

        expect(spy).toHaveBeenCalledTimes(1);
        expect(component.currentIndex).toEqual(2);
        expect(spy).toHaveBeenCalledWith({ pageIndex: 1, pageSize: 50 });
      });
    });
  });

  describe('getPaginationSize', () => {
    it('does not divide by zero', () => {
      component.pageSize = 0;
      fixture.detectChanges();

      expect(component.getPaginationSize()).toEqual(1);
    });

    it('does not divide by undefined pageSize', () => {
      component.pageSize = undefined;
      fixture.detectChanges();

      expect(component.getPaginationSize()).toEqual(1);
    });

    it('does not divide by undefined length', () => {
      expect(component.getPaginationSize()).toEqual(1);
    });

    it('rounds up page size to catch fractional lengths', () => {
      component.pageSize = 50;
      component.length = 51;

      expect(component.getPaginationSize()).toEqual(2);
    });
  });

  describe('hidden pagination elements', () => {
    it('shows the first and last three elements by default', () => {
      component.length = 500;
      component.pages = component.createPageListStartingAtOne();
      component.firstThreePages = component.pages.slice(0, 3);
      component.lastThreePages = component.pages.slice(
        component.pages.length - 3,
        component.pages.length
      );
      fixture.detectChanges();

      const { nativeElement } = fixture.debugElement;

      const firstButtons = nativeElement.querySelectorAll(
        'button#first-page-buttons'
      );
      const lastButtons = nativeElement.querySelectorAll(
        'button#last-page-buttons'
      );
      expect(firstButtons.length).toEqual(3);
      expect(firstButtons[0].textContent).toEqual(' 1 ');
      expect(firstButtons[1].textContent).toEqual(' 2 ');
      expect(firstButtons[2].textContent).toEqual(' 3 ');

      expect(lastButtons.length).toEqual(3);
      expect(lastButtons[0].textContent).toEqual(' 8 ');
      expect(lastButtons[1].textContent).toEqual(' 9 ');
      expect(lastButtons[2].textContent).toEqual(' 10 ');
    });
  });
});
