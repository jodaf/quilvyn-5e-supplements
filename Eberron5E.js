/*
Copyright 2021, James J. Hayes

This program is free software; you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation; either version 2 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with
this program; if not, write to the Free Software Foundation, Inc., 59 Temple
Place, Suite 330, Boston, MA 02111-1307 USA.
*/

/*jshint esversion: 6 */
"use strict";

/*
 * This module loads the rules from the Fifth Edition Eberron rule book. The
 * Eberron5E function contains methods that load rules for particular parts of
 * the rules; raceRules for character races, magicRules for spells, etc. These
 * member methods can be called independently in order to use a subset of the
 * rules.  Similarly, the constant fields of Eberron5E (PATHS, RACES, etc.)
 * can be manipulated to modify the choices.
 */
function Eberron5E() {

  if(window.PHB5E == null) {
    alert('The Eberron5E module requires use of the PHB5E module');
    return;
  }

  var rules = new QuilvynRules('Eberron 5E', Eberron5E.VERSION);
  Eberron5E.rules = rules;

  rules.defineChoice('choices', SRD5E.CHOICES);
  rules.choiceEditorElements = SRD5E.choiceEditorElements;
  rules.choiceRules = SRD5E.choiceRules;
  rules.editorElements = SRD5E.initialEditorElements();
  rules.getFormats = SRD5E.getFormats;
  rules.getPlugins = Eberron5E.getPlugins;
  rules.makeValid = SRD5E.makeValid;
  rules.randomizeOneAttribute = SRD5E.randomizeOneAttribute;
  rules.defineChoice('random', SRD5E.RANDOMIZABLE_ATTRIBUTES);
  rules.ruleNotes = Eberron5E.ruleNotes;

  SRD5E.createViewers(rules, SRD5E.VIEWERS);
  rules.defineChoice('extras',
    'feats', 'featCount', 'sanityNotes', 'selectableFeatureCount',
    'validationNotes'
  );
  rules.defineChoice('preset',
    'background:Background,select-one,backgrounds',
    'race:Race,select-one,races', 'levels:Class Levels,bag,levels'
  );

  Eberron5E.BACKGROUNDS =
    Object.assign({}, PHB5E.BACKGROUNDS, Eberron5E.BACKGROUNDS_ADDED);
  Eberron5E.CLASSES = Object.assign({}, PHB5E.CLASSES, Eberron5E.CLASSES_ADDED);
  Eberron5E.FEATS = Object.assign({}, PHB5E.FEATS, Eberron5E.FEATS_ADDED);
  Eberron5E.FEATURES =
    Object.assign({}, PHB5E.FEATURES, Eberron5E.FEATURES_ADDED);
  Eberron5E.PATHS = Object.assign({}, PHB5E.PATHS, Eberron5E.PATHS_ADDED);
  Eberron5E.RACES = Object.assign({}, PHB5E.RACES, Eberron5E.RACES_ADDED);
  Eberron5E.SPELLS = Object.assign({}, PHB5E.SPELLS, Eberron5E.SPELLS_ADDED);
  for(var s in Eberron5E.SPELLS_LEVELS_ADDED) {
    Eberron5E.SPELLS[s] =
      Eberron5E.SPELLS[s].replace('Level=', 'Level=' + Eberron5E.SPELLS_LEVELS_ADDED[s] + ',');
  }
  Eberron5E.TOOLS = Object.assign({}, SRD5E.TOOLS);

  SRD5E.abilityRules(rules);
  SRD5E.combatRules(rules, SRD5E.ARMORS, SRD5E.SHIELDS, SRD5E.WEAPONS);
  SRD5E.magicRules(rules, SRD5E.SCHOOLS, Eberron5E.SPELLS);
  SRD5E.identityRules(
    rules, SRD5E.ALIGNMENTS, Eberron5E.BACKGROUNDS, Eberron5E.CLASSES,
    Eberron5E.DEITIES, Eberron5E.PATHS, Eberron5E.RACES
  );
  SRD5E.talentRules
    (rules, Eberron5E.FEATS, Eberron5E.FEATURES, SRD5E.GOODIES,
     SRD5E.LANGUAGES, SRD5E.SKILLS, Eberron5E.TOOLS);

  if(window.Tasha != null)
    Tasha('Tasha', rules);
  if(window.Volo != null) {
    if(Volo.CHARACTER_RACES_IN_PLAY)
      Volo('Character', rules);
    if(Volo.MONSTROUS_RACES_IN_PLAY)
      Volo('Monstrous', rules);
  }
  if(window.Xanathar != null)
    Xanathar('Xanathar', rules);

  Quilvyn.addRuleSet(rules);

}

Eberron5E.VERSION = '2.2.1.0';

Eberron5E.BACKGROUNDS_ADDED = {
  'House Agent':
    'Equipment=' +
      '"Fine Clothes","House Signet Ring","Identification Papers","20 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Investigation/Persuasion)",' +
      '"1:House Connections"'
};
Eberron5E.CLASSES_SELECTABLES_ADDED = {
// TODO
  'Barbarian':
    '"race =~ \'Dwarf\' ? 3:Path Of The Battlerager:Primal Path",' +
    '"3:Path Of The Totem Warrior (Elk):Primal Path",' +
    '"3:Path Of The Totem Warrior (Tiger):Primal Path"',
  'Cleric':
    '"deityDomains =~ \'Arcana\' ? 1:Arcana Domain:Divine Domain"',
  'Fighter':
    '"3:Purple Dragon Knight:Martial Archetype"',
  'Monk':
    '"3:Way Of The Long Death:Monastic Tradition",' +
    '"3:Way Of The Sun Soul:Monastic Tradition"', // also Xanathar
  'Paladin':
    '"3:Oath Of The Crown:Sacred Oath"',
  'Rogue':
    '"3:Mastermind:Roguish Archetype",' + // also Xanathar
    '"3:Swashbuckler:Roguish Archetype"', // also Xanathar
  'Sorcerer':
    '"1:Storm Sorcery:Sorcerous Origin"', // also Xanathar
  'Warlock':
    '"1:The Undying:Otherworldly Patron"',
  'Wizard':
    '"race =~ \'Elf\' ? 2:Bladesinging:Arcane Tradition"' // also Tasha
};
Eberron5E.DEITIES = {
  'None':'Domain=' + QuilvynUtils.getKeys(Eberron5E.PATHS).filter(x => x.match(/Domain$/)).map(x => '"' + x.replace(' Domain', '') + '"').join(','),
  'Arawai':'Alignment=NG Domain=Life,Nature',
  'Aureon':'Alignment=LN Domain=Knowledge,Order',
  'Balinor':'Alignment=N Domain=Nature,War',
  'Boldrei':'Alignment=LG Domain=Life',
  'Dol Arrah':'Alignment=LG Domain=Light,War',
  'Dol Dorn':'Alignment=CG Domain=War',
  'Kol Korran':'Alignment=N Domain=Trickery',
  'Olladra':'Alignment=NG Domain=Life,Trickery',
  'Onatar':'Alignment=NG Domain=Forge,Knowledge',
  'The Blood Of Vol':'Alignment=LE Domain=Death,Life',
  'The Cults Of The Dragon Below':'Alignment=LN Domain=Trickery',
  'The Devourer':'Alignment=NE Domain=Tempest',
  'The Fury':'Alignment=NE Domain=War',
  'The Keeper':'Alignment=NE Domain=Death',
  'The Mockery':'Alignment=NE Domain=Trickery,War',
  'The Path Of Light':'Alignment=LN Domain=Life,Light',
  'The Shadow':'Alignment=CE Domain=Knowledge',
  'The Silver Flame':'Alignment=LG Domain=Life,Light,War',
  'The Traveler':'Alignment=CN Domain=Forge,Knowledge,Trickery',
  'The Undying Court':'Alignment=NG Domain=Grave,Knowledge,Life'
};
Eberron5E.FEATS_ADDED = {
  'Aberrant Dragonmark':'Require="race !~ \'Mark\'" Type=General',
  'Revenant Blade':'Require="race =~ \'Elf\'" Type=General'
};
Eberron5E.FEATURES_ADDED = {

  // Backgrounds
  'House Connections':
    'Section=feature Note="Obtain food and lodging at house enclave"'

  // Feats
  // TODO

  // Paths
  // TODO

  // Races
  // TODO

};
Eberron5E.PATHS_ADDED = {
  // TODO
};
Eberron5E.RACES_ADDED = {
  'Aereni Elf':SRD5E.RACES['High Elf'],
  'Tairnadal Elf':PHB5E.RACES['Wood Elf'],
  'Bugbear': // Copied from Volo's
    'Features=' +
      '"Bugbear Ability Adjustment",Darkvision,Long-Limbed,"Powerful Build",' +
      'Sneaky,"Surprise Attack" ' +
    'Languages=Common,Goblin',
  'Changeling':
    'Features=' +
      '"Changeling Ability Adjustment",Shapechanger,"Cangeling Instincts" ' +
    'Languages=Common,any,any',
  'Goblin': // Copied from Volo's
    'Features=' +
      'Darkvision,"Fury Of The Small","Goblin Ability Adjustment",' +
      '"Nimble Escape",Small ' +
    'Languages=Common,Goblin',
  'Hobgoblin': // Copied from Volo's
    'Features=' +
      'Darkvision,"Hobgoblin Ability Adjustment","Martial Training",' +
      '"Saving Face" ' +
    'Languages=Common,Goblin',
  'Kalashtar':
    'Features=' +
      '"Dual Minds","Kalashtar Ability Adjustment","Mental Discipline",' +
      '"Mind Link","Severed From Dreams" ' +
    'Languages=Common,Quori,any',
  'Orc': // Copied from Volo's, Primal Intuition instead of Menacing
    'Features=' +
      'Aggressive,Darkvision,"Orc Ability Adjustment","Powerful Build",' +
      '"Primal Intuition" ' +
    'Languages=Common,Orc',
  'Beasthide Shifter':
    'Features=' +
      'Darkvision,"Shifter Ability Adjustment",Shifting,"Natural Athlete" ' +
    'Languages=Common',
  'Longtooth Shifter':
    'Features=' +
      'Darkvision,"Shifter Ability Adjustment",Shifting,Fierce ' +
    'Languages=Common',
  'Swiftstride Shifter':
    'Features=' +
      'Darkvision,"Shifter Ability Adjustment",Shifting,Graceful ' +
    'Languages=Common',
  'Wildhunt Shifter':
    'Features=' +
      'Darkvision,"Shifter Ability Adjustment",Shifting,"Natural Tracker" ' +
    'Languages=Common',
  'Warforged':
    'Features=' +
      '"Constructed Resilience","Integrated Protection","Sentry\'s Rest",' +
      '"Specialized Design","Warforged Ability Adjustment" ' +
    'Languages=Common,any',
  'Mark Of Detection Half-Elf':
    SRD5E.RACES['Half-Elf']
      .replace('Half-Elf Ability', 'Detection Ability')
      .replace('"Skill Versatility"', '"Magical Detection"'),
  'Mark Of Finding Half-Orc':
    'Features=' +
      '"Finding Ability Adjustment",Darkvision,"Hunter\'s Intuition",' +
      '"Finder\'s Magic" ' +
    'Languages=Common,Goblin',
  'Mark Of Finding Human':
    'Features=' +
      '"Finding Ability Adjustment",Darkvision,"Hunter\'s Intuition",' +
      '"Finder\'s Magic" ' +
    'Languages=Common,Goblin',
  'Mark Of Handling Human':
    'Features=' +
      '"Handling Ability Adjustment","Primal Connection",' +
      '"The Bigger They Are","Wild Intuition" ' +
    'Languages=Common,any',
  'Mark Of Healing Halfling':
    'Features=' +
      'Brave,"Halfling Nimbleness","Lucky Halfling",Slow,Small,' +
      '"Healing Ability Adjustment","Healing Touch","Medical Intuition" ' +
    'Languages=Common,Halfling',
  'Mark Of Making Halfling':
    'Features=' +
      'Brave,"Halfling Nimbleness","Lucky Halfling",Slow,Small,' +
      '"Making Ability Adjustment","Artisan\'s Intuition","Maker\'s Gift",' +
      'Spellsmith ' +
    'Languages=Common,Halfling',
  'Mark Of Passage Human':
    'Features=' +
      '"Passage Ability Adjustment","Courier\'s Speed","Intuitive Speed",' +
      '"Magical Passage" ' +
    'Languages=Common,any',
  'Mark Of Scribing Gnome':
    'Features=' +
      'Darkvision,"1:Gnome Cunning","Scribing Ability Adjustment",Slow,Small,' +
      '"Gifted Scribe","Scribe\'s Insight" ' +
    'Languages=Common,Gnomish',
  'Mark Of Sentinel Human':
    'Features=' +
      '"Sentinel Ability Adjustment","Guardian\'s Shield",' +
      '"Sentinel\'s Intuition","Vigilant Guardian" ' +
    'Languages=Common,any',
  'Mark Of Shadow Elf':
    'Features=' +
      'Darkvision,"Elf Weapon Training","Fey Ancestry","Keen Senses",Trance,' +
      '"Shadow Ability Adjustment","Cunning Intuition","Shape Shadows" ' +
    'Languages=Common,Elvish',
  'Mark Of Storm Half-Elf':
    SRD5E.RACES['Half-Elf']
      .replace('Half-Elf Ability', 'Storm Ability')
      .replace('"Skill Versatility"', '"Windwright\'s Intuition","Storm\'s Boon",Headwinds'),
  'Mark Of Warding Dwarf':
    'Features=' +
      '"Tool Proficiency (Choose 1 from Brewer\'s Supplies, Mason\'s Tools, Smith\'s Tools)",' +
      'Darkvision,"Dwarven Combat Training","Dwarven Resilience",Slow,Steady,' +
      'Stonecunning,"Warding Ability Adjustment","Warder\'s Intuition",' +
      '"Wards And Shields" ' +
    'Languages=Common,Dwarvish'
};
Eberron5E.SPELLS_ADDED = {
  // TODO
};
Eberron5E.SPELLS_LEVELS_ADDED = {
  // TODO
};

/*
 * Adds #name# as a possible user #type# choice and parses #attrs# to add rules
 * related to selecting that choice.
 */
Eberron5E.choiceRules = function(rules, type, name, attrs) {
  PHB5E.choiceRules(rules, type, name, attrs);
  if(type == 'Path')
    Eberron5E.pathRulesExtra(rules, name);
  else if(type == 'Race')
    Eberron5E.raceRulesExtra(rules, name);
};

/*
 * Defines in #rules# the rules associated with path #name# that cannot be
 * derived directly from the attributes passed to pathRules.
 */
Eberron5E.pathRulesExtra = function(rules, name) {

  var pathLevel =
    name.charAt(0).toLowerCase() + name.substring(1).replaceAll(' ', '') +
    'Level';

  // TODO

};

/*
 * Defines in #rules# the rules associated with path #name# that cannot be
 * derived directly from the attributes passed to raceRules.
 */
Eberron5E.raceRulesExtra = function(rules, name) {

  var raceLevel =
    name.charAt(0).toLowerCase() + name.substring(1).replaceAll(' ', '') +
    'Level';

  // TODO

};

/* Returns an array of plugins upon which this one depends. */
Eberron5E.getPlugins = function() {
  var result = [PHB5E, SRD5E];
  // TODO Tasha
  if(window.Volo != null &&
     (Volo.CHARACTER_RACES_IN_PLAY || Volo.MONSTROUS_RACES_IN_PLAY))
    result.unshift(Volo);
  if(window.Xanathar != null &&
     QuilvynUtils.getKeys(PHB5E.rules.getChoices('selectableFeatures'), /Forge Domain/).length > 0)
    result.unshift(Xanathar);
  return result;
};

/* Returns HTML body content for user notes associated with this rule set. */
Eberron5E.ruleNotes = function() {
  return '' +
    '<h2>Eberron 5E Quilvyn Plugin Notes</h2>\n' +
    'Eberron 5E Quilvyn Plugin Version ' + Eberron5E.VERSION + '\n' +
    '<p>\n' +
    'Quilvyn\'s Eberron 5E rule set is unofficial Fan Content permitted ' +
    'under Wizards of the Coast\'s ' +
    '<a href="https://company.wizards.com/en/legal/fancontentpolicy">Fan Content Policy</a>.\n' +
    '</p><p>\n' +
    'Quilvyn is not approved or endorsed by Wizards of the Coast. Portions ' +
    'of the materials used are property of Wizards of the Coast. ©Wizards of ' +
    'the Coast LLC.\n' +
    '</p><p>\n' +
    'Eberron Rising from the Last War © 2019 Wizards of the Coast LLC.\n' +
    '</p><p>\n' +
    'Dungeons & Dragons Player\'s Handbook © 2014 Wizards of the Coast LLC.\n' +
    '<p>\n' +
    'There are no known bugs, limitations, or usage notes specific to the Eberron 5E plugin\n' +
    '</p>\n';
};
