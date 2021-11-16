import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarComponent ],
      providers: [ { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }],
      imports: [MatMenuModule, MatSidenavModule, BrowserAnimationsModule, NoopAnimationsModule],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should contain the close/menu button oninit', () => {
    const element = fixture.debugElement.nativeElement.querySelector('mat-toolbar');
    expect(element.innerHTML).toContain("sideNavButtons");

  });

  
  it('should display sidenav on init', () => {
    expect(component.sidenav).toBeTruthy();

  });

  
  it('should not show menu/close buttons on init', () => {
    expect(fixture.debugElement.query(By.css('sideNavButtons'))).toBeNull();

  });


});
