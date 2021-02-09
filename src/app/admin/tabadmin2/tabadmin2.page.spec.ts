import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Tabadmin2Page } from './tabadmin2.page';

describe('Tabadmin2Page', () => {
  let component: Tabadmin2Page;
  let fixture: ComponentFixture<Tabadmin2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tabadmin2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Tabadmin2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
