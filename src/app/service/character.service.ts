import {Injectable} from '@angular/core';
import {CharacterComponent} from '../components/character/character.component';
import {CharacterFactory} from '../factory/characterFactory';
import {Character} from '../model/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor() {
  }

  switchStyle(characterComponent: CharacterComponent) {
    const classNamesRandomChars = CharacterFactory.CLASS_NAMES_SELECTION;
    const classNamesEmptyChars = CharacterFactory.CLASS_NAMES_RESULT;
    const allClassNames = classNamesEmptyChars.concat(classNamesRandomChars);

    if (characterComponent.character.disabled) {
      // enable character
      characterComponent.character.additionalClassNames = allClassNames.filter(value => classNamesRandomChars.includes(value));
    } else {
      // disable character
      characterComponent.character.additionalClassNames = allClassNames.filter(value => classNamesEmptyChars.includes(value)).concat('disabled');
    }
  }

  getCharComponentById(id: string, componentList: Array<CharacterComponent>): CharacterComponent {
    return componentList.find(item => item.character.id === id);
  }

  resetCharComponent(charComponent: CharacterComponent) {
    charComponent.character.content = '';
    charComponent.character.original_id = '';
    charComponent.character.additionalClassNames = CharacterFactory.CLASS_NAMES_RESULT;
  }

  setCharacterSuccess(character: Character) {
    character.additionalClassNames = CharacterFactory.CLASS_NAMES_SUCCESS
  }

  setCharacterDanger(character: Character) {
    character.additionalClassNames = CharacterFactory.CLASS_NAMES_DANGER
  }

}
