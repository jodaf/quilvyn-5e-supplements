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

  var monstrous = (edition + '').match(/monster|monstrous/i);
  var features = monstrous ? Volo.MONSTROUS_FEATURES : Volo.CHARACTER_FEATURES;
  var races = monstrous ? Volo.MONSTROUS_RACES : Volo.CHARACTER_RACES;
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

Volo.VERSION = '2.3.2.0';

Volo.CHARACTER_FEATURES = {
  'Amphibious':'Section=feature Note="Breathe air or water"',
  'Bite':
    'Section=combat Note="Use Bite as natural piercing weapon"',
  "Cat's Claws":
    'Section=ability,combat ' +
    'Note=' +
      '"20\' climb",' +
      '"Use claws as natural slashing weapon"',
  "Cat's Talent":'Section=skill Note="Skill Proficiency (Perception/Stealth)"',
  'Celestial Resistance':
    'Section=save Note="Resistance to necrotic and radiant damage"',
  'Control Air And Water':
    'Section=magic Note="Cast <i>Fog Cloud</i>%1 1/long rest"',
  'Cunning Artisan':
    'Section=skill ' +
    'Note="Craft shield or weapon from carcass during short rest"',
  'Emissary Of The Sea':
    'Section=skill Note="Speak to water-breathing creatures"',
  'Expert Forgery':'Section=skill Note="Adv on forgery and duplication checks"',
  'Fallen Aasimar Ability Adjustment':
    'Section=ability Note="+2 Charisma/+1 Strength"',
  'Feline Agility':'Section=combat Note="Dbl speed move 1/skipped move"',
  'Firbolg Ability Adjustment':'Section=ability Note="+2 Wisdom/+1 Strength"',
  'Firbolg Magic':
    'Section=magic ' +
    'Note="Cast <i>Detect Magic</i> and <i>Disguise Self</i> 1/short rest"',
  'Goliath Ability Adjustment':
    'Section=ability Note="+2 Strength/+1 Constitution"',
  'Guardians Of The Depths':
    'Section=save Note="Resistance to cold damage, unaffected by water depth"',
  'Healing Hands':'Section=magic Note="Heal %V HP 1/long rest"',
  'Hidden Step':'Section=magic Note="Self invisible for 1 rd 1/short rest"',
  'Hold Breath':'Section=ability Note="Hold breath for 15 min"',
  'Hungry Jaws':
    'Section=combat ' +
    'Note="Bonus bite gives self %{constitutionModifier>?1} temporary HP on hit 1/short rest"',
  "Hunter's Lore":
    'Section=skill ' +
    'Note="Skill Proficiency (Choose 2 from Animal Handling, Nature, Perception, Stealth, Survival)"',
  'Kenku Ability Adjustment':'Section=ability Note="+2 Dexterity/+1 Wisdom"',
  'Kenku Training':
    'Section=skill ' +
    'Note="Skill Proficiency (Choose 2 from Acrobatics, Deception, Stealth, Sleight Of Hand)"',
  'Light Bearer':'Section=magic Note="Know <i>Light</i> cantrip"',
  'Lizardfolk Ability Adjustment':
    'Section=ability Note="+2 Constitution/+1 Wisdom"',
  'Mimicry':
    'Section=skill ' +
    'Note="Deception vs. Insight to fool others with mimicked sounds"',
  'Mountain Born':'Section=feature Note="Adapted to high elevation and cold"',
  'Natural Athlete':'Section=skill Note="Skill Proficiency (Athletics)"',
  'Necrotic Shroud':
    'Section=combat ' +
    'Note="R10\' Appearance frightens (DC %1 neg) for 1 rd, target suffers +%V HP necrotic 1/rd for 1 min 1/long rest"',
  'Natural Armor':'Section=combat Note="Unarmored AC %V"',
  'Powerful Build':'Section=ability Note="x2 Carry/x2 Lift"',
  'Protector Aasimar Ability Adjustment':
    'Section=ability Note="+2 Charisma/+1 Wisdom"',
  'Radiant Consumption':
    'Section=combat ' +
    'Note="R10\' Light inflicts %1 HP radiant damage to all including self, target suffers +%V HP radiant 1/rd for 1 min 1/long rest"',
  'Radiant Soul (Aasimar)':
    'Section=ability,combat ' +
    'Note="30\' Fly for 1 min 1/long rest",' +
         '"Inflict +%V HP radiant 1/rd for 1 min 1/long rest"',
  'Scourge Aasimar Ability Adjustment':
    'Section=ability Note="+2 Charisma/+1 Constitution"',
  'Speech Of Beast And Leaf':
    'Section=skill Note="Speak to beasts and plants, Adv on influence Cha checks w/same"',
  "Stone's Endurance":
    'Section=combat ' +
    'Note="Use Reaction to reduce damage taken by 1d12+%{constitutionModifier} HP 1/short rest"',
  'Swimmer':'Section=ability Note="30\' swim"',
  'Tabaxi Ability Adjustment':'Section=ability Note="+2 Dexterity/+1 Charisma"',
  'Triton Ability Adjustment':
    'Section=ability Note="+1 Charisma/+1 Constitution/+1 Strength"'
};
Volo.CHARACTER_RACES = {
  'Fallen Aasimar':
    'Features=' +
      '"Language (Common/Celestial)",' +
      '"Celestial Resistance",Darkvision,"Healing Hands",' +
      '"Fallen Aasimar Ability Adjustment","Light Bearer",' +
      '"3:Necrotic Shroud"',
  'Firbolg':
    'Features=' +
      '"Language (Common/Elvish/Giant)",' +
      '"Firbolg Ability Adjustment","Firbolg Magic","Hidden Step",' +
      '"Powerful Build","Speech Of Beast And Leaf"',
  'Lizardfolk':
    'Features=' +
      '"Language (Common/Draconic)",' +
      'Bite,"Cunning Artisan","Lizardfolk Ability Adjustment","Hold Breath",' +
      '"Hungry Jaws","Hunter\'s Lore","Natural Armor",Swimmer',
  'Goliath':
    'Features=' +
      '"Language (Common/Giant)",' +
      '"Goliath Ability Adjustment","Mountain Born","Natural Athlete",' +
      '"Powerful Build","Stone\'s Endurance"',
  'Kenku':
    'Features=' +
      '"Language (Common/Auran)",' +
      '"Expert Forgery","Kenku Ability Adjustment","Kenku Training",Mimicry',
  'Protector Aasimar':
    'Features=' +
      '"Language (Common/Celestial)",' +
      'Darkvision,"Celestial Resistance","Healing Hands","Light Bearer",' +
      '"Protector Aasimar Ability Adjustment","3:Radiant Soul (Aasimar)"',
  'Scourge Aasimar':
    'Features=' +
      '"Language (Common/Celestial)",' +
      'Darkvision,"Celestial Resistance","Healing Hands","Light Bearer",' +
      '"Scourge Aasimar Ability Adjustment",' +
      '"3:Radiant Consumption"',
  'Tabaxi':
    'Features=' +
      '"Language (Common/Choose 1 from any)",' +
      '"Cat\'s Claws","Cat\'s Talent",Darkvision,"Feline Agility",' +
      '"Tabaxi Ability Adjustment"',
  'Triton':
    'Features=' +
      '"Language (Common/Primordial)",' +
      'Amphibious,"Control Air And Water","Emissary Of The Sea",' +
      '"Guardians Of The Depths",Swimmer,"Triton Ability Adjustment"'
};
Volo.MONSTROUS_FEATURES = {
  'Aggressive':
    'Section=combat Note="Bonus action to move up to %{speed}\' toward foe"',
  'Bugbear Ability Adjustment':
    'Section=ability Note="+2 Strength/+1 Dexterity"',
  'Fury Of The Small':
    'Section=combat Note="+%{level} HP damage to larger creature 1/short rest"',
  'Goblin Ability Adjustment':
    'Section=ability Note="+2 Dexterity/+1 Constitution"',
  'Grovel, Cower, and Beg':
    'Section=feature ' +
    'Note="R10\' Distract foes (allies gain Adv on attack) for 1 rd 1/short rest"',
  'Hobgoblin Ability Adjustment':
    'Section=ability Note="+2 Constitution/+1 Intelligence"',
  'Innate Spellcasting':
    'Section=magic ' +
    'Note="Know <i>Poison Spray</i> cantrip, cast <i>Animal Friendship</i> on snakes at will%1"',
  'Kobold Ability Adjustment':
    'Section=ability Note="+2 Dexterity/-2 Strength"',
  'Long-Limbed':'Section=combat Note="+5\' melee reach"',
  'Martial Training':
    'Section=combat ' +
    'Note="Armor Proficiency (Light)/Weapon Proficiency (Choose 2 from any Martial)"',
  'Magic Resistance':
    'Section=save Note="Adv on saves vs. spells and other magic effects"',
  'Nimble Escape':'Section=combat Note="Bonus action to Disengage or Hide"',
  'Orc Ability Adjustment':
    'Section=ability Note="+2 Strength/+1 Constitution/-2 Intelligence"',
  'Pack Tactics':
    'Section=combat Note="Adv on attack when ally w/in 5\' of foe"',
  'Poison Immunity':'Section=save Note="Cannot be poisoned"',
  'Powerful Build':'Section=ability Note="x2 Carry/x2 Lift"',
  'Saving Face':
    'Section=feature ' +
    'Note="Gain +1 for each ally w/in 30\' (+5 maximum) on failed roll 1/short rest"',
  'Sneaky':'Section=skill Note="Skill Proficiency (Stealth)"',
  'Surprise Attack':
    'Section=combat Note="+2d6 HP damage on first surprise hit"',
  'Yuan-Ti Ability Adjustment':
    'Section=ability Note="+2 Charisma/+1 Intelligence"'
};
Volo.MONSTROUS_RACES = {
  'Bugbear':
    'Features=' +
      '"Language (Common/Goblin)",' +
      '"Bugbear Ability Adjustment",Darkvision,Long-Limbed,"Powerful Build",' +
      'Sneaky,"Surprise Attack"',
  'Goblin':
    'Features=' +
      '"Language (Common/Goblin)",' +
      'Darkvision,"Fury Of The Small","Goblin Ability Adjustment",' +
      '"Nimble Escape",Small',
  'Hobgoblin':
    'Features=' +
      '"Language (Common/Goblin)",' +
      'Darkvision,"Hobgoblin Ability Adjustment","Martial Training",' +
      '"Saving Face"',
  'Kobold':
    'Features=' +
      '"Language (Common/Draconic)",' +
      'Darkvision,"Grovel, Cower, and Beg","Kobold Ability Adjustment",' +
      '"Pack Tactics",Small,"Sunlight Sensitivity"',
  'Orc':
    'Features=' +
      '"Language (Common/Orc)",' +
      'Aggressive,Darkvision,Menacing,"Orc Ability Adjustment",' +
      '"Powerful Build"',
  'Yuan-Ti':
    'Features=' +
      '"Language (Common/Abyssal/Draconic)",' +
      'Darkvision,"Innate Spellcasting","Magic Resistance","Poison Immunity",' +
      '"Yuan-Ti Ability Adjustment"'
};
Volo.SPELLS = {
  // Copied from Xanathar's
  'Wall Of Water':
    'School=Evocation ' +
    'Level=D3,S3,W3 ' +
    'Description="R60\' 30\'x10\' wall inflicts Disadv on ranged attacks and half damage on fire for conc or 10 min"'
};

/* Defines rules related to basic character identity. */
Volo.identityRules = function(rules, races) {
  SRD5E.identityRules(rules, {}, {}, {}, {}, {}, races);
  for(var r in races) {
    Volo.raceRulesExtra(rules, r);
  }
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
    rules.defineRule('magicNotes.healingHands', 'level', '=', null);
    SRD5E.featureSpells(rules, 'Light Bearer', 'S', null, ['Light']);
    rules.defineRule('casterLevels.Light Bearer',
      'features.Light Bearer', '?', null,
      'level', '=', null,
      'levels.Sorcerer', 'v', '0'
    );
    rules.defineRule('casterLevels.S', 'casterLevels.Light Bearer', '^=', null);
  }
  if(name == 'Fallen Aasimar') {
    rules.defineRule('combatNotes.necroticShroud', 'level', '=', null);
    rules.defineRule('combatNotes.necroticShroud.1',
      'charismaModifier', '=', '8 + source',
      'proficiencyBonus', '+', null
    );
  } else if(name == 'Firbolg') {
    SRD5E.featureSpells
      (rules, 'Firbolg Magic', 'D', null, ['Detect Magic,Disguise Self']);
    rules.defineRule('casterLevels.Firbolg Magic',
      'features.Firbolg Magic', '?', null,
      'level', '=', null,
      'levels.Druid', 'v', '0'
    );
    rules.defineRule
      ('casterLevels.D', 'casterLevels.Firbolg Magic', '^=', null);
  } else if(name == 'Hobgoblin') {
    // Have to hard-code these proficiencies, since featureRules only handles
    // notes w/a single type of granted proficiency
    rules.defineRule
      ('armorProficiency.Light', 'combatNotes.martialTraining', '=', '1');
    rules.defineRule
      ('weaponChoiceCount', 'combatNotes.martialTraining', '+=', '2');
  } else if(name == 'Lizardfolk') {
    SRD5E.weaponRules(rules, 'Bite', 0, ['Un'], '1d6', null);
    rules.defineRule('weapons.Bite', 'combatNotes.bite', '=', '1');
    rules.defineRule('armorClass', 'combatNotes.naturalArmor.1', '^', null);
    rules.defineRule('combatNotes.naturalArmor',
      'dexterityModifier', '=', '13 + source',
      'shield', '+', 'source=="None" ? 0 : 2'
    );
    rules.defineRule('combatNotes.naturalArmor.1',
      'armor', '?', 'source == "None"',
      'combatNotes.naturalArmor', '=', null
    );
  } else if(name == 'Protector Aasimar') {
    rules.defineRule('combatNotes.radiantSoul(Aasimar)', 'level', '=', null);
  } else if(name == 'Scourge Aasimar') {
    rules.defineRule('combatNotes.radiantConsumption', 'level', '=', null);
    rules.defineRule('combatNotes.radiantConsumption.1',
      'level', '=', 'Math.ceil(source / 2)'
    );
  } else if(name == 'Tabaxi') {
    SRD5E.weaponRules(rules, 'Claws', 0, ['Un'], '1d4', null);
    rules.defineRule('weapons.Claws', "combatNotes.cat'sClaws", '=', '1');
  } else if(name == 'Triton') {
    rules.defineRule('magicNotes.controlAirAndWater.1',
      'tritonLevel', '=', 'source<3 ? "" : source<5 ? " w/<i>Gust Of Wind</i>" : " w/<i>Gust Of Wind</i> and <i>Wall Of Water</i>"'
    );
    SRD5E.featureSpells(
      rules, 'Control Air And Water', 'S', 'level',
      ['Fog Cloud',
       '3:Gust Of Wind',
       '5:Wall Of Water']
    );
    rules.defineRule('casterLevels.Control Air And Water',
      'features.Control Air And Water', '?', null,
      'level', '=', null,
      'levels.Sorcerer', 'v', '0'
    );
    rules.defineRule
      ('casterLevels.S', 'casterLevels.Control Air And Water', '^=', null);
  } else if(name == 'Yuan-Ti') {
    rules.defineRule('magicNotes.innateSpellcasting.1',
      'yuan-TiLevel', '=', 'source<3 ? "" : ", cast <i>Suggestion</i> 1/long rest"'
    );
    SRD5E.featureSpells(
      rules, 'Innate Spellcasting', 'S', 'level',
      ['Poison Spray,Animal Friendship', '3:Suggestion']
    );
    rules.defineRule('casterLevels.Innate Spellcasting',
      'features.Innate Spellcasting', '?', null,
      'level', '=', null,
      'levels.Sorcerer', 'v', '0'
    );
    rules.defineRule
      ('casterLevels.S', 'casterLevels.Innate Spellcasting', '^=', null);
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
    'of the materials used are property of Wizards of the Coast. ??Wizards of ' +
    'the Coast LLC.\n' +
    '</p><p>\n' +
    'Volo\'s Guide to Monsters ?? 2016 Wizards of the Coast LLC.\n' +
    '</p><p>\n' +
    'Dungeons & Dragons Player\'s Handbook ?? 2014 Wizards of the Coast LLC.\n' +
    '</p>\n';
};
