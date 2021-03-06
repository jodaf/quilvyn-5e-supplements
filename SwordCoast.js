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
 * (BACKGROUNDS, PATHS, etc.) can be manipulated to modify the choices.
 */
function SwordCoast() {

  if(window.PHB5E == null) {
    alert('The SwordCoast module requires use of the PHB5E module');
    return;
  }

  var rules = new QuilvynRules('Sword Coast', SwordCoast.VERSION);
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

  SwordCoast.ARMORS = Object.assign({}, SRD5E.ARMORS, SwordCoast.ARMORS_ADDED);
  SwordCoast.BACKGROUNDS =
    Object.assign({}, PHB5E.BACKGROUNDS, SwordCoast.BACKGROUNDS_ADDED);
  SwordCoast.CLASSES = Object.assign({}, PHB5E.CLASSES);
  for(var c in SwordCoast.CLASSES_SELECTABLES_ADDED) {
    SwordCoast.CLASSES[c] =
      SwordCoast.CLASSES[c].replace('Selectables=', 'Selectables=' + SwordCoast.CLASSES_SELECTABLES_ADDED[c] + ',');
  }
  SwordCoast.FEATS = Object.assign({}, PHB5E.FEATS, SwordCoast.FEATS_ADDED);
  SwordCoast.FEATURES =
    Object.assign({}, PHB5E.FEATURES, SwordCoast.FEATURES_ADDED);
  SwordCoast.PATHS = Object.assign({}, PHB5E.PATHS, SwordCoast.PATHS_ADDED);
  SwordCoast.RACES = Object.assign({}, PHB5E.RACES, SwordCoast.RACES_ADDED);
  for(var r in SwordCoast.RACES_RENAMED) {
    for(var i = 0; i < SwordCoast.RACES_RENAMED[r].length; i++) {
      var newName = SwordCoast.RACES_RENAMED[r][i];
      SwordCoast.RACES[newName] = PHB5E.RACES[r].replaceAll(r, newName);
    }
    delete SwordCoast.RACES[r];
  }
  SwordCoast.SPELLS = Object.assign({}, PHB5E.SPELLS, SwordCoast.SPELLS_ADDED);
  for(var s in SwordCoast.SPELLS_LEVELS_ADDED) {
    SwordCoast.SPELLS[s] =
      SwordCoast.SPELLS[s].replace('Level=', 'Level=' + SwordCoast.SPELLS_LEVELS_ADDED[s] + ',');
  }
  SwordCoast.TOOLS = Object.assign({}, SRD5E.TOOLS, SwordCoast.TOOLS_ADDED);

  SRD5E.abilityRules(rules);
  SRD5E.combatRules(rules, SwordCoast.ARMORS, SRD5E.SHIELDS, SRD5E.WEAPONS);
  SRD5E.magicRules(rules, SRD5E.SCHOOLS, SwordCoast.SPELLS);
  SRD5E.identityRules(
    rules, SRD5E.ALIGNMENTS, SwordCoast.BACKGROUNDS, SwordCoast.CLASSES,
    SwordCoast.DEITIES, SwordCoast.PATHS, SwordCoast.RACES
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

SwordCoast.VERSION = '2.3.2.0';

SwordCoast.ARMORS_ADDED = {
  'Spiked Armor':'AC=4 Dex=2 Weight=2'
};
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
SwordCoast.DEITIES = {
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
  'Gond':'Alignment=N Domain=knowledge',
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
SwordCoast.FEATURES_ADDED = {

  // Backgrounds
  'All Eyes On You':'Section=feature Note="Curiosity and interest from locals"',
  'Court Functionary':
    'Section=feature ' +
    'Note="Knowledge of government bureaucracy, access to records"',
  'Ear To The Ground':
    'Section=feature Note="Information contacts in every city"',
  'Inheritance':'Section=feature Note="Special item or knowledge from family"',
  'Kept In Style':'Section=feature Note="-2 GP/dy expenses"',
  'Knightly Regard':
    'Section=feature Note="Assistance from fellows and supporters"',
  'Library Access':
    'Section=feature ' +
    'Note="Knowledge of cloister bureaucracy, broad access to libraries"',
  'Mercenary Life':
    'Section=feature Note="Knowledge of mercenary companies and customs"',
  'Respect Of The Stout Folk':
    'Section=feature Note="Free accommodations from dwarves"',
  'Safe Haven':'Section=feature Note="Contacts w/access to safe house"',
  'Uthgardt Heritage':
    'Section=feature ' +
    'Note="Dbl food and water from foraging, assistance from tribes, Harpers, nomadic elves, and First Circle priests"',
  "Watcher's Eye":
    'Section=feature Note="Easily find local watch and criminal dens"',

  // Feats
  'Svirfneblin Magic':
    'Section=magic ' +
    'Note="Self <i>Nondetection</i> at will, <i>Blindness/Deafness</i>, <i>Blur</i>, and <i>Disguise Self</i> 1/long rest"',

  // Paths
  'Among The Dead':
    'Section=combat,magic,save ' +
    'Note=' +
      '"Undead attacks diverted to others (DC %V Wis neg)",' +
      '"Know <i>Spare The Dying</i> cantrip",' +
      '"Adv on saves vs. disease"',
  'Arcane Abjuration':
    'Section=combat Note="R30\' Turn celestial, elemental, fey, or fiend%1 for 1 min (DC %V Wis neg)"',
  'Arcane Initiate':
    'Section=magic,skill ' +
    'Note="Learn two W0 spells","Skill Proficiency (Arcana)"',
  'Arcane Mastery':
    'Section=magic Note="Add 1 each W6, W7, W8, and W9 as domain spells"',
  'Aspect Of The Elk':
    'Section=ability Note="R60\' Self and 10 allies dbl travel pace"',
  'Aspect Of The Tiger':
    'Section=skill ' +
    'Note="Skill Proficiency (Choose 2 from Athletics, Acrobatics, Stealth, Survival)"',
  'Battlerager Armor':
    'Section=combat ' +
    'Note="When wearing spiked armor, bonus spike attack inflicts 1d4+%1 HP piercing during rage, grapple inflicts 3 HP piercing"',
  'Battlerager Charge':'Section=combat Note="Bonus Dash during rage"',
  'Bladesong':
    'Section=ability,combat,magic,skill ' +
    'Note=' +
      '"+10 Speed in light or no armor and no shield for 1 min 2/short rest",' +
      '"+%V AC in light or no armor and no shield for 1 min 2/short rest",' +
      '"+%V Concentration to retain spell in light or no armor and no shield for 1 min 2/short rest",' +
      '"Adv on Acrobatics in light or no armor and no shield for 1 min 2/short rest"',
  'Bulwark':
    'Section=combat ' +
    'Note="R60\' Indomitable use on Int, Wis, or Cha roll gives ally reroll"',
  'Champion Challenge':
    'Section=combat ' +
    'Note="R30\' Channel Divinity forces targets to stay w/in 30\' of self (DC %V Wis neg)"',
  'Defy Death':
    'Section=combat,magic ' +
    'Note=' +
      '"Successful death saving throw restores 1d8+%V HP 1/long rest",' +
      '"<i>Spare The Dying</i> restores 1d8+%V HP 1/long rest"',
  'Divine Allegiance':
    'Section=combat Note="R5\' Shift other creature\'s damage to self"',
  'Elegant Maneuver':
    'Section=skill Note="Bonus action for Adv on Acrobatics or Athletics"',
  'Elk Totem Spirit':
    'Section=ability Note="+15 Speed during rage (heavy armor neg)"',
  'Elk Totemic Attunement':
    'Section=combat ' +
    'Note="Charge inflicts 1d12+%V HP bludgeoning and knocks prone (DC %1 Str neg)"',
  'Exalted Champion':
    'Section=combat,save ' +
    'Note=' +
      '"Resistance to non-magical bludgeoning, piercing, and slashing damage",' +
      '"R30\' Self and allies Adv on Wisdom and saves vs. Death"',
  'Extra Attack':
    'Section=combat Note="+%V Attacks Per Round"',
  'Fancy Footwork':
    'Section=combat Note="Attacked foe cannot make OA against you for 1 rd"',
  'Heart Of The Storm':
    'Section=magic,save ' +
    'Note="R10\' Targets suffer %V HP lightning or thunder when self casts lightning or thunder spell",' +
         '"Resistance to lightning and thunder damage"',
  'Hour Of Reaping':
    'Section=combat ' +
    'Note="R30\' All who can see self frightened (DC %V Wis neg)"',
  'Indestructible Life':
    'Section=combat ' +
    'Note="Bonus action to regain 1d8+%V HP, reattach severed parts 1/short rest"',
  'Insightful Manipulator':
    'Section=feature ' +
    'Note="Learn 2 of relative Cha, Int, Wis, and levels of target after 1 min study"',
  'Inspiring Surge':
    'Section=combat Note="R60\' Action Surge gives bonus attack to %V ally"',
  'Master Duelist':'Section=combat Note="Reroll miss with Adv 1/short rest"',
  'Master Of Intrigue':
    'Section=feature,skill ' +
    'Note="Mimic accent and speech patterns after 1 min listening",' +
         '"Language (Choose 2 from any)/Tool Proficiency (Disguise Kit/Forgery Kit/Choose 1 from any Game)"',
  'Master Of Tactics':'Section=combat Note="R30\' Help as bonus action"',
  'Mastery Of Death':
    'Section=combat ' +
    'Note="Spend 1 Ki Point to remain at 1 HP when reduced to 0 HP"',
  'Misdirection':
    'Section=combat ' +
    'Note="Use Reaction to redirect attack on self to creature providing self cover"',
  'Panache':
    'Section=skill ' +
    'Note="Use Persuasion vs. Insight to give hostile target Disadv on attacks on others or charm non-hostile for 1 min"',
  'Radiant Sun Bolt':
    'Section=combat ' +
    'Note="R30\' Ranged touch attack at +%V inflicts 1d%1+%2 HP radiant 1/rd, spend 1 Ki Point for 2/rd"',
  'Rakish Audacity':
    'Section=combat ' +
    'Note="+%1 Initiative/Use Sneak Attack w/out Adv vs. solo foe"',
  'Rallying Cry':
    'Section=combat Note="R60\' Second Wind restores %V HP to 3 allies"',
  'Reckless Abandon':
    'Section=combat ' +
    'Note="Gain %V temporary HP from Reckless Attack during rage"',
  'Royal Envoy':
    'Section=feature,skill ' +
    'Note=' +
      '"Dbl proficiency on Persuasion",' +
      '"Skill Proficiency (Choose 1 from Animal Handling, Insight, Intimidation, Persuasion)"',
  'Searing Arc Strike':
    'Section=magic ' +
    'Note="Spend 2-%V Ki Points to cast <i>Burning Hands</i> after attack"',
  'Searing Sunburst':
    'Section=magic ' +
    'Note="R150\' 20\' radius inflicts 2d6 HP radiant (DC %V Con neg), spend 1-3 Ki Points for +2d6 HP radiant each"',
  'Song Of Defense':
    'Section=magic Note="During Bladesong, use Reaction and expend spell slot to reduce damage by 5x slot level"',
  'Song Of Victory':
    'Section=combat Note="+%V HP melee weapon damage during Bladesong"',
  'Soul Of Deceit':
    'Section=save ' +
    'Note="Immune to telepathy and truth compulsion, use Deception vs. Insight to present false thoughts"',
  'Spell Breaker':
    'Section=magic Note="Healing spell ends spell of equal or lesser level"',
  'Spiked Retribution':
    'Section=combat ' +
    'Note="When wearing spiked armor, successful melee attacker suffers 3 HP piercing during rage"',
  'Storm Guide':
    'Section=magic ' +
    'Note="Stop rain in 20\' radius or direct winds in 100\' radius for 1 rd"',
  "Storm's Fury":
    'Section=combat ' +
    'Note="Use Reaction to inflict %V HP lightning and 20\' push on successful melee attacker (DC %1 Str neg push)"',
  'Sun Shield':
    'Section=combat,magic ' +
    'Note="Use Reaction to inflict %V HP radiant on successful melee attacker",' +
         '"Emit bright light in 30\' radius at will"',
  'Tempestuous Magic':
    'Section=magic Note="Fly 10\' before or after casting spell level 1+"',
  'Tiger Totem Spirit':
    'Section=skill Note="+10\' long jump, +3\' high jump during rage"',
  'Tiger Totemic Attunement':
    'Section=combat Note="Bonus melee attack after 20\' charge during rage"',
  'Touch Of Death':
    'Section=combat ' +
    'Note="R5\' Reducing foe to 0 HP gives self %V temporary HP"',
  'Touch Of The Long Death':
    'Section=combat ' +
    'Note="R5\' Spend 1-10 Ki Points to inflict 2d10 HP necrotic per (DC %V Con half) with touch"',
  'Training In War And Song':
    'Section=combat,skill ' +
    'Note=' +
      '"Armor Proficiency (Light)/Weapon Proficiency (Choose 1 from any One-Handed)",' +
      '"Skill Proficiency (Performance)"',
  'Turn The Tide':
    'Section=magic ' +
    'Note="R30\' Channel Divinity restores 1d6+%V HP to targets w/fewer than half HP"',
  'Undying Nature':
    'Section=feature ' +
    'Note="Require no breath, food, water, or sleep and age at 1/10 rate"',
  'Unyielding Spirit':'Section=save Note="Adv on saves vs. paralysis and stunning"',
  'Wind Soul':
    'Section=ability,magic,save ' +
    'Note="60\' Fly",' +
         '"R30\' Self and %V others fly 30\' for 1 hr 1/long rest",' +
         '"Immunity to lightning and thunder damage"',
  'Wind Speaker':'Section=skill Note="Language (Primordial/Aquan/Auran/Ignan/Terran)"',

  // Races
  'Deep Gnome Ability Adjustment':
    'Section=ability Note="+1 Dexterity/+2 Intelligence"',
  'Duergar Magic':
    'Section=magic Note="Cast <i>Enlarge/Reduce</i> (enlarge only)%1 on self 1/long rest"',
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
  'Strongheart Halfling Resilience':
    'Section=save Note="Adv on saves vs. poison, resistance to poison damage"',
  'Sun Elf Ability Adjustment':
    'Section=ability Note="+2 Dexterity/+1 Intelligence"'

};
SwordCoast.PATHS_ADDED = {
  'Arcana Domain':
    'Group=Cleric Level=levels.Cleric ' +
    'Features=' +
      '"1:Skill Proficiency (Arcana)",' +
      '"1:Arcane Initiate","2:Arcane Abjuration","6:Spell Breaker",' +
      '"8:Potent Spellcasting","17:Arcane Mastery" ' +
    'Spells=' +
      '"1:Detect Magic,Magic Missile",' +
      '"2:Magic Weapon,Nystul\'s Magic Aura",' +
      '"3:Dispel Magic,Magic Circle",' +
      '"4:Arcane Eye,Leomund\'s Secret Chest",' +
      '"5:Planar Binding,Teleportation Circle"',
  'Bladesinging': // Copied from Tasha
    'Group=Wizard Level=levels.Wizard ' +
    'Features=' +
      '"2:Training In War And Song","2:Bladesong","6:Extra Attack",' +
      '"10:Song Of Defense","14:Song Of Victory"',
  'Mastermind': // Copied from Xanathar
    'Group=Rogue Level=levels.Rogue ' +
    'Features=' +
      '"3:Master Of Intrigue","3:Master Of Tactics",' +
      '"9:Insightful Manipulator","13:Misdirection","17:Soul Of Deceit"',
  'Oath Of The Crown':
    'Group=Paladin Level=levels.Paladin ' +
    'Features=' +
      '"3:Champion Challenge","3:Turn The Tide","7:Divine Allegiance",' +
      '"15:Unyielding Spirit","20:Exalted Champion" ' +
    'Spells=' +
      '"1:Command,Compelled Duel",' +
      '"2:Warding Bond,Zone Of Truth",' +
      '"3:Aura Of Vitality,Spirit Guardians",' +
      '"4:Banishment,Guardian Of Faith",' +
      '"5:Circle Of Power,Geas"',
  'Path Of The Battlerager':
    'Group=Barbarian Level=levels.Barbarian ' +
    'Features=' +
      '"3:Battlerager Armor","6:Reckless Abandon","10:Battlerager Charge",' +
      '"14:Spiked Retribution"',
  'Path Of The Totem Warrior (Elk)':
    'Group=Barbarian Level=levels.Barbarian ' +
    'Features=' +
      '"3:Spirit Seeker","3:Elk Totem Spirit","6:Aspect Of The Elk",' +
      '"10:Spirit Walker","14:Elk Totemic Attunement"',
  'Path Of The Totem Warrior (Tiger)':
    'Group=Barbarian Level=levels.Barbarian ' +
    'Features=' +
      '"3:Spirit Seeker","3:Tiger Totem Spirit","6:Aspect Of The Tiger",' +
      '"10:Spirit Walker","14:Tiger Totemic Attunement"',
  'Purple Dragon Knight':
    'Group=Fighter Level=levels.Fighter ' +
    'Features=' +
      '"3:Rallying Cry","7:Royal Envoy","10:Inspiring Surge","15:Bulwark"',
  'Storm Sorcery': // Copied from Xanathar
    'Group=Sorcerer Level=levels.Sorcerer ' +
    'Features=' +
      '"1:Wind Speaker","1:Tempestuous Magic","6:Heart Of The Storm",' +
      '"6:Storm Guide","14:Storm\'s Fury","18:Wind Soul"',
  'Swashbuckler': // Copied from Xanathar
    'Group=Rogue Level=levels.Rogue ' +
    'Features=' +
      '"3:Fancy Footwork","3:Rakish Audacity","9:Panache",' +
      '"13:Elegant Maneuver","17:Master Duelist"',
  'The Undying':
    'Group=Warlock Level=levels.Warlock ' +
    'Features=' +
      '"1:Among The Dead","6:Defy Death","10:Undying Nature",' +
      '"14:Indestructible Life"',
  'Way Of The Long Death':
    'Group=Monk Level=levels.Monk ' +
    'Features=' +
      '"3:Touch Of Death","6:Hour Of Reaping","11:Mastery Of Death",' +
      '"17:Touch Of The Long Death"',
  'Way Of The Sun Soul': // Copied from Xanathar
    'Group=Monk Level=levels.Monk ' +
    'Features=' +
      '"3:Radiant Sun Bolt","6:Searing Arc Strike","11:Searing Sunburst",' +
      '"17:Sun Shield"'
};
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
SwordCoast.RACES_RENAMED = {
  'Hill Dwarf':['Gold Dwarf'],
  'High Elf':['Moon Elf', 'Sun Elf'],
  'Mountain Dwarf':['Shield Dwarf'],
  'Stout Halfling':['Strongheart Halfling']
};
SwordCoast.SPELLS_ADDED = {
  // Copied from Tasha
  'Booming Blade':
    'School=Evocation ' +
    'Level=K0,S0,W0 ' +
    'Description="Struck foe suffers +%{(level+1)//6}d8 HP thunder and %{(level+1)//6+1}d8 HP thunder on move w/in 1 rd"',
  'Green-Flame Blade':
    'School=Evocation ' +
    'Level=K0,S0,W0 ' +
    'Description="Struck foe suffers +%Vd8 HP fire, R5\' target suffers %{(level+1)//6}d8+%{charismaModifier>?intelligenceModifier} HP fire"',
  'Lightning Lure':
    'School=Evocation ' +
    'Level=K0,S0,W0 ' +
    'Description="R15\' Pulls target 10\' and inflicts %{(level+5)//6}d8 HP lightning (Str neg)"',
  'Sword Burst':
    'School=Conjuration ' +
    'Level=K0,S0,W0 ' +
    'Description="5\' radius inflicts %{(level+5)//6}d6 HP force (Dex neg)"'
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
SwordCoast.TOOLS_ADDED = {
  'Birdpipes':'Type=Music',
  'Glaur':'Type=Music',
  'Hand Drum':'Type=Music',
  'Longhorn':'Type=Music',
  // In SRD5E 'Shawm':'Type=Music',
  'Songhorn':'Type=Music',
  'Tantan':'Type=Music',
  'Thelarr':'Type=Music',
  'Tocken':'Type=Music',
  'Wargong':'Type=Music',
  'Yarting':'Type=Music',
  'Zulkoon':'Type=Music'
};

/*
 * Adds #name# as a possible user #type# choice and parses #attrs# to add rules
 * related to selecting that choice.
 */
SwordCoast.choiceRules = function(rules, type, name, attrs) {
  PHB5E.choiceRules(rules, type, name, attrs);
  if(type == 'Feat')
    SwordCoast.featRulesExtra(rules, name);
  else if(type == 'Path')
    SwordCoast.pathRulesExtra(rules, name);
  else if(type == 'Race')
    SwordCoast.raceRulesExtra(rules, name);
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

/*
 * Defines in #rules# the rules associated with path #name# that cannot be
 * derived directly from the attributes passed to pathRules.
 */
SwordCoast.pathRulesExtra = function(rules, name) {

  var pathLevel =
    name.charAt(0).toLowerCase() + name.substring(1).replaceAll(' ', '') +
    'Level';

  if(name == 'Arcana Domain') {
    rules.defineRule
      ('combatNotes.arcaneAbjuration', 'spellDifficultyClass.C', '=', null);
    rules.defineRule('combatNotes.arcaneAbjuration.1',
      'features.Arcane Abjuration', '?', null,
      pathLevel, '=', 'source>=5 ? ", banish up to CR " + (source<8 ? "1/2" : source>=17 ? 4 : Math.floor((source - 5) / 3)) : ""'
    );
    rules.defineRule('spellSlots.W0', 'magicNotes.arcaneInitiate', '+=', '2');
    rules.defineRule('spellSlots.W6', 'magicNotes.arcaneMastery', '+=', '1');
    rules.defineRule('spellSlots.W7', 'magicNotes.arcaneMastery', '+=', '1');
    rules.defineRule('spellSlots.W8', 'magicNotes.arcaneMastery', '+=', '1');
    rules.defineRule('spellSlots.W9', 'magicNotes.arcaneMastery', '+=', '1');
    rules.defineRule('casterLevels.W', 'casterLevels.Arcana', '^=', null);
  } else if(name == 'Bladesinging') {
    // Copied from Tasha's
    // Have to hard-code these proficiencies, since featureRules only handles
    // notes w/a single type of granted proficiency
    rules.defineRule
      ('armorProficiency.Light', 'combatNotes.trainingInWarAndSong', '=', '1');
    rules.defineRule
      ('weaponChoiceCount', 'combatNotes.trainingInWarAndSong', '+=', '1');
    rules.defineRule('combatNotes.bladesong',
      'intelligenceModifier', '=', 'Math.max(source, 1)'
    );
    rules.defineRule('combatNotes.songOfVictory',
      'intelligenceModifier', '=', 'Math.max(source, 1)'
    );
    rules.defineRule('combatNotes.extraAttack', pathLevel, '+=', '1');
    rules.defineRule('magicNotes.bladesong',
      'intelligenceModifier', '=', 'Math.max(source, 1)'
    );
  } else if(name == 'Mastermind') {
    // Have to hard-code these proficiencies, since featureRules only handles
    // notes w/a single type of granted proficiency
    rules.defineRule
      ('toolProficiency.Disguise Kit', 'skillNotes.masterOfIntrigue', '=', '1');
    rules.defineRule
      ('toolProficiency.Forgery Kit', 'skillNotes.masterOfIntrigue', '=', '1');
    rules.defineRule
      ('toolChoiceCount', 'skillNotes.masterOfIntrigue', '+=', '1');
  } else if(name == 'Oath Of The Crown') {
    rules.defineRule('combatNotes.championChallenge',
      'spellDifficultyClass.P', '=', null
    );
    rules.defineRule('magicNotes.turnTheTide',
      'charismaModifier', '=', 'Math.max(source, 1)'
    );
  } else if(name == 'Path Of The Battlerager') {
    rules.defineRule('combatNotes.battleragerArmor.1',
      'features.Battlerager Armor', '?', null,
      'strengthModifier', '=', null
    );
    rules.defineRule('combatNotes.recklessAbandon',
      'constitutionModifier', '=', 'Math.max(source, 1)'
    );
  } else if(name == 'Path Of The Totem Warrior (Elk)') {
    rules.defineRule
      ('combatNotes.elkTotemicAttunement', 'strengthModifier', '=', null);
    rules.defineRule('combatNotes.elkTotemicAttunement.1',
      'features.Elk Totemic Attunement', '?', null,
      'strengthModifier', '=', '8 + source',
      'proficiencyBonus', '+', null
    );
  } else if(name == 'Purple Dragon Knight') {
    rules.defineRule
      ('combatNotes.inspiringSurge', pathLevel, '=', 'source>=18 ? 2 : 1');
    rules.defineRule('combatNotes.rallyingCry', pathLevel, '=', null);
    rules.defineRule('featureNotes.royalEnvoy.1',
      'features.Royal Envoy', '?', null,
      'proficiencyBonus', '=', null
    );
    rules.defineRule
      ('skills.Persuasion', 'featureNotes.royalEnvoy.1', '+', null);
  } else if(name == 'Storm Sorcery') {
    // Copied from Xanathar
    rules.defineRule("combatNotes.storm'sFury", pathLevel, '=', null);
    rules.defineRule("combatNotes.storm'sFury.1",
      "features.Storm's Fury", '?', null,
      'spellDifficultyClass.S', '=', null
    );
    rules.defineRule
      ('magicNotes.heartOfTheStorm', pathLevel, '=', 'Math.floor(source / 2)');
    rules.defineRule
      ('magicNotes.windSoul', 'charismaModifier', '=', '3 + source');
  } else if(name == 'Swashbuckler') {
    // Copied from Xanathar
    rules.defineRule('combatNotes.rakishAudacity.1',
      'features.Rakish Audacity', '?', null,
      'charismaModifier', '=', null
    );
    // Dummy rule to italicize combatNotes.rakishAudacity
    rules.defineRule('initiative', 'combatNotes.rakishAudacity', '+', '0');
  } else if(name == 'The Undying') {
    rules.defineRule
      ('combatNotes.amongTheDead', 'spellDifficultyClass.K', '=', null);
    rules.defineRule('combatNotes.defyDeath',
      'constitutionModifier', '=', 'Math.max(source, 1)'
    );
    rules.defineRule('combatNotes.indestructibleLife', pathLevel, '=', null);
    rules.defineRule('magicNotes.defyDeath',
      'constitutionModifier', '=', 'Math.max(source, 1)'
    );
    SRD5E.featureSpells
      (rules, 'Among The Dead', 'K', pathLevel, ['Spare The Dying']);
  } else if(name == 'Way Of The Long Death') {
    rules.defineRule('combatNotes.hourOfReaping', 'kiSaveDC', '=', null);
    rules.defineRule('combatNotes.touchOfDeath',
      pathLevel, '=', null,
      'wisdomModifier', '+', null,
      '', '^', '1'
    );
    rules.defineRule('combatNotes.touchOfTheLongDeath', 'kiSaveDC', '=', null);
  } else if(name == 'Way Of The Sun Soul') {
    // Copied from Xanathar
    rules.defineRule('combatNotes.radiantSunBolt',
      'proficiencyBonus', '=', null,
      'dexterityModifier', '+', null
    );
    rules.defineRule('combatNotes.radiantSunBolt.1',
      'features.Radiant Sun Bolt', '?', null,
      'combatNotes.martialArts', '=', null
    );
    rules.defineRule('combatNotes.radiantSunBolt.2',
      'features.Radiant Sun Bolt', '?', null,
      'dexterityModifier', '=', null
    );
    rules.defineRule
      ('combatNotes.sunShield', 'wisdomModifier', '=', 'source + 5');
    rules.defineRule
      ('magicNotes.searingArcStrike', pathLevel, '=', 'Math.floor(source / 2)');
    rules.defineRule('magicNotes.searingSunburst', 'kiSaveDC', '=', null);
    SRD5E.featureSpells
     (rules, 'Searing Arc Strike', 'W', pathLevel, ['Burning Hands']);
  }

};

/*
 * Defines in #rules# the rules associated with path #name# that cannot be
 * derived directly from the attributes passed to raceRules.
 */
SwordCoast.raceRulesExtra = function(rules, name) {

  var raceLevel =
    name.charAt(0).toLowerCase() + name.substring(1).replaceAll(' ', '') +
    'Level';

  if(name == 'Gray Dwarf') {
    rules.defineRule('magicNotes.duergarMagic.1',
      'features.Duergar Magic', '?', null,
      raceLevel, '=', 'source>=5 ? " and <i>Invisibility</i>" : ""'
    );
    SRD5E.featureSpells(
      rules, 'Duergar Magic', 'W', 'level', ['Enlarge/Reduce', '5:Invisibility']
    );
  }

};

/* Returns an array of plugins upon which this one depends. */
SwordCoast.getPlugins = function() {
  var result = [PHB5E, SRD5E];
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
    'of the materials used are property of Wizards of the Coast. ??Wizards of ' +
    'the Coast LLC.\n' +
    '</p><p>\n' +
    'Sword Coast Adventurer\'s Guide ?? 2015 Wizards of the Coast LLC.\n' +
    '</p><p>\n' +
    'Dungeons & Dragons Player\'s Handbook ?? 2014 Wizards of the Coast LLC.\n' +
    '</p>\n';
};
