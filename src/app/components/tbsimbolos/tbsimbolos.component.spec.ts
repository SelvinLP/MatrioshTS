import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TbsimbolosComponent } from './tbsimbolos.component';

describe('TbsimbolosComponent', () => {
  let component: TbsimbolosComponent;
  let fixture: ComponentFixture<TbsimbolosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TbsimbolosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TbsimbolosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
