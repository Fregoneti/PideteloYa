import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InspectPage } from './inspect.page';

describe('InspectPage', () => {
  let component: InspectPage;
  let fixture: ComponentFixture<InspectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InspectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
