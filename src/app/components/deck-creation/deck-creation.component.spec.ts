import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeckCreationComponent} from './deck-creation.component';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";
import {Observable, of} from "rxjs";
import {ImagesService} from "../../core/images.service";
import {Card, WhereImageEnum} from "../../models/card.model";
import {Deck} from "../../models/deck.model";
import {Topic} from "../../models/topic.model";
import {CardService} from "../../core/card.service";
import {DeckService} from "../../core/deck.service";
import {CardListComponent} from "../card-list/card-list.component";
import {MatDialog} from "@angular/material/dialog";
import Spy = jasmine.Spy;

describe('DeckCreationComponent', () => {
  let component: DeckCreationComponent;
  let fixture: ComponentFixture<DeckCreationComponent>;
  const childComponent = jasmine.createSpyObj('CardListComponent', ['ngOnInit'],
    {'events': of([new Card(WhereImageEnum.NONE, "Pregunta", "Respuesta")])});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckCreationComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideAnimations(),
        {provide: CardListComponent, useValue: childComponent}
      ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(DeckCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the path of the image', (done) => {
    const imagesService = TestBed.inject(ImagesService);
    spyOn(imagesService, 'postImage').and.returnValues(of("http://path/to/image"));
    component.saveImage(new File([], "name.png")).then((data) => {
      expect(data).toEqual("http://path/to/image");
      done();
    })
  });

  it('should create deck', (done) => {
    const card = new Card(WhereImageEnum.NONE, "Pregunta", "Respuesta");
    const cardService = TestBed.inject(CardService);
    const deckService = TestBed.inject(DeckService);
    component.cardListComponent.cardList = [card];
    let spy = spyOn(cardService, 'createCard').and.returnValues(of(card.toJson));
    spyOn(deckService, 'createDeck').and.returnValues(of({body: {_id: "123456789abcdefg"}}));
    component.handleDeckCreation(new Deck("Titulo", new Topic("123456789abcdefg", "nombre"))).then((data) => {
      expect(spy).toHaveBeenCalled();
      done();
    })
  });
});
