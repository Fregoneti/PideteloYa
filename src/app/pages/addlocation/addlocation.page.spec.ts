import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddlocationPage } from './addlocation.page';

describe('AddlocationPage', () => {
  let component: AddlocationPage;
  let fixture: ComponentFixture<AddlocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlocationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddlocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
