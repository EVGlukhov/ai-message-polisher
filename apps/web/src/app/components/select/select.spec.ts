import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Select } from './select';

describe('Select', () => {
  let component: Select;
  let fixture: ComponentFixture<Select>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Select],
    }).compileComponents();

    fixture = TestBed.createComponent(Select);
    fixture.componentRef.setInput('label', 'Language');
    fixture.componentRef.setInput('id', 'language-select');
    fixture.componentRef.setInput('options', [
      { value: 'en', label: 'English' },
      { value: 'ru', label: 'Russian' },
    ]);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('opens the options when clicked', () => {
    fixture.nativeElement.querySelector('[role="combobox"]').click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="listbox"]')).not.toBeNull();
    expect(fixture.nativeElement.textContent).toContain('English');
    expect(fixture.nativeElement.textContent).toContain('Russian');
  });
});
