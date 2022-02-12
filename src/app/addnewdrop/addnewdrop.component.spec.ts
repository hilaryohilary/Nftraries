import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewdropComponent } from './addnewdrop.component';

describe('AddnewdropComponent', () => {
  let component: AddnewdropComponent;
  let fixture: ComponentFixture<AddnewdropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewdropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
