import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartyAuthComponent } from './third-party-auth.component';

describe('ThirdPartyAuthComponent', () => {
  let component: ThirdPartyAuthComponent;
  let fixture: ComponentFixture<ThirdPartyAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThirdPartyAuthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdPartyAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
