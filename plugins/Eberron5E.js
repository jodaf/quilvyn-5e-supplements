/*
Copyright 2023, James J. Hayes

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
 * rules.  Similarly, the constant fields of Eberron5E (FEATS, RACES, etc.)
 * can be manipulated to modify the choices.
 */
function Eberron5E() {

  if(window.PHB5E == null) {
    alert('The Eberron5E module requires use of the PHB5E module');
    return;
  }

  let rules = new QuilvynRules('Eberron 5E', Eberron5E.VERSION);
  Eberron5E.rules = rules;
  rules.plugin = Eberron5E;

  rules.defineChoice('choices', Eberron5E.CHOICES);
  rules.choiceEditorElements = SRD5E.choiceEditorElements;
  rules.choiceRules = Eberron5E.choiceRules;
  rules.removeChoice = SRD5E.removeChoice;
  rules.editorElements = SRD5E.initialEditorElements();
  rules.getFormats = SRD5E.getFormats;
  rules.getPlugins = Eberron5E.getPlugins;
  rules.makeValid = SRD5E.makeValid;
  rules.randomizeOneAttribute = Eberron5E.randomizeOneAttribute;
  rules.defineChoice('random', Eberron5E.RANDOMIZABLE_ATTRIBUTES);
  rules.getChoices = SRD5E.getChoices;
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

  SRD5E.abilityRules(rules);
  SRD5E.combatRules(rules, PHB5E.ARMORS, PHB5E.SHIELDS, Eberron5E.WEAPONS);
  SRD5E.magicRules(rules, PHB5E.SCHOOLS, Eberron5E.SPELLS);
  Eberron5E.identityRules(
    rules, PHB5E.ALIGNMENTS, Eberron5E.BACKGROUNDS, Eberron5E.CLASSES,
    Eberron5E.DEITIES, {}, Eberron5E.RACES, Eberron5E.HOUSES
  );
  SRD5E.talentRules
    (rules, Eberron5E.FEATS, Eberron5E.FEATURES, PHB5E.GOODIES,
     PHB5E.LANGUAGES, PHB5E.SKILLS, Eberron5E.TOOLS);

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

Eberron5E.VERSION = '2.4.2.0';

Eberron5E.CHOICES = [].concat(SRD5E.CHOICES, 'House');
Eberron5E.RANDOMIZABLE_ATTRIBUTES =
  [].concat(SRD5E.RANDOMIZABLE_ATTRIBUTES, 'house');

Eberron5E.BACKGROUNDS_ADDED = {
  'House Agent':
    'Equipment=' +
      '"Fine Clothes","House Signet Ring","Identification Papers","20 GP" ' +
    'Features=' +
      '"Skill Proficiency (Investigation; Persuasion)",' +
      '"House Connections","House Tool Proficiency"'
};
Eberron5E.BACKGROUNDS =
  Object.assign({}, (window.PHB5E||window.SRD5E).BACKGROUNDS, Eberron5E.BACKGROUNDS_ADDED);
Eberron5E.CLASSES_ADDED = {
  'Artificer':
    'HitDie=d8 ' +
    'Features=' +
      '"1:Armor Proficiency (Medium; Shield)",' +
      '"1:Save Proficiency (Constitution; Intelligence)",' +
      '"1:Skill Proficiency (Choose 2 from Arcana, History, Investigation, Medicine, Nature, Perception, Sleight Of Hand)",' +
      '"1:Tool Proficiency (Thieves\' Tools; Tinker\'s Tools; Choose 1 from any Artisan)",' +
      '"1:Weapon Proficiency (Simple Weapons)",' +
      '"1:Magical Tinkering","1:Spellcasting","2:Infuse Item",' +
      '"3:Artificer Specialist","3:The Right Tool For The Job",' +
      '"6:Tool Expertise","7:Flash Of Genius","10:Magic Item Adept",' +
      '"11:Spell-Storing Item","14:Magic Item Savant","18:Magic Item Master",' +
      '"20:Soul Of Artifice",' +
      '"features.Alchemist ? 3:Alchemist Spells",' +
      '"features.Alchemist ? 3:Alchemist Tool Proficiency",' +
      '"features.Alchemist ? 3:Experimental Elixir",' +
      '"features.Alchemist ? 5:Alchemical Savant",' +
      '"features.Alchemist ? 9:Restorative Reagents",' +
      '"features.Alchemist ? 15:Chemical Mastery",' +
      // Tasha: '"features.Armorer ? 3:Armorer Spells",' +
      // Tasha: '"features.Armorer ? 3:Arcane Armor",' +
      // Tasha: '"features.Armorer ? 3:Armor Model",' +
      // Tasha: '"features.Armorer ? 3:Tools Of The Trade",' +
      // Tasha: '"features.Armorer ? 5:Extra Attack",' +
      // Tasha: '"features.Armorer ? 9:Armor Modifications",' +
      '"features.Artillerist ? 3:Artillerist Spells",' +
      '"features.Artillerist ? 3:Artillerist Tool Proficiency",' +
      '"features.Artillerist ? 3:Eldritch Cannon",' +
      '"features.Artillerist ? 5:Arcane Firearm",' +
      '"features.Artillerist ? 9:Explosive Cannon",' +
      '"features.Artillerist ? 15:Fortified Position",' +
      '"features.Battle Smith ? 3:Battle Ready",' +
      '"features.Battle Smith ? 3:Battle Smith Spells",' +
      '"features.Battle Smith ? 3:Battle Smith Tool Proficiency",' +
      '"features.Battle Smith ? 3:Steel Defender",' +
      '"features.Battle Smith ? 5:Extra Attack",' +
      '"features.Battle Smith ? 9:Arcane Jolt",' +
      '"features.Battle Smith ? 15:Improved Defender" ' +
    'Selectables=' +
      '"3:Alchemist:Specialist",' +
      '"3:Artillerist:Specialist",' +
      // Tasha: 3:Armorer:Specialist
      '"3:Battle Smith:Specialist",' +
      // Tasha: '"3:Guardian Armor:Armor Model",' +
      // Tasha: '"3:Infiltrator Armor:Armor Model",' +
      // Tasha: '"14:Arcane Propulsion Armor:Infusion",' +
      // Tasha: '"2:Armor Of Magical Strength:Infusion",' +
      '"6:Boots Of The Winding Path:Infusion",' +
      '"2:Enhanced Arcane Focus:Infusion",' +
      '"2:Enhanced Defense:Infusion",' +
      '"2:Enhanced Weapon:Infusion",' +
      // Tasha: '"10:Helm Of Awareness:Infusion",' +
      '"2:Homunculus Servant:Infusion",' +
      // Tasha: '"2:Mind Sharpener:Infusion",' +
      '"6:Radiant Weapon:Infusion",' +
      '"2:Repeating Shot:Infusion",' +
      '"2:Replicate Magic Item:Infusion",' +
      '"6:Repulsion Shield:Infusion",' +
      '"6:Resistant Armor:Infusion",' +
      '"2:Returning Weapon:Infusion" ' +
      // Tasha: '"6:Spell-Refueling Ring:Infusion" ' +
    'SpellAbility=intelligence ' +
    'SpellSlots=' +
      '"A0:2@1 3@10 4@14",' +
      '"A1:2@1 3@3 4@5",' +
      '"A2:2@5 3@7",' +
      '"A3:2@9 3@11",' +
      '"A4:1@13 2@15 3@17",' +
      '"A5:1@17 2@19"'
};
if(window.Tasha != null)
  Eberron5E.CLASSES_ADDED.Artificer = Tasha.CLASSES.Artificer;
Eberron5E.CLASSES =
  Object.assign({}, (window.PHB5E||window.SRD5E).CLASSES, Eberron5E.CLASSES_ADDED);
Eberron5E.DEITIES = {
  'None':'',
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
Eberron5E.FEATS =
  Object.assign({}, (window.PHB5E||window.SRD5E).FEATS, Eberron5E.FEATS_ADDED);
Eberron5E.FEATURES_ADDED = {

  // Backgrounds
  'House Connections':
    'Section=feature ' +
    'Note="Can obtain food and lodging at a house enclave and assistance and supplies from house contacts"',

  // Classes - Artificer
  'Artificer Specialist':'Section=feature Note="1 selection"',
  'Flash Of Genius':
    'Section=feature ' +
    'Note="R30\' Can use a reaction to give an ally +%{intelligenceModifier} on an ability check or save %{intelligenceModifier>1?intelligenceModifier+\' times\':\'once\'} per long rest"',
  'Infuse Item':
    'Section=feature,magic ' +
    'Note=' +
      '"%{(levels.Artificer+6)//4*2} selections",' +
      '"Can infuse %{(levels.Artificer+6)//4+(featureNotes.armorModifications?2:0)} items simultaneously"',
  'Magic Item Adept':
    'Section=magic ' +
    'Note="Can attune %{4+(magicNotes.magicItemMaster?2:magicNotes.magicItemSavant?1:0)} items simultaneously and craft uncommon magic items in 1/4 time at 1/2 cost"',
  'Magic Item Master':'Section=magic Note="Can attune 6 items simultaneously"',
  'Magic Item Savant':
    'Section=magic ' +
    'Note="Can attune 5 items simultaneously and ignore attunement and use requirements on attuned items"',
  'Magical Tinkering':
    'Section=magic ' +
    'Note="Can imbue %{intelligenceModifier>?1} objects simultaneously to emit light, a message, sound, an odor, or a picture"',
  'Soul Of Artifice':
    'Section=combat,save ' +
    'Note=' +
      '"Can use a reaction and end 1 infusion when reduced to 0 hit points to retain 1 hit point",' +
      '"+1 per attunement on saves"',
  'Spell-Storing Item':
    'Section=feature ' +
    'Note="After a long rest, can store in an item an A1 or A2 spell that can be cast %{intelligenceModifier*2>?2} times"',
  // Spellcasting as SRD5E
  'The Right Tool For The Job':
    'Section=feature Note="Can spend 1 hr to create a set of artisan\'s tools"',
  'Tool Expertise':
    'Section=skill Note="+%{proficiencyBonus} with proficient tools"',
  // Alchemist
  'Alchemical Savant':
    'Section=magic ' +
    'Note="Spells cast using alchemical supplies inflict +%{intelligenceModifier>?1} HP acid, fire, necrotic, or poison or restore an equal number of additional hit points"',
  'Alchemist Spells':
    'Spells=' +
      '"3:Healing Word","3:Ray Of Sickness",' +
      '"5:Flaming Sphere","5:Melf\'s Acid Arrow",' +
      '"9:Gaseous Form","9:Mass Healing Word",' +
      '"13:Blight","13:Death Ward",' +
      '"17:Cloudkill","17:Raise Dead"',
  'Alchemist Tool Proficiency':
    'Section=feature Note="Tool Proficiency (Alchemist\'s Supplies)"',
  'Chemical Mastery':
    'Section=magic,save ' +
    'Note=' +
      '"Can use alchemist\'s supplies to cast <i>Greater Restoration</i> and <i>Heal</i> once per long rest",' +
      '"Has resistance to acid and poison damage and immunity to the poisoned condition" ' +
    'Spells=' +
      '"Greater Restoration","Heal"',
  'Experimental Elixir':
    'Section=magic ' +
    'Note="Can use alchemist\'s supplies after a long rest to create %{(levels.Artificer+12)//9} elixirs of healing, swiftness, resilience, boldness, flight, or transformation; can spend spell slots to create additional elixirs"',
  'Restorative Reagents':
    'Section=magic ' +
    'Note="Can use alchemist\'s supplies to cast <i>Lesser Restoration</i> %{intelligenceModifier>1?intelligenceModifier+\' times\':\'once\'} per long rest, and elixirs give 2d6+%{intelligenceModifier>?1} temporary hit points" ' +
    'Spells="Lesser Restoration"',
  // Artillerist
  'Arcane Firearm':
    'Section=magic ' +
    'Note="Spells cast through a prepared wand, staff, or rod inflict +1d8 HP"',
  'Artillerist Spells':
    'Spells=' +
      '"3:Shield","3:Thunderwave",' +
      '"5:Scorching Ray","5:Shatter",' +
      '"9:Fireball","9:Wind Wall",' +
      '"13:Ice Storm","13:Wall Of Fire",' +
      '"17:Cone Of Cold","17:Wall Of Force"',
  'Artillerist Tool Proficiency':
    'Section=feature Note="Tool Proficiency (Woodcarver\'s Tools)"',
  'Eldritch Cannon':
    'Section=combat ' +
    'Note="Can create a magical cannon (Armor Class 18, %{levels.Artificer*5} hit points (<i>Mending</i> repairs 2d6 hit points), can move 15\') flamethrower (15\' cone inflicts %{2+(combatNotes.explosiveCannon?1:0)}d8 HP fire (save DC %{spellDifficultyClass.A} Dexterity half)), force ballista (R120\' inflicts %{2+(combatNotes.explosiveCannon?1:0)}d8 force and pushes 5\'), or protector (R10\' targets gain 1d8+%{intelligenceModifier>?1} temporary hit points) for 1 hr once per long rest; can spend spell slots to create additional cannons"',
  'Explosive Cannon':
    'Section=combat,combat ' +
    'Note=' +
      '"Eldritch Cannon inflicts +1d8 HP damage",' +
      '"R60\' Can destroy an eldritch cannon to inflict 3d8 HP force (save DC %{spellDifficultyClass.A} Dexterity half) in a 20\' radius"',
  'Fortified Position':
    'Section=combat ' +
    'Note=' +
      '"Can have 2 Eldritch Cannons simultaneously, and Eldritch Cannons give allies half cover in 10\' radius"',
  // Battle Smith
  'Arcane Jolt':
    'Section=combat ' +
    'Note="Magic weapon or Steel Defender attack inflicts +%{2+(combatNotes.improvedDefender?2:0)}d6 HP force or restores %{2+(combatNotes.improvedDefender?2:0)}d6 hit points to 1 target in a 30\' radius %{intelligenceModifier>1?intelligenceModifier+\' times\':\'once\'} per long rest"',
  'Battle Ready':
    'Section=combat,feature ' +
    'Note=' +
      '"+%{intelligenceModifier-strengthModifier} (Intelligence instead of Strength) or +%{intelligenceModifier-dexterityModifier} (Intelligence instead of Dexterity) attack and damage with magic weapons",' +
      '"Weapon Proficiency (Martial)"',
  'Battle Smith Spells':
    'Spells=' +
      '"3:Heroism","3:Shield",' +
      '"5:Branding Smite","5:Warding Bond",' +
      '"9:Aura Of Vitality","9:Conjure Barrage",' +
      '"13:Aura Of Purity","13:Fire Shield",' +
      '"17:Banishing Smite","17:Mass Cure Wounds"',
  'Battle Smith Tool Proficiency':
    'Section=feature Note="Tool Proficiency (Smith\'s Tools)"',
  // Extra Attack as SRD5E
  'Improved Defender':
    'Section=combat,combat ' +
    'Note=' +
      '"Arcane Jolt inflicts +2d6 HP or restores +2d6 hit points, and Steel Defender gains +2 Armor Class",' +
      '"Steel Defender Deflect Attack inflicts 1d4+%{intelligenceModifier} HP force"',
  'Steel Defender':
    'Section=combat ' +
    'Note="Can create a mechanical companion (Armor Class %{15+(combatNotes.improvedDefender?2:0)}; %{levels.Artificer*5+intelligenceModifier+2} hit points (<i>Mending</i> repairs 2d6 hit points, can self-repair 2d8+%{proficiencyBonus} hit points 3 times per day); attack +%{spellAttackModifier.A} inflicts 1d8+%{proficiencyBonus} HP force; can use a reaction to inflict disadvantage on attack in a 5\' radius; can move 40\'; Dexterity save +%{proficiencyBonus+1}; Constitution save +%{proficiencyBonus+2}; immune to poison and charmed, exhausted, poisoned, and surprised conditions)"',
  // Infusions
  'Boots Of The Winding Path':
    'Section=magic ' +
    'Note="Wearer of infused boots can teleport back to a space within 15\'"',
  'Enhanced Arcane Focus':
    'Section=magic ' +
    'Note="Infused rod, staff, or wand gives +%{levels.Artificer<10?1:2} spell attacks that ignore half cover"',
  'Enhanced Defense':
    'Section=magic ' +
    'Note="Infused armor or shield gives +%{levels.Artificer<10?1:2} AC"',
  'Enhanced Weapon':
    'Section=magic ' +
    'Note="Infused weapon gives +%{levels.Artificer<10?1:2} attack and damage"',
  'Homunculus Servant':
    'Section=magic ' +
    'Note="Can create a mechanical companion (Armor Class 13; %{levels.Artificer+intelligenceModifier+1} hit points; attack R30\' +%{spellAttackModifier.A} inflicts 1d4+%{proficiencyBonus} HP force; Evasion; Channel Magic)"',
  'Radiant Weapon':
    'Section=magic ' +
    'Note="Infused weapon with 4 charges gives +1 attack and damage and emits a 30\' bright light on command; the wielder can use a reaction and 1 charge to blind a successful attacker (save DC %{spellDifficultyClass.A} Constitution negates) for 1 rd; the weapon regains 1d4 charges each dawn"',
  'Repeating Shot':
    'Section=magic ' +
    'Note="Infused ammunition weapon gives +1 attack and damage and automatically creates its own ammunition"',
  'Replicate Magic Item':
    'Section=magic Note="Can replicate wondrous items"',
  'Repulsion Shield':
    'Section=magic ' +
    'Note="Infused shield with 4 charges gives +1 AC; the holder can use a reaction and 1 charge to push a successful attacker 15\'; regains 1d4 charges each dawn"',
  'Resistant Armor':
    'Section=magic ' +
    'Note="Infused armor gives +1 AC and resistance to a chosen damage type"',
  'Returning Weapon':
    'Section=magic ' +
    'Note="Infused thrown weapon gives +1 attack and damage and returns after being thrown"',

  // Feats
  'Aberrant Dragonmark':
    'Section=ability,feature,magic ' +
    'Note=' +
      '"+1 Constitution",' +
      '"Has an Aberrant Dragonmark flaw",' +
      '"Knows 1 S0 cantrip and can cast a chosen S1 spell once per long rest, optionally randomly gaining 1 HD temporary hit points or inflicting 1 HD force to a creature within 30\'"',
  'Revenant Blade':
    'Section=ability,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Dexterity, Strength)",' +
      '"Can use a double-bladed scimitar one-handed and gains +1 Armor Class when wielding one two-handed"',

  // Races

  // Changeling
  'Changeling Ability Adjustment':
    'Section=ability Note="+2 Charisma/Ability Boost (Choose 1 from any)"',
  'Changeling Instincts':
    'Section=feature ' +
    'Note="Skill Proficiency (Choose 2 from Deception, Insight, Intimidation, Persuasion)"',
  'Shapechanger (Changeling)':
    'Section=feature Note="Can use an action to change appearance and voice"',

  // Bugbear (ref Volo)
  'Bugbear Ability Adjustment':
    'Section=ability Note="+2 Strength/+1 Dexterity"',
  // Darkvision as SRD5E
  'Long-Limbed':'Section=combat Note="+5\' melee reach"',
  'Powerful Build':'Section=ability Note="x2 Carry/x2 Lift"',
  'Sneaky':'Section=skill Note="Skill Proficiency (Stealth)"',
  'Surprise Attack':
    'Section=combat Note="Inflicts +2d6 HP on first surprise hit"',

  // Goblin (ref Volo)
  // Darkvision as SRD5E
  'Fury Of The Small':
    'Section=combat ' +
    'Note="Can inflict +%{level} HP to a larger creature once per short rest"',
  'Goblin Ability Adjustment':
    'Section=ability Note="+2 Dexterity/+1 Constitution"',
  'Nimble Escape':
    'Section=combat Note="Can use a bonus action to Disengage or Hide"',

  // Hobgoblin (ref Volo)
  // Darkvision as SRD5E
  'Hobgoblin Ability Adjustment':
    'Section=ability Note="+2 Constitution/+1 Intelligence"',
  'Martial Training':
    'Section=combat ' +
    'Note="Armor Proficiency (Light)/Weapon Proficiency (Choose 2 from any Martial)"',
  'Saving Face':
    'Section=feature ' +
    'Note="Can add 1 for each ally within 30\' (+5 maximum) to a failed roll once per short rest"',

  // Kalashtar
  'Dual Mind':'Section=save Note="Has advantage on Wisdom saves"',
  'Kalashtar Ability Adjustment':'Section=ability Note="+2 Wisdom/+1 Charisma"',
  'Mental Discipline':'Section=save Note="Has resistance to psychic damage"',
  'Mind Link':
    'Section=feature ' +
    'Note="R%{level*10}\' Can communicate telepathically with a chosen creature for 1 hr"',
  'Severed From Dreams':'Section=save Note="Has immunity to dream effects"',

  // Orc (ref Volo)
  'Aggressive':
    'Section=combat ' +
    'Note="Can use a bonus action to move %{speed}\' toward foe"',
  // Darkvision as SRD5E
  'Orc Ability Adjustment':
    // Does not share Volo's -2 Intelligence
    'Section=ability Note="+2 Strength/+1 Constitution"',
  // Powerful Build as above
  'Primal Intuition':
    'Section=feature ' +
    'Note="Skill Proficiency (Choose 2 from Animal Handling, Insight, Intimidation, Medicine, Nature, Perception, Survival)"',

  // Shifter
  // Darkvision as SRD5E
  'Shifting':
    'Section=feature ' +
    'Note="Can assume a bestial appearance, gaining %{level+constitutionModifier>?1} temporary hit points, for 1 min once per short rest"',
  // Beasthide Shifter
  'Beasthide Ability Adjustment':
    'Section=ability Note="+2 Constitution/+1 Strength"',
  'Natural Athlete':'Section=feature Note="Skill Proficiency (Athletics)"',
  'Shifting (Beasthide)':
    'Section=combat ' +
    'Note="Gains +1 Armor Class and +1d6 temporary hit points while shifted"',
  // Longtooth Shifter
  'Fierce':'Section=feature Note="Skill Proficiency (Intimidation)"',
  'Longtooth Ability Adjustment':
    'Section=ability Note="+2 Strength/+1 Dexterity"',
  'Shifting (Longtooth)':
    'Section=combat ' +
    'Note="Can attack with fangs, inflicting 1d6+%{strengthModifier} HP piercing, as a bonus action while shifted"',
  // Swiftstride Shifter
  'Graceful':'Section=feature Note="Skill Proficiency (Acrobatics)"',
  'Shifting (Swiftstride)':
    'Section=ability,combat ' +
    'Note=' +
      '"+10 Speed while shifted",' +
      '"Can use a reaction while shifted to move 10\' without provoking opportunity attacks when a creature ends its turn within 5\'"',
  'Swiftstride Ability Adjustment':
    'Section=ability Note="+2 Dexterity/+1 Charisma"',
  // Wildhunt Shifter
  'Natural Tracker':'Section=feature Note="Skill Proficiency (Survival)"',
  'Shifting (Wildhunt)':
    'Section=ability,combat ' +
    'Note=' +
      '"Has advantage on Wisdom while shifted",' +
      '"While shifted, foes within 30\' gain no advantage on attacks on self"',
  'Wildhunt Ability Adjustment':'Section=ability Note="+2 Wisdom/+1 Dexterity"',

  // Warforged
  'Constructed Resilience':
    'Section=feature,save ' +
    'Note=' +
      '"Has no need to eat, drink, breathe, or sleep",' +
      '"Has advantage on poison, resistance to poison, and immunity to disease and sleep"',
  'Integrated Protection':
    'Section=combat,combat ' +
    'Note=' +
      '"+1 Armor Class",' +
      '"Requires 1 hr to put on or take off armor"',
  "Sentry's Rest":
    'Section=feature ' +
    'Note="Becomes inactive but alert for 6 hr during a long rest"',
  'Specialized Design':
    'Section=feature ' +
    'Note="Skill Proficiency (Choose 1 from any)/Tool Proficiency (Choose 1 from any)"',
  'Warforged Ability Adjustment':
    'Section=ability Note="+2 Constitution/Ability Boost (Choose 1 from any)"',

  // Mark Of Detection Half-Elf
  'Deductive Intuition':'Section=skill Note="+1d4 Investigation and Insight"',
  'Detection Ability Adjustment':
    'Section=ability Note="+2 Wisdom/Ability Boost (Choose 1 from any)"',
  'Magical Detection':
    'Section=magic ' +
    'Note="Can cast <i>Detect Magic</i>%{level<3?\' and\':\',\'} <i>Detect Poison And Disease</i>%{level<3?\'\':\', and <i>See Invisibility</i>\'} once per long rest" ' +
    'SpellAbility=Intelligence ' +
    'Spells="Detect Magic","Detect Poison And Disease","3:See Invisibility"',
  'Spells Of The Mark':'Section=magic Note="Has access to additional spells"',

  // Mark Of Finding Half-Elf and Half-Orc
  // Darkvision as SRD5E
  "Finder's Magic":
    // Leave off Spells and SpellAbility attributes to avoid showing both stats
    // for both races; handled separately in houseRules.
    'Section=magic ' +
    'Note="Can cast <i>Hunter\'s Mark</i>%{level<3?\'\':\' and <i>Locate Object</i>\'} once per long rest"',
  'Finding Ability Adjustment':
    'Section=ability Note="+2 Wisdom/+1 Constitution"',
  "Hunter's Intuition":'Section=skill Note="+1d4 Perception and Survival"',
  // Spells Of The Mark as above

  // Mark Of Handling Human
  'Handling Ability Adjustment':
    'Section=ability Note="+2 Wisdom/Ability Boost (Choose 1 from any)"',
  'Primal Connection':
    'Section=magic ' +
    'Note="Can cast <i>Animal Friendship</i> and <i>Speak With Animals</i> once per long rest" ' +
    'SpellAbility=Wisdom ' +
    'Spells="Animal Friendship","Speak With Animals"',
  // Spells Of The Mark as above
  'The Bigger They Are':
    'Section=magic ' +
    'Note="Can use Primal Connection on monstrous creatures with Intelligence up to 3"',
  'Wild Intuition':'Section=skill Note="+1d4 Animal Handling and Nature"',

  // Mark Of Healing Halfling
  'Healing Ability Adjustment':'Section=ability Note="+2 Dexterity/+1 Wisdom"',
  'Medical Intuition':
    'Section=skill Note="+1d4 Medicine and Herbalism Kit checks"',
  'Healing Touch':
    'Section=magic ' +
    'Note="Can cast <i>Cure Wounds</i>%{level<3?\'\':\' and <i>Lesser Restoration</i>\'} once per long rest" ' +
    'SpellAbility=Wisdom ' +
    'Spells="Cure Wounds","3:Lesser Restoration"',
  // Spells Of The Mark as above

  // Mark Of Hospitality Halfling
  'Ever Hospitable':
    'Section=skill ' +
    'Note="+1d4 Persuasion, Brewer\'s Supplies, and Cook\'s Utensil\'s checks"',
  'Hospitality Ability Adjustment':
    'Section=ability Note="+2 Dexterity/+1 Charisma"',
  "Innkeeper's Magic":
    'Section=magic ' +
    'Note="Knows the <i>Prestidigitation</i> cantrip and can cast <i>Purify Food And Drink</i> and <i>Unseen Servant</i> once long rest" ' +
    'SpellAbility=Charisma ' +
    'Spells=Prestidigitation,"Purify Food And Drink","Unseen Servant"',
  // Spells Of The Mark as above

  // Mark Of Making Human
  "Artisan's Intuition":
    'Section=skill Note="+1d4 Arcana and Artisan\'s Tools checks"',
  "Maker's Gift":
    'Section=feature Note="Tool Proficiency (Choose 1 from any Artisan)"',
  'Making Ability Adjustment':
    'Section=ability Note="+2 Intelligence/Ability Boost (Choose 1 from any)"',
  // Spells Of The Mark as above
  'Spellsmith':
    'Section=magic ' +
    'Note="Knows the <i>Mending</i> cantrip and can cast <i>Magic Weapon</i> with 1 hr duration once per long rest" ' +
    'SpellAbility=Intelligence ' +
    'Spells="Mending","Magic Weapon"',

  // Mark Of Passage Human
  "Courier's Speed":'Section=ability Note="+5 Speed"',
  'Intuitive Motion':
    'Section=skill Note="+1d4 Acrobatics and Land Vehicle checks"',
  'Magical Passage':
    'Section=magic ' +
    'Note="Can cast <i>Misty Step</i> once per long rest" ' +
    'SpellAbility=Dexterity ' +
    'Spells="Misty Step"',
  'Passage Ability Adjustment':
    'Section=ability Note="+2 Dexterity/Ability Boost (Choose 1 from any)"',
  // Spells Of The Mark as above

  // Mark Of Scribing Gnome
  'Gifted Scribe':
    'Section=skill Note="+1d4 History and Calligrapher\'s Supplies checks"',
  "Scribe's Insight":
    'Section=magic ' +
    'Note="Knows the <i>Message</i> cantrip and can cast <i>Comprehend Languages</i> once per short rest%{level<3?\'\':\' and <i>Magic Mouth</i> once per long rest\'}" ' +
    'SpellAbility=Intelligence ' +
    'Spells=Message,"Comprehend Languages","3:Magic Mouth"',
  'Scribing Ability Adjustment':
    'Section=ability Note="+2 Intelligence/+1 Charisma"',

  // Mark Of Sentinel Human
  "Guardian's Shield":
    'Section=magic ' +
    'Note="Can cast <i>Shield</i> once per long rest" ' +
    'SpellAbility=Charisma ' +
    'Spells=Shield',
  'Sentinel Ability Adjustment':
    'Section=ability Note="+2 Constitution/+1 Wisdom"',
  "Sentinel's Intuition":'Section=skill Note="+1d4 Insight and Perception"',
  // Spells Of The Mark as above
  'Vigilant Guardian':
    'Section=combat ' +
    'Note="R5\' Can use a reaction to swap places with and take damage for a struck creature once per long rest"',

  // Mark Of Shadow Elf
  'Cunning Intuition':'Section=skill Note="+1d4 Performance and Stealth"',
  'Shadow Ability Adjustment':'Section=ability Note="+2 Dexterity/+1 Charisma"',
  'Shape Shadows':
    'Section=magic ' +
    'Note="Knows the <i>Minor Illusion</i> cantrip%{level<3?\'\':\' and can cast <i>Invisibility</i> once per long rest\'}" ' +
    'SpellAbility=Charisma ' +
    'Spells="Minor Illusion","3:Invisibility"',
  // Spells Of The Mark as above

  // Mark Of Storm Half-Elf
  'Headwinds':
    'Section=magic ' +
    'Note="Knows the <i>Gust</i> cantrip%{level<3?\'\':\' and can cast <i>Gust Of Wind</i> once per long rest\'}" ' +
    'SpellAbility=Charisma ' +
    'Spells=Gust,"3:Gust Of Wind"',
  // Spells Of The Mark as above
  'Storm Ability Adjustment':'Section=ability Note="+2 Charisma/+1 Dexterity"',
  "Storm's Boon":'Section=save Note="Has resistance to lightning"',
  "Windwright's Intuition":
    'Section=skill Note="+1d4 Acrobatics and Navigator\'s Tools checks"',

  // Mark Of Warding Dwarf
  // Spells Of The Mark as above
  "Warder's Intuition":
    'Section=skill Note="+1d4 Investigation and Thieves\' Tools checks"',
  'Warding Ability Adjustment':
    'Section=ability Note="+2 Constitution/+1 Intelligence"',
  'Wards And Seals':
    'Section=magic ' +
    'Note="Can cast <i>Alarm</i>%{level<3?\' and\':\',\'} <i>Magic Armor</i>%{level<3?\'\':\', and <i>Arcane Lock</i>\'} once per long rest" ' +
    'SpellAbility=Intelligence ' +
    'Spells="Alarm","Mage Armor","3:Arcane Lock"'

};
Eberron5E.FEATURES =
  Object.assign({}, (window.PHB5E||window.SRD5E).FEATURES, Eberron5E.FEATURES_ADDED);
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
    'Tool="Choose 1 from any Gaming","Vehicles (Land)" ' +
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
    'Tool="Choose 1 from any Gaming","Vehicles (Land)" ' +
    'Spells=' +
      '"Expeditious Retreat,Jump",' +
      '"Misty Step,Pass Without Trace",' +
      '"Blink,Phantom Steed",' +
      '"Dimension Door,Freedom Of Movement",' +
      '"Teleportation Circle"',
  'Phiarlan':
    'Dragonmark=Shadow ' +
    'Race=Elf ' +
    'Tool="Disguise Kit","Choose 1 from any Musical" ' +
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
    'Tool="Choose 1 from any Gaming","Thieves\' Tools" ' +
    'Spells=' +
      '"Faerie Fire,Longstrider",' +
      '"Locate Animals Or Plants,Locate Object",' +
      '"Clairvoyance,Speak With Plants",' +
      '"Divination,Locate Creature",' +
      '"Commune With Nature"',
  'Thuranni':
    'Dragonmark=Shadow ' +
    'Race=Elf ' +
    'Tool="Choose 1 from any Musical","Poisoner\'s Kit"',
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
Eberron5E.RACES_ADDED = {
  'Changeling':
    'Size=Medium ' +
    'Speed=30 ' +
    'Features=' +
      '"Language (Common; Choose 2 from any)",' +
      '"Changeling Ability Adjustment","Changeling Instincts",' +
      '"Shapechanger (Changeling)"',
  'Kalashtar':
    'Size=Medium ' +
    'Speed=30 ' +
    'Features=' +
      '"Language (Common; Quori; Choose 1 from any)",' +
      '"Dual Mind","Kalashtar Ability Adjustment","Mental Discipline",' +
      '"Mind Link","Severed From Dreams"',
  'Beasthide Shifter':
    'Size=Medium ' +
    'Speed=30 ' +
    'Features=' +
      '"Language (Common)",' +
      'Darkvision,"Beasthide Ability Adjustment","Shifting (Beasthide)",' +
      'Shifting,"Natural Athlete"',
  'Longtooth Shifter':
    'Size=Medium ' +
    'Speed=30 ' +
    'Features=' +
      '"Language (Common)",' +
      'Darkvision,Fierce,"Longtooth Ability Adjustment",' +
      '"Shifting (Longtooth)",Shifting',
  'Swiftstride Shifter':
    'Size=Medium ' +
    'Speed=30 ' +
    'Features=' +
      '"Language (Common)",' +
      'Darkvision,Graceful,Shifting,"Swiftstride Ability Adjustment",' +
      '"Shifting (Swiftstride)"',
  'Wildhunt Shifter':
    'Size=Medium ' +
    'Speed=30 ' +
    'Features=' +
      '"Language (Common)",' +
      'Darkvision,"Natural Tracker",Shifting,"Wildhunt Ability Adjustment",' +
      '"Shifting (Wildhunt)"',
  'Warforged':
    'Size=Medium ' +
    'Speed=30 ' +
    'Features=' +
      '"Language (Common; Choose 1 from any)",' +
      '"Constructed Resilience","Integrated Protection","Sentry\'s Rest",' +
      '"Specialized Design","Warforged Ability Adjustment"',
  'Mark Of Detection Half-Elf':
    SRD5E.RACES['Half-Elf']
      .replace('Half-Elf Ability', 'Detection Ability')
      .replace('Skill Versatility', 'Deductive Intuition","Spells Of The Mark","Magical Detection'),
  'Mark Of Finding Half-Orc':
    'Size=Medium ' +
    'Speed=30 ' +
    'Features=' +
      '"Language (Common; Goblin)",' +
      '"Finding Ability Adjustment",Darkvision,"Hunter\'s Intuition",' +
      '"Finder\'s Magic","Spells Of The Mark"',
  'Mark Of Finding Human':
    'Size=Medium ' +
    'Speed=30 ' +
    'Features=' +
      '"Language (Common; Goblin)",' +
      '"Finding Ability Adjustment",Darkvision,"Hunter\'s Intuition",' +
      '"Finder\'s Magic","Spells Of The Mark"',
  'Mark Of Handling Human':
    SRD5E.RACES.Human
      .replace('Human Ability Adjustment','Handling Ability Adjustment","Spells Of The Mark","Primal Connection","Wild Intuition","3:The Bigger They Are'),
  'Mark Of Healing Halfling':
    'Size=Small ' +
    'Speed=25 ' +
    'Features=' +
      '"Language (Common; Halfling)",' +
      'Brave,"Halfling Nimbleness","Lucky (Halfling)",' +
      '"Healing Ability Adjustment","Spells Of The Mark","Healing Touch",' +
      '"Medical Intuition"',
  'Mark Of Hospitality Halfling':
    'Size=Small ' +
    'Speed=25 ' +
    'Features=' +
      '"Language (Common; Halfling)",' +
      'Brave,"Halfling Nimbleness","Lucky (Halfling)",' +
      '"Ever Hospitable","Hospitality Ability Adjustment",' +
      '"Spells Of The Mark","Innkeeper\'s Magic"',
  'Mark Of Making Human':
    SRD5E.RACES.Human
      .replace('Human Ability Adjustment', 'Making Ability Adjustment","Artisan\'s Intuition","Maker\'s Gift","Spells Of The Mark","Spellsmith'),
  'Mark Of Passage Human':
    SRD5E.RACES.Human
      .replace('Human Ability Adjustment', 'Passage Ability Adjustment","Courier\'s Speed","Intuitive Motion","Magical Passage","Spells Of The Mark'),
  'Mark Of Scribing Gnome':
    'Size=Small ' +
    'Speed=25 ' +
    'Features=' +
      '"Language (Common; Gnomish)",' +
      'Darkvision,"1:Gnome Cunning","Scribing Ability Adjustment",' +
      '"Gifted Scribe","Scribe\'s Insight","Spells Of The Mark"',
  'Mark Of Sentinel Human':
    SRD5E.RACES.Human
      .replace('Human Ability Adjustment', 'Sentinel Ability Adjustment","Guardian\'s Shield","Spells Of The Mark","Sentinel\'s Intuition","Vigilant Guardian'),
  'Mark Of Shadow Elf':
    'Size=Medium ' +
    'Speed=30 ' +
    'Features=' +
      '"Language (Common; Elvish)",' +
      'Darkvision,"Elf Weapon Training","Fey Ancestry","Keen Senses",Trance,' +
      '"Cunning Intuition","Shadow Ability Adjustment","Spells Of The Mark",' +
      '"Shape Shadows"',
  'Mark Of Storm Half-Elf':
    SRD5E.RACES['Half-Elf']
      .replace('Half-Elf Ability', 'Storm Ability')
      .replace('Skill Versatility', 'Headwinds","Spells Of The Mark","Storm\'s Boon","Windwright\'s Intuition'),
  'Mark Of Warding Dwarf':
    'Size=Medium ' +
    'Speed=25 ' +
    'Features=' +
      '"Language (Common; Dwarvish)",' +
      '"Tool Proficiency (Choose 1 from Brewer\'s Supplies, Mason\'s Tools, Smith\'s Tools)",' +
      'Darkvision,"Dwarven Combat Training","Dwarven Resilience",Steady,' +
      'Stonecunning,"Warding Ability Adjustment","Warder\'s Intuition",' +
      '"Spells Of The Mark","Wards And Seals"',
  'Bugbear': // (ref Volo)
    'Features=' +
      '"Language (Common; Goblin)",' +
      '"Bugbear Ability Adjustment",Darkvision,Long-Limbed,"Powerful Build",' +
      'Sneaky,"Surprise Attack"',
  'Goblin': // (ref Volo)
    'Size=Small ' +
    'Speed=30 ' +
    'Features=' +
      '"Language (Common; Goblin)",' +
      'Darkvision,"Fury Of The Small","Goblin Ability Adjustment",' +
      '"Nimble Escape"',
  'Hobgoblin': // (ref Volo)
    'Features=' +
      '"Language (Common; Goblin)",' +
      'Darkvision,"Hobgoblin Ability Adjustment","Martial Training",' +
      '"Saving Face"',
  'Orc': // (ref Volo; Primal Intuition replaces Volo's Menacing)
    'Features=' +
      '"Language (Common; Orc)",' +
      'Aggressive,Darkvision,"Orc Ability Adjustment","Powerful Build",' +
      '"Primal Intuition"'
};
Eberron5E.RACES =
  Object.assign({}, (window.PHB5E||window.SRD5E).RACES, Eberron5E.RACES_ADDED);
Eberron5E.SPELLS_ADDED = {
  // Copied from Xanathar's
  'Gust':
    'School=Transmutation ' +
    'Level=D0,S0,W0 ' +
    'Description=' +
      '"R30\' Pushes the target creature 5\' (save Strength negates), pushes an unattended 5 lb object 10\', or creates a light breeze"'
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
if(window.Xanathar != null)
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
Eberron5E.SPELLS =
  Object.assign({}, (window.PHB5E||window.SRD5E).SPELLS, Eberron5E.SPELLS_ADDED);
if(window.Xanathar != null)
  Object.assign(Eberron5E.SPELLS, Xanathar.SPELLS);
for(let s in Eberron5E.SPELLS_LEVELS_ADDED)
  Eberron5E.SPELLS[s] =
    Eberron5E.SPELLS[s].replace('Level=', 'Level=' + Eberron5E.SPELLS_LEVELS_ADDED[s] + ',');
Eberron5E.TOOLS_ADDED = {
  'Vehicles (Air And Sea)':'Type=General'
};
Eberron5E.TOOLS =
  Object.assign({}, (window.PHB5E||window.SRD5E).TOOLS, Eberron5E.TOOLS_ADDED);
Eberron5E.WEAPONS_ADDED = {
  'Double-Bladed Scimitar':
    'Category="Martial Melee" Property=Two-Handed Damage=2d4'
};
Eberron5E.WEAPONS =
  Object.assign({}, (window.PHB5E||window.SRD5E).WEAPONS, Eberron5E.WEAPONS_ADDED);

/* Defines rules related to basic character identity. */
Eberron5E.identityRules = function(
  rules, alignments, backgrounds, classes, deities, paths, races, houses
) {
  SRD5E.identityRules(
    rules, SRD5E.ALIGNMENTS, Eberron5E.BACKGROUNDS, Eberron5E.CLASSES,
    Eberron5E.DEITIES, {}, Eberron5E.RACES
  );
  QuilvynUtils.checkAttrTable(houses, ['Dragonmark', 'Race', 'Tool', 'Spells']);
  for(let h in houses)
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
};

/*
 * Defines in #rules# the rules associated with class #name# that cannot be
 * derived directly from the attributes passed to classRules.
 */
Eberron5E.classRulesExtra = function(rules, name) {

  let classLevel = 'levels.' + name;

  if(name == 'Artificer') {
    // Copied from Tasha's
    rules.defineRule('armorerLevel',
      'features.Armorer', '?', null,
      'level', '=', null
    );
    rules.defineRule('battleSmithLevel',
      'features.Battle Smith', '?', null,
      'level', '=', null
    );
    rules.defineRule // Italics noop
      ('combatNotes.arcaneJolt', 'combatNotes.improvedDefender', '+', '0');
    rules.defineRule // Italics noop
      ('combatNotes.eldritchCannon', 'combatNotes.explosiveCannon', '+', '0');
    rules.defineRule // Italics noop
      ('featureNotes.infuseItem', 'featureNotes.armorModifications', '+', '0');
    rules.defineRule('magicNotes.magicItemAdept', // Italics noop
      'magicNotes.magicItemMaster', '+', '0',
      'magicNotes.magicItemSavant', '+', '0'
    );
    rules.defineRule('magicNotes.spellcasting.1', classLevel, '=', '1');
    rules.defineRule('combatNotes.extraAttack',
      'armorerLevel', '+=', 'source>=5 ? 1 : null',
      'battleSmithLevel', '+=', 'source>=5 ? 1 : null'
    );
    rules.defineRule('selectableFeatureCount.Artificer (Infusion)',
      'featureNotes.infuseItem', '?', null,
      classLevel, '=', 'Math.floor((source + 6) / 4) * 2'
    );
    rules.defineRule('selectableFeatureCount.Artificer (Specialist)',
      'featureNotes.artificerSpecialist', '=', '1'
    );
    rules.defineRule('selectableFeatureCount.Artificer (Armor Model)',
      'featureNotes.armorModel', '=', '1'
    );
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
    rules.defineRule('casterLevels.AberrantDragonmark',
      'features.Aberrant Dragonmark', '?', null,
      'level', '=', null,
      'levels.Sorcerer', 'v', '0'
    );
    rules.defineRule('spellModifier.AberrantDragonmark',
      'casterLevels.AberrantDragonmark', '?', null,
      'constitutionModifier', '=', null,
      'levels.Sorcerer', 'v', '0'
    );
    rules.defineRule
      ('casterLevels.S', 'casterLevels.AberrantDragonmark', '^=', null);
    rules.defineRule
      ('spellModifier.S', 'spellModifier.AberrantDragonmark', '^=', null);
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
    ['Tool Proficiency (' + tools.join('; ') + ')']
  );

  // This creates new spells for all the classes to cover those added by the
  // house spell lists. Arguably nice for Q to handle this, but disabled
  // because it bloats the spell list. Probably easier to let the user add
  // homebrew spells as needed.
  //
  // let allSpells = rules.getChoices('spells');
  // for(let i = 0; i < spells.length; i++) {
  //   let level = i + 1;
  //   let spellList = spells[i].split(/\s*,\s*/);
  //   for(let j = 0; j < spellList.length; j++) {
  //     let spellName = spellList[j];
  //     let fullName = QuilvynUtils.getKeys(allSpells, spellName + '\\(')[0];
  //     if(!fullName) {
  //       console.log('Unknown mark spell "' + spellName + '"');
  //       continue;
  //     }
  //     let description =
  //       QuilvynUtils.getAttrValue(allSpells[fullName], 'Description');
  //     let school = QuilvynUtils.getAttrValue(allSpells[fullName], 'School');
  //     let schoolPrefix = school.substring(0, 4);
  //     ['A', 'B', 'C', 'D', 'P', 'R', 'S', 'K', 'W'].forEach(group => {
  //       if(QuilvynUtils.getKeys(allSpells, '^' + spellName + '\\(' + group + level).length == 0) {
  //         let newName = spellName + '(' + group + level + ' [' + dragonmark + ' Spells] ' + schoolPrefix + ')';
  //         rules.defineChoice('spells', newName + ':' + allSpells[fullName]);
  //         SRD5E.spellRules(
  //           rules, newName, school, group, level, description, false
  //         );
  //       }
  //     });
  //   }
  // }

  // House feature spells that affect multiple races
  if(name == 'Tharashk') {
    rules.defineRule("spellAttackModifier.MarkOfFinding",
      "features.Finder's Magic", '?', null,
      'wisdomModifier', '=', null,
      'proficiencyBonus', '+', null
    );
    rules.defineRule("spellDifficultyClass.MarkOfFinding",
      "spellAttackModifier.MarkOfFinding", '=', '8 + source'
    );
    SRD5E.featureSpells(rules,
      "Finder's Magic", "MarkOfFinding", 'level',
      ["Hunter's Mark", '3:Locate Object']
    );
  }

};

/* Returns an array of plugins upon which this one depends. */
Eberron5E.getPlugins = function() {
  let result = [PHB5E, SRD5E];
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
  let result = [];
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
    let allHouses = this.getChoices('houses');
    let race = attributes.race;
    let baseRace = race.replace(/.*\s+/, ''); // Get last word of race
    let dragonmarkRace = race.includes('Mark Of');
    let choices = [];
    for(let house in allHouses) {
      let houseAttrs = allHouses[house];
      let houseDragonmark = QuilvynUtils.getAttrValue(houseAttrs, 'Dragonmark');
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
    '<h3>Usage Notes</h3>\n' +
    '<ul>\n' +
    '  <li>\n' +
    '  The Eberron 5E rule set allows you to add homebrew choices for' +
    '  all of the same types discussed in the <a href="plugins/homebrew-srd5e.html">SRD 5E Homebrew Examples document</a>.' +
    '  </li>\n' +
    '</ul>\n' +
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
