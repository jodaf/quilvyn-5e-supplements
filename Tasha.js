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
    rules = PHB5E.rules

  Tasha.identityRules(
    rules, Tasha.CLASSES, Tasha.CLASSES_FEATURES_ADDED,
    Tasha.CLASSES_SELECTABLES_ADDED, Tasha.DEITIES_DOMAINS_ADDED, Tasha.PATHS
  );
  SRD5E.magicRules(rules, {}, Tasha.SPELLS);
  Tasha.magicRules(rules, Tasha.SPELLS_LEVELS_ADDED);
  SRD5E.talentRules(rules, Tasha.FEATS, Tasha.FEATURES, {}, {}, {}, {});

}

Tasha.VERSION = '2.2.1.0';

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
      '"2:Infuse Item","3:Artificer Specialist",' +
      '"3:The Right Tool For The Job","6:Tool Expertise","7:Flash Of Genius",' +
      '"10:Magic Item Adept","11:Spell-Storing Item","14:Magic Item Savant",' +
      '"18:Magic Item Master","20:Soul Of Artifice" ' +
    'Selectables=' +
      '"3:Alchemist:Specialist",' +
      '"3:Armorer:Specialist",' +
      '"3:Artillerist:Specialist",' +
      '"3:Battle Smith:Specialist",' +
      '"14:Arcane Propulsion Armor:Infusion",' +
      '"2:Armor Of Magical Strength:Infusion",' +
      '"6:Boots Of The Winding Path:Infusion",' +
      '"2:Enhanced Arcane Focus:Infusion",' +
      '"2:Enhanced Defense:Infusion",' +
      '"2:Enhanced Weapon:Infusion",' +
      '"10:Helm Of Awareness:Infusion",' +
      '"2:Homunculous Servant:Infusion",' +
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
      'A2:5=2;8=3,' +
      'A3:9=2;11=3,' +
      'A4:13=1;15=2;17=3,' +
      'A5:17=1;19=2'
};

Tasha.CLASSES_FEATURES_ADDED = {
  'Barbarian':
    '"3:Primal Knowledge",' +
    '"7:Instictive Pounce"',
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
    '"1:Fighting Style (Unarmed Fighting):Fighting Style",' +
    '"3:Psi Warrior:Martial Archetype",' +
    '"3:Rune Knight:Martial Archetype"',
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
    '"3:Soul Knife:Roguish Archetype"',
  'Sorcerer':
    '"1:Aberrant Mind:Sorcerous Origin",' +
    '"1:Clockwork Soul:Sorcerous Origin",' +
    '"3:Seeking Spell:Metamagic",' +
    '"3:Transmuted Spell:Metamagic"',
  'Warlock':
    '"1:Fathomless:Otherworldly Patron",' +
    '"1:The Genie:Otherworldly Patron",' +
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
    '"2:Bladesinger:Arcane Tradition",' +
    '"2:Order Of Scribes:Arcane Tradition"'
};
Tasha.DEITIES_DOMAINS_ADDED = {
  'FR-Bane':'Order',
  'Greyhawk-Pholtus':'Order',
  'FR-Tyr':'Order',
  'Greyhawk-Wee Jas':'Order',
  'NH-Angharradh':'Peace',
  'NH-Berronar Truesilver':'Peace',
  'NH-Cyrrollalee':'Peace',
  'FR-Eldath':'Peace',
  'NH-Gaerdal Ironhand':'Peace',
  'Greyhawk-Rao':'Peace',
  'Greyhawk-Celestian':'Twilight',
  'FR-Helm':'Twilight',
  'FR-Ilmater':'Twilight',
  'FR-Selune':'Twilight',
  'NH-Yondalla':'Twilight'
};
if(Window.Eberron) {
  Tasha.DEITY_DOMAINS_ADDED['Eberron-Aureon'] = 'Order';
  Tasha.DEITY_DOMAINS_ADDED['Eberron-Boldrei'] = 'Peace,Twilight';
  Tasha.DEITY_DOMAINS_ADDED['Eberron-Dol Arrah'] = 'Twilight';
}
if(Window.Dragonlance) {
  Tasha.DEITY_DOMAINS_ADDED['Dragonlance-Majere'] = 'Order';
  Tasha.DEITY_DOMAINS_ADDED['Dragonlance-Mishalkal'] = 'Twilight';
  Tasha.DEITY_DOMAINS_ADDED['Dragonlance-Paladine'] = 'Peace';
}
Tasha.FEATS = {
  'Artificier Initiate':'',
  'Chef':'',
  'Crusher':'',
  'Eldritch Adept':
    'Require="features.Spellcasting||features.Pact Magic"',
  'Fey Touched':'',
  'Fighting Initiate':
    'Require="features.Weapon Proficiency (Martial)"',
  'Gunner':'',
  'Metamagic Adept':
    'Require="features.Spellcasting||features.Pact Magic"',
  'Piercer':'',
  'Poisoner':'',
  'Shadow Touched':'',
  'Skill Expert':'',
  'Slasher':'',
  'Telekinetic':'',
  'Telepathic':''
};
Tasha.FEATURES = {
  // Class
  'Artificer Specialist':'Section=feature Note="TODO"',
  'Flash Of Genius':'Section=feature Note="TODO"',
  'Infuse Item':'Section=feature Note="TODO"',
  'Magic Item Adept':'Section=feature Note="TODO"',
  'Magic Item Master':'Section=feature Note="TODO"',
  'Magic Item Savant':'Section=feature Note="TODO"',
  'Magical Tinkering':'Section=feature Note="TODO"',
  'Soul Of Artifice':'Section=feature Note="TODO"',
  'The Right Tool For The Job':'Section=feature Note="TODO"',
  'Spell-Storing Item':'Section=feature Note="TODO"',
  'Tool Expertise':'Section=feature Note="TODO"',
  'Arcane Propulsion Armor':'Section=feature Note="TODO"',
  'Armor Of Magical Strength':'Section=feature Note="TODO"',
  'Boots Of The Winding Path':'Section=feature Note="TODO"',
  'Enhanced Arcane Focus':'Section=feature Note="TODO"',
  'Enhanced Defense':'Section=feature Note="TODO"',
  'Enhanced Weapon':'Section=feature Note="TODO"',
  'Helm Of Awareness':'Section=feature Note="TODO"',
  'Homunculous Servant':'Section=feature Note="TODO"',
  'Mind Sharpener':'Section=feature Note="TODO"',
  'Radiant Weapon':'Section=feature Note="TODO"',
  'Repeating Shot':'Section=feature Note="TODO"',
  'Replicate Magic Item':'Section=feature Note="TODO"',
  'Repulsion Shield':'Section=feature Note="TODO"',
  'Resistant Armor':'Section=feature Note="TODO"',
  'Returning Weapon':'Section=feature Note="TODO"',
  'Spell-Refueling Ring':'Section=feature Note="TODO"',
  // Feats
  'Artificier Initiate':'Section=feature Note="TODO"',
  'Chef':'Section=feature Note="TODO"',
  'Crusher':'Section=feature Note="TODO"',
  'Eldritch Adept':'Section=feature Note="TODO"',
  'Fey Touched':'Section=feature Note="TODO"',
  'Fighting Initiate':'Section=feature Note="TODO"',
  'Gunner':'Section=feature Note="TODO"',
  'Metamagic Adept':'Section=feature Note="TODO"',
  'Piercer':
    'Section=ability,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Strength, Dexterity)",' +
      '"Additional piercing crit die, reroll 1 piercing damage die 1/tn"',
  'Poisoner':
    'Section=combat,skill ' +
    'Note=' +
      '"Ignore poison resistance, poison-coated weapon +2d8 HP (DC 14 Con neg)",' +
      '"Tool Proficiency (Poisoner\'s Kit)"',
  'Shadow Touched':
    'Section=ability,magic ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Intelligence, Wisdom, Charisma)",' +
      '"Learn <i>Invisibility</i>, cast chosten 1st-level spell 1/long rest"',
  'Skill Expert':'Section=feature Note="TODO"',
  'Slasher':'Section=feature Note="TODO"',
  'Telekinetic':'Section=feature Note="TODO"',
  'Telepathic':'Section=feature Note="TODO"',
  // Paths
  'Alchemical Savant':
    'Section=magic ' +
    'Note="+%{intelligenceModifier>?1} on spell healing or acid, fire, necrotic or poison damage"',
  'Alchemist Bonus Proficiecy':
    'Section=feature Note="Tool Proficiency (Alchemist\'s Supplies)"',
  'Alchemist Spells':'Section=feature Note="TODO"',
  'Arcane Armor':'Section=feature Note="TODO"',
  'Arcane Firearm':'Section=feature Note="TODO"',
  'Arcane Jolt':'Section=feature Note="TODO"',
  'Armor Modifications':'Section=feature Note="TODO"',
  'Armorer Spells':'Section=feature Note="TODO"',
  'Artillerist Bonus Proficiency':
    'Section=feature Note="Tool Proficiency (Woodcarver\'s Tools)"',
  'Artillerist Spells':'Section=feature Note="TODO"',
  'Battle Ready':'Section=feature Note="TODO"',
  'Battle Smith Bonus Proficiency':
    'Section=feature Note="Tool Proficiency (Smith\'s Tools)"',
  'Battle Smith Spells':'Section=feature Note="TODO"',
  'Chemical Mastery':'Section=feature Note="TODO"',
  'Eldritch Cannon':'Section=feature Note="TODO"',
  'Experimental Elixir':'Section=feature Note="TODO"',
  'Explosive Cannon':'Section=feature Note="TODO"',
  'Extra Attack':'Section=feature Note="TODO"',
  'Fortified Position':'Section=feature Note="TODO"',
  'Improved Defender':'Section=feature Note="TODO"',
  'Perfected Armor':'Section=feature Note="TODO"',
  'Restorative Regents':'Section=feature Note="TODO"',
  'Steel Defender':'Section=feature Note="TODO"',
  'Tools Of The Trade':
    'Section=feature ' +
    'Note="Armor Proficiency (Heavy)/Tool Proficiency (Smith\'s Tools)"',
  'Bladesong':
    'Section=ability,combat,magic,skill ' +
    'Note=' +
      '"+10 Speed in light or no armor for 1 min 2/short rest",' +
      '"+%V AC in light or no armor for 1 min 2/short rest",' +
      '"+%V Concentration in light or no armor to retain spell for 1 min 2/short rest",' +
      '"Adv Acrobatics in light or no armor for 1 min 2/short rest"',
  'Extra Attack':
    'Section=combat Note="+%V Attacks Per Round"',
  'Infectious Inspiration':
    'Section=magic ' +
    'Note="R60\' Reaction to grant extra bardic inspiration after successful use %V/long rest"',
  'Magical Guidance':
    'Section=feature ' +
    'Note="Spend 1 Sorcery Point to reroll failed ability check"',
  'Psionic Sorcery':
    'Section=magic ' +
    'Note="Cast spell using Sorcery Points instead of spell slot"',
  'Psychic Defenses':
    'Section=save ' +
    'Note="Resistance to psychic damage, Adv vs. charm and fright"',
  'Revelation In The Flesh':
    'Section=ability,feature ' +
    'Note=' +
      '"Spend 1 Sorcery Point for Fly %{speed}\', Swim %{speed*2} and water breathing, or squeeze through 1 inch space for 10 min",' +
      '"Spend 1 Sorcery Point for 60\' see invisible for 10 min"',
  'Seeking Spell':
    'Section=magic Note="Spend 2 Sorcery Points to reroll missed spell attack"',
  'Silver Tongue':
    'Section=skill Note="Min 10 roll on Deception and Persuasion"',
  'Song Of Defense':
    'Section=magic Note="Expend spell slot to reduce damage by 5x slot level"',
  'Song Of Victory':'Section=combat Note="+%V damage for 1 min 2/short rest"',
  'Sorcerous Versatility':
    'Section=magic Note="Exchange Metamagic option or Cantrip"',
  'Telepathic Speech':
    'Section=feature ' +
    'Note="R30\' Communicate telepatically w/target for %{levels.Sorcerer} min"',
  'Training In War And Song':
    'Section=combat,skill ' +
    'Note=' +
      '"Armor Proficiency (Light)/Weapon Proficiency (Choose 1 from any)",' +
      '"Skill Proficiency (Performance)"',
  'Transmuted Spell':
    'Section=magic ' +
    'Note="Change spell damage from acid, code, fire, lightning, poison, or thunder to another type"',
  'Unfailing Inspiration':
    'Section=magic Note="Inspiration die kept after failed use"',
  'Universal Speech':
    'Section=magic Note="R60\' %V targets understand self for 1 hr 1/long rest"',
  'Unsettling Words':
    'Section=magic ' +
    'Note="R60\' Target subtract Bardic Inspiration roll from next save"',
  'Warping Implosion':
    'Section=magic ' +
    'Note="120\' teleport causes 3d10 HP in 5\' radius of starting position (Str neg) 1/long rest"'
};
Tasha.PATHS = {
  'Aberrant Mind':
    'Group=Sorcerer Level=levels.Sorcerer ' +
    'Features=' +
      '"1:Telepathic Speech","6:Psionic Sorcery","6:Psychic Defenses",' +
      '"14:Revelation In Flesh","18:Warping Implosion"',
  'Alchemist':
    'Group=Artificer Level=levels.Artificer ' +
    'Features=' +
      '"3:Alchemist Bonus Proficiecy","3:Alchemist Spells",' +
      '"3:Experimental Elixir","5:Alchemical Savant","9:Restorative Regents",' +
      '"15:Chemical Mastery"',
  'Armorer':
    'Group=Artificer Level=levels.Artificer ' +
    'Features=' +
      '"3:Arcane Armor","3:Armor Model","3:Armorer Spells",' +
      '"3:Tools Of The Trade","5:Extra Attack","9:Armor Modifications",' +
      '"15:Perfected Armor"',
  'Artillerist':
    'Group=Artificer Level=levels.Artificer ' +
    'Features=' +
      '"3:Artillerist Bonus Proficiency","3:Artillerist Spells",' +
      '"3:Eldritch Cannon","5:Arcane Firearm","9:Explosive Cannon",' +
      '"15:Fortified Position"',
  'Battle Smith':
    'Group=Artificer Level=levels.Artificer ' +
    'Features=' +
      '"3:Battle Ready","3:Battle Smith Bonus Proficiency",' +
      '"3:Battle Smith Spells","3:Steel Defender","5:Extra Attack",' +
      '"9:Arcane Jolt","15:Improved Defender"',
  'Bladesinging':
    'Group=Wizard Level=levels.Wizard ' +
    'Features=' +
      '"2:Training In War And Song","2:Bladesong","6:Extra Attack",' +
      '"10:Song Of Defense","14:Song Of Victory"',
  'Circle Of Spores':
    'Group=Druid Level=levels.Druid ' +
    'Features=' +
      '"2:Halo Of Spores","2:Symbiotic Entity","6:Fungal Infestation",' +
      '"10:Spreading Spores","14:Fungal Body"',
  'Circle Of Stars':
    'Group=Druid Level=levels.Druid ' +
    'Features=' +
      '"2:Star Map","2:Starry Form","6:Cosmic Omen",' +
      '"10:Twinkling Constallations","14:Full Of Stars"',
  'Circle Of Wildfire':
    'Group=Druid Level=levels.Druid ' +
    'Features=' +
      '"2:Summon Wildfire Spirit","6:Enhanced Bond","10:Cauterizing Flame",' +
      '"14:Blazing Revival"',
  'Clockwork Soul':
    'Group=Sorcerer Level=levels.Sorcerer ' +
    'Features=' +
      '"1:Restore Balance","6:Bastion Of Law","14:Trance Of Order",' +
      '"18:Clockwork Cavalcade"',
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
      '"15:Glorious Defense","20:Living Legend"',
  'Oath Of The Watchers':
    'Group=Paladin Level=levels.Paladin ' +
    'Features=' +
      '"3:Abjure The Extraplanar","3:Watcher\'s Will",' +
      '"7:Aura Of The Sentinel","15:Vigilant Rebuke","20:Mortal Bulwark"',
  'Order Domain':
    'Group=Cleric Level=levels.Cleric ' +
    'Features=' +
      '"1:Armor Proficiency (Heavy)",' +
      '"1:Skill Proficiency (Choose 1 from Intimidation, Persuasion)",' +
      '"1:Voice Of Authority","2:Order\'s Demand","6:Embodiment Of The Law",' +
      '"8:Divine Strike","Order\'s Wrath" ' +
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
      '"1:Skill Proficiency (Choose 1 from Insight, Performance, Persuasion)",' +
      '"1:Emboldening Bond","2:Balm Of Peace","6:Protective Bond",' +
      '"8:Potent Spellcasting","17:Expansive Bond" ' +
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
      '"3:Psi Warrior","7:Telekinetic Adept","10:Guarded Mind",' +
      '"15:Bulwark Of Force","18:Telekinetic Master"',
  'Rune Knight':
    'Group=Fighter Level=levels.Fighter ' +
    'Features=' +
      '"3:Tool Proficiency (Smith\'s Tools)",' +
      '"3:Rune Carver","3:Giant\'s Might","7:Runic Shield",' +
      '"10:Great Stature","15:Master Of Runes","18:Runic Juggernaut"',
  'Soulknife':
    'Group=Rogue Level=levels.Rogue ' +
    'Features=' +
      '"3:Psionic Power","3:Psychic Blades","9:Soul Blades",' +
      '"13:Psychic Veil","17:Rend Mind"',
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
      '"1:Geneie\'s Vessel","6:Elemental Gift","10:Sanctuary Vessel",' +
      '"14:Limited Wish"',
  'Twilight Domain':
    'Group=Cleric Level=levels.Cleric ' +
    'Features=' +
      '"1:Eyes Of Night","1:Vigilant Blessing","2:Twilight Sanctuary",' +
      '"6:Steps Of Night","8:Divine Strike","17:Twilight Shroud" ' +
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
  'Booming Blade':
    'School=Evocation ' +
    'Level=A0,K0,S0,W0 ' +
    'Description="Weapon attack does +%{($L+1)//6}d8 HP thunder +%{($L+7)//6}d8 HP if target moves before next tn"',
  'Blade Of Disaster':
    'School=Conjuration ' +
    'Level=K9,S9,W9 ' +
    'Description="Planar blade move 30\'/tn, two attacks 4d12 HP force x3@18 for conc + 1 min"',
  'Dream Of The Blue Veil':
    'School=Conjuration ' +
    'Level=B7,K7,S7,W7 ' +
    'Description="Self and 8 willing others travel to another world for 6 hr"',
  'Green-Flame Blade':
    'School=Evocation ' +
    'Level=A0,K0,S0,W0 ' +
    'Description="Weapon attack does +%{($L+1)//6}d8 HP fire +abilityModifier+%{($L+7)//6}d8 HP to another target w/in 5\'"',
  'Intellect Fortress':
    'School=Abjuration ' +
    'Level=A3,B3,K3,S3,W3 ' +
    'Description="R30\' Willing target Resistance to psychic damage, Adv Int, Wis, and Cha saves for conc or 1 hr"',
  'Lightning Lure':
    'School=Evocation ' +
    'Level=A0,K0,S0,W0 ' +
    'Description="R15\' Target pulled 10\' and %{($L+7)//6}d8 HP lightning (Str neg)"',
  'Mind Sliver':
    'School=Enchantment ' +
    'Level=K0,S0,W0 ' +
    'Description="R60\' Target %{($L+7)//6}d6 HP psychic, -1d4 next save (Int neg)"',
  'Spirit Shroud':
    'School=Necromancy ' +
    'Level=C3,K3,P3,W3 ' +
    'Description="Self hits +1d8 HP radiant, necrotic, or cold, target w/in 10\' -10\' Speed for conc or 1 min"',
  'Summon Aberration':
    'School=Conjuration ' +
    'Level=K4,W4 ' +
    'Description="R90\' Summoned beholderkin, slaad, or star spawn aberrant spirit obeys commands for conc or 1 hr"',
  'Summon Beast':
    'School=Conjuration ' +
    'Level=D2,R2 ' +
    'Description="R90\' Summoned air, land, or water bestial spirit obeys commands for conc or 1 hr"',
  'Summon Celestial':
    'School=Conjuration ' +
    'Level=C5,P5 ' +
    'Description="R90\' Summoned avenger or defender celestial spirit obeys commands for conc or 1 hr"',
  'Summon Construct':
    'School=Conjuration ' +
    'Level=A4,W4 ' +
    'Description="R90\' Summoned clay, metal, or stone construct spirit obeys commands for conc or 1 hr"',
  'Summon Elemental':
    'School=Conjuration ' +
    'Level=D4,R4,W4 ' +
    'Description="R90\' Summoned air, earth, fire, or water elemental spirit obeys commands for conc or 1 hr"',
  'Summon Fey':
    'School=Conjuration ' +
    'Level=D3,R3,K3,W3 ' +
    'Description="R90\' Summoned fuming, mirthful, or ticksy fey spirit obeys commands for conc or 1 hr"',
  'Summon Fiend':
    'School=Conjuration ' +
    'Level=K6,W6 ' +
    'Description="R90\' Summoned demon, devil, or yugoloth fiendish spirit obeys commands for conc or 1 hr"',
  'Summon Shadowspawn':
    'School=Conjuration ' +
    'Level=K3,W3 ' +
    'Description="R90\' Summoned fury, despair, or fear shadow spirit obeys commands for conc or 1 hr"',
  'Summon Undead':
    'School=Necromancy ' +
    'Level=K3,W3 ' +
    'Description="R90\' Summoned ghostly, putrid, or skeletal undead spirit obeys commands for conc or 1 hr"',
  'Sword Burst':
    'School=Conjuration ' +
    'Level=K0,S0,W0 ' +
    'Description="R5\' %{($L+7)}d6 HP force (Dex neg)"',
  "Tasha's Caustic Brew":
    'School=Evocation ' +
    'Level=A1,S1,W1 ' +
    'Description="30\'x5\' line 2d4 HP/rd acid for conc or 1 min (Dex neg)"',
  "Tasha's Mind Whip":
    'School=Enchantment ' +
    'Level=S2,W2 ' +
    'Description="R90\' Target 3d6 HP psychic, single action next tn (Int half, no action reduction)"',
  "Tasha's Otherworldly Guise":
    'School=Transmutation ' +
    'Level=K6,S6,W6 ' +
    'Description="Self 40\' Fly Speed, +2 AC, attacks magical and use spell ability modifier, extra attack, immune fire, poison, and poisoned (Lower Planes) or radiant, necrotic, and charmed (Upper Planes) for conc or 1 min"'
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
  'Aura Of Purity':'C4,Peace4,Watchers4',
  'Aura Of Vitality':'C3,D3,Twilight3',
  'Banishment':'Watchers4',
  'Beacon Of Hope':'Peace3',
  "Bigby's Hand":'A5,S5',
  'Blight':'Spores4',
  'Blindness/Deafness':'Spores2',
  'Blink':'A3',
  'Blur':'A2',
  'Burning Hands':'Wildfire1',
  'Chill Touch':'Spores1',
  'Circle Of Power':'Twilight5',
  'Cloudkill':'Spores5',
  'Color Spray':'B1',
  'Command':'B1,Order1',
  'Commune':'Glory5,Order5',
  'Compulsion':'Glory4,Order4',
  'Cone Of Cold':'D5',
  'Confusion':'Spores4',
  'Contagion':'Spores5',
  'Continual Flame':'A2,D2',
  'Counterspell':'Watchers3',
  'Create Food And Water':'A3',
  'Creation':'A5',
  'Cure Wounds':'A1,Wildfire1',
  'Dancing Lights':'A0',
  'Darkvision':'A2',
  'Demiplane':'S8',
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
  'Fire Bolt':'A0',
  'Fire Shield':'D4,S4,Wildfire4',
  'Flame Blade':'S2',
  'Flame Strike':'Glory5,Wildfire5',
  'Flaming Sphere':'S2,Wildfire2',
  'Flesh To Stone':'D6,S6',
  'Fly':'A3',
  'Freedom Of Movement':'A4,Glory4',
  'Gaseous Form':'Spores3',
  'Gate':'K9',
  'Gentle Repose':'P2,Spores2',
  'Glyph Of Warding':'A3',
  'Grease':'A1,S1',
  'Greater Invisibility':'Twilight4',
  'Greater Restoration':'A5,Peace5,R5',
  'Guidance':'A0',
  'Guiding Bolt':'Glory1',
  'Gust Of Wind':'R2',
  'Haste':'A3,Glory3',
  'Heat Metal':'A2',
  "Heroes' Feast":'B6',
  'Heroism':'Glory1,Order1,Peace1',
  'Hold Monster':'Watchers5',
  'Hold Person':'Order2',
  'Identify':'A1',
  'Incendiary Cloud':'D8',
  'Invisibility':'A2',
  'Jump':'A1',
  "Leomund's Secret Chest":'A4',
  "Leomund's Tiny Hut":'Twilight3',
  'Lesser Restoration':'A2',
  'Levitate':'A2',
  'Light':'A0',
  'Locate Creature':'Order4',
  'Longstrider':'A1',
  'Mage Hand':'A0',
  'Magic Mouth':'A2',
  'Magic Weapon':'A2,Glory2,R2,S2',
  'Mass Cure Wounds':'Wildfire5',
  'Mass Healing Word':'B3,Order3',
  'Meld Into Stone':'R3',
  'Mending':'A0',
  'Message':'A0',
  'Mirror Image':'B2',
  'Mislead':'K5,Twilight5',
  'Moonbeam':'Twilight2,Watchers2',
  "Mordenkainen's Faithful Hound":'A4',
  'Nondetection':'Watchers3',
  "Otiluke's Freezing Sphere":'S6',
  "Otiluke's Resilient Sphere":'A4,Peace4',
  'Phantasmal Killer':'B4',
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
  "Rary's Telepathic Bond":'B5,Peace5',
  'Ray Of Frost':'A0',
  'Revivify':'A3,D3,R3,Wildfire3',
  'Rope Trick':'A2',
  'Sanctuary':'A1,Peace1',
  'Scorching Ray':'Wildfire2',
  'Scrying':'Watchers5',
  'Searing Smite':'R1',
  'See Invisibility':'A2,Twilight2,Watchers2',
  'Sending':'Peace3',
  'Shocking Grasp':'A0',
  'Sleep':'Twilight1',
  'Slow':'B3,Order3',
  'Speak With Dead':'W3',
  'Spare The Dying':'A0',
  'Spider Climb':'A2',
  'Stone Shape':'A4',
  'Stoneskin':'A4',
  'Sunbeam':'C6',
  'Sunburst':'C8',
  'Symbol':'D7',
  'Teleportation Circle':'K5',
  'Thorn Whip':'A0',
  'Vampiric Touch':'S3',
  'Warding Bond':'Peace2',
  'Wall Of Stone':'A5',
  'Warding Bond':'P2',
  'Water Breathing':'A3',
  'Water Walk':'A3',
  'Web':'A2',
  'Weird':'K9',
  'Zone Of Truth':'Order2',
};
if(window.Xanathar) {
  Tasha.SPELLS_LEVELS_ADDED['Absorb Elements'] = 'A1';
  Tasha.SPELLS_LEVELS_ADDED['Catapult'] = 'A1';
  Tasha.SPELLS_LEVELS_ADDED['Catnap'] = 'A3';
  Tasha.SPELLS_LEVELS_ADDED['Create Bonfire'] = 'A0';
  Tasha.SPELLS_LEVELS_ADDED['Elemental Bane'] = 'A4';
  Tasha.SPELLS_LEVELS_ADDED['Flame Arrows'] = 'A3';
  Tasha.SPELLS_LEVELS_ADDED['Frostbite'] = 'A0';
  Tasha.SPELLS_LEVELS_ADDED['Magic Stone'] = 'A0';
  Tasha.SPELLS_LEVELS_ADDED['Pyrotechnics'] = 'A2';
  Tasha.SPELLS_LEVELS_ADDED['Skill Empowerment'] = 'A5';
  Tasha.SPELLS_LEVELS_ADDED['Snare'] = 'A1';
  Tasha.SPELLS_LEVELS_ADDED['Thunderclap'] = 'A0';
  Tasha.SPELLS_LEVELS_ADDED['Tiny Servant'] = 'A3';
  Tasha.SPELLS_LEVELS_ADDED['Transmute Rock'] = 'A5';
};

/* Defines rules related to basic character identity. */
Tasha.identityRules = function(
  rules, classes, classFeatures, classSelectables, deitiesDomains, paths
) {

  QuilvynUtils.checkAttrTable
    (classes, ['Require', 'HitDie', 'Features', 'Selectables', 'Languages', 'CasterLevelArcane', 'CasterLevelDivine', 'SpellAbility', 'SpellSlots', 'Spells']);
  QuilvynUtils.checkAttrTable
    (paths, ['Features', 'Selectables', 'Group', 'Level', 'SpellAbility', 'SpellSlots', 'Spells']);

  var clas;

  for(clas in classes) {
    rules.choiceRules(rules, 'Class', clas, classes[clas]);
    Tasha.classRulesExtra(rules, clas);
  }
  for(clas in classFeatures) {
    SRD5E.featureListRules
      (rules, QuilvynUtils.getAttrValueArray('Features=' + classFeatures[clas], 'Features'), clas, 'levels.' + clas, false);
  }
  for(clas in classSelectables) {
    SRD5E.featureListRules
      (rules, QuilvynUtils.getAttrValueArray('Selectables=' + classSelectables[clas], 'Selectables'), clas, 'levels.' + clas, true);
  }
  var allDeities = rules.getChoices('deities');
  for(var deity in deitiesDomains) {
    if(!(deity in allDeities)) {
      console.log('Unknown deity "' + deity + '"');
      continue;
    }
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
Tasha.magicRules = function(rules, spellsLevels) {
  for(var s in spellsLevels) {
    var defn = PHB5E.SPELLS[s] || (window.Xanathar ? Xanathar.SPELLS[s] : null);
    if(!defn) {
      console.log('Unknown spell "' + s + '"');
      continue;
    }
    rules.choiceRules(rules, 'Spell', s, defn + ' Level=' + spellsLevels[s]);
  }
};

/*
 * Defines in #rules# the rules associated with class #name# that cannot be
 * derived directly from the attributes passed to classRules.
 */
Tasha.classRulesExtra = function(rules, name) {
  if(name == 'Artificer') {
    rules.defineRule('selectableFeatureCount.Artificer (Infusion)',
      'levels.Artificer', '=', 'source>=2 ? Math.floor((source+6)/4)*2 : null'
    );
    rules.defineRule('selectableFeatureCount.Artificer (Specialist)',
      'levels.Artificer', '=', 'source>=3 ? 1 : null'
    );
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

  if(name == 'Bladesinging') {
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
  } else if(name == 'College Of Eloquence') {
    rules.defineRule('magicNotes.infectiousInspiration',
      'charismaModifier', '=', 'Math.max(source, 1)'
    );
    rules.defineRule('magicNotes.universalSpeech',
      'charismaModifier', '=', 'Math.max(source, 1)'
    );
  } else if(name == 'Rune Knight') {
    rules.defineRule('languageCount', pathLevel, '+', '1');
    rules.defineRule('languages.Giant', pathLevel, '=', '1');
  }

};

/* Returns HTML body content for user notes associated with this rule set. */
Tasha.ruleNotes = function() {
  return '' +
    '<h2>Tasha Quilvyn Plugin Notes</h2>\n' +
    'Tasha Quilvyn Plugin Version ' + Tasha.VERSION + '\n' +
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
    '<p>\n' +
    '<p>\n' +
    'There are no known bugs, limitations, or usage notes specific to the Tasha plugin.\n' +
    '</p>\n';
};
