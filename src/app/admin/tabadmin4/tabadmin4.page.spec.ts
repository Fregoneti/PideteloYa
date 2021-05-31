import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Tabadmin4Page } from './tabadmin4.page';

describe('Tabadmin4Page', () => {
  let component: Tabadmin4Page;
  let fixture: ComponentFixture<Tabadmin4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tabadmin4Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Tabadmin4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
