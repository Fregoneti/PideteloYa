import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Tabadmin3Page } from './tabadmin3.page';

describe('Tabadmin3Page', () => {
  let component: Tabadmin3Page;
  let fixture: ComponentFixture<Tabadmin3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tabadmin3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Tabadmin3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
