import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditPlacePage } from './edit-place.page';

describe('EditPlacePage', () => {
  let component: EditPlacePage;
  let fixture: ComponentFixture<EditPlacePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPlacePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPlacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
