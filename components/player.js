class Player {
  
  constructor(name, icon, race, characterClass) {
    this.name = name;
    this.icon = icon;
    this.race = race;
    this.characterClass = characterClass;
    this.enemiesList = [
      { enemyId: 4, name: 'king of the internet' },
      { enemyId: 2, name: 'barun' },
      { enemyId: 8, name: 'dangerous name' }
    ];
    this.treasuresList = [
      { id: 4, name: 'kaybord' },
      { id: 2, name: 'sweets' },
      { id: 8, name: 'piece of code' }
    ];

  }
}
