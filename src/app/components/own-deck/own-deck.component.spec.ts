import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OwnDeckComponent} from './own-deck.component';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";
import {Deck} from "../../models/deck.model";
import {Topic} from "../../models/topic.model";
import {CurrentDataService} from "../../core/local/current-data.service";
import {of, throwError} from "rxjs";
import {DeckService} from "../../core/deck.service";
import {ImagesService} from "../../core/images.service";
import {Card, WhereImageEnum} from "../../models/card.model";
import {CardService} from "../../core/card.service";

describe('OwnDeckComponent', () => {
  let component: OwnDeckComponent;
  let fixture: ComponentFixture<OwnDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnDeckComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideAnimations()
      ],
    })
    .compileComponents();

    const currentDataService = TestBed.inject(CurrentDataService);
    spyOnProperty(currentDataService, 'deck', 'get').and
      .returnValues(new Deck("titulo", new Topic("123456789abcdef", "name")));
    fixture = TestBed.createComponent(OwnDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should error while publish', () => {
    const deckService = TestBed.inject(DeckService);
    spyOn(deckService, 'publishDeck').and.returnValues(throwError(() => new Error()));
    let spy = spyOn(console, 'log');
    component.publishDeck();
    expect(spy).toHaveBeenCalled();
  });

  it('should publish', () => {
    const deckService = TestBed.inject(DeckService);
    spyOn(deckService, 'publishDeck').and.returnValues(of("yes"));
    let spy = spyOn(console, 'log');
    component.publishDeck();
    expect(spy).toHaveBeenCalled();
  });

  it('should error while updateDeck', () => {
    const deckService = TestBed.inject(DeckService);
    spyOn(deckService, 'updateDeck').and.returnValues(throwError(() => new Error()));
    let spy = spyOn(console, 'log');
    component.callUpdateDeck(new Deck("title", new Topic("123456789abcdef", "a")));
    expect(spy).toHaveBeenCalled();
  });

  it('should update deck', () => {
    const deckService = TestBed.inject(DeckService);
    spyOn(deckService, 'updateDeck').and.returnValues(of({body: {title: "yes"}}));
    let spy = spyOn(console, 'log');

    component.callUpdateDeck(new Deck("title", new Topic("123456789abcdef", "a")));
    expect(spy).toHaveBeenCalledWith("Updated deck: yes");
  });

  it('should save image', (done) => {
    const imagesService = TestBed.inject(ImagesService);
    let spy = spyOn(imagesService, 'postImage');

    component.saveImage(new File([], ""));
    expect(spy).toHaveBeenCalled();
    done();
  });

  it('should update cards', () => {
    component.deck!._id = "123456789111111";
    component.receivedCardList = [new Card(WhereImageEnum.NONE)];
    const cardService = TestBed.inject(CardService);
    spyOn(cardService, 'createCard');
    let spy = spyOn(console, 'log');

    component.updateCards();
    expect(spy).toHaveBeenCalled();
  });
});
