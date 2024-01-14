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
/* globals SRD5E, PHB5E, Tasha, Volo, Xanathar, Quilvyn, QuilvynRules, QuilvynUtils */
"use strict";

/*
 * This module loads the rules from the Fifth Edition Sword Coast Adventurer's
 * Guide. The SwordCoast function contains methods that load rules for
 * particular parts of the rules; raceRules for character races, magicRules
 * for spells, etc. These member methods can be called independently in order
 * to use a subset of the rules.  Similarly, the constant fields of SwordCoast
 * (BACKGROUNDS, CLASSES, etc.) can be manipulated to modify the choices.
 */
function SwordCoast() {

  if(window.PHB5E == null) {
    alert('The SwordCoast module requires use of the PHB5E module');
    return;
  }

  let rules = new QuilvynRules('Sword Coast', SwordCoast.VERSION);
  SwordCoast.rules = rules;

  rules.defineChoice('choices', SRD5E.CHOICES);
  rules.choiceEditorElements = SRD5E.choiceEditorElements;
  rules.choiceRules = SwordCoast.choiceRules;
  rules.editorElements = SRD5E.initialEditorElements();
  rules.getFormats = SRD5E.getFormats;
  rules.getPlugins = SwordCoast.getPlugins;
  rules.makeValid = SRD5E.makeValid;
  rules.randomizeOneAttribute = SRD5E.randomizeOneAttribute;
  rules.defineChoice('random', SRD5E.RANDOMIZABLE_ATTRIBUTES);
  rules.ruleNotes = SwordCoast.ruleNotes;

  SRD5E.createViewers(rules, SRD5E.VIEWERS);
  rules.defineChoice('extras',
    'feats', 'featCount', 'sanityNotes', 'selectableFeatureCount',
    'validationNotes'
  );
  rules.defineChoice('preset',
    'background:Background,select-one,backgrounds',
    'race:Race,select-one,races', 'levels:Class Levels,bag,levels');

  SRD5E.abilityRules(rules);
  SRD5E.combatRules(rules, SwordCoast.ARMORS, SRD5E.SHIELDS, SRD5E.WEAPONS);
  SRD5E.magicRules(rules, SRD5E.SCHOOLS, SwordCoast.SPELLS);
  SRD5E.identityRules(
    rules, SRD5E.ALIGNMENTS, SwordCoast.BACKGROUNDS, SwordCoast.CLASSES,
    SwordCoast.DEITYS, {}, SwordCoast.RACES
  );
  SRD5E.talentRules
    (rules, SwordCoast.FEATS, SwordCoast.FEATURES, SRD5E.GOODIES,
     SRD5E.LANGUAGES, SRD5E.SKILLS, SwordCoast.TOOLS);

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

SwordCoast.VERSION = '2.4.1.0';

SwordCoast.ARMORS_ADDED = {
  'Spiked Armor':'AC=4 Bulky=true Dex=2 Weight=Medium'
};
SwordCoast.ARMORS = Object.assign({}, (window.PHB5E||window.SRD5E).ARMORS, SwordCoast.ARMORS_ADDED);
SwordCoast.BACKGROUNDS_ADDED = {
  'City Watch':
    'Equipment=' +
      '"Uniform",Horn,"Manacles","10 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Choose 1 from Athletics, Investigation/Insight)",'+
      '"1:Language (Choose 2 from any)",' +
      '"1:Watcher\'s Eye"',
  'Clan Crafter':
    'Equipment=' +
      '"Artisan\'s Tools","Maker\'s Mark Chisel","Traveler\'s Clothes",' +
      '"15 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (History/Insight)",' +
      '"1:Tool Proficiency (Choose 1 from any Artisan)",' +
      '"1:Language (Choose 1 from any)",' +
      '"1:Respect Of The Stout Folk"',
  'Cloistered Scholar':
    'Equipment=' +
      '"Scholar\'s Robes","Writing Kit","Borrowed Book","10 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (History/Choose 1 from Arcana, Nature, Religion)",' +
      '"1:Language (Choose 2 from any)",' +
      '"1:Library Access"',
  'Courtier':
    'Equipment=' +
      '"Fine Clothes","5 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Insight/Persuasion)",' +
      '"1:Language (Choose 2 from any)",' +
      '"1:Court Functionary"',
  'Faction Agent':
    'Equipment=' +
      '"Faction Badge","Faction Book","Common Clothes","15 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Insight/Choose 1 from any)",' +
      '"1:Language (Choose 2 from any)",' +
      '"1:Safe Haven"',
  'Far Traveler':
    'Equipment=' +
      '"Traveler\'s Clothes","Musical Instrument or Gaming Set",' +
      'Maps,"15 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Insight/Perception)",' +
      '"1:Tool Proficiency (Choose 1 from any Game, any Music)",' +
      '"1:Language (Choose 1 from any)",' +
      '"1:All Eyes On You"',
  'Inheritor':
    'Equipment=' +
      '"Inheritance","Traveler\'s Clothes",Tool,"15 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Survival/Choose 1 from Arcana, History, Religion)",' +
      '"1:Tool Proficiency (Choose 1 from any Game, any Music)",' +
      '"1:Language (Choose 1 from any)",' +
      '"1:Inheritance"',
  'Knight Of The Order':
    'Equipment=' +
      '"Traveler\'s Clothes",Signet,"10 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Persuasion/Choose 1 from Arcana, History, Nature, Religion)",' +
      '"1:Tool Proficiency (Choose 1 from any Game, any Music)",' +
      '"1:Language (Choose 1 from any)",' +
      '"1:Knightly Regard"',
  'Mercenary Veteran':
    'Equipment=' +
      'Uniform,Insignia,"Gaming Set","10 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Athletics/Persuasion)",' +
      '"1:Tool Proficiency (Vehicles (Land)/Choose 1 from any Game)",' +
      '"1:Mercenary Life"',
  'Urban Bounty Hunter':
    'Equipment=' +
      'Clothes,"20 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Choose 2 from Deception, Insight, Persuasion, Stealth)",' +
      '"1:Tool Proficiency (Choose 2 from any Game, any Music, Thieves\' Tools)",' +
      '"1:Ear To The Ground"',
  'Uthgardt Tribe Memver':
    'Equipment=' +
      '"Hunting Map","Totem or tattoos","Traveler\'s Clothes","10 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (Athletics/Survival)",' +
      '"1:Tool Proficiency (Choose 1 from any Game, any Artisan)",' +
      '"1:Language (Choose 1 from any)",' +
      '"1:Uthgardt Heritage"',
  'Waterdhavian Noble':
    'Equipment=' +
      '"Fine Clothes","Signet Ring","Scroll Of Pedigree",' +
      '"Skin Of Fine Wine","20 GP" ' +
    'Features=' +
      '"1:Skill Proficiency (History/Persuasion)",' +
      '"1:Tool Proficiency (Choose 1 from any Game, any Music)",' +
      '"1:Language (Choose 1 from any)",' +
      '"1:Kept In Style"'
};
SwordCoast.BACKGROUNDS = Object.assign({}, (window.PHB5E||window.SRD5E).BACKGROUNDS, SwordCoast.BACKGROUNDS_ADDED);
SwordCoast.CLASSES_FEATURES_ADDED = {
  'Barbarian':
    '"features.Path Of The Battlerager ? 3:Battlerager Armor",' +
    '"features.Path Of The Battlerager ? 6:Reckless Abandon",' +
    '"features.Path Of The Battlerager ? 10:Battlerager Charge",' +
    '"features.Path Of The Battlerager ? 14:Spiked Retribution",' +
    '"features.Path Of The Totem Warrior (Elk) ? 3:Elk Totem Spirit",' +
    '"features.Path Of The Totem Warrior (Elk) ? 6:Aspect Of The Elk",' +
    '"features.Path Of The Totem Warrior (Elk) ? 14:Elk Totemic Attunement",' +
    '"features.Path Of The Totem Warrior (Tiger) ? 3:Tiger Totem Spirit",' +
    '"features.Path Of The Totem Warrior (Tiger) ? 6:Aspect Of The Tiger",' +
    '"features.Path Of The Totem Warrior (Tiger) ? 14:Tiger Totemic Attunement"',
  'Cleric':
    '"features.Arcana Domain ? 1:Skill Proficiency (Arcana)",' +
    '"features.Arcana Domain ? 1:Arcane Initiate",' +
    '"features.Arcana Domain ? 2:Arcane Abjuration",' +
    '"features.Arcana Domain ? 6:Spell Breaker",' +
    '"clericHasPotentSpellcasting ? 8:Potent Spellcasting",' +
    '"features.Arcana Domain ? 17:Arcane Mastery"',
  'Fighter':
    '"features.Purple Dragon Knight ? 3:Rallying Cry",' +
    '"features.Purple Dragon Knight ? 7:Royal Envoy",' +
    '"features.Purple Dragon Knight ? 10:Inspiring Surge",' +
    '"features.Purple Dragon Knight ? 15:Bulwark"',
  'Monk':
    '"features.Way Of The Long Death ? 3:Touch Of Death",' +
    '"features.Way Of The Long Death ? 6:Hour Of Reaping",' +
    '"features.Way Of The Long Death ? 11:Mastery Of Death",' +
    '"features.Way Of The Long Death ? 17:Touch Of The Long Death",' +
    // Copied from Xanathar
    '"features.Way Of The Sun Soul ? 3:Radiant Sun Bolt",' +
    '"features.Way Of The Sun Soul ? 6:Searing Arc Strike",' +
    '"features.Way Of The Sun Soul ? 11:Searing Sunburst",' +
    '"features.Way Of The Sun Soul ? 17:Sun Shield"',
  'Paladin':
    '"features.Oath Of The Crown ? 3:Champion Challenge",' +
    '"features.Oath Of The Crown ? 3:Turn The Tide",' +
    '"features.Oath Of The Crown ? 7:Divine Allegiance",' +
    '"features.Oath Of The Crown ? 15:Unyielding Spirit",' +
    '"features.Oath Of The Crown ? 20:Exalted Champion"',
  'Rogue': // Copied from Xanathar
    '"features.Mastermind ? 3:Master Of Intrigue",' +
    '"features.Mastermind ? 3:Master Of Tactics",' +
    '"features.Mastermind ? 9:Insightful Manipulator",' +
    '"features.Mastermind ? 13:Misdirection",' +
    '"features.Mastermind ? 17:Soul Of Deceit",' +
    '"features.Swashbuckler ? 3:Fancy Footwork",' +
    '"features.Swashbuckler ? 3:Rakish Audacity",' +
    '"features.Swashbuckler ? 9:Panache",' +
    '"features.Swashbuckler ? 13:Elegant Maneuver",' +
    '"features.Swashbuckler ? 17:Master Duelist"',
  'Sorcerer': // Copied from Xanathar
    '"features.Storm Sorcery ? 1:Wind Speaker",' +
    '"features.Storm Sorcery ? 1:Tempestuous Magic",' +
    '"features.Storm Sorcery ? 6:Heart Of The Storm",' +
    '"features.Storm Sorcery ? 6:Storm Guide",' +
    '"features.Storm Sorcery ? 14:Storm\'s Fury",' +
    '"features.Storm Sorcery ? 18:Wind Soul"',
  'Warlock':
    '"features.The Undying ? 1:Among The Dead",' +
    '"features.The Undying ? 6:Defy Death",' +
    '"features.The Undying ? 10:Undying Nature",' +
    '"features.The Undying ? 14:Indestructible Life"',
  'Wizard': // Copied from Tasha
    '"features.Bladesinging ? 2:Training In War And Song",' +
    '"features.Bladesinging ? 2:Bladesong",' +
    '"features.Bladesinging ? 6:Extra Attack",' +
    '"features.Bladesinging ? 10:Song Of Defense",' +
    '"features.Bladesinging ? 14:Song Of Victory"'
};
SwordCoast.CLASSES_SELECTABLES_ADDED = {
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
SwordCoast.CLASSES = Object.assign({}, (window.PHB5E||window.SRD5E).CLASSES);
for(let c in SwordCoast.CLASSES_FEATURES_ADDED) {
  SwordCoast.CLASSES[c] =
    SwordCoast.CLASSES[c].replace('Features=', 'Features=' + SwordCoast.CLASSES_FEATURES_ADDED[c] + ',');
}
for(let c in SwordCoast.CLASSES_SELECTABLES_ADDED) {
  SwordCoast.CLASSES[c] =
    SwordCoast.CLASSES[c].replace('Selectables=', 'Selectables=' + SwordCoast.CLASSES_SELECTABLES_ADDED[c] + ',');
}
SwordCoast.DEITYS = {

  // Faerun
  'Akadi':'Alignment=N Domain=Tempest',
  'Amaunator':'Alignment=LN Domain=Life,Light',
  'Asmodeus':'Alignment=LE Domain=Knowledge,Trickery',
  'Auril':'Alignment=NE Domain=Nature,Tempest',
  'Azuth':'Alignment=LN Domain=Arcana,Knowledge',
  'Bane':'Alignment=LE Domain=War',
  'Beshaba':'Alignment=CE Domain=Trickery',
  'Bhaal':'Alignment=NE Domain=Death',
  'Chauntea':'Alignment=NG Domain=Life',
  'Cyric':'Alignment=CE Domain=Trickery',
  'Deneir':'Alignment=NG Domain=Arcana,Knowledge',
  'Eldath':'Alignment=NG Domain=Life,Nature',
  'Gond':'Alignment=N Domain=Knowledge',
  'Grumbar':'Alignment=N Domain=Knowledge',
  'Gwaeron Windstrom':'Alignment=NG Domain=Knowledge,Nature',
  'Helm':'Alignment=LN Domain=Life,Light',
  'Hoar':'Alignment=LN Domain=War',
  'Ilmater':'Alignment=LG Domain=Life',
  'Istishia':'Alignment=N Domain=Tempest',
  'Jergal':'Alignment=LN Domain=Knowledge,Death',
  'Kelemvor':'Alignment=LN Domain=Death',
  'Kossuth':'Alignment=N Domain=Light',
  'Lathander':'Alignment=NG Domain=Life,Light',
  'Leira':'Alignment=CN Domain=Trickery',
  'Lliira':'Alignment=CG Domain=Life',
  'Loviatar':'Alignment=LE Domain=Death',
  'Malar':'Alignment=CE Domain=Nature',
  'Mask':'Alignment=CN Domain=Trickery',
  'Mielikki':'Alignment=NG Domain=Nature',
  'Milil':'Alignment=NG Domain=Light',
  'Myrkul':'Alignment=NE Domain=Death',
  'Mystra':'Alignment=NG Domain=Arcana,Knowledge',
  'Oghma':'Alignment=N Domain=Knowledge',
  'The Red Knight':'Alignment=LN Domain=War',
  'Savras':'Alignment=LN Domain=Arcana,Knowledge',
  'Selune':'Alignment=CG Domain=Knowledge,Life',
  'Shar':'Alignment=NE Domain=Death,Trickery',
  'Silvanus':'Alignment=N Domain=Nature',
  'Sune':'Alignment=CG Domain=Life,Light',
  'Talona':'Alignment=CE Domain=Death',
  'Talos':'Alignment=CE Domain=Tempest',
  'Tempus':'Alignment=N Domain=War',
  'Torm':'Alignment=LG Domain=War',
  'Tymora':'Alignment=CG Domain=Trickery',
  'Tyr':'Alignment=LG Domain=War',
  'Umberlee':'Alignment=CE Domain=Tempest',
  'Valkur':'Alignment=CG Domain=Tempest,War',
  'Waukeen':'Alignment=N Domain=Knowledge,Trickery',

  // Dwarven
  'Abbathor':'Alignment=NE Domain=Trickery',
  'Berronar Truesilver':'Alignment=LG Domain=Life,Light',
  'Clangeddin Silverbeard':'Alignment=LG Domain=War',
  'Deep Duerra':'Alignment=LE Domain=Arcana,War',
  'Dugmaren Brightmantle':'Alignment=CG Domain=Knowledge',
  'Dumathoin':'Alignment=N Domain=Death,Knowledge',
  'Gorm Gulthyn':'Alignment=LG Domain=War',
  'Haela Brightaxe':'Alignment=CG Domain=War',
  'Laduguer':'Alignment=LE Domain=Arcana,Death',
  'Marthammor Duin':'Alignment=NG Domain=Nature,Trickery',
  'Moradin':'Alignment=LG Domain=Knowledge',
  'Sharindlar':'Alignment=CG Domain=Life',
  'Vergadain':'Alignment=N Domain=Trickery',

  // Elven
  'Aerdrie Faenya':'Alignment=CG Domain=Tempest,Trickery',
  'Angharradh':'Alignment=CG Domain=Knowledge,Life',
  'Corellon Larethian':'Alignment=CG Domain=Arcana,Light',
  'Deep Sashelas':'Alignment=CG Domain=Nature,Tempest',
  'Erevan Ilesere':'Alignment=CN Domain=Trickery',
  'Fenmarel Mestarine':'Alignment=CN Domain=Trickery',
  'Hanali Celanil':'Alignment=CG Domain=Life',
  'Labelas Enoreth':'Alignment=CG Domain=Arcana,Knowledge',
  'Rillifane Rallathil':'Alignment=CG Domain=Nature',
  'Sehanine Moonbow':'Alignment=CG Domain=Knowledge',
  'Shevarash':'Alignment=CN Domain=War',
  'Solonor Thelandira':'Alignment=CG Domain=War',

  // Drow
  'Eilistraee':'Alignment=CG Domain=Light,Nature',
  'Kiaransalee':'Alignment=CE Domain=Arcana',
  'Lolth':'Alignment=CE Domain=Trickery',
  'Selvetarm':'Alignment=CE Domain=War',
  'Vhaeraun':'Alignment=CE Domain=Trickery',

  // Halfling
  'Arvoreen':'Alignment=LG Domain=War',
  'Brandobaris':'Alignment=N Domain=Trickery',
  'Cyrrollalee':'Alignment=LG Domain=Life',
  'Sheela Peryroyl':'Alignment=N Domain=Nature,Tempest',
  'Urogalan':'Alignment=LN Domain=Death,Knowledge',
  'Yondalla':'Alignment=LG Domain=Life',

  // Gnomish
  'Baervan Wildwanderer':'Alignment=NG Domain=Nature',
  'Baravar Cloakshadow':'Alignment=NG Domain=Arcana,Trickery',
  'Callarduran Smoothhands':'Alignment=N Domain=Knowledge,Nature',
  'Flandal Steelskin':'Alignment=NG Domain=Knowledge',
  'Gaerdal Ironhand':'Alignment=LG Domain=War',
  'Garl Glittergold':'Alignment=LG Domain=Trickery',
  'Nebelun':'Alignment=CG Domain=Knowledge,Trickery',
  'Segojan Earthcaller':'Alignment=NG Domain=Light',
  'Urdlen':'Alignment=CE Domain=Death,War',

  // Orc
  'Bahgtru':'Alignment=LE Domain=War',
  'Gruumsh':'Alignment=CE Domain=Tempest,War',
  'Ilneval':'Alignment=LE Domain=War',
  'Luthic':'Alignment=LE Domain=Life,Nature',
  'Shargaas':'Alignment=NE Domain=Trickery',
  'Yurtrus':'Alignment=NE Domain=Death'

};
SwordCoast.FEATS_ADDED = {
  'Svirfneblin Magic':'Require="race == \'Deep Gnome\'" Type=General'
};
SwordCoast.FEATS = Object.assign({}, (window.PHB5E||window.SRD5E).FEATS, SwordCoast.FEATS_ADDED);
SwordCoast.FEATURES_ADDED = {

  // Backgrounds
  'All Eyes On You':
    'Section=feature Note="May draw curiosity and interest from locals"',
  'Court Functionary':
    'Section=feature ' +
    'Note="Has knowledge of government bureaucracy and access to records"',
  'Ear To The Ground':
    'Section=feature Note="Has information contacts in every city"',
  'Inheritance':
    'Section=feature Note="Received a special item or knowledge from family"',
  'Kept In Style':'Section=feature Note="Daily expenses cost -2 GP"',
  'Knightly Regard':
    'Section=feature Note="May gain assistance from fellows and supporters"',
  'Library Access':
    'Section=feature ' +
    'Note="Has knowledge of cloister bureaucracy and broad access to libraries"',
  'Mercenary Life':
    'Section=feature Note="Has knowledge of mercenary companies and customs"',
  'Respect Of The Stout Folk':
    'Section=feature Note="May receive free accommodations from dwarves"',
  'Safe Haven':'Section=feature Note="Has contacts w/access to a safe house"',
  'Uthgardt Heritage':
    'Section=feature ' +
    'Note="My find dbl normal food and water when foraging/May receive assistance from tribes, Harpers, nomadic elves, and First Circle priests"',
  "Watcher's Eye":
    'Section=feature ' +
    'Note="May easily locate the local watch and criminal dens"',

  // Feats
  'Svirfneblin Magic':
    'Section=magic ' +
    'Note="May cast self <i>Nondetection</i> at will and <i>Blindness/Deafness</i>, <i>Blur</i>, and <i>Disguise Self</i> 1/long rest"',

  // Paths
  'Among The Dead':
    'Section=combat,magic,save ' +
    'Note=' +
      '"May divert attacks by undead to others (DC %{spellDifficultyClass.K} Wisdom neg)",' +
      '"Knows <i>Spare The Dying</i> cantrip",' +
      '"Adv on saves vs. disease" ' +
    'Spells="Spare The Dying"',
  'Arcana Domain':
    'Spells=' +
      '"1:Detect Magic","1:Magic Missile",' +
      '"2:Magic Weapon","2:Nystul\'s Magic Aura",' +
      '"3:Dispel Magic","3:Magic Circle",' +
      '"4:Arcane Eye","4:Leomund\'s Secret Chest",' +
      '"5:Planar Binding","5:Teleportation Circle"',
  'Arcane Abjuration':
    'Section=combat ' +
    'Note="R30\' May turn a celestial, elemental, fey, or fiend%{levels.Cleric>=5?\', banishing up to CR \'+(levels.Cleric>=8?(levels.Cleric-5)//3<?4:\'1/2\')+\',\':\'\'} (DC %{spellDifficultyClass.C} Wisdom neg) for 1 min"',
  'Arcane Initiate':
    'Section=magic,skill ' +
    'Note=' +
      '"Knows two wizard cantrips",' +
      '"Skill Proficiency (Arcana)"',
  'Arcane Mastery':
    'Section=magic ' +
    'Note="May add 1 each W6, W7, W8, and W9 spells as domain spells"',
  'Aspect Of The Elk':
    'Section=ability ' +
    'Note="R60\' Self and 10 allies may travel at dbl normal pace"',
  'Aspect Of The Tiger':
    'Section=skill ' +
    'Note="Skill Proficiency (Choose 2 from Athletics, Acrobatics, Stealth, Survival)"',
  'Battlerager Armor':
    'Section=combat ' +
    'Note="When wearing spiked armor during rage, may use a bonus action to make a spike attack that inflicts 1d4+%{strengthModifier} HP piercing, and grapple inflicts 3 HP piercing"',
  'Battlerager Charge':
    'Section=combat Note="May use a bonus action to Dash during rage"',
  'Bulwark':
    'Section=combat ' +
    'Note="R60\' Indomitable use on an Intelligence, Wisdom, or Charisma roll also allows an ally to reroll"',
  'Champion Challenge':
    'Section=combat ' +
    'Note="R30\' May use Channel Divinity to force targets to stay w/in 30\' of self (DC %{spellDifficultyClass.P} Wisdom neg)"',
  'Defy Death':
    'Section=combat,magic ' +
    'Note=' +
      '"Successful death saving throw restores 1d8+%{constitutionModifier>?1} HP 1/long rest",' +
      '"<i>Spare The Dying</i> restores 1d8+%{constitutionModifier>?1} HP 1/long rest"',
  'Divine Allegiance':
    'Section=combat Note="R5\' may shift another creature\'s damage to self"',
  'Elk Totem Spirit':
    'Section=ability Note="+15 Speed during rage (heavy armor neg)"',
  'Elk Totemic Attunement':
    'Section=combat ' +
    'Note="Charge inflicts 1d12+%{strengthModifier} HP bludgeoning and knocks prone (DC %{8+strengthModifier+proficiencyBonus} Strength neg)"',
  'Exalted Champion':
    'Section=combat,save ' +
    'Note=' +
      '"Resistance to non-magical bludgeoning, piercing, and slashing damage",' +
      '"R30\' Self and allies gain Adv on Wisdom and saves vs. Death"',
  'Hour Of Reaping':
    'Section=combat ' +
    'Note="R30\' May frighten all who can see self (DC %{kiSaveDC} Wisdom neg)"',
  'Indestructible Life':
    'Section=combat ' +
    'Note="May use a bonus action to regain 1d8+%{levels.Warlock} HP and reattach severed parts 1/short rest"',
  'Inspiring Surge':
    'Section=combat ' +
    'Note="R60\' When using Action Surge, may allow %{levels.Fighter<18?\'1 ally\':\'2 allies\'} to use Reaction to make a bonus attack"',
  'Mastery Of Death':
    'Section=combat ' +
    'Note="May spend 1 Ki Point to remain at 1 HP when reduced to 0 HP"',
  'Oath Of The Crown':
    'Spells=' +
      '1:Command,"1:Compelled Duel",' +
      '"2:Warding Bond","2:Zone Of Truth",' +
      '"3:Aura Of Vitality","3:Spirit Guardians",' +
      '4:Banishment,"4:Guardian Of Faith",' +
      '"5:Circle Of Power",5:Geas',
  'Rallying Cry':
    'Section=combat ' +
    'Note="R60\' Second Wind restores %{levels.Fighter} HP to 3 allies"',
  'Reckless Abandon':
    'Section=combat ' +
    'Note="Gains %{constitutionModifier>?1} temporary HP from Reckless Attack during rage"',
  'Royal Envoy':
    'Section=feature,skill ' +
    'Note=' +
      '"+%{proficiencyBonus} Persuasion",' +
      '"Skill Proficiency (Choose 1 from Animal Handling, Insight, Intimidation, Persuasion)"',
  'Spell Breaker':
    'Section=magic ' +
    'Note="Casting a healing spell also dispels a spell of equal or lesser level"',
  'Spiked Retribution':
    'Section=combat ' +
    'Note="When wearing spiked armor during rage, a successful melee attacker suffers 3 HP piercing"',
  'Tiger Totem Spirit':
    'Section=skill Note="+10\' long jump and +3\' high jump during rage"',
  'Tiger Totemic Attunement':
    'Section=combat ' +
    'Note="During rage, may use a bonus action to make a melee attack after a 20\' charge"',
  'Touch Of Death':
    'Section=combat ' +
    'Note="R5\' Gains %{levels.Monk+wisdomModifier>?1} temporary HP from reducing a foe to 0 HP"',
  'Touch Of The Long Death':
    'Section=combat ' +
    'Note="R5\' May spend 1-10 Ki Points to inflict 2d10 HP necrotic per (DC %{kiSaveDC} Constitution half) with touch"',
  'Turn The Tide':
    'Section=magic ' +
    'Note="R30\' May use Channel Divinity to restore 1d6+%{charismaModifier>?1} HP to targets w/fewer than half HP"',
  'Undying Nature':
    'Section=feature ' +
    'Note="Requires no breath, food, water, or sleep and ages at 1/10 rate"',
  'Unyielding Spirit':
    'Section=save Note="Adv on saves vs. paralysis and stunning"',

  // Races
  'Cantrip (Moon Elf)':'Section=Magic Note="Knows 1 Wizard cantrip"',
  'Cantrip (Sun Elf)':'Section=Magic Note="Knows 1 Wizard cantrip"',
  'Deep Gnome Ability Adjustment':
    'Section=ability Note="+1 Dexterity/+2 Intelligence"',
  'Duergar Magic':
    'Section=magic ' +
    'Note="May cast self <i>Enlarge/Reduce</i> (enlarge only)%{level<5?\'\':\' and <i>Invisibility</i>\'} 1/long rest" ' +
    'SpellAbility=Intelligence ' +
    'Spells=Enlarge/Reduce,5:Invisibility',
  'Duergar Resilience':
    'Section=save Note="Adv on saves vs. illusions, charm, and paralysis"',
  'Gold Dwarf Ability Adjustment':
    'Section=ability Note="+2 Constitution/+1 Wisdom"',
  'Gray Dwarf Ability Adjustment':
    'Section=ability Note="+2 Constitution/+1 Strength"',
  'Moon Elf Ability Adjustment':
    'Section=ability Note="+2 Dexterity/+1 Intelligence"',
  'Shield Dwarf Ability Adjustment':
    'Section=ability Note="+2 Constitution/+2 Strength"',
  'Stone Camouflage':
    'Section=Skill Note="Adv on Stealth to hide in rocky terrain"',
  'Strongheart Halfling Ability Adjustment':
    'Section=ability Note="+2 Dexterity/+1 Constitution"',
  'Sun Elf Ability Adjustment':
    'Section=ability Note="+2 Dexterity/+1 Intelligence"',

  // Copied from Tasha
  'Bladesong':
    'Section=ability,combat,feature,magic,skill ' +
    'Note=' +
      '"+10 Speed in light or no armor and no shield during Bladesong",' +
      '"+%{intelligenceModifier>?1} AC in light or no armor and no shield during Bladesong",' +
      '"May use a bonus action to gain Bladesong features for 1 min 2/short rest",' +
      '"+%{intelligenceModifier>?1} Constitution to retain spell concentration in light or no armor and no shield during Bladesong",' +
      '"Adv on Acrobatics in light or no armor and no shield during Bladesong"',
  'Song Of Defense':
    'Section=magic ' +
    'Note="During Bladesong, may use Reaction and expend a spell slot to reduce damage to self by 5x slot level"',
  'Song Of Victory':
    'Section=combat ' +
    'Note="+%{intelligenceModifier>?1} HP melee weapon damage during Bladesong"',
  'Training In War And Song':
    'Section=combat,skill ' +
    'Note=' +
      '"Armor Proficiency (Light)/Weapon Proficiency (Choose 1 from any One-Handed)",' +
      '"Skill Proficiency (Performance)"',

  // Copied from Xanathar
  'Elegant Maneuver':
    'Section=skill ' +
    'Note="May use a bonus action to gain Adv on next Acrobatics or Athletics for 1 rd"',
  'Fancy Footwork':
    'Section=combat ' +
    'Note="Attacked foe cannot make an OA against self for 1 rd"',
  'Heart Of The Storm':
    'Section=magic,save ' +
    'Note=' +
      '"10\' radius inflicts %{levels.Sorcerer//2} HP lightning or thunder on targets when casting a lightning or thunder spell",' +
      '"Resistance to lightning and thunder damage"',
  'Insightful Manipulator':
    'Section=feature ' +
    'Note="May learn 2 of relative Charisma, Intelligence, Wisdom, and levels of target after 1 min study"',
  'Master Duelist':
    'Section=combat Note="May reroll a miss with Adv 1/short rest"',
  'Master Of Intrigue':
    'Section=feature,skill ' +
    'Note=' +
      '"May mimic accent and speech patterns after listening for 1 min",' +
      '"Language (Choose 2 from any)/Tool Proficiency (Disguise Kit/Forgery Kit/Choose 1 from any Game)"',
  'Master Of Tactics':
    'Section=combat Note="R30\' May use Help as a bonus action"',
  'Misdirection':
    'Section=combat ' +
    'Note="May use Reaction to redirect an attack from self to a creature that provides cover"',
  'Panache':
    'Section=skill ' +
    'Note="Successful Persuasion vs. Insight gives hostile target Disadv on attacks on others (others attack ends) or charms a non-hostile target (damage ends) for 1 min"',
  'Radiant Sun Bolt':
    'Section=combat ' +
    'Note="R30\' +%{proficiencyBonus+dexterityModifier} ranged touch attack inflicts 1d%{combatNotes.martialArts}+%{dexterityModifier} HP radiant 1/rd (may spend 1 Ki Point and use a bonus action for a second attack)"',
  'Rakish Audacity':
    'Section=combat,combat ' +
    'Note=' +
      '"+%{charismaModifier} Initiative",' +
      '"May use Sneak Attack w/out Adv when target is only adjacent foe (Disadv neg)"',
  'Searing Arc Strike':
    'Section=magic ' +
    'Note="May spend 2-%{levels.Monk//2} Ki Points to cast <i>Burning Hands</i> after an attack as a bonus action" ' +
    'SpellAbility=Wisdom ' +
    'Spells="Burning Hands"',
  'Searing Sunburst':
    'Section=magic ' +
    'Note="R150\' 20\' radius inflicts 2d6 HP radiant (DC %{kiSaveDC} Constitution neg); may spend 1/2/3 Ki Points for +2/4/6d6 HP"',
  'Soul Of Deceit':
    'Section=save ' +
    'Note="Immune to telepathy, may use Deception vs. Insight to present false thoughts, and always detects as telling the truth"',
  'Storm Guide':
    'Section=magic ' +
    'Note="May stop rain in a 20\' radius or direct winds in a 100\' radius for 1 rd"',
  "Storm's Fury":
    'Section=combat ' +
    'Note="May use Reaction to inflict %{levels.Sorcerer} HP lightning and 20\' push on a successful melee attacker (DC %{spellDifficultyClass.S} Strength HP only)"',
  'Sun Shield':
    'Section=combat,magic ' +
    'Note=' +
      '"While emitting light, may use Reaction to inflict %{wisdomModifier+5} HP radiant on a successful melee attacker",' +
      '"May emit bright light in a 30\' radius at will"',
  'Tempestuous Magic':
    'Section=magic ' +
    'Note="May use a bonus action to fly 10\' before or after casting a spell w/out provoking an OA"',
  'Wind Soul':
    'Section=ability,magic,save ' +
    'Note=' +
      '"60\' fly Speed",' +
      '"R30\' May slow fly Speed to 30\' to give %{charismaModifier+3} others 30\' fly Speed for 1 hr 1/long rest",' +
      '"Immunity to lightning and thunder damage"',
  'Wind Speaker':
    'Section=skill Note="Language (Primordial/Aquan/Auran/Ignan/Terran)"'

};
SwordCoast.FEATURES =
  Object.assign({}, (window.PHB5E||window.SRD5E).FEATURES, SwordCoast.FEATURES_ADDED);
SwordCoast.RACES_ADDED = {
  'Deep Gnome':
    'Features=' +
      '"1:Language (Common/Gnomish/Undercommon)",' +
      '"1:Gnome Cunning","1:Deep Gnome Ability Adjustment",1:Slow,1:Small,' +
      '"1:Stone Camouflage","1:Superior Darkvision"',
  'Gray Dwarf':
    'Features=' +
      '"1:Language (Common/Dwarvish/Undercommon)",' +
      '"1:Tool Proficiency (Choose 1 from Brewer\'s Supplies, Mason\'s Tools, Smith\'s Tools)",' +
      '"1:Duergar Resilience","1:Dwarven Combat Training",' +
      '"1:Dwarven Resilience","1:Gray Dwarf Ability Adjustment",1:Slow,' +
      '1:Steady,1:Stonecunning,"1:Sunlight Sensitivity",' +
      '"1:Superior Darkvision","3:Duergar Magic"',
};
SwordCoast.RACES =
  Object.assign({}, (window.PHB5E||window.SRD5E).RACES, SwordCoast.RACES_ADDED);
if('Mountain Dwarf' in SwordCoast.RACES) {
  SwordCoast.RACES['Shield Dwarf'] = SwordCoast.RACES['Mountain Dwarf'].replaceAll('Mountain Dwarf', 'Shield Dwarf');
  delete SwordCoast.RACES['Mountain Dwarf'];
}
if('Hill Dwarf' in SwordCoast.RACES) {
  SwordCoast.RACES['Gold Dwarf'] = SwordCoast.RACES['Hill Dwarf'].replaceAll('Hill Dwarf', 'Gold Dwarf');
  delete SwordCoast.RACES['Hill Dwarf'];
}
if('High Elf' in SwordCoast.RACES) {
  SwordCoast.RACES['Moon Elf'] = SwordCoast.RACES['High Elf'].replaceAll('High Elf', 'Moon Elf');
  SwordCoast.RACES['Sun Elf'] = SwordCoast.RACES['High Elf'].replaceAll('High Elf', 'Sun Elf');
  delete SwordCoast.RACES['High Elf'];
}
if('Stout Halfling' in SwordCoast.RACES) {
  // Leave Stout Resilience feature as-is, since it's descriptive
  SwordCoast.RACES['Strongheart Halfling'] = SwordCoast.RACES['Stout Halfling'].replaceAll('Stout Halfling', 'Strongheart Halfling');
  delete SwordCoast.RACES['Stout Halfling'];
}
SwordCoast.SPELLS_ADDED = {
  // Copied from Tasha
  'Booming Blade':
    'School=Evocation ' +
    'Level=A0,K0,S0,W0 ' +
    'Description="Struck foe suffers %{(level+7)//6}d8 HP thunder on next move w/in 1 rd"',
  'Green-Flame Blade':
    'School=Evocation ' +
    'Level=A0,K0,S0,W0 ' +
    'Description="Struck foe suffers +%{(level+1)//6}d8 HP fire, and an adjacent target suffers %{(level+1)//6}d8+%{mdf} HP fire"',
  'Lightning Lure':
    'School=Evocation ' +
    'Level=A0,K0,S0,W0 ' +
    'Description="R15\' Pulls target 10\' and inflicts %{(level+5)//6}d8 HP lightning (Strength neg)"',
  'Sword Burst':
    'School=Conjuration ' +
    'Level=K0,S0,W0 ' +
    'Description="5\' radius inflicts %{(level+7)//6}d6 HP force (Dexterity neg)"'
};
SwordCoast.SPELLS_LEVELS_ADDED = {
  'False Life':'"K1 [The Undying]"',
  'Ray Of Sickness':'"K1 [The Undying]"',
  'Blindness/Deafness':'"K2 [The Undying]"',
  'Silence':'"K2 [The Undying]"',
  'Feign Death':'"K3 [The Undying]"',
  'Speak With Dead':'"K3 [The Undying]"',
  'Aura Of Life':'"K4 [The Undying]"',
  'Death Ward':'"K4 [The Undying]"',
  'Contagion':'"K5 [The Undying]"',
  'Legend Lore':'"K5 [The Undying]"'
};
SwordCoast.SPELLS = Object.assign({}, (window.PHB5E||window.SRD5E).SPELLS, SwordCoast.SPELLS_ADDED);
for(let s in SwordCoast.SPELLS_LEVELS_ADDED) {
  SwordCoast.SPELLS[s] =
    SwordCoast.SPELLS[s].replace('Level=', 'Level=' + SwordCoast.SPELLS_LEVELS_ADDED[s] + ',');
}
SwordCoast.TOOLS_ADDED = {
  'Birdpipes':'Type=Musical',
  'Glaur':'Type=Musical',
  'Hand Drum':'Type=Musical',
  'Longhorn':'Type=Musical',
  // In SRD5E 'Shawm':'Type=Musical',
  'Songhorn':'Type=Musical',
  'Tantan':'Type=Musical',
  'Thelarr':'Type=Musical',
  'Tocken':'Type=Musical',
  'Wargong':'Type=Musical',
  'Yarting':'Type=Musical',
  'Zulkoon':'Type=Musical'
};
SwordCoast.TOOLS = Object.assign({}, (window.PHB5E||window.SRD5E).TOOLS, SwordCoast.TOOLS_ADDED);

/*
 * Adds #name# as a possible user #type# choice and parses #attrs# to add rules
 * related to selecting that choice.
 */
SwordCoast.choiceRules = function(rules, type, name, attrs) {
  PHB5E.choiceRules(rules, type, name, attrs);
  if(type == 'Class')
    SwordCoast.classRulesExtra(rules, name);
  else if(type == 'Feat')
    SwordCoast.featRulesExtra(rules, name);
};

/*
 * Defines in #rules# the rules associated with path #name# that cannot be
 * derived directly from the attributes passed to pathRules.
 */
SwordCoast.classRulesExtra = function(rules, name) {

  let classLevel = 'levels.' + name;

  if(name == 'Barbarian') {
    rules.defineRule('features.Path Of The Totem Warrior',
      'features.Path Of The Totem Warrior (Elk)', '=', '1',
      'features.Path Of The Totem Warrior (Tiger)', '=', '1'
    );
  } else if(name == 'Cleric') {
    rules.defineRule
      ('clericHasPotentSpellcasting', 'features.Arcana Domain', '=', '1');
    rules.defineRule('spellSlots.W0', 'magicNotes.arcaneInitiate', '+=', '2');
    rules.defineRule('spellSlots.W6', 'magicNotes.arcaneMastery', '+=', '1');
    rules.defineRule('spellSlots.W7', 'magicNotes.arcaneMastery', '+=', '1');
    rules.defineRule('spellSlots.W8', 'magicNotes.arcaneMastery', '+=', '1');
    rules.defineRule('spellSlots.W9', 'magicNotes.arcaneMastery', '+=', '1');
    rules.defineRule('casterLevels.W', 'casterLevels.Arcana', '^=', null);
  } else if(name == 'Fighter') {
    rules.defineRule('featureNotes.royalEnvoy.1',
      'features.Royal Envoy', '?', null,
      'proficiencyBonus', '=', null
    );
    rules.defineRule
      ('skills.Persuasion', 'featureNotes.royalEnvoy.1', '+', null);
  } else if(name == 'Rogue') {
    rules.defineRule
      ('toolChoiceCount', 'skillNotes.masterOfIntrigue', '+=', '1');
  } else if(name == 'Wizard') {
    // Copied from Tasha
    rules.defineRule
      ('combatNotes.extraAttack', 'features.Bladesinging', '+=', '1');
  }

};

/*
 * Defines in #rules# the rules associated with feat #name# that cannot be
 * derived directly from the attributes passed to featRules.
 */
SwordCoast.featRulesExtra = function(rules, name) {
  if(name == 'Svirfneblin Magic') {
    SRD5E.featureSpells(
      rules, 'Svirfneblin Magic', 'W', 'level',
      ['Disguise Self,Blur,Blindness/Deafness,Nondetection']
    );
  }
};

/* Returns an array of plugins upon which this one depends. */
SwordCoast.getPlugins = function() {
  let result = [PHB5E, SRD5E];
  if(window.Tasha != null &&
     QuilvynUtils.getKeys(SwordCoast.rules.getChoices('selectableFeatures'), /Peace Domain/).length > 0)
    result.unshift(Tasha);
  if(window.Volo != null &&
     (Volo.CHARACTER_RACES_IN_PLAY || Volo.MONSTROUS_RACES_IN_PLAY))
    result.unshift(Volo);
  if(window.Xanathar != null &&
     QuilvynUtils.getKeys(SwordCoast.rules.getChoices('selectableFeatures'), /Forge Domain/).length > 0)
    result.unshift(Xanathar);
  return result;
};

/* Returns HTML body content for user notes associated with this rule set. */
SwordCoast.ruleNotes = function() {
  return '' +
    '<h2>Sword Coast Quilvyn Plugin Notes</h2>\n' +
    'Sword Coast Quilvyn Plugin Version ' + SwordCoast.VERSION + '\n' +
    '<p>\n' +
    'There are no known bugs, limitations, or usage notes specific to the Sword Coast Rule Set.\n' +
    '</p>\n' +
    '<h3>Copyrights and Licensing</h3>\n' +
    '<p>\n' +
    'Quilvyn\'s Sword Coast rule set is unofficial Fan Content permitted ' +
    'under Wizards of the Coast\'s ' +
    '<a href="https://company.wizards.com/en/legal/fancontentpolicy">Fan Content Policy</a>.\n' +
    '</p><p>\n' +
    'Quilvyn is not approved or endorsed by Wizards of the Coast. Portions ' +
    'of the materials used are property of Wizards of the Coast. ©Wizards of ' +
    'the Coast LLC.\n' +
    '</p><p>\n' +
    'Sword Coast Adventurer\'s Guide © 2015 Wizards of the Coast LLC.\n' +
    '</p><p>\n' +
    'Dungeons & Dragons Player\'s Handbook © 2014 Wizards of the Coast LLC.\n' +
    '</p>\n';
};
