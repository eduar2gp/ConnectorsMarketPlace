import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { BenefitComponent } from './benefit.component';

describe('BenefitComponent', () => {
  let component: BenefitComponent;
  let fixture: ComponentFixture<BenefitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenefitComponent ],
      providers: [ { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
