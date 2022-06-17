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

  rules.defineChoice('choices', Eberron5E.CHOICES);
  rules.choiceEditorElements = SRD5E.choiceEditorElements;
  rules.choiceRules = Eberron5E.choiceRules;
  rules.editorElements = SRD5E.initialEditorElements();
  rules.getFormats = SRD5E.getFormats;
  rules.getPlugins = Eberron5E.getPlugins;
  rules.makeValid = SRD5E.makeValid;
  rules.randomizeOneAttribute = Eberron5E.randomizeOneAttribute;
  rules.defineChoice('random', Eberron5E.RANDOMIZABLE_ATTRIBUTES);
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
  if(window.Xanathar != null)
    Object.assign(Eberron5E.SPELLS, Xanathar.SPELLS);
  for(var s in Eberron5E.SPELLS_LEVELS_ADDED) {
    Eberron5E.SPELLS[s] =
      Eberron5E.SPELLS[s].replace('Level=', 'Level=' + Eberron5E.SPELLS_LEVELS_ADDED[s] + ',');
  }
  Eberron5E.TOOLS = Object.assign({}, SRD5E.TOOLS, Eberron5E.TOOLS_ADDED);

  SRD5E.abilityRules(rules);
  SRD5E.combatRules(rules, SRD5E.ARMORS, SRD5E.SHIELDS, SRD5E.WEAPONS);
  SRD5E.magicRules(rules, SRD5E.SCHOOLS, Eberron5E.SPELLS);
  Eberron5E.identityRules(
    rules, SRD5E.ALIGNMENTS, Eberron5E.BACKGROUNDS, Eberron5E.CLASSES,
    Eberron5E.DEITIES, Eberron5E.PATHS, Eberron5E.RACES, Eberron5E.HOUSES
  );
  SRD5E.talentRules
    (rules, Eberron5E.FEATS, Eberron5E.FEATURES, SRD5E.GOODIES,
     SRD5E.LANGUAGES, SRD5E.SKILLS, Eberron5E.TOOLS);

  rules.defineSheetElement('House', 'Background');
  rules.defineEditorElement
    ('house', 'House', 'select-one', 'houses', 'background');

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

Eberron5E.VERSION = '2.3.1.1';

Eberron5E.CHOICES = [].concat(SRD5E.CHOICES, 'House');
Eberron5E.RANDOMIZABLE_ATTRIBUTES =
  [].concat(SRD5E.RANDOMIZABLE_ATTRIBUTES, 'house');

Eberron5E.BACKGROUNDS_ADDED = {
  'House Agent':
    'Equipment=' +
      '"Fine Clothes","House Signet Ring","Identification Papers","20 GP" ' +
    'Features=' +
      '"Skill Proficiency (Investigation/Persuasion)",' +
      '"House Connections","House Tool Proficiency"'
};
Eberron5E.CLASSES_ADDED = {
  // Copied from Tasha's
  'Artificer':
    'HitDie=d8 ' +
    'Features=' +
      '"1:Armor Proficiency (Medium/Shield)",' +
      '"1:Save Proficiency (Constitution/Intelligence)",' +
      '"1:Skill Proficiency (Choose 2 from Arcana, History, Investigation, Medicine, Nature, Perception, Sleight Of Hand)",' +
      '"1:Tool Proficiency (Thieves\' Tools/Tinker\'s Tools/Choose 1 from any Artisan)",' +
      '"1:Weapon Proficiency (Simple)",' +
      '"1:Magical Tinkering","1:Ritual Casting",1:Spellcasting,' +
      '"2:Infuse Item","3:The Right Tool For The Job","6:Tool Expertise",' +
      '"7:Flash Of Genius","10:Magic Item Adept","11:Spell-Storing Item",' +
      '"14:Magic Item Savant","18:Magic Item Master","20:Soul Of Artifice" ' +
    'Selectables=' +
      '"3:Alchemist:Specialist",' +
      // '"3:Armorer:Specialist",' + Tasha's addition
      '"3:Artillerist:Specialist",' +
      '"3:Battle Smith:Specialist",' +
      // '"3:Guardian Armor:Armor Model",' + Tasha's addition
      // '"3:Infiltrator Armor:Armor Model",' + Tasha's addition
      // '"14:Arcane Propulsion Armor:Infusion",' + Tasha's addition
      // '"2:Armor Of Magical Strength:Infusion",' + Tasha's addition
      '"6:Boots Of The Winding Path:Infusion",' +
      '"2:Enhanced Arcane Focus:Infusion",' +
      '"2:Enhanced Defense:Infusion",' +
      '"2:Enhanced Weapon:Infusion",' +
      // '"10:Helm Of Awareness:Infusion",' + Tasha's addition
      '"2:Homunculus Servant:Infusion",' +
      // '"2:Mind Sharpener:Infusion",' + Tasha's addition
      '"6:Radiant Weapon:Infusion",' +
      '"2:Repeating Shot:Infusion",' +
      '"2:Replicate Magic Item:Infusion",' +
      '"6:Repulsion Shield:Infusion",' +
      '"6:Resistant Armor:Infusion",' +
      '"2:Returning Weapon:Infusion" ' +
      // '"6:Spell-Refueling Ring:Infusion" ' + Tasha's addition
    'CasterLevelArcane=levels.Artificer ' +
    'SpellAbility=intelligence ' +
    'SpellSlots=' +
      'A0:1=2;10=3;14=4,' +
      'A1:1=2;3=3;5=4,' +
      'A2:5=2;7=3,' +
      'A3:9=2;11=3,' +
      'A4:13=1;15=2;17=3,' +
      'A5:17=1;19=2'
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
  'Aberrant Dragonmark':'Require="race !~ \'Mark Of\'" Type=General',
  'Revenant Blade':'Require="race =~ \'Elf\'" Type=General'
};
Eberron5E.FEATURES_ADDED = {

  // Backgrounds
  'House Connections':
    'Section=feature Note="Obtain food and lodging at house enclave"',

  // Classes
  // Copied from Tasha's
  'Boots Of The Winding Path':
    'Section=magic Note="Gives ability to teleport 15\'"',
  'Enhanced Arcane Focus':
    'Section=magic ' +
    'Note="Rod, staff, or wand gives +%V spell attacks, ignores half cover"',
  'Enhanced Defense':'Section=magic Note="Shield or armor gives +%V AC"',
  'Enhanced Weapon':'Section=magic Note="Gives +%V attack and damage"',
  'Flash Of Genius':
    'Section=feature ' +
    'Note="R30\' Use Reaction to give ally +%{intelligenceModifier} on ability check or saving throw %{intelligenceModifier>?1}/long rest"',
  'Homunculus Servant':
    'Section=magic ' +
    'Note="Creates mechanical companion (AC 13, HP %{levels.Artificer+intelligenceModifier+1}, Attack R30\' +%1 inflicts 1d4+%2 HP force, Evasion, Channel Magic) that obeys self"',
  'Infuse Item':'Section=feature Note="%V selections infused into %1 items"',
  'Magic Item Adept':
    'Section=feature ' +
    'Note="Attune %V items at once, craft uncommon magic items in one quarter time at half cost"',
  'Magic Item Master':'Section=feature Note="Attune 6 items at once"',
  'Magic Item Savant':
    'Section=feature ' +
    'Note="Attune 5 items at once and ignore attunement and use requirements"',
  'Magical Tinkering':
    'Section=magic ' +
    'Note="Imbue %{intelligenceModifier>?1} objects with light, message, sound, odor, or picture"',
  'Radiant Weapon':
    'Section=magic ' +
    'Note="Gives +1 attack and damage, 30\' bright light, blinds successful attacker (DC %{spellDifficultyClass.A} Con neg) for 1 rd; 4 charges regains 1d4/dy"',
  'Repeating Shot':
    'Section=magic Note="Gives +1 attack and damage and unlimited ammunition"',
  'Replicate Magic Item':
    'Section=magic Note="Allows replication of wondrous item"',
  'Repulsion Shield':
    'Section=magic ' +
    'Note="Gives +1 AC, use Reaction to push successful attacker 15\'; 4 charges regains 1d4/dy"',
  'Resistant Armor':
    'Section=magic Note="Gives +1 AC and resistance to chosen damage type"',
  'Returning Weapon':
    'Section=magic ' +
    'Note="Gives +1 attack and damage, returns after ranged attack"',
  'Soul Of Artifice':
    'Section=combat,save ' +
    'Note="End 1 attunement when reduced to 0 HP to retain 1 HP",' +
         '"+1 per attunement on saves"',
  'Spell-Storing Item':
    'Section=feature ' +
    'Note="After a long rest, store A1 or A2 spell in item to be cast %{intelligenceModifier*2>?2} times"',
  'The Right Tool For The Job':
    'Section=feature Note="Spend 1 hr to create 1 set of artisan\'s tools"',
  'Tool Expertise':'Section=feature Note="Dbl proficiency when using tools"',

  // Feats
  'Aberrant Dragonmark':
    'Section=ability,feature,magic ' +
    'Note="+1 Constitution",' +
         '"Develop Aberrant Dragonmark flaw",' +
         '"Know S0 cantrip, casting chosen S1 spell 1/long rest gives self 1d temporary HP or inflicts 1d HP force randomly w/in 30\'"',
  'Revenant Blade':
    'Section=ability,combat ' +
    'Note="Ability Boost (Choose 1 from Dexterity, Strength)",' +
         '"+1 AC when wielding double-bladed scimitar, weapon can be used one- or two-handed"',

  // Paths
  // Copied from Tasha's
  'Alchemical Savant':
    'Section=magic ' +
    'Note="+%{intelligenceModifier>?1} on spell healing and acid, fire, necrotic, or poison damage"',
  'Alchemist Tool Proficiency':
    'Section=feature Note="Tool Proficiency (Alchemist\'s Supplies)"',
  'Arcane Firearm':
    'Section=magic ' +
    'Note="Spells cast through prepared wand, staff, or rod inflict +1d8 HP damage"',
  'Arcane Jolt':
    'Section=combat ' +
    'Note="Magic weapon or Steel Defender attack inflicts +%Vd6 HP force or heals 1 target in 30\' radius %Vd6 HP %{intelligenceModifier>?1}/long rest"',
  'Artillerist Tool Proficiency':
    'Section=feature Note="Tool Proficiency (Woodcarver\'s Tools)"',
  'Battle Ready':
    'Section=combat,feature ' +
    'Note="+%{intelligenceModifier-strengthModifier} (Int instead of Str) or +%{intelligenceModifier-dexterityModifier} (Int instead of Dex) attack and damage w/magic weapons",' +
         '"Weapon Proficiency (Martial)"',
  'Battle Smith Tool Proficiency':
    'Section=feature Note="Tool Proficiency (Smith\'s Tools)"',
  'Chemical Mastery':
    'Section=magic,save ' +
    'Note="Cast <i>Greater Restoration</i> and <i>Heal</i> 1/long rest",' +
         '"Resistance to acid and poison damage, immune to poisoned condition"',
  'Eldritch Cannon':
    'Section=combat ' +
    'Note="Create magical, AC 18, %{levels.Artificer*5} HP (<i>Mending</i> repairs 2d6 HP), MV 15\' flamethrower (15\' cone inflicts %Vd8 HP fire (DC %1 Dex half)), force ballista (R120\' inflicts %Vd8 force and pushes 5\'), or protector (R10\' targets gain 1d8+%{intelligenceModifier>?1} temporary HP) for 1 hr"',
  'Experimental Elixir':
    'Section=magic ' +
    'Note="After a long rest, use alchemist\'s supplies to create %V elixirs of healing, swiftness, resilience, boldness, flight, or transformation (spend spell slot for additional)"',
  'Explosive Cannon':
    'Section=combat ' +
    'Note="Eldritch Cannon +1d8 HP damage, command explosion to inflict 3d8 HP force (DC %V Dex half) in 20\' radius"',
  'Fortified Position':
    'Section=combat ' +
    'Note="Create 2nd Eldritch Cannon, gain half cover w/in 10\' of Eldritch Cannon"',
  'Improved Defender':
    'Section=combat ' +
    'Note="+2d6 Arcane Jolt effect, Steel Defender +2 AC and Deflect Attack inflicts 1d4+%{intelligenceModifier} HP force"',
  'Restorative Reagents':
    'Section=magic ' +
    'Note="Cast <i>Lesser Restoration</i> %{intelligenceModifier>?1}/long rest, elixirs give 2d6+%{intelligenceModifier>?1} temporary HP"',
  'Steel Defender':
    'Section=combat ' +
    'Note="Create mechanical companion (AC %V, HP %{levels.Artificer*5+intelligenceModifier+2} (<i>Mending</i> repairs 2d6 HP, self-repair 2d8+%1 3/dy), Attack +%2 inflicts 1d8+%1, use Reaction for R5\' Deflect Attack (inflicts Disadv on attack), MV 40\', Dex Save +%3, Con save +%4, immune to poison and charmed, exhausted, poisoned, and surprised conditions)"',

  // Races
  "Artisan's Intuition":
    'Section=skill Note="+1d4 on Arcana and Artisan\'s Tools checks"',
  'Beasthide Ability Adjustment':
    'Section=ability Note="+2 Constitution/+1 Strength"',
  'Beasthide Shifting':'Section=combat Note="+1 AC while shifting"',
  'Changeling Ability Adjustment':
    'Section=ability Note="+2 Charisma/Ability Boost (Choose 1 from any)"',
  'Changeling Instincts':
    'Section=feature ' +
    'Note="Skill Proficiency (Choose 2 from Deception, Insight, Intimidation, Persuasion)"',
  'Changeling Shapechanger':
    'Section=ability Note="Use Action to change appearance and voice"',
  'Constructed Resilience':
    'Section=feature,save ' +
    'Note="No need to eat, drink, breathe, or sleep",' +
         '"Adv on saving throws vs. poison, resistance to poison damage, immune to disease and sleep"',
  "Courier's Speed":'Section=ability Note="+5 Speed"',
  'Cunning Intuition':
    'Section=skill Note="+1d4 on Performance and Stealth checks"',
  'Deductive Intuition':
    'Section=skill Note="+1d4 on Investigation and Insight checks"',
  'Detection Ability Adjustment':
    'Section=ability Note="+2 Wisdom/Ability Boost (Choose 1 from any)"',
  'Detection Spells':'Section=magic Note="Access to additional spells"',
  'Dual Mind':'Section=save Note="Adv on Wis saving throws"',
  'Ever Hospitable':
    'Section=skill Note="+1d4 on Persuasion, Brewer\'s Supplies, and Cook\'s Utensil\'s checks"',
  'Fierce':'Section=feature Note="Skill Proficiency (Intimidation)"',
  "Finder's Magic":
    'Section=magic ' +
    'Note="Cast <i>Hunter\'s Mark</i>%{level<3?\'\':\' and <i>Locate Object</i>\'} 1/long rest"',
  'Finding Ability Adjustment':
    'Section=ability Note="+2 Wisdom/+1 Constitution"',
  'Finding Spells':'Section=magic Note="Access to additional spells"',
  'Gifted Scribe':
    'Section=skill Note="+1d4 on History and Calligrapher\'s Supplies checks"',
  'Graceful':'Section=feature Note="Skill Proficiency (Acrobatics)"',
  "Guardian's Shield":'Section=magic Note="Cast <i>Shield</i> 1/long rest"',
  'Handling Ability Adjustment':
    'Section=ability Note="+2 Wisdom/Ability Boost (Choose 1 from any)"',
  'Handling Spells':'Section=magic Note="Access to additional spells"',
  'Headwinds':
    'Section=magic ' +
    'Note="Know <i>Gust</i> cantrip%{level<3?\'\':\', cast <i>Gust Of Wind</i> 1/long rest\'}"',
  'Healing Ability Adjustment':'Section=ability Note="+2 Dexterity/+1 Wisdom"',
  'Healing Spells':'Section=magic Note="Access to additional spells"',
  'Healing Touch':
    'Section=magic ' +
    'Note="Cast <i>Cure Wounds</i>%{level<3?\'\':\' and <i>Lesser Restoration</i>\'} 1/long rest"',
  'Hospitality Ability Adjustment':
    'Section=ability Note="+2 Dexterity/+1 Charisma"',
  'Hospitality Spells':'Section=magic Note="Access to additional spells"',
  "Hunter's Intuition":
    'Section=skill Note="+1d4 on Perception and Survival checks"',
  "Innkeeper's Magic":
    'Section=magic ' +
    'Note="Know <i>Prestidigitation</i> cantrip, cast <i>Purify Food And Drink</i> and <i>Unseen Servant</i> 1/long rest"',
  'Integrated Protection':
    'Section=combat,feature ' +
    'Note="+1 AC","1 hr required to put on or take off armor"',
  'Intuitive Motion':
    'Section=skill Note="+1d4 on Acrobatics and Land Vehicle checks"',
  'Kalashtar Ability Adjustment':'Section=ability Note="+2 Wisdom/+1 Charisma"',
  'Longtooth Ability Adjustment':
    'Section=ability Note="+2 Strength/+1 Dexterity"',
  'Longtooth Shifting':
    'Section=combat ' +
    'Note="Bonus fangs attack inflicts 1d6+%{strengthModifier} HP piercing damage while shifting"',
  'Magical Detection':
    'Section=magic ' +
    'Note="Cast <i>Detect Magic</i>%{level<3?\' and\':\',\'} <i>Detect Poison And Disease</i>%{level<3?\'\':\', and <i>See Invisibility</i>\'} 1/long rest"',
  'Magical Passage':'Section=magic Note="Cast <i>Misty Step</i> 1/long rest"',
  "Maker's Gift":
    'Section=feature Note="Tool Proficiency (Choose 1 from any Artisan)"',
  'Making Ability Adjustment':
    'Section=ability Note="+2 Intelligence/Ability Boost (Choose 1 from any)"',
  'Making Spells':'Section=magic Note="Access to additional spells"',
  'Medical Intuition':
    'Section=skill Note="+1d4 on Medicine and Herbalism Kit checks"',
  'Mental Discipline':'Section=save Note="Resistance to psychic damage"',
  'Mind Link':
    'Section=feature ' +
    'Note="R%{level*10}\' Telepathic communication w/1 target for 1 hr"',
  'Natural Athlete':'Section=feature Note="Skill Proficiency (Athletics)"',
  'Natural Tracker':'Section=feature Note="Skill Proficiency (Survival)"',
  'Passage Ability Adjustment':
    'Section=ability Note="+2 Dexterity/Ability Boost (Choose 1 from any)"',
  'Passage Spells':'Section=magic Note="Access to additional spells"',
  'Primal Connection':
    'Section=magic ' +
    'Note="Cast <i>Animal Friendship</i> and <i>Speak With Animals</i> 1/long rest"',
  'Primal Intuition':
    'Section=feature ' +
    'Note="Skill Proficiency (Choose 2 from Animal Handling, Insight, Intimidation, Medicine, Nature, Perception, Survival)"',
  "Scribe's Insight":
    'Section=magic ' +
    'Note="Know <i>Message</i> cantrip, cast <i>Comprehend Languages</i>%{level<3?\'\':\' and <i>Magic Mouth</i>\'} 1/long rest"',
  'Scribing Ability Adjustment':
    'Section=ability Note="+2 Intelligence/+1 Charisma"',
  'Scribing Spells':'Section=magic Note="Access to additional spells"',
  'Sentinel Ability Adjustment':
    'Section=ability Note="+2 Constitution/+1 Wisdom"',
  'Sentinel Spells':'Section=magic Note="Access to additional spells"',
  "Sentinel's Intuition":
    'Section=skill Note="+1d4 on Insight and Perception checks"',
  "Sentry's Rest":'Section=feature Note="Inert 6 hr during long rest"',
  'Severed From Dreams':'Section=save Note="Immune to dream effects"',
  'Shadow Ability Adjustment':'Section=ability Note="+2 Dexterity/+1 Charisma"',
  'Shadow Spells':'Section=magic Note="Access to additional spells"',
  'Shape Shadows':
    'Section=magic ' +
    'Note="Know <i>Minor Illusion</i> cantrip%{level<3?\'\':\', cast <i>Invisibility</i> 1/long rest\'}"',
  'Shifting':
    'Section=feature ' +
    'Note="Assume bestial appearance, gaining %1%{(level+constitutionModifier)>?1} temporary HP, for 1 min 1/short rest"',
  'Specialized Design':
    'Section=feature ' +
    'Note="Skill Proficiency (Choose 1 from any)/Tool Proficiency (Choose 1 from any)"',
  'Spellsmith':
    'Section=magic ' +
    'Note="Know <i>Mending</i> cantrip, cast <i>Magic Weapon</i> w/1 hr duration 1/long rest"',
  'Storm Ability Adjustment':'Section=ability Note="+2 Charisma/+1 Dexterity"',
  'Storm Spells':'Section=magic Note="Access to additional spells"',
  "Storm's Boon":'Section=save Note="Resistance to lightning damage"',
  'Swiftstride Ability Adjustment':
    'Section=ability Note="+2 Dexterity/+1 Charisma"',
  'Swiftstride Shifting':
    'Section=ability,combat ' +
    'Note="+10 Speed while shifting",' +
         '"Use Reaction to move 10\' w/out OA when creature ends turn w/in 5\'"',
  'The Bigger They Are':
    'Section=magic ' +
    'Note="Use Primal Connection on monstrous creatures with intelligence up to 3"',
  'Vigilant Guardian':
    'Section=combat ' +
    'Note="R5\' Use Reaction to swap places with and take damage for struck creature 1/long rest"',
  "Warder's Intuition":
    'Section=skill Note="+1d4 on Investigation and Thieves\' Tools checks"',
  'Warding Ability Adjustment':
    'Section=ability Note="+2 Constitution/+1 Intelligence"',
  'Warding Spells':'Section=magic Note="Access to additional spells"',
  'Wards And Seals':
    'Section=magic ' +
    'Note="Cast <i>Alarm</i>%{level<3?\' and\':\',\'} <i>Magic Armor</i>%{level<3?\'\':\', and <i>Arcane Lock</i>\'} 1/long rest"',
  'Warforged Ability Adjustment':
    'Section=ability Note="+2 Constitution/Ability Boost (Choose 1 from any)"',
  'Wild Intuition':
    'Section=skill Note="+1d4 on Animal Handling and Nature checks"',
  'Wildhunt Ability Adjustment':'Section=ability Note="+2 Wisdom/+1 Dexterity"',
  'Wildhunt Shifting':
    'Section=ability,combat ' +
    'Note="Adv on Wis checks while shifting",' +
         '"R30\' no foe Adv on self attack while shifting"',
  "Windwright's Intuition":
    'Section=skill Note="+1d4 on Acrobatics and Navigator\'s Tools checks"',
  // Copied from Volo's
  'Aggressive':
    'Section=combat Note="Bonus action to move up to %{speed}\' toward foe"',
  'Bugbear Ability Adjustment':
    'Section=ability Note="+2 Strength/+1 Dexterity"',
  'Fury Of The Small':
    'Section=combat Note="+%{level} HP damage to larger creature 1/short rest"',
  'Goblin Ability Adjustment':
    'Section=ability Note="+2 Dexterity/+1 Constitution"',
  'Hobgoblin Ability Adjustment':
    'Section=ability Note="+2 Constitution/+1 Intelligence"',
  'Long-Limbed':'Section=combat Note="+5\' melee reach"',
  'Martial Training':
    'Section=feature ' +
    'Note="Armor Proficiency (Light)/Weapon Proficiency (Choose 2 from any Martial)"',
  'Nimble Escape':'Section=combat Note="Bonus action to Disengage or Hide"',
  'Orc Ability Adjustment':
    // Removed Volo's -2 Intelligence"',
    'Section=ability Note="+2 Strength/+1 Constitution"',
  'Powerful Build':'Section=ability Note="x2 Carry/x2 Lift"',
  'Saving Face':
    'Section=feature ' +
    'Note="Gain +1 for each ally w/in 30\' (+5 maximum) on failed roll 1/short rest"',
  'Sneaky':'Section=skill Note="Skill Proficiency (Stealth)"',
  'Surprise Attack':
    'Section=combat Note="+2d6 HP damage on first surprise hit"'

};
Eberron5E.HOUSES = {
  'None':
    'Dragonmark=None',
  'Cannith':
    'Dragonmark=Making ' +
    'Race=Human ' +
    'Tool="Alchemist\'s Supplies","Tinker\'s Tools" ' +
    'Spells=' +
      '"Identify,Tenser\'s Floating Disk",' +
      '"Continual Flame,Magic Weapon",' +
      '"Conjure Barrage,Elemental Weapon",' +
      '"Fabricate,Stone Shape",' +
      '"Creation"',
  'Deneith':
    'Dragonmark=Sentinel ' +
    'Race=Human ' +
    'Tool="Choose 1 from any Game","Vehicles (Land)" ' +
    'Spells=' +
      '"Compelled Duel,Shield Of Faith",' +
      '"Warding Bond,Zone Of Truth",' +
      '"Counterspell,Protection From Energy",' +
      '"Death Ward,Guardian Of Faith",' +
      '"Bigby\'s Hand"',
  'Ghallanda':
    'Dragonmark=Hospitality ' +
    'Race=Halfling ' +
    'Tool="Brewer\'s Supplies","Cook\'s Utensils" ' +
    'Spells=' +
      '"Goodberry,Sleep",' +
      '"Aid,Calm Emotions",' +
      '"Create Food And Water,Leomund\'s Tiny Hut",' +
      '"Aura Of Purity,Mordenkainen\'s Private Sanctum",' +
      '"Hallow"',
  'Jorasco':
    'Dragonmark=Healing ' +
    'Race=Halfling ' +
    'Tool="Alchemist\'s Supplies","Herbalism Kit" ' +
    'Spells=' +
      '"Cure Wounds,Healing Word",' +
      '"Lesser Restoration,Prayer Of Healing",' +
      '"Aura Of Vitality,Mass Healing Word",' +
      '"Aura Of Purity,Aura Of Life",' +
      '"Greater Restoration"',
  'Kundarak':
    'Dragonmark=Warding ' +
    'Race=Dwarf ' +
    'Tool="Thieves\' Tools","Tinker\'s Tools" ' +
    'Spells=' +
      '"Alarm,Armor Of Agathys",' +
      '"Arcane Lock,Knock",' +
      '"Glyph Of Warding,Magic Circle",' +
      '"Leomund\'s Secret Chest,Mordenkainen\'s Faithful Hound",' +
      '"Antilife Shell"',
  'Lyrandar':
    'Dragonmark=Storm ' +
    'Race=Half-Elf ' +
    'Tool="Navigator\'s Tools","Vehicles (Air And Sea)" ' +
    'Spells=' +
      '"Feather Fall,Fog Cloud",' +
      '"Gust Of Wind,Levitate",' +
      '"Sleet Storm,Wind Wall",' +
      '"Conjure Minor Elementals,Control Water",' +
      '"Conjure Elemental"',
  'Medani':
    'Dragonmark=Detection ' +
    'Race=Half-Elf ' +
    'Tool="Disguise Kit","Thieves\' Tools" ' +
    'Spells=' +
      '"Detect Evil And Good,Detect Poison And Disease",' +
      '"Detect Thoughts,Find Traps",' +
      '"Clairvoyance,Nondetection",' +
      '"Arcane Eye,Divination",' +
      '"Legend Lore"',
  'Orien':
    'Dragonmark=Passage ' +
    'Race=Human ' +
    'Tool="Choose 1 from any Game","Vehicles (Land)" ' +
    'Spells=' +
      '"Expeditious Retreat,Jump",' +
      '"Misty Step,Pass Without Trace",' +
      '"Blink,Phantom Steed",' +
      '"Dimension Door,Freedom Of Movement",' +
      '"Teleportation Circle"',
  'Phiarlan':
    'Dragonmark=Shadow ' +
    'Race=Elf ' +
    'Tool="Disguise Kit","Choose 1 from any Music" ' +
    'Spells=' +
      '"Disguise Self,Silent Image",' +
      '"Darkness,Pass Without Trace",' +
      '"Clairvoyance,Major Image",' +
      '"Greater Invisibility,Hallucinatory Terrain",' +
      '"Mislead"',
  'Sivis':
    'Dragonmark=Scribing ' +
    'Race=Gnome ' +
    'Tool="Calligrapher\'s Tools","Forgery Kit" ' +
    'Spells=' +
      '"Comprehend Languages,Illusory Script",' +
      '"Animal Messenger,Silence",' +
      '"Sending,Tongues",' +
      '"Arcane Eye,Confusion",' +
      '"Dream"',
  'Tharashk':
    'Dragonmark=Finding ' +
    'Race=Half-Orc,Human ' +
    'Tool="Choose 1 from any Game","Thieves\' Tools" ' +
    'Spells=' +
      '"Faerie Fire,Longstrider",' +
      '"Locate Animals Or Plants,Locate Object",' +
      '"Clairvoyance,Speak With Plants",' +
      '"Divination,Locate Creature",' +
      '"Commune With Nature"',
  'Thuranni':
    'Dragonmark=Shadow ' +
    'Race=Elf ' +
    'Tool="Choose 1 from any Music","Poisoner\'s Kit"',
  'Vadalis':
    'Dragonmark=Handling ' +
    'Race=Human ' +
    'Tool="Herbalism Kit","Vehicles (Land)" ' +
    'Spells=' +
      '"Animal Friendship,Speak With Animals",' +
      '"Beast Sense,Calm Emotions",' +
      '"Beacon Of Hope,Conjure Animals",' +
      '"Aura Of Life,Dominate Beast",' +
      '"Awaken"',
};
Eberron5E.PATHS_ADDED = {
  // Copied from Tasha's
  'Alchemist':
    'Group=Artificer Level=levels.Artificer ' +
    'Features=' +
      '"3:Alchemist Tool Proficiency","3:Experimental Elixir",' +
      '"features.Guardian Armor ? 3:Thunder Gauntlets",' +
      '"features.Guardian Armor ? 3:Defensive Field",' +
      '"features.Infiltrator Armor ? 3:Lightning Launcher",' +
      '"features.Infiltrator Armor ? 3:Powered Steps",' +
      '"features.Infiltrator Armor ? 3:Dampening Field",' +
      '"5:Alchemical Savant","9:Restorative Reagents","15:Chemical Mastery" ' +
    'Spells=' +
      '"3:Healing Word,Ray Of Sickness",' +
      '"5:Flaming Sphere,Melf\'s Acid Arrow",' +
      '"9:Gaseous Form,Mass Healing Word",' +
      '"13:Blight,Death Ward",' +
      '"17:Cloudkill,Raise Dead"',
  'Artillerist':
    'Group=Artificer Level=levels.Artificer ' +
    'Features=' +
      '"3:Artillerist Tool Proficiency","3:Eldritch Cannon",' +
      '"5:Arcane Firearm","9:Explosive Cannon","15:Fortified Position" ' +
    'Spells=' +
      '"3:Shield,Thunderwave",' +
      '"5:Scorching Ray,Shatter",' +
      '"9:Fireball,Wind Wall",' +
      '"13:Ice Storm,Wall Of Fire",' +
      '"17:Cone Of Cold,Wall Of Force"',
  'Battle Smith':
    'Group=Artificer Level=levels.Artificer ' +
    'Features=' +
      '"3:Battle Ready","3:Battle Smith Tool Proficiency","3:Steel Defender",' +
      '"5:Extra Attack","9:Arcane Jolt","15:Improved Defender" ' +
    'Spells=' +
      '"3:Heroism,Shield",' +
      '"5:Branding Smite,Warding Bond",' +
      '"9:Aura Of Vitality,Conjure Barrage",' +
      '"13:Aura Of Purity,Fire Shield",' +
      '"17:Banishing Smite,Mass Cure Wounds"'
};
Eberron5E.RACES_ADDED = {
  'Changeling':
    'Features=' +
      '"Changeling Ability Adjustment","Changeling Instincts",' +
      '"Changeling Shapechanger" ' +
    'Languages=Common,any,any',
  'Kalashtar':
    'Features=' +
      '"Dual Mind","Kalashtar Ability Adjustment","Mental Discipline",' +
      '"Mind Link","Severed From Dreams" ' +
    'Languages=Common,Quori,any',
  'Beasthide Shifter':
    'Features=' +
      'Darkvision,"Beasthide Ability Adjustment","Beasthide Shifting",' +
      'Shifting,"Natural Athlete" ' +
    'Languages=Common',
  'Longtooth Shifter':
    'Features=' +
      'Darkvision,Fierce,"Longtooth Ability Adjustment","Longtooth Shifting",' +
      'Shifting ' +
    'Languages=Common',
  'Swiftstride Shifter':
    'Features=' +
      'Darkvision,Graceful,Shifting,"Swiftstride Ability Adjustment",' +
      '"Swiftstride Shifting" ' +
    'Languages=Common',
  'Wildhunt Shifter':
    'Features=' +
      'Darkvision,"Natural Tracker",Shifting,"Wildhunt Ability Adjustment",' +
      '"Wildhunt Shifting" ' +
    'Languages=Common',
  'Warforged':
    'Features=' +
      '"Constructed Resilience","Integrated Protection","Sentry\'s Rest",' +
      '"Specialized Design","Warforged Ability Adjustment" ' +
    'Languages=Common,any',
  'Mark Of Detection Half-Elf':
    SRD5E.RACES['Half-Elf']
      .replace('Half-Elf Ability', 'Detection Ability')
      .replace('Skill Versatility', 'Deductive Intuition","Detection Spells","Magical Detection'),
  'Mark Of Finding Half-Orc':
    'Features=' +
      '"Finding Ability Adjustment",Darkvision,"Hunter\'s Intuition",' +
      '"Finder\'s Magic","Finding Spells" ' +
    'Languages=Common,Goblin',
  'Mark Of Finding Human':
    'Features=' +
      '"Finding Ability Adjustment",Darkvision,"Hunter\'s Intuition",' +
      '"Finder\'s Magic","Finding Spells" ' +
    'Languages=Common,Goblin',
  'Mark Of Handling Human':
    'Features=' +
      '"Handling Ability Adjustment","Handling Spells","Primal Connection",' +
      '"Wild Intuition","3:The Bigger They Are" ' +
    'Languages=Common,any',
  'Mark Of Healing Halfling':
    'Features=' +
      'Brave,"Halfling Nimbleness","Lucky Halfling",Slow,Small,' +
      '"Healing Ability Adjustment","Healing Spells","Healing Touch",' +
      '"Medical Intuition" ' +
    'Languages=Common,Halfling',
  'Mark Of Hospitality Halfling':
    'Features=' +
      'Brave,"Halfling Nimbleness","Lucky Halfling",Slow,Small,' +
      '"Ever Hospitable","Hospitality Ability Adjustment",' +
      '"Hospitality Spells","Innkeeper\'s Magic" ' +
    'Languages=Common,Halfling',
  'Mark Of Making Human':
    'Features=' +
      '"Making Ability Adjustment","Artisan\'s Intuition","Maker\'s Gift",' +
      '"Making Spells",Spellsmith ' +
    'Languages=Common,any',
  'Mark Of Passage Human':
    'Features=' +
      '"Passage Ability Adjustment","Courier\'s Speed","Intuitive Motion",' +
      '"Magical Passage","Passage Spells" ' +
    'Languages=Common,any',
  'Mark Of Scribing Gnome':
    'Features=' +
      'Darkvision,"1:Gnome Cunning","Scribing Ability Adjustment",Slow,Small,' +
      '"Gifted Scribe","Scribe\'s Insight","Scribing Spells" ' +
    'Languages=Common,Gnomish',
  'Mark Of Sentinel Human':
    'Features=' +
      '"Sentinel Ability Adjustment","Guardian\'s Shield",' +
      '"Sentinel Spells","Sentinel\'s Intuition","Vigilant Guardian" ' +
    'Languages=Common,any',
  'Mark Of Shadow Elf':
    'Features=' +
      'Darkvision,"Elf Weapon Training","Fey Ancestry","Keen Senses",Trance,' +
      '"Cunning Intuition","Shadow Ability Adjustment","Shadow Spells",' +
      '"Shape Shadows" ' +
    'Languages=Common,Elvish',
  'Mark Of Storm Half-Elf':
    SRD5E.RACES['Half-Elf']
      .replace('Half-Elf Ability', 'Storm Ability')
      .replace('Skill Versatility', 'Headwinds","Storm Spells","Storm\'s Boon","Windwright\'s Intuition'),
  'Mark Of Warding Dwarf':
    'Features=' +
      '"Tool Proficiency (Choose 1 from Brewer\'s Supplies, Mason\'s Tools, Smith\'s Tools)",' +
      'Darkvision,"Dwarven Combat Training","Dwarven Resilience",Slow,Steady,' +
      'Stonecunning,"Warding Ability Adjustment","Warder\'s Intuition",' +
      '"Warding Spells","Wards And Seals" ' +
    'Languages=Common,Dwarvish',
  // Copied from Volo's
  'Bugbear':
    'Features=' +
      '"Bugbear Ability Adjustment",Darkvision,Long-Limbed,"Powerful Build",' +
      'Sneaky,"Surprise Attack" ' +
    'Languages=Common,Goblin',
  'Goblin':
    'Features=' +
      'Darkvision,"Fury Of The Small","Goblin Ability Adjustment",' +
      '"Nimble Escape",Small ' +
    'Languages=Common,Goblin',
  'Hobgoblin':
    'Features=' +
      'Darkvision,"Hobgoblin Ability Adjustment","Martial Training",' +
      '"Saving Face" ' +
    'Languages=Common,Goblin',
  'Orc': // Primal Intuition replaces Volo's Menacing
    'Features=' +
      'Aggressive,Darkvision,"Orc Ability Adjustment","Powerful Build",' +
      '"Primal Intuition" ' +
    'Languages=Common,Orc'
};
Eberron5E.SPELLS_ADDED = {
  // Copied from Xanathar's
  'Gust':
    'School=Transmutation ' +
    'Level=D0,S0,W0 ' +
    'Description="R30\' Push creature 5\' (Str neg) or object 10\', or create light breeze"'
};
Eberron5E.SPELLS_LEVELS_ADDED = {

  'Acid Splash':'A0',
  'Dancing Lights':'A0',
  'Fire Bolt':'A0',
  'Guidance':'A0',
  'Light':'A0',
  'Mage Hand':'A0',
  'Mending':'A0',
  'Message':'A0',
  'Poison Spray':'A0',
  'Prestidigitation':'A0',
  'Ray Of Frost':'A0',
  'Resistance':'A0',
  'Shocking Grasp':'A0',
  'Spare The Dying':'A0',
  'Thorn Whip':'A0',

  'Alarm':'A1',
  'Cure Wounds':'A1',
  'Detect Magic':'A1',
  'Disguise Self':'A1',
  'Expeditious Retreat':'A1',
  'Faerie Fire':'A1',
  'False Life':'A1',
  'Feather Fall':'A1',
  'Grease':'A1',
  'Identify':'A1',
  'Jump':'A1',
  'Longstrider':'A1',
  'Purify Food And Drink':'A1',
  'Sanctuary':'A1',

  'Aid':'A2',
  'Alter Self':'A2',
  'Arcane Lock':'A2',
  'Blur':'A2',
  'Continual Flame':'A2',
  'Darkvision':'A2',
  'Enhance Ability':'A2',
  'Enlarge/Reduce':'A2',
  'Heat Metal':'A2',
  'Invisibility':'A2',
  'Lesser Restoration':'A2',
  'Levitate':'A2',
  'Magic Mouth':'A2',
  'Magic Weapon':'A2',
  'Protection From Poison':'A2',
  'Rope Trick':'A2',
  'See Invisibility':'A2',
  'Spider Climb':'A2',
  'Web':'A2',

  'Blink':'A3',
  'Create Food And Water':'A3',
  'Dispel Magic':'A3',
  'Elemental Weapon':'A3',
  'Fly':'A3',
  'Glyph Of Warding':'A3',
  'Haste':'A3',
  'Protection From Energy':'A3',
  'Revivify':'A3',
  'Water Breathing':'A3',
  'Water Walk':'A3',

  'Arcane Eye':'A4',
  'Fabricate':'A4',
  'Freedom Of Movement':'A4',
  "Leomund's Secret Chest":'A4',
  "Mordenkainen's Faithful Hound":'A4',
  "Mordenkainen's Private Sanctum":'A4',
  "Otiluke's Resilient Sphere":'A4',
  'Stone Shape':'A4',
  'Stoneskin':'A4',

  'Animate Objects':'A5',
  "Bigby's Hand":'A5',
  'Creation':'A5',
  'Greater Restoration':'A5',
  'Wall Of Stone':'A5'

};
if(window.Xanathar != null) {
  Object.assign(Eberron5E.SPELLS_LEVELS_ADDED, {
    'Create Bonfire':'A0',
    'Frostbite':'A0',
    'Magic Stone':'A0',
    'Thunderclap':'A0',
    'Absorb Elements':'A1',
    'Catapult':'A1',
    'Snare':'A1',
    'Pyrotechnics':'A2',
    'Catnap':'A3',
    'Flame Arrows':'A3',
    'Tiny Servant':'A3',
    'Elemental Bane':'A4',
    'Skill Empowerment':'A5',
    'Wall Of Stone':'A5'
  });
}
Eberron5E.TOOLS_ADDED = {
  'Vehicles (Air And Sea)':'Type=General'
};

/* Defines rules related to basic character identity. */
Eberron5E.identityRules = function(
  rules, alignments, backgrounds, classes, deities, paths, races, houses
) {
  SRD5E.identityRules(
    rules, SRD5E.ALIGNMENTS, Eberron5E.BACKGROUNDS, Eberron5E.CLASSES,
    Eberron5E.DEITIES, Eberron5E.PATHS, Eberron5E.RACES
  );
  QuilvynUtils.checkAttrTable(houses, ['Dragonmark', 'Race', 'Tool', 'Spells']);
  for(var h in houses)
    rules.choiceRules(rules, 'House', h, houses[h]);
};

/*
 * Adds #name# as a possible user #type# choice and parses #attrs# to add rules
 * related to selecting that choice.
 */
Eberron5E.choiceRules = function(rules, type, name, attrs) {
  if(type == 'House') {
    Eberron5E.houseRules(rules, name,
      QuilvynUtils.getAttrValue(attrs, 'Dragonmark'),
      QuilvynUtils.getAttrValueArray(attrs, 'Race'),
      QuilvynUtils.getAttrValueArray(attrs, 'Tool'),
      QuilvynUtils.getAttrValueArray(attrs, 'Spells')
    );
    rules.addChoice('houses', name, attrs);
  } else {
    PHB5E.choiceRules(rules, type, name, attrs);
  }
  if(type == 'Class')
    Eberron5E.classRulesExtra(rules, name);
  else if(type == 'Feat')
    Eberron5E.featRulesExtra(rules, name);
  else if(type == 'Path')
    Eberron5E.pathRulesExtra(rules, name);
  else if(type == 'Race')
    Eberron5E.raceRulesExtra(rules, name);
};

/*
 * Defines in #rules# the rules associated with class #name# that cannot be
 * derived directly from the attributes passed to classRules.
 */
Eberron5E.classRulesExtra = function(rules, name) {

  // Copied from Tasha's
  var classLevel = 'levels.' + name;

  if(name == 'Artificer') {
    rules.defineRule('featureNotes.infuseItem',
      classLevel, '=', 'source>=2 ? Math.floor((source+6)/4)*2 : null'
    );
    rules.defineRule('featureNotes.infuseItem.1',
      'featureNotes.infuseItem', '=', 'source / 2',
      'featureNotes.armorModifications', '+', '2'
    );
    rules.defineRule('featureNotes.magicItemAdept',
      classLevel, '=', '4',
      'featureNotes.magicItemSavant', '^', '5',
      'featureNotes.magicItemMaster', '^', '6'
    );
    rules.defineRule('magicNotes.enhancedArcaneFocus',
      'levels.Artificer', '=', 'source<10 ? 1 : 2'
    );
    rules.defineRule('magicNotes.enhancedDefense',
      'levels.Artificer', '=', 'source<10 ? 1 : 2'
    );
    rules.defineRule('magicNotes.enhancedWeapon',
      'levels.Artificer', '=', 'source<10 ? 1 : 2'
    );
    rules.defineRule('magicNotes.experimentalElixir',
      classLevel, '=', 'Math.floor(( source + 12) / 9)'
    );
    rules.defineRule('magicNotes.homunculusServant.1',
      'features.Homunculus Servant', '?', null,
      // Tasha 'spellAttackModifier.A', '=', null
      'proficiencyBonus', '=', 'source + 2' // See Might of the Master
    );
    rules.defineRule('magicNotes.homunculusServant.2',
      'features.Homunculus Servant', '?', null,
      'proficiencyBonus', '=', null // Same as Tasha due to Might of the Master
    );
    rules.defineRule('selectableFeatureCount.Artificer (Infusion)',
      'featureNotes.infuseItem', '=', null
    );
    rules.defineRule('selectableFeatureCount.Artificer (Specialist)',
      classLevel, '=', 'source>=3 ? 1 : null'
    );
    SRD5E.featureSpells
      (rules, 'Restorative Reagents', 'A', null, ['Lesser Restoration']);
    SRD5E.featureSpells
      (rules, 'Chemical Mastery', 'A', null, ['Greater Restoration', 'Heal']);
  }

};

/*
 * Defines in #rules# the rules associated with feat #name# that cannot be
 * derived directly from the attributes passed to featRules.
 */
Eberron5E.featRulesExtra = function(rules, name) {
  if(name == 'Aberrant Dragonmark') {
    rules.defineRule('spellSlots.S0', 'magicNotes.aberrantDragonmark', '+=', '1');
    rules.defineRule('spellSlots.S1', 'magicNotes.aberrantDragonmark', '+=', '1');
    rules.defineRule('casterLevel.Aberrant Dragonmark',
      'features.Aberrant Dragonmark', '?', null,
      'level', '=', null,
      'levels.Sorcerer', 'v', '0'
    );
    rules.defineRule('spellAbility.Aberrant Dragonmark',
      'features.Aberrant Dragonmark', '?', null,
      'constitutionModifier', '=', null,
      'levels.Sorcerer', 'v', '0'
    );
    rules.defineRule
      ('casterLevel.S', 'casterLevel.Aberrant Dragonmark', '^=', null);
    rules.defineRule
      ('spellAbility.S', 'spellAbility.Aberrant Dragonmark', '^=', null);
  }
};

/*
 * Defines in #rules# the rules associated with house #name#, which is
 * associated with #dragonmark#, populated by #races# and provides #tools# to
 * characters with the House Agent background. Casters add the spells in
 * #spells# to their spell choices.
 */
Eberron5E.houseRules = function(rules, name, dragonmark, races, tools, spells) {

  if(name == 'None')
    return;

  if(!name) {
    console.log('Empty house name');
    return;
  }
  if(!dragonmark) {
    console.log('Empty dragonmark for house ' + name);
    return;
  }
  if(!Array.isArray(races)) {
    console.log('Bad race list "' + races + '" for house ' + name);
    return;
  }
  if(!Array.isArray(tools)) {
    console.log('Bad tool list "' + tools + '" for house ' + name);
    return;
  }
  if(!Array.isArray(spells)) {
    console.log('Bad spell list "' + spells + '" for house ' + name);
    return;
  }

  rules.defineRule('features.House Tool Proficiency (' + name + ')',
    'house', '?', 'source == "' + name + '"',
    'features.House Tool Proficiency', '=', null
  );
  SRD5E.featureRules(
    rules, 'House Tool Proficiency (' + name + ')', ['feature'],
    ['Tool Proficiency (' + tools.join('/') + ')']
  );

  var allSpells = rules.getChoices('spells');
  for(var i = 0; i < spells.length; i++) {
    var level = i + 1;
    var spellList = spells[i].split(/\s*,\s*/);
    for(var j = 0; j < spellList.length; j++) {
      var spellName = spellList[j];
      var fullName = QuilvynUtils.getKeys(allSpells, spellName + '\\(')[0];
      if(!fullName) {
        console.log('Unknown mark spell "' + spellName + '"');
        continue;
      }
      var description =
        QuilvynUtils.getAttrValue(allSpells[fullName], 'Description');
      var school = QuilvynUtils.getAttrValue(allSpells[fullName], 'School');
      var schoolPrefix = school.substring(0, 4);
      ['A', 'B', 'C', 'D', 'P', 'R', 'S', 'K', 'W'].forEach(group => {
        if(QuilvynUtils.getKeys(allSpells, '^' + spellName + '\\(' + group + level).length == 0) {
          var newName = spellName + '(' + group + level + ' [' + dragonmark + ' Spells] ' + schoolPrefix + ')';
          rules.defineChoice('spells', newName + ':' + allSpells[fullName]);
          SRD5E.spellRules(
            rules, newName, school, group, level, description, false
          );
        }
      });
    }
  }

};

/*
 * Defines in #rules# the rules associated with path #name# that cannot be
 * derived directly from the attributes passed to pathRules.
 */
Eberron5E.pathRulesExtra = function(rules, name) {

  var pathLevel =
    name.charAt(0).toLowerCase() + name.substring(1).replaceAll(' ', '') +
    'Level';

  // Copied from Tasha's
  if(name == 'Artillerist') {
    rules.defineRule('combatNotes.eldritchCannon',
      pathLevel, '=', '2',
      'combatNotes.explosiveCannon', '+', '1'
    );
    rules.defineRule
      ('combatNotes.eldritchCannon.1', 'spellDifficultyClass.A', '=', null);
    rules.defineRule
      ('combatNotes.explosiveCannon', 'spellDifficultyClass.A', '=', null);
  } else if(name == 'Battle Smith') {
    rules.defineRule('combatNotes.arcaneJolt',
      pathLevel, '=', '2',
      'combatNotes.improvedDefender', '+', '2'
    );
    rules.defineRule
      ('combatNotes.extraAttack', pathLevel, '+=', 'source>=5 ? 1 : null');
    rules.defineRule('combatNotes.steelDefender',
      pathLevel, '=', '15',
      'combatNotes.improvedDefender', '+', '2'
    );
    rules.defineRule('combatNotes.steelDefender.1',
      'features.Steel Defender', '?', null,
      'proficiencyBonus', '=', null
    );
    rules.defineRule('combatNotes.steelDefender.2',
      'features.Steel Defender', '?', null,
      'spellAttackModifier.A', '=', null
    );
    rules.defineRule('combatNotes.steelDefender.3',
      'features.Steel Defender', '?', null,
      'proficiencyBonus', '=', 'source + 1'
    );
    rules.defineRule('combatNotes.steelDefender.4',
      'features.Steel Defender', '?', null,
      'proficiencyBonus', '=', 'source + 2'
    );
  }

};

/*
 * Defines in #rules# the rules associated with path #name# that cannot be
 * derived directly from the attributes passed to raceRules.
 */
Eberron5E.raceRulesExtra = function(rules, name) {

  if(name.match(/Shifter/)) {
    rules.defineRule('featureNotes.shifting.1',
      'race', '=', 'source == "Beasthide Shifter" ? "1d6+" : ""'
    );
  }
  if(name == 'Hobgoblin') {
    // Have to hard-code these proficiencies, since featureRules only handles
    // notes w/a single type of granted proficiency
    rules.defineRule
      ('armorProficiency.Light', 'featureNotes.martialTraining', '=', '1');
    rules.defineRule
      ('weaponChoiceCount', 'featureNotes.martialTraining', '+=', '2');
  } else if(name == 'Mark Of Detection Half-Elf') {
    SRD5E.featureSpells(
      rules, 'Magical Detection', 'W', 'level',
      ['Detect Magic,Detect Poison And Disease', '3:See Invisibility']
    );
    rules.defineRule('casterLevels.Magical Detection',
      'features.Magical Detection', '?', null,
      'level', '=', null,
      'levels.Wizard', 'v', '0'
    );
    rules.defineRule
      ('casterLevels.W', 'casterLevels.Magical Detection', '^=', null);
  } else if(name.startsWith('Mark Of Finding')) {
    SRD5E.featureSpells(
      rules, "Finder's Magic", 'R', 'level',
      ["Hunter's Mark", '3:Locate Object']
    );
    rules.defineRule("casterLevels.Finder's Magic",
      "features.Finder's Magic", '?', null,
      'level', '=', null,
      'levels.Ranger', 'v', '0'
    );
    rules.defineRule
      ('casterLevels.R', "casterLevels.Finder's Magic", '^=', null);
  } else if(name == 'Mark Of Handling Human') {
    SRD5E.featureSpells(
      rules, 'Primal Connection', 'R', 'level',
      ['Animal Friendship,Speak With Animals']
    );
    rules.defineRule('casterLevels.Primal Connection',
      'features.Primal Connection', '?', null,
      'level', '=', null,
      'levels.Ranger', 'v', '0'
    );
    rules.defineRule
      ('casterLevels.R', 'casterLevels.Primal Connection', '^=', null);
  } else if(name == 'Mark Of Healing Halfling') {
    SRD5E.featureSpells(
      rules, 'Healing Touch', 'C', 'level',
      ['Cure Wounds', '3:Lesser Restoration']
    );
    rules.defineRule('casterLevels.Healing Touch',
      'features.Healing Touch', '?', null,
      'level', '=', null,
      'levels.Cleric', 'v', '0'
    );
    rules.defineRule
      ('casterLevels.C', 'casterLevels.Healing Touch', '^=', null);
  } else if(name == 'Mark Of Hospitality Halfling') {
    SRD5E.featureSpells(
      rules, "Innkeeper's Magic", 'B', 'level',
      ['Prestidigitation,Purify Food And Drink,Unseen Servant']
    );
    rules.defineRule("casterLevels.Innkeeper's Magic",
      "features.Innkeeper's Magic", '?', null,
      'level', '=', null,
      'levels.Bard', 'v', '0'
    );
    rules.defineRule
      ('casterLevels.B', "casterLevels.Innkeeper's Magic", '^=', null);
  } else if(name == 'Mark Of Making Human') {
    SRD5E.featureSpells
      (rules, 'Spellsmith', 'W', 'level', ['Mending,Magic Weapon']);
    rules.defineRule('casterLevels.Spellsmith',
      'features.Spellsmith', '?', null,
      'level', '=', null,
      'levels.Wizard', 'v', '0'
    );
    rules.defineRule('casterLevels.W', 'casterLevels.Spellsmith', '^=', null);
  } else if(name == 'Mark Of Passage Human') {
    // NOTE: Dexterity is ability for this spell, but there are no ability-
    // related effects.
    SRD5E.featureSpells(rules, 'Magical Passage', 'W', 'level', ['Misty Step']);
    rules.defineRule('casterLevels.Magical Passage',
      'features.Magical Passage', '?', null,
      'level', '=', null,
      'levels.Wizard', 'v', '0'
    );
    rules.defineRule
      ('casterLevels.W', 'casterLevels.Magical Passage', '^=', null);
  } else if(name == 'Mark Of Scribing Gnome') {
    SRD5E.featureSpells(
      rules, "Scribe's Insight", 'W', 'level',
      ['Message,Comprehend Languages', '3:Magic Mouth']
    );
    rules.defineRule("casterLevels.Scribe's Insight",
      "features.Scribe's Insight", '?', null,
      'level', '=', null,
      'levels.Wizard', 'v', '0'
    );
    rules.defineRule
      ('casterLevels.W', "casterLevels.Scribe's Insight", '^=', null);
  } else if(name == 'Mark Of Sentinel Human') {
    SRD5E.featureSpells(rules, "Guardian's Shield", 'P', 'level', ['Shield']);
    rules.defineRule("casterLevels.Guardian's Shield",
      "features.Guardian's Shield", '?', null,
      'level', '=', null,
      'levels.Paladin', 'v', '0'
    );
    rules.defineRule
      ('casterLevels.P', "casterLevels.Guardian's Shield", '^=', null);
  } else if(name == 'Mark Of Shadow Elf') {
    SRD5E.featureSpells(
      rules, 'Shape Shadows', 'B', 'level',
      ['Minor Illusion', '3:Invisibility']
    );
    rules.defineRule('casterLevels.Shape Shadows',
      'features.Shape Shadows', '?', null,
      'level', '=', null,
      'levels.Bard', 'v', '0'
    );
    rules.defineRule
      ('casterLevels.B', 'casterLevels.Shape Shadows', '^=', null);
  } else if(name == 'Mark Of Storm Half-Elf') {
    SRD5E.featureSpells(
      rules, 'Headwinds', 'S', 'level',
      ['Gust', '3:Gust Of Wind']
    );
    rules.defineRule('casterLevels.Headwinds',
      'features.Headwinds', '?', null,
      'level', '=', null,
      'levels.Sorcerer', 'v', '0'
    );
    rules.defineRule('casterLevels.S', 'casterLevels.Headwinds', '^=', null);
  } else if(name == 'Mark Of Warding Dwarf') {
    SRD5E.featureSpells(
      rules, 'Wards And Seals', 'W', 'level',
      ['Alarm,Mage Armor', '3:Arcane Lock']
    );
    rules.defineRule('casterLevels.Wards And Seals',
      'features.Wards And Seals', '?', null,
      'level', '=', null,
      'levels.Wizard', 'v', '0'
    );
    rules.defineRule
      ('casterLevels.W', 'casterLevels.Wards And Seals', '^=', null);
  } else if(name == 'Warforged') {
    // Have to hard-code these proficiencies, since featureRules only handles
    // notes w/a single type of granted proficiency
    rules.defineRule
      ('skillChoiceCount', 'featureNotes.specializedDesign', '+=', '1');
    rules.defineRule
      ('toolChoiceCount', 'featureNotes.specializedDesign', '+=', '1');
  }

};

/* Returns an array of plugins upon which this one depends. */
Eberron5E.getPlugins = function() {
  var result = [PHB5E, SRD5E];
  if(window.Tasha != null &&
     QuilvynUtils.getKeys(Eberron5E.rules.getChoices('selectableFeatures'), /Peace Domain/).length > 0)
    result.unshift(Tasha);
  if(window.Volo != null &&
     (Volo.CHARACTER_RACES_IN_PLAY || Volo.MONSTROUS_RACES_IN_PLAY))
    result.unshift(Volo);
  if(window.Xanathar != null &&
     QuilvynUtils.getKeys(Eberron5E.rules.getChoices('selectableFeatures'), /Forge Domain/).length > 0)
    result.unshift(Xanathar);
  return result;
};

/*
 * Returns the list of editing elements needed by #choiceRules# to add a #type#
 * item to #rules#.
 */
Eberron5E.choiceEditorElements = function(rules, type) {
  var result = [];
  if(type == 'House')
    result.push(
      ['Dragonmark', 'Dragonmark', 'text', [20]],
      ['Race', 'Race', 'text', [40]],
      ['Tool', 'Tools', 'text', [80]],
      ['Spells', 'Spells', 'text', [80]]
    );
  else
    result = SRD5E.choiceEditorElements(rules, type);
  return result;
};

/* Sets #attributes#'s #attribute# attribute to a random value. */
Eberron5E.randomizeOneAttribute = function(attributes, attribute) {
  if(attribute == 'house') {
    var allHouses = this.getChoices('houses');
    var race = attributes.race;
    var baseRace = race.replace(/.*\s+/, ''); // Get last word of race
    var dragonmarkRace = race.includes('Mark Of');
    var choices = [];
    for(var house in allHouses) {
      var houseAttrs = allHouses[house];
      var houseDragonmark = QuilvynUtils.getAttrValue(houseAttrs, 'Dragonmark');
      if(house == 'None' ||
         (dragonmarkRace && race.includes(houseDragonmark)) ||
         (!dragonmarkRace && houseAttrs.includes(baseRace)))
        choices.push(house);
    }
    attributes.house = choices[QuilvynUtils.random(0, choices.length - 1)];
  } else {
    SRD5E.randomizeOneAttribute.apply(this, [attributes, attribute]);
  }
};

/* Returns HTML body content for user notes associated with this rule set. */
Eberron5E.ruleNotes = function() {
  return '' +
    '<h2>Eberron 5E Quilvyn Plugin Notes</h2>\n' +
    'Eberron 5E Quilvyn Plugin Version ' + Eberron5E.VERSION + '\n' +
    '<p>\n' +
    'There are no known bugs, limitations, or usage notes specific to the Eberron 5E Rule Set.\n' +
    '</p>\n' +
    '<h3>Copyrights and Licensing</h3>\n' +
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
    '</p>\n';
};
