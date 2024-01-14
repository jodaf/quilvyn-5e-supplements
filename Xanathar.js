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

Xanathar.VERSION = '2.4.1.0';

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
    '"features.Forge Domain ? 2:Artisan\'s Blessing",' +
    '"features.Forge Domain ? 6:Soul Of The Forge",' +
    '"clericHasDivineStrike ? 8:Divine Strike",' +
    '"features.Forge Domain ? 17:Saint Of Forge And Fire",' +
    '"features.Grave Domain ? 1:Circle Of Mortality",' +
    '"features.Grave Domain ? 1:Eyes Of The Grave",' +
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
    '"features.Arcane Archer ? 18:Improved Shots",' +
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
    '"features.Oath Of Conquest ? 7:Aura Of Conquest",' +
    '"features.Oath Of Conquest ? 15:Scornful Rebuke",' +
    '"features.Oath Of Conquest ? 20:Invincible Conqueror",' +
    '"features.Oath Of Redemption ? 3:Emissary Of Peace",' +
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
    '"features.War Magic Arcane Tradition ? 2:Arcane Deflection",' +
    '"features.War Magic Arcane Tradition ? 2:Tactical Wit",' +
    '"features.War Magic Arcane Tradition ? 6:Power Surge",' +
    '"features.War Magic Arcane Tradition ? 10:Durable Magic",' +
    '"features.War Magic Arcane Tradition ? 14:Deflecting Shroud"'
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
    '"2:War Magic Arcane Tradition:Arcane Tradition"'
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
  'Bountiful Luck':'Type=General Require="race =~ \'Halfling\'"',
  'Dragon Fear':'Type=General Require="race =~ \'Dragonborn\'"',
  'Dragon Hide':'Type=General Require="race =~ \'Dragonborn\'"',
  'Drow High Magic':'Type=General Require="race == \'Dark Elf\'"',
  'Dwarven Fortitude':'Type=General Require="race =~ \'Dwarf\'"',
  'Elven Accuracy':'Type=General Require="race =~ \'Elf\'"',
  'Fade Away':'Type=General Require="race =~ \'Gnome\'"',
  'Fey Teleportation':'Type=General Require="race == \'High Elf\'"',
  'Flames Of Phlegethos':'Type=General Require="race =~ \'Tiefling\'"',
  'Infernal Constitution':'Type=General Require="race =~ \'Tiefling\'"',
  'Orcish Fury':'Type=General Require="race == \'Half-Orc\'"',
  'Prodigy':'Type=General Require="race =~ \'Half-Elf|Half-Orc|Human\'"',
  'Second Chance':'Type=General Require="race =~ \'Halfling\'"',
  'Squat Nimbleness':'Type=General Require="race =~ \'Dwarf\'||features.Small"',
  'Wood Elf Magic':'Type=General Require="race == \'Wood Elf\'"'
};
Xanathar.FEATURES = {
  // Path
  'Accursed Specter':
    'Section=combat ' +
    'Note="May raise a slain humanoid as an obedient specter w/%{levels.Warlock//2} temporary HP and +%{charismaModifier>?0} attack until a long rest 1/long rest"',
  'Agile Parry':
    'Section=combat ' +
    'Note="+2 AC for 1 rd after an unarmed attack if armed w/a Kensei melee weapon"',
  'Ambush Master':
    'Section=combat ' +
    'Note="Adv on Initiative/Allies gain Adv on attacks for 1 rd on first foe struck in first rd"',
  'Ancestral Protectors':
    'Section=combat ' +
    'Note="First foe struck each rd during rage suffers Disadv on attacks on others, and target also has resistance to damage, for 1 rd"',
  'Arcane Archer Lore':
    'Section=magic,skill ' +
    'Note=' +
      '"Knows choice of <i>Druidcraft</i> or <i>Prestidigitation</i> cantrip",' +
      '"Skill Proficiency (Choose 1 from Arcana, Nature)"',
  'Arcane Deflection':
    'Section=combat ' +
    'Note="After a hit or failed save, may use Reaction and forego 1 rd of non-cantrip casting to gain +2 AC or +4 save"',
  'Arcane Shot':
    'Section=combat,feature ' +
    'Note=' +
      '"May use an Arcane Shot effect 1/rd 2/short rest",' +
      '"%V selections"',
  'Armor Of Hexes':
    'Section=combat ' +
    'Note="Hexblade\'s Curse target has 50% chance to miss self"',
  "Artisan's Blessing":
    'Section=magic ' +
    'Note="May use Channel Divinity to craft in 1 hr a metal item worth up to 100 GP"',
  'Aspect Of The Moon':
    'Section=save ' +
    'Note="Immune to sleep/Light activity gives benefits of sleep"',
  'Aura Of Conquest':
    'Section=magic ' +
    'Note="R%{levels.Paladin<18?10:30}\' Frightened foes suffer immobility and %{levels.Paladin//2} HP psychic"',
  'Aura Of The Guardian':
    'Section=magic ' +
    'Note="R%{levels.Paladin<18?10:30}\' May use Reaction to transfer damage from another to self"',
  'Balm Of The Summer Court':
    'Section=magic ' +
    'Note="R120\' May use a bonus action to restore up to %{levels.Druid//2}d6 HP and give target 1 temporary HP per HD 1/rd until %{levels.Druid}d6 HP restored/long rest"',
  'Banishing Arrow':
    'Section=combat ' +
    'Note="Arrow inflicts +%{levels.Fighter<18?0:2}d6 HP force and sends target to Feywild (DC %{8+proficiencyBonus+intelligenceModifier} Charisma HP only) for 1 rd"',
  'Beguiling Arrow':
    'Section=combat ' +
    'Note="Arrow inflicts +%{level<18?2:4}d6 HP psychic, and target becomes charmed by an ally w/in 30\' (DC %{8+proficiencyBonus+intelligenceModifier} Wisdom HP only; attacking target ends)"',
  'Blade Flourish':
    'Section=combat Note="May gain +10\' Speed and use a flourish during an attack 1/rd"',
  'Blessing Of The Forge':
    'Section=magic ' +
    'Note="Touched weapon or armor gains a +1 bonus until next long rest 1/long rest"',
  'Bonus Cantrips (The Celestial)':
    'Section=magic ' +
    'Note="Knows <i>Light</i> and <i>Sacred Flame</i> cantrips" ' +
    'Spells=Light,"Sacred Flame"',
  'Bonus Proficiencies (College Of Swords)':
    'Section=feature,magic ' +
    'Note=' +
      '"Armor Proficiency (Medium)/Weapon Proficiency (Scimitar)",' +
      '"May use a proficient melee weapon as a bard spell focus"',
  'Bonus Proficiencies (Way Of The Drunken Master)':
    'Section=skill ' +
    'Note="Skill Proficiency (Performance)/Tool Proficiency (Brewer\'s Supplies)"',
  'Bonus Proficiency (Cavalier)':
    'Section=skill ' +
    // TODO choice of skill proficiency or language
    'Note="Skill Proficiency (Choose 1 from Animal Handling, History, Insight, Performance, Persuasion)"',
  'Born To The Saddle':
    'Section=skill ' +
    'Note="Adv on saves vs. falling off mount/Lands on feet after a 10\' fall from mount/Dismount and mount each cost 5\' movement"',
  'Bursting Arrow':
    'Section=combat Note="Successful arrow attack inflicts +%{levels.Fighter<18?2:4}d6 HP force damage in a 10\' radius"',
  'Celestial Radiance':
    'Section=save Note="Resistance to necrotic and radiant damage"',
  'Celestial Resilience':
    'Section=magic ' +
    'Note="Gains %{levels.Warlock+charismaModifier} temporary HP, and may give 5 others %{levels.Warlock//2+charismaModifier} temporary HP, at the end of a rest"',
  'Circle Of Mortality':
    'Section=magic ' +
    'Note="Cure spells have maximum effect for HP 0 targets/May cast R30\' <i>Spare The Dying</i> as a bonus action" ' +
    'Spells="Spare The Dying"',
  'Cloak Of Flies':
    'Section=magic,skill ' +
    'Note=' +
      '"May use a bonus action to create a 5\' radius that inflicts %{charismaModifier>?0} HP poison damage 1/short rest",' +
      '"May use a bonus action to gain Adv on Intimidate and suffer Disadv on other Charisma checks 1/short rest"',
  'Conquering Presence':
    'Section=magic ' +
    'Note="R30\' May use Channel Divinity to frighten target for 1 min (DC %{spellDifficultyClass.P} Wisdom ends)"',
  'Consult The Spirits':
    'Section=magic ' +
    'Note="May cast <i>Augury</i> or <i>Clairvoyance</i> via spirits 1/short rest" ' +
    'SpellAbility=Wisdom ' +
    'Spells=Augury,Clairvoyance',
  'Curving Shot':
    'Section=combat ' +
    'Note="May use a bonus action to redirect a magic arrow miss to another target w/in 60\'"',
  'Defensive Flourish':
    'Section=combat ' +
    'Note="May spend 1 Bardic Inspiration to inflict +1d%{bardicInspirationDie} damage and gain +1d%{bardicInspirationDie} AC for 1 rd"',
  'Deflecting Shroud':
    'Section=magic ' +
    'Note="R60\' Arcane Deflection strikes 3 targets, inflicting %{levels.Wizard//2} HP force each"',
  'Deft Strike':
    'Section=combat ' +
    'Note="May spend 1 Ki Point to inflict +%{monkMeleeDieBonus} damage with a Kensei weapon 1/rd"',
  'Detect Portal':
    'Section=magic Note="R1 mile May sense planar portals 1/short rest"',
  'Distant Strike':
    'Section=combat ' +
    'Note="May teleport 10\' before attack and attack 3 different creatures"',
  'Divine Fury':
    'Section=combat ' +
    'Note="First hit each rd during rage inflicts +1d6+%{levels.Barbarian//2} HP choice of necrotic or radiant"',
  'Divine Magic':'Section=magic Note="Has access to Cleric spells"',
  'Dread Ambusher':
    'Section=combat,combat ' +
    'Note=' +
      '"+%V Initiative",' +
      '"Gains +10\' Speed and an additional weapon attack inflicting +1d8 HP weapon damage during first rd of combat"',
  "Drunkard's Luck":
    'Section=feature ' +
    'Note="May spend 2 Ki Points to cancel Disadv on an ability, attack, or save roll"',
  'Drunken Technique':
    'Section=combat ' +
    'Note="Gains +10\' Speed and movement provokes no OA during Flurry Of Blows"',
  'Durable Magic':
    'Section=combat,save ' +
    'Note=' +
      '"+2 AC during spell concentration",' +
      '"+2 saves during spell concentration"',
  'Ear For Deceit':'Section=skill Note="Minimum 8 on Insight rolls"',
  'Eldritch Smite':
    'Section=combat ' +
    'Note="May spend a spell slot to inflict +(slot level + 1)d8 HP force and knock prone w/pact weapon"',
  'Elegant Courtier':
    'Section=save,skill ' +
    // TODO Choice of Intelligence, Charisma if already has Wisdom
    'Note=' +
      '"Save Proficiency (Wisdom)",' +
      '"+%V Persuasion"',
  'Elegant Maneuver':
    'Section=skill ' +
    'Note="May use a bonus action to gain Adv on next Acrobatics or Athletics for 1 rd"',
  'Emissary Of Peace':
    'Section=skill ' +
    'Note="May use Channel Energy and a bonus action to gain +5 Persuasion for 10 min"',
  'Emissary Of Redemption':
    'Section=combat ' +
    'Note="Has resistance to all attack damage, and a successful attacker takes radiant damage equal to half inflicted (attacking neg for target until a long rest)"',
  'Empowered Healing':
    'Section=magic ' +
    'Note="R5\' May spend 1 Sorcery Point to reroll self or ally healing 1/rd"',
  'Enfeebling Arrow':
    'Section=combat ' +
    'Note="Arrow inflicts +%{levels.Fighter<18?2:4}d6 HP necrotic damage and half damage on attacks by target (DC %{8+proficiencyBonus+intelligenceModifier} Constitution HP only) for 1 rd"',
  'Enthralling Performance':
    'Section=magic ' +
    'Note="R60\' May use 1 min performance to charm %{charismaModifier>?1} listeners (DC %{spellDifficultyClass.B} Will neg) for 1 hr (damage ends) 1/short rest"',
  'Ethereal Step':
    'Section=magic ' +
    'Note="May use a bonus action to cast <i>Etherealness</i>, lasting until end of turn, 1/short rest" ' +
    'Spells=Etherealness',
  'Ever-Ready Shot':
    'Section=combat ' +
    'Note="Has a minimum of 1 Arcane Shot use available after initiative"',
  'Eye For Detail':
    'Section=skill ' +
    'Note="May use a bonus action to use Perception to a spot hidden item or Investigation to uncover a clue"',
  'Eye For Weakness':
    'Section=combat ' +
    'Note="Insightful Fighting inflicts +3d6 HP Sneak Attack damage"',
  'Eyes Of The Dark':
    'Section=feature,magic ' +
    'Note=' +
      '"R120\' See normally in darkness",' +
      '"May cast <i>Darkness</i> using a spell slot or 2 Sorcery Points" ' +
    'Spells=Darkness',
  'Eyes Of The Grave':
    'Section=magic ' +
    'Note="R60\' May detect undead for 1 rd %{wisdomModifier>?1}/long rest"',
  'Faithful Summons':
    'Section=magic ' +
    'Note="Incapacitation summons 4 creatures to protect self for 1 hr 1/long rest"',
  'Fanatical Focus':'Section=save Note="May reroll a failed save 1/rage"',
  'Fancy Footwork':
    'Section=combat ' +
    'Note="Attacked foe cannot make an OA against self for 1 rd"',
  'Favored By The Gods':
    'Section=feature ' +
    'Note="May add 2d4 to a failed attack or save 1/short rest"',
  'Ferocious Charger':
    'Section=combat ' +
    'Note="May knock prone w/a hit after a 10\' move 1/rd (DC %{8+proficiencyBonus+strengthModifier} Strength neg)"',
  'Fighting Spirit':
    'Section=combat ' +
    'Note="May use a bonus action to gain Adv on attacks and %{levels.Fighter<10?5:levels.Fighter<15?10:15} temporary HP for 1 rd 3/long rest"',
  'Bonus Proficiencies (Forge Domain)':
    'Section=feature ' +
    'Note="Armor Proficiency (Heavy)/Tool Proficiency (Smith\'s Tools)"',
  'Bonus Proficiency (Samurai)':
    'Section=skill ' +
    // TODO choice of skill proficiency or language
    'Note="Skill Proficiency (Choose 1 from History, Insight, Performance, Persuasion)"',
  'Forge Domain':
    'Spells=' +
      '1:Identify,"1:Searing Smite",' +
      '"3:Heat Metal","3:Magic Weapon",' +
      '"5:Elemental Weapon","5:Protection From Energy",' +
      '7:Fabricate,"7:Wall Of Fire",' +
      '"9:Animate Objects",9:Creation',
  'Ghostly Gaze':
    'Section=magic ' +
    'Note="May see 30\' w/Darkvision through solid objects for conc up to 1 min 1/short rest"',
  'Gift Of The Depths':
    'Section=ability,feature,magic ' +
    'Note=' +
      '"%{speed}\' swim Speed",' +
      '"May breathe water",' +
      '"May cast <i>Water Breathing</i> 1/long rest" ' +
    'Spells="Water Breathing"',
  'Gift Of The Ever-Living Ones':
    'Section=combat ' +
    'Note="Regains maximum HP from healing w/in 100\' of familiar"',
  'Gloom Stalker Magic':
    'Spells=' +
      '"3:Disguise Self",' +
      '"5:Rope Trick",' +
      '9:Fear,' +
      '"13:Greater Invisibility",' +
      '17:Seeming',
  'Grasp Of Hadar':
    'Section=magic Note="May pull target 10\' w/<i>Eldritch Blast</i>"',
  'Grasping Arrow':
    'Section=combat ' +
    'Note="Arrow inflicts +%{levels.Fighter<18?2:4}d6 HP poison damage, -10\' Speed, and %{levels.Fighter<18?2:4}d6 HP slashing/rd upon target move for 1 min (DC %{8+proficiencyBonus+intelligenceModifier} Athletics ends)"',
  'Grave Domain':
    'Spells=' +
      '1:Bane,"1:False Life",' +
      '"3:Gentle Repose","3:Ray Of Enfeeblement",' +
      '5:Revivify,"5:Vampiric Touch",' +
      '7:Blight,"7:Death Ward",' +
      '"9:Antilife Shell","9:Raise Dead"',
  'Guardian Spirit':
    'Section=magic ' +
    'Note="Summoned creatures in Spirit Totem radius regain %{levels.Druid//2} HP each rd"',
  'Heart Of The Storm':
    'Section=magic,save ' +
    'Note=' +
      '"10\' radius inflicts %{levels.Sorcerer//2} HP lightning or thunder on targets when casting a lightning or thunder spell",' +
      '"Resistance to lightning and thunder damage"',
  'Hearth Of Moonlight And Shadow':
    'Section=magic ' +
    'Note="May create a 30\' sphere that gives total cover and +5 Stealth and Perception during a rest"',
  'Healing Light':
    'Section=magic ' +
    'Note="R60\' May use a bonus action to restore %{levels.Warlock+1}d6 HP/long rest (maximum %{charismaModifier>?1}d6 per healing)"',
  'Hex Warrior':
    'Section=combat,feature ' +
    'Note=' +
      '"+%{charismaModifier-strengthModifier} attack and damage (Charisma instead of Strength) w/pact weapon or touched non-two-handed weapon until a long rest 1/long rest",' +
      '"Armor Proficiency (Medium/Shield)/Weapon Proficiency (Martial)"',
  "Hexblade's Curse":
    'Section=magic ' +
    'Note="R30\' May use a bonus action to curse target; self gains +%{proficiencyBonus} damage on target, crits on 19 vs. target, and regains %{levels.Warlock+charismaModifier} HP if target dies, for 1 min 1/short rest"',
  'Hidden Paths':
    'Section=magic ' +
    'Note="May use a bonus action to teleport self 60\' or a willing touched target 30\' %{wisdomModifier>?1}/long rest"',
  'Hold The Line':
    'Section=combat ' +
    'Note="Foe move w/in reach provokes an OA; hit halts move"',
  'Horizon Walker Magic':
    'Spells=' +
      '"3:Protection From Evil And Good",' +
      '"5:Misty Step",' +
      '9:Haste,' +
      '13:Banishment,' +
      '"17:Teleportation Circle"',
  'Hound Of Ill Omen':
    'Section=combat ' +
    'Note="R120\' May use a bonus action and spend 3 Sorcery Points to summon a hound to attack target as a dire wolf w/%{levels.Sorcerer//2} temporary HP, moving through obstacles, for 5 min or until reduced to 0 HP; adjacent hound inflicts Disadv on self spell saves on target"',
  "Hunter's Sense":
    'Section=combat ' +
    'Note="R60\' May sense immunities, resistances, and vulnerabilities of target %{wisdomModifier}/long rest"',
  'Improved Pact Weapon':
    'Section=combat ' +
    'Note="May use a bow or crossbow as a pact weapon/Pact weapon gains +1 attack and damage and can be used as a spell focus"',
  'Insightful Fighting':
    'Section=combat ' +
    'Note="May use a bonus action and a successful Insight vs. foe Deception to make Sneak Attacks w/out Adv against target for 1 min"',
  'Insightful Manipulator':
    'Section=feature ' +
    'Note="May learn 2 of relative Charisma, Intelligence, Wisdom, and levels of target after 1 min study"',
  'Intoxicated Frenzy':
    'Section=combat ' +
    'Note="May make 3 additional Flurry Of Blows attacks on 3 different foes"',
  'Invincible Conqueror':
    'Section=combat ' +
    'Note="May gain resistance to all damage, make an extra attack, and crit on 19 for 1 min 1/long rest"',
  // TODO Choice of Intelligence, Charisma if already has Wisdom
  'Iron Mind':'Section=save Note="Save Proficiency (Wisdom)"',
  'Keeper Of Souls':
    'Section=magic ' +
    'Note="R60\' May cause a foe\'s death to restore foe\'s HD HP to another creature 1/rd"',
  'Kensei Weapons':
    'Section=combat ' +
    'Note="Proficiency in choice of %V non-heavy melee or ranged weapons"',
  "Kensei's Shot":
    'Section=combat ' +
    'Note="May use a bonus action to inflict +1d4 HP damage with a ranged Kensei weapon"',
  'Lance Of Lethargy':
    'Section=magic ' +
    'Note="May inflict -10\' Speed w/<i>Eldritch Blast</i> for 1 rd"',
  'Leap To Your Feet':
    'Section=ability Note="Standing from prone costs 5\' movement"',
  'Maddening Hex':
    'Section=magic ' +
    'Note="R30\' May use a bonus action to inflict %{charismaModifier>?1} HP psychic damage to targets in a 5\' radius around curse target"',
  'Magic Arrow':'Section=combat Note="Arrows count as magic weapons"',
  'Magic Kensei Weapons':
    'Section=combat Note="Attacks with Kensei weapons count as magical"',
  "Magic-User's Nemesis":
    'Section=combat ' +
    'Note="R60\' May use Reaction to foil target cast or teleportation (DC %{spellDifficultyClass.R} Wisdom neg) 1/short rest"',
  'Mantle Of Inspiration':
    'Section=magic ' +
    'Note="R60\' May spend a Bardic Inspiration use and use a bonus action to give %{charismaModifier>?1} targets %{levels.Bard//5*3+6<?14} temporary HP and an immediate move w/out OA"',
  'Mantle Of Majesty':
    'Section=magic ' +
    'Note="May use a bonus action to cast <i>Command</i> 1/rd for conc up to 1 min 1/long rest" ' +
    'Spells=Command',
  'Mantle Of Whispers':
    'Section=magic ' +
    'Note="R30\' May capture a dying person\'s shadow to use as a disguise (Insight vs. +5 Deception to see through) for 1 hr 1/short rest"',
  'Master Duelist':
    'Section=combat Note="May reroll a miss with Adv 1/short rest"',
  'Master Of Hexes':
    'Section=magic ' +
    'Note="R30\' May forego regaining HP to redirect Hexblade\'s Curse when target dies"',
  'Master Of Intrigue':
    'Section=feature,skill ' +
    'Note=' +
      '"May mimic accent and speech patterns after listening for 1 min",' +
      '"Language (Choose 2 from any)/Tool Proficiency (Disguise Kit/Forgery Kit/Choose 1 from any Game)"',
  'Master Of Tactics':
    'Section=combat Note="R30\' May use Help as a bonus action"',
  "Master's Flourish":
    'Section=combat ' +
    'Note="May use 1d6 instead of Bardic Inspiration die for flourish"',
  'Mighty Summoner':
    'Section=magic ' +
    'Note="Summoned creatures gain +2 HP per HD and magical natural weapons"',
  'Misdirection':
    'Section=combat ' +
    'Note="May use Reaction to redirect an attack from self to a creature that provides cover"',
  'Mobile Flourish':
    'Section=combat ' +
    'Note="May spend 1 Bardic Inspiration to inflict +1d%{bardicInspirationDie} damage and 5\' + 1d%{bardicInspirationDie}\' push"',
  'Monster Slayer Magic':
    'Spells=' +
      '"3:Protection From Evil And Good",' +
      '"5:Zone Of Truth",' +
      '"9:Magic Circle",' +
      '13:Banishment,' +
      '"17:Hold Monster"',
  'Oath Of Conquest':
    'Spells=' +
      '"3:Armor Of Agathys",3:Command,' +
      '"5:Hold Person","5:Spiritual Weapon",' +
      '"9:Bestow Curse",9:Fear,' +
      '"13:Dominate Beast",13:Stoneskin,' +
      '17:Cloudkill,"17:Dominate Person"',
  'Oath Of Redemption':
    'Spells=' +
      '3:Sanctuary,3:Sleep,' +
      '"5:Calm Emotions","5:Hold Person",' +
      '9:Counterspell,"9:Hypnotic Pattern",' +
      '"13:Otiluke\'s Resilient Sphere",13:Stoneskin,' +
      '"17:Hold Monster","17:Wall Of Force"',
  'One With The Blade':
    'Section=feature Note="Has Magic Kensei Weapons and Deft Strike features"',
  'Otherworldly Wings':
    'Section=ability Note="May use a bonus action to gain 30\' fly Speed"',
  'Panache':
    'Section=skill ' +
    'Note="Successful Persuasion vs. Insight gives hostile target Disadv on attacks on others (others attack ends) or charms a non-hostile target (damage ends) for 1 min"',
  'Path To The Grave':
    'Section=magic ' +
    'Note="R30\' May use Channel Divinity to inflict on target vulnerability to all damage for 1 rd"',
  'Path Of The Kensei':
    'Section=feature ' +
    'Note="Has Kensei Weapons, Agile Parry, Kensei\'s Shot, and Way Of The Brush features"',
  'Piercing Arrow':
    'Section=combat ' +
    'Note="Arrow passes through objects harmlessly and inflicts +%{levels.Fighter<18?1:2}d6 HP piercing damage to creatures in a 30\'x1\' line (DC %{8+proficiencyBonus+intelligenceModifier} Dexterity half)"',
  'Planar Warrior':
    'Section=combat ' +
    'Note="R30\' May use a bonus action to convert weapon damage to force damage and inflict +%{levels.Ranger<11?1:2}d8 HP 1/rd"',
  'Power Surge':
    'Section=magic ' +
    'Note="May store magic from %{intelligenceModifier>?1} countered spells and use it for +%{levels.Wizard//2} HP force spell damage 1/rd"',
  'Protective Spirit':
    'Section=combat ' +
    'Note="Regains 1d6+%{levels.Paladin//2} HP at end of turn if below %{hitPoints//2} HP"',
  'Psychic Blades (College Of Whispers)':
    'Section=combat ' +
    'Note="May spend 1 Bardic Inspiration to inflict +%{levels.Bard<5?2:levels.Bard<10?3:levels.Bard<15?5:8}d6 HP psychic damage 1/rd"',
  'Radiant Soul':
    'Section=magic,save ' +
    'Note=' +
      '"May inflict +%{charismaModifier} HP radiant and fire spell damage on one target",' +
      '"Resistance to radiant damage"',
  'Radiant Sun Bolt':
    'Section=combat ' +
    'Note="R30\' +%{proficiencyBonus+dexterityModifier} ranged touch attack inflicts 1d%{combatNotes.martialArts}+%{dexterityModifier} HP radiant 1/rd (may spend 1 Ki Point and use a bonus action for a second attack)"',
  'Rage Beyond Death':
    'Section=combat Note="Remains conscious and alive at 0 HP until rage ends"',
  'Raging Storm (Desert)':
    'Section=combat ' +
    'Note="R10\' May use Reaction to inflict %{levels.Barbarian//2} HP fire on a successful attacker (DC %{8+proficiencyBonus+constitutionModifier} Dexterity neg)"',
  'Raging Storm (Sea)':
    'Section=combat ' +
    'Note="R10\' May use Reaction to inflict knocked prone on a successful attacker (DC %{8+proficiencyBonus+constitutionModifier} Strength neg)"',
  'Raging Storm (Tundra)':
    'Section=magic ' +
    'Note="R10\; May immobilize target (DC %{8+proficiencyBonus+constitutionModifier} Strength neg) for 1 rd 1/rd"',
  'Rakish Audacity':
    'Section=combat,combat ' +
    'Note=' +
      '"+%1 Initiative",' +
      '"May use Sneak Attack w/out Adv when target is only adjacent foe (Disadv neg)"',
  'Rapid Strike':
    'Section=combat ' +
    'Note="May forego Adv on an attack to gain an extra attack 1/rd"',
  'Rebuke The Violent':
    'Section=magic ' +
    'Note="R30\' May use Channel Divinity to inflict equal damage on a successful attacker of another (DC %{spellDifficultyClass.P} Wisdom half)"',
  'Redirect Attack':
    'Section=combat ' +
    'Note="May use Reaction and spend 1 Ki Point to redirect a foe miss to an adjacent creature"',
  'Relentless Hex':
    'Section=magic ' +
    'Note="May use a bonus action to teleport 30\' to a space adjacent to curse target"',
  'Saint Of Forge And Fire':
    'Section=combat,save ' +
    'Note=' +
      '"Resistance to non-magical bludgeoning, piercing, and slashing damage in heavy armor",' +
      '"Immunity to fire damage"',
  'Scornful Rebuke':
    'Section=combat ' +
    'Note="Successful attackers suffer %{charismaModifier>?1} HP psychic"',
  'Searing Arc Strike':
    'Section=magic ' +
    'Note="May spend 2-%{levels.Monk//2} Ki Points to cast <i>Burning Hands</i> after an attack as a bonus action" ' +
    'SpellAbility=Wisdom ' +
    'Spells="Burning Hands"',
  'Searing Sunburst':
    'Section=magic ' +
    'Note="R150\' 20\' radius inflicts 2d6 HP radiant (DC %{kiSaveDC} Constitution neg); may spend 1/2/3 Ki Points for +2/4/6d6 HP"',
  'Searing Vengeance':
    'Section=combat ' +
    'Note="May regain %{hitPoints//2} HP, stand, and inflict R30\' 2d8+%{charismaModifier} radiant damage and blindness for 1 rd upon death saving throw 1/long rest"',
  'Seeking Arrow':
    'Section=combat ' +
    'Note="Arrow ignores 3/4 cover, inflicting +%{levels.Fighter<18?1:2}d6 HP force damage and revealing target (DC %{8+proficiencyBonus+intelligenceModifier} Dexterity half HP only)"',
  "Sentinel At Death's Door":
    'Section=magic ' +
    'Note="R30\' May negate a critical hit %{wisdomModifier>?1}/long rest"',
  'Shadow Arrow':
    'Section=combat ' +
    'Note="Arrow inflicts +%{levels.Fighter<18?2:4}d6 HP psychic damage and 5\' vision (DC %{8+proficiencyBonus+intelligenceModifier} Wisdom HP only) for 1 rd"',
  'Shadow Lore':
    'Section=magic ' +
    'Note="R30\' Target obeys self commands (DC %{spellDifficultyClass.B} Wisdom neg) for 8 hr 1/long rest"',
  'Shadow Walk':
    'Section=magic ' +
    'Note="May use a bonus action to teleport 120\' between dim or dark areas"',
  'Shadowy Dodge':
    'Section=combat ' +
    'Note="May use Reaction to impose Disadv on attacker (attacker Adv neg)"',
  'Sharpen The Blade':
    'Section=combat ' +
    'Note="May spend 1-3 Ki Points and use a bonus action to gain an equal bonus on attack and damage w/a Kensei weapon for 1 min"',
  'Shielding Storm':
    'Section=magic ' +
    'Note="R10\' Targets gain resistance to %{$\'features.Storm Aura (Desert)\' ? \'fire\' : $\'features.Storm Aura (Sea)\' ? \'lightning\' : \'cold\'} damage"',
  'Shroud Of Shadow':
    'Section=magic ' +
    'Note="May cast <i>Invisibility</i> at will" ' +
    'Spells=Invisibility',
  'Skirmisher':
    'Section=combat ' +
    'Note="May use Reaction to move half speed w/out provoking an OA when a foe comes w/in 5\'"',
  'Slashing Flourish':
    'Section=combat ' +
    'Note="May spend 1 Bardic Inspiration to inflict +1d%{bardicInspirationDie} HP weapon damage on target and an adjacent foe"',
  "Slayer's Counter":
    'Section=combat ' +
    'Note="May use Reaction when Slayer\'s Prey target forces self saving throw to attack; attack success also makes the save succeed"',
  "Slayer's Prey":
    'Section=combat ' +
    'Note="R60\' May use a bonus action to inflict +1d6 HP weapon damage on chosen target w/first attack each rd"',
  'Soul Of Deceit':
    'Section=save ' +
    'Note="Immune to telepathy, may use Deception vs. Insight to present false thoughts, and always detects as telling the truth"',
  'Soul Of The Forge':
    'Section=combat,save ' +
    'Note=' +
      '"+1 AC in heavy armor",' +
      '"Resistance to fire damage"',
  'Spectral Defense':
    'Section=combat Note="May use Reaction upon damage to gain resistance"',
  'Speech Of The Woods':
    'Section=skill,skill ' +
    'Note=' +
      '"Language (Sylvan)",' +
      '"May speak w/beasts"',
  'Spirit Shield':
    'Section=combat ' +
    'Note="R30\' May use Reaction to reduce damage to a creature by %{levels.Barbarian<10?2:levels.Barbarian<14?3:4}d6 HP"',
  'Spirit Totem (Bear)':
    'Section=magic ' +
    'Note="R60\' May use a bonus action to give targets in a 30\' radius %{levels.Druid+5} temporary HP and Adv on Strength for 1 min 1/short rest"',
  'Spirit Totem (Hawk)':
    'Section=magic ' +
    'Note="R60\' May use a bonus action to give targets in a 30\' radius Adv on Perception, and self may use Reaction to give Adv on an attack for 1 min 1/short rest"',
  'Spirit Totem (Unicorn)':
    'Section=magic ' +
    'Note="R60\' May use a bonus action to give allies Adv to detect creatures in a 30\' radius, and self heal spells restore %{levels.Druid} HP to targets in the same radius, for 1 min 1/short rest"',
  "Stalker's Flurry":
    'Section=combat Note="May follow a weapon miss w/another attack 1/rd"',
  'Steady Eye':
    'Section=skill ' +
    'Note="Adv on Perception and Investigation after moving half speed"',
  'Storm Guide':
    'Section=magic ' +
    'Note="May stop rain in a 20\' radius or direct winds in a 100\' radius for 1 rd"',
  "Storm's Fury":
    'Section=combat ' +
    'Note="May use Reaction to inflict %{levels.Sorcerer} HP lightning and 20\' push on a successful melee attacker (DC %{spellDifficultyClass.S} Strength HP only)"',
  'Strength Before Death':
    'Section=combat ' +
    'Note="May take an extra turn when brought to 0 HP 1/long rest"',
  'Strength Of The Grave':
    'Section=combat ' +
    'Note="Successful DC 5 + damage Charisma save retains 1 HP when reduced to 0 by non-critical, non-radiant damage 1/long rest"',
  'Storm Aura (Desert)':
    'Section=magic ' +
    'Note="During first rd of rage, a 10\' radius inflicts %{levels.Barbarian//5+2} HP fire; may use a bonus action to reactivate while rage lasts"',
  'Storm Aura (Sea)':
    'Section=magic ' +
    'Note="During first rd of rage, R10\' target suffers %{levels.Barbarian//5>?1}d6 HP lightning (DC %{8+proficiencyBonus+constitutionModifier} Dexterity half); may use a bonus action to reactivate while rage lasts"',
  'Storm Aura (Tundra)':
    'Section=magic ' +
    'Note="During first rd of rage, R10\' targets gain %{levels.Barbarian//5+2} temporary HP; may use a bonus action to reactivate while rage lasts"',
  'Storm Soul (Desert)':
    'Section=magic,save ' +
    'Note=' +
      '"Touch may set unattended flammable objects on fire",' +
      '"Resistance to fire damage/Unaffected by extreme heat"',
  'Storm Soul (Sea)':
    'Section=ability,save ' +
    'Note=' +
      '"30\' swim Speed/May breathe water",' +
      '"Resistance to lightning damage"',
  'Storm Soul (Tundra)':
    'Section=magic,save ' +
    'Note=' +
      '"Touch may freeze unoccupied 5\' cu water for 1 min",' +
      '"Resistance to cold damage/Unaffected by extreme cold"',
  'Sudden Strike':
    'Section=combat ' +
    'Note="May use a bonus action for an extra attack, which may be a Sneak Attack on a second foe"',
  'Sun Shield':
    'Section=combat,magic ' +
    'Note=' +
      '"While emitting light, may use Reaction to inflict %{wisdomModifier+5} HP radiant on a successful melee attacker",' +
      '"May emit bright light in a 30\' radius at will"',
  'Superior Mobility':'Section=ability Note="+10 Speed"',
  'Supernatural Defense':
    'Section=save ' +
    'Note="+1d6 saves and grapple escape vs. Slayer\'s Prey target"',
  'Survivalist':
    'Section=skill ' +
    'Note="+%{proficiencyBonus} Nature/+%{proficiencyBonus} Survival"',
  'Tempestuous Magic':
    'Section=magic ' +
    'Note="May use a bonus action to fly 10\' before or after casting a spell w/out provoking an OA"',
  'Tactical Wit':'Section=combat Note="+%V Initiative"',
  'Tipsy Sway':
    'Section=feature Note="Has Leap To Your Feet and Redirect Attack features"',
  'Tireless Spirit':
    'Section=combat ' +
    'Note="Has a minimum 1 Fighting Spirit use available after initiative"',
  'Tomb Of Levistus':
    'Section=magic ' +
    'Note="May use Reaction upon taking damage to gain %{levels.Warlock*10} temporary HP and suffer vulnerability to fire and immobility for 1 rd 1/short rest"',
  "Trickster's Escape":
    'Section=magic ' +
    'Note="May cast self <i>Freedom Of Movement</i> 1/long rest" ' +
    'Spells="Freedom Of Movement"',
  'Umbral Form':
    'Section=magic ' +
    'Note="May use a bonus action and spend 6 Sorcery Points to gain ability to move through objects and resistance to non-force, non-radiant damage for 1 min"',
  'Umbral Sight':
    'Section=feature,feature ' +
    'Note=' +
      '"Has Darkvision feature",' +
      '"Invisible to darkvision"',
  'Unbreakable Majesty':
    'Section=magic ' +
    'Note="May use a bonus action to prevent foes from attacking self for 1 min (DC %{spellDifficultyClass.B} Charisma neg and inflicts Disadv on saves vs. self spells for 1 rd)"',
  'Unearthly Recovery':
    'Section=magic ' +
    'Note="May use a bonus action to regain %{hitPoints//2} HP when below %{hitPoints//2} HP 1/long rest"',
  'Unerring Accuracy':
    'Section=combat Note="May reroll a monk weapon miss 1/rd"',
  'Unerring Eye':
    'Section=feature ' +
    'Note="R30\' May sense illusions and other deceptions %{wisdomModifier>?1}/long rest"',
  'Unwavering Mark':
    'Section=combat ' +
    'Note="May mark foe w/a successful attack; foe attacks on others while adjacent to self suffer Disadv and allow self to use a bonus action to attack w/Adv and +%{levels.Fighter//2} HP weapon damage for 1 rd %{strengthModifier>?1}/long rest"',
  'Vigilant Defender':
    'Section=combat ' +
    'Note="May use Reaction to make an OA on every other creature\'s turn"',
  'Warding Maneuver':
    'Section=combat ' +
    'Note="May give self or an adjacent ally +1d8 AC and damage resistance when struck %{constitutionModifier>?1}/long rest"',
  'Wind Speaker':
    'Section=skill Note="Language (Primordial/Aquan/Auran/Ignan/Terran)"',
  'Vengeful Ancestors':
    'Section=combat ' +
    'Note="Attacker suffers force damage equal to that prevented by Spirit Shield"',
  'Walker In Dreams':
    'Section=magic ' +
    'Note="After a short rest, may cast <i>Dream</i>, <i>Scrying</i>, or <i>Teleportation Circle</i> connected to last long rest location 1/long rest" ' +
    'Spells=Dream,Scrying,"Teleportation Circle"',
  'Warrior Of The Gods':
    'Section=feature ' +
    'Note="Life-restoring spells cast on self need no material components"',
  'Way Of The Brush':
    'Section=skill ' +
    'Note="Tool Proficiency (Choose 1 from Calligrapher\'s Supplies, Painter\'s Supplies)"',
  'Wind Soul':
    'Section=ability,magic,save ' +
    'Note=' +
      '"60\' fly Speed",' +
      '"R30\' May slow fly Speed to 30\' to give %{charismaModifier+3} others 30\' fly Speed for 1 hr 1/long rest",' +
      '"Immunity to lightning and thunder damage"',
  'Words Of Terror':
    'Section=magic ' +
    'Note="1 min conversation frightens target (DC %{spellDifficultyClass.B} Wisdom neg; damage ends) for 1 hr 1/short rest"',
  'Zealous Presence':
    'Section=combat ' +
    'Note="R60\' May use a bonus action to give 10 targets Adv on attacks and saving throws for 1 rd 1/long rest"',
  // Feats
  'Bountiful Luck':
    'Section=feature ' +
    'Note="R30\' May use Reaction and forego using Lucky racial trait to allow an ally to reroll a natural 1 on an attack, ability, or saving throw"',
  'Dragon Fear':
    'Section=ability,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Strength, Constitution, Charisma)",' +
      '"R30\' May use Breath Weapon to frighten targets for 1 min (DC %{8+proficiencyBonus+charismaModifier} Wisdom neg)"',
  'Dragon Hide':
    'Section=ability,combat,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Strength, Constitution, Charisma)",' +
      '"+3 AC in no armor",' +
      '"May use claws as a natural slashing weapon"',
  'Drow High Magic':
    'Section=magic ' +
    'Note="May cast <i>Detect Magic</i> at will, <i>Dispel Magic</i> and <i>Levitate</i> 1/long rest" ' +
    'SpellAbility=Charisma ' +
    'Spells="Detect Magic","Dispel Magic",Levitate',
  'Dwarven Fortitude':
    'Section=ability,combat ' +
    'Note=' +
      '"+1 Constitution",' +
      '"May spend one Hit Die to regain HD + %{constitutionModifier} HP during Dodge action"',
  'Elven Accuracy':
    'Section=ability,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Dexterity, Intelligence, Wisdom, Charisma)",' +
      '"May reroll 1 die when attacking w/Adv using Dexterity, Intelligence, Wisdom, or Charisma"',
  'Fade Away':
    'Section=ability,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Dexterity, Intelligence)",' +
      '"May use Reaction upon taking damage to become invisible for 1 rd (attacking ends) 1/short rest"',
  'Fey Teleportation':
    'Section=ability,magic,skill ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Charisma, Intelligence)",' +
      '"May cast <i>Misty Step</i> 1/short rest",' +
      '"Language (Sylvan)" ' +
    'SpellAbility=Intelligence ' +
    'Spells="Misty Step"',
  'Flames Of Phlegethos':
    'Section=ability,magic ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Charisma, Intelligence)",' +
      '"May reroll 1s on fire spell damage/When casting a fire spell, may inflict 1d4 HP fire on adjacent creatures and give 30\' light for 1 rd"',
  'Infernal Constitution':
    'Section=ability,save ' +
    'Note=' +
      '"+1 Constitution",' +
      '"Resistance to cold and poison damage/Adv on saves vs. poison"',
  'Orcish Fury':
    'Section=ability,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Strength, Constitution)",' +
      '"May add a die to weapon damage 1/short rest/May use Reaction immediately after Relentless Endurance for an extra attack"',
  'Prodigy':
    'Section=feature,skill ' +
    'Note=' +
      '"Skill Proficiency (Choose 1 from any)/Tool Proficiency (Choose 1 from any)/Language (Choose 1 from any)",' +
      '"Dbl proficiency bonus (+%{proficiencyBonus}) on chosen skill"',
  'Second Chance':
    'Section=ability,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Dexterity, Constitution, Charisma)",' +
      '"May use Reaction to force a foe attack reroll 1/encounter or short rest"',
  'Squat Nimbleness':
    'Section=ability,feature,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Strength, Dexterity)/+5 Speed",' +
      '"Skill Proficiency (Choose 1 from Acrobatics, Athletics)",' +
      '"Adv on Athletics or Acrobatics to break a grapple"',
  'Wood Elf Magic':
    'Section=magic,magic ' +
    'Note=' +
      '"Knows 1 D0 cantrip",' +
      '"May cast <i>Longstrider</i> and <i>Pass Without Trace</i> 1/long rest" ' +
      'SpellAbility=Wisdom ' +
      'Spells=Longstrider,"Pass Without Trace"'
};
Xanathar.SPELLS = {

  "Abi-Dalzim's Horrid Wilting":
    'School=Necromancy ' +
    'Level=S8,W8 ' +
    'Description=' +
      '"R150\' 30\' radius withers plants and inflicts on creatures 12d8 HP necrotic (Constitution half, plants and water elementals Disadv)"',
  'Absorb Elements':
    'School=Abjuration ' +
    'Level=D1,R1,S1,W1 ' +
    'AtHigherLevels="inflicts +1d6 HP" ' +
    'Description=' +
      '"Self may use Reaction to gain resistance to incoming energy damage and to inflict +1d6 HP of that energy type next turn"',
  "Aganazzar's Scorcher":
    'School=Evocation ' +
    'Level=S2,W2 ' +
    'AtHigherLevels="inflicts +1d8 HP" ' +
    'Description=' +
      '"Creatures in a 5\'x30\' line suffer 3d8 HP fire (Dexterity half)"',
  'Beast Bond':
    'School=Divination ' +
    'Level=D1,R1 ' +
    'Description=' +
      '"Touched friendly beast (maximum Intelligence 3) gains a telepathic link w/self and Adv on attacks on foes adjacent to self for conc up to 10 min"',
  'Bones Of The Earth':
    'School=Transmutation ' +
    'Level=D6 ' +
    'AtHigherLevels="creates +2 pillars" ' +
    'Description=' +
      '"R120\' Creates 6 5\'x30\' pillars that inflict 6d6 HP bludgeoning and pin creatures caught between top and ceiling (Dexterity neg, Dexterity or Strength frees)"',
  'Catapult':
    'School=Transmutation ' +
    'Level=S1,W1 ' +
    'AtHigherLevels="hurls +5 lb, inflicting +1d8 HP" ' +
    'Description=' +
      '"R60\' Hurls 5 lb target object 90\', inflicting 3d8 HP bludgeoning (Dexterity neg)"',
  'Catnap':
    'School=Enchantment ' +
    'Level=B3,S3,W3 ' +
    'AtHigherLevels="affects +1 target" ' +
    'Description=' +
      '"R30\' Three willing targets sleep for 10 min (shaking or damage ends), gaining the benefits of a short rest"',
  'Cause Fear':
    'School=Necromancy ' +
    'Level=K1,W1 ' +
    'AtHigherLevels="affects +1 target" ' +
    'Description=' +
      '"R60\' Target becomes frightened of self (Wisdom ends) for conc up to 1 min"',
  'Ceremony':
    'School=Abjuration ' +
    'Level=C1,P1 ' +
    'Description=' +
      '"Self may perform ceremony of atonement, bless water, coming of age, dedication, funeral rite, or wedding"',
  'Chaos Bolt':
    'School=Evocation ' +
    'Level=S1 ' +
    'AtHigherLevels="inflicts +1d6 HP" ' +
    'Description=' +
      '"R120\' Ranged spell attack inflicts 2d8+1d6 HP of a random damage type; may affect additional targets"',
  'Charm Monster':
    'School=Enchantment ' +
    'Level=B4,D4,K4,S4,W4 ' +
    'AtHigherLevels="affects +1 target" ' +
    'Description=' +
      '"R30\' Target regards you as a friend (Wisdom neg) for 1 hr or until harmed"',
  'Control Flames':
    'School=Transmutation ' +
    'Level=D0,S0,W0 ' +
    'Description=' +
      '"R60\' Target flame up to 5\' cu expands 5\', snuffs, doubles light area for 1 hr, or forms shapes for 1 hr"',
  'Control Winds':
    'School=Transmutation ' +
    'Level=D5,S5,W5 ' +
    'Description=' +
      '"R300\' Air in 100\' cu creates gusts (may inflict Disadv on ranged attacks and half movement), a downdraft (inflicts Disadv on ranged attacks and knocks prone flying creatures (Strength neg)), or an updraft (gives half damage from falling and +10\' jump) for conc up to 1 hr"',
  'Create Bonfire':
    'School=Conjuration ' +
    'Level=D0,K0,S0,W0 ' +
    'Description=' +
      '"R60\' Creates a 5\' fire that inflicts %{(level+7)//6}d8 HP fire (Dexterity neg) for conc up to 1 min"',
  'Create Homunculus':
    'School=Transmutation ' +
    'Level=W6 ' +
    'Description="Self suffers 2d4 HP piercing to create a magical companion"',
  'Crown Of Stars':
    'School=Evocation ' +
    'Level=K7,S7,W7 ' +
    'AtHigherLevels="creates +2 flames" ' +
    'Description=' +
      '"Creates seven flames around self that give 30\' light for 1 hr; may use each for a ranged touch that inflicts 4d12 HP radiant"',
  'Danse Macabre':
    'School=Necromancy ' +
    'Level=K5,W5 ' +
    'AtHigherLevels="creates +2 undead" ' +
    'Description=' +
      '"R60\' Creates from corpses 5 obedient skeletons and zombies that attack at +%{mdf} for conc up to 1 hr"',
  'Dawn':
    'School=Evocation ' +
    'Level=C5,W5 ' +
    'Description=' +
      '"R60\' 30\' radius inflicts 4d10 HP radiant and moves 60\'/rd for conc up to 1 min"',
  "Dragon's Breath":
    'School=Transmutation ' +
    'Level=S2,W2 ' +
    'AtHigherLevels="inflicts +1d6 HP" ' +
    'Description=' +
      '"Touched may exhale choice of acid, cold, fire, lightning, or poison, inflicting 3d6 HP (Dexterity half) in a 15\' cone, for conc up to 1 min"',
  'Druid Grove':
    'School=Abjuration ' +
    'Level=D6 ' +
    'Description=' +
      '"Touched 90\' cu responds to intruders w/chosen hostile effects for 1 dy"',
  'Dust Devil':
    'School=Conjuration ' +
    'Level=D2,S2,W2 ' +
    'AtHigherLevels="inflicts +1d8 HP" ' +
    'Description=' +
      '"R60\' 5\' cu inflicts 1d8 HP bludgeoning, pushes 10\' (Strength half HP only), and moves 30\'/rd for conc up to 1 min"',
  'Earth Tremor':
    'School=Evocation ' +
    'Level=B1,D1,S1,W1 ' +
    'AtHigherLevels="inflicts +1d6 HP" ' +
    'Description=' +
      '"10\' radius knocks prone and inflicts 1d6 HP bludgeoning (Dexterity neg)"',
  'Earthbind':
    'School=Transmutation ' +
    'Level=D2,K2,S2,W2 ' +
    'Description=' +
      '"R300\' Reduces target fly Speed to 0 for conc up to 1 min (Strength neg)"',
  'Elemental Bane':
    'School=Transmutation ' +
    'Level=D4,K4,W4 ' +
    'AtHigherLevels="affects +1 target" ' +
    'Description=' +
      '"R90\' Target loses resistance to chosen energy type and suffers +2d6 HP from next hit of same for conc up to 1 min"',
  'Enemies Abound':
    'School=Enchantment ' +
    'Level=B3,K3,S3,W3 ' +
    'Description=' +
      '"R120\' Target regards all creatures as enemies and attacks randomly (Intelligence neg) for conc up to 1 min"',
  'Enervation':
    'School=Necromancy ' +
    'Level=K5,S5,W5 ' +
    'AtHigherLevels="inflicts +1d8 HP" ' +
    'Description=' +
      '"R60\' Target suffers 4d6 HP necrotic/rd and self regains half for conc up to 1 min (Dexterity suffers 2d6 HP for 1 rd)"',
  'Erupting Earth':
    'School=Transmutation ' +
    'Level=D3,S3,W3 ' +
    'AtHigherLevels="inflicts +1d12 HP" ' +
    'Description=' +
      '"R120\' 20\' cu inflicts 3d12 HP bludgeoning (Dexterity half) and difficult terrain"',
  'Far Step':
    'School=Conjuration ' +
    'Level=K5,S5,W5 ' +
    'Description="Self may teleport 60\'/rd for conc up to 1 min"',
  'Find Greater Steed':
    'School=Conjuration ' +
    'Level=P4 ' +
    'Description=' +
      '"R30\' Summons a mount (minimum Intelligence 6) that can understand 1 language and communicate telepathically w/self until dismissed or reduced to 0 HP"',
  'Flame Arrows':
    'School=Transmutation ' +
    'Level=D3,R3,S3,W3 ' +
    'AtHigherLevels="affects +2 pieces" ' +
    'Description=' +
      '"12 pieces of ammunition in touched quiver each inflict +1d6 HP fire on hit for conc up to 1 hr"',
  'Frostbite':
    'School=Evocation ' +
    'Level=D0,K0,S0,W0 ' +
    'Description=' +
      '"R60\' Target suffers %{(level+7)//6}d6 HP cold and Disadv on next weapon attack for 1 rd (Constitution neg)"',
  'Guardian Of Nature':
    'School=Transmutation ' +
    'Level=D4,R4 ' +
    'Description=' +
      '"Changes self into a Primal Beast (+10\' Speed, 120\' Darkvision, Adv on Strength, melee weapons inflict +1d6 HP force) or a Great Tree (10 temporary HP, Adv on Constitution, Adv on Dexterity and Wisdom attacks, 15\' radius inflicts difficult terrain on foes) for conc up to 1 min"',
  'Gust':
    'School=Transmutation ' +
    'Level=D0,S0,W0 ' +
    'Description=' +
      '"R30\' Pushes target creature 5\' (Strength neg), pushes unattended 5 lb object 10\', or creates a light breeze"',
  'Healing Spirit':
    'School=Conjuration ' +
    'Level=D2,R2 ' +
    'AtHigherLevels="heals +1d6 HP" ' +
    'Description=' +
      '"R60\' Allies in a 5\' cu regain 1d6 HP/rd for conc up to 1 min (maximum %{wisdomModifier+1>?2} healings)"',
  'Holy Weapon':
    'School=Evocation ' +
    'Level=C5,P5 ' +
    'Description=' +
      '"Touched weapon lights 30\' and inflicts +2d8 HP radiant for conc up to 1 hr; blast on dismissal inflicts 4d8 HP radiant (Constitution half) and blindness for 1 min (Constitution ends) on targets in a 30\' radius"',
  'Ice Knife':
    'School=Conjuration ' +
    'Level=D1,S1,W1 ' +
    'AtHigherLevels="inflicts +1d6 HP cold" ' +
    'Description=' +
      '"R60\' Ranged spell attack inflicts 1d10 HP piercing and 2d6 HP cold in a 5\' radius (Dexterity neg)"',
  'Illusory Dragon':
    'School=Illusion ' +
    'Level=W8 ' +
    'Description=' +
      '"R120\' Shadow dragon frightens (Wisdom neg), moves 60\'/rd, and may inflict 7d6 HP choice of energy in a 60\' cone (Intelligence half) for conc up to 1 min"',
  'Immolation':
    'School=Evocation ' +
    'Level=S5,W5 ' +
    'Description=' +
      '"R90\' Target suffers 8d6 HP fire (Dexterity half), then 4d6 HP fire/rd (Dexterity ends) for conc up to 1 min"',
  'Infernal Calling':
    'School=Conjuration ' +
    'Level=K5,W5 ' +
    'AtHigherLevels="summons +1 CR" ' +
    'Description=' +
      '"R90\' Summons an uncontrolled CR 6 devil for conc up to 1 hr"',
  'Infestation':
    'School=Conjuration ' +
    'Level=D0,K0,S0,W0 ' +
    'Description=' +
      '"R30\' Target suffers %{(level+7)//6}d6 HP poison and moves 5\' in a random direction (Constitution neg)"',
  'Investiture Of Flame':
    'School=Transmutation ' +
    'Level=D6,K6,S6,W6 ' +
    'Description=' +
      '"Self lights 30\', gains immunity to fire and Adv on saves vs. cold, inflicts 1d10 HP fire in a 5\' radius, and may inflict 4d8 HP fire (Dexterity half) in a 15\'x5\' line for conc up to 10 min"',
  'Investiture Of Ice':
    'School=Transmutation ' +
    'Level=D6,K6,S6,W6 ' +
    'Description=' +
      '"Self gains immunity to cold and Adv on saves vs. fire, moves normally across ice and snow, inflicts difficult terrain in a 10\' radius, and may inflict 4d6 HP cold and half speed for 1 rd (Dexterity half HP only) in a 15\' cone for conc up to 10 min"',
  'Investiture Of Stone':
    'School=Transmutation ' +
    'Level=D6,K6,S6,W6 ' +
    'Description=' +
      '"Self gains resistance to non-magical bludgeoning, piercing, and slashing, may inflict knocked prone (Dexterity neg) in a 15\' radius, moves normally across earth and stone difficult terrain, and may pass through earth and stone for conc up to 10 min"',
  'Investiture Of Wind':
    'School=Transmutation ' +
    'Level=D6,K6,S6,W6 ' +
    'Description=' +
      '"Ranged attacks on self suffer Disadv, and self gains a 60\' fly Speed and may inflict 2d10 HP bludgeoning and a 10\' push in a R60\' 15\' cu for conc up to 10 min"',
  'Invulnerability':
    'School=Abjuration ' +
    'Level=W9 ' +
    'Description="Self gains immunity to all damage for conc up to 10 min"',
  'Life Transference':
    'School=Necromancy ' +
    'Level=C3,W3 ' +
    'AtHigherLevels="inflicts +1d8 HP" ' +
    'Description=' +
      '"R30\' Self suffers 4d8 HP necrotic; target regains 2x the amount suffered"',
  'Maddening Darkness':
    'School=Evocation ' +
    'Level=K8,W8 ' +
    'Description=' +
      '"R150\' 60\' radius magical darkness inflicts 8d8 HP psychic/rd (Wisdom half) for conc up to 10 min"',
  'Maelstrom':
    'School=Evocation ' +
    'Level=D5 ' +
    'Description=' +
      '"R120\' 30\' radius of swirling water inflicts 6d6 HP bludgeoning/rd and pulls creatures toward its center (Strength neg) for conc up to 1 min"',
  'Magic Stone':
    'School=Transmutation ' +
    'Level=D0,K0 ' +
    'Description=' +
      '"3 touched stones may be thrown for +%{mdf} attack, inflicting 1d6+%{mdf} HP bludgeoning each for 1 min"',
  'Mass Polymorph':
    'School=Transmutation ' +
    'Level=B9,S9,W9 ' +
    'Description=' +
      '"R120\' 10 targets transform into beasts w/half target\'s HD (Wisdom neg) for conc up to 1 hr or until reduced to 0 HP"',
  "Maximilian's Earthen Grasp":
    'School=Transmutation ' +
    'Level=S2,W2 ' +
    'Description=' +
      '"R30\' 5\' sq inflicts 2d6/rd HP bludgeoning and restrains (Strength ends) for conc up to 1 min"',
  "Melf's Minute Meteors":
    'School=Evocation ' +
    'Level=S3,W3 ' +
    'AtHigherLevels="creates +2 meteors" ' +
    'Description=' +
      '"R120\' 6 meteors each inflict 2d6 HP fire (maximum 2/rd) for conc up to 10 min"',
  'Mental Prison':
    'School=Illusion ' +
    'Level=K6,S6,W6 ' +
    'Description=' +
      '"R60\' Target suffers 5d6 HP psychic and becomes trapped by an illusionary danger (Intelligence HP only; escape inflicts 10d6 HP psychic) for conc up to 1 min"',
  'Mighty Fortress':
    'School=Conjuration ' +
    'Level=W8 ' +
    'Description=' +
      '"R1 mile Creates a 120\' sq turreted and staffed fortress for 1 wk"',
  'Mind Spike':
    'School=Divination ' +
    'Level=K2,S2,W2 ' +
    'AtHigherLevels="inflicts +1d8 HP" ' +
    'Description=' +
      '"R60\' Target suffers 3d8 HP psychic, and self knows target location (Wisdom half HP only) for conc up to 1 hr"',
  'Mold Earth':
    'School=Transmutation ' +
    'Level=D0,S0,W0 ' +
    'Description=' +
      '"R30\' Excavates, colors, or changes movement difficulty of a 5\' cu of earth"',
  'Negative Energy Flood':
    'School=Necromancy ' +
    'Level=K5,W5 ' +
    'Description=' +
      '"R60\' Living target suffers 5d12 necrotic (Constitution half) and rises as a zombie if slain; undead target gains half of 5d12 temporary HP for 1 hr"',
  'Power Word Pain':
    'School=Enchantment ' +
    'Level=K7,S7,W7 ' +
    'Description=' +
      '"R60\' Target up to 100 HP slows to 10\' Speed, suffers Disadv on attack, ability, and non-Constitution saves, and requires a successful Constitution save to cast (Constitution ends)"',
  'Primal Savagery':
    'School=Transmutation ' +
    'Level=D0 ' +
    'Description=' +
      '"Self next unarmed attack inflicts %{(level+7)//6}d10 HP acid"',
  'Primordial Ward':
    'School=Abjuration ' +
    'Level=D6 ' +
    'Description=' +
      '"Self gains resistance to acid, cold, fire, lightning, and thunder for conc up to 1 min; may end to gain immunity for 1 rd"',
  'Psychic Scream':
    'School=Enchantment ' +
    'Level=B9,K9,S9,W9 ' +
    'Description=' +
      '"R90\' 10 targets suffer 14d6 HP psychic (Intelligence half) and stunned (Intelligence ends)"',
  'Pyrotechnics':
    'School=Transmutation ' +
    'Level=B2,S2,W2 ' +
    'Description=' +
      '"R60\' Target fire snuffs and emits fireworks (R10\' blinds 1 rd (Constitution neg)) or 20\' smoke for 1 min"',
  'Scatter':
    'School=Conjuration ' +
    'Level=K6,S6,W6 ' +
    'Description="R30\' Teleports 5 targets 120\' (Wisdom neg)"',
  'Shadow Blade':
    'School=Illusion ' +
    'Level=K2,S2,W2 ' +
    'AtHigherLevels="increases damage to 3d8/4d8/5d8 HP at level 3/5/7" ' +
    'Description=' +
      '"Self wields a shadow sword (Adv on attacks in dim light, inflicts 2d8 HP psychic, finesse and light properties, range 20/60) for conc up to 1 min"',
  'Shadow Of Moil':
    'School=Necromancy ' +
    'Level=K4 ' +
    'Description=' +
      '"10\' radius dims light, gives self resistance to radiant damage, and inflicts 2d8 HP necrotic on a successful attacker for conc up to 1 min"',
  'Shape Water':
    'School=Transmutation ' +
    'Level=D0,S0,W0 ' +
    'Description=' +
      '"R30\' 5\' cu water forms animated shapes, changes color or opacity, or freezes for 1 hr or moves 5\'"',
  'Sickening Radiance':
    'School=Evocation ' +
    'Level=K4,S4,W4 ' +
    'Description=' +
      '"R120\' 30\' radius inflicts 4d10 HP radiant and 1 level of exhaustion and lights creatures (Constitution neg) for conc up to 10 min"',
  'Skill Empowerment':
    'School=Transmutation ' +
    'Level=B5,S5,W5 ' +
    'Description=' +
      '"Touched gains dbl proficiency on chosen proficient skill for conc up to 1 hr"',
  'Skywrite':
    'School=Transmutation ' +
    'Level=B2,D2,W2 ' +
    'Description="Clouds form 10 words for conc up to 1 hr"',
  'Snare':
    'School=Abjuration ' +
    'Level=D1,R1,W1 ' +
    'Description=' +
      '"Touched magical trap restrains the first creature to cross it (Dexterity neg; Dexterity or Arcana ends) for 8 hr"',
  "Snilloc's Snowball Swarm":
    'School=Evocation ' +
    'Level=S2,W2 ' +
    'AtHigherLevels="inflicts +1d6 HP" ' +
    'Description="R90\' 5\' radius inflicts 3d6 HP cold (Dexterity half)"',
  'Soul Cage':
    'School=Necromancy ' +
    'Level=K6,W6 ' +
    'Description=' +
      '"R60\' Self may use a trapped dying soul 6 times to regain 2d8 HP, answer a question, gain Adv on an attack, ability, or saving throw, or scry for 10 min for 8 hr"',
  'Steel Wind Strike':
    'School=Conjuration ' +
    'Level=R5,W5 ' +
    'Description=' +
      '"R30\' Inflicts on each of 5 targets 6d10 HP force; self may then teleport adjacent to choice of target"',
  'Storm Sphere':
    'School=Evocation ' +
    'Level=S4,W4 ' +
    'AtHigherLevels="inflicts +1d6 HP" ' +
    'Description=' +
      '"R150\' 20\' radius inflicts 2d6 HP bludgeoning (Strength neg) and may emit a 60\' bolt that inflicts 4d6 HP lightning 1/rd for conc up to 1 min"',
  'Summon Greater Demon':
    'School=Conjuration ' +
    'Level=K4,W4 ' +
    'AtHigherLevels="summons +1 CR" ' +
    'Description=' +
      '"R60\' Demon up to CR 5 obeys self (Charisma ends) for conc up to 1 hr"',
  'Summon Lesser Demons':
    'School=Conjuration ' +
    'Level=K3,W3 ' +
    'AtHigherLevels="doubles/triples demon count at level 6/8" ' +
    'Description=' +
      '"R60\' 2/4/6 CR 1/half/quarter demons attack nearest creature for conc up to 1 hr"',
  'Synaptic Static':
    'School=Enchantment ' +
    'Level=B5,K5,S5,W5 ' +
    'Description=' +
      '"R120\' Creatures in a 20\' radius suffer 8d6 HP psychic (Intelligence half) and -1d6 attack, ability, and concentration Constitution for 1 min (Intelligence ends)"',
  'Temple Of The Gods':
    'School=Conjuration ' +
    'Level=C7 ' +
    'Description=' +
      '"R120\' Creates a 120\' sq temple that bars divination and specified creature types (Charisma suffers -1d4 attack, ability, and saves) and gives a +%{wisdomModifier} bonus to healing for 1 dy"',
  "Tenser's Transformation":
    'School=Transmutation ' +
    'Level=W6 ' +
    'Description=' +
      '"Self gains 50 temporary HP, Adv on weapon attacks, +2d12 HP force weapon damage, Armor Proficiency (Heavy/Shield), Weapon Proficiency (Martial), Save Proficiency (Constitution/Strength), and an extra attack for conc up to 10 min; suffers 1 level of exhaustion afterward (Constitution neg)"',
  'Thunderclap':
    'School=Evocation ' +
    'Level=B0,D0,K0,S0,W0 ' +
    'Description="5\' radius inflicts %{(level+7)//6}d6 HP thunder"',
  'Thunder Step':
    'School=Conjuration ' +
    'Level=K3,S3,W3 ' +
    'AtHigherLevels="inflicts +1d10 HP" ' +
    'Description="Self and 1 willing adjacent creature teleport 90\', and a 10\' radius around the starting location inflicts 3d10 HP thunder (Constitution half)"',
  'Tidal Wave':
    'School=Conjuration ' +
    'Level=D3,S3,W3 ' +
    'Description=' +
      '"R120\' 30\'x10\' area inflicts 4d8 HP bludgeoning and knocked prone (Dexterity half HP only)"',
  'Tiny Servant':
    'School=Transmutation ' +
    'Level=W3 ' +
    'AtHigherLevels="animates +2 objects" ' +
    'Description="Touched object sprouts arms and legs and obeys commands for 8 hr"',
  'Toll The Dead':
    'School=Necromancy ' +
    'Level=C0,K0,W0 ' +
    'Description=' +
      '"R60\' Target suffers %{(level+7)//6}d8 HP necrotic (damaged target %{(level+7)//6}d12 HP necrotic; Wisdom neg)"',
  'Transmute Rock':
    'School=Transmutation ' +
    'Level=D5,W5 ' +
    'Description="R120\' 40\' cu changes between rock and mud"',
  'Vitriolic Sphere':
    'School=Evocation ' +
    'Level=S4,W4 ' +
    'AtHigherLevels="inflicts +2d4 HP initial" ' +
    'Description=' +
      '"R150\' 20\' radius inflicts 10d4 HP acid, then 5d4 HP acid next rd (Dexterity half initial HP only)"',
  'Wall Of Light':
    'School=Evocation ' +
    'Level=K5,S5,W5 ' +
    'AtHigherLevels="inflicts +1d8 HP" ' +
    'Description=' +
      '"R120\' 60\'x10\' wall lights 120\', inflicts 4d8 HP radiant (Constitution half) and blinding (Constitution ends) for conc up to 10 min; may emit a 60\' ray that inflicts 4d8 HP radiant and shortens wall by 10\'"',
  'Wall Of Sand':
    'School=Evocation ' +
    'Level=W3 ' +
    'Description=' +
      '"R90\' 30\'x10\' wall inflicts 1/3 Speed and blocks vision for conc up to 10 min"',
  'Wall Of Water':
    'School=Evocation ' +
    'Level=D3,S3,W3 ' +
    'Description=' +
      '"R60\' 30\'x10\' wall inflicts Disadv on ranged attacks and half damage on fire for conc up to 10 min"',
  'Warding Wind':
    'School=Evocation ' +
    'Level=B2,D2,S2,W2 ' +
    'Description=' +
      '"10\' radius deafens, extinguishes flames, bars gas and fog, and inflicts difficult terrain and Disadv on ranged attacks for conc up to 10 min"',
  'Watery Sphere':
    'School=Conjuration ' +
    'Level=D4,S4,W4 ' +
    'Description=' +
      '"R90\' 5\' sphere traps 1 large or 4 medium targets (Strength ends) and moves 30\'/rd for conc up to 1 min"',
  'Whirlwind':
    'School=Evocation ' +
    'Level=D7,S7,W7 ' +
    'Description=' +
      '"R300\' 10\' radius inflicts 10d6 HP bludgeoning (Dexterity half), restrains and pulls 5\' upward (Strength or Dexterity neg), and moves 30\'/rd for conc up to 1 min"',
  'Word Of Radiance':
    'School=Evocation ' +
    'Level=C0 ' +
    'Description=' +
      '"R5\' Targets suffer %{(level+7)//6}d6 HP radiant (Constitution neg)"',
  'Wrath Of Nature':
    'School=Evocation ' +
    'Level=D5,R5 ' +
    'Description=' +
      '"R120\' Animates 60\' cu of trees (R10\' inflicts 4d6 HP slashing (Dexterity neg)), undergrowth (inflicts difficult terrain), vines (restrains (Strength ends)), and rocks (ranged spell attack inflicts 3d8 HP bludgeoning and knocked prone (Dexterity HP only)) for conc up to 1 min"',
  'Zephyr Strike':
    'School=Transmutation ' +
    'Level=R1 ' +
    'Description=' +
      '"Self may move w/out provoking OA for conc up to 1 min, then gain Adv on 1 weapon attack, +1d8 HP force, and +30\' Speed for 1 rd"'

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
  'Harp':'Type=Music',
  'Rito Game Set':'Type=Game',
  'Voice':'Type=Music'
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

  if(name == 'Dragon Hide') {
    rules.defineRule('armorClass', 'combatNotes.dragonHide.1', '+', null);
    rules.defineRule('combatNotes.dragonHide.1',
      'combatNotes.dragonHide', '?', null,
      'armor', '=', 'source == "None" ? 3 : null'
    );
    SRD5E.weaponRules(rules, 'Claws', 'Unarmed', [], '1d4', null);
    rules.defineRule('weapons.Claws', 'combatNotes.dragonHide', '=', '1');
  } else if(name == 'Wood Elf Magic') {
    rules.defineRule('spellSlots.D0', 'magicNotes.woodElfMagic', '+=', '1');
    rules.defineRule
      ('casterLevels.D', 'casterLevels.Wood Elf Magic', '^=', null);
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
      ('combatNotes.extraAttack', 'bardFeatures.Extra Attack', '+=', '1');
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
    rules.defineRule
      ('features.Leap To Your Feet', 'featureNotes.tipsySway', '=', '1');
    rules.defineRule
      ('features.Redirect Attack', 'featureNotes.tipsySway', '=', '1');
    rules.defineRule
      ('features.Agile Parry', 'featureNotes.pathOfTheKensei', '=', '1');
    rules.defineRule
      ('features.Deft Strike', 'featureNotes.oneWithTheBlade', '=', '1');
    rules.defineRule
      ('features.Kensei Weapons', 'featureNotes.pathOfTheKensei', '=', '1');
    rules.defineRule
      ("features.Kensei's Shot", 'featureNotes.pathOfTheKensei', '=', '1');
    rules.defineRule('features.Magic Kensei Weapons',
      'featureNotes.oneWithTheBlade', '=', '1'
    );
    rules.defineRule
      ('features.Way Of The Brush', 'featureNotes.pathOfTheKensei', '=', '1');
    rules.defineRule('combatNotes.kenseiWeapons',
      classLevel, '=', 'source>=17 ? 5 : source>=11 ? 4 : source>=6 ? 3 : 2'
    );
    rules.defineRule
      ('weaponChoiceCount', 'combatNotes.kenseiWeapons', '+=', null);
  } else if(name == 'Ranger') {
    rules.defineRule('combatNotes.dreadAmbusher', 'wisdomModifier', '=', null);
    rules.defineRule
      ('features.Darkvision', 'featureNotes.umbralSight', '=', '1');
    rules.defineRule('saveProficiency.Wisdom', 'saveNotes.ironMind', '=', '1');
  } else if(name == 'Rogue') {
    rules.defineRule
      ('toolChoiceCount', 'skillNotes.masterOfIntrigue', '+=', '1');
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
    rules.defineRule('combatNotes.rakishAudacity.1',
      'features.Rakish Audacity', '?', null,
      'charismaModifier', '=', null
    );
    // Dummy rule to italicize combatNotes.rakishAudacity
    rules.defineRule('initiative', 'combatNotes.rakishAudacity', '+', 'null');
  } else if(name == 'Sorcerer') {
    rules.defineRule('magicNotes.eyesOfTheDark', classLevel, '?', 'source>=3');
  } else if(name == 'Wizard') {
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
