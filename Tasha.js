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
/* globals SRD5E, PHB5E, Xanathar, QuilvynUtils */
"use strict";

/*
 * This module loads the rules from Fifth Edition Tasha's Cauldron of
 * Everything. The Tasha function contains methods that load rules for
 * particular parts of the rules; classRules for character classes, magicRules
 * for spells, etc. These member methods can be called independently in order
 * to use a subset of TCOE. Similarly, the constant fields of Tasha (FEATS,
 * PATHS, etc.) can be manipulated to modify the choices.
 */
function Tasha(edition, rules) {

  if(window.PHB5E == null) {
    alert('The Tasha module requires use of the PHB5E module');
    return;
  }

  if(rules == null)
    rules = PHB5E.rules;

  Tasha.identityRules(
    rules, Tasha.CLASSES, Tasha.CLASSES_FEATURES_ADDED,
    Tasha.CLASSES_SELECTABLES_ADDED, Tasha.DEITIES_DOMAINS_ADDED, Tasha.PATHS
  );
  Tasha.magicRules(rules, Tasha.SPELLS, Tasha.SPELLS_LEVELS_ADDED);
  Tasha.talentRules(rules, Tasha.FEATS, Tasha.FEATURES);

}

Tasha.VERSION = '2.3.1.0';

Tasha.CLASSES = {
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
      '"3:Armorer:Specialist",' +
      '"3:Artillerist:Specialist",' +
      '"3:Battle Smith:Specialist",' +
      '"3:Guardian Armor:Armor Model",' +
      '"3:Infiltrator Armor:Armor Model",' +
      '"14:Arcane Propulsion Armor:Infusion",' +
      '"2:Armor Of Magical Strength:Infusion",' +
      '"6:Boots Of The Winding Path:Infusion",' +
      '"2:Enhanced Arcane Focus:Infusion",' +
      '"2:Enhanced Defense:Infusion",' +
      '"2:Enhanced Weapon:Infusion",' +
      '"10:Helm Of Awareness:Infusion",' +
      '"2:Homunculus Servant:Infusion",' +
      '"2:Mind Sharpener:Infusion",' +
      '"6:Radiant Weapon:Infusion",' +
      '"2:Repeating Shot:Infusion",' +
      '"2:Replicate Magic Item:Infusion",' +
      '"6:Repulsion Shield:Infusion",' +
      '"6:Resistant Armor:Infusion",' +
      '"2:Returning Weapon:Infusion",' +
      '"6:Spell-Refueling Ring:Infusion" ' +
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

Tasha.CLASSES_FEATURES_ADDED = {
  'Barbarian':
    '"3:Primal Knowledge",' +
    '"7:Instinctive Pounce"',
  'Bard':
    '"2:Magical Inspiration",' +
    '"4:Bardic Versatility"',
  'Cleric':
    '"2:Harness Divine Power",' +
    '"4:Cantrip Versatility",' +
    '"8:Blessed Strikes"',
  'Druid':
    '"2:Wild Companion",' +
    '"4:Cantrip Versatility"',
  'Fighter':
    '"4:Martial Versatility"',
  'Monk':
    '"2:Dedicated Weapon",' +
    '"3:Ki-Fueled Attack",' +
    '"4:Quickened Healing",' +
    '"5:Focused Aim"',
  'Paladin':
    '"3:Harness Divine Power",' +
    '"4:Martial Versatility"',
  'Ranger':
    '"1:Deft Explorer",' +
    '"1:Canny",' +
    '"1:Favored Foe",' +
    '"2:Spellcasting Focus",' +
    '"3:Primal Awareness",' +
    '"4:Martial Versatility",' +
    '"6:Roving",' +
    '"10:Nature\'s Veil",' +
    '"10:Tireless"',
  'Rogue':
    '"3:Steady Aim"',
  'Sorcerer':
    '"3:Magical Guidance",' +
    '"4:Sorcerous Versatility"',
  'Warlock':
    '"4:Eldritch Versatility"',
  'Wizard':
    '"3:Cantrip Formulas"'
};

Tasha.CLASSES_SELECTABLES_ADDED = {
  'Barbarian':
    '"3:Path Of The Beast:Primal Path",' +
    '"3:Path Of Wild Magic:Primal Path"',
  'Bard':
    '"3:College Of Creation:Bard College",' +
    '"3:College Of Eloquence:Bard College"',
  'Cleric':
    '"deityDomains =~ \'Order\' ? 1:Order Domain:Divine Domain",' +
    '"deityDomains =~ \'Peace\' ? 1:Peace Domain:Divine Domain",' +
    '"deityDomains =~ \'Twilight\' ? 1:Twilight Domain:Divine Domain"',
  'Druid':
    '"2:Circle Of Spores:Druid Circle",' +
    '"2:Circle Of Stars:Druid Circle",' +
    '"2:Circle Of Wildfire:Druid Circle"',
  'Fighter':
    '"1:Fighting Style (Blind Fighting):Fighting Style",' +
    '"1:Fighting Style (Interception):Fighting Style",' +
    '"1:Fighting Style (Superior Technique):Fighting Style",' +
    '"1:Fighting Style (Thrown Weapon Fighting):Fighting Style",' +
    '"1:Fighting Style (Unarmed Fighting):Fighting Style",' +
    '"3:Ambush:Maneuver","3:Bait And Switch:Maneuver","3:Brace:Maneuver",' +
    '"3:Commanding Presence:Maneuver","3:Grappling Strike:Maneuver",' +
    '"3:Quick Toss:Maneuver","3:Tactical Assessment:Maneuver",' +
    '"3:Psi Warrior:Martial Archetype",' +
    '"3:Rune Knight:Martial Archetype",' +
    '"3:Cloud Rune:Rune",' +
    '"3:Fire Rune:Rune",' +
    '"3:Frost Rune:Rune",' +
    '"3:Stone Rune:Rune",' +
    '"7:Hill Rune:Rune",' +
    '"7:Storm Rune:Rune"',
  'Monk':
    '"3:Way Of Mercy:Monastic Tradition",' +
    '"3:Way Of The Astral Self:Monastic Tradition"',
  'Paladin':
    '"2:Fighting Style (Blessed Warrior):Fighting Style",' +
    '"2:Fighting Style (Blind Fighting):Fighting Style",' +
    '"2:Fighting Style (Interception):Fighting Style",' +
    '"3:Oath Of Glory:Sacred Oath",' +
    '"3:Oath Of The Watchers:Sacred Oath"',
  'Ranger':
    '"2:Fighting Style (Blind Fighting):Fighting Style",' +
    '"2:Fighting Style (Druidic Warrior):Fighting Style",' +
    '"2:Fighting Style (Thrown Weapon Fighting):Fighting Style",' +
    '"3:Fey Wanderer:Ranger Archetype",' +
    '"3:Swarmkeeper:Ranger Archetype"',
  'Rogue':
    '"3:Phantom:Roguish Archetype",' +
    '"3:Soulknife:Roguish Archetype"',
  'Sorcerer':
    '"1:Aberrant Mind:Sorcerous Origin",' +
    '"1:Clockwork Soul:Sorcerous Origin",' +
    '"3:Seeking Spell:Metamagic",' +
    '"3:Transmuted Spell:Metamagic"',
  'Warlock':
    '"1:The Fathomless:Otherworldly Patron",' +
    '"1:The Genie:Otherworldly Patron",' +
    '"1:Dao:Genie Kind",' +
    '"1:Djinni:Genie Kind",' +
    '"1:Efreeti:Genie Kind",' +
    '"1:Marid:Genie Kind",' +
    '"3:Pact Of The Talisman:Pact Boon",' +
    '"features.Pact Of The Talisman ? 12:Bond Of The Talisman:Eldritch Invocation",' +
    '"2:Eldritch Mind:Eldritch Invocation",' +
    '"features.Pact Of The Tome ? 5:Far Scribe:Eldritch Invocation",' +
    '"features.Pact Of The Tome ? 9:Gift Of The Protectors:Eldritch Invocation",' +
    '"features.Pact Of The Chain ? 2:Investment Of The Chain Master:Eldritch Invocation",' +
    '"features.Pact Of The Talisman ? 7:Protection Of The Talisman:Eldritch Invocation",' +
    '"features.Pact Of The Talisman ? 2:Rebuke Of The Talisman:Eldritch Invocation",' +
    '"2:Undying Servitude:Eldritch Invocation"',
  'Wizard':
    '"2:Bladesinging:Arcane Tradition",' +
    '"2:Order Of Scribes:Arcane Tradition"'
};
Tasha.DEITIES_DOMAINS_ADDED = {
  'None':'Order,Peace,Twilight',
  'FR-Bane':'Order',
  'FR-Eldath':'Peace',
  'FR-Helm':'Twilight',
  'FR-Ilmater':'Twilight',
  'FR-Selune':'Twilight',
  'FR-Tyr':'Order',
  'Greyhawk-Pholtus':'Order',
  'Greyhawk-Wee Jas':'Order',
  'Greyhawk-Rao':'Peace',
  'Greyhawk-Celestian':'Twilight',
  'NH-Yondalla':'Twilight',
  // Dragonlance
  'Majere':'Order',
  'Mishalkal':'Twilight',
  'Paladine':'Peace',
  // Eberron
  'Aureon':'Order',
  'Boldrei':'Peace,Twilight',
  'Dol Arrah':'Twilight',
  // SwordCoast
  'Angharradh':'Peace',
  'Bane':'Order',
  'Berronar Truesilver':'Peace',
  'Cyrrollalee':'Peace',
  'Eldath':'Peace',
  'Gaerdal Ironhand':'Peace',
  'Helm':'Twilight',
  'Ilmater':'Twilight',
  'Selune':'Twilight',
  'Tyr':'Order',
  'Yondalla':'Twilight'
};
Tasha.FEATS = {
  'Artificer Initiate':'Type=General',
  'Chef':'Type=General',
  'Crusher':'Type=General',
  'Eldritch Adept':
    'Type=General Require="features.Spellcasting||features.Pact Magic"',
  'Fey Touched':'Type=General',
  'Fighting Initiate':
    'Type=General Require="features.Weapon Proficiency (Martial)"',
  'Gunner':'Type=General',
  'Metamagic Adept':
    'Type=General Require="features.Spellcasting||features.Pact Magic"',
  'Piercer':'Type=General',
  'Poisoner':'Type=General',
  'Shadow Touched':'Type=General',
  'Skill Expert':'Type=General',
  'Slasher':'Type=General',
  'Telekinetic (Charisma)':'Type=General',
  'Telekinetic (Intelligence)':'Type=General',
  'Telekinetic (Wisdom)':'Type=General',
  'Telepathic':'Type=General'
};
Tasha.FEATURES = {

  // Class
  'Ambush':
    'Section=combat,skill ' +
    'Note="Spend 1 Superiority Die to add roll to initiative roll",' +
         '"Spend 1 Superiority Die to add roll to Stealth check"',
  'Arcane Propulsion Armor':
    'Section=magic ' +
    'Note="Gives +5\' Speed, magical gauntlets inflict 1d8 HP force range 20/60 and returns, replaces missing limbs"',
  'Armor Of Magical Strength':
    'Section=magic ' +
    'Note="Gives +%{intelligenceModifier} Str check or saving throw or use Reaction to avoid being knocked prone; 6 charges regains 1d6/dy"',
  'Bait And Switch':
    'Section=combat ' +
    'Note="Spend 1 Superiority Die for R5\' swap w/willing creature; both add rolled value to AC for 1 rd"',
  'Bardic Versatility':
    'Section=feature ' +
    'Note="Replace skill expertise or cantrip when boosting ability or taking feat"',
  'Bond Of The Talisman':
    'Section=magic ' +
    'Note="Self or talisman wearer teleport to each other %{proficiencyBonus}/long rest"',
  'Boots Of The Winding Path':
    'Section=magic Note="Gives ability to teleport 15\'"',
  'Brace':
    'Section=combat ' +
    'Note="Spend 1 Superiority Die to use Reaction to attack creature that moves into range and add roll to damage"',
  'Canny':
    'Section=skill Note="+2 Language Count/Dbl proficiency on chosen skill"',
  'Cantrip Formulas':'Section=magic Note="Replace cantrip 1/long rest"',
  'Cantrip Versatility':
    'Section=feature ' +
    'Note="Replace 1 cantrip when boosting ability or taking feat"',
  'Commanding Presence':
    'Section=skill ' +
    'Note="Spend 1 Superiority Die to add roll to Intimidation, Performance, or Persuasion check"',
  'Dedicated Weapon':
    'Section=combat ' +
    'Note="Designate non-heavy weapon as monk weapon 1/short rest"',
  'Deft Explorer':'Section=feature Note="Gain Canny%1 feature%2"',
  'Eldritch Mind':
    'Section=magic Note="Adv on Con saves to maintain concentration"',
  'Eldritch Versatility':
    'Section=feature Note="Replace %V when boosting ability or taking feat"',
  'Enhanced Arcane Focus':
    'Section=magic ' +
    'Note="Rod, staff, or wand gives +%V spell attacks, ignores half cover"',
  'Enhanced Defense':'Section=magic Note="Shield or armor gives +%V AC"',
  'Enhanced Weapon':'Section=magic Note="Gives +%V attack and damage"',
  'Far Scribe':
    'Section=magic ' +
    'Note="Cast <i>Sending</i> to %{proficiencyBonus} targets whose names are written in Book Of Shadows"',
  'Favored Foe':
    'Section=combat ' +
    'Note="Hit on marked foe inflicts +1d%V HP weapon damage for conc or 1 min %{proficiencyBonus}/long rest"',
  'Fighting Style (Blind Fighting)':
    'Section=combat Note="R10\' Detect invisible creatures"',
  'Fighting Style (Blessed Warrior)':
    'Section=magic Note="Know 2 C0 cantrips, replace 1 each level"',
  'Fighting Style (Druidic Warrior)':
    'Section=magic Note="Know 2 D0 cantrips, replace 1 each level"',
  'Fighting Style (Interception)':
    'Section=combat ' +
    'Note="R5\' Use Reaction to negate 1d10+%{proficiencyBonus} HP damage"',
  'Fighting Style (Superior Technique)':
    'Section=combat Note="Combat Superiority (1 maneuver, 1 die)"',
  'Fighting Style (Thrown Weapon Fighting)':
    'Section=combat ' +
    'Note="Draw thrown weapon as part of Attack action, +2 HP weapon damage with thrown weapon"',
  'Fighting Style (Unarmed Fighting)':
    'Section=combat ' +
    'Note="Unarmed hit inflicts 1d6+%{strengthModifier} HP bludgeoning (1d8+%{strengthModifier} when unarmed and shieldless) or 1d4 HP bludgeoning to grappled foe"',
  'Grappling Strike':
    'Section=combat ' +
    'Note="After a hit, spend 1 Superiority Die and add roll to grapple check"',
  'Flash Of Genius':
    'Section=feature ' +
    'Note="R30\' Use Reaction to give ally +%{intelligenceModifier} on ability check or saving throw %{intelligenceModifier>?1}/long rest"',
  'Focused Aim':
    'Section=combat ' +
    'Note="Spend 1 - 3 Ki Points for +2/Ki Point on missed attack roll"',
  'Gift Of The Protectors':
    'Section=magic ' +
    'Note="Target whose name is written in Book Of Shadows retains 1 HP when reduced to 0 HP 1/long rest"',
  'Harness Divine Power':
     'Section=magic ' +
     'Note="Use Channel Divinity to regain spell slot up to level %{(proficiencyBonus+1)//2} %V/long rest"',
  'Helm Of Awareness':
    'Section=magic Note="Gives Adv on initiative and cannot be surprised"',
  'Homunculus Servant':
    'Section=magic ' +
    'Note="Creates mechanical companion (AC 13, HP %{levels.Artificer+intelligenceModifier+1}, Attack R30\' +%1 inflicts 1d4+%2 HP force, Evasion, Channel Magic) that obeys self"',
  'Infuse Item':'Section=feature Note="%V selections infused into %1 items"',
  'Instinctive Pounce':
    'Section=combat Note="Move %{speed//2}\' when entering rage"',
  'Investment Of The Chain Master':
    'Section=magic Note="Familiar inflicts DC %{spellDifficultyClass.K} saves and gains 40\' fly or swim and magical attacks; self can command familiar to attack and can use Reaction to give it resistance to damage"',
  'Ki-Fueled Attack':
   'Section=combat Note="Spend 1 Ki Point for bonus monk weapon attack"',
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
  'Martial Versatility':
    'Section=feature ' +
    'Note="Replace Fighting Style or maneuver when boosting ability or taking feat"',
  'Magical Inspiration':
    'Section=magic ' +
    'Note="Bardic Inspiration Die roll can be added to magical harm or healing"',
  'Mind Sharpener':
    'Section=magic ' +
    'Note="Gives Reaction to change failed Con save to success; 4 charges regains 1d4/dy"',
  "Nature's Veil":
    'Section=magic ' +
    'Note="Self becomes invisible for 1 rd %{proficiencyBonus}/long rest"',
  'Pact Of The Talisman':
    'Section=feature ' +
    'Note="Talisman gives +1d4 ability checks %{proficiencyBonus}/long rest"',
  'Primal Awareness':
    'Section=magic Note="Cast <i>Speak With Animals</i>%1 1/long rest"',
  'Primal Knowledge':
    'Section=feature Note="Skill Proficiency (Choose %V from Animal Handling, Athletics, Intimidation, Nature, Perception, Survival)%1"',
  'Protection Of The Talisman':
    'Section=magic ' +
    'Note="Talisman wearer gains +1d4 saving throw %{proficiencyBonus}/long rest"',
  'Quick Toss':
    'Section=combat ' +
    'Note="Spend 1 Superiority Die for bonus thrown attack and add roll to damage"',
  'Quickened Healing':
    'Section=combat ' +
    'Note="Spend 2 Ki Points to heal 1d%{combatNotes.martialArts}+%{proficiencyBonus} HP"',
  'Radiant Weapon':
    'Section=magic ' +
    'Note="Gives +1 attack and damage, 30\' bright light, blinds successful attacker (DC %{spellDifficultyClass.A} Con neg) for 1 rd; 4 charges regains 1d4/dy"',
  'Rebuke Of The Talisman':
    'Section=magic ' +
    'Note="R30\' Use Reaction to inflict %{proficiencyBonus} HP psychic and 10\' push on attacker when talisman wearer hit"',
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
  'Roving':'Section=ability Note="+5 Speed/%{speed}\' climb/%{speed}\' swim"',
  'Soul Of Artifice':
    'Section=combat,save ' +
    'Note="End 1 attunement when reduced to 0 HP to retain 1 HP",' +
         '"+1 per attunement on saves"',
  'Spell-Refueling Ring':
    'Section=feature Note="Gives recovered level 3 spell 1/dy"',
  'Spell-Storing Item':
    'Section=feature ' +
    'Note="After a long rest, store A1 or A2 spell in item to be cast %{intelligenceModifier*2>?2} times"',
  'Spellcasting Focus':
    'Section=magic Note="Use druidic focus for ranger spells"',
  'Tactical Assessment':
    'Section=skill ' +
    'Note="Spend 1 Superiority Die to add roll to Investigation, History, or Insight check"',
  'The Right Tool For The Job':
    'Section=feature Note="Spend 1 hr to create 1 set of artisan\'s tools"',
  'Tireless':
    'Section=combat ' +
    'Note="Self gains 1d8+%{wisdomModifier} temporary HP %{proficiencyBonus}/long rest, short rest reduces exhaustion by 1"',
  'Tool Expertise':'Section=feature Note="Dbl proficiency when using tools"',
  'Undying Servitude':
    'Section=magic Note="Cast <i>Animate Dead</i> 1/long rest"',
  'Wild Companion':
    'Section=magic ' +
    'Note="Expend 1 Wild Shape use to cast <i>Find Familiar</i> to summon fey, lasting %{levels.Druid//2} hr"',

  // Feats
  'Artificer Initiate':
    'Section=magic,skill ' +
    'Note="Know 1 A0 spell, cast 1 A1 spell 1/long rest",' +
         '"Tool Proficiency (Choose 1 from any Artisan)"',
  'Chef':
    'Section=ability,feature,magic ' +
    'Note="+1 Constitution or Wisdom",' +
         '"Tool Proficiency (Cook\'s Utensils)",' +
         '"Food prepared during short rest heals 1d8 HP for %{proficiencyBonus+4} targets; treats prepared during long rest give %{proficiencyBonus} temporary HP to %{proficiencyBonus} targets"',
  'Crusher':
    'Section=ability,combat ' +
    'Note="+1 Constitution or Strength",' +
         '"Bludgeoning hit moves foe 5\'; critical hit gives allies Adv on attacks for 1 rd"',
  'Eldritch Adept':
    'Section=feature ' +
    'Note="Learn 1 Eldritch Invocation, replace when gaining level"',
  'Fey Touched':
    'Section=ability,magic ' +
    'Note="+1 Charisma, Intelligence, or Wisdom",' +
         '"Cast <i>Misty Step</i> and 1 level 1 Divination or Enchantment spell 1/long rest"',
  'Fighting Initiate':
    'Section=feature ' +
    'Note="Learn 1 Fighting Style, replace when boosting ability or taking feat"',
  'Gunner':
    'Section=ability,combat,feature ' +
    'Note="+1 Dexterity",' +
         '"Attacks not slowed by loading, no Disadv on ranged attacks w/in 5\' of foe",' +
         '"Weapon Proficiency (Firearms)"',
  'Metamagic Adept':
    'Section=feature ' +
    'Note="Gain 2 Sorcery Points, learn 2 Metamagic options, replace 1 when boosting ability or taking feat"',
  'Piercer':
    'Section=ability,combat ' +
    'Note=' +
      '"+1 Strength or Dexterity",' +
      '"Additional piercing critical hit die, reroll 1 piercing damage die 1/rd"',
  'Poisoner':
    'Section=combat,skill ' +
    'Note=' +
      '"Ignore poison resistance, coat weapon w/poison for 1 min (inflicts +2d8 HP poison and poisoned condition (DC 14 Con neg) for 1 rd)",' +
      '"Tool Proficiency (Poisoner\'s Kit)"',
  'Shadow Touched':
    'Section=ability,magic ' +
    'Note=' +
      '"+1 Intelligence, Wisdom, or Charisma",' +
      '"Cast <i>Invisibility</i> and 1 level 1 Illusion or Necromancy spell 1/long rest"',
  'Skill Expert':
    'Section=ability,feature,skill ' +
    'Note="+1 Ability Boosts",' +
         '"Skill Proficiency (Choose 1 from any)",' +
         '"Dbl proficiency in chosen skill"',
  'Slasher':
    'Section=ability,combat ' +
    'Note="+1 Strength or Dexterity",' +
         '"Slashing damage inflicts -10 Speed for 1 rd; critical hit inflicts Disadv on attacks for 1 rd"',
  'Telekinetic (Charisma)':
    'Section=ability,combat,magic ' +
    'Note="+1 Charisma",' +
         '"R30\' Telepathic shove moves target 5\' (DC %{8+proficiencyBonus+charismaModifier} Str neg)",' +
         '"Cast <i>Mage Hand</i>"',
  'Telekinetic (Intelligence)':
    'Section=ability,combat,magic ' +
    'Note="+1 Intelligence",' +
         '"R30\' Telepathic shove moves target 5\' (DC %{8+proficiencyBonus+intelligenceModifier} Str neg)",' +
         '"Cast <i>Mage Hand</i>"',
  'Telekinetic (Wisdom)':
    'Section=ability,combat,magic ' +
    'Note="+1 Wisdom",' +
         '"R30\' Telepathic shove moves target 5\' (DC %{8+proficiencyBonus+wisdomModifier} Str neg)",' +
         '"Cast <i>Mage Hand</i>"',
  'Telepathic':
    'Section=ability,feature,magic ' +
    'Note="+1 Charisma, Intelligence, or Wisdom",' +
         '"R60\' Speak telepathically",' +
         '"Cast <i>Detect Thoughts</i> 1/long rest"',

  // Paths
  'Abjure The Extraplanar':
    'Section=combat Note="R30\' Use Channel Divinity to turn aberrations, celestials, elementals, fey, and fiends for 1 min (DC %V Wis neg)"',
  'Alchemical Savant':
    'Section=magic ' +
    'Note="+%{intelligenceModifier>?1} on spell healing and acid, fire, necrotic, or poison damage"',
  'Alchemist Tool Proficiency':
    'Section=feature Note="Tool Proficiency (Alchemist\'s Supplies)"',
  'Animating Performance':
    'Section=magic ' +
    'Note="R30\' Animated large object (AC 16, HP %{levels.Bard*5+10} MV/Fly 30\', Attack +%{spellAttackModifier.B} inflicts 1d10+%{proficiencyBonus}, Irrepressible Dance R10\' inflicts -10\' or +10\' Speed) obeys self commands for 1 hr 1/long rest (spend level 3 spell slot for additional)"',
  'Arcane Armor':
    'Section=combat ' +
    'Note="Self armor negates any Str requirement, covers whole body, replaces missing limbs, and can be put on or taken off in 1 action"',
  'Arcane Firearm':
    'Section=magic ' +
    'Note="Spells cast through prepared wand, staff, or rod inflict +1d8 HP damage"',
  'Arcane Jolt':
    'Section=combat ' +
    'Note="Magic weapon or Steel Defender attack inflicts +%Vd6 HP force or heals 1 target in 30\' radius %Vd6 HP %{intelligenceModifier>?1}/long rest"',
  'Armor Modifications':
    'Section=feature ' +
    'Note="+2 Infused Items, apply 4 infusions to armor pieces"',
  'Arms Of The Astral Self':
    'Section=ability,combat ' +
    'Note="Spend 1 Ki to gain +%{wisdomModifier-strengthModifier} Str checks",' +
         '"Spend 1 Ki for R10\' targets suffer 2d%{combatNotes.martialArts} HP force (DC %{kiSaveDC} Dex neg); self gains +5\' unarmed reach, unarmed +%{wisdomModifier-maxDexOrStrMod} attack and +1 HP force damage for 10 min"',
  'Artillerist Tool Proficiency':
    'Section=feature Note="Tool Proficiency (Woodcarver\'s Tools)"',
  'Aura Of Alacrity':
    'Section=ability,magic ' +
    'Note="+10 Speed","R%V\' Allies +10\' Speed for 1 rd"',
  'Aura Of The Sentinel':
    'Section=combat ' +
    'Note="+%V Initiative/R%1\' Targets gain +%V on Initiative"',
  'Awakened Astral Self':
    'Section=combat Note="Spend 5 Ki Points to summon Arms, Visage, and Body Of The Astral Self and gain +2 AC and 1 extra Arms attack/rd"',
  'Awakened Spellbook':
    'Section=magic ' +
    'Note="Perform ritual casting in normal casting time 1/long rest, use spellbook as focus, change spell damage type"',
  'Balm Of Peace':
    'Section=magic ' +
    'Note="Use Channel Divinity to move %{speed}\' w/out OA and heal 2d6+%{wisdomModifier} HP to each target w/in 5\'"',
  'Bastion Of Law':
    'Section=magic ' +
    'Note="R30\' Spend 1 - 5 Sorcery Points to absorb equal d8 HP damage to target until next use or long rest"',
  'Battle Ready':
    'Section=combat,feature ' +
    'Note="+%{intelligenceModifier-strengthModifier} (Int instead of Str) or +%{intelligenceModifier-dexterityModifier} (Int instead of Dex) attack and damage w/magic weapons",' +
         '"Weapon Proficiency (Martial)"',
  'Battle Smith Tool Proficiency':
    'Section=feature Note="Tool Proficiency (Smith\'s Tools)"',
  'Beguiling Twist':
    'Section=combat,save ' +
    'Note="Use Reaction to redirect saved charm or fright effect to different target for 1 min (DC %V Wis ends)",' +
         '"Adv on saves vs. charm and fright"',
  'Bestial Soul':
    'Section=ability,combat ' +
    'Note="Gain %{speed}\' swim and breathe water, %{40}\' climb and climb difficult surfaces, or extend jump by Athletics check roll/short rest",' +
        '"Natural weapon counts as magic"',
  'Bladesong':
    'Section=ability,combat,magic,skill ' +
    'Note=' +
      '"+10 Speed in light or no armor and no shield for 1 min 2/short rest",' +
      '"+%V AC in light or no armor and no shield for 1 min 2/short rest",' +
      '"+%V Concentration to retain spell in light or no armor and no shield for 1 min 2/short rest",' +
      '"Adv on Acrobatics in light or no armor and no shield for 1 min 2/short rest"',
  'Blazing Revival':
    'Section=magic ' +
    'Note="R120\' Extinguish Wildfire Spirit to regain %{hitPoints//2} HP when reduced to 0 HP 1/long rest"',
  'Blessed Strikes':
    'Section=combat Note="Cantrip or weapon hit does +1d8 HP radiant 1/rd"',
  'Body Of The Astral Self':
    'Section=combat Note="Summon both Arms and Visage Of The Astral Self to use Reaction to negate 1d10+%{wisdomModifier} HP acid, cold, fire, force, lightning, or thunder damage and inflict +1d%{combatNotes.martialArts} HP damage on 1 Arms hit/rd"',
  'Bolstering Magic':
    'Section=magic ' +
    'Note="Touched gains +1d3 attacks and ability checks for 10 min or regains level 1d3 spell slot 1/long rest %{proficiencyBonus}/long rest"',
  'Bulwark Of Force':
    'Section=combat ' +
    'Note="R30\' Give %{intelligenceModifier} targets half cover for 1 min 1/long rest (spend 1 Psionic Energy die for additional)"',
  'Call The Hunt':
    'Section=combat Note="During rage, R30\' %{constitutionModifier>?1} targets gain +1d6 HP damage 1/rd, self gains 5 temporary HP/target %{proficiencyBonus}/long rest"',
  'Cauterizing Flames':
    'Section=magic ' +
    'Note="R30\' Create spectral flame for 1 min when creature dies; use to heal or inflict 2d10+%{wisdomModifier} HP fire on another in same space %{proficiencyBonus}/long rest"',
  'Chemical Mastery':
    'Section=magic,save ' +
    'Note="Cast <i>Greater Restoration</i> and <i>Heal</i> 1/long rest",' +
         '"Resistance to acid and poison damage, immune to poisoned condition"',
  'Clockwork Cavalcade':
    'Section=magic ' +
    'Note="30\' cu heals 100 HP total to targets, repairs damaged objects, and dismisses target spells up to 6th level 1/long rest (spend 7 Sorcery Points for additional)"',
  'Clockwork Magic':'Section=magic Note="Access to additional spells"',
  'Cloud Rune':
    'Section=combat,skill ' +
    'Note="R30\' Use Reaction to redirect damage to different target %V/short rest",' +
         '"Adv on Sleight Of Hand and Deception"',
  'Controlled Surge':'Section=magic Note="Choose from 2 Wild Magic effects"',
  'Cosmic Omen':
    'Section=magic ' +
    'Note="R30\' Use Reaction to impose +1d6 or -1d6 on attack, ability, and saving throws %{proficiencyBonus}/long rest"',
  'Creative Crescendo':
    'Section=magic ' +
    'Note="Use Performance Of Creation to create %{(charismaModifier-1)>?1} additional small objects"',
  'Dampening Field':'Section=skill Note="Armor gives Adv on Stealth"',
  "Death's Friend":
    'Section=combat,feature ' +
    'Note="Sneak Attack target affected by Wails From The Grave use",' +
         '"Minimum 1 Soul Trinket after long rest"',
  'Defensive Field':
    'Section=combat ' +
    'Note="Armor gives %{level} temporary HP %{proficiencyBonus}/long rest"',
  'Dreadful Strikes':
    'Section=combat ' +
    'Note="Weapon hit does +1d%{levels.Ranger<11?4:6} HP psychic 1/rd"',
  'Eldritch Cannon':
    'Section=combat ' +
    'Note="Create magical, AC 18, %{levels.Artificer*5} HP (<i>Mending</i> repairs 2d6 HP), MV 15\' flamethrower (15\' cone inflicts %Vd8 HP fire (DC %1 Dex half)), force ballista (R120\' inflicts %Vd8 force and pushes 5\'), or protector (R10\' targets gain 1d8+%{intelligenceModifier>?1} temporary HP) for 1 hr"',
  'Elemental Gift':
    'Section=ability,save ' +
    'Note="30\' fly for 10 min %{proficiencyBonus}/long rest",' +
         '"Resistance to %{genieEnergy} damage"',
  'Embodiment Of The Law':
    'Section=magic ' +
    'Note="Cast Enchantment spells as bonus action %{wisdomModifier>?1}/long rest"',
  'Emboldening Bond':
    'Section=magic ' +
    'Note="R30\' %{proficiencyBonus} willing targets gain +1d4 on 1 attack, ability, or saving throw/rd when w/in 30\' of each other for 10 min %{proficiencyBonus}/long rest"',
  'Expansive Bond':
    'Section=magic Note="Protective Bond works at 60\' and grants resistance to damage"',
  'Enhanced Bond':
    'Section=magic ' +
    'Note="Fire spells inflict +1d8 HP fire, healing spells heal +1d8 HP, can cast through Wildfire Spirit"',
  'Experimental Elixir':
    'Section=magic ' +
    'Note="After a long rest, use alchemist\'s supplies to create %V elixirs of healing, swiftness, resilience, boldness, flight, or transformation (spend spell slot for additional)"',
  'Explosive Cannon':
    'Section=combat ' +
    'Note="Eldritch Cannon +1d8 HP damage, command explosion to inflict 3d8 HP force (DC %V Dex half) in 20\' radius"',
  'Eyes Of Night':
    'Section=feature ' +
    'Note="R300\' Darkvision can be shared w/%{wisdomModifier>?1} others w/in 10\' for 1 hr 1/long rest (spend spell slot for additional)"',
  'Fathomless Plunge':
    'Section=magic ' +
    'Note="R30\' Teleport self and 5 willing targets 1 mile to body of water 1/short rest"',
  'Fey Reinforcements':
    'Section=magic Note="Cast <i>Summon Fey</i> 1/long rest, optionally for 1 min instead of conc, 1/long rest"',
  'Fey Wanderer Magic':
    'Section=feature,magic ' +
    'Note="Gain Feywild Gift","Access to additional spells"',
  'Fire Rune':
    'Section=combat,skill ' +
    'Note="Hit restrains and inflicts +2d6 HP fire/rd (DC %{8+proficiencyBonus+constitutionModifier} Str ends) for 1 min %V/short rest",' +
         '"Dbl proficiency when using tools"',
  'Flurry Of Healing And Harm':
    'Section=combat ' +
    'Note="Substitute Hand Of Healing for multiple strikes in Flurry Of Blows, use Hand Of Harm once during Flurry Of Blows w/out spending Ki Point"',
  'Form Of The Beast':
    'Section=combat ' +
    'Note="Gain bite (inflicts 1d8+%{strengthModifier} HP piercing, on hit regain %{proficiencyBonus} HP if below %{hitPoints//2} 1/rd), claws (each inflicts 1d6+%{strengthModifier} HP slashing, additional attack 1/rd), or tail (R+5\' inflicts 1d8+%{strengthModifier} HP slashing, use Reaction for +1d8 AC) natural weapon when entering rage"',
  'Fortified Position':
    'Section=combat ' +
     'Note="Create 2nd Eldritch Cannon, gain half cover w/in 10\' of Eldritch Cannon"',
  'Frost Rune':
    'Section=ability,save,skill ' +
    'Note="Invoke for +2 Str and Con checks for 10 min 1/short rest",' +
         '"Adv on Animal Handling and Intimidation",' +
         '"Invoke for +2 on Str and Con saves for 10 min 1/short rest"',
  'Full Of Stars':
    'Section=save ' +
    'Note="Starry Form gives resistance to bludgeoning, piercing, and slashing damage"',
  'Fungal Body':
    'Section=combat,save ' +
    'Note="Immune to critical hits",' +
         '"Immune to blinded, deafened, frightened, and poisoned conditions"',
  'Fungal Infestation':
    'Section=magic Note="R10\' Use Reaction to animate creature that dies into 1 HP zombie that obeys self mental commands for 1 hr %{wisdomModifier>?1}/long rest"',
  'Gathered Swarm':
    'Section=combat Note="After a hit, companion swarm moves self 5\', moves foe 15\' (DC %V Str neg), or inflicts 1d%1 HP piercing"',
  "Genie's Vessel":
    'Section=magic ' +
    'Note="Retreat into vessel for %{proficiencyBonus*2} hr 1/long rest, inflict +%{proficiencyBonus} HP %{genieEnergy} 1/rd"',
  'Ghost Walk':
    'Section=feature ' +
    'Note="Spectral form gives 10\' fly, Disadv foe attacks, move through objects for 10 min 1/long rest (destroy Soul Trinket for additional)"',
  "Giant's Might":
    'Section=ability,combat,feature,save ' +
    'Note="Adv Str checks for 1 min %{proficiencyBonus}/long rest",' +
         '"+1d%V HP weapon damage 1/rd for 1 min %{proficiencyBonus}/long rest",' +
         '"Grow to %V for 1 min %{proficiencyBonus}/long rest",' +
         '"Adv Str saves for 1 min %{proficiencyBonus}/long rest"',
  'Gift Of The Sea':'Section=ability Note="40\' swim, breathe water"',
  'Glorious Defense':
    'Section=combat ' +
    'Note="R10\' Use Reaction to give +%{charismaModifier>?1} AC and attack attacker on miss %{charismaModifier>?1}/long rest"',
  'Grasping Tentacles':
    'Section=magic Note="Cast <i>Evard\'s Black Tentacles</i> w/unbreakable concentration and gain %{levels.Warlock} temporary HP 1/long rest"',
  'Great Stature':
    'Section=combat,feature ' +
    'Note="Giant\'s Might inflicts +1d8 HP weapon damage",' +
         '"Grow 3d4 inches"',
  'Guarded Mind':
    'Section=save ' +
    'Note="Resistance to psychic damage, spend 1 Psionic Energy die to end charmed and frightened conditions"',
  'Guardian Coil':
    'Section=magic ' +
    'Note="Use Reaction to use Tentacle Of The Deeps to reduce damage by %{levels.Warlock<10?1:2}d8"',
  'Halo Of Spores':
    'Section=combat Note="R10\' Use Reaction to inflict 1d%V HP necrotic (DC %1 Con neg)"',
  'Hand Of Harm':
    'Section=combat ' +
    'Note="Spend 1 Ki Point to inflict +1d%{combatNotes.martialArts}+%{wisdomModifier} HP necrotic w/unarmed strike 1/rd"',
  'Hand Of Healing':
    'Section=combat ' +
    'Note="Spend 1 Ki Point or forego 1 Flurry Of Blows strike to heal 1d%{combatNotes.martialArts}+%{wisdomModifier} HP"',
  'Hand Of Ultimate Mercy':
    'Section=magic ' +
    'Note="Spend 5 Ki Points to revive corpse dead up to 1 dy 1/long rest; restores 4d10+%{wisdomModifier} HP and removes conditions"',
  'Hill Rune':
    'Section=save ' +
    'Note="Adv vs. poison and resistance to poison damage; invoke for resistance to bludgeoning, piercing, and slashing for 1 min %V/short rest"',
  'Homing Strikes':
    'Section=combat ' +
    'Note="Add 1d%{featureNotes.psionicPower.1} to failed Psychic Blade attack, spend 1 Psionic Energy die if the sum is enough to hit"',
  'Implement Of Peace':
    'Section=skill ' +
    'Note="Skill Proficiency (Choose 1 from Insight, Performance, Persuasion)"',
  'Implements Of Mercy':
    'Section=feature,skill ' +
    'Note="Own identifying mask",' +
         '"Skill Proficiency (Insight/Medicine)/Tool Proficiency (Herbalism Kit)"',
  'Improved Defender':
    'Section=combat ' +
    'Note="+2d6 Arcane Jolt effect, Steel Defender +2 AC and Deflect Attack inflicts 1d4+%{intelligenceModifier} HP force"',
  'Infectious Fury':
    'Section=combat ' +
    'Note="Natural weapon causes redirected attack or +2d12 HP psychic (DC %{8+constitutionModifier+proficiencyBonus} Wis neg) %{proficiencyBonus}/long rest"',
  'Infectious Inspiration':
    'Section=magic ' +
    'Note="R60\' Use Reaction to grant extra Bardic Inspiration Die after successful use %V/long rest"',
  'Inspiring Smite':
    'Section=combat ' +
    'Note="R30\' Use Channel Divinity after Divine Smite to distribute 2d8 + %V temporary HP"',
  'Lightning Launcher':
    'Section=combat ' +
    'Note="Range 90/300 attack inflicts 1d6 HP lightning, +1d6 HP lightning 1/rd"',
  'Limited Wish':
    'Section=magic Note="Gain 6th level spell effects 1d4/long rest"',
  'Living Legend':
    'Section=ability,combat,save ' +
    'Note="Adv on Cha for 1 min 1/long rest (spend level 5 spell slot for additional)",' +
         '"Change miss into hit 1/rd for 1 min 1/long rest (spend level 5 spell slot for additional)",' +
         '"Reroll failed saves for 1 min 1/long rest (spend level 5 spell slot for additional)"',
  'Magic Awareness':
    'Section=magic ' +
    'Note="R60\' Self knows presence and school of spells and magic items for 1 rd %{proficiencyBonus}/long rest"',
  'Magical Guidance':
    'Section=feature ' +
    'Note="Spend 1 Sorcery Point to reroll failed ability check"',
  'Manifest Mind':
    'Section=magic ' +
    'Note="R300\' See, hear, and cast spells through ghostly object that emits 10\' dim light and moves 30\'/rd"',
  'Manifestations Of Order':
    'Section=feature Note="Display physical manifestation of Clockwork Soul"',
  'Master Of Runes':
    'Section=combat Note="Invoke runes 2/short rest"',
  'Master Scrivener':
    'Section=magic ' +
    'Note="R5\' After a long rest, create enhanced 1st or 2nd level spell scroll from Awakened Spellbook"',
  'Mighty Swarm':
    'Section=combat ' +
    'Note="Gathered Swarm gives self half cover, knocks foe prone, or inflicts 1d8"',
  'Misty Wanderer':
    'Section=magic ' +
    'Note="Cast R5\' <i>Misty Step</i> targeting self and 1 other %{wisdomModifier>?1}/long rest"',
  'Mortal Bulwark':
    'Section=combat,feature ' +
    'Note="Adv on attacks vs. aberrations, celestials, elementals, fey, and fiends and hit banishes (DC %V Cha neg) for 1 min 1/long rest (spend level 5 spell slot for additional)",' +
         '"120\' truesight for 1 min 1/long rest"',
  'Mote Of Potential':
    'Section=magic ' +
    'Note="Bardic Inspiration Die rolled w/Adv on ability check, inflicts R5\' roll HP thunder (DC %{spellDifficultyClass.B} Con neg) on attack, or gives roll+%{charismaModifier} temporary HP on saving throw"',
  'Oceanic Soul':
    'Section=feature,save ' +
    'Note="Speak to creatures under water",' +
         '"Resistance to cold damage"',
  'One With The Word':
    'Section=combat,skill ' +
    'Note="Prevent 3d6 HP damage to self by erasing equal spell levels from Awakened Spellbook for 1d6 long rests 1/long rest",' +
         '"Adv on Arcana"',
  'Order Bonus Proficiencies':
    'Section=combat,skill ' +
      'Note="Armor Proficiency (Heavy)",' +
           '"Skill Proficiency (Choose 1 from Intimidation, Persuasion)"',
  "Order's Demand":
    'Section=magic Note="R30\' Use Channel Divinity to charm targets (DC %V Wis neg) for 1 rd"',
  "Order's Wrath":
    'Section=combat ' +
    'Note="Ally hit on Divine Strike target inflicts +2d8 psychic 1/rd"',
  'Otherworldly Glamour':
    'Section=ability,skill ' +
    'Note="+%{wisdomModifier>?1} Cha checks",' +
          '"Skill Proficiency (Choose 1 from Deception, Performance, Persuasion)"',
  'Peerless Athlete':
    'Section=ability,skill ' +
    'Note="Use Channel Divinity for dbl lift",' +
         '"Use Channel Divinity for Adv on Athletics and Acrobatics and +10\' high and long jumps"',
  'Perfected Armor (Guardian Armor)':
    'Section=combat ' +
    'Note="R30\' Use Reaction to pull creature up to 30\' (DC %{spellDifficultyClass.A} Str neg) and attack if w/in 5\' afterward %{proficiencyBonus}/long rest"',
  'Perfected Armor (Infiltrator Armor)':
    'Section=combat Note="Lightning Launcher inflicts glow giving Disadv on attacks, next foe attack gains Adv and inflicts +1d6 HP lightning for 1 rd"',
  'Performance Of Creation':
    'Section=magic Note="R10\' Create %V object worth %{levels.Bard*20} GP for %{proficiencyBonus} hr 1/long rest (spend level 2 spell slot for additional)"',
  "Physician's Touch":
    'Section=combat ' +
    'Note="Hand Of Heal ends disease or condition; Hand Of Harm poisons for 1 rd"',
  'Powered Steps':'Section=ability Note="Armor gives +5 Speed"',
  'Protective Bond':
    'Section=magic Note="Emboldening Bond member can use Reaction to teleport 30\' and take another\'s damage"',
  'Protective Field':
    'Section=combat Note="R30\' Spend 1 Psionic Energy die to use Reaction to negate 1d%{featureNotes.psionicPower.1}+%{intelligenceModifier>?1} HP damage"',
  'Psi-Bolstered Knack':
    'Section=skill ' +
    'Note="Spend 1 Psionic Energy die to turn proficient skill or tool use failure into success"',
  'Psi-Powered Leap':
    'Section=ability ' +
    'Note="%{speed*2}\' fly for 1 rd 1/long rest (spend 1 Psionic Energy die for additional)"',
  'Psionic Power':
    'Section=feature ' +
    'Note="Use %Vd%1 Psionic Energy dice/long rest; regain 1 Psionic Energy die as bonus action after short rest"',
  'Psionic Sorcery':
    'Section=magic ' +
    'Note="Cast spell using Sorcery Points instead of spell slot"',
  'Psionic Spells':'Section=magic Note="Access to additional spells"',
  'Psionic Strike':
    'Section=combat Note="R30\' Spend 1 Psionic Energy die after hit to inflict +1d%{featureNotes.psionicPower.1}+%{intelligenceModifier} HP force"',
  'Psychic Blades':
    'Section=combat ' +
    'Note="Two R60\' magic psychic blade attacks inflict 1d6+%V HP psychic and 1d4+%V HP psychic"',
  'Psychic Defenses':
    'Section=save ' +
    'Note="Resistance to psychic damage, Adv on saves vs. charm and fright"',
  'Psychic Teleportation':
    'Section=combat Note="Spend 1 Psionic Energy die to teleport 1d%V x 10\'"',
  'Psychic Veil':
    'Section=magic ' +
    'Note="Self becomes invisible for 1 hr or until inflicts damage or forces saving throw 1/long rest (spend 1 Psionic Energy die for additional)"',
  'Psychic Whispers':
    'Section=feature ' +
    'Note="Establish telepathic communication with %{proficiencyBonus} visible creatures for 1d%V hr 1/long rest (spend 1 Psionic Energy die for additional)"',
  'Rend Mind':
    'Section=combat Note="Sneak Attack with Psychic Blade stuns for 1 min (DC %{8+dexterityModifier+proficiencyBonus} Wis ends) 1/long rest (spend 3 Psionic Energy dice for additional)"',
  'Restorative Reagents':
    'Section=magic ' +
    'Note="Cast <i>Lesser Restoration</i> %{intelligenceModifier>?1}/long rest, elixirs give 2d6+%{intelligenceModifier>?1} temporary HP"',
  'Restore Balance':
    'Section=magic Note="R60\' Cancel target Adv or Disadv on roll %{proficiencyBonus}/long rest"',
  'Revelation In Flesh':
    'Section=ability,feature ' +
    'Note=' +
      '"Spend 1 Sorcery Point for %{speed}\' fly, %{speed*2}\' swim and water breathing, or squeeze through 1 inch space for 10 min",' +
      '"Spend 1 Sorcery Point for 60\' see invisible for 10 min"',
  'Rune Carver':
    'Section=feature ' +
    'Note="After a long rest, apply 1 rune each to %V objects worn or held"',
  'Rune Knight Bonus Proficiencies':
    'Section=skill Note="Tool Proficiency (Smith\'s Tools)/Speak Giant"',
  'Runic Juggernaut':
    'Section=combat ' +
    'Note="Giant\'s Might increases size to Huge, inflicts +1d10 weapon damage, extends reach by 5\'"',
  'Runic Shield':
    'Section=combat ' +
    'Note="R60\' Use Reaction to force reroll when ally hit %{proficiencyBonus}/long rest"',
  'Sanctuary Vessel':
    'Section=magic ' +
    'Note="R30\' Take 5 willing into vessel, 10 min gives short rest and +%{proficiencyBonus} HP regained"',
  'Seeking Spell':
    'Section=magic Note="Spend 2 Sorcery Points to reroll missed spell attack"',
  'Silver Tongue':
    'Section=skill Note="Minimum 10 on Deception and Persuasion rolls"',
  'Song Of Defense':
    'Section=magic Note="During Bladesong, use Reaction and expend spell slot to reduce damage by 5x slot level"',
  'Song Of Victory':
    'Section=combat Note="+%V HP melee weapon damage during Bladesong"',
  'Sorcerous Versatility':
    'Section=feature ' +
    'Note="Replace Metamagic option or Cantrip when boosting ability or taking feat"',
  'Soul Blades':
    'Section=feature Note="Homing Strikes and Psychic Teleportation features"',
  'Spreading Spores':
    'Section=combat Note="R30\' Halo Of Spores (DC %V Con neg)"',
  'Star Map':
    'Section=magic ' +
    'Note="Know <i>Guidance</i> cantrip, cast <i>Guiding Bolt</i> %{proficiencyBonus}/long rest"',
  'Starry Form':
    'Section=magic ' +
    'Note="Wild Shape into form of Archer (R60\' ranged spell inflicts %Vd8+%{wisdomModifier} HP radiant), Chalice (R30\' healing spell restores %Vd8+%{wisdomModifier} to another), or Dragon (minimum 10 on concentration rolls)"',
  'Steady Aim':'Section=combat Note="Forego move for Adv on attack"',
  'Steel Defender':
    'Section=combat ' +
    'Note="Create mechanical companion (AC %V, HP %{levels.Artificer*5+intelligenceModifier+2} (<i>Mending</i> repairs 2d6 HP, self-repair 2d8+%1 3/dy), Attack +%2 inflicts 1d8+%1, use Reaction for R5\' Deflect Attack (inflicts Disadv on attack), MV 40\', Dex Save +%3, Con save +%4, immune to poison and charmed, exhausted, poisoned, and surprised conditions)"',
  'Steps Of Night':
    'Section=ability ' +
    'Note="%{speed}\' fly in dim or no light for 1 min %{proficiencyBonus}/long rest"',
  'Stone Rune':
    'Section=combat,feature,skill ' +
    'Note="R30\' Use Reaction to charm target (DC %{8+proficiencyBonus+constitutionModifier} Wis ends) for 1 min %V/short rest",' +
         '"120\' Darkvision",' +
         '"Adv on Insight"',
  'Storm Rune':
    'Section=combat,skill ' +
    'Note="Immune to surprise, invoke for R60\' impose Adv or Disadv on rolls for 1 min %V/short rest",' +
         '"Adv on Arcana"',
  'Summon Wildfire Spirit':
    'Section=magic ' +
    'Note="R30\' Expend 1 Wild Shape use to inflict 2d6 HP fire in 10\' radius (DC %V Dex neg) and summon Wildfire Spirit (AC 13, HP %{levels.Druid*5+5}, MV/Fly 30\', Attack R60\' +%{spellAttackModifier.D} inflicts 1d6+%{proficiencyBonus} HP fire, Teleport targets in 5\' radius) for 1 hr"',
  'Swarming Dispersal':
    'Section=combat Note="When hit, use Reaction to gain resistance and teleport 30\' %{proficiencyBonus}/long rest"',
  'Swarmkeeper Magic':
    'Section=magic Note="Know <i>Mage Hand</i> cantrip, access to additional spells"',
  'Symbiotic Entity':
    'Section=combat ' +
    'Note="Expend 1 Wild Shape use to gain %V temporary HP, 2d6 HP necrotic Halo Of Spores damage, and +1d6 HP necrotic on melee hits for 10 min or until temporary HP lost"',
  'Telekinetic Adept':
    'Section=feature Note="Psi-Powered Leap and Telekinetic Thrust features"',
  'Telekinetic Master':
    'Section=magic Note="Cast <i>Telekinesis</i> and attack 1/rd while concentrating 1/long rest (spend 1 Psionic Energy die for additional) "',
  'Telekinetic Movement':'Section=feature Note="R30\' Move Large target 30\' 1/short rest (spend 1 Psionic Energy die for additional)"',
  'Telekinetic Thrust':
    'Section=combat Note="Psionic Strike knocks prone or pushes 10\' (DC %{8+proficiencyBonus+intelligenceModifier} Str neg)"',
  'Telepathic Speech':
    'Section=feature ' +
    'Note="R30\' Communicate telepathically w/target for %{levels.Sorcerer} min"',
  'Tentacle Of The Deeps':
    'Section=magic Note="R60\' 10\' tentacle inflicts %{levels.Warlock<10?1:2}d8 HP cold and -10\' speed 2/rd for 1 min %{proficiencyBonus}/long rest"',
  'Thunder Gauntlets':
    'Section=combat ' +
    'Note="Each gauntlet inflicts 1d8 HP thunder and Disadv on attacks on others for 1 rd"',
  'Tokens Of The Departed':
    'Section=combat,feature,save ' +
    'Note="Destroying Soul Trinket gives extra Wails From The Grave use",' +
         '"Soul released from Soul Trinket answers 1 question",' +
         '"Adv on Con and saves vs. death"',
  'Tools Of The Trade':
    'Section=feature ' +
    'Note="Armor Proficiency (Heavy)/Tool Proficiency (Smith\'s Tools)"',
  'Training In War And Song':
    'Section=combat,skill ' +
    'Note=' +
      '"Armor Proficiency (Light)/Weapon Proficiency (Choose 1 from any One-Handed)",' +
      '"Skill Proficiency (Performance)"',
  'Trance Of Order':
    'Section=combat,feature ' +
    'Note="Foes cannot attack self w/Adv for 1 min 1/long rest (spend 5 Sorcery Points for additional)",' +
         '"Minimum 10 on attack, ability, and saving throws for 1 min 1/long rest (spend 5 Sorcery Points for additional)"',
  'Transmuted Spell':
    'Section=magic ' +
    'Note="Change spell damage from acid, cold, fire, lightning, poison, or thunder to another type"',
  'Twilight Bonus Proficiencies':
    'Section=combat ' +
    'Note="Armor Proficiency (Heavy)/Weapon Proficiency (Martial)"',
  'Twilight Sanctuary':
    'Section=magic ' +
    'Note="Use Channel Divinity for 30\' radius that gives 1d6+%{levels.Cleric} temporary HP and ends charm or fright for 1 min"',
  'Twilight Shroud':'Section=magic Note="Twilight Sanctuary gives half cover"',
  'Twinkling Constellations':
    'Section=magic ' +
    'Note="Improve Starry Form effects to 2d8, Dragon form gives 20\' fly; switch between forms 1/rd"',
  'Unfailing Inspiration':
    'Section=magic Note="Bardic Inspiration Die kept after failed use"',
  'Universal Speech':
    'Section=magic Note="R60\' %V targets understand self for 1 hr 1/long rest (spend spell slot for additional)"',
  'Unsettling Words':
    'Section=magic ' +
    'Note="R60\' Spend 1 Bardic Inspiration Die to inflict -roll on next save by target for 1 rd"',
  'Unstable Backlash':
    'Section=magic ' +
    'Note="Trigger Wild Magic effect when taking damage or failing save"',
  'Vigilant Blessing':
    'Section=combat Note="Touch gives 1 creature Adv on next initiative"',
  'Vigilant Rebuke':
    'Section=combat Note="R30\' Use Reaction to inflict 2d8+%{charismaModifier} HP force on attacker after successful Cha, Int, or Wis save"',
  'Visage Of The Astral Self':
    'Section=feature,skill ' +
    'Note="Spend 1 Ki Point to gain 120\' Darkvision and R600\' voice or R60\' directed voice for 10 min",' +
         '"Spend 1 Ki Point to gain Adv on Insight and Intimidation for 10 min"',
  'Voice Of Authority':
    'Section=magic Note="Self spell target can use Reaction to make attack"',
  'Wails From The Grave':
    'Section=combat Note="R30\' Sneak Attack inflicts %{(levels.Rogue+1)//4}d6 HP necrotic on second creature %{proficiencyBonus}/long rest"',
  'Warping Implosion':
    'Section=magic ' +
    'Note="120\' teleport inflicts 3d10 HP in 30\' radius of starting position and pulls 30\' (Str half, no pull) 1/long rest (spend 5 Sorcery Points for additional)"',
  "Watcher's Will":
    'Section=magic ' +
    'Note="R30\' Use Channel Divinity to give self and %{charismaModifier>?1} others Adv on Cha, Int, and Wis throws for 1 min"',
  'Whispers Of The Dead':
    'Section=skill Note="Gain proficiency in chosen skill 1/short rest"',
  'Wild Surge':
    'Section=magic ' +
    'Note="Trigger Wild Magic effect when entering rage, save DC %{8+proficiencyBonus+constitutionModifier}"',
  'Wizardly Quill':
    'Section=magic ' +
    'Note="Produce multicolored, erasable writing; copy spells at 2 min/level"',
  'Writhing Tide':'Section=ability Note="10\' fly for 1 min %{proficiencyBonus}/long rest"'

};
Tasha.PATHS = {
  'Aberrant Mind':
    'Group=Sorcerer Level=levels.Sorcerer ' +
    'Features=' +
      '"1:Psionic Spells","1:Telepathic Speech","6:Psionic Sorcery",' +
      '"6:Psychic Defenses","14:Revelation In Flesh","18:Warping Implosion"',
  'Alchemist':
    'Group=Artificer Level=levels.Artificer ' +
    'Features=' +
      '"3:Alchemist Tool Proficiency","3:Experimental Elixir",' +
      '"features.Guardian Armor ? 3:Thunder Gauntlets",' +
      '"features.Guardian Armor ? 3:Defensive Field",' +
      '"features.Infiltrator Armor ? 3:Lightning Launcher",' +
      '"features.Infiltrator Armor ? 3:Powered Steps",' +
      '"features.Infiltrator Armor ? 3:Dampening Field",' +
      '"5:Alchemical Savant","9:Restorative Reagents","15:Chemical Mastery"',
  'Armorer':
    'Group=Artificer Level=levels.Artificer ' +
    'Features=' +
      '"3:Arcane Armor","3:Tools Of The Trade","5:Extra Attack",' +
      '"9:Armor Modifications",' +
      '"features.Guardian Armor ? 15:Perfected Armor (Guardian Armor)",' +
      '"features.Infiltrator Armor ? 15:Perfected Armor (Infiltrator Armor)"',
  'Artillerist':
    'Group=Artificer Level=levels.Artificer ' +
    'Features=' +
      '"3:Artillerist Tool Proficiency","3:Eldritch Cannon",' +
      '"5:Arcane Firearm","9:Explosive Cannon","15:Fortified Position"',
  'Battle Smith':
    'Group=Artificer Level=levels.Artificer ' +
    'Features=' +
      '"3:Battle Ready","3:Battle Smith Tool Proficiency",' +
      '"3:Steel Defender","5:Extra Attack","9:Arcane Jolt",' +
      '"15:Improved Defender"',
  'Bladesinging':
    'Group=Wizard Level=levels.Wizard ' +
    'Features=' +
      '"2:Training In War And Song","2:Bladesong","6:Extra Attack",' +
      '"10:Song Of Defense","14:Song Of Victory"',
  'Circle Of Spores':
    'Group=Druid Level=levels.Druid ' +
    'Features=' +
      '"2:Halo Of Spores","2:Symbiotic Entity","6:Fungal Infestation",' +
      '"10:Spreading Spores","14:Fungal Body" ' +
    'SpellAbility=wisdom ' +
    'SpellSlots=' +
      'Spores0:2=1,' +
      'Spores2:3=2,' +
      'Spores3:5=2,' +
      'Spores4:7=2,' +
      'Spores5:9=2',
  'Circle Of Stars':
    'Group=Druid Level=levels.Druid ' +
    'Features=' +
      '"2:Star Map","2:Starry Form","6:Cosmic Omen",' +
      '"10:Twinkling Constellations","14:Full Of Stars"',
  'Circle Of Wildfire':
    'Group=Druid Level=levels.Druid ' +
    'Features=' +
      '"2:Summon Wildfire Spirit","6:Enhanced Bond","10:Cauterizing Flames",' +
      '"14:Blazing Revival" ' +
    'SpellAbility=wisdom ' +
    'SpellSlots=' +
      'Wildfire1:2=2,' +
      'Wildfire2:3=2,' +
      'Wildfire3:5=2,' +
      'Wildfire4:7=2,' +
      'Wildfire5:9=2',
  'Clockwork Soul':
    'Group=Sorcerer Level=levels.Sorcerer ' +
    'Features=' +
      '"1:Clockwork Magic","1:Manifestations Of Order","1:Restore Balance",' +
      '"6:Bastion Of Law","14:Trance Of Order","18:Clockwork Cavalcade"',
  'College Of Creation':
    'Group=Bard Level=levels.Bard ' +
    'Features=' +
      '"3:Mote Of Potential","3:Performance Of Creation",' +
      '"6:Animating Performance","14:Creative Crescendo"',
  'College Of Eloquence':
    'Group=Bard Level=levels.Bard ' +
    'Features=' +
      '"3:Silver Tongue","3:Unsettling Words","6:Unfailing Inspiration",' +
      '"6:Universal Speech","14:Infectious Inspiration"',
  'Fey Wanderer':
    'Group=Ranger Level=levels.Ranger ' +
    'Features=' +
      '"3:Dreadful Strikes","3:Fey Wanderer Magic","3:Otherworldly Glamour",' +
      '"7:Beguiling Twist","11:Fey Reinforcements","15:Misty Wanderer"',
  'Oath Of Glory':
    'Group=Paladin Level=levels.Paladin ' +
    'Features=' +
      '"3:Inspiring Smite","3:Peerless Athlete","7:Aura Of Alacrity",' +
      '"15:Glorious Defense","20:Living Legend" ' +
    'SpellAbility=charisma ' +
    'SpellSlots=' +
      'Glory1:3=2,' +
      'Glory2:5=2,' +
      'Glory3:9=2,' +
      'Glory4:13=2,' +
      'Glory5:17=2',
  'Oath Of The Watchers':
    'Group=Paladin Level=levels.Paladin ' +
    'Features=' +
      '"3:Abjure The Extraplanar","3:Watcher\'s Will",' +
      '"7:Aura Of The Sentinel","15:Vigilant Rebuke","20:Mortal Bulwark" ' +
    'SpellAbility=charisma ' +
    'SpellSlots=' +
      'Watchers1:3=2,' +
      'Watchers2:5=2,' +
      'Watchers3:9=2,' +
      'Watchers4:13=2,' +
      'Watchers5:17=2',
  'Order Domain':
    'Group=Cleric Level=levels.Cleric ' +
    'Features=' +
      '"1:Order Bonus Proficiencies","1:Voice Of Authority",' +
      '"2:Order\'s Demand","6:Embodiment Of The Law","8:Divine Strike",' +
      '"17:Order\'s Wrath" ' +
    'SpellAbility=wisdom ' +
    'SpellSlots=' +
      'Order1:1=2,' +
      'Order2:3=2,' +
      'Order3:5=2,' +
      'Order4:7=2,' +
      'Order5:9=2',
  'Order Of Scribes':
    'Group=Wizard Level=levels.Wizard ' +
    'Features=' +
      '"2:Wizardly Quill","2:Awakened Spellbook","6:Manifest Mind",' +
      '"10:Master Scrivener","14:One With The Word"',
  'Path Of The Beast':
    'Group=Barbarian Level=levels.Barbarian ' +
    'Features=' +
      '"3:Form Of The Beast","6:Bestial Soul","10:Infectious Fury",' +
      '"14:Call The Hunt"',
  'Path Of Wild Magic':
    'Group=Barbarian Level=levels.Barbarian ' +
    'Features=' +
      '"3:Magic Awareness","3:Wild Surge","6:Bolstering Magic",' +
      '"10:Unstable Backlash","14:Controlled Surge"',
  'Peace Domain':
    'Group=Cleric Level=levels.Cleric ' +
    'Features=' +
      '"1:Emboldening Bond","1:Implement Of Peace","2:Balm Of Peace",' +
      '"6:Protective Bond","8:Potent Spellcasting","17:Expansive Bond" ' +
    'SpellAbility=wisdom ' +
    'SpellSlots=' +
      'Peace1:1=2,' +
      'Peace2:3=2,' +
      'Peace3:5=2,' +
      'Peace4:7=2,' +
      'Peace5:9=2',
  'Phantom':
    'Group=Rogue Level=levels.Rogue ' +
    'Features=' +
      '"3:Whispers Of The Dead","3:Wails From The Grave",' +
      '"9:Tokens Of The Departed","13:Ghost Walk","17:Death\'s Friend"',
  'Psi Warrior':
    'Group=Fighter Level=levels.Fighter ' +
    'Features=' +
      '"3:Psionic Power","3:Protective Field","3:Psionic Strike",' +
      '"3:Telekinetic Movement","7:Telekinetic Adept","10:Guarded Mind",' +
      '"15:Bulwark Of Force","18:Telekinetic Master"',
  'Rune Knight':
    'Group=Fighter Level=levels.Fighter ' +
    'Features=' +
      '"3:Rune Knight Bonus Proficiencies",' +
      '"3:Giant\'s Might","3:Rune Carver","7:Runic Shield",' +
      '"10:Great Stature","15:Master Of Runes","18:Runic Juggernaut"',
  'Soulknife':
    'Group=Rogue Level=levels.Rogue ' +
    'Features=' +
      '"3:Psi-Bolstered Knack","3:Psionic Power","3:Psychic Blades",' +
      '"3:Psychic Whispers","9:Soul Blades","13:Psychic Veil","17:Rend Mind"',
  'Swarmkeeper':
    'Group=Ranger Level=levels.Ranger ' +
    'Features=' +
      '"3:Gathered Swarm","3:Swarmkeeper Magic","7:Writhing Tide",' +
      '"11:Mighty Swarm","15:Swarming Dispersal"',
  'The Fathomless':
    'Group=Warlock Level=levels.Warlock ' +
    'Features=' +
      '"1:Tentacle Of The Deeps","1:Gift Of The Sea","6:Oceanic Soul",' +
      '"6:Guardian Coil","10:Grasping Tentacles","14:Fathomless Plunge"',
  'The Genie':
    'Group=Warlock Level=levels.Warlock ' +
    'Features=' +
      '"1:Genie\'s Vessel","6:Elemental Gift","10:Sanctuary Vessel",' +
      '"14:Limited Wish"',
  'Twilight Domain':
    'Group=Cleric Level=levels.Cleric ' +
    'Features=' +
      '"1:Eyes Of Night","1:Twilight Bonus Proficiencies",' +
      '"1:Vigilant Blessing","2:Twilight Sanctuary","6:Steps Of Night",' +
      '"8:Divine Strike","17:Twilight Shroud" ' +
    'SpellAbility=wisdom ' +
    'SpellSlots=' +
      'Twilight1:1=2,' +
      'Twilight2:3=2,' +
      'Twilight3:5=2,' +
      'Twilight4:7=2,' +
      'Twilight5:9=2',
  'Way Of Mercy':
    'Group=Monk level=levels.Monk ' +
    'Features=' +
      '"3:Implements Of Mercy","3:Hand Of Harm","3:Hand Of Healing",' +
      '"6:Physician\'s Touch","11:Flurry Of Healing And Harm",' +
      '"17:Hand Of Ultimate Mercy"',
  'Way Of The Astral Self':
    'Group=Monk Level=levels.Monk ' +
    'Features=' +
      '"3:Arms Of The Astral Self","6:Visage Of The Astral Self",' +
      '"11:Body Of The Astral Self","17:Awakened Astral Self"'
};
Tasha.SPELLS = {
  'Blade Of Disaster':
    'School=Conjuration ' +
    'Level=K9,S9,W9 ' +
    'Description="R60\' Self controls rift blade that moves 30\' and attacks 2/rd, inflicting 4d12 HP force x3@18 each, for conc or 1 min"',
  'Booming Blade':
    'School=Evocation ' +
    'Level=A0,K0,S0,W0 ' +
    'Description="Struck foe suffers +%{(level+1)//6}d8 HP thunder and %{(level+1)//6+1}d8 HP thunder on move w/in 1 rd"',
  'Dream Of The Blue Veil':
    'School=Conjuration ' +
    'Level=B7,K7,S7,W7 ' +
    'Description="R20\' Self and 8 willing others view another world for 6 hr, travel at end of spell"',
  'Green-Flame Blade':
    'School=Evocation ' +
    'Level=A0,K0,S0,W0 ' +
    'Description="Struck foe suffers +%Vd8 HP fire, R5\' target suffers %{(level+1)//6}d8+%{charismaModifier>?intelligenceModifier} HP fire"',
  'Intellect Fortress':
    'School=Abjuration ' +
    'Level=A3,B3,K3,S3,W3 ' +
    'Description="R30\' Willing target gains resistance to psychic damage and Adv on Int, Wis, and Cha saves for conc or 1 hr"',
  'Lightning Lure':
    'School=Evocation ' +
    'Level=A0,K0,S0,W0 ' +
    'Description="R15\' Pulls target 10\' and inflicts %{(level+5)//6}d8 HP lightning (Str neg)"',
  'Mind Sliver':
    'School=Enchantment ' +
    'Level=K0,S0,W0 ' +
    'Description="R60\' Target suffers %{(level+7)//6}d6 HP psychic and -1d4 next save (Int neg) w/in 1 rd"',
  'Spirit Shroud':
    'School=Necromancy ' +
    'Level=C3,K3,P3,W3 ' +
    'Description="R10\' Self hits inflict +1d8 HP radiant, necrotic, or cold; 1 target/rd suffers -10\' Speed for 1 rd for conc or 1 min"',
  'Summon Aberration':
    'School=Conjuration ' +
    'Level=K4,W4 ' +
    'Description="R90\' Summoned beholderkin, slaad, or star spawn obeys self for conc or 1 hr"',
  'Summon Beast':
    'School=Conjuration ' +
    'Level=D2,R2 ' +
    'Description="R90\' Summoned air, land, or water bestial spirit obeys self for conc or 1 hr"',
  'Summon Celestial':
    'School=Conjuration ' +
    'Level=C5,P5 ' +
    'Description="R90\' Summoned avenger or defender celestial spirit obeys self for conc or 1 hr"',
  'Summon Construct':
    'School=Conjuration ' +
    'Level=A4,W4 ' +
    'Description="R90\' Summoned clay, metal, or stone construct spirit obeys self for conc or 1 hr"',
  'Summon Elemental':
    'School=Conjuration ' +
    'Level=D4,"K4 [The Fathomless]",R4,W4 ' +
    'Description="R90\' Summoned air, earth, fire, or water elemental spirit obeys self for conc or 1 hr"',
  'Summon Fey':
    'School=Conjuration ' +
    'Level=D3,R3,K3,W3 ' +
    'Description="R90\' Summoned fuming, mirthful, or tricksy fey spirit obeys self for conc or 1 hr"',
  'Summon Fiend':
    'School=Conjuration ' +
    'Level=K6,W6 ' +
    'Description="R90\' Summoned demon, devil, or yugoloth fiendish spirit obeys self for conc or 1 hr"',
  'Summon Shadowspawn':
    'School=Conjuration ' +
    'Level=K3,W3 ' +
    'Description="R90\' Summoned fury, despair, or fear shadow spirit obeys self for conc or 1 hr"',
  'Summon Undead':
    'School=Necromancy ' +
    'Level=K3,W3 ' +
    'Description="R90\' Summoned ghostly, putrid, or skeletal undead spirit obeys commands for conc or 1 hr"',
  'Sword Burst':
    'School=Conjuration ' +
    'Level=K0,S0,W0 ' +
    'Description="5\' radius inflicts %{(level+5)//6}d6 HP force (Dex neg)"',
  "Tasha's Caustic Brew":
    'School=Evocation ' +
    'Level=A1,S1,W1 ' +
    'Description="30\'x5\' line inflicts 2d4 HP/rd acid for conc or 1 min (Dex neg)"',
  "Tasha's Mind Whip":
    'School=Enchantment ' +
    'Level=S2,W2 ' +
    'Description="R90\' Target suffers 3d6 HP psychic and single action for 1 rd (Int half, normal action)"',
  "Tasha's Otherworldly Guise":
    'School=Transmutation ' +
    'Level=K6,S6,W6 ' +
    'Description="Self gains immunity to fire and poison damage and poisoned condition (or radiant and necrotic damage and charmed condition), 40\' fly, +2 AC, +%{spellAttackModifier.K||spellAttackModifier.S||spellAttackModifier.W} magical weapon attacks 2/rd for conc or 1 min"'
};
Tasha.SPELLS_LEVELS_ADDED = {
  'Acid Splash':'A0',
  'Aid':'A2,B2,Peace2,R2',
  'Alarm':'A1,Watchers1',
  'Alter Self':'A2',
  'Animate Dead':'Spores3',
  'Animate Objects':'A5',
  'Antipathy/Sympathy':'B8',
  'Arcane Eye':'A4',
  'Arcane Lock':'A2',
  'Augury':'D2,W2',
  'Aura Of Life':'C4,Twilight4,Wildfire4',
  'Aura Of Purity':'"A4 [Battle Smith]",C4,Peace4,Watchers4',
  'Aura Of Vitality':'"A3 [Battle Smith]",C3,D3,Twilight3',
  'Banishing Smite':'"A5 [Battle Smith]"',
  'Banishment':'Watchers4',
  'Beacon Of Hope':'Peace3',
  "Bigby's Hand":'A5,"K5 [The Fathomless]",S5',
  'Blight':'"A4 [Artificer]",Spores4',
  'Blindness/Deafness':'Spores2',
  'Blink':'A3',
  'Blur':'A2,"K2 [Marid]"',
  'Branding Smite':'"A2 [Battle Smith]"',
  'Burning Hands':'"K1 [Efreeti]",Wildfire1',
  'Chill Touch':'Spores0',
  'Circle Of Power':'Twilight5',
  'Cloudkill':'"A5 [Artificer]",Spores5',
  'Color Spray':'B1',
  'Command':'B1,Order1',
  'Commune':'Glory5,Order5',
  'Compulsion':'Glory4,Order4',
  'Cone Of Cold':'A5,D5,"K5 [The Fathomless]","K5 [Marid]"',
  'Conjure Barrage':'"A3 [Battle Smith]"',
  'Confusion':'Spores4',
  'Contagion':'Spores5',
  'Continual Flame':'A2,D2',
  'Control Water':'"K4 [The Fathomless]","K4 [Marid]"',
  'Counterspell':'Watchers3',
  'Create Food And Water':'A3,"K3 [The Genie]"',
  'Create Or Destroy Water':'"K1 [The Fathomless]"',
  'Creation':'A5,"K5 [The Genie]"',
  'Cure Wounds':'A1,Wildfire1',
  'Dancing Lights':'A0',
  'Darkvision':'A2',
  'Death Ward':'"A4 [Artificer]"',
  'Demiplane':'S8',
  'Detect Evil And Good':'"K1 [The Genie]"',
  'Detect Magic':'A1,Watchers1',
  'Disguise Self':'A1',
  'Dispel Magic':'A3',
  'Divination':'D4,W4',
  'Dominate Beast':'R4',
  'Dominate Person':'Order5',
  'Elemental Weapon':'A3,D3,R3',
  'Enhance Ability':'A2,Glory2,R2,W2',
  'Enlarge/Reduce':'A2,B2,D2',
  'Entangle':'R1',
  'Expeditious Retreat':'A1',
  'Fabricate':'A4',
  'Faerie Fire':'A1,Twilight1',
  'False Life':'A1',
  'Feather Fall':'A1',
  'Fire Bolt':'A0',
  'Fire Shield':'"A4 [Armorer]","A4 [Battle Smith]",D4,"K4 [Efreeti]",S4,Wildfire4',
  'Fireball':'A3,"K3 [Efreeti]"',
  'Flame Blade':'S2',
  'Flame Strike':'Glory5,"K5 [Efreeti]",Wildfire5',
  'Flaming Sphere':'"A2 [Artificer]",S2,Wildfire2',
  'Flesh To Stone':'D6,S6',
  'Fly':'A3',
  'Fog Cloud':'"K1 [Marid]"',
  'Freedom Of Movement':'A4,Glory4',
  'Gaseous Form':'"A3 [Artificer]",Spores3',
  'Gate':'K9',
  'Gentle Repose':'P2,Spores2',
  'Glyph Of Warding':'A3',
  'Grease':'A1,S1',
  'Greater Invisibility':'"A4 [Armorer]","K4 [Djinni]",Twilight4',
  'Greater Restoration':'A5,Peace5,R5',
  'Guidance':'A0',
  'Guiding Bolt':'Glory1',
  'Gust Of Wind':'"K2 [The Fathomless]","K2 [Djinni]",R2',
  'Haste':'A3,Glory3',
  'Healing Word':'"A1 [Artificer]"',
  'Heat Metal':'A2',
  "Heroes' Feast":'B6',
  'Heroism':'"A1 [Battle Smith]",Glory1,Order1,Peace1',
  'Hold Monster':'Watchers5',
  'Hold Person':'Order2',
  'Hypnotic Pattern':'"A3 [Armorer]"',
  'Ice Storm':'A4',
  'Identify':'A1',
  'Incendiary Cloud':'D8',
  'Invisibility':'A2',
  'Jump':'A1',
  "Leomund's Secret Chest":'A4',
  "Leomund's Tiny Hut":'Twilight3',
  'Lesser Restoration':'A2',
  'Levitate':'A2',
  'Light':'A0',
  'Lightning Bolt':'"A3 [Armorer]","K3 [The Fathomless]"',
  'Locate Creature':'Order4',
  'Longstrider':'A1',
  'Mage Hand':'A0',
  'Magic Mouth':'A2',
  'Magic Missile':'"A1 [Armorer]"',
  'Magic Weapon':'A2,Glory2,R2,S2',
  'Mass Cure Wounds':'"A5 [Battle Smith]",Wildfire5',
  'Mass Healing Word':'"A3 [Artificer]",B3,Order3',
  'Meld Into Stone':'"K3 [Dao]",R3',
  "Melf's Acid Arrow":'"A2 [Artificer]"',
  'Mending':'A0',
  'Message':'A0',
  'Mirror Image':'"A2 [Armorer]",B2',
  'Mislead':'K5,Twilight5',
  'Moonbeam':'Twilight2,Watchers2',
  "Mordenkainen's Faithful Hound":'A4',
  "Mordenkainen's Private Sanctum":'A4',
  'Nondetection':'Watchers3',
  "Otiluke's Freezing Sphere":'S6',
  "Otiluke's Resilient Sphere":'A4,Peace4',
  'Passwall':'"A5 [Armorer]"',
  'Phantasmal Force':'"K2 [The Genie]"',
  'Phantasmal Killer':'B4,"K4 [The Genie]"',
  'Planar Binding':'K5',
  'Plant Growth':'Wildfire3',
  'Poison Spray':'A0',
  'Power Word Heal':'C9',
  'Prayer Of Healing':'P2',
  'Prestidigitation':'A0',
  'Prismatic Spray':'B7',
  'Prismatic Wall':'B9',
  'Protection From Evil And Good':'D1',
  'Protection From Energy':'A3,Glory3',
  'Protection From Poison':'A2',
  'Purify Food And Drink':'A1',
  'Raise Dead':'"A5 [Artificer]"',
  "Rary's Telepathic Bond":'B5,Peace5',
  'Ray Of Frost':'A0',
  'Ray Of Sickness':'"A1 [Artificer]"',
  'Resistance':'A0',
  'Revivify':'A3,D3,R3,Wildfire3',
  'Rope Trick':'A2',
  'Sanctuary':'A1,"K1 [Dao]",Peace1',
  'Scorching Ray':'A2,"K2 [Efreeti]",Wildfire2',
  'Scrying':'Watchers5',
  'Searing Smite':'R1',
  'See Invisibility':'A2,Twilight2,Watchers2',
  'Seeming':'"K5 [Djinni]"',
  'Sending':'Peace3',
  'Shatter':'"A2 [Armorer]"',
  'Shield':'"A1 [Battle Smith]"',
  'Shocking Grasp':'A0',
  'Silence':'"K2 [The Fathomless]"',
  'Sleep':'Twilight1',
  'Sleet Storm':'"K3 [The Fathomless]","K3 [Marid]"',
  'Slow':'B3,Order3',
  'Speak With Dead':'W3',
  'Spare The Dying':'A0',
  'Spider Climb':'A2',
  'Spike Growth':'"K2 [Dao]"',
  'Stone Shape':'A4,"K4 [Dao]"',
  'Stoneskin':'A4',
  'Sunbeam':'C6',
  'Sunburst':'C8',
  'Symbol':'D7',
  'Teleportation Circle':'K5',
  'Thorn Whip':'A0',
  'Thunderwave':'"A1 [Armorer]","K1 [The Fathomless]","K1 [Djinni]"',
  'Vampiric Touch':'S3',
  'Wall Of Fire':'A4',
  'Wall Of Force':'"A5 [Armorer]"',
  'Wall Of Stone':'A5,"K5 [Dao]"',
  'Warding Bond':'"A2 [Battle Smith]",P2,Peace2',
  'Water Breathing':'A3',
  'Water Walk':'A3',
  'Web':'A2',
  'Weird':'K9',
  'Wish':'"K9 [The Genie]"',
  'Wind Wall':'A3,"K3 [Djinni]"',
  'Zone Of Truth':'Order2',
};
if(window.Xanathar) {
  Object.assign(Tasha.SPELLS_LEVEL_ADDED, {
    'Absorb Elements':'A1',
    'Catapult':'A1',
    'Catnap':'A3',
    'Create Bonfire':'A0',
    'Elemental Bane':'A4',
    'Flame Arrows':'A3',
    'Frostbite':'A0',
    'Magic Stone':'A0',
    'Pyrotechnics':'A2',
    'Skill Empowerment':'A5',
    'Snare':'A1',
    'Thunderclap':'A0',
    'Tiny Servant':'A3',
    'Transmute Rock':'A5'
  });
}

/* Defines rules related to basic character identity. */
Tasha.identityRules = function(
  rules, classes, classFeatures, classSelectables, deitiesDomains, paths
) {
  SRD5E.identityRules(rules, {}, {}, classes, {}, paths, {});
  var clas;
  for(clas in classes) {
    Tasha.classRulesExtra(rules, clas);
  }
  for(clas in classFeatures) {
    SRD5E.featureListRules
      (rules, QuilvynUtils.getAttrValueArray('Features=' + classFeatures[clas], 'Features'), clas, 'levels.' + clas, false);
    Tasha.classRulesExtra(rules, clas);
  }
  for(clas in classSelectables) {
    SRD5E.featureListRules
      (rules, QuilvynUtils.getAttrValueArray('Selectables=' + classSelectables[clas], 'Selectables'), clas, 'levels.' + clas, true);
  }
  var allDeities = rules.getChoices('deities');
  for(var deity in deitiesDomains) {
    if(!(deity in allDeities))
      continue;
    var attrs = allDeities[deity].replace('Domain=', 'Domain="' + deitiesDomains[deity] + '",');
    delete allDeities[deity];
    rules.choiceRules(rules, 'Deity', deity, attrs);
  }
  for(var path in paths) {
    rules.choiceRules(rules, 'Path', path, paths[path]);
    Tasha.pathRulesExtra(rules, path);
  }
};

/* Defines rules related to magic use. */
Tasha.magicRules = function(rules, spells, spellsLevels) {
  SRD5E.magicRules(rules, {}, spells);
  for(var s in spellsLevels) {
    var defn = PHB5E.SPELLS[s] || (window.Xanathar ? Xanathar.SPELLS[s] : null);
    if(!defn) {
      console.log('Unknown spell "' + s + '"');
      continue;
    }
    rules.choiceRules(rules, 'Spell', s, defn + ' Level=' + spellsLevels[s]);
  }
};

/* Defines rules related to character aptitudes. */
Tasha.talentRules = function(rules, feats, features) {
  SRD5E.talentRules(rules, feats, features, {}, {}, {}, {});
  for(var f in feats) {
    Tasha.featRulesExtra(rules, f);
  }
};

/*
 * Defines in #rules# the rules associated with class #name# that cannot be
 * derived directly from the attributes passed to classRules.
 */
Tasha.classRulesExtra = function(rules, name) {

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
      'spellAttackModifier.A', '=', null
    );
    rules.defineRule('magicNotes.homunculusServant.2',
      'features.Homunculus Servant', '?', null,
      'proficiencyBonus', '=', null
    );
    rules.defineRule('selectableFeatureCount.Artificer (Infusion)',
      'featureNotes.infuseItem', '=', null
    );
    rules.defineRule('selectableFeatureCount.Artificer (Specialist)',
      classLevel, '=', 'source>=3 ? 1 : null'
    );
  } else if(name == 'Barbarian') {
    rules.defineRule
      ('featureNotes.primalKnowledge', classLevel, '=', 'source<10 ? 1 : 2');
    rules.defineRule('featureNotes.primalKnowledge.1', classLevel, '=', '""');
    rules.defineRule
      ('skillChoiceCount', 'featureNotes.primalKnowledge', '+=', null);
  } else if(name == 'Cleric') {
    rules.defineRule('magicNotes.harnessDivinePower',
      'levels.Cleric', '=', 'source<7 ? 1 : source<15 ? 2 : 3'
    );
  } else if(name == 'Fighter') {
    rules.defineRule('combatNotes.combatSuperiority',
      'combatNotes.fightingStyle(SuperiorTechnique)', '+=', '1'
    );
    rules.defineRule('combatNotes.combatSuperiority.1',
      'combatNotes.fightingStyle(SuperiorTechnique)', '^=', '6'
    );
    rules.defineRule('combatNotes.combatSuperiority.2',
      'combatNotes.fightingStyle(SuperiorTechnique)', '+=', '1'
    );
    rules.defineRule('features.Combat Superiority',
      'combatNotes.fightingStyle(SuperiorTechnique)', '=', '1'
    );
  } else if(name == 'Paladin') {
    rules.defineRule('magicNotes.harnessDivinePower',
      'levels.Paladin', '=', 'source<7 ? 1 : source<15 ? 2 : 3'
    );
    rules.defineRule('spellSlots.C0',
      'magicNotes.fightingStyle(BlessedWarrior)', '+=', '2'
    );
  } else if(name == 'Ranger') {
    // Suppress Ranger features replaced by new Tasha features
    rules.defineRule('rangerFeatures.Natural Explorer', 'suppress', '?', null);
    rules.defineRule('rangerFeatures.Favored Enemy', 'suppress', '?', null);
    rules.defineRule
      ('rangerFeatures.Primeval Awareness', 'suppress', '?', null);
    rules.defineRule
      ('rangerFeatures.Hide In Plain Sight', 'suppress', '?', null);
    // Rules for new Ranger features
    rules.defineRule('combatNotes.favoredFoe',
      'levels.Ranger', '=', 'source<6 ? 4 : source<14 ? 6 : 8'
    );
    rules.defineRule('featureNotes.deftExplorer.1',
      'featureNotes.deftExplorer', '?', null,
      'levels.Ranger', '=', 'source<6 ? "" : source>=10 ? ", Roving, and Tireless" : " and Roving"'
    );
    rules.defineRule('featureNotes.deftExplorer.2',
      'featureNotes.deftExplorer', '?', null,
      'levels.Ranger', '=', 'source<6 ? "" : "s"'
    );
    rules.defineRule('magicNotes.primalAwareness.1',
      'levels.Ranger', '=', 'source<5 ? "" : (", <i>Beast Sense</i>" + (source<9 ? "" : (", <i>Speak With Plants</i>" + (source<13 ? "" : (", <i>Locate Creature</i>" + (source<17 ? "" : ", <i>Commune With Nature</i>"))))))'
    );
    rules.defineRule
      ('spellSlots.D0', 'magicNotes.fightingStyle(DruidicWarrior)', '+=', '2');
    rules.defineRule('casterLevels.Druidic Warrior',
      'features.Fighting Style (Druidic Warrior)', '?', null,
      'casterLevels.R', '=', null
    );
    rules.defineRule
      ('spellCasterLevel.D', 'casterLevels.Druidic Warrior', '=', null);
    // spellModifier.D already defaults to wisdomModifier, so no need to set
  } else if(name == 'Warlock') {
    rules.defineRule('genieEnergy',
      'features.Dao', '=', '"bludgeoning"',
      'features.Djinni', '=', '"thunder"',
      'features.Efreeti', '=', '"fire"',
      'features.Marid', '=', '"cold"'
    );
    rules.defineRule('featureNotes.eldritchVersatility',
       classLevel, '=', 'source<12 ? "cantrip or Pact Boon option" : "cantrip, Pact Boon option, or Mystic Arcanum spell"'
    );
    rules.defineRule('selectableFeatureCount.Warlock (Genie Kind)',
      'features.The Genie', '=', '1'
    );
  }

};

/*
 * Defines in #rules# the rules associated with feat #name# that cannot be
 * derived directly from the attributes passed to featRules.
 */
Tasha.featRulesExtra = function(rules, name) {
  var f;
  var features;
  if(name == 'Artificer Initiate') {
    rules.defineRule
      ('casterLevels.A', 'magicNotes.artificerInitiate', '^=', '1');
    rules.defineRule
      ('spellSlots.A0', 'magicNotes.artificerInitiate', '+=', '2');
    rules.defineRule
      ('spellSlots.A1', 'magicNotes.artificerInitiate', '+=', '1');
  } else if(name == 'Chef') {
    rules.defineRule('abilityBoosts', 'abilityNotes.chef', '+=', '1');
  } else if(name == 'Crusher') {
    rules.defineRule('abilityBoosts', 'abilityNotes.crusher', '+=', '1');
  } else if(name == 'Eldritch Adept') {
    rules.defineRule('selectableFeatureCount.Warlock (Eldritch Invocation)',
      'featureNotes.eldritchAdept', '+=', '1'
    );
    // Override class requirement for Warlock Eldritch Invocation features
    features = rules.getChoices('selectableFeatures');
    for(var f in features) {
      if(f.match(/^Warlock/) && features[f].match(/Eldritch Invocation/)) {
        f = f.charAt(0).toLowerCase() + f.substring(1).replaceAll(' ', '');
        rules.defineRule('validationNotes.' + f + 'SelectableFeature',
          'features.' + name, '^', '0'
        );
      }
    }
  } else if(name == 'Fey Touched') {
    rules.defineRule('abilityBoosts', 'abilityNotes.feyTouched', '+=', '1');
  } else if(name == 'Fighting Initiate') {
    rules.defineRule('selectableFeatureCount.Fighter (Fighting Style)',
      'featureNotes.fightingInitiate', '+=', '1'
    );
    // Override class requirement for Fighter Fighting Style features
    features = rules.getChoices('selectableFeatures');
    for(var f in features) {
      if(f.match(/^Fighter/) && features[f].match(/Fighting Style/)) {
        f = f.charAt(0).toLowerCase() + f.substring(1).replaceAll(' ', '');
        rules.defineRule('validationNotes.' + f + 'SelectableFeature',
          'features.' + name, '^', '0'
        );
      }
    }
  } else if(name == 'Metamagic Adept') {
    rules.defineRule('selectableFeatureCount.Sorcerer (Metamagic)',
      'featureNotes.metamagicAdept', '+=', '2'
    );
    rules.defineRule
      ('magicNotes.fontOfMagic', 'featureNotes.metamagicAdept', '+=', '2');
    // Override class requirement for Sorcerer Metamagic features
    features = rules.getChoices('selectableFeatures');
    for(var f in features) {
      if(f.match(/^Sorcerer/) && features[f].match(/Metamagic/)) {
        f = f.charAt(0).toLowerCase() + f.substring(1).replaceAll(' ', '');
        rules.defineRule('validationNotes.' + f + 'SelectableFeature',
          'features.' + name, '^', '0'
        );
      }
    }
  } else if(name == 'Piercer') {
    rules.defineRule('abilityBoosts', 'abilityNotes.piercer', '+=', '1');
  } else if(name == 'Shadow Touched') {
    rules.defineRule('abilityBoosts', 'abilityNotes.shadowTouched', '+=', '1');
  } else if(name == 'Slasher') {
    rules.defineRule('abilityBoosts', 'abilityNotes.slasher', '+=', '1');
  } else if(name == 'Telekinetic') {
    rules.defineRule('abilityBoosts', 'abilityNotes.telekinetic', '+=', '1');
  } else if(name == 'Telepathic') {
    rules.defineRule('abilityBoosts', 'abilityNotes.telepathic', '+=', '1');
  }
};

/*
 * Defines in #rules# the rules associated with path #name# that cannot be
 * derived directly from the attributes passed to pathRules.
 */
Tasha.pathRulesExtra = function(rules, name) {

  var pathLevel =
    name.charAt(0).toLowerCase() + name.substring(1).replaceAll(' ', '') +
    'Level';

  if(name == 'Armorer') {
    // Have to hard-code these proficiencies, since featureRules only handles
    // notes w/a single type of granted proficiency
    rules.defineRule
      ('armorProficiency.Heavy', 'featureNotes.toolsOfTheTrade', '=', '1');
    rules.defineRule("toolProficiency.Smith's Tools",
      'featureNotes.toolsOfTheTrade', '=', '1'
    );
    rules.defineRule
      ('combatNotes.extraAttack', pathLevel, '+=', 'source>=5 ? 1 : null');
    rules.defineRule('speed', 'abilityNotes.poweredSteps', '+', '5');
    rules.defineRule('selectableFeatureCount.Artificer (Armor Model)',
      'features.Armorer', '=', '1'
    );
  } else if(name == 'Artillerist') {
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
  } else if(name == 'Bladesinging') {
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
  } else if(name == 'Circle Of Spores') {
    rules.defineRule('combatNotes.haloOfSpores',
      pathLevel, '=', 'source<6 ? 4 : source<10 ? 6 : source<14 ? 8 : 10'
    );
    rules.defineRule('combatNotes.haloOfSpores.1',
      'features.Halo Of Spores', '?', null,
      'spellDifficultyClass.D', '=', null
    );
    rules.defineRule('combatNotes.spreadingSpores',
      'spellDifficultyClass.D', '=', null
    );
    rules.defineRule
      ('combatNotes.symbioticEntity', pathLevel, '=', 'source * 4');
  } else if(name == 'Circle Of Stars') {
    rules.defineRule('magicNotes.starryForm',
      pathLevel, '=', '1',
      'magicNotes.twinklingConstellations', '^', '2'
    );
  } else if(name == 'Circle Of Wildfire') {
    rules.defineRule
      ('magicNotes.summonWildfireSpirit', 'spellDifficultyClass.D', '=', null);
  } else if(name == 'College Of Creation') {
    rules.defineRule('magicNotes.performanceOfCreation',
      pathLevel, '=', 'source<6 ? "medium" : source<14 ? "large" : "huge"'
    );
  } else if(name == 'College Of Eloquence') {
    rules.defineRule('magicNotes.infectiousInspiration',
      'charismaModifier', '=', 'Math.max(source, 1)'
    );
    rules.defineRule('magicNotes.universalSpeech',
      'charismaModifier', '=', 'Math.max(source, 1)'
    );
  } else if(name == 'Fey Wanderer') {
    rules.defineRule
      ('combatNotes.beguilingTwist', 'spellDifficultyClass.R', '=', null);
  } else if(name == 'Oath Of Glory') {
    rules.defineRule('combatNotes.inspiringSmite', pathLevel, '=', null);
    rules.defineRule
      ('magicNotes.auraOfAlacrity', pathLevel, '=', 'source<18 ? 5 : 10');
  } else if(name == 'Oath Of The Watchers') {
    rules.defineRule
      ('combatNotes.abjureTheExtraplanar', 'spellDifficultyClass.P', '=', null);
    rules.defineRule
      ('combatNotes.auraOfTheSentinel', 'proficiencyBonus', '=', null);
    rules.defineRule('combatNotes.auraOfTheSentinel.1',
      pathLevel, '=', 'source<18 ? 10 : 30'
    );
    rules.defineRule
      ('combatNotes.mortalBulwark', 'spellDifficultyClass.P', '=', null);
  } else if(name == 'Order Domain') {
    rules.defineRule
      ('combatNotes.divineStrike', pathLevel, '=', 'source<14 ? 1 : 2');
    rules.defineRule('combatNotes.divineStrike.1', pathLevel, '=', '"psychic"');
    rules.defineRule
      ("magicNotes.order'sDemand", 'spellDifficultyClass.C', '=', null);
  } else if(name == 'Peace Domain') {
    rules.defineRule
      ('magicNotes.potentSpellcasting.1', 'wisdomModifier', '=', null);
  } else if(name == 'Psi Warrior') {
    rules.defineRule
      ('features.Psi-Powered Leap', 'featureNotes.telekineticAdept', '=', null);
    rules.defineRule('features.Telekinetic Thrust',
      'featureNotes.telekineticAdept', '=', null
    );
    rules.defineRule
      ('featureNotes.psionicPower', 'proficiencyBonus', '=', 'source * 2');
    rules.defineRule('featureNotes.psionicPower.1',
      'features.Psionic Power', '?', null,
      pathLevel, '=', 'source<5 ? 6 : source<11 ? 8 : source<17 ? 10 : 12'
    );
  } else if(name == 'Rune Knight') {
    rules.defineRule('combatNotes.cloudRune',
      pathLevel, '=', '1',
      'combatNotes.masterOfRunes', '^', '2'
    );
    rules.defineRule('combatNotes.fireRune',
      pathLevel, '=', '1',
      'combatNotes.masterOfRunes', '^', '2'
    );
    rules.defineRule("combatNotes.giant'sMight",
      pathLevel, '=', '6',
      'combatNotes.greatStature', '^', '8',
      'combatNotes.runicJuggernaut', '^', '10'
    );
    rules.defineRule('combatNotes.stoneRune',
      pathLevel, '=', '1',
      'combatNotes.masterOfRunes', '^', '2'
    );
    rules.defineRule('combatNotes.stormRune',
      pathLevel, '=', '1',
      'combatNotes.masterOfRunes', '^', '2'
    );
    rules.defineRule("featureNotes.giant'sMight",
      pathLevel, '=', '"Large"',
      'combatNotes.runicJuggernaut', '=', '"Huge"'
    );
    rules.defineRule('featureNotes.runeCarver',
      pathLevel, '=', 'source<7 ? 2 : source<10 ? 3 : source<15 ? 4 : 5'
    );
    rules.defineRule
      ('languageCount', 'skillNotes.runeKnightBonusProficiencies', '+', '1');
    rules.defineRule
      ('languages.Giant', 'skillNotes.runeKnightBonusProficiencies', '=', '1');
    rules.defineRule('selectableFeatureCount.Fighter (Rune)',
      'featureNotes.runeCarver', '=', null
    );
    rules.defineRule('saveNotes.hillRune',
      pathLevel, '=', '1',
      'combatNotes.masterOfRunes', '^', '2'
    );
    rules.defineRule("toolProficiency.Smith's Tools",
      'skillNotes.runeKnightBonusProficiencies', '=', '1'
    );
  } else if(name == 'Soulknife') {
    rules.defineRule('combatNotes.psychicBlades',
      'strengthModifier', '=', null,
      'dexterityModifier', '^', null
    );
    rules.defineRule('combatNotes.psychicTeleportation',
      'featureNotes.psionicPower.1', '=', null
    );
    rules.defineRule
      ('featureNotes.psionicPower', 'proficiencyBonus', '=', 'source * 2');
    rules.defineRule('featureNotes.psionicPower.1',
      'features.Psionic Power', '?', null,
      pathLevel, '=', 'source<5 ? 6 : source<11 ? 8 : source<17 ? 10 : 12'
    );
    rules.defineRule('featureNotes.psychicWhispers',
      'featureNotes.psionicPower.1', '=', null
    );
    rules.defineRule
      ('features.Homing Strikes', 'featureNotes.soulBlades', '=', '1');
    rules.defineRule
      ('features.Psychic Teleportation', 'featureNotes.soulBlades', '=', '1');
  } else if(name == 'Swarmkeeper') {
    rules.defineRule
      ('combatNotes.gatheredSwarm', 'spellDifficultyClass.R', '=', null);
    rules.defineRule('combatNotes.gatheredSwarm.1',
      'features.Gathered Swarm', '?', null,
      'levels.Ranger', '=', '6',
      'combatNotes.mightySwarm', '^', '8'
    );
  } else if(name == 'Twilight Domain') {
    // Have to hard-code these proficiencies, since featureRules only handles
    // notes w/a single type of granted proficiency
    rules.defineRule('armorProficiency.Heavy',
      'combatNotes.twilightBonusProficiencies', '=', '1'
    );
    rules.defineRule('weaponProficiency.Martial',
      'combatNotes.twilightBonusProficiencies', '=', '1'
    );
    rules.defineRule
      ('combatNotes.divineStrike', pathLevel, '=', 'source<14 ? 1 : 2');
    rules.defineRule('combatNotes.divineStrike.1', pathLevel, '=', '"radiant"');
  } else if(name == 'Way Of Mercy') {
    // Have to hard-code these proficiencies, since featureRules only handles
    // notes w/a single type of granted proficiency
    rules.defineRule
      ('skillProficiency.Insight', 'skillNotes.implementsOfMercy', '=', '1');
    rules.defineRule
      ('skillProficiency.Medicine', 'skillNotes.implementsOfMercy', '=', '1');
    rules.defineRule('toolProficiency.Herbalism Kit',
      'skillNotes.implementsOfMercy', '=', '1'
    );
  }

};

/* Returns HTML body content for user notes associated with this rule set. */
Tasha.ruleNotes = function() {
  return '' +
    '<h2>Tasha Quilvyn Plugin Notes</h2>\n' +
    'Tasha Quilvyn Plugin Version ' + Tasha.VERSION + '\n' +
    '<p>\n' +
    'There are no known bugs, limitations, or usage notes specific to the Tasha Rule Set.\n' +
    '</p>\n' +
    '<h3>Copyrights and Licensing</h3>\n' +
    '<p>\n' +
    'Quilvyn\'s Tasha\'s Cauldron supplement is unofficial Fan Content ' +
    'permitted under Wizards of the Coast\'s ' +
    '<a href="https://company.wizards.com/en/legal/fancontentpolicy">Fan Content Policy</a>.\n' +
    '</p><p>\n' +
    'Quilvyn is not approved or endorsed by Wizards of the Coast. Portions ' +
    'of the materials used are property of Wizards of the Coast. ©Wizards of ' +
    'the Coast LLC.\n' +
    '</p><p>\n' +
    'Tasha\'s Cauldron of Everything © 2020 Wizards of the Coast LLC.\n' +
    '</p><p>\n' +
    'Dungeons & Dragons Player\'s Handbook © 2014 Wizards of the Coast LLC.\n' +
    '</p>\n';
};
