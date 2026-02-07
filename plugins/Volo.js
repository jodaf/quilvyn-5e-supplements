/*
Copyright 2026, James J. Hayes

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

/* jshint esversion: 6 */
/* jshint forin: false */
/* globals SRD5E, PHB5E */
"use strict";

/*
 * This module loads the rules from Fifth Edition Volo's Guide to Monsters. The
 * Volo function contains methods that load rules for particular parts of the
 * rules; these member methods can be called independently in order to use
 * a subset of Volo. Similarly, the constant fields of Volo (RACES, FEATURES,
 * etc.) can be manipulated to modify the choices.
 */
function Volo(edition, rules) {

  if(window.PHB5E == null) {
    alert('The Volo module requires use of the PHB5E module');
    return;
  }

  let monstrous = (edition + '').match(/monster|monstrous/i);
  let features = monstrous ? Volo.MONSTROUS_FEATURES : Volo.CHARACTER_FEATURES;
  let races = monstrous ? Volo.MONSTROUS_RACES : Volo.CHARACTER_RACES;
  if(rules == null)
    rules = PHB5E.rules;
  Volo.magicRules(rules, Volo.SPELLS);
  Volo.identityRules(rules, races);
  Volo.talentRules(rules, features);
  if(monstrous)
    Volo.MONSTROUS_RACES_IN_PLAY = true;
  else
    Volo.CHARACTER_RACES_IN_PLAY = true;
}

Volo.VERSION = '2.4.2.0';

Volo.CHARACTER_FEATURES = {
  // Aasimar
  'Aasimar Ability Adjustment':'Section=ability Note="+2 Charisma"',
  'Celestial Resistance':
    'Section=save Note="Has resistance to necrotic and radiant damage"',
  // Darkvision as SRD5E
  'Healing Hands':
    'Section=magic ' +
    'Note="Touch heals %{level} hit point%{level>1?\'s\':\'\'} once per long rest"',
  'Light Bearer':'Section=magic Note="Knows the <i>Light</i> cantrip"',
    // Leave off Spells and SpellAbility attribute to avoid duplicating for
    // each subrace
  // Protector Aasimar
  'Protector Aasimar Ability Adjustment':'Section=ability Note="+1 Wisdom"',
  'Radiant Soul (Aasimar)':
    'Section=ability,combat ' +
    'Note=' +
      '"Can gain a 30\' fly Speed for 1 min once per long rest",' +
      '"Can inflict +%{level} HP radiant once rd for 1 min once per long rest"',
  // Scourge Aasimar
  'Radiant Consumption':
    'Section=combat ' +
    'Note="Can inflict %{(level+1)//2} HP radiant in a 10\' radius, including to self, plus %{level} HP radiant to a target, each rd for up to 1 min once per long rest"',
  'Scourge Aasimar Ability Adjustment':'Section=ability Note="+1 Constitution"',
  // Fallen Aasimar
  'Fallen Aasimar Ability Adjustment':'Section=ability Note="+1 Strength"',
  'Necrotic Shroud':
    'Section=combat ' +
    'Note="Can inflict frightened (save DC %{8+charismaModifier+proficiencyBonus} negates) in a 10\' radius for 1 rd and +%{level} HP necrotic once per rd for 1 min once per long rest"',

  // Firbolg
  'Firbolg Ability Adjustment':'Section=ability Note="+2 Wisdom/+1 Strength"',
  'Firbolg Magic':
    'Section=magic ' +
    'Note="Can cast <i>Detect Magic</i> and <i>Disguise Self</i> once per short rest" ' +
    'SpellAbility=Wisdom ' +
    'Spells="Detect Magic","Disguise Self"',
  'Hidden Step':
    'Section=magic ' +
    'Note="Can use a bonus action to become invisible until the start of the next turn once per short rest; inflicting damage or forcing a saving throw ends"',
  'Powerful Build':'Section=ability Note="x2 Carry/x2 Lift"',
  'Speech Of Beast And Leaf':
    'Section=skill ' +
    'Note="Can speak to beasts and plants and has advantage on Charisma checks to influence them"',

  // Goliath
  'Mountain Born':
    'Section=save Note="Has adaptation to high elevation and cold"',
  'Goliath Ability Adjustment':
    'Section=ability Note="+2 Strength/+1 Constitution"',
  'Natural Athlete':'Section=skill Note="Skill Proficiency (Athletics)"',
  // Powerful Build as above
  "Stone's Endurance":
    'Section=combat ' +
    'Note="Can use a reaction to negate 1d12+%{constitutionModifier} HP damage once per short rest"',

  // Kenku
  'Expert Forgery':
    'Section=skill Note="Has advantage on forgery and duplication checks"',
  'Kenku Ability Adjustment':'Section=ability Note="+2 Dexterity/+1 Wisdom"',
  'Kenku Training':
    'Section=skill ' +
    'Note="Skill Proficiency (Choose 2 from Acrobatics, Deception, Stealth, Sleight Of Hand)"',
  'Mimicry':
    'Section=skill ' +
    'Note="Successful Deception vs. Insight fools others with mimicked sounds"',

  // Lizardfolk
  'Lizardfolk Ability Adjustment':
    'Section=ability Note="+2 Constitution/+1 Wisdom"',
  'Bite':
    'Section=combat Note="Bite inflicts 1d6%{strengthModifier<0?strengthModifier:strengthModifier>0?\'+\'+strengthModifier:\'\'} HP piercing"',
  'Cunning Artisan':
    'Section=skill ' +
    'Note="Can craft a shield or weapon from a carcass during a short rest"',
  'Hold Breath':'Section=ability Note="Can hold breath for 15 min"',
  'Hungry Jaws':
    'Section=combat ' +
    'Note="Can use a bonus action to bite and gain %{constitutionModifier>?1} temporary hit point%{constitutionModifier>1?\'s\':\'\'} on a hit once per short rest"',
  "Hunter's Lore":
    'Section=skill ' +
    'Note="Skill Proficiency (Choose 2 from Animal Handling, Nature, Perception, Stealth, Survival)"',
  'Natural Armor':
    'Section=combat ' +
    'Note="AC %{13+dexterityModifier+(shield==\'None\'?0:2)} in no armor"',
  'Swimmer':'Section=ability Note="Has a 30\' swim Speed"',

  // Tabaxi
  // Darkvision as SRD5E
  "Cat's Claws":
    'Section=ability,combat ' +
    'Note=' +
      '"Has a 20\' climb Speed",' +
      '"Claws inflict 1d4%{strengthModifier<0?strengthModifier:strengthModifier>0?\'+\'+strengthModifier:\'\'} HP slashing"',
  "Cat's Talent":'Section=skill Note="Skill Proficiency (Perception; Stealth)"',
  'Feline Agility':
    'Section=combat ' +
    'Note="Can move at double speed; must forego moving for 1 rd before the next use"',
  'Tabaxi Ability Adjustment':'Section=ability Note="+2 Dexterity/+1 Charisma"',

  // Triton
  'Amphibious':'Section=ability Note="Can breathe water"',
  'Control Air And Water':
    'Section=magic ' +
    'Note="Can cast <i>Fog Cloud</i>%{level<3?\'\':level<5?\' and <i>Gust Of Wind</i>\':\' <i>Gust Of Wind</i>, and <i>Wall Of Water</i>\'} once per long rest" ' +
    'Spells="Fog Cloud","3:Gust Of Wind","5:Wall Of Water" ' +
    'SpellAbility=Charisma',
  'Emissary Of The Sea':
    'Section=skill Note="Can speak to water-breathing creatures"',
  'Guardians Of The Depths':
    'Section=save ' +
    'Note="Has resistance to cold damage and is unaffected by water depth"',
  'Triton Ability Adjustment':
    'Section=ability Note="+1 Charisma/+1 Constitution/+1 Strength"'
};
Volo.CHARACTER_RACES = {
  'Fallen Aasimar':
    'Size=Medium ' +
    'Speed=30 ' +
    'Features=' +
      '"Language (Common; Celestial)",' +
      '"Aasimar Ability Adjustment","Celestial Resistance","Darkvision",' +
      '"Healing Hands","Fallen Aasimar Ability Adjustment","Light Bearer",' +
      '"3:Necrotic Shroud"',
  'Firbolg':
    'Size=Medium ' +
    'Speed=30 ' +
    'Features=' +
      '"Language (Common; Elvish; Giant)",' +
      '"Firbolg Ability Adjustment","Firbolg Magic","Hidden Step",' +
      '"Powerful Build","Speech Of Beast And Leaf"',
  'Goliath':
    'Size=Medium ' +
    'Speed=30 ' +
    'Features=' +
      '"Language (Common; Giant)",' +
      '"Goliath Ability Adjustment","Mountain Born","Natural Athlete",' +
      '"Powerful Build","Stone\'s Endurance"',
  'Kenku':
    'Size=Medium ' +
    'Speed=30 ' +
    'Features=' +
      '"Language (Common; Auran)",' +
      '"Kenku Ability Adjustment","Expert Forgery","Kenku Training","Mimicry"',
  'Lizardfolk':
    'Size=Medium ' +
    'Speed=30 ' +
    'Features=' +
      '"Language (Common; Draconic)",' +
      '"Lizardfolk Ability Adjustment","Bite","Cunning Artisan",' +
      '"Hold Breath","Hungry Jaws","Hunter\'s Lore","Natural Armor","Swimmer"',
  'Protector Aasimar':
    'Size=Medium ' +
    'Speed=30 ' +
    'Features=' +
      '"Language (Common; Celestial)",' +
      '"Aasimar Ability Adjustment","Darkvision","Celestial Resistance",' +
      '"Healing Hands","Light Bearer",' +
      '"Protector Aasimar Ability Adjustment","3:Radiant Soul (Aasimar)"',
  'Scourge Aasimar':
    'Size=Medium ' +
    'Speed=30 ' +
    'Features=' +
      '"Language (Common; Celestial)",' +
      '"Aasimar Ability Adjustment","Darkvision","Celestial Resistance",' +
      '"Healing Hands","Light Bearer",' +
      '"Scourge Aasimar Ability Adjustment","3:Radiant Consumption"',
  'Tabaxi':
    'Size=Medium ' +
    'Speed=30 ' +
    'Features=' +
      '"Language (Common; Choose 1 from any)",' +
      '"Tabaxi Ability Adjustment","Cat\'s Claws","Cat\'s Talent",' +
      '"Darkvision","Feline Agility"',
  'Triton':
    'Size=Medium ' +
    'Speed=30 ' +
    'Features=' +
      '"Language (Common; Primordial)",' +
      '"Triton Ability Adjustment","Amphibious","Control Air And Water",' +
      '"Emissary Of The Sea","Guardians Of The Depths","Swimmer"'
};
Volo.MONSTROUS_FEATURES = {

  // Bugbear (ref Eberron5E)
  'Bugbear Ability Adjustment':
    'Section=ability Note="+2 Strength/+1 Dexterity"',
  // Darkvision as SRD5E
  'Long-Limbed':'Section=combat Note="+5\' melee reach"',
  // Powerful Build as above
  'Sneaky':'Section=skill Note="Skill Proficiency (Stealth)"',
  'Surprise Attack':
    'Section=combat ' +
    'Note="Inflicts +2d6 HP on the first surprise hit once per combat"',

  // Goblin (ref Eberron5E)
  // Darkvision as SRD5E
  'Fury Of The Small':
    'Section=combat ' +
    'Note="Can inflict +%{level} HP to a larger creature once per short rest"',
  'Goblin Ability Adjustment':
    'Section=ability Note="+2 Dexterity/+1 Constitution"',
  'Nimble Escape':
    'Section=combat Note="Can use a bonus action to Disengage or Hide"',

  // Hobgoblin (ref Eberron5E)
  // Darkvision as SRD5E
  'Hobgoblin Ability Adjustment':
    'Section=ability Note="+2 Constitution/+1 Intelligence"',
  'Martial Training':
    'Section=combat ' +
    'Note="Armor Proficiency (Light)/Weapon Proficiency (Choose 2 from any Martial)"',
  'Saving Face':
    'Section=feature ' +
    'Note="Can add 1 for each ally within 30\' (+5 maximum) to a failed roll once per short rest"',

  // Kobold
  // Darkvision as SRD5E
  'Grovel, Cower, and Beg':
    'Section=combat ' +
    'Note="R10\' Can distract foes, giving allies advantage on attacks, for 1 rd once per short rest"',
  'Kobold Ability Adjustment':
    'Section=ability Note="+2 Dexterity/-2 Strength"',
  'Pack Tactics':
    'Section=combat ' +
    'Note="Has advantage on attacks when an ally is adjacent to the target"',
  'Sunlight Sensitivity': // (ref PHB5E)
    'Section=combat,skill ' +
    'Note=' +
      '"Has disadvantage on attacks in direct sunlight",' +
      '"Has disadvantage on sight Perception in direct sunlight"',

  // Orc (ref Eberron5E)
  'Aggressive':
    'Section=combat ' +
    'Note="Can use a bonus action to move %{speed}\' toward a foe"',
  // Darkvision as SRD5E
  // Menacing as SRD5E
  'Orc Ability Adjustment':
    'Section=ability Note="+2 Strength/+1 Constitution/-2 Intelligence"',
  // Powerful Build as above

  // Yuan-Ti
  // Darkvision as SRD5E
  'Innate Spellcasting':
    'Section=magic ' +
    'Note="Knows the <i>Poison Spray</i> cantrip%{level<3?\' and\':\',\'} can cast <i>Animal Friendship</i> on snakes at will%{level<3?\'\':\', and can cast <i>Suggestion</i> once per long rest\'}" ' +
    'SpellAbility=Charisma ' +
    'Spells="Poison Spray","Animal Friendship","3:Suggestion"',
  'Magic Resistance':
    'Section=save Note="Has advantage vs. spells and magical effects"',
  'Poison Immunity':
    'Section=save Note="Has immunity to poison and the poisoned condition"',
  'Yuan-Ti Ability Adjustment':
    'Section=ability Note="+2 Charisma/+1 Intelligence"'

};
Volo.MONSTROUS_RACES = {
  'Bugbear': // (ref Eberron5E)
    'Size=Medium ' +
    'Speed=30 ' +
    'Features=' +
      '"Language (Common; Goblin)",' +
      '"Bugbear Ability Adjustment","Darkvision","Long-Limbed",' +
      '"Powerful Build","Sneaky","Surprise Attack"',
  'Goblin': // (ref Eberron5E)
    'Size=Small ' +
    'Speed=30 ' +
    'Features=' +
      '"Language (Common; Goblin)",' +
      '"Darkvision","Fury Of The Small","Goblin Ability Adjustment",' +
      '"Nimble Escape"',
  'Hobgoblin': // (ref Eberron5E)
    'Size=Medium ' +
    'Speed=30 ' +
    'Features=' +
      '"Language (Common; Goblin)",' +
      '"Darkvision","Hobgoblin Ability Adjustment","Martial Training",' +
      '"Saving Face"',
  'Kobold':
    'Size=Small ' +
    'Speed=30 ' +
    'Features=' +
      '"Language (Common; Draconic)",' +
      '"Darkvision","Grovel, Cower, and Beg","Kobold Ability Adjustment",' +
      '"Pack Tactics","Sunlight Sensitivity"',
  'Orc': // (ref Eberron5E)
    'Size=Medium ' +
    'Speed=30 ' +
    'Features=' +
      '"Language (Common; Orc)",' +
      '"Aggressive","Darkvision","Menacing","Orc Ability Adjustment",' +
      '"Powerful Build"',
  'Yuan-Ti':
    'Size=Medium ' +
    'Speed=30 ' +
    'Features=' +
      '"Language (Common; Abyssal; Draconic)",' +
      '"Darkvision","Innate Spellcasting","Magic Resistance",' +
      '"Poison Immunity","Yuan-Ti Ability Adjustment"'
};
Volo.SPELLS = {
  'Wall Of Water': // (ref Xanathar)
    'School=Evocation ' +
    'Level=D3,S3,W3 ' +
    'Description=' +
      '"R60\' 30\'x10\' wall or 20\'x20\' ring inflicts disadvantage on ranged attacks, reduces fire effects by half, and turns to ice from cold effects for concentration up to 10 min"'
};

/* Defines rules related to basic character identity. */
Volo.identityRules = function(rules, races) {
  SRD5E.identityRules(rules, {}, {}, {}, {}, {}, races);
  for(let r in races)
    Volo.raceRulesExtra(rules, r);
};

/* Defines rules related to magic use. */
Volo.magicRules = function(rules, spells) {
  SRD5E.magicRules(rules, {}, spells);
};

/* Defines rules related to character aptitudes. */
Volo.talentRules = function(rules, features) {
  SRD5E.talentRules(rules, {}, features, {}, {}, {}, {});
};

/*
 * Defines in #rules# the rules associated with race #name# that cannot be
 * derived directly from the attributes passed to raceRules.
 */
Volo.raceRulesExtra = function(rules, name) {
  if(name.match(/Aasimar/)) {
    let raceLevel =
      name.charAt(0).toLowerCase() + name.substring(1).replaceAll(' ', '') + 'Level';
    SRD5E.featureSpells(rules, 'Light Bearer', 'Aasimar', raceLevel, ['Light']);
    rules.defineRule('casterLevels.Aasimar', raceLevel, '=', null);
    rules.defineRule('spellModifier.Aasimar',
      'casterLevels.Aasimar', '?', null,
      'charismaModifier', '=', null
    );
    rules.defineRule('spellAttackModifier.Aasimar',
      'spellModifier.Aasimar', '=', null,
      'proficiencyBonus', '+', null
    );
    rules.defineRule('spellDifficultyClass.Aasimar',
      'spellAttackModifier.Aasimar', '=', '8 + source'
    );
  } else if(name == 'Lizardfolk') {
    SRD5E.weaponRules(rules, 'Bite', 'Unarmed', [], '1d6', null);
    rules.defineRule('weapons.Bite', 'combatNotes.bite', '=', '1');
    rules.defineRule('armorClass', 'combatNotes.naturalArmor.1', '^', null);
    rules.defineRule('combatNotes.naturalArmor.1',
      'combatNotes.naturalArmor', '?', null,
      'armor', '?', 'source == "None"',
      'dexterityModifier', '=', '13 + source',
      'shield', '+', 'source=="None" ? 0 : 2'
    );
  } else if(name == 'Tabaxi') {
    SRD5E.weaponRules(rules, 'Claws', 'Unarmed', [], '1d4', null);
    rules.defineRule('weapons.Claws', "combatNotes.cat'sClaws", '=', '1');
  }
};

/* Returns HTML body content for user notes associated with this rule set. */
Volo.ruleNotes = function() {
  return '' +
    '<h2>Volo Quilvyn Plugin Notes</h2>\n' +
    'Volo Quilvyn Plugin Version ' + Volo.VERSION + '\n' +
    '<p>\n' +
    'There are no known bugs, limitations, or usage notes specific to the Volo Rule Set.\n' +
    '</p>\n' +
    '<h3>Copyrights and Licensing</h3>\n' +
    '<p>\n' +
    'Quilvyn\'s Volo\'s Guide supplement is unofficial Fan Content permitted ' +
    'under Wizards of the Coast\'s ' +
    '<a href="https://company.wizards.com/en/legal/fancontentpolicy">Fan Content Policy</a>.\n' +
    '</p><p>\n' +
    'Quilvyn is not approved or endorsed by Wizards of the Coast. Portions ' +
    'of the materials used are property of Wizards of the Coast. ©Wizards of ' +
    'the Coast LLC.\n' +
    '</p><p>\n' +
    'Volo\'s Guide to Monsters © 2016 Wizards of the Coast LLC.\n' +
    '</p><p>\n' +
    'Dungeons & Dragons Player\'s Handbook © 2014 Wizards of the Coast LLC.\n' +
    '</p>\n';
};
