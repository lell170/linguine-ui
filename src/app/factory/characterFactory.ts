import {Character} from '../model/character';

export class CharacterFactory {

  public static readonly CLASS_NAMES_RESULT: string[] = ['text-black'];
  public static readonly CLASS_NAMES_SELECTION: string[] = ['bg-primary', 'border-primary', 'text-white'];

  public static readonly CLASS_NAMES_SUCCESS: string[] = ['character_element', 'border', 'rounded', 'text-white', 'bg-success'];
  public static readonly CLASS_NAMES_DANGER: string[] = ['character_element', 'border', 'rounded', 'text-white', 'bg-danger'];

  public static readonly RESULT_ID_PREFIX = 'result_character_';
  public static readonly SELECTION_ID_PREFIX = 'selection_character_';

  public static createResultChar(id: number): Character {
    const character = new Character();
    character.additionalClassNames = this.CLASS_NAMES_RESULT;
    character.content = '';
    character.id = this.RESULT_ID_PREFIX + id;
    character.disabled = true;

    return character;
  }

  public static createSelectionChar(id: number, charContent: string): Character {
    const character = new Character();
    character.additionalClassNames = this.CLASS_NAMES_SELECTION;
    character.content = charContent;
    character.id = this.SELECTION_ID_PREFIX + id;
    character.disabled = false;

    return character;
  }

}
