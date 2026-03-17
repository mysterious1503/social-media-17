import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAgGridTableComponent } from './org-ag-grid-table.component';

describe('OrgAgGridTableComponent', () => {
  let component: OrgAgGridTableComponent;
  let fixture: ComponentFixture<OrgAgGridTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgAgGridTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgAgGridTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
