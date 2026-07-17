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
/* globals SRD5E, PHB5E, QuilvynUtils */
"use strict";

/*
 * This module loads the rules from Fifth Edition Xanathar's Guide to
 * Everything. The Xanathar function contains methods that load rules for
 * particular parts of the rules; raceRules for character races, magicRules for
 * spells, etc. These member methods can be called independently in order to use
 * a subset of XGTE. Similarly, the constant fields of Xanathar (FEATURES,
 * SPELLS, etc.) can be manipulated to modify the choices.
 */
function Xanathar(edition, rules) {

  if(window.PHB5E == null) {
    alert('The Xanathar module requires use of the PHB5E module');
    return;
  }

  if(rules == null)
    rules = PHB5E.rules;
  Xanathar.identityRules(
    rules, Xanathar.CLASSES_FEATURES_ADDED, Xanathar.CLASSES_SELECTABLES_ADDED,
    Xanathar.DEITIES_DOMAINS_ADDED
  );
  Xanathar.magicRules(rules, Xanathar.SPELLS, Xanathar.SPELLS_LEVELS_ADDED);
  Xanathar.talentRules
    (rules, Xanathar.FEATS, Xanathar.FEATURES, Xanathar.TOOLS_ADDED);

}

Xanathar.VERSION = '2.4.2.0';

Xanathar.CLASSES_FEATURES_ADDED = {
  'Barbarian':
    '"features.Path Of The Ancestral Guardian ? 3:Ancestral Protectors",' +
    '"features.Path Of The Ancestral Guardian ? 6:Spirit Shield",' +
    '"features.Path Of The Ancestral Guardian ? 10:Consult The Spirits",' +
    '"features.Path Of The Ancestral Guardian ? 14:Vengeful Ancestors",' +
    '"features.Storm Aura (Desert) ? 6:Storm Soul (Desert)",' +
    '"features.Storm Aura (Sea) ? 6:Storm Soul (Sea)",' +
    '"features.Storm Aura (Tundra) ? 6:Storm Soul (Tundra)",' +
    '"features.Path Of The Storm Herald ? 10:Shielding Storm",' +
    '"features.Storm Aura (Desert) ? 14:Raging Storm (Desert)",' +
    '"features.Storm Aura (Sea) ? 14:Raging Storm (Sea)",' +
    '"features.Storm Aura (Tundra) ? 14:Raging Storm (Tundra)",' +
    '"features.Path Of The Zealot ? 3:Divine Fury",' +
    '"features.Path Of The Zealot ? 3:Warrior Of The Gods",' +
    '"features.Path Of The Zealot ? 6:Fanatical Focus",' +
    '"features.Path Of The Zealot ? 10:Zealous Presence",' +
    '"features.Path Of The Zealot ? 14:Rage Beyond Death"',
  'Bard':
    '"features.College Of Glamour ? 3:Enthralling Performance",' +
    '"features.College Of Glamour ? 3:Mantle Of Inspiration",' +
    '"features.College Of Glamour ? 6:Mantle Of Majesty",' +
    '"features.College Of Glamour ? 14:Unbreakable Majesty",' +
    '"features.College Of Swords ? 3:Blade Flourish",' +
    '"features.College Of Swords ? 3:Defensive Flourish",' +
    '"features.College Of Swords ? 3:Mobile Flourish",' +
    '"features.College Of Swords ? 3:Slashing Flourish",' +
    '"features.College Of Swords ? 3:Bonus Proficiencies (College Of Swords)",' +
    '"bardHasExtraAttack ? 6:Extra Attack",' +
    '"features.College Of Swords ? 14:Master\'s Flourish",' +
    '"features.College Of Whispers ? 3:Psychic Blades (College Of Whispers)",' +
    '"features.College Of Whispers ? 3:Words Of Terror",' +
    '"features.College Of Whispers ? 6:Mantle Of Whispers",' +
    '"features.College Of Whispers ? 14:Shadow Lore"',
  'Cleric':
    '"features.Forge Domain ? 1:Blessing Of The Forge",' +
    '"features.Forge Domain ? 1:Bonus Proficiencies (Forge Domain)",' +
    '"features.Forge Domain ? 1:Forge Domain Spells",' +
    '"features.Forge Domain ? 2:Artisan\'s Blessing",' +
    '"features.Forge Domain ? 6:Soul Of The Forge",' +
    '"clericHasDivineStrike ? 8:Divine Strike",' +
    '"features.Forge Domain ? 17:Saint Of Forge And Fire",' +
    '"features.Grave Domain ? 1:Circle Of Mortality",' +
    '"features.Grave Domain ? 1:Eyes Of The Grave",' +
    '"features.Grave Domain ? 1:Grave Domain Spells",' +
    '"features.Grave Domain ? 2:Path To The Grave",' +
    '"features.Grave Domain ? 6:Sentinel At Death\'s Door",' +
    '"clericHasPotentSpellcasting ? 8:Potent Spellcasting",' +
    '"features.Grave Domain ? 17:Keeper Of Souls"',
  'Druid':
    '"features.Circle Of Dreams ? 2:Balm Of The Summer Court",' +
    '"features.Circle Of Dreams ? 6:Hearth Of Moonlight And Shadow",' +
    '"features.Circle Of Dreams ? 10:Hidden Paths",' +
    '"features.Circle Of Dreams ? 14:Walker In Dreams",' +
    '"features.Circle Of The Shepherd ? 2:Language (Sylvan)",' +
    '"features.Circle Of The Shepherd ? 2:Speech Of The Woods",' +
    '"features.Circle Of The Shepherd ? 2:Spirit Totem (Bear)",' +
    '"features.Circle Of The Shepherd ? 2:Spirit Totem (Hawk)",' +
    '"features.Circle Of The Shepherd ? 2:Spirit Totem (Unicorn)",' +
    '"features.Circle Of The Shepherd ? 6:Mighty Summoner",' +
    '"features.Circle Of The Shepherd ? 10:Guardian Spirit",' +
    '"features.Circle Of The Shepherd ? 14:Faithful Summons"',
  'Fighter':
    '"features.Arcane Archer ? 3:Arcane Archer Lore",' +
    '"features.Arcane Archer ? 3:Arcane Shot",' +
    '"features.Arcane Archer ? 7:Curving Shot",' +
    '"features.Arcane Archer ? 7:Magic Arrow",' +
    '"features.Arcane Archer ? 15:Ever-Ready Shot",' +
    '"features.Cavalier ? 3:Born To The Saddle",' +
    '"features.Cavalier ? 3:Bonus Proficiency (Cavalier)",' +
    '"features.Cavalier ? 3:Unwavering Mark",' +
    '"features.Cavalier ? 7:Warding Maneuver",' +
    '"features.Cavalier ? 10:Hold The Line",' +
    '"features.Cavalier ? 15:Ferocious Charger",' +
    '"features.Cavalier ? 18:Vigilant Defender",' +
    '"features.Samurai ? 3:Fighting Spirit",' +
    '"features.Samurai ? 3:Bonus Proficiency (Samurai)",' +
    '"features.Samurai ? 7:Elegant Courtier",' +
    '"features.Samurai ? 10:Tireless Spirit",' +
    '"features.Samurai ? 15:Rapid Strike",' +
    '"features.Samurai ? 18:Strength Before Death"',
  'Monk':
    '"features.Way Of The Drunken Master ? 3:Bonus Proficiencies (Way Of The Drunken Master)",' +
    '"features.Way Of The Drunken Master ? 3:Drunken Technique",' +
    '"features.Way Of The Drunken Master ? 6:Tipsy Sway",' +
    '"features.Way Of The Drunken Master ? 11:Drunkard\'s Luck",' +
    '"features.Way Of The Drunken Master ? 17:Intoxicated Frenzy",' +
    '"features.Way Of The Kensei ? 3:Path Of The Kensei",' +
    '"features.Way Of The Kensei ? 6:One With The Blade",' +
    '"features.Way Of The Kensei ? 11:Sharpen The Blade",' +
    '"features.Way Of The Kensei ? 17:Unerring Accuracy",' +
    '"features.Way Of The Sun Soul ? 3:Radiant Sun Bolt",' +
    '"features.Way Of The Sun Soul ? 6:Searing Arc Strike",' +
    '"features.Way Of The Sun Soul ? 11:Searing Sunburst",' +
    '"features.Way Of The Sun Soul ? 17:Sun Shield"',
  'Paladin':
    '"features.Oath Of Conquest ? 3:Conquering Presence",' +
    '"features.Oath Of Conquest ? 3:Guided Strike",' +
    '"features.Oath Of Conquest ? 3:Oath Of Conquest Spells",' +
    '"features.Oath Of Conquest ? 7:Aura Of Conquest",' +
    '"features.Oath Of Conquest ? 15:Scornful Rebuke",' +
    '"features.Oath Of Conquest ? 20:Invincible Conqueror",' +
    '"features.Oath Of Redemption ? 3:Emissary Of Peace",' +
    '"features.Oath Of Redemption ? 3:Oath Of Redemption Spells",' +
    '"features.Oath Of Redemption ? 3:Rebuke The Violent",' +
    '"features.Oath Of Redemption ? 7:Aura Of The Guardian",' +
    '"features.Oath Of Redemption ? 15:Protective Spirit",' +
    '"features.Oath Of Redemption ? 20:Emissary Of Redemption"',
  'Ranger':
    '"features.Gloom Stalker ? 3:Dread Ambusher",' +
    '"features.Gloom Stalker ? 3:Gloom Stalker Magic",' +
    '"features.Gloom Stalker ? 3:Umbral Sight",' +
    '"features.Gloom Stalker ? 7:Iron Mind",' +
    '"features.Gloom Stalker ? 11:Stalker\'s Flurry",' +
    '"features.Gloom Stalker ? 15:Shadowy Dodge",' +
    '"features.Horizon Walker ? 3:Detect Portal",' +
    '"features.Horizon Walker ? 3:Horizon Walker Magic",' +
    '"features.Horizon Walker ? 3:Planar Warrior",' +
    '"features.Horizon Walker ? 7:Ethereal Step",' +
    '"features.Horizon Walker ? 11:Distant Strike",' +
    '"features.Horizon Walker ? 15:Spectral Defense",' +
    '"features.Monster Slayer ? 3:Hunter\'s Sense",' +
    '"features.Monster Slayer ? 3:Monster Slayer Magic",' +
    '"features.Monster Slayer ? 3:Slayer\'s Prey",' +
    '"features.Monster Slayer ? 7:Supernatural Defense",' +
    '"features.Monster Slayer ? 11:Magic-User\'s Nemesis",' +
    '"features.Monster Slayer ? 15:Slayer\'s Counter"',
  'Rogue':
    '"features.Inquisitive ? 3:Ear For Deceit",' +
    '"features.Inquisitive ? 3:Eye For Detail",' +
    '"features.Inquisitive ? 3:Insightful Fighting",' +
    '"features.Inquisitive ? 9:Steady Eye",' +
    '"features.Inquisitive ? 13:Unerring Eye",' +
    '"features.Inquisitive ? 17:Eye For Weakness",' +
    '"features.Mastermind ? 3:Master Of Intrigue",' +
    '"features.Mastermind ? 3:Master Of Tactics",' +
    '"features.Mastermind ? 9:Insightful Manipulator",' +
    '"features.Mastermind ? 13:Misdirection",' +
    '"features.Mastermind ? 17:Soul Of Deceit",' +
    '"features.Scout ? 3:Skirmisher",' +
    '"features.Scout ? 3:Survivalist",' +
    '"features.Scout ? 9:Superior Mobility",' +
    '"features.Scout ? 13:Ambush Master",' +
    '"features.Scout ? 17:Sudden Strike",' +
    '"features.Swashbuckler ? 3:Fancy Footwork",' +
    '"features.Swashbuckler ? 3:Rakish Audacity",' +
    '"features.Swashbuckler ? 9:Panache",' +
    '"features.Swashbuckler ? 13:Elegant Maneuver",' +
    '"features.Swashbuckler ? 17:Master Duelist"',
  'Sorcerer':
    '"features.Divine Soul ? 1:Divine Magic",' +
    '"features.Divine Soul ? 1:Favored By The Gods",' +
    '"features.Divine Soul ? 6:Empowered Healing",' +
    '"features.Divine Soul ? 14:Otherworldly Wings",' +
    '"features.Divine Soul ? 18:Unearthly Recovery",' +
    '"features.Shadow Magic ? 1:Eyes Of The Dark",' +
    '"features.Shadow Magic ? 1:Strength Of The Grave",' +
    '"features.Shadow Magic ? 6:Hound Of Ill Omen",' +
    '"features.Shadow Magic ? 14:Shadow Walk",' +
    '"features.Shadow Magic ? 18:Umbral Form",' +
    '"features.Storm Sorcery ? 1:Wind Speaker",' +
    '"features.Storm Sorcery ? 1:Tempestuous Magic",' +
    '"features.Storm Sorcery ? 6:Heart Of The Storm",' +
    '"features.Storm Sorcery ? 6:Storm Guide",' +
    '"features.Storm Sorcery ? 14:Storm\'s Fury",' +
    '"features.Storm Sorcery ? 18:Wind Soul"',
  'Warlock':
    '"features.The Celestial ? 1:Bonus Cantrips (The Celestial)",' +
    '"features.The Celestial ? 1:Healing Light",' +
    '"features.The Celestial ? 6:Radiant Soul",' +
    '"features.The Celestial ? 10:Celestial Resilience",' +
    '"features.The Celestial ? 14:Searing Vengeance",' +
    '"features.The Hexblade ? 1:Hexblade\'s Curse",' +
    '"features.The Hexblade ? 1:Hex Warrior",' +
    '"features.The Hexblade ? 6:Accursed Specter",' +
    '"features.The Hexblade ? 10:Armor Of Hexes",' +
    '"features.The Hexblade ? 14:Master Of Hexes"',
  'Wizard':
    '"features.War Magic ? 2:Arcane Deflection",' +
    '"features.War Magic ? 2:Tactical Wit",' +
    '"features.War Magic ? 6:Power Surge",' +
    '"features.War Magic ? 10:Durable Magic",' +
    '"features.War Magic ? 14:Deflecting Shroud"'
};
Xanathar.CLASSES_SELECTABLES_ADDED = {
  'Barbarian':
    '"3:Path Of The Ancestral Guardian:Primal Path",' +
    '"3:Path Of The Storm Herald:Primal Path",' +
    '"3:Path Of The Zealot:Primal Path",' +
    '"features.Path Of The Storm Herald ? 3:Storm Aura (Desert):Storm Aura",' +
    '"features.Path Of The Storm Herald ? 3:Storm Aura (Sea):Storm Aura",' +
    '"features.Path Of The Storm Herald ? 3:Storm Aura (Tundra):Storm Aura"',
  'Bard':
    '"3:College Of Glamour:Bard College",' +
    '"3:College Of Swords:Bard College",' +
    '"3:College Of Whispers:Bard College",' +
    '"features.College Of Swords ? 3:Fighting Style (Dueling)",' +
    '"features.College Of Swords ? 3:Fighting Style (Two-Weapon Fighting)"',
  'Cleric':
    '"deityDomains =~ \'Forge\' ? 1:Forge Domain:Divine Domain",' +
    '"deityDomains =~ \'Grave\' ? 1:Grave Domain:Divine Domain"',
  'Druid':
    '"2:Circle Of Dreams:Druid Circle",' +
    '"2:Circle Of The Shepherd:Druid Circle"',
  'Fighter':
    '"3:Arcane Archer:Martial Archetype","3:Cavalier:Martial Archetype",' +
    '"3:Samurai:Martial Archetype",' +
    '"3:Banishing Arrow:Arcane Shot","3:Beguiling Arrow:Arcane Shot",' +
    '"3:Bursting Arrow:Arcane Shot","3:Enfeebling Arrow:Arcane Shot",' +
    '"3:Grasping Arrow:Arcane Shot","3:Piercing Arrow:Arcane Shot",' +
    '"3:Seeking Arrow:Arcane Shot","3:Shadow Arrow:Arcane Shot"',
  'Monk':
    '"3:Way Of The Drunken Master:Monastic Tradition",' +
    '"3:Way Of The Kensei:Monastic Tradition",' +
    '"3:Way Of The Sun Soul:Monastic Tradition"',
  'Paladin':
    '"3:Oath Of Conquest:Sacred Oath",' +
    '"3:Oath Of Redemption:Sacred Oath"',
  'Ranger':
    '"3:Gloom Stalker:Ranger Archetype",' +
    '"3:Horizon Walker:Ranger Archetype",' +
    '"3:Monster Slayer:Ranger Archetype"',
  'Rogue':
    '"3:Inquisitive:Roguish Archetype",' +
    '"3:Mastermind:Roguish Archetype",' +
    '"3:Scout:Roguish Archetype",' +
    '"3:Swashbuckler:Roguish Archetype"',
  'Sorcerer':
    '"1:Divine Soul:Sorcerous Origin",' +
    '"1:Shadow Magic:Sorcerous Origin",' +
    '"1:Storm Sorcery:Sorcerous Origin"',
  'Warlock':
    '"1:The Celestial:Otherworldly Patron",' +
    '"1:The Hexblade:Otherworldly Patron",' +
    '"features.Pact Of The Tome ? 1:Aspect Of The Moon:Eldritch Invocation",' +
    '"5:Cloak Of Flies:Eldritch Invocation",' +
    '"features.Pact Of The Blade ? 5:Eldritch Smite:Eldritch Invocation",' +
    '"7:Ghostly Gaze:Eldritch Invocation",' +
    '"5:Gift Of The Depths:Eldritch Invocation",' +
    '"features.Pact Of The Chain ? 1:Gift Of The Ever-Living Ones:Eldritch Invocation",' +
    '"1:Grasp Of Hadar:Eldritch Invocation",' +
    '"features.Pact Of The Blade ? 1:Improved Pact Weapon:Eldritch Invocation",' +
    '"1:Lance Of Lethargy:Eldritch Invocation",' +
    '"5:Maddening Hex:Eldritch Invocation",' +
    '"7:Relentless Hex:Eldritch Invocation",' +
    '"15:Shroud Of Shadow:Eldritch Invocation",' +
    '"5:Tomb Of Levistus:Eldritch Invocation",' +
    '"7:Trickster\'s Escape:Eldritch Invocation"',
  'Wizard':
    '"2:War Magic:Arcane Tradition"'
};
Xanathar.DEITIES_DOMAINS_ADDED = {
  'Celtic-Goibhniu':'Forge',
  'Egyptian-Anubis':'Grave',
  'Egyptian-Osiris':'Grave',
  'FR-Gond':'Forge',
  'FR-Kelemvor':'Grave',
  'Greek-Hades':'Grave',
  'Greek-Hephaestus':'Forge',
  'Greyhawk-Wee Jas':'Grave',
  'NH-Moradin':'Forge',
  // Dragonlance
  'Reorx':'Forge',
  // Eberron
  'Onatar':'Forge',
  'The Undying Court':'Grave',
  // SwordCoast
  'Gond':'Forge',
  'Kelemvor':'Grave'
};
Xanathar.FEATS = {
  'Bountiful Luck':'Require="race =~ \'Halfling\'"',
  'Dragon Fear':'Require="race =~ \'Dragonborn\'"',
  'Dragon Hide':'Require="race =~ \'Dragonborn\'"',
  'Drow High Magic':'Require="race == \'Dark Elf\'"',
  'Dwarven Fortitude':'Require="race =~ \'Dwarf\'"',
  'Elven Accuracy':'Require="race =~ \'Elf\'"',
  'Fade Away':'Require="race =~ \'Gnome\'"',
  'Fey Teleportation':'Require="race == \'High Elf\'"',
  'Flames Of Phlegethos':'Require="race =~ \'Tiefling\'"',
  'Infernal Constitution':'Require="race =~ \'Tiefling\'"',
  'Orcish Fury':'Require="race == \'Half-Orc\'"',
  'Prodigy':'Require="race =~ \'Half-Elf|Half-Orc|Human\'"',
  'Second Chance':'Require="race =~ \'Halfling\'"',
  'Squat Nimbleness':'Require="race =~ \'Dwarf\' || size == \'Small\'"',
  'Wood Elf Magic':'Require="race == \'Wood Elf\'"'
};
Xanathar.FEATURES = {

  // Barbarian
  // Path Of The Ancestral Guardian
  'Ancestral Protectors':
    'Section=combat ' +
    'Note="First foe struck each turn during rage suffers disadvantage on attacks on others, who also have resistance to damage from the foe, until the start of the next turn"',
  'Consult The Spirits':
    'Section=magic ' +
    'Note="Can cast <i>Augury</i> or <i>Clairvoyance</i> without expending a spell slot once per short rest" ' +
    'SpellAbility=Wisdom ' +
    'Spells=Augury,Clairvoyance',
  'Spirit Shield':
    'Section=combat ' +
    'Note="R30\' Can use a reaction to reduce the damage to a creature by %{levels.Barbarian<10?2:levels.Barbarian<14?3:4}d6 HP%{combatNotes.vengefulAncestors?\' and inflict the same amount of force damage on the attacker\':\'\'}"',
  'Vengeful Ancestors':
    'Section=combat Note="Has increased Spirit Shield effects"',
  // Path Of The Storm Herald
  'Raging Storm (Desert)':
    'Section=combat ' +
    'Note="R10\' Can use a reaction to inflict %{levels.Barbarian//2} HP fire on a successful attacker (save DC %{8+proficiencyBonus+constitutionModifier} Dexterity negates)"',
  'Raging Storm (Sea)':
    'Section=combat ' +
    'Note="R10\' Can use a reaction to inflict knocked prone with a successful attack (save DC %{8+proficiencyBonus+constitutionModifier} Strength negates)"',
  'Raging Storm (Tundra)':
    'Section=combat ' +
    'Note="R10\' Activating Storm Aura allows immobilizing a target (save DC %{8+proficiencyBonus+constitutionModifier} Strength negates) until the start of the next turn"',
  'Shielding Storm':
    'Section=combat ' +
    'Note="R10\' Targets gain Storm Soul resistance during rage"',
  'Storm Aura (Desert)':
    'Section=combat ' +
    'Note="10\' radius inflicts %{levels.Barbarian//5+2} HP fire upon entering rage; can use a bonus action each turn to repeat the effect throughout rage"',
  'Storm Aura (Sea)':
    'Section=combat ' +
    'Note="R10\' inflicts %{levels.Barbarian//5>?1}d6 HP lightning (save DC %{8+proficiencyBonus+constitutionModifier} Dexterity half) upon entering rage; can use a bonus action each turn to repeat the effect throughout rage"',
  'Storm Aura (Tundra)':
    'Section=combat ' +
    'Note="R10\' Can give targets %{levels.Barbarian//5+2} temporary hit points upon entering rage; can use a bonus action each turn to repeat the effect throughout rage"',
  'Storm Soul (Desert)':
    'Section=magic,save ' +
    'Note=' +
      '"Can set unattended flammable objects on fire via touch",' +
      '"Has resistance to fire and immunity to extreme heat"',
  'Storm Soul (Sea)':
    'Section=ability,save ' +
    'Note=' +
      '"Has a 30\' swim Speed and can breathe water",' +
      '"Has resistance to lightning"',
  'Storm Soul (Tundra)':
    'Section=magic,save ' +
    'Note=' +
      '"Can freeze an unoccupied 5\' cube of water for 1 min via touch",' +
      '"Has resistance to cold and immunity to extreme cold"',
  // Path Of The Zealot
  'Divine Fury':
    'Section=combat ' +
    'Note="First weapon hit each turn during rage inflicts +1d6+%{levels.Barbarian//2} HP of a choice of necrotic or radiant"',
  'Fanatical Focus':
    'Section=save Note="Can reroll a failed save once per rage"',
  'Rage Beyond Death':
    'Section=combat Note="Remains conscious and alive at 0 HP until rage ends"',
  'Warrior Of The Gods':
    'Section=feature ' +
    'Note="Life-restoring spells cast on self require no material components"',
  'Zealous Presence':
    'Section=combat ' +
    'Note="R60\' Can use a bonus action to give 10 targets advantage on attacks and saves until the start of the next turn once per long rest"',

  // Bard
  // College Of Glamour
  'Enthralling Performance':
    'Section=skill ' +
    'Note="R60\' Can use 1 min performance once per short rest to charm %{charismaModifier>1?charismaModifier+\' listeners\':\'1 listener\'} (save DC %{spellDifficultyClass.B} Will negates) for 1 hr or until damaged or self attacks the target or its ally"',
  'Mantle Of Inspiration':
    'Section=combat ' +
    'Note="R60\' Can use a bonus action and expend a Bardic Inspiration use to give %{charismaModifier>1?charismaModifier+\' targets\':\'1 target\'} %{levels.Bard//5*3+6<?14} temporary hit points and allow %{charismaModifier>1?\'them\':\'it\'} to use a reaction to make an immediate move without provoking opportunity attacks"',
  'Mantle Of Majesty':
    'Section=magic ' +
    'Note="Can use a bonus action each turn to cast <i>Command</i> without expending a spell slot for concentration up to 1 min once per long rest" ' +
    'Spells=Command',
  'Unbreakable Majesty':
    'Section=combat ' +
    'Note="Can use a bonus action to prevent foes from attacking self for 1 min (save DC %{spellDifficultyClass.B} Charisma negates and inflicts disadvantage on saves vs. self spells until the end of the next turn)"',
  // College Of Swords
  'Bonus Proficiencies (College Of Swords)':
    'Section=combat,magic ' +
    'Note=' +
      '"Armor Proficiency (Medium)/Weapon Proficiency (Scimitar)",' +
      '"Can use a proficient melee weapon as a bard spell focus"',
  'Blade Flourish':
    'Section=combat ' +
    'Note="Taking an Attack action gives +10 Speed until the end of the turn and allows using a flourish after a successful weapon attack once per turn"',
  'Defensive Flourish':
    'Section=combat ' +
    'Note="Can expend 1 Bardic Inspiration to inflict +1d%{bardicInspirationDie} HP weapon damage and gain an equal bonus to Armor Class for until the start of the next turn"',
  // Extra Attack as SRD5E
  // Fighting Style as SRD5E
  "Master's Flourish":
    'Section=combat ' +
    'Note="Can roll 1d6 instead of expending a Bardic Inspiration die for a flourish"',
  'Mobile Flourish':
    'Section=combat ' +
    'Note="Can expend 1 Bardic Inspiration to inflict +1d%{bardicInspirationDie} weapon damage and a 5\' + 1d%{bardicInspirationDie}\' push, optionally using a reaction to follow the foe"',
  'Slashing Flourish':
    'Section=combat ' +
    'Note="Can expend 1 Bardic Inspiration to inflict +1d%{bardicInspirationDie} HP weapon damage on the target and an adjacent foe"',
  // College Of Whispers
  'Mantle Of Whispers':
    'Section=magic ' +
    'Note="R30\' Can capture a dying person\'s shadow to use as a disguise (Insight vs. +5 Deception detects) for 1 hr once short rest"',
  'Psychic Blades (College Of Whispers)':
    'Section=combat ' +
    'Note="Can expend 1 Bardic Inspiration die to inflict +%{levels.Bard<5?2:levels.Bard<10?3:levels.Bard<15?5:8}d6 HP psychic once per turn"',
  'Shadow Lore':
    'Section=magic ' +
    'Note="R30\' Target obeys self commands (save DC %{spellDifficultyClass.B} Wisdom negates) for 8 hr once per long rest"',
  'Words Of Terror':
    'Section=skill ' +
    'Note="Can use 1 min of conversation to frighten a target (save DC %{spellDifficultyClass.B} Wisdom negates) for 1 hr or until the target or an ally is attacked or damaged once per short rest"',

  // Cleric
  // Forge Domain
  "Artisan's Blessing":
    'Section=magic ' +
    'Note="Can use Channel Divinity and a 1 hr ritual to craft a metal item worth up to 100 GP"',
  'Bonus Proficiencies (Forge Domain)':
    'Section=combat,skill ' +
    'Note=' +
      '"Armor Proficiency (Heavy)",' +
      '"Tool Proficiency (Smith\'s Tools)"',
  'Blessing Of The Forge':
    'Section=magic ' +
    'Note="Touched weapon or armor gains a +1 bonus until the next long rest once per long rest"',
  // Divine Strike as SRD5E
  'Forge Domain Spells':
    'Spells=' +
      '"1:Identify","1:Searing Smite",' +
      '"3:Heat Metal","3:Magic Weapon",' +
      '"5:Elemental Weapon","5:Protection From Energy",' +
      '"7:Fabricate","7:Wall Of Fire",' +
      '"9:Animate Objects","9:Creation"',
  'Saint Of Forge And Fire':
    'Section=save ' +
    'Note="Has resistance to non-magical bludgeoning, piercing, and slashing in heavy armor/Has immunity to fire"',
  'Soul Of The Forge':
    'Section=combat,save ' +
    'Note=' +
      '"+1 Armor Class in heavy armor",' +
      '"Has resistance to fire"',
  // Grave Domain
  'Circle Of Mortality':
    'Section=magic ' +
    'Note="Can cast R30\' <i>Spare The Dying</i> as a bonus action, and cure spells restore the maximum number of hit points for targets with 0 hit points" ' +
    'Spells="Spare The Dying"',
  'Eyes Of The Grave':
    'Section=magic ' +
    'Note="R60\' Can detect undead until the end of the next turn %{wisdomModifier>1?wisdomModifier+\' times\':\'once\'} per long rest"',
  'Grave Domain Spells':
    'Spells=' +
      '"1:Bane","1:False Life",' +
      '"3:Gentle Repose","3:Ray Of Enfeeblement",' +
      '"5:Revivify","5:Vampiric Touch",' +
      '"7:Blight","7:Death Ward",' +
      '"9:Antilife Shell","9:Raise Dead"',
  'Keeper Of Souls':
    'Section=magic ' +
    'Note="R60\' Can cause a foe\'s death to restore to another creature hit points equal to the foe\'s number of Hit Dice once per turn"',
  'Path To The Grave':
    'Section=magic ' +
    'Note="R30\' Can use Channel Divinity to inflict vulnerability to all damage until the end of the next turn"',
  // Potent Spellcasting as PHB5E
  "Sentinel At Death's Door":
    'Section=combat ' +
    'Note="R30\' Can use a reaction to negate a critical hit %{wisdomModifier>1?wisdomModifier+\' times\':\'once\'} per long rest"',

  // Druid
  // Circle Of Dreams
  'Balm Of The Summer Court':
    'Section=magic ' +
    'Note="R120\' Can use a bonus action to restore up to %{levels.Druid//2}d6 hit points and give the target 1 temporary hit point per die, restoring a total of %{levels.Druid}d6 hit points per long rest"',
  'Hearth Of Moonlight And Shadow':
    'Section=magic ' +
    'Note="Creates a 30\' sphere that gives +5 Stealth and Perception and obscures flames during a rest"',
  'Hidden Paths':
    'Section=magic ' +
    'Note="Can use a bonus action to teleport self 60\' or a willing touched target 30\' %{wisdomModifier>1?wisdomModifier+\' times\':\'once\'} per long rest"',
  'Walker In Dreams':
    'Section=magic ' +
    'Note="After a short rest, can cast <i>Dream</i>, <i>Scrying</i>, or <i>Teleportation Circle</i> connected to the most recent long rest location without expending a spell slot once per long rest" ' +
    'Spells=Dream,Scrying,"Teleportation Circle"',
  // Circle Of The Shepherd
  'Faithful Summons':
    'Section=magic ' +
    'Note="Upon incapacitation, can summon 4 creatures that protect self for 1 hr once per long rest"',
  'Guardian Spirit':
    'Section=magic ' +
    'Note="Summoned creatures within Spirit Totem radius regain %{levels.Druid//2} hit points at the end of their turns"',
  'Mighty Summoner':
    'Section=magic ' +
    'Note="Summoned creatures gain +2 hit points per Hit Die and magical natural weapons"',
  'Speech Of The Woods':
    'Section=skill,skill ' +
    'Note=' +
      '"Language (Sylvan)",' +
      '"Can communicate with beasts"',
  'Spirit Totem (Bear)':
    'Section=magic ' +
    'Note="R60\' Can use a bonus action to give targets in a 30\' radius %{levels.Druid+5} temporary hit points and advantage on Strength for 1 min once per short rest; can use bonus actions to move the radius 60\'"',
  'Spirit Totem (Hawk)':
    'Section=magic ' +
    'Note="R60\' Can use a bonus action to give targets in a 30\' radius advantage on Perception, and can use a reaction to give advantage on an attack, for 1 min once per short rest; can use bonus actions to move the radius 60\'"',
  'Spirit Totem (Unicorn)':
    'Section=magic ' +
    'Note="R60\' Can use a bonus action to give allies advantage to detect creatures in a 30\' radius, and self heal spells also restore %{levels.Druid} hit points to targets in the same radius, for 1 min once per short rest; can use bonus actions to move the radius 60\'"',

  // Fighter
  // Arcane Archer
  'Arcane Archer Lore':
    'Section=magic,skill ' +
    'Note=' +
      '"Knows either the <i>Druidcraft</i> or <i>Prestidigitation</i> cantrip",' +
      '"Skill Proficiency (Choose 1 from Arcana, Nature)"',
  'Arcane Shot':
    'Section=combat,feature ' +
    'Note=' +
      '"Can use an Arcane Shot effect once per turn 2 times per short rest",' +
      '"%V selection%{featureNotes.arcaneShot>1?\'s\':\'\'}"',
  'Banishing Arrow':
    'Section=combat ' +
    'Note="Arcane Shot arrow inflicts%{levels.Fighter>=18?\' +2d6 HP force and\':\'\'} banishment to the Feywild until the end of the target\'s next turn (save DC %{8+proficiencyBonus+intelligenceModifier} Charisma negates%{levels.Fighter>=18?\' banishment\':\'\'})"',
  'Beguiling Arrow':
    'Section=combat ' +
    'Note="Arcane Shot arrow inflicts +%{level<18?2:4}d6 HP psychic, and the target becomes charmed by a chosen ally within 30\' (save DC %{8+proficiencyBonus+intelligenceModifier} Wisdom negates charm) until the start of the next turn or until the ally attacks or damages the target or forces it to make a save"',
  'Bursting Arrow':
    'Section=combat ' +
    'Note="Successful Arcane Shot arrow attack inflicts +%{levels.Fighter<18?2:4}d6 HP force damage in a 10\' radius"',
  'Curving Shot':
    'Section=combat ' +
    'Note="Can use a bonus action to redirect a magic arrow miss to another target within 60\'"',
  'Enfeebling Arrow':
    'Section=combat ' +
    'Note="Arcane Shot arrow inflicts +%{levels.Fighter<18?2:4}d6 HP necrotic damage and reduces the damage inflicted by the target\'s attacks by half until the start of the next turn (save DC %{8+proficiencyBonus+intelligenceModifier} Constitution HP only)"',
  'Ever-Ready Shot':
    'Section=combat ' +
    'Note="Has a minimum of 1 Arcane Shot use available after initiative"',
  'Grasping Arrow':
    'Section=combat ' +
    'Note="Arcane Shot arrow inflicts +%{levels.Fighter<18?2:4}d6 HP poison damage, -10\' Speed, and %{levels.Fighter<18?2:4}d6 HP slashing per rd upon target move for 1 min (save DC %{8+proficiencyBonus+intelligenceModifier} Athletics ends)"',
  'Magic Arrow':'Section=combat Note="Can make arrows magical when fired"',
  'Piercing Arrow':
    'Section=combat ' +
    'Note="Arcane Shot arrow passes harmlessly through objects and inflicts +%{levels.Fighter<18?1:2}d6 HP piercing damage (save DC %{8+proficiencyBonus+intelligenceModifier} Dexterity half) on creatures in a 30\'x1\' line"',
  'Seeking Arrow':
    'Section=combat ' +
    'Note="Arcane Shot arrow finds the specified target, ignoring 3/4 cover, inflicts +%{levels.Fighter<18?1:2}d6 HP force, and reveals the target\'s location (save DC %{8+proficiencyBonus+intelligenceModifier} Dexterity half HP only)"',
  'Shadow Arrow':
    'Section=combat ' +
    'Note="Arcane Shot arrow inflicts +%{levels.Fighter<18?2:4}d6 HP psychic and 5\' vision until the start of the next turn (save DC %{8+proficiencyBonus+intelligenceModifier} Wisdom HP only)"',
  // Cavalier
  'Bonus Proficiency (Cavalier)':
    'Section=skill ' +
    // TODO choice of skill proficiency or language
    'Note="Skill Proficiency (Choose 1 from Animal Handling, History, Insight, Performance, Persuasion)"',
  'Born To The Saddle':
    'Section=skill ' +
    'Note="Has advantage on saves vs. falling off mount, lands on feet after a 10\' fall from mount, and dismount and mount each cost only 5\' movement"',
  'Ferocious Charger':
    'Section=combat ' +
    'Note="Can knock prone with a hit after a 10\' move (save DC %{8+proficiencyBonus+strengthModifier} Strength negates) once per turn"',
  'Hold The Line':
    'Section=combat ' +
    'Note="Foe move within reach provokes an opportunity attack; a hit halts the move"',
  'Unwavering Mark':
    'Section=combat ' +
    'Note="A successful attack can mark a foe until the end of the next turn %{strengthModifier>1?strengthModifier+\' times\':\'once\'} per long rest; its attacks on others when adjacent to self suffer disadvantage, and damaging others allows self to use a bonus action during the next turn to attack with advantage, inflicting +%{levels.Fighter//2} HP weapon damage"',
  'Vigilant Defender':
    'Section=combat ' +
    'Note="Can use a reaction to make an opportunity attack on every other creature\'s turn"',
  'Warding Maneuver':
    'Section=combat ' +
    'Note="When using a melee weapon or shield, can use a reaction in response to a successful attack on self or an adjacent ally to give the target +1d8 Armor Class and damage resistance %{constitutionModifier>1?constitutionModifier+\' times\':\'once\'} per long rest"',
  // Samurai
  'Bonus Proficiency (Samurai)':
    'Section=skill ' +
    // TODO choice of skill proficiency or language
    'Note="Skill Proficiency (Choose 1 from History, Insight, Performance, Persuasion)"',
  'Elegant Courtier':
    'Section=save,skill ' +
    'Note=' +
      // TODO Choice of Intelligence or Charisma if already has Wisdom
      '"Save Proficiency (Wisdom)",' +
      '"+%V Persuasion"',
  'Fighting Spirit':
    'Section=combat ' +
    'Note="Can use a bonus action to gain advantage on attacks until the end of the turn and %{levels.Fighter<10?5:levels.Fighter<15?10:15} temporary hit points 3 times per long rest"',
  'Rapid Strike':
    'Section=combat ' +
    'Note="Can forego advantage on an attack to gain an extra attack once per turn"',
  'Strength Before Death':
    'Section=combat ' +
    'Note="Can take an immediate extra turn when brought to 0 HP once per long rest"',
  'Tireless Spirit':
    'Section=combat ' +
    'Note="Has a minimum 1 Fighting Spirit use available after initiative"',

  // Monk
  // Way Of The Drunken Master
  'Bonus Proficiencies (Way Of The Drunken Master)':
    'Section=skill ' +
    'Note="Skill Proficiency (Performance)/Tool Proficiency (Brewer\'s Supplies)"',
  "Drunkard's Luck":
    'Section=feature ' +
    'Note="Can spend 2 ki points to cancel disadvantage on a self ability check, attack, or save"',
  'Drunken Technique':
    'Section=combat ' +
    'Note="Flurry Of Blows gives the benefits of Disengage and +10 Speed until the end of the turn"',
  'Intoxicated Frenzy':
    'Section=combat ' +
    'Note="Directing each Flurry Of Blows attack at a different target allows making 3 additional attacks"',
  'Leap To Your Feet':
    'Section=ability Note="Standing from prone costs only 5\' movement"',
  'Redirect Attack':
    'Section=combat ' +
    'Note="Can use a reaction and spend 1 ki point to redirect a missed foe melee attack vs. self to an adjacent creature"',
  'Tipsy Sway':
    'Section=feature ' +
    'Note="Has the Leap To Your Feet and Redirect Attack features"',
  // Way Of The Kensei
  'Agile Parry':
    'Section=combat ' +
    'Note="Gains +2 Armor Class until the start of the next turn after an unarmed strike when armed with a Kensei melee weapon"',
  'Deft Strike':
    'Section=combat ' +
    'Note="Can spend 1 ki point to inflict +1d%{monkMeleeDieBonus} HP with a Kensei weapon once per turn"',
  'Kensei Weapons':
    'Section=combat ' +
    'Note="Has proficiency in %V choice%{combatNotes.kenseiWeapons>1?\'s\':\'\'} of non-heavy melee or ranged weapons"',
  "Kensei's Shot":
    'Section=combat ' +
    'Note="Can use a bonus action to inflict +1d4 HP weapon damage with ranged Kensei weapons until the end of the turn"',
  'Magic Kensei Weapons':
    'Section=combat Note="Attacks with Kensei weapons count as magical"',
  'One With The Blade':
    'Section=feature ' +
    'Note="Has the Magic Kensei Weapons and Deft Strike features"',
  'Path Of The Kensei':
    'Section=feature ' +
    'Note="Has the Kensei Weapons, Agile Parry, Kensei\'s Shot, and Way Of The Brush features"',
  'Sharpen The Blade':
    'Section=combat ' +
    'Note="Can use a bonus action and spend 1-3 ki points to gain an equal bonus on attack and damage with a nom-magical Kensei weapon for 1 min"',
  'Unerring Accuracy':
    'Section=combat Note="Can reroll a monk weapon miss once per turn"',
  'Way Of The Brush':
    'Section=skill ' +
    'Note="Tool Proficiency (Choose 1 from Calligrapher\'s Supplies, Painter\'s Supplies)"',
  // Way Of The Sun Soul (ref SwordCoast)
  'Radiant Sun Bolt':
    'Section=combat ' +
    'Note="R30\' +%{proficiencyBonus+dexterityModifier} ranged touch attack inflicts 1d%{combatNotes.martialArts}+%{dexterityModifier} HP radiant; after using it as part of an Attack action, can use a bonus action and spend 1 ki point for an additional use"',
  'Searing Arc Strike':
    'Section=magic ' +
    'Note="Can use a bonus action and spend 2 ki points to cast <i>Burning Hands</i> after using an Attack action; each additional ki point spent raises the spell level by 1, to a maximum of level %{levels.Monk//2-1}" ' +
    'SpellAbility=Wisdom ' +
    'Spells="Burning Hands"',
  'Searing Sunburst':
    'Section=magic ' +
    'Note="R150\' 20\' radius inflicts 2d6 HP radiant (save DC %{monkSaveDC} Constitution negates); can spend 1, 2, or 3 ki points to inflict +2d6, +4d6, or +6d6 HP"',
  'Sun Shield':
    'Section=combat ' +
    'Note="Can use a bonus action to emit or suppress a 30\' bright light; while emitting light, can use a reaction to inflict %{wisdomModifier+5} HP radiant on a successful melee attacker"',

  // Paladin
  // Oath Of Conquest
  'Aura Of Conquest':
    'Section=combat ' +
    'Note="R%{levels.Paladin<18?10:30}\' Frightened foes suffer immobility and %{levels.Paladin//2} HP psychic each rd"',
  'Conquering Presence':
    'Section=combat ' +
    'Note="R30\' Can use Channel Divinity to frighten targets for 1 min (save DC %{spellDifficultyClass.P} Wisdom negates; additional saves each rd end)"',
  // Guided Strike as PHB5E
  'Invincible Conqueror':
    'Section=combat ' +
    'Note="Can gain resistance to all damage, make an extra attack as part of Attack actions, and crit on a natural 19 for 1 min once per long rest"',
  'Oath Of Conquest Spells':
    'Spells=' +
      '"3:Armor Of Agathys","3:Command",' +
      '"5:Hold Person","5:Spiritual Weapon",' +
      '"9:Bestow Curse","9:Fear",' +
      '"13:Dominate Beast","13:Stoneskin",' +
      '"17:Cloudkill","17:Dominate Person"',
  'Scornful Rebuke':
    'Section=combat ' +
    'Note="Successful attackers suffer %{charismaModifier>?1} HP psychic"',
  // Oath Of Redemption
  'Aura Of The Guardian':
    'Section=combat ' +
    'Note="R%{levels.Paladin<18?10:30}\' Can use a reaction when another creature takes damage to transfer the damage to self"',
  'Emissary Of Peace':
    'Section=skill ' +
    'Note="Can use a bonus action and Channel Energy to gain +5 Persuasion for 10 min"',
  'Emissary Of Redemption':
    'Section=combat ' +
    'Note="Has resistance to all attack damage, and a successful attacker takes radiant damage equal to half that inflicted; attacking a creature negates these effects with that creature until a long rest"',
  'Oath Of Redemption Spells':
    'Spells=' +
      '"3:Sanctuary","3:Sleep",' +
      '"5:Calm Emotions","5:Hold Person",' +
      '"9:Counterspell","9:Hypnotic Pattern",' +
      '"13:Otiluke\'s Resilient Sphere","13:Stoneskin",' +
      '"17:Hold Monster","17:Wall Of Force"',
  'Protective Spirit':
    'Section=combat ' +
    'Note="Regains 1d6+%{levels.Paladin//2} hit points at the end of a turn when below %{hitPoints//2} hit points"',
  'Rebuke The Violent':
    'Section=combat ' +
    'Note="R30\' When another creature takes damage from an attack, can use a reaction and Channel Divinity to inflict on the attacker radiant damage equal to the attack damage (save DC %{spellDifficultyClass.P} Wisdom half)"',

  // Ranger
  // Gloom Stalker
  'Dread Ambusher':
    'Section=combat,combat ' +
    'Note=' +
      '"+%V Initiative",' +
      '"During the first turn of combat, gains +10 Speed and, as part of an Attack action, an additional weapon attack that inflicts +1d8 HP weapon damage"',
  'Gloom Stalker Magic':
    'Spells=' +
      '"3:Disguise Self",' +
      '"5:Rope Trick",' +
      '"9:Fear",' +
      '"13:Greater Invisibility",' +
      '17:Seeming',
  // TODO Choice of Intelligence, Charisma if already has Wisdom
  'Iron Mind':'Section=save Note="Save Proficiency (Wisdom)"',
  'Shadowy Dodge':
    'Section=combat ' +
    'Note="Can use a reaction to inflict disadvantage on an attacker who does not have advantage"',
  "Stalker's Flurry":
    'Section=combat ' +
    'Note="Can follow a weapon miss with another attack once per turn"',
  'Umbral Sight':
    'Section=feature ' +
    'Note="%{features.Darkvision?\\"Has +30\' Darkvision\\":\\"R60\' Sees one light level better\\"} and is invisible to Darkvision"',
  // Horizon Walker
  'Detect Portal':
    'Section=magic ' +
    'Note="R1 mile Can sense the nearest planar portal once per short rest"',
  'Distant Strike':
    'Section=combat ' +
    'Note="While using an Attack action, can teleport 10\' before each attack and make an additional attack against a third creature"',
  'Ethereal Step':
    'Section=magic ' +
    'Note="Can use a bonus action to cast <i>Etherealness</i>, lasting until the end of the turn, without expending a spell slot once per short rest" ' +
    'Spells=Etherealness',
  'Horizon Walker Magic':
    'Spells=' +
      '"3:Protection From Evil And Good",' +
      '"5:Misty Step",' +
      '"9:Haste",' +
      '"13:Banishment",' +
      '"17:Teleportation Circle"',
  'Planar Warrior':
    'Section=combat ' +
    'Note="R30\' Can use a bonus action to have the next self hit on the target during the current turn inflict force damage and +%{levels.Ranger<11?1:2}d8 HP"',
  'Spectral Defense':
    'Section=combat ' +
    'Note="Can use a reaction upon taking damage to gain resistance to it"',
  // Monster Slayer
  "Hunter's Sense":
    'Section=combat ' +
    'Note="R60\' Can sense the immunities, resistances, and vulnerabilities of a target %{wisdomModifier>1?wisdomModifier+\' times\':\'once\'} per long rest"',
  "Magic-User's Nemesis":
    'Section=combat ' +
    'Note="R60\' Can use a reaction to foil a target\'s spell cast or teleportation (save DC %{spellDifficultyClass.R} Wisdom negates) once per short rest"',
  'Monster Slayer Magic':
    'Spells=' +
      '"3:Protection From Evil And Good",' +
      '"5:Zone Of Truth",' +
      '"9:Magic Circle",' +
      '"13:Banishment",' +
      '"17:Hold Monster"',
  "Slayer's Counter":
    'Section=combat ' +
    'Note="Can use a reaction to attack when a Slayer\'s Prey target forces a self saving throw; attack success also causes the save to succeed"',
  "Slayer's Prey":
    'Section=combat ' +
    'Note="R60\' Can use a bonus action to mark a target, inflicting +1d6 HP weapon damage on it with the first attack each turn"',
  'Supernatural Defense':
    'Section=save ' +
    'Note="+1d6 saves and grapple escapes vs. Slayer\'s Prey targets"',

  // Rogue
  // Inquisitive
  'Ear For Deceit':
    'Section=skill ' +
    'Note="Scores a minimum of 8 on Insight rolls to detect lies"',
  'Eye For Detail':
    'Section=skill ' +
    'Note="Can use a bonus action to use Perception to spot a hidden item or Investigation to uncover a clue"',
  'Eye For Weakness':
    'Section=combat ' +
    'Note="Sneak Attack inflicts +3d6 HP vs. an Insightful Fighting target"',
  'Insightful Fighting':
    'Section=combat ' +
    'Note="Can use a bonus action and a successful Insight vs. Deception to make Sneak Attacks without advantage against the target for 1 min"',
  'Steady Eye':
    'Section=skill ' +
    'Note="Has advantage on Perception and Investigation after moving half speed"',
  'Unerring Eye':
    'Section=skill ' +
    'Note="R30\' Can sense the presence of illusions and other deceptions %{wisdomModifier>1?wisdomModifier+\' times\':\'once\'} per long rest"',
  // Mastermind (ref SwordCoast)
  'Insightful Manipulator':
    'Section=skill ' +
    'Note="Can learn 2 choices of information about a target after 1 min of observation: relative class levels, Charisma, Intelligence, or Wisdom"',
  'Master Of Intrigue':
    'Section=skill,skill ' +
    'Note=' +
      '"Language (Choose 2 from any)/Tool Proficiency (Disguise Kit; Forgery Kit; Choose 1 from any Gaming Set)",' +
      '"Can mimic an accent and speech patterns after listening for 1 min"',
  'Master Of Tactics':
    'Section=combat ' +
    'Note="R30\' Can use Help as a bonus action, and can Help with an attack within 30\'"',
  'Misdirection':
    'Section=combat ' +
    'Note="Can use a reaction to redirect an attack on self to a creature providing cover"',
  'Soul Of Deceit':
    'Section=save ' +
    'Note="Has immunity to telepathy, can use Deception vs. Insight to present false thoughts, and always detects as telling the truth"',
  // Scout
  'Ambush Master':
    'Section=combat ' +
    'Note="Has advantage on initiative, and the first successful attack in the first round gives self and allies advantage on attacks vs. that foe until the start of the next turn"',
  'Skirmisher':
    'Section=combat ' +
    'Note="Can use a reaction to move half speed without provoking opportunity attacks when a foe ends its turn within 5\'"',
  'Sudden Strike':
    'Section=combat ' +
    'Note="Can use a bonus action after an Attack action to make an additional attack; this can be a second Sneak Attack on a second target"',
  'Superior Mobility':'Section=ability Note="+10 Speed"',
  'Survivalist':
    'Section=skill ' +
    'Note="Skill Proficiency (Nature; Survival)/+%{proficiencyBonus} Nature/+%{proficiencyBonus} Survival"',
  // Swashbuckler (ref SwordCoast)
  'Elegant Maneuver':
    'Section=skill ' +
    'Note="Can use a bonus action to gain advantage on the next Acrobatics or Athletics check before the end of the turn"',
  'Fancy Footwork':
    'Section=combat ' +
    'Note="Attacking prevents the target from making opportunity attacks against self for the rest of the turn"',
  'Master Duelist':
    'Section=combat ' +
    'Note="Can reroll a miss with advantage once per short rest"',
  'Panache':
    'Section=skill ' +
    'Note="Successful Persuasion vs. Insight charms a non-hostile target (attack by self or an ally ends), or inflicts on a hostile target disadvantage on attacks on others and prevention of opportunity attacks on others (harm from an ally or moving more than 60\' away from self ends), for 1 min"',
  'Rakish Audacity':
    'Section=combat,combat ' +
    'Note=' +
      '"+%{charismaModifier} Initiative",' +
      '"Can use Sneak Attack without advantage against an adjacent target when no other foe is adjacent"',

  // Sorcerer
  // Divine Soul
  'Divine Magic':
    'Section=magic Note="Has access to spells from the cleric spell list"',
  'Empowered Healing':
    'Section=magic ' +
    'Note="R5\' Can spend 1 Sorcery Point to reroll a self or ally healing once per turn"',
  'Favored By The Gods':
    'Section=combat ' +
    'Note="Can add 2d4 to a failed attack or save once per short rest"',
  'Otherworldly Wings':
    'Section=ability Note="Can use a bonus action to gain a 30\' fly Speed"',
  'Unearthly Recovery':
    'Section=magic ' +
    'Note="Can use a bonus action to regain %{hitPoints//2} hit points when below %{hitPoints//2} hit points once per long rest"',
  // Shadow Magic
  'Eyes Of The Dark':
    'Section=feature,magic ' +
    'Note=' +
      '"R120\' Sees one light level better",' +
      '"Can cast <i>Darkness</i> using 2 Sorcery Points instead of a spell slot, allowing self to see through the darkness" ' +
    'Spells=Darkness',
  'Hound Of Ill Omen':
    'Section=combat ' +
    'Note="R120\' Can use a bonus action and spend 3 Sorcery Points to summon a hound to attack a chosen target as a dire wolf with %{levels.Sorcerer//2} temporary HP for 5 min or until the hound or target is reduced to 0 HP; it can move through obstacles as difficult terrain, and being adjacent to the hound inflicts on the target disadvantage vs. self spells"',
  'Shadow Walk':
    'Section=magic ' +
    'Note="Can use a bonus action to teleport 120\' between dim or dark areas"',
  'Strength Of The Grave':
    'Section=combat ' +
    'Note="Once per long rest, a successful DC 5 + damage Charisma save allows self to retain 1 hit point when reduced to 0 hit points by non-critical, non-radiant damage"',
  'Umbral Form':
    'Section=magic ' +
    'Note="Can use a bonus action and spend 6 Sorcery Points to gain the ability to move through objects as difficult terrain and resistance to non-force, non-radiant damage for 1 min"',
  // Storm Sorcery (ref SwordCoast)
  'Heart Of The Storm':
    'Section=magic,save ' +
    'Note=' +
      '"Casting a lightning or thunder spell of level 1 or higher inflicts %{levels.Sorcerer//2} HP of a choice of lightning or thunder on targets within 10\'",' +
      '"Has resistance to lightning and thunder"',
  'Storm Guide':
    'Section=magic ' +
    'Note="Can use an action to stop rain in a 20\' radius and a bonus action each rd to direct winds in a 100\' radius until the end of the next turn"',
  "Storm's Fury":
    'Section=combat ' +
    'Note="Can use a reaction to inflict %{levels.Sorcerer} HP lightning and a 20\' push on a successful melee attacker (save DC %{spellDifficultyClass.S} Strength negates push)"',
  'Tempestuous Magic':
    'Section=magic ' +
    'Note="Can use a bonus action before or after casting a spell of level 1 or higher to fly 10\' without provoking opportunity attacks"',
  'Wind Soul':
    'Section=ability,magic,save ' +
    'Note=' +
      '"Has a 60\' fly Speed",' +
      '"R30\' Can slow fly Speed to 30\' to give %{charismaModifier+3} others a 30\' fly Speed for 1 hr once per short rest",' +
      '"Has immunity to lightning and thunder"',
  'Wind Speaker':
    'Section=skill Note="Language (Primordial; Aquan; Auran; Ignan; Terran)"',

  // Warlock
  // The Celestial
  'Bonus Cantrips (The Celestial)':
    'Spells=Light,"Sacred Flame"',
  'Celestial Resilience':
    'Section=magic ' +
    'Note="Gains %{levels.Warlock+charismaModifier} temporary hit points, and can give 5 others %{levels.Warlock//2+charismaModifier} temporary hit points, at the end of a rest"',
  'Healing Light':
    'Section=magic ' +
    'Note="R60\' Can use bonus actions to restore %{levels.Warlock+1}d6 HP per long rest, with a maximum of %{charismaModifier>?1}d6 per healing"',
  'Radiant Soul':
    'Section=magic,save ' +
    'Note=' +
      '"Radiant and fire spells inflict +%{charismaModifier} HP on one target",' +
      '"Has resistance to radiant"',
  'Searing Vengeance':
    'Section=save ' +
    'Note="Instead of attempting a death saving throw, can regain %{hitPoints//2} hit points, stand, and inflict 2d8+%{charismaModifier} HP radiant and blindness until the end of the turn on targets within 30\' once per long rest"',
  // The Hexblade
  'Accursed Specter':
    'Section=magic ' +
    'Note="Can raise a slain humanoid as an obedient specter with %{levels.Warlock//2} temporary hit points%{charismaModifier>0?\' and +\'+charismaModifier+\' attacks\':\'\'} until the next long rest once per long rest"',
  'Armor Of Hexes':
    'Section=combat ' +
    'Note="Can use a reaction to give a successful attack on self by a Hexblade\'s Curse target a 50% miss chance"',
  'Hex Warrior':
    'Section=combat,combat ' +
    'Note=' +
      '"Armor Proficiency (Medium; Shield)/Weapon Proficiency (Martial)",' +
      '"At the end of a long rest, gains +%{charismaModifier-strengthModifier} attack and damage (Charisma instead of Strength) with pact weapons and a touched non-two-handed weapon until the next long rest"',
  "Hexblade's Curse":
    'Section=combat ' +
    'Note="R30\' Can use a bonus action to curse a target for 1 min once per short rest: self gains +%{proficiencyBonus} damage vs. the target, crits on a natural 19 vs. the target, and regains %{levels.Warlock+charismaModifier} hit points if the target dies"',
  'Master Of Hexes':
    'Section=combat ' +
    'Note="R30\' Can forego regaining hit points from a Hexblade\'s Curse target\'s death to move the curse to another"',
  // Eldritch Invocations
  'Aspect Of The Moon':
    'Section=save ' +
    'Note="Does not need to sleep, has immunity to sleep effects, and can engage in light activity during a long rest"',
  'Cloak Of Flies':
    'Section=combat ' +
    'Note="Can use a bonus action to create a 5\' radius that inflicts %{charismaModifier>?0} HP poison damage and gives advantage on Intimidate, but disadvantage on other Charisma checks, once per short rest"',
  'Eldritch Smite':
    'Section=combat ' +
    'Note="Once per turn, can expend a spell slot upon a pact weapon hit to inflict +1d8 HP force plus +1d8 HP force per slot level and to inflict prone on a Huge or smaller target"',
  'Ghostly Gaze':
    'Section=magic ' +
    'Note="Can see 30\' with Darkvision through solid objects for concentration up to 1 min once per short rest"',
  'Gift Of The Depths':
    'Section=ability,magic ' +
    'Note=' +
      '"Has a %{speed}\' swim Speed and can breathe water",' +
      '"Can cast <i>Water Breathing</i> without expending a spell slot once per long rest" ' +
    'Spells="Water Breathing"',
  'Gift Of The Ever-Living Ones':
    'Section=combat ' +
    'Note="Regains maximum HP from healing when within 100\' of familiar"',
  'Grasp Of Hadar':
    'Section=magic ' +
    'Note="<i>Eldritch Blast</i> can pull the target 10\' once per turn"',
  'Improved Pact Weapon':
    'Section=combat ' +
    'Note="Can use a bow or crossbow as a pact weapon, and a pact weapon gains +1 attack and damage if non-magical and can be used as a spell focus"',
  'Lance Of Lethargy':
    'Section=magic ' +
    'Note="<i>Eldritch Blast</i> can inflict -10 Speed until the end of the next turn once per turn"',
  'Maddening Hex':
    'Section=combat ' +
    'Note="R30\' Can use a bonus action to inflict %{charismaModifier>?1} HP psychic to targets in a 5\' radius around a curse target"',
  'Relentless Hex':
    'Section=combat ' +
    'Note="Can use a bonus action to teleport 30\' to a space adjacent to a curse target"',
  'Shroud Of Shadow':
    'Section=magic ' +
    'Note="Can cast <i>Invisibility</i> without expending a spell slot" ' +
    'Spells=Invisibility',
  'Tomb Of Levistus':
    'Section=combat ' +
    'Note="Can use a reaction upon taking damage to gain %{levels.Warlock*10} temporary hit points and suffer vulnerability to fire and immobility until the end of the next turn once per short rest"',
  "Trickster's Escape":
    'Section=magic ' +
    'Note="Can cast self <i>Freedom Of Movement</i> without expending a spell slot once per long rest" ' +
    'Spells="Freedom Of Movement"',

  // Wizard
  // War Magic
  'Arcane Deflection':
    'Section=combat ' +
    'Note="Can use a reaction and forego non-cantrip casting until the end of the next turn to gain +2 Armor Class vs. a successful attack or +4 on a failed save"',
  'Deflecting Shroud':
    'Section=combat ' +
    'Note="R60\' Arcane Deflection inflicts %{levels.Wizard//2} HP force on 3 targets"',
  'Durable Magic':
    'Section=combat,save ' +
    'Note=' +
      '"+2 Armor Class during spell concentration",' +
      '"+2 saves during spell concentration"',
  'Power Surge':
    'Section=magic ' +
    'Note="Can pool magical energy from %{intelligenceModifier>?1} countered or dispelled spells and use it once per turn to inflict +%{levels.Wizard//2} HP force with a spell; the pool contents increase to 1 after a short rest and reset to 1 after a long rest"',
  'Tactical Wit':'Section=combat Note="+%V Initiative"',

  // Feats
  'Bountiful Luck':
    'Section=combat ' +
    'Note="R30\' Can use a reaction and forego using the Lucky racial trait until the end of the next turn to allow an ally to reroll a natural 1 on an attack, ability check, or save"',
  'Dragon Fear':
    'Section=ability,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Strength, Constitution, Charisma)",' +
      '"R30\' Can use Breath Weapon to frighten targets for 1 min (save DC %{8+proficiencyBonus+charismaModifier} Wisdom negates; taking damage allows another save)"',
  'Dragon Hide':
    'Section=ability,combat,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Strength, Constitution, Charisma)",' +
      '"+3 Armor Class in no armor",' +
      '"Claws inflict 1d4%{strengthModifier<0?strengthModifier:strengthModifier>0?\'+\'+strengthModifier:\'\'} HP slashing"',
  'Drow High Magic':
    'Section=magic ' +
    'Note="Can cast <i>Detect Magic</i> without expending a spell slot and <i>Dispel Magic</i> and <i>Levitate</i> without expending a spell slot once per long rest" ' +
    'SpellAbility=Charisma ' +
    'Spells="Detect Magic","Dispel Magic",Levitate',
  'Dwarven Fortitude':
    'Section=ability,combat ' +
    'Note=' +
      '"+1 Constitution",' +
      '"During a Dodge action, can spend a Hit Die to regain the number rolled + %{constitutionModifier} hit points"',
  'Elven Accuracy':
    'Section=ability,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Dexterity, Intelligence, Wisdom, Charisma)",' +
      '"Can reroll 1 die when attacking with advantage using Dexterity, Intelligence, Wisdom, or Charisma"',
  'Fade Away':
    'Section=ability,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Dexterity, Intelligence)",' +
      '"Can use a reaction upon taking damage to become invisible until the end of the next turn once per short rest; attacking, inflicting damage, or forcing a save ends"',
  'Fey Teleportation':
    'Section=ability,magic,skill ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Charisma, Intelligence)",' +
      '"Can cast <i>Misty Step</i> without expending a spell slot once per short rest",' +
      '"Language (Sylvan)" ' +
    'SpellAbility=Intelligence ' +
    'Spells="Misty Step"',
  'Flames Of Phlegethos':
    'Section=ability,magic ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Charisma, Intelligence)",' +
      '"When casting a fire spell, can reroll 1s on its damage and can emit a 30\' bright light, inflicting 1d4 HP fire on adjacent creatures, until the end of the next turn"',
  'Infernal Constitution':
    'Section=ability,save ' +
    'Note=' +
      '"+1 Constitution",' +
      '"Has resistance to cold and poison and advantage on saves vs. poisoned"',
  'Orcish Fury':
    'Section=ability,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Strength, Constitution)",' +
      '"Can add a die to weapon damage once per short rest, and can use a reaction to make an attack immediately after using Relentless Endurance"',
  'Prodigy':
    'Section=skill ' +
    'Note="Skill Proficiency (Choose 1 from any)/Tool Proficiency (Choose 1 from any)/Language (Choose 1 from any)/Expertise (Choose 1 from any)"',
  'Second Chance':
    'Section=ability,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Dexterity, Constitution, Charisma)",' +
      '"Can use a reaction to force a foe attack reroll once per combat or short rest"',
  'Squat Nimbleness':
    'Section=ability,skill,skill ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Strength, Dexterity)/+5 Speed",' +
      '"Skill Proficiency (Choose 1 from Acrobatics, Athletics)",' +
      '"Has advantage on Athletics or Acrobatics to break a grapple"',
  'Wood Elf Magic':
    'Section=magic ' +
    'Note="Knows 1 druid cantrip and can cast <i>Longstrider</i> and <i>Pass Without Trace</i> without expending a spell slot once per long rest" ' +
    'SpellAbility=Wisdom ' +
    'Spells=Longstrider,"Pass Without Trace"'

};
Xanathar.SPELLS = {

  "Abi-Dalzim's Horrid Wilting":
    'CastingTime=Action ' +
    'School=Necromancy ' +
    'Level=S8,W8 ' +
    'Description=' +
      '"R150\' 30\' cube withers plants and inflicts 12d8 HP necrotic on creatures (save Constitution half; plants and water elementals have disadvantage)"',
  'Absorb Elements':
    'CastingTime=Reaction ' +
    'School=Abjuration ' +
    'Level=D1,R1,S1,W1 ' +
    'AtHigherLevels="inflicts +1d6 HP" ' +
    'Description=' +
      '"Cast when suffering acid, cold, fire, lightning, or thunder damage, gives resistance to that type of damage until the start of the next turn and causes the the first melee attack during that turn to inflict +1d6 HP of that type"',
  "Aganazzar's Scorcher":
    'CastingTime=Action ' +
    'School=Evocation ' +
    'Level=S2,W2 ' +
    'AtHigherLevels="inflicts +1d8 HP" ' +
    'Description=' +
      '"5\'x30\' line inflicts 3d8 HP fire (save Dexterity half)"',
  'Beast Bond':
    'CastingTime=Action ' +
    'School=Divination ' +
    'Level=D1,R1 ' +
    'Description=' +
      '"Touched friendly beast with Intelligence up to 3 gains a telepathic link with self and advantage on attacks on foes adjacent to self for concentration up to 10 min"',
  'Bones Of The Earth':
    'CastingTime=Action ' +
    'School=Transmutation ' +
    'Level=D6 ' +
    'AtHigherLevels="creates +2 pillars" ' +
    'Description=' +
      '"R120\' Creates 6 5\' diameter, 30\' high pillars that can pin creatures between the top of a pillar and the ceiling, inflicting 6d6 HP bludgeoning (save Dexterity negates; additional Dexterity or Strength saves each rd free)"',
  'Catapult':
    'CastingTime=Action ' +
    'School=Transmutation ' +
    'Level=S1,W1 ' +
    'AtHigherLevels="hurls +5 lb, inflicting +1d8 HP" ' +
    'Description=' +
      '"R60\' Hurls a 5 lb target object 90\', inflicting 3d8 HP bludgeoning (save Dexterity negates)"',
  'Catnap':
    'CastingTime=Action ' +
    'School=Enchantment ' +
    'Level=B3,S3,W3 ' +
    'AtHigherLevels="affects +1 target" ' +
    'Description=' +
      '"R30\' 3 willing targets sleep for 10 min or until shaken or damaged; sleeping the full time gives the benefits of a short rest and prevents repeating the spell on the target until after their next long rest"',
  'Cause Fear':
    'CastingTime=Action ' +
    'School=Necromancy ' +
    'Level=K1,W1 ' +
    'AtHigherLevels="affects +1 target within 30\' of the first" ' +
    'Description=' +
      '"R60\' Target becomes frightened of self (save Wisdom negates; additional saves each rd end) for concentration up to 1 min"',
  'Ceremony':
    'CastingTime=Hour ' +
    'School=Abjuration ' +
    'Level=C1,P1 ' +
    'Description=' +
      '"Performs a ceremony of Atonement (DC 20 Insight restores alignment to a target), Bless Water (creates a vial of holy water), Coming Of Age (gives a young adult target +1d4 on ability checks for 24 hr), Dedication (gives a target +1d4 on saves for 24 hr), Funeral Rite (prevents a corpse from becoming undead for 7 days), or Marriage (gives a couple +2 Armor Class when within 30\' of each other for 7 days)"',
  'Chaos Bolt':
    'CastingTime=Action ' +
    'School=Evocation ' +
    'Level=S1 ' +
    'AtHigherLevels="inflicts +1d6 HP" ' +
    'Description=' +
      '"R120\' Ranged spell inflicts 2d8+1d6 HP of a random type: acid, cold, fire, force, lightning, poison, psychic, or thunder; matching numbers on the d8s indicates that the spell attacks another target within 30\' of the first"',
  'Charm Monster':
    'CastingTime=Action ' +
    'School=Enchantment ' +
    'Level=B4,D4,K4,S4,W4 ' +
    'AtHigherLevels="affects +1 target within 30\' of the first" ' +
    'Description=' +
      '"R30\' Target becomes charmed by self (save Wisdom negates; active fighting gives advantage) for 1 hr or until harmed"',
  'Control Flames':
    'CastingTime=Action ' +
    'School=Transmutation ' +
    'Level=D0,S0,W0 ' +
    'Description=' +
      '"R60\' Target flame up to a 5\' cube expands 5\', snuffs, doubles or halves its lighted area for 1 hr, or forms shapes for 1 hr"',
  'Control Winds':
    'CastingTime=Action ' +
    'School=Transmutation ' +
    'Level=D5,S5,W5 ' +
    'Description=' +
      '"R300\' Air in a 100\' cube creates gusts (can inflict disadvantage on ranged attacks and half movement), a downdraft (knocks prone flying creatures (save Strength negates) and inflicts disadvantage on ranged attacks), or an updraft (reduces damage from falling by half and gives +10\' jumps) for concentration up to 1 hr"',
  'Create Bonfire':
    'CastingTime=Action ' +
    'School=Conjuration ' +
    'Level=D0,K0,S0,W0 ' +
    'Description=' +
      '"R60\' Creates a 5\' fire that inflicts %{(level+7)//6}d8 HP fire (save Dexterity negates) and ignites flammable objects for concentration up to 1 min"',
  'Create Homunculus':
    'CastingTime=Hour ' +
    'School=Transmutation ' +
    'Level=W6 ' +
    'Description=' +
      '"1 hr process inflicts 2d4 HP piercing on self to create a magical companion"',
  'Crown Of Stars':
    'CastingTime=Action ' +
    'School=Evocation ' +
    'Level=K7,S7,W7 ' +
    'AtHigherLevels="creates +2 flames" ' +
    'Description=' +
      '"Creates 7 flames around self; each can be used within 1 hr to make a ranged touch attack inflicting 4d12 HP radiant, and 1 or 4 remaining flames emit a 30\' dim or bright light"',
  'Danse Macabre':
    'CastingTime=Action ' +
    'School=Necromancy ' +
    'Level=K5,W5 ' +
    'AtHigherLevels="creates +2 undead" ' +
    'Description=' +
      '"R60\' Creates from corpses 5 obedient skeletons and zombies that attack at +%{mdf} for concentration up to 1 hr"',
  'Dawn':
    'CastingTime=Action ' +
    'School=Evocation ' +
    'Level=C5,W5 ' +
    'Description=' +
      '"R60\' Creates a 30\' radius of bright sunlight that inflicts 4d10 HP radiant for concentration up to 1 min; can use a bonus action each turn when within 60\' to move it 60\'"',
  "Dragon's Breath":
    'CastingTime=Bonus ' +
    'School=Transmutation ' +
    'Level=S2,W2 ' +
    'AtHigherLevels="inflicts +1d6 HP" ' +
    'Description=' +
      '"Touched can exhale a 15\' cone of a choice of acid, cold, fire, lightning, or poison, inflicting 3d6 HP (save Dexterity half), for concentration up to 1 min"',
  'Druid Grove':
    'CastingTime="10 Minutes" ' +
    'School=Abjuration ' +
    'Level=D6 ' +
    'Description=' +
      '"Touched 90\' cube responds to intruders with choices of entanglement, fog that inflicts heavy obscurement and reduction of Speed by 2/3, attacks from 4 awakened trees, <i>Gust Of Wind</i>, <i>Spike Growth</i>, and <i>Wind Wall</i> (password negates) for 24 hr; casting every day for a year makes the effects permanent"',
 'Dust Devil':
    'CastingTime=Action ' +
    'School=Conjuration ' +
    'Level=D2,S2,W2 ' +
    'AtHigherLevels="inflicts +1d8 HP" ' +
    'Description=' +
      '"R60\' 5\' cube heavily obscures a 10\' radius when over loose material and inflicts 1d8 HP bludgeoning and a 10\' push (save Strength half HP only) on adjacent creatures; can use bonus actions to move it move 30\' each turn for concentration up to 1 min"',
  'Earth Tremor':
    'CastingTime=Action ' +
    'School=Evocation ' +
    'Level=B1,D1,S1,W1 ' +
    'AtHigherLevels="inflicts +1d6 HP" ' +
    'Description=' +
      '"10\' emanation knocks prone and inflicts 1d6 HP bludgeoning (save Dexterity negates) and inflicts difficult terrain if made from loose earth or stone"',
  'Earthbind':
    'CastingTime=Action ' +
    'School=Transmutation ' +
    'Level=D2,K2,S2,W2 ' +
    'Description=' +
      '"R300\' Reduces the target\'s fly Speed to 0 (save Strength negates), causing a flying target to descend 60\' per rd, for concentration up to 1 min"',
  'Elemental Bane':
    'CastingTime=Action ' +
    'School=Transmutation ' +
    'Level=D4,K4,W4 ' +
    'AtHigherLevels="affects +1 target within 30\' of the first" ' +
    'Description=' +
      '"R90\' Target loses resistance to a choice of acid, cold, fire, lightning, or thunder and suffers +2d6 HP from the first hit of that damage type each turn (save Constitution negates) for concentration up to 1 min"',
  'Enemies Abound':
    'CastingTime=Action ' +
    'School=Enchantment ' +
    'Level=B3,K3,S3,W3 ' +
    'Description=' +
      '"R120\' Target regards all creatures as enemies and attacks randomly (save Intelligence negates; additional saves after taking damage end) for concentration up to 1 min"',
  'Enervation':
    'CastingTime=Action ' +
    'School=Necromancy ' +
    'Level=K5,S5,W5 ' +
    'AtHigherLevels="inflicts +1d8 HP" ' +
    'Description=' +
      '"R60\' Target suffers 4d6 HP necrotic each turn, and self regains half of the amount inflicted, for concentration up to 1 min (save Dexterity inflicts 2d6 HP once and restores half of that amount)"',
  'Erupting Earth':
    'CastingTime=Action ' +
    'School=Transmutation ' +
    'Level=D3,S3,W3 ' +
    'AtHigherLevels="inflicts +1d12 HP" ' +
    'Description=' +
      '"R120\' 20\' cube inflicts 3d12 HP bludgeoning (save Dexterity half) and difficult terrain"',
  'Far Step':
    'CastingTime=Bonus ' +
    'School=Conjuration ' +
    'Level=K5,S5,W5 ' +
    'Description=' +
      '"Teleports self 60\'; can use bonus actions to teleport an additional 60\' each turn for concentration up to 1 min"',
  'Find Greater Steed':
    'CastingTime="10 Minutes" ' +
    'School=Conjuration ' +
    'Level=P4 ' +
    'Description=' +
      '"R30\' Summons a mount with at least 6 Intelligence that can understand 1 language and communicate telepathically with self within 1 mile until dismissed or reduced to 0 hit points; self spells can be extended to include the mount"',
  'Flame Arrows':
    'CastingTime=Action ' +
    'School=Transmutation ' +
    'Level=D3,R3,S3,W3 ' +
    'AtHigherLevels="affects +2 pieces" ' +
    'Description=' +
      '"12 pieces of ammunition in a touched quiver each inflict +1d6 HP fire for concentration up to 1 hr"',
  'Frostbite':
    'CastingTime=Action ' +
    'School=Evocation ' +
    'Level=D0,K0,S0,W0 ' +
    'Description=' +
      '"R60\' Target suffers %{(level+7)//6}d6 HP cold and disadvantage on its next weapon attack before the end of its next turn (save Constitution negates)"',
  'Guardian Of Nature':
    'CastingTime=Bonus ' +
    'School=Transmutation ' +
    'Level=D4,R4 ' +
    'Description=' +
      '"Changes self into a Primal Beast with +10 Speed, 120\' Darkvision, advantage on Strength attacks, and +1d6 HP force from melee weapons, or into a Great Tree with 10 temporary hit points, advantage on Constitution saves, advantage on Dexterity and Wisdom attacks, and a 15\' radius that inflicts difficult terrain on foes, for concentration up to 1 min"',
  'Gust': // ref Eberron5E
    'CastingTime=Action ' +
    'School=Transmutation ' +
    'Level=D0,S0,W0 ' +
    'Description=' +
      '"R30\' Pushes a Medium or smaller target creature 5\' (save Strength negates), pushes an unattended 5 lb object 10\', or creates a light breeze"',
  'Healing Spirit':
    'CastingTime=Bonus ' +
    'School=Conjuration ' +
    'Level=D2,R2 ' +
    'AtHigherLevels="heals +1d6 HP" ' +
    'Description=' +
      '"R60\' Allies in a 5\' cube regain 1d6 HP during each of their turns for concentration up to 1 min, to a maximum of %{wisdomModifier+1>?2} healings; can use a bonus action each turn to move the effect 30\'"',
  'Holy Weapon':
    'CastingTime=Bonus ' +
    'School=Evocation ' +
    'Level=C5,P5 ' +
    'Description=' +
      '"Touched weapon becomes magic, emits a 30\' bright light, and inflicts +2d8 HP radiant for concentration up to 1 hr; dismissal inflicts 4d8 HP radiant and blindness for 1 min on targets in a 30\' radius (save Constitution half HP only; additional saves each rd end)"',
  'Ice Knife':
    'CastingTime=Action ' +
    'School=Conjuration ' +
    'Level=D1,S1,W1 ' +
    'AtHigherLevels="inflicts +1d6 HP cold" ' +
    'Description=' +
      '"R60\' Ranged spell inflicts 1d10 HP piercing on a hit and 2d6 HP cold in a 5\' radius (save Dexterity negates cold)"',
  'Illusory Dragon':
    'CastingTime=Action ' +
    'School=Illusion ' +
    'Level=W8 ' +
    'Description=' +
      '"R120\' Illusionary shadow dragon frightens for 1 min (save Wisdom negates; additional saves when out of sight end) and is immune to damage; can use a bonus action each turn to move it 60\' and inflict 7d6 HP of a choice of acid, cold, fire, lightning, necrotic, or poison (chosen when the spell is cast) in a 60\' cone (save Intelligence half; successful Investigation gives advantage) for concentration up to 1 min"',
  'Immolation':
    'CastingTime=Action ' +
    'School=Evocation ' +
    'Level=S5,W5 ' +
    'Description=' +
      '"R90\' Target emits a 30\' bright light and suffers 8d6 HP fire, then 4d6 HP fire each rd (save Dexterity half initial HP only; additional saves each rd end) for concentration up to 1 min"',
  'Infernal Calling':
    'CastingTime=Minute ' +
    'School=Conjuration ' +
    'Level=K5,W5 ' +
    'AtHigherLevels="summons a +1 CR devil" ' +
    'Description=' +
      '"R90\' Summons a CR 6 or lower devil that obeys commands in alignment with its desires or on a successful Charisma vs. Insight check (knowing its true name gives advantage, and possessing its talisman makes the check unnecessary) for concentration up to 1 hr or until it is reduced to 0 hit points; failure on a check makes the devil immune to additional commands and allows it to remain for 3d6 min after concentration is broken"',
  'Infestation':
    'CastingTime=Action ' +
    'School=Conjuration ' +
    'Level=D0,K0,S0,W0 ' +
    'Description=' +
      '"R30\' Target suffers %{(level+7)//6}d6 HP poison and moves 5\' in a random direction without triggering opportunity attacks (save Constitution negates)"',
  'Investiture Of Flame':
    'CastingTime=Action ' +
    'School=Transmutation ' +
    'Level=D6,K6,S6,W6 ' +
    'Description=' +
      '"Self emits a 30\' bright light, gains immunity to fire and resistance to cold, inflicts 1d10 HP fire in a 5\' radius, and can inflict 4d8 HP fire (save Dexterity half) in a 15\'x5\' line, for concentration up to 10 min"',
  'Investiture Of Ice':
    'CastingTime=Action ' +
    'School=Transmutation ' +
    'Level=D6,K6,S6,W6 ' +
    'Description=' +
      '"Self gains immunity to cold and resistance to fire, moves normally across ice and snow, inflicts difficult terrain in a 10\' radius, and can inflict 4d6 HP cold and half speed until the start of the next turn (save Dexterity half HP only) in a 15\' cone, for concentration up to 10 min"',
  'Investiture Of Stone':
    'CastingTime=Action ' +
    'School=Transmutation ' +
    'Level=D6,K6,S6,W6 ' +
    'Description=' +
      '"Self gains resistance to non-magical bludgeoning, piercing, and slashing, can inflict knocked prone (save Dexterity negates) in a 15\' radius, moves normally across earth and stone difficult terrain, and can pass through earth and stone, for concentration up to 10 min"',
  'Investiture Of Wind':
    'CastingTime=Action ' +
    'School=Transmutation ' +
    'Level=D6,K6,S6,W6 ' +
    'Description=' +
      '"Inflicts disadvantage on ranged attacks vs. self, and self gains a 60\' fly Speed and can make a R60\' attack that inflicts 2d10 HP bludgeoning in a 15\' cube and a 10\' push on Large or smaller creatures, for concentration up to 10 min"',
  'Invulnerability':
    'CastingTime=Action ' +
    'School=Abjuration ' +
    'Level=W9 ' +
    'Description=' +
      '"Gives self immunity to all damage for concentration up to 10 min"',
  'Life Transference':
    'CastingTime=Action ' +
    'School=Necromancy ' +
    'Level=C3,W3 ' +
    'AtHigherLevels="inflicts +1d8 HP" ' +
    'Description=' +
      '"R30\' Inflicts 4d8 HP necrotic on self and restores twice that amount to the target"',
  'Maddening Darkness':
    'CastingTime=Action ' +
    'School=Evocation ' +
    'Level=K8,W8 ' +
    'Description=' +
      '"R150\' 60\' radius magical darkness inflicts 8d8 HP psychic per rd (save Wisdom half) for concentration up to 10 min"',
  'Maelstrom':
    'CastingTime=Action ' +
    'School=Evocation ' +
    'Level=D5 ' +
    'Description=' +
      '"R120\' 30\' radius of swirling water inflicts 6d6 HP bludgeoning and pulls creatures 10\' toward its center (save Strength negates) for concentration up to 1 min"',
  'Magic Stone':
    'CastingTime=Bonus ' +
    'School=Transmutation ' +
    'Level=D0,K0 ' +
    'Description=' +
      '"3 touched stones can each be thrown within 1 min for a +%{mdf} attack that inflicts 1d6+%{mdf} HP bludgeoning"',
  'Mass Polymorph':
    'CastingTime=Action ' +
    'School=Transmutation ' +
    'Level=B9,S9,W9 ' +
    'Description=' +
      '"R120\' 10 targets transform into beasts (save Wisdom negates; shapeshifters automatically succeed) of equal or lesser CR and gain temporary hit points appropriate to the beast for concentration up to 1 hr or until the temporary hit points are lost"',
  "Maximilian's Earthen Grasp":
    'CastingTime=Action ' +
    'School=Transmutation ' +
    'Level=S2,W2 ' +
    'Description=' +
      '"R30\' Earthen hand inflicts 2d6 HP bludgeoning and restrains (save Strength negates); can inflict an additional 2d6 HP bludgeoning on a restrained creature (save Strength half; additional saves each rd escape), or release to attack a different target, each turn for concentration up to 1 min"',
  "Melf's Minute Meteors":
    'CastingTime=Action ' +
    'School=Evocation ' +
    'Level=S3,W3 ' +
    'AtHigherLevels="creates +2 meteors" ' +
    'Description=' +
      '"R120\' 6 meteors each inflict 2d6 HP fire (maximum 2 per rd) within concentration up to 10 min"',
  'Mental Prison':
    'CastingTime=Action ' +
    'School=Illusion ' +
    'Level=K6,S6,W6 ' +
    'Description=' +
      '"R60\' Target suffers 5d6 HP psychic and becomes trapped by an illusionary danger (save Intelligence HP only) for concentration up to 1 min; the target touching the danger inflicts 10d6 HP psychic and ends the spell"',
  'Mighty Fortress':
    'CastingTime=Minute ' +
    'School=Conjuration ' +
    'Level=W8 ' +
    'Description=' +
      '"R1 mile Creates a 120\' sq turreted fortress and keep, staffed by invisible servants, for 7 days or until cast again; casting every 7 days for a year makes it permanent"',
  'Mind Spike':
    'CastingTime=Action ' +
    'School=Divination ' +
    'Level=K2,S2,W2 ' +
    'AtHigherLevels="inflicts +1d8 HP" ' +
    'Description=' +
      '"R60\' Inflicts 3d8 HP psychic and reveals the target\'s location for concentration up to 1 hr (save Wisdom half HP only)"',
  'Mold Earth':
    'CastingTime=Action ' +
    'School=Transmutation ' +
    'Level=D0,S0,W0 ' +
    'Description=' +
      '"R30\' Excavates a 5\' cube of earth, or colors and inscribes or changes the movement difficulty of one for 1 hr"',
  'Negative Energy Flood':
    'CastingTime=Action ' +
    'School=Necromancy ' +
    'Level=K5,W5 ' +
    'Description=' +
      '"R60\' Inflicts 5d12 necrotic (save Constitution half) on a living target that, if slain, rises as a zombie and attacks the nearest creature; an undead target gains half of 5d12 temporary hit points"',
  'Power Word Pain':
    'CastingTime=Action ' +
    'School=Enchantment ' +
    'Level=K7,S7,W7 ' +
    'Description=' +
      '"R60\' Target with up to 100 hit points slows to 10\' Speed, suffers disadvantage on attacks, ability checks, and non-Constitution saves, and requires a successful Constitution save to cast a spell (save Constitution each rd ends)"',
  'Primal Savagery':
    'CastingTime=Action ' +
    'School=Transmutation ' +
    'Level=D0 ' +
    'Description=' +
      '"Melee spell attack inflicts %{(level+7)//6}d10 HP acid"',
  'Primordial Ward':
    'CastingTime=Action ' +
    'School=Abjuration ' +
    'Level=D6 ' +
    'Description=' +
      '"Self gains resistance to acid, cold, fire, lightning, and thunder for concentration up to 1 min; can dismiss as a reaction upon taking damage of one of these types to gain immunity to it until the end of the turn"',
  'Psychic Scream':
    'CastingTime=Action ' +
    'School=Enchantment ' +
    'Level=B9,K9,S9,W9 ' +
    'Description=' +
      '"R90\' 10 targets with Intelligence 3 or higher suffer 14d6 HP psychic and stunned (save Intelligence half HP only; additional saves each rd end)"',
  'Pyrotechnics':
    'CastingTime=Action ' +
    'School=Transmutation ' +
    'Level=B2,S2,W2 ' +
    'Description=' +
      '"R60\' Snuffs a 5\' target fire and causes it to emit fireworks, blinding creatures within 10\' (save Constitution negates) until the end of the next turn, or smoke that heavily obscures a 20\' radius for 1 min"',
  'Scatter':
    'CastingTime=Action ' +
    'School=Conjuration ' +
    'Level=K6,S6,W6 ' +
    'Description=' +
      '"R30\' Teleports 5 targets 120\' (save Wisdom negates), each to a different location"',
  'Shadow Blade':
    'CastingTime=Bonus ' +
    'School=Illusion ' +
    'Level=K2,S2,W2 ' +
    'AtHigherLevels="increases damage to 3d8, 4d8, or 5d8 HP at level 3, 5, or 7" ' +
    'Description=' +
      '"Creates a shadow sword with the finesse, light, and thrown (range 20/60) properties that gives advantage on attacks in dim light and inflicts 2d8 HP psychic for concentration up to 1 min"',
  'Shadow Of Moil':
    'CastingTime=Action ' +
    'School=Necromancy ' +
    'Level=K4 ' +
    'Description=' +
      '"10\' emanation dims light, gives self resistance to radiant, and inflicts 2d8 HP necrotic on a successful attacker for concentration up to 1 min"',
  'Shape Water':
    'CastingTime=Action ' +
    'School=Transmutation ' +
    'Level=D0,S0,W0 ' +
    'Description=' +
      '"R30\' 5\' cube of water forms animated shapes, changes color or opacity, or freezes for 1 hr or changes flow 5\'"',
  'Sickening Radiance':
    'CastingTime=Action ' +
    'School=Evocation ' +
    'Level=K4,S4,W4 ' +
    'Description=' +
      '"R120\' 30\' radius causes creatures to emit a dim glow and suffer 4d10 HP radiant and 1 level of exhaustion (save Constitution negates) for concentration up to 10 min"',
  'Skill Empowerment':
    'CastingTime=Action ' +
    'School=Transmutation ' +
    'Level=B5,S5,W5 ' +
    'Description=' +
      '"Willing touched gains expertise in a chosen proficient skill for concentration up to 1 hr"',
  'Skywrite':
    'CastingTime=Action ' +
    'School=Transmutation ' +
    'Level=B2,D2,W2 ' +
    'Description="Clouds form 10 words for concentration up to 1 hr"',
  'Snare':
    'CastingTime=Action ' +
    'School=Abjuration ' +
    'Level=D1,R1,W1 ' +
    'Description=' +
      '"Touched hidden magical trap (Intelligence detects) restrains the first Small, Medium, or Large creature to cross it within 8 hr (save Dexterity negates; additional saves and Arcana checks end)"',
  "Snilloc's Snowball Swarm":
    'CastingTime=Action ' +
    'School=Evocation ' +
    'Level=S2,W2 ' +
    'AtHigherLevels="inflicts +1d6 HP" ' +
    'Description="R90\' 5\' radius inflicts 3d6 HP cold (save Dexterity half)"',
  'Soul Cage':
    'CastingTime=Reaction ' +
    'School=Necromancy ' +
    'Level=K6,W6 ' +
    'Description=' +
      '"R60\' Allows using a trapped dying soul 6 times within 8 hr to regain 2d8 HP, truthfully answer a question, gain advantage on an attack, ability check, or save, or scry a location familiar to the soul for 10 min"',
  'Steel Wind Strike':
    'CastingTime=Action ' +
    'School=Conjuration ' +
    'Level=R5,W5 ' +
    'Description=' +
      '"R30\' Melee spell attack inflicts 6d10 HP force on each of 5 targets and teleports self to a spot adjacent to one of them"',
  'Storm Sphere':
    'CastingTime=Action ' +
    'School=Evocation ' +
    'Level=S4,W4 ' +
    'AtHigherLevels="inflicts +1d6 HP bludgeoning and lightning" ' +
    'Description=' +
      '"R150\' 20\' radius inflicts 2d6 HP bludgeoning (save Strength negates) and disadvantage on listening Perception within 30\' for concentration up to 1 min; can use a bonus action each turn for a R60\' ranged spell attack, with advantage if the target is within the radius, that inflicts 4d6 HP lightning"',
  'Summon Greater Demon':
    'CastingTime=Action ' +
    'School=Conjuration ' +
    'Level=K4,W4 ' +
    'AtHigherLevels="summons a +1 CR demon" ' +
    'Description=' +
      '"R60\' Summons a demon up to CR 5 that obeys commands (save Charisma ends; speaking the true name inflicts disadvantage) or attacks the nearest attacker for concentration up to 1 hr or until reduced to 0 hit points; the demon lingers for 1d6 rd if concentration ends early"',
  'Summon Lesser Demons':
    'CastingTime=Action ' +
    'School=Conjuration ' +
    'Level=K3,W3 ' +
    'AtHigherLevels="doubles or triples the number of demons at level 6 or 8" ' +
    'Description=' +
      '"R60\' Summons 2 CR 1, 4 CR 1/2, or 8 CR 1/4 demons that each attack the nearest non-demon for concentration up to 1 hr or until reduced to 0 hit points"',
  'Synaptic Static':
    'CastingTime=Action ' +
    'School=Enchantment ' +
    'Level=B5,K5,S5,W5 ' +
    'Description=' +
      '"R120\' Creatures with an Intelligence of 3 or higher in a 20\' radius suffer 8d6 HP psychic and -1d6 attacks, ability checks, and concentration checks for 1 min (save Intelligence half HP only; additional saves each rd end)"',
  'Temple Of The Gods':
    'CastingTime=Hour ' +
    'School=Conjuration ' +
    'Level=C7 ' +
    'Description=' +
      '"R120\' Creates a 120\' sq temple that bars divination, ethereal travel, and choices of celestials, elementals, fey, fiends, and undead (save Charisma inflicts -1d4 attacks, ability checks, and saves) and gives a +%{wisdomModifier} bonus to healing for 24 hr; casting every day for a year makes it permanent"',
  "Tenser's Transformation":
    'CastingTime=Action ' +
    'School=Transmutation ' +
    'Level=W6 ' +
    'Description=' +
      '"Self gains 50 temporary hit points, advantage on simple and martial weapon attacks, +2d12 HP force weapon damage, Armor Proficiency (Light; Heavy; Shield), Weapon Proficiency (Simple Weapons; Martial Weapons), Save Proficiency (Constitution; Strength), and 2 attacks per Attack action, while losing the ability to cast spells, for concentration up to 10 min; inflicts 1 level of exhaustion afterward (save DC 15 Constitution negates)"',
  'Thunderclap':
    'CastingTime=Action ' +
    'School=Evocation ' +
    'Level=B0,D0,K0,S0,W0 ' +
    'Description="5\' emanation inflicts %{(level+7)//6}d6 HP thunder"',
  'Thunder Step':
    'CastingTime=Action ' +
    'School=Conjuration ' +
    'Level=K3,S3,W3 ' +
    'AtHigherLevels="inflicts +1d10 HP" ' +
    'Description="Teleports self and 1 willing adjacent creature 90\' and inflicts 3d10 HP thunder in a 10\' radius around the starting position (save Constitution half)"',
  'Tidal Wave':
    'CastingTime=Action ' +
    'School=Conjuration ' +
    'Level=D3,S3,W3 ' +
    'Description=' +
      '"R120\' 30\'x10\' area inflicts 4d8 HP bludgeoning and knocked prone (save Dexterity half HP only) and extinguishes flames within 30\'"',
  'Tiny Servant':
    'CastingTime=Minute ' +
    'School=Transmutation ' +
    'Level=W3 ' +
    'AtHigherLevels="animates +2 objects" ' +
    'Description="Touched Tiny object sprouts arms and legs, animates (Armor Class 15; 10 hit points; 30\' Speed and climb Speed; +5 slam inflicts 1d4+3 bludgeoning), and obeys commands when within 120\' for 8 hr"',
  'Toll The Dead':
    'CastingTime=Action ' +
    'School=Necromancy ' +
    'Level=C0,K0,W0 ' +
    'Description=' +
      '"R60\' Target suffers %{(level+7)//6}d8 HP necrotic, or %{(level+7)//6}d12 HP necrotic if previously damaged (save Wisdom negates)"',
  'Transmute Rock':
    'CastingTime=Action ' +
    'School=Transmutation ' +
    'Level=D5,W5 ' +
    'Description="R120\' Changes a 40\' cube of rock to mud, inflicting restrained on creatures standing on it (save Strength negates; using an action ends), 1/4 movement, and 4d8 HP bludgeoning (save Dexterity half) if it falls on a creature, or changes a 40\' cube of mud to rock, restraining creatures standing in it (save Dexterity negates; DC 20 Strength ends)"',
  'Vitriolic Sphere':
    'CastingTime=Action ' +
    'School=Evocation ' +
    'Level=S4,W4 ' +
    'AtHigherLevels="inflicts +2d4 HP initial" ' +
    'Description=' +
      '"R150\' 20\' radius inflicts 10d4 HP acid, then 5d4 HP acid at the end of each affected creature\'s next turn (save Dexterity half initial HP only)"',
  'Wall Of Light':
    'CastingTime=Action ' +
    'School=Evocation ' +
    'Level=K5,S5,W5 ' +
    'AtHigherLevels="inflicts +1d8 HP" ' +
    'Description=' +
      '"R120\' 60\'x10\'x5\' wall emits a 120\' bright light and inflicts 4d8 HP radiant and blinded for 1 min (save Constitution half HP only; additional saves each rd end) for concentration up to 10 min; can emit a 60\' ray each rd that inflicts 4d8 HP radiant and shortens the wall by 10\'"',
  'Wall Of Sand':
    'CastingTime=Action ' +
    'School=Evocation ' +
    'Level=W3 ' +
    'Description=' +
      '"R90\' 30\'x10\'x10\' wall inflicts 1/3 Speed and blocks vision for concentration up to 10 min"',
  'Wall Of Water': // ref Volo
    'CastingTime=Action ' +
    'School=Evocation ' +
    'Level=D3,S3,W3 ' +
    'Description=' +
      '"R60\' 30\'x10\'x1\' wall or 20\'x20\'x1\' ring creates difficult terrain, inflicts disadvantage on ranged attacks, reduces fire effects by half, and turns to ice from cold effects for concentration up to 10 min"',
  'Warding Wind':
    'CastingTime=Action ' +
    'School=Evocation ' +
    'Level=B2,D2,S2,W2 ' +
    'Description=' +
      '"10\' emanation deafens, extinguishes unprotected flames, disperses gas and fog, inflicts difficult terrain on others, and inflicts disadvantage on ranged attacks for concentration up to 10 min"',
  'Watery Sphere':
    'CastingTime=Action ' +
    'School=Conjuration ' +
    'Level=D4,S4,W4 ' +
    'Description=' +
      '"R90\' 10\' diameter water sphere traps 1 Large or 4 Medium targets (save Strength negates; additional saves each rd end); can hover 10\' and move 30\' each turn for concentration up to 1 min, after which it bursts, knocking prone any restrained targets and extinguishing flames within 30\'"',
  'Whirlwind':
    'CastingTime=Action ' +
    'School=Evocation ' +
    'Level=D7,S7,W7 ' +
    'Description=' +
      '"R300\' 10\' radius inflicts restrained on Large or smaller creatures and 10d6 HP bludgeoning (save Dexterity half HP only; save Strength negates restrained, and additional Strength or Dexterity saves each rd eject a restrained creature and throw it 3d6x10\'), pulling restrained creatures upward 5\' each turn to a maximum of 30\'; can move 30\' each turn for concentration up to 1 min"',
  'Word Of Radiance':
    'CastingTime=Action ' +
    'School=Evocation ' +
    'Level=C0 ' +
    'Description=' +
      '"R5\' Targets suffer %{(level+7)//6}d6 HP radiant (save Constitution negates)"',
  'Wrath Of Nature':
    'CastingTime=Action ' +
    'School=Evocation ' +
    'Level=D5,R5 ' +
    'Description=' +
      '"R120\' Animates a 60\' cube of nature to attack foes for concentration up to 1 min: trees inflict 4d6 HP slashing in a 10\' radius (save Dexterity negates); undergrowth inflicts difficult terrain, vines restrain 1 target each turn (save Strength negates; Athletics checks each rd end), and a bonus action each turn causes rocks to inflict 3d8 HP bludgeoning and knocked prone on a target (save Strength HP only)"',
  'Zephyr Strike':
    'CastingTime=Bonus ' +
    'School=Transmutation ' +
    'Level=R1 ' +
    'Description=' +
      '"Self movement does not provoke opportunity attacks for concentration up to 1 min; can attack with advantage once during the spell, inflicting +1d8 HP force and gaining +30 Speed until the end of the turn"'

};
Xanathar.SPELLS_LEVELS_ADDED = {
  'Banishing Smite':'"K5 [The Hexblade]"',
  'Blink':'"K3 [The Hexblade]"',
  'Blur':'"K2 [The Hexblade]"',
  'Branding Smite':'"K2 [The Hexblade]"',
  'Druidcraft':'"Fighter0 [Arcane Archer Lore]"',
  'Cone Of Cold':'"K5 [The Hexblade]"',
  'Cure Wounds':'"K1 [The Celestial]"',
  'Daylight':'"K3 [The Celestial]"',
  'Elemental Weapon':'"K3 [The Hexblade]"',
  'Flame Strike':'"K5 [The Celestial]"',
  'Flaming Sphere':'"K2 [The Celestial]"',
  'Greater Restoration':'"K5 [The Celestial]"',
  'Guardian Of Faith':'"K4 [The Celestial]"',
  'Guiding Bolt':'"K1 [The Celestial]"',
  'Lesser Restoration':'"K2 [The Celestial]"',
  'Prestidigitation':'"Fighter0 [Arcane Archer Lore]"',
  'Phantasmal Killer':'"K4 [The Hexblade]"',
  'Revivify':'"K3 [The Celestial]"',
  'Shield':'"K1 [The Hexblade]"',
  'Staggering Smite':'"K4 [The Hexblade]"',
  'Wall Of Fire':'"K4 [The Celestial]"',
  'Wrathful Smite':'"K1 [The Hexblade]"'
};
Xanathar.TOOLS_ADDED = {
  // The book doesn't seem to list cost and weight for these; the values below
  // are taken from the guessed nearest approximation from SRD5E
  // etc, gathered from ???--the book doesn't seem to list them
  'Croak Box':'Category="Musical Instrument" Cost=6 Weight=3', // Drum
  'Fiddle':'Category="Musical Instrument" Cost=30 Weight=1', // viol
  'Harp':'Category="Musical Instrument" Cost=30 Weight=2', // lyre
  'Zither':'Category="Musical Instrument" Cost=30 Weight=2' // lyre
};

/* Defines rules related to basic character identity. */
Xanathar.identityRules = function(
  rules, classFeatures, classSelectables, deitiesDomains
) {
  let allClasses = rules.getChoices('levels');
  for(let c in allClasses) {
    let attrs = allClasses[c];
    if(c in classFeatures) {
      SRD5E.featureListRules
        (rules, QuilvynUtils.getAttrValueArray('Features=' + classFeatures[c], 'Features'), c, 'levels.' + c, false);
      attrs = attrs.replace('Features=', 'Features=' + classFeatures[c] + ',');
    }
    if(c in classSelectables) {
      SRD5E.featureListRules
        (rules, QuilvynUtils.getAttrValueArray('Selectables=' + classSelectables[c], 'Selectables'), c, 'levels.' + c, true);
      attrs =
        attrs.replace('Selectables=', 'Selectables=' + classSelectables[c] + ',');
    }
    allClasses[c] = attrs;
    if(rules.plugin)
      rules.plugin.CLASSES[c] = attrs;
    Xanathar.classRulesExtra(rules, c);
  }
  let allDeities = rules.getChoices('deitys');
  for(let d in deitiesDomains) {
    if(!(d in allDeities))
      continue;
    let attrs =
      allDeities[d].replace('Domain=', 'Domain="' + deitiesDomains[d] + '",');
    delete allDeities[d];
    rules.choiceRules(rules, 'Deity', d, attrs);
  }
};

/* Defines rules related to magic use. */
Xanathar.magicRules = function(rules, spells, spellsLevels) {
  SRD5E.magicRules(rules, {}, spells);
  for(let s in spellsLevels) {
    if(!PHB5E.SPELLS[s]) {
      console.log('Unknown spell "' + s + '"');
      continue;
    }
    rules.choiceRules
      (rules, 'Spell', s, PHB5E.SPELLS[s] + ' Level=' + spellsLevels[s]);
  }
};

/* Defines rules related to character aptitudes. */
Xanathar.talentRules = function(rules, feats, features, tools) {
  SRD5E.talentRules(rules, feats, features, {}, {}, {}, tools);
  for(let f in feats) {
    Xanathar.featRulesExtra(rules, f);
  }
};

/*
 * Defines in #rules# the rules associated with feat #name# that cannot be
 * derived directly from the attributes passed to featRules.
 */
Xanathar.featRulesExtra = function(rules, name) {

  // Note: it seems unnecessary to compute spell DC for Drow High Magic and Fey
  // Teleportation feats, since Dark and High Elves normally already have DCs
  // from the Drow Magic and Cantrip (High Elf) features, respectively.
  if(name == 'Dragon Hide') {
    rules.defineRule('armorClass', 'combatNotes.dragonHide.1', '+', null);
    rules.defineRule('combatNotes.dragonHide.1',
      'combatNotes.dragonHide', '?', null,
      'armor', '=', 'source == "None" ? 3 : null'
    );
    SRD5E.weaponRules(rules, 'Claws', 'Unarmed', [], '1d4 S', null, 0, 0, true);
    rules.defineRule('weapons.Claws', 'combatNotes.dragonHide', '=', '1');
  } else if(name == 'Wood Elf Magic') {
    rules.defineRule
      ('spellsAvailable.D0', 'magicNotes.woodElfMagic', '+=', '1');
    rules.defineRule
      ('casterLevels.D', 'casterLevels.Wood Elf Magic', '^=', null);
    rules.defineRule('casterLevels.Wood Elf Magic',
      'features.Wood Elf Magic', '?', null,
      'level', '=', null
    );
  }

};

/*
 * Defines in #rules# the rules associated with class #name# that cannot be
 * derived directly from the attributes passed to classRules.
 */
Xanathar.classRulesExtra = function(rules, name) {

  let classLevel = 'levels.' + name;

  if(name == 'Barbarian') {
    rules.defineRule('selectableFeatureCount.Barbarian (Storm Aura)',
      'features.Path Of The Storm Herald', '=', '1'
    );
  } else if(name == 'Bard') {
    rules.defineRule
      ('bardHasExtraAttack', 'features.College Of Swords', '=', '1');
    rules.defineRule
      ('combatNotes.extraAttack', 'bardFeatures.Extra Attack', '^=', '2');
    rules.defineRule('selectableFeatureCount.Bard (Fighting Style)',
      'features.College Of Swords', '=', '1'
    );
  } else if(name == 'Cleric') {
    rules.defineRule('armorClass', 'combatNotes.soulOfTheForge.1', '+', null);
    rules.defineRule
      ('clericHasDivineStrike', 'features.Forge Domain', '=', '1');
    rules.defineRule
      ('divineStrikeDamageType', 'features.Forge Domain', '=', '"fire"');
    rules.defineRule('clericHasPotentSpellcasting',
      'features.Grave Domain', '=', '1'
    );
    // Show Soul Of The Forge note even when not in heavy armor
    rules.defineRule('combatNotes.soulOfTheForge.1',
      'combatNotes.soulOfTheForge', '?', null,
      'armorWeight', '=', 'source == 3 ? 1 : null'
    );
    // SRD5E.classRulesExtra removes the domain requirement for None clerics
    SRD5E.classRulesExtra(rules, 'Cleric');
  } else if(name == 'Fighter') {
    rules.defineRule('selectableFeatureCount.Fighter (Arcane Shot)',
      'featureNotes.arcaneShot', '=', null
    );
    rules.defineRule('featureNotes.arcaneShot',
      classLevel, '=', 'source<7 ? 2 : source<10 ? 3 : source<15 ? 4 : source<18? 5 : 6'
    );
    rules.defineRule
      ('saveProficiency.Wisdom', 'saveNotes.elegantCourtier', '=', '1');
    rules.defineRule('skillNotes.elegantCourtier', 'wisdomModifier', '=', null);
  } else if(name == 'Monk') {
    rules.defineRule('combatNotes.kenseiWeapons',
      classLevel, '=', 'source>=17 ? 5 : source>=11 ? 4 : source>=6 ? 3 : 2'
    );
    rules.defineRule
      ('weaponChoiceCount', 'combatNotes.kenseiWeapons', '+=', null);
  } else if(name == 'Ranger') {
    rules.defineRule('combatNotes.dreadAmbusher', 'wisdomModifier', '=', null);
    rules.defineRule('saveProficiency.Wisdom', 'saveNotes.ironMind', '=', '1');
  } else if(name == 'Rogue') {
    rules.defineRule('skillNotes.survivalist.1',
      'features.Survivalist', '?', null,
      'proficiencyBonus', '=', null
    );
    rules.defineRule('skills.Nature', 'skillNotes.survivalist.1', '+=', null);
    rules.defineRule('skills.Survival', 'skillNotes.survivalist.1', '+=', null);
    rules.defineRule
      ('skillProficiency.Nature', 'skillNotes.survivalist', '=', '1');
    rules.defineRule
      ('skillProficiency.Survival', 'skillNotes.survivalist', '=', '1');
  } else if(name == 'Sorcerer') {
    rules.defineRule('magicNotes.eyesOfTheDark', classLevel, '?', 'source>=3');
  } else if(name == 'Warlock') {
    rules.defineRule
      ('magicNotes.cloakOfFlies', 'charismaModifier', '?', 'source > 0');
  } else if(name == 'Wizard') {
    // Avoid having the War Magic arcane tradition triggering the combat note
    // for the PHB5E fighter feature of the same name
    rules.defineRule
      ('combatNotes.warMagic', 'fighterFeatures.War Magic', '?', null);
    rules.defineRule
      ('combatNotes.tacticalWit', 'intelligenceModifier', '=', null);
  }

};

/* Returns HTML body content for user notes associated with this rule set. */
Xanathar.ruleNotes = function() {
  return '' +
    '<h2>Xanathar Quilvyn Plugin Notes</h2>\n' +
    'Xanathar Quilvyn Plugin Version ' + Xanathar.VERSION + '\n' +
    '<p>\n' +
    'There are no known bugs, limitations, or usage notes specific to the Xanathar Rule Set.\n' +
    '</p>\n' +
    '<h3>Copyrights and Licensing</h3>\n' +
    '<p>\n' +
    'Quilvyn\'s Xanathar\'s Guide supplement is unofficial Fan Content ' +
    'permitted under Wizards of the Coast\'s ' +
    '<a href="https://company.wizards.com/en/legal/fancontentpolicy">Fan Content Policy</a>.\n' +
    '</p><p>\n' +
    'Quilvyn is not approved or endorsed by Wizards of the Coast. Portions ' +
    'of the materials used are property of Wizards of the Coast. ©Wizards of ' +
    'the Coast LLC.\n' +
    '</p><p>\n' +
    'Xanathar\'s Guide to Everything © 2017 Wizards of the Coast LLC.\n' +
    '</p><p>\n' +
    'Dungeons & Dragons Player\'s Handbook © 2014 Wizards of the Coast LLC.\n' +
    '</p>\n';
};
