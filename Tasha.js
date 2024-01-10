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

  Tasha.magicRules(rules, Tasha.SPELLS, Tasha.SPELLS_LEVELS_ADDED);
  Tasha.identityRules(
    rules, Tasha.CLASSES, Tasha.CLASSES_FEATURES_ADDED,
    Tasha.CLASSES_SELECTABLES_ADDED, Tasha.DEITIES_DOMAINS_ADDED
  );
  Tasha.talentRules(rules, Tasha.FEATS, Tasha.FEATURES);

}

Tasha.VERSION = '2.4.1.0';

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
      '"3:The Right Tool For The Job","6:Tool Expertise",' +
      '"7:Flash Of Genius","10:Magic Item Adept","11:Spell-Storing Item",' +
      '"14:Magic Item Savant","18:Magic Item Master","20:Soul Of Artifice",' +
      '"features.Alchemist ? 3:Alchemist Tool Proficiency",' +
      '"features.Alchemist ? 3:Experimental Elixir",' +
      '"features.Guardian Armor ? 3:Thunder Gauntlets",' +
      '"features.Guardian Armor ? 3:Defensive Field",' +
      '"features.Infiltrator Armor ? 3:Lightning Launcher",' +
      '"features.Infiltrator Armor ? 3:Powered Steps",' +
      '"features.Infiltrator Armor ? 3:Dampening Field",' +
      '"features.Alchemist ? 5:Alchemical Savant",' +
      '"features.Alchemist ? 9:Restorative Reagents",' +
      '"features.Alchemist ? 15:Chemical Mastery",' +
      '"features.Armorer ? 3:Arcane Armor",' +
      '"features.Armorer ? 3:Armor Model",' +
      '"features.Armorer ? 3:Tools Of The Trade",' +
      '"features.Armorer || features.Battle Smith ? 5:Extra Attack",' +
      '"features.Armorer ? 9:Armor Modifications",' +
      '"features.Guardian Armor ? 15:Perfected Armor (Guardian Armor)",' +
      '"features.Infiltrator Armor ? 15:Perfected Armor (Infiltrator Armor)",' +
      '"features.Artillerist ? 3:Artillerist Tool Proficiency",' +
      '"features.Artillerist ? 3:Eldritch Cannon",' +
      '"features.Artillerist ? 5:Arcane Firearm",' +
      '"features.Artillerist ? 9:Explosive Cannon",' +
      '"features.Artillerist ? 15:Fortified Position",' +
      '"features.Battle Smith ? 3:Battle Ready",' +
      '"features.Battle Smith ? 3:Battle Smith Tool Proficiency",' +
      '"features.Battle Smith ? 3:Steel Defender",' +
      // Handled above '"features.Battle Smith ? 5:Extra Attack",' +
      '"features.Battle Smith ? 9:Arcane Jolt",' +
      '"features.Battle Smith ? 15:Improved Defender" ' +
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
    'SpellAbility=intelligence ' +
    'SpellSlots=' +
      '"A0:2@1 3@10 4@14",' +
      '"A1:2@1 3@3 4@5",' +
      '"A2:2@5 3@7",' +
      '"A3:2@9 3@11",' +
      '"A4:1@13 2@15 3@17",' +
      '"A5:1@17 2@19"'
};
Tasha.CLASSES_FEATURES_ADDED = {
  'Barbarian':
    '"3:Primal Knowledge",' +
    '"7:Instinctive Pounce",' +
    '"features.Path Of The Beast ? 3:Form Of The Beast",' +
    '"features.Path Of The Beast ? 6:Bestial Soul",' +
    '"features.Path Of The Beast ? 10:Infectious Fury",' +
    '"features.Path Of The Beast ? 14:Call The Hunt",' +
    '"features.Path Of Wild Magic ? 3:Magic Awareness",' +
    '"features.Path Of Wild Magic ? 3:Wild Surge",' +
    '"features.Path Of Wild Magic ? 6:Bolstering Magic",' +
    '"features.Path Of Wild Magic ? 10:Unstable Backlash",' +
    '"features.Path Of Wild Magic ? 14:Controlled Surge"',
  'Bard':
    '"2:Magical Inspiration",' +
    '"4:Bardic Versatility",' +
    '"features.College Of Creation ? 3:Mote Of Potential",' +
    '"features.College Of Creation ? 3:Performance Of Creation",' +
    '"features.College Of Creation ? 6:Animating Performance",' +
    '"features.College Of Creation ? 14:Creative Crescendo",' +
    '"features.College Of Eloquence ? 3:Silver Tongue",' +
    '"features.College Of Eloquence ? 3:Unsettling Words",' +
    '"features.College Of Eloquence ? 6:Unfailing Inspiration",' +
    '"features.College Of Eloquence ? 6:Universal Speech",' +
    '"features.College Of Eloquence ? 14:Infectious Inspiration"',
  'Cleric':
    '"2:Harness Divine Power",' +
    '"4:Cantrip Versatility",' +
    '"8:Blessed Strikes",' +
    '"features.Order Domain ? 1:Bonus Proficiencies (Order Domain)",' +
    '"features.Order Domain ? 1:Voice Of Authority",' +
    '"features.Order Domain ? 2:Order\'s Demand",' +
    '"features.Order Domain ? 6:Embodiment Of The Law",' +
    '"clericHasDivineStrike ? 8:Divine Strike",' +
    '"features.Order Domain ? 17:Order\'s Wrath",' +
    '"features.Peace Domain ? 1:Emboldening Bond",' +
    '"features.Peace Domain ? 1:Implement Of Peace",' +
    '"features.Peace Domain ? 2:Balm Of Peace",' +
    '"features.Peace Domain ? 6:Protective Bond",' +
    '"clericHasPotentSpellcasting ? 8:Potent Spellcasting",' +
    '"features.Peace Domain ? 17:Expansive Bond",' +
    '"features.Twilight Domain ? 1:Eyes Of Night",' +
    '"features.Twilight Domain ? 1:Bonus Proficiencies (Twilight Domain)",' +
    '"features.Twilight Domain ? 1:Vigilant Blessing",' +
    '"features.Twilight Domain ? 2:Twilight Sanctuary",' +
    '"features.Twilight Domain ? 6:Steps Of Night",' +
    '"clericHasDivineStrike ? 8:Divine Strike",' +
    '"features.Twilight Domain ? 17:Twilight Shroud"',
  'Druid':
    '"2:Wild Companion",' +
    '"4:Cantrip Versatility",' +
    '"features.Circle Of Spores ? 2:Halo Of Spores",' +
    '"features.Circle Of Spores ? 2:Symbiotic Entity",' +
    '"features.Circle Of Spores ? 6:Fungal Infestation",' +
    '"features.Circle Of Spores ? 10:Spreading Spores",' +
    '"features.Circle Of Spores ? 14:Fungal Body",' +
    '"features.Circle Of Stars ? 2:Star Map",' +
    '"features.Circle Of Stars ? 2:Starry Form",' +
    '"features.Circle Of Stars ? 6:Cosmic Omen",' +
    '"features.Circle Of Stars ? 10:Twinkling Constellations",' +
    '"features.Circle Of Stars ? 14:Full Of Stars",' +
    '"features.Circle Of Wildfire ? 2:Summon Wildfire Spirit",' +
    '"features.Circle Of Wildfire ? 6:Enhanced Bond",' +
    '"features.Circle Of Wildfire ? 10:Cauterizing Flames",' +
    '"features.Circle Of Wildfire ? 14:Blazing Revival"',
  'Fighter':
    '"4:Martial Versatility",' +
    '"features.Psi Warrior ? 3:Psionic Power",' +
    '"features.Psi Warrior ? 3:Protective Field",' +
    '"features.Psi Warrior ? 3:Psionic Strike",' +
    '"features.Psi Warrior ? 3:Telekinetic Movement",' +
    '"features.Psi Warrior ? 7:Telekinetic Adept",' +
    '"features.Psi Warrior ? 10:Guarded Mind",' +
    '"features.Psi Warrior ? 15:Bulwark Of Force",' +
    '"features.Psi Warrior ? 18:Telekinetic Master",' +
    '"features.Rune Knight ? 3:Bonus Proficiencies (Rune Knight)",' +
    '"features.Rune Knight ? 3:Giant\'s Might",' +
    '"features.Rune Knight ? 3:Rune Carver",' +
    '"features.Rune Knight ? 7:Runic Shield",' +
    '"features.Rune Knight ? 10:Great Stature",' +
    '"features.Rune Knight ? 15:Master Of Runes",' +
    '"features.Rune Knight ? 18:Runic Juggernaut"',
  'Monk':
    '"2:Dedicated Weapon",' +
    '"3:Ki-Fueled Attack",' +
    '"4:Quickened Healing",' +
    '"5:Focused Aim",' +
    '"features.Way Of Mercy ? 3:Implements Of Mercy",' +
    '"features.Way Of Mercy ? 3:Hand Of Harm",' +
    '"features.Way Of Mercy ? 3:Hand Of Healing",' +
    '"features.Way Of Mercy ? 6:Physician\'s Touch",' +
    '"features.Way Of Mercy ? 11:Flurry Of Healing And Harm",' +
    '"features.Way Of Mercy ? 17:Hand Of Ultimate Mercy",' +
    '"features.Way Of The Astral Self ? 3:Arms Of The Astral Self",' +
    '"features.Way Of The Astral Self ? 6:Visage Of The Astral Self",' +
    '"features.Way Of The Astral Self ? 11:Body Of The Astral Self",' +
    '"features.Way Of The Astral Self ? 17:Awakened Astral Self"',
  'Paladin':
    '"3:Harness Divine Power",' +
    '"4:Martial Versatility",' +
    '"features.Oath Of Glory ? 3:Inspiring Smite",' +
    '"features.Oath Of Glory ? 3:Peerless Athlete",' +
    '"features.Oath Of Glory ? 7:Aura Of Alacrity",' +
    '"features.Oath Of Glory ? 15:Glorious Defense",' +
    '"features.Oath Of Glory ? 20:Living Legend",' +
    '"features.Oath Of The Watchers ? 3:Abjure The Extraplanar",' +
    '"features.Oath Of The Watchers ? 3:Watcher\'s Will",' +
    '"features.Oath Of The Watchers ? 7:Aura Of The Sentinel",' +
    '"features.Oath Of The Watchers ? 15:Vigilant Rebuke",' +
    '"features.Oath Of The Watchers ? 20:Mortal Bulwark"',
  'Ranger':
    '"1:Deft Explorer",' +
    '"1:Canny",' +
    '"1:Favored Foe",' +
    '"2:Spellcasting Focus",' +
    '"3:Primal Awareness",' +
    '"4:Martial Versatility",' +
    '"6:Roving",' +
    '"10:Nature\'s Veil",' +
    '"10:Tireless",' +
    '"features.Fey Wanderer ? 3:Dreadful Strikes",' +
    '"features.Fey Wanderer ? 3:Fey Wanderer Magic",' +
    '"features.Fey Wanderer ? 3:Otherworldly Glamour",' +
    '"features.Fey Wanderer ? 7:Beguiling Twist",' +
    '"features.Fey Wanderer ? 11:Fey Reinforcements",' +
    '"features.Fey Wanderer ? 15:Misty Wanderer",' +
    '"features.Swarmkeeper ? 3:Gathered Swarm",' +
    '"features.Swarmkeeper ? 3:Swarmkeeper Magic",' +
    '"features.Swarmkeeper ? 7:Writhing Tide",' +
    '"features.Swarmkeeper ? 11:Mighty Swarm",' +
    '"features.Swarmkeeper ? 15:Swarming Dispersal"',
  'Rogue':
    '"3:Steady Aim",' +
    '"features.Phantom ? 3:Whispers Of The Dead",' +
    '"features.Phantom ? 3:Wails From The Grave",' +
    '"features.Phantom ? 9:Tokens Of The Departed",' +
    '"features.Phantom ? 13:Ghost Walk",' +
    '"features.Phantom ? 17:Death\'s Friend",' +
    '"features.Soulknife ? 3:Psi-Bolstered Knack",' +
    '"features.Soulknife ? 3:Psionic Power",' +
    '"features.Soulknife ? 3:Psychic Blades",' +
    '"features.Soulknife ? 3:Psychic Whispers",' +
    '"features.Soulknife ? 9:Soul Blades",' +
    '"features.Soulknife ? 13:Psychic Veil",' +
    '"features.Soulknife ? 17:Rend Mind"',
  'Sorcerer':
    '"3:Magical Guidance",' +
    '"4:Sorcerous Versatility",' +
    '"features.Aberrant Mind ? 1:Psionic Spells",' +
    '"features.Aberrant Mind ? 1:Telepathic Speech",' +
    '"features.Aberrant Mind ? 6:Psionic Sorcery",' +
    '"features.Aberrant Mind ? 6:Psychic Defenses",' +
    '"features.Aberrant Mind ? 14:Revelation In Flesh",' +
    '"features.Aberrant Mind ? 18:Warping Implosion",' +
    '"features.Clockwork Soul ? 1:Clockwork Magic",' +
    '"features.Clockwork Soul ? 1:Restore Balance",' +
    '"features.Clockwork Soul ? 6:Bastion Of Law",' +
    '"features.Clockwork Soul ? 14:Trance Of Order",' +
    '"features.Clockwork Soul ? 18:Clockwork Cavalcade"',
  'Warlock':
    '"4:Eldritch Versatility",' +
    '"features.The Fathomless ? 1:Tentacle Of The Deeps",' +
    '"features.The Fathomless ? 1:Gift Of The Sea",' +
    '"features.The Fathomless ? 6:Oceanic Soul",' +
    '"features.The Fathomless ? 6:Guardian Coil",' +
    '"features.The Fathomless ? 10:Grasping Tentacles",' +
    '"features.The Fathomless ? 14:Fathomless Plunge",' +
    '"features.The Genie ? 1:Genie\'s Vessel",' +
    '"features.The Genie ? 6:Elemental Gift",' +
    '"features.The Genie ? 10:Sanctuary Vessel",' +
    '"features.The Genie ? 14:Limited Wish"',
  'Wizard':
    '"3:Cantrip Formulas",' +
    '"features.Bladesinging ? 2:Training In War And Song",' +
    '"features.Bladesinging ? 2:Bladesong",' +
    '"features.Bladesinging ? 6:Extra Attack",' +
    '"features.Bladesinging ? 10:Song Of Defense",' +
    '"features.Bladesinging ? 14:Song Of Victory",' +
    '"features.Order Of Scribes ? 2:Wizardly Quill",' +
    '"features.Order Of Scribes ? 2:Awakened Spellbook",' +
    '"features.Order Of Scribes ? 6:Manifest Mind",' +
    '"features.Order Of Scribes ? 10:Master Scrivener",' +
    '"features.Order Of Scribes ? 14:One With The Word"'
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
    '"3:Ambush:Maneuver",' +
    '"3:Bait And Switch:Maneuver",' +
    '"3:Brace:Maneuver",' +
    '"3:Commanding Presence:Maneuver",' +
    '"3:Grappling Strike:Maneuver",' +
    '"3:Quick Toss:Maneuver",' +
    '"3:Tactical Assessment:Maneuver",' +
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
    'Type=General Require="features.Spellcasting || features.Pact Magic"',
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
  'Telekinetic':'Type=General',
  'Telepathic':'Type=General'
};
Tasha.FEATURES = {

  // Class
  'Ambush':
    'Section=combat,skill ' +
    'Note=' +
      '"May spend 1 Superiority Die to add roll to Initiative",' +
      '"May spend 1 Superiority Die to add roll to a Stealth check"',
  'Arcane Propulsion Armor':
    'Section=magic ' +
    'Note="Infused armor gives +5\' Speed and replaces missing limbs; range 20/60 magical gauntlets inflict 1d8 HP force and return"',
  'Armor Of Magical Strength':
    'Section=magic ' +
    'Note="Wearer of infused armor w/6 charges may spend 1 charge to gain +Intelligence Modifier Strength check or save or to use Reaction to avoid being knocked prone; armor regains 1d6 charges each dawn"',
  'Artificer Specialist':'Section=feature Note="1 selection"',
  'Bait And Switch':
    'Section=combat ' +
    'Note="May spend 1 Superiority Die to swap place w/an adjacent willing creature; choice of self or swapped creature adds rolled value to Armor Class for 1 rd"',
  'Bardic Versatility':
    'Section=feature ' +
    'Note="May replace a skill expertise or a cantrip when boosting an ability or taking a feat"',
  'Bond Of The Talisman':
    'Section=magic ' +
    'Note="Self or talisman wearer may teleport to the other %{proficiencyBonus}/long rest"',
  'Boots Of The Winding Path':
    'Section=magic ' +
    'Note="Wearer of infused boots may teleport back to a space w/in 15\'"',
  'Brace':
    'Section=combat ' +
    'Note="May spend 1 Superiority Die to use Reaction to attack a creature that moves into range and add roll to damage"',
  'Canny':
    'Section=skill,skill ' +
    'Note=' +
      '"Language (Choose 2 from any)",' +
      '"Dbl proficiency bonus (+%{proficiencyBonus}) on chosen skill"',
  'Cantrip Formulas':
    'Section=magic Note="May replace a W0 cantrip 1/long rest"',
  'Cantrip Versatility':
    'Section=feature ' +
    'Note="May replace a cantrip when boosting an ability or taking a feat"',
  'Circle Of Spores':
    'Spells=' +
      '"2:Chill Touch",' +
      '"3:Blindness/Deafness","3:Gentle Repose",' +
      '"5:Animate Dead","5:Gaseous Form",' +
      '7:Blight,7:Confusion,' +
      '9:Cloudkill,9:Contagion',
  'Circle Of Wildfire':
    'Spells=' +
      '"2:Burning Hands","2:Cure Wounds",' +
      '"3:Flaming Sphere","3:Scorching Ray",' +
      '"5:Plant Growth",5:Revivify,' +
      '"7:Aura Of Life","7:Fire Shield",' +
      '"9:Flame Strike","9:Mass Cure Wounds"',
  'Commanding Presence':
    'Section=skill ' +
    'Note="May spend 1 Superiority Die to add roll to an Intimidation, Performance, or Persuasion check"',
  'Dedicated Weapon':
    'Section=combat ' +
    'Note="May designate a non-heavy weapon as monk weapon 1/short rest"',
  'Deft Explorer':
    'Section=feature ' +
    'Note="Has Canny%{levels.Ranger<6?\' feature\':levels.Ranger<10?\' and Roving features\':\', Roving, and Tireless features\'}"',
  'Eldritch Mind':
    'Section=magic Note="Adv on Constitution saves to maintain concentration"',
  'Eldritch Versatility':
    'Section=feature ' +
    'Note="May replace a cantrip%{levels.Warlock<12?\' or Pact Boon option\':\', Pact Boon option, or Mystic Arcanum spell\'} when boosting an ability or taking a feat"',
  'Enhanced Arcane Focus':
    'Section=magic ' +
    'Note="Infused rod, staff, or wand gives +%{levels.Artificer<10?1:2} spell attacks that ignore half cover"',
  'Enhanced Defense':
    'Section=magic ' +
    'Note="Infused armor or shield gives +%{levels.Artificer<10?1:2} AC"',
  'Enhanced Weapon':
    'Section=magic ' +
    'Note="Infused weapon gives +%{levels.Artificer<10?1:2} attack and damage"',
  'Far Scribe':
    'Section=magic ' +
    'Note="May cast <i>Sending</i>, targeting one of %{proficiencyBonus} creatures who have written their names in the Book Of Shadows" ' +
    'Spells=' +
      'Sending',
  'Favored Foe':
    'Section=combat ' +
    'Note="May mark a successful attack target for conc up to 1 min %{proficiencyBonus}/long rest; first hit each rd on marked foe inflicts +1d%{levels.Ranger<6?4:levels.Ranger<14?6:8} HP weapon damage"',
  'Fighting Style (Blind Fighting)':
    'Section=combat Note="R10\' Knows locations of invisible creatures"',
  'Fighting Style (Blessed Warrior)':
    'Section=magic,magic ' +
    'Note=' +
      '"Knows 2 C0 cantrips",' +
      '"May replace a C0 cantrip each level"',
  'Fighting Style (Druidic Warrior)':
    'Section=magic,magic ' +
    'Note=' +
      '"Knows 2 D0 cantrips",' +
      '"May replace a D0 cantrip each level"',
  'Fighting Style (Interception)':
    'Section=combat ' +
    'Note="R5\' May use Reaction to negate 1d10+%{proficiencyBonus} HP damage to another"',
  'Fighting Style (Superior Technique)':
    'Section=combat Note="Has Combat Superiority feature (1 maneuver, 1 die)"',
  'Fighting Style (Thrown Weapon Fighting)':
    'Section=combat ' +
    'Note="May draw thrown weapon as part of an attack/+2 HP damage from thrown weapons"',
  'Fighting Style (Unarmed Fighting)':
    'Section=combat,combat ' +
    'Note=' +
      '"Unarmed hit inflicts 1d6+%{strengthModifier} HP bludgeoning",' +
      '"Unarmed hit inflicts 1d8+%{strengthModifier} bludgeoning when unarmed and shieldless or 1d4 HP to a grappled foe"',
  'Grappling Strike':
    'Section=combat ' +
    'Note="After a hit, may spend 1 Superiority Die to add roll to an Athletics grapple check"',
  'Flash Of Genius':
    'Section=feature ' +
    'Note="R30\' May use Reaction to give an ally +%{intelligenceModifier} on an ability check or save %{intelligenceModifier>?1}/long rest"',
  'Focused Aim':
    'Section=combat ' +
    'Note="May spend 1/2/3 Ki Points to add 2/4/6 to a failed attack roll"',
  'Gift Of The Protectors':
    'Section=magic ' +
    'Note="Creatures who have written their names in the Book Of Shadows retain 1 HP when reduced to 0 HP 1/long rest"',
  'Harness Divine Power':
     'Section=magic ' +
     'Note="May use Channel Divinity and a bonus action to regain a spell slot up to level %{(proficiencyBonus+1)//2} %{(!levels.Cleric?0:levels.Cleric<6?1:levels.Cleric<18?2:3)+(!levels.Paladin?0:levels.Paladin<7?1:levels.Paladin<15?2:3)}/long rest"',
  'Helm Of Awareness':
    'Section=magic ' +
    'Note="Infused helmet gives Adv on Initiative, and wearer cannot be surprised"',
  'Homunculus Servant':
    'Section=magic ' +
    'Note="May create a mechanical companion (AC 13; HP %{levels.Artificer+intelligenceModifier+1}; Attack R30\' +%{spellAttackModifier.A} inflicts 1d4+%{proficiencyBonus} HP force; Evasion; Channel Magic)"',
  'Infuse Item':
    'Section=feature,magic ' +
    'Note=' +
      '"%{(levels.Artificer+6)//4*2} selections",' +
      '"May infuse %{(levels.Artificer+6)//4+(featureNotes.armorModifications?2:0)} items simultaneously"',
  'Instinctive Pounce':
    'Section=combat Note="May move %{speed//2}\' when entering rage"',
  'Investment Of The Chain Master':
    'Section=magic ' +
    'Note="Familiar gains 40\' fly or swim Speed, gains magical attacks, and inflicts DC %{spellDifficultyClass.K} saves; self can use a bonus action to command familiar to attack and Reaction to give it resistance to damage"',
  'Ki-Fueled Attack':
    'Section=combat ' +
    'Note="Performing an action that spends a Ki Point allows using a bonus action to attack w/a monk weapon"',
  'Magic Item Adept':
    'Section=magic ' +
    'Note="May attune %{4+(magicNotes.magicItemMaster?2:magicNotes.magicItemSavant?1:0)} items simultaneously/May craft uncommon magic items in one quarter time at half cost"',
  'Magic Item Master':'Section=magic Note="May attune 6 items simultaneously"',
  'Magic Item Savant':
    'Section=magic,magic ' +
    'Note=' +
      '"May attune 5 items simultaneously",' +
      '"May ignore attunement and use requirements on attuned items"',
  'Magical Tinkering':
    'Section=magic ' +
    'Note="May imbue %{intelligenceModifier>?1} objects simultaneously with light, message, sound, odor, or picture"',
  'Martial Versatility':
    'Section=feature ' +
    'Note="May replace a Fighting Style or maneuver when boosting an ability or taking a feat"',
  'Magical Inspiration':
    'Section=magic ' +
    'Note="Bardic Inspiration die roll may be added to spell harm or healing"',
  'Mind Sharpener':
    'Section=magic ' +
    'Note="Infused armor or robes w/4 charges allows wearer to use Reaction and 1 charge to change a failed Constitution save for spell concentration to success; item regains 1d4 charges each dawn"',
  "Nature's Veil":
    'Section=magic ' +
    'Note="May use a bonus action to become invisible for 1 rd %{proficiencyBonus}/long rest"',
  'Pact Of The Talisman':
    'Section=feature ' +
    'Note="Talisman gives wearer +1d4 ability checks %{proficiencyBonus}/long rest"',
  'Primal Awareness':
    'Section=magic ' +
    'Note="May cast <i>Speak With Animals</i>%{levels.Ranger<5?\'\':\', <i>Beast Sense</i>\'}%{levels.Ranger<9?\'\':\', <i>Speak With Plants</i>\'}%{levels.Ranger<13?\'\':\', <i>Locate Creature</i>\'}%{levels.Ranger<17?\'\':\', <i>Commune With Nature</i>\'} 1/long rest" ' +
    'Spells=' +
      '"1:Speak With Animals",' +
       '"5:Beast Sense",' +
       '"9:Speak With Plants",' +
       '"13:Locate Creature",' +
       '"17:Commune With Nature"',
  'Primal Knowledge':
    'Section=skill ' +
    'Note="Skill Proficiency (Choose %V from Animal Handling, Athletics, Intimidation, Nature, Perception, Survival)"',
  'Protection Of The Talisman':
    'Section=magic ' +
    'Note="Talisman wearer may add +1d4 to a failed save %{proficiencyBonus}/long rest"',
  'Quick Toss':
    'Section=combat ' +
    'Note="May spend 1 Superiority Die for a bonus action to draw and throw a weapon and add roll to damage"',
  'Quickened Healing':
    'Section=combat ' +
    'Note="May spend 2 Ki Points to regain 1d%{combatNotes.martialArts}+%{proficiencyBonus} HP"',
  'Radiant Weapon':
    'Section=magic ' +
    'Note="Infused weapon w/4 charges gives +1 attack and damage and emits a 30\' bright light on command; wielder may use Reaction and 1 charge to blind a successful attacker (DC %{spellDifficultyClass.A} Constitution neg) for 1 rd; item regains 1d4 charges each dawn"',
  'Rebuke Of The Talisman':
    'Section=magic ' +
    'Note="R30\' When talisman wearer takes damage, may use Reaction to inflict %{proficiencyBonus} HP psychic and 10\' push on attacker"',
  'Repeating Shot':
    'Section=magic ' +
    'Note="Infused ammunition weapon gives +1 attack and damage and automatically creates its own ammunition"',
  'Replicate Magic Item':
    'Section=magic Note="Allows replication of a wondrous item"',
  'Repulsion Shield':
    'Section=magic ' +
    'Note="Infused shield w/4 charges gives +1 AC; holder may use Reaction and 1 charge to push a successful attacker 15\'; regains 1d4 charges each dawn"',
  'Resistant Armor':
    'Section=magic ' +
    'Note="Infused armor gives +1 AC and resistance to chosen damage type"',
  'Returning Weapon':
    'Section=magic ' +
    'Note="Infused thrown weapon gives +1 attack and damage and returns after being thrown"',
  'Roving':
    'Section=ability,ability ' +
    'Note=' +
      '"+5 Speed",' +
      '"%{speed}\' climb Speed/%{speed}\' swim Speed"',
  'Soul Of Artifice':
    'Section=combat,save ' +
    'Note=' +
      '"May use Reaction and end 1 infusion when reduced to 0 HP to retain 1 HP",' +
      '"+1 per attunement on saves"',
  'Spell-Refueling Ring':
    'Section=feature ' +
    'Note="Infused ring allows recovery of a level 3 spell 1/dy"',
  'Spell-Storing Item':
    'Section=feature ' +
    'Note="After a long rest, may store in an item an A1 or A2 spell that can be cast %{intelligenceModifier*2>?2} times"',
  'Spellcasting Focus':
    'Section=magic Note="May use a druidic focus for ranger spells"',
  'Tactical Assessment':
    'Section=skill ' +
    'Note="May spend 1 Superiority Die to add roll to a History, Insight, or Investigation check"',
  'The Right Tool For The Job':
    'Section=feature Note="May spend 1 hr to create a set of artisan\'s tools"',
  'Tireless':
    'Section=combat ' +
    'Note="May gain 1d8+%{wisdomModifier} temporary HP %{proficiencyBonus}/long rest/Short rest reduces exhaustion by 1"',
  'Tool Expertise':
    'Section=feature ' +
    'Note="Dbl proficiency bonus (+%{proficiencyBonus}) when using tools"',
  'Undying Servitude':
    'Section=magic ' +
    'Note="May cast <i>Animate Dead</i> 1/long rest" ' +
    'Spells=' +
      '"Animate Dead"',
  'Wild Companion':
    'Section=magic ' +
    'Note="May spend 1 Wild Shape use to cast <i>Find Familiar</i> to summon a fey spirit for %{levels.Druid//2} hr" ' +
    'Spells=' +
      '"Find Familiar"',

  // Feats
  'Artificer Initiate':
    'Section=magic,skill ' +
    'Note=' +
      '"Knows 1 A0 spell/May cast chosen A1 spell 1/long rest",' +
      '"Tool Proficiency (Choose 1 from any Artisan)"',
  'Chef':
    'Section=ability,feature,magic ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Constitution, Wisdom)",' +
      '"Tool Proficiency (Cook\'s Utensils)",' +
      '"Food prepared during a short rest restores +1d8 HP to %{proficiencyBonus+4} eaters; treats prepared during a long rest give %{proficiencyBonus} eaters %{proficiencyBonus} temporary HP"',
  'Crusher':
    'Section=ability,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Constitution, Strength)",' +
      '"May move foe 5\' w/a bludgeoning hit 1/rd; critical bludgeoning hit gives allies Adv on attacks for 1 rd"',
  'Eldritch Adept':
    'Section=magic,magic ' +
    'Note=' +
      '"Knows 1 Eldritch Invocation",' +
      '"May replace Eldritch Invocation when gaining a level"',
  'Fey Touched':
    'Section=ability,magic ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Charisma, Intelligence, Wisdom)",' +
      '"May cast <i>Misty Step</i> and chosen level 1 divination or enchantment spell 1/long rest" ' +
    'Spells=' +
      '"Misty Step"',
  'Fighting Initiate':
    'Section=feature,feature ' +
    'Note=' +
      '"Knows 1 Fighting Style",' +
      '"May replace a Fighting Style when boosting an ability or taking a feat"',
  'Gunner':
    'Section=ability,combat,feature ' +
    'Note=' +
      '"+1 Dexterity",' +
      '"Loading does not slow firearm attacks/Adjacent foe does not inflict Disadv on ranged attacks",' +
      '"Weapon Proficiency (Firearms)"',
  'Metamagic Adept':
    'Section=feature,feature ' +
    'Note=' +
      '"Knows 2 Metamagic options/Has 2 Sorcery Points",' +
      '"May replace a Metamagic option when boosting an ability or taking a feat"',
  'Piercer':
    'Section=ability,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Strength, Dexterity)",' +
      '"May reroll 1 piercing damage die 1/rd/Adds 1 die to piercing crit damage"',
  'Poisoner':
    'Section=combat,skill,skill ' +
    'Note=' +
      '"Attacks negate poison resistance/May coat a weapon w/poison lasting 1 min that inflicts 2d8 HP poison and poisoned condition (DC 14 Constitution neg) for 1 rd",' +
      '"Tool Proficiency (Poisoner\'s Kit)",' +
      '"1 hr process using Poisoner\'s Kit creates %{proficiencyBonus} poison doses"',
  'Shadow Touched':
    'Section=ability,magic ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Charisma, Intelligence, Wisdom)",' +
      '"May cast <i>Invisibility</i> and chosen level 1 illusion or necromancy spell 1/long rest" ' +
    'Spells=' +
      'Invisibility',
  'Skill Expert':
    'Section=ability,skill,skill ' +
    'Note=' +
      '"Ability Boost (Choose 1 from any)",' +
      '"Skill Proficiency (Choose 1 from any)",' +
      '"Dbl proficiency bonus (+%{proficiencyBonus}) in chosen skill"',
  'Slasher':
    'Section=ability,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Strength, Dexterity)",' +
      '"May inflict -10 Speed for 1 rd w/an attack that inflicts slashing damage/Slashing crit inflicts Disadv on foe attacks for 1 rd"',
  'Telekinetic':
    'Section=ability,combat,magic ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Charisma, Intelligence, Wisdom)",' +
      '"R30\' May use a bonus action to move target 5\' (DC %{8+proficiencyBonus} + ability modifier Strength neg)",' +
      '"Knows <i>Mage Hand</i> cantrip"',
  'Telepathic':
    'Section=ability,feature,magic ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Charisma, Intelligence, Wisdom)",' +
      '"R60\' May communicate telepathically",' +
      '"May cast <i>Detect Thoughts</i> (DC %{8+proficiencyBonus} + ability modifier Wisdom neg) 1/long rest"',

  // Paths
  'Abjure The Extraplanar':
    'Section=combat ' +
    'Note="R30\' May use Channel Divinity to turn aberrations, celestials, elementals, fey, and fiends for 1 min (DC %{spellDifficultyClass.P} Wisdom neg)"',
  'Alchemical Savant':
    'Section=magic ' +
    'Note="Spell cast using alchemical supplies gain +%{intelligenceModifier>?1} HP healing or acid, fire, necrotic, or poison damage"',
  'Alchemist':
    'Spells=' +
      '"3:Healing Word","3:Ray Of Sickness",' +
      '"5:Flaming Sphere","5:Melf\'s Acid Arrow",' +
      '"9:Gaseous Form","9:Mass Healing Word",' +
      '13:Blight,"13:Death Ward",' +
      '17:Cloudkill,"17:Raise Dead"',
  'Alchemist Tool Proficiency':
    'Section=feature Note="Tool Proficiency (Alchemist\'s Supplies)"',
  'Animating Performance':
    'Section=magic ' +
    'Note="R30\' May animate an obedient large object (AC 16, HP %{levels.Bard*5+10} MV/Fly 30\', Attack +%{spellAttackModifier.B} inflicts 1d10+%{proficiencyBonus}, Irrepressible Dance R10\' inflicts -10\' or +10\' Speed) for 1 hr 1/long rest (may spend a level 3 spell slot for additional)"',
  'Arcane Armor':
    'Section=combat ' +
    'Note="Self armor has no Strength requirement, covers entire body, replaces missing limbs, and can be put on or taken off in 1 action"',
  'Arcane Firearm':
    'Section=magic ' +
    'Note="Spells cast through a prepared wand, staff, or rod inflict +1d8 HP damage"',
  'Arcane Jolt':
    'Section=combat ' +
    'Note="Magic weapon or Steel Defender attack inflicts +%{2+(combatNotes.improvedDefender?2:0)}d6 HP force or heals %{2+(combatNotes.improvedDefender?2:0)}d6 HP to 1 target in a 30\' radius %{intelligenceModifier>?1}/long rest"',
  'Armor Model':'Section=feature Note="1 selection"',
  'Armor Modifications':
    'Section=feature,magic ' +
    'Note=' +
      '"+2 Infused Items",' +
      '"May apply 4 infusions to armor pieces"',
  'Armorer':
    'Spells=' +
      '"3:Magic Missile",3:Thunderwave,' +
      '"5:Mirror Image",5:Shatter,' +
      '"9:Hypnotic Pattern","9:Lightning Bolt",' +
      '"13:Fire Shield","13:Greater Invisibility",' +
      '17:Passwall,"17:Wall Of Force"',
  'Arms Of The Astral Self':
    'Section=ability,combat ' +
    'Note=' +
      '"May spend 1 Ki Point and use a bonus action to gain +%{wisdomModifier-strengthModifier} on Strength checks for 10 min",' +
      '"May spend 1 Ki and use a bonus action to inflict 2d%{combatNotes.martialArts} HP force (DC %{kiSaveDC} Dexterity neg) to targets in a 10\' radius; self gains +5\' unarmed reach, +%{wisdomModifier-maxDexOrStrMod} unarmed attack, and +%{wisdomModifier-maxDexOrStrMod} HP force unarmed damage for 10 min"',
  'Artillerist':
    'Spells=' +
      '3:Shield,3:Thunderwave,' +
      '"5:Scorching Ray",5:Shatter,' +
      '9:Fireball,"9:Wind Wall",' +
      '"13:Ice Storm","13:Wall Of Fire",' +
      '"17:Cone Of Cold","17:Wall Of Force"',
  'Artillerist Tool Proficiency':
    'Section=feature Note="Tool Proficiency (Woodcarver\'s Tools)"',
  'Aura Of Alacrity':
    'Section=ability,magic ' +
    'Note="+10 Speed","R%{levels.Paladin<18?5:10}\' Allies gain +10\' Speed for 1 rd"',
  'Aura Of The Sentinel':
    'Section=combat,combat ' +
    'Note=' +
      '"+%{proficiencyBonus} Initiative",' +
      '"R%{levels.Paladin<18?10:30}\' Targets gain +%{proficiencyBonus} Initiative"',
  'Awakened Astral Self':
    'Section=combat ' +
    'Note="May spend 5 Ki Points and use a bonus action to gain +2 Armor Class and a third Arms Of The Astral Self attack each rd"',
  'Awakened Spellbook':
    'Section=magic ' +
    'Note="May perform a ritual casting in normal casting time 1/long rest, use spellbook as a focus, and change spell damage type"',
  'Balm Of Peace':
    'Section=magic ' +
    'Note="May use Channel Divinity to move %{speed}\' w/out provoking an OA, restoring 2d6+%{wisdomModifier} HP to each target w/in 5\'"',
  'Bastion Of Law':
    'Section=magic ' +
    'Note="R30\' May spend 1 - 5 Sorcery Points to absorb an equal number of d8s HP damage to target until next use or long rest"',
  'Battle Ready':
    'Section=combat,feature ' +
    'Note=' +
      '"+%{intelligenceModifier-strengthModifier} (Intelligence instead of Strength) or +%{intelligenceModifier-dexterityModifier} (Intelligence instead of Dexterity) attack and damage w/magic weapons",' +
      '"Weapon Proficiency (Martial)"',
  'Battle Smith':
    'Spells=' +
      '3:Heroism,3:Shield,' +
      '"5:Branding Smite","5:Warding Bond",' +
      '"9:Aura Of Vitality","9:Conjure Barrage",' +
      '"13:Aura Of Purity","13:Fire Shield",' +
      '"17:Banishing Smite","17:Mass Cure Wounds"',
  'Battle Smith Tool Proficiency':
    'Section=feature Note="Tool Proficiency (Smith\'s Tools)"',
  'Beguiling Twist':
    'Section=combat,save ' +
    'Note=' +
      '"R120\' May use Reaction to redirect a saved charm or fright effect to a different target for 1 min (DC %{spellDifficultyClass.R} Wisdom ends)",' +
      '"Adv on saves vs. charm and fright"',
  'Bestial Soul':
    'Section=ability,combat ' +
    'Note=' +
      '"Until next rest, may gain choice of: %{speed}\' swim Speed and water breathing; %{speed}\' climb Speed and ability to climb difficult surfaces; add Athletics roll to jump distances",' +
      '"Natural weapons count as magic"',
  'Bladesong':
    'Section=ability,combat,feature,magic,skill ' +
    'Note=' +
      '"+10 Speed in light or no armor and no shield during Bladesong",' +
      '"+%{intelligenceModifier>?1} AC in light or no armor and no shield during Bladesong",' +
      '"May use a bonus action to gain Bladesong features for 1 min 2/short rest",' +
      '"+%{intelligenceModifier>?1} Constitution to retain spell concentration in light or no armor and no shield during Bladesong",' +
      '"Adv on Acrobatics in light or no armor and no shield during Bladesong"',
  'Blazing Revival':
    'Section=magic ' +
    'Note="R120\' May extinguish Wildfire Spirit to regain %{hitPoints//2} HP when reduced to 0 HP 1/long rest"',
  'Blessed Strikes':
    'Section=combat ' +
    'Note="May inflict +1d8 radiant w/a cantrip or a weapon hit 1/rd"',
  'Body Of The Astral Self':
    'Section=combat ' +
    'Note="While using both Arms and Visage Of The Astral Self, may use Reaction to negate 1d10+%{wisdomModifier} HP acid, cold, fire, force, lightning, or thunder damage and may inflict +1d%{combatNotes.martialArts} HP damage w/Arms Of The Astral Self 1/rd"',
  'Bolstering Magic':
    'Section=magic ' +
    'Note="Touch gives choice of +1d3 attacks and ability checks for 10 min or recovery of level 1d3 spell slot %{proficiencyBonus}/long rest"',
  'Bonus Proficiencies (Order Domain)':
    'Section=combat,skill ' +
    'Note=' +
      '"Armor Proficiency (Heavy)",' +
      '"Skill Proficiency (Choose 1 from Intimidation, Persuasion)"',
  'Bonus Proficiencies (Rune Knight)':
    'Section=skill Note="Tool Proficiency (Smith\'s Tools)/Language (Giant)"',
  'Bonus Proficiencies (Twilight Domain)':
    'Section=combat ' +
    'Note="Armor Proficiency (Heavy)/Weapon Proficiency (Martial)"',
  'Bulwark Of Force':
    'Section=combat ' +
    'Note="R30\' May use a bonus action to give %{intelligenceModifier} targets half cover for 1 min 1/long rest (may spend a Psionic Energy die for additional)"',
  'Call The Hunt':
    'Section=combat ' +
    'Note="R30\' During rage, may give %{constitutionModifier>?1} willing targets +1d6 HP damage 1/rd and self 5 temporary HP per target %{proficiencyBonus}/long rest"',
  'Cauterizing Flames':
    'Section=magic ' +
    'Note="R30\' May create a spectral flame for 1 min upon a creature death and use it to heal 2d10+%{wisdomModifier} HP or inflict 2d10+%{wisdomModifier} HP fire on another in the same space %{proficiencyBonus}/long rest"',
  'Chemical Mastery':
    'Section=magic,save ' +
    'Note=' +
      '"May use alchemist\'s supplies to cast <i>Greater Restoration</i> and <i>Heal</i> 1/long rest",' +
      '"Resistance to acid and poison damage/Immune to poisoned condition" ' +
    'Spells=' +
      '"Greater Restoration",Heal',
  'Clockwork Cavalcade':
    'Section=magic ' +
    'Note="30\' cu restores 100 HP total among targets, repairs damaged objects, and dispels target spells up to 6th level 1/long rest (may spend 7 Sorcery Points for additional)"',
  'Clockwork Magic':
    'Section=feature ' +
    'Note="Displays physical manifestation of Clockwork Soul" ' +
    'Spells=' +
      '1:Alarm,"1:Protection From Evil And Good",' +
      '3:Aid,"3:Lesser Restoration",' +
      '"5:Dispel Magic","5:Protection From Energy",' +
      '"7:Freedom Of Movement","7:Summon Construct",' +
      '"9:Greater Restoration","9:Wall Of Force"',
  'Cloud Rune':
    'Section=combat,skill ' +
    'Note=' +
      '"R30\' May use Reaction to redirect damage to a different target %{combatNotes.masterOfRunes?2:1}/short rest",' +
      '"Adv on Sleight Of Hand and Deception"',
  'Controlled Surge':
    'Section=magic Note="May choose from 2 effects when triggering Wild Magic"',
  'Cosmic Omen':
    'Section=magic ' +
    'Note="R30\' May use Reaction to give +1d6 or inflict -1d6 on an attack, ability, or save %{proficiencyBonus}/long rest"',
  'Creative Crescendo':
    'Section=magic ' +
    'Note="May use Performance Of Creation to create %{(charismaModifier-1)>?1} additional small object%{charismaModifier>2?\'s\':\'\'}"',
  'Dampening Field':'Section=skill Note="Adv on Stealth"',
  "Death's Friend":
    'Section=combat,feature ' +
    'Note=' +
      '"Sneak Attack target affected by Wails From The Grave use",' +
      '"Has a minimum of 1 Soul Trinket available after a long rest"',
  'Defensive Field':
    'Section=combat ' +
    'Note="May use a bonus action to gain %{level} temporary HP %{proficiencyBonus}/long rest"',
  'Dreadful Strikes':
    'Section=combat ' +
    'Note="May inflict +1d%{levels.Ranger<11?4:6} HP psychic w/a weapon 1/rd"',
  'Eldritch Cannon':
    'Section=combat ' +
    'Note="May create a magical cannon (AC 18, %{levels.Artificer*5} HP (<i>Mending</i> repairs 2d6 HP), MV 15\') flamethrower (15\' cone inflicts %{2+(combatNotes.explosiveCannon?1:0)}d8 HP fire (DC %{spellDifficultyClass.A} Dexterity half)), force ballista (R120\' inflicts %{2+(combatNotes.explosiveCannon?1:0)}d8 force and pushes 5\'), or protector (R10\' targets gain 1d8+%{intelligenceModifier>?1} temporary HP) for 1 hr 1/long rest (may spend a spell slot for additional)"',
  'Elemental Gift':
    'Section=ability,save ' +
    'Note=' +
      '"May use a bonus action to gain 30\' fly Speed for 10 min %{proficiencyBonus}/long rest",' +
      '"Resistance to %{genieEnergy} damage"',
  'Embodiment Of The Law':
    'Section=magic ' +
    'Note="May cast enchantment spells as a bonus action %{wisdomModifier>?1}/long rest"',
  'Emboldening Bond':
    'Section=magic ' +
    'Note="R30\' May give %{proficiencyBonus} willing targets +1d4 on an attack, ability, or save 1/rd when w/in 30\' of each other for 10 min %{proficiencyBonus}/long rest"',
  'Expansive Bond':
    'Section=magic ' +
    'Note="Protective Bond works at 60\' and gives resistance to damage"',
  'Enhanced Bond':
    'Section=magic ' +
    'Note="Fire spells inflict +1d8 HP fire and healing spells restore +1d8 HP/May cast through Wildfire Spirit"',
  'Experimental Elixir':
    'Section=magic ' +
    'Note="May use alchemist\'s supplies after a long rest to create %{(levels.Artificer+12)//9} elixirs of healing, swiftness, resilience, boldness, flight, or transformation; may spend spell slots to create additional elixirs"',
  'Explosive Cannon':
    'Section=combat,combat ' +
    'Note=' +
      '"Eldritch Cannon inflicts +1d8 HP damage",' +
      '"R60\' May destroy eldritch cannon to inflict 3d8 HP force (DC %{spellDifficultyClass.A} Dexterity half) in a 20\' radius"',
  'Eyes Of Night':
    'Section=feature ' +
    'Note="R300\' Darkvision can be shared w/%{wisdomModifier>?1} others w/in 10\' for 1 hr 1/long rest (may spend a spell slot for additional)"',
  'Fathomless Plunge':
    'Section=magic ' +
    'Note="R30\' May teleport self and 5 willing targets 1 mile to a known body of water 1/short rest"',
  'Fey Reinforcements':
    'Section=magic ' +
    'Note="May cast <i>Summon Fey</i> 1/long rest, optionally for 1 min instead of conc, 1/long rest" ' +
    'Spells=' +
      '"Summon Fey"',
  'Fey Wanderer Magic':
    'Section=magic ' +
    'Note="May cast <i>Charm Person</i>%{levels.Ranger<5?\'\':\', <i>Misty Step</i>\'}%{levels.Ranger<9?\'\':\', <i>Dispel Magic</i>\'}%{levels.Ranger<13?\'\':\', <i>Dimension Door</i>\'}%{levels.Ranger<17?\'\':\', <i>Mislead</i>\'} 1/long rest/Fey association shows minor physical effect" ' +
    'Spells=' +
      '"3:Charm Person",' +
      '"5:Misty Step",' +
      '"9:Dispel Magic",' +
      '"13:Dimension Door",' +
      '"17:Mislead"',
  'Fire Rune':
    'Section=combat,skill ' +
    'Note=' +
      '"Hit restrains and inflicts +2d6 HP fire/rd (DC %{8+proficiencyBonus+constitutionModifier} Strength ends) for 1 min %{1+(combatNotes.masterOfRunes?1:0)}/short rest",' +
      '"Dbl proficiency bonus (+%{proficiencyBonus}) when using tools"',
  'Flurry Of Healing And Harm':
    'Section=combat ' +
    'Note="May substitute Hand Of Healing for each Flurry Of Blows strike/May add Hand Of Harm to one Flurry Of Blows strike"',
  'Form Of The Beast':
    'Section=combat ' +
    'Note="During rage, may use bite (inflicts 1d8+%{strengthModifier} HP piercing; hit restores %{proficiencyBonus} HP to self if below %{hitPoints//2} 1/rd), claws (inflict 1d6+%{strengthModifier} HP slashing each; may make an additional attack 1/rd), or tail (+5\' reach inflicts 1d8+%{strengthModifier} HP slashing; may use Reaction when hit by foe w/in 10\' for +1d8 Armor Class)"',
  'Fortified Position':
    'Section=combat ' +
    'Note=' +
      '"May have 2 Eldritch Cannons simultaneously/Eldritch Cannon gives allies half cover in 10\' radius"',
  'Frost Rune':
    'Section=ability,save,skill ' +
    'Note=' +
      '"May use a bonus action to gain +2 on Strength and Constitution checks for 10 min 1/short rest",' +
      '"Adv on Animal Handling and Intimidation",' +
      '"May use a bonus action to gain +2 on Strength and Constitution saves for 10 min 1/short rest"',
  'Full Of Stars':
    'Section=save ' +
    'Note="Starry Form gives resistance to bludgeoning, piercing, and slashing damage"',
  'Fungal Body':
    'Section=combat,save ' +
    'Note=' +
      '"Immune to critical hits",' +
      '"Immune to blinded, deafened, frightened, and poisoned conditions"',
  'Fungal Infestation':
    'Section=magic ' +
    'Note="R10\' May use Reaction to animate a creature upon death into an obedient 1 HP zombie for 1 hr %{wisdomModifier>?1}/long rest"',
  'Gathered Swarm':
    'Section=combat ' +
    'Note="After a hit, may have companion swarm move self 5\', move foe 15\' (DC %{spellDifficultyClass.R} Strength neg), or inflict 1d%{combatNotes.mightySwarm?8:6} HP piercing"',
  "Genie's Vessel":
    'Section=magic ' +
    'Note="May retreat into vessel (AC %{spellDifficultyClass.K}; HP %{levels.Warlock+proficiencyBonus}) for %{proficiencyBonus*2} hr 1/long rest/May inflict +%{proficiencyBonus} HP %{genieEnergy} 1/rd"',
  'Ghost Walk':
    'Section=feature ' +
    'Note="May use a bonus action to gain 10\' fly Speed, Disadv on foe attacks, and movement through objects for 10 min 1/long rest (may destroy a Soul Trinket for additional)"',
  "Giant's Might":
    'Section=ability,combat,feature,save ' +
    'Note=' +
      '"May gain Adv on Strength checks for 1 min %{proficiencyBonus}/long rest",' +
      '"May inflict +1d%{combatNotes.runicJuggernaut?10:combatNotes.greatStaure?8:6} HP damage w/a weapon or unarmed strike 1/rd for 1 min %{proficiencyBonus}/long rest",' +
      '"May grow to %{combatNotes.runicJuggernaut?\'Huge\':\'Large\'} for 1 min %{proficiencyBonus}/long rest",' +
      '"May gain Adv on Strength saves for 1 min %{proficiencyBonus}/long rest"',
  'Gift Of The Sea':'Section=ability Note="40\' swim Speed/May breathe water"',
  'Glorious Defense':
    'Section=combat ' +
    'Note="R10\' May use Reaction to give hit target +%{charismaModifier>?1} Armor Class and, if this causes attacker to miss, to attack attacker %{charismaModifier>?1}/long rest"',
  'Grasping Tentacles':
    'Section=magic ' +
    'Note="May cast <i>Evard\'s Black Tentacles</i> w/unbreakable concentration and gain %{levels.Warlock} temporary HP 1/long rest" ' +
    'Spells=' +
      '"Evard\'s Black Tentacles"',
  'Great Stature':
    'Section=combat,feature ' +
    'Note=' +
      '"Giant\'s Might inflicts +1d8 HP weapon damage",' +
      '"Height increased 3d4\\""',
  'Guarded Mind':
    'Section=save ' +
    'Note="Resistance to psychic damage/May spend 1 Psionic Energy die to end charmed and frightened conditions"',
  'Guardian Coil':
    'Section=magic ' +
    'Note="May use Reaction to reduce damage w/in 10\' of Tentacle Of The Deeps by %{levels.Warlock<10?1:2}d8"',
  'Halo Of Spores':
    'Section=combat ' +
    'Note="R10\' May use Reaction to inflict 1d%{levels.Druid<6?4:levels.Druid<10?6:levels.Druid<14?8:10} HP necrotic on target (DC %{spellDifficultyClass.D} Constitution neg)"',
  'Hand Of Harm':
    'Section=combat ' +
    'Note="May spend 1 Ki Point to inflict +1d%{combatNotes.martialArts}+%{wisdomModifier} HP necrotic w/unarmed strike 1/rd"',
  'Hand Of Healing':
    'Section=combat ' +
    'Note="May spend 1 Ki Point or forego 1 Flurry Of Blows strike to use touch to restore 1d%{combatNotes.martialArts}+%{wisdomModifier} HP"',
  'Hand Of Ultimate Mercy':
    'Section=magic ' +
    'Note="May spend 5 Ki Points to revive a day-old corpse 1/long rest, restoring 4d10+%{wisdomModifier} HP and removing conditions"',
  'Hill Rune':
    'Section=save ' +
    'Note="Adv vs. poison and resistance to poison damage; may use a bonus action to gain resistance to bludgeoning, piercing, and slashing for 1 min %{1+(combatNotes.masterOfRunes?1:0)}/short rest"',
  'Homing Strikes':
    'Section=combat ' +
    'Note="May add 1d%{featureNotes.psionicPower} to a failed Psychic Blade attack; spend 1 Psionic Energy die if the sum is enough to hit"',
  'Implement Of Peace':
    'Section=skill ' +
    'Note="Skill Proficiency (Choose 1 from Insight, Performance, Persuasion)"',
  'Implements Of Mercy':
    'Section=feature,skill ' +
    'Note=' +
      '"Owns a mask associated w/the Way Of Mercy",' +
      '"Skill Proficiency (Insight/Medicine)/Tool Proficiency (Herbalism Kit)"',
  'Improved Defender':
    'Section=combat,combat ' +
    'Note=' +
      '"+2d6 Arcane Jolt effect/Steel Defender gains +2 Armor Class",' +
      '"Steel Defender Deflect Attack inflicts 1d4+%{intelligenceModifier} HP force"',
  'Infectious Fury':
    'Section=combat ' +
    'Note="Hit w/a natural weapon may inflict choice of redirected attack or +2d12 HP psychic (DC %{8+constitutionModifier+proficiencyBonus} Wisdom neg) %{proficiencyBonus}/long rest"',
  'Infectious Inspiration':
    'Section=magic ' +
    'Note="R60\' May use Reaction after a successful Bardic Inspiration use to grant an extra die to a different target %{charismaModifier>?1}/long rest"',
  'Inspiring Smite':
    'Section=combat ' +
    'Note="R30\' May use Channel Divinity after a Divine Smite to distribute 2d8+%{levels.Paladin} temporary HP"',
  'Lightning Launcher':
    'Section=combat ' +
    'Note="Range 90/300 attack inflicts 1d6 HP lightning, +1d6 HP lightning 1/rd"',
  'Limited Wish':
    'Section=magic Note="May gain the effects of a 6th level spell 1/1d4 long rests"',
  'Living Legend':
    'Section=ability,combat,save ' +
    'Note=' +
      '"May gain Adv on Charisma for 1 min 1/long rest (may spend a level 5 spell slot for additional)",' +
      '"May change a miss into a hit 1/rd for 1 min 1/long rest (may spend a level 5 spell slot for additional)",' +
      '"May use Reaction to reroll failed saves for 1 min 1/long rest (may spend a level 5 spell slot for additional)"',
  'Magic Awareness':
    'Section=magic ' +
    'Note="R60\' May detect presence and schools of spells and magic items for 1 rd %{proficiencyBonus}/long rest"',
  'Magical Guidance':
    'Section=ability ' +
    'Note="May spend 1 Sorcery Point to reroll a failed ability check"',
  'Manifest Mind':
    'Section=magic ' +
    'Note="R300\' May use a bonus action to see w/darkvision, hear, and cast spells %{proficiencyBonus} times through a ghostly object that emits 10\' dim light and moves 30\'/rd 1/long rest (may spend a spell slot for additional)"',
  'Master Of Runes':
    'Section=combat Note="May invoke runes 2/short rest"',
  'Master Scrivener':
    'Section=magic ' +
    'Note="R5\' After a long rest, may create an enhanced 1st or 2nd level spell scroll from Awakened Spellbook"',
  'Mighty Swarm':
    'Section=combat,combat ' +
    'Note=' +
      '"Gathered Swarm inflicts 1d8",' +
      '"Gathered Swarm gives half cover when moving self or knocks prone when moving foe"',
  'Misty Wanderer':
    'Section=magic ' +
    'Note="May cast <i>Misty Step</i> targeting self and 1 willing adjacent target %{wisdomModifier>?1}/long rest" ' +
    'Spells=' +
      '"Misty Step"',
  'Mortal Bulwark':
    'Section=combat,feature ' +
    'Note=' +
      '"May gain Adv on attacks vs. aberrations, celestials, elementals, fey, and fiends and to inflict banishment w/a successful attack (DC %{spellDifficultyClass.P} Charisma neg) for 1 min 1/long rest (may spend a level 5 spell slot for additional)",' +
      '"May gain 120\' truesight for 1 min 1/long rest (may spend a level 5 spell slot for additional)"',
  'Mote Of Potential':
    'Section=magic ' +
    'Note="Bardic Inspiration gives die rolled w/Adv on an ability check, inflicts R5\' die roll HP thunder (DC %{spellDifficultyClass.B} Constitution neg) on an attack, and gives roll + %{charismaModifier} temporary HP on a save"',
  'Oath Of Glory':
    'Spells=' +
      '"3:Guiding Bolt",3:Heroism,' +
      '"5:Enhance Ability","5:Magic Weapon",' +
      '9:Haste,"9:Protection From Energy",' +
      '13:Compulsion,"13:Freedom Of Movement",' +
      '17:Commune,"17:Flame Strike"',
  'Oath Of The Watchers':
    'Spells=' +
      '3:Alarm,"3:Detect Magic",' +
      '5:Moonbeam,"5:See Invisibility",' +
      '9:Counterspell,9:Nondetection,' +
      '"13:Aura Of Purity",13:Banishment,' +
      '"17:Hold Monster",17:Scrying',
  'Oceanic Soul':
    'Section=feature,save ' +
    'Note=' +
      '"Understood by all creatures when speaking under water",' +
      '"Resistance to cold damage"',
  'One With The Word':
    'Section=combat,skill ' +
    'Note=' +
      '"May use Reaction to negate damage to self and erase 3d6 spell levels from Awakened Spellbook for 1d6 long rests 1/long rest",' +
      '"Adv on Arcana"',
  'Order Domain':
    'Spells=' +
      '1:Command,1:Heroism,' +
      '"3:Hold Person","3:Zone Of Truth",' +
      '"5:Mass Healing Word",5:Slow,' +
      '7:Compulsion,"7:Locate Creature",' +
      '9:Commune,"9:Dominate Person"',
  "Order's Demand":
    'Section=magic ' +
    'Note="R30\' May use Channel Divinity to charm targets (DC %{spellDifficultyClass.C} Wisdom neg; damage ends) for 1 rd"',
  "Order's Wrath":
    'Section=combat ' +
    'Note="May have next ally hit on a Divine Strike target inflict +2d8 psychic for 1 rd 1/rd"',
  'Otherworldly Glamour':
    'Section=ability,skill ' +
    'Note=' +
      '"+%{wisdomModifier>?1} Charisma checks",' +
      '"Skill Proficiency (Choose 1 from Deception, Performance, Persuasion)"',
  'Peace Domain':
    'Spells=' +
      '1:Heroism,1:Sanctuary,' +
      '3:Aid,"3:Warding Bond",' +
      '"5:Beacon Of Hope",5:Sending,' +
      '"7:Aura Of Purity","7:Otiluke\'s Resilient Sphere",' +
      '"9:Greater Restoration","7:Rary\'s Telepathic Bond"',
  'Peerless Athlete':
    'Section=ability,skill ' +
    'Note=' +
      '"May use Channel Divinity and a bonus action for dbl carry and lift for 10 min",' +
      '"May use Channel Divinity and a bonus action for Adv on Athletics and Acrobatics and +10\' high and long jumps for 10 min"',
  'Perfected Armor (Guardian Armor)':
    'Section=combat ' +
    'Note="R30\' May use Reaction to pull a creature up to 30\' (DC %{spellDifficultyClass.A} Strength neg) and attack if w/in 5\' afterward %{proficiencyBonus}/long rest"',
  'Perfected Armor (Infiltrator Armor)':
    'Section=combat ' +
    'Note="Lightning Launcher inflicts Disadv on attacks on self, and next attack on target gains Adv and inflicts +1d6 HP lightning, for 1 rd"',
  'Performance Of Creation':
    'Section=magic ' +
    'Note="R10\' May create a %{levels.Bard<6?\'medium\':levels.Bard<14?\'large\':\'huge\'} object worth %{levels.Bard*20} GP for %{proficiencyBonus} hr 1/long rest (may spend a level 2 spell slot for additional)"',
  "Physician's Touch":
    'Section=combat ' +
    'Note="May use Hand Of Healing to end disease or condition/May use Hand Of Harm to inflict poisoned for 1 rd"',
  'Powered Steps':'Section=ability Note="+5 Speed"',
  'Protective Bond':
    'Section=magic ' +
    'Note="Emboldening Bond member may use Reaction to teleport 30\' and take another\'s damage"',
  'Protective Field':
    'Section=combat ' +
    'Note="R30\' May spend 1 Psionic Energy die and use Reaction to negate 1d%{featureNotes.psionicPower}+%{intelligenceModifier>?1} HP damage"',
  'Psi-Bolstered Knack':
    'Section=skill ' +
    'Note="May spend 1 Psionic Energy die to add roll to a failed proficient skill or tool check"',
  'Psi-Powered Leap':
    'Section=ability ' +
    'Note="May use a bonus action to gain %{speed*2}\' fly Speed for 1 rd 1/short rest (may spend a Psionic Energy die for additional)"',
  'Psionic Power':
    'Section=feature ' +
    'Note="May use %{proficiencyBonus*2}d%V Psionic Energy dice/long rest; may use a bonus action to regain 1 Psionic Energy die 1/short rest"',
  'Psionic Sorcery':
    'Section=magic ' +
    'Note="May cast a spell using Sorcery Points equal to the spell level and no verbal or somatic components"',
  'Psionic Spells':
    'Section=magic ' +
    'Note="May replace Psionic Spells spell when gaining a Sorcerer level" ' +
    'Spells=' +
      '"1:Arms Of Hadar","1:Dissonant Whispers","1:Mind Sliver",' +
      '"3:Calm Emotions","3:Detect Thoughts",' +
      '"5:Hunger Of Hadar",5:Sending,' +
      '"7:Evard\'s Black Tentacles","7:Summon Aberration",' +
      '"9:Rary\'s Telepathic Bond",9:Telekinesis',
  'Psionic Strike':
    'Section=combat ' +
    'Note="R30\' May spend 1 Psionic Energy die after a hit to inflict +1d%{featureNotes.psionicPower}+%{intelligenceModifier} HP force"',
  'Psychic Blades':
    'Section=combat ' +
    'Note="May use free hand to attack w/a R60\' magic psychic blade, inflicting 1d6+%{strengthModifier>?dexterityModifier} HP psychic and 1d4+%{strengthModifier>?dexterityModifier} HP psychic; may use a bonus action for a second blade attack if both hands are free"',
  'Psychic Defenses':
    'Section=save ' +
    'Note="Resistance to psychic damage/Adv on saves vs. charm and fright"',
  'Psychic Teleportation':
    'Section=combat ' +
    'Note="May spend 1 Psionic Energy die and use a bonus action to teleport 1d%{featureNotes.psionicPower} x 10\'"',
  'Psychic Veil':
    'Section=magic ' +
    'Note="May become invisible for 1 hr (inflicting damage or forcing saving throw ends) 1/long rest (may spend a Psionic Energy die for additional)"',
  'Psychic Whispers':
    'Section=feature ' +
    'Note="May establish telepathic communication w/%{proficiencyBonus} visible creatures for 1d%{featureNotes.psionicPower} hr 1/long rest (may spend a Psionic Energy die for additional)"',
  'Rend Mind':
    'Section=combat ' +
    'Note="May inflict stunned w/Psychic Blade Sneak Attack for 1 min (DC %{8+dexterityModifier+proficiencyBonus} Wisdom ends) 1/long rest (may spend 3 Psionic Energy dice for additional)"',
  'Restorative Reagents':
    'Section=magic ' +
    'Note="May use alchemist\'s supplies to cast <i>Lesser Restoration</i> %{intelligenceModifier>?1}/long rest/Elixirs give 2d6+%{intelligenceModifier>?1} temporary HP" ' +
    'Spells="Lesser Restoration"',
  'Restore Balance':
    'Section=magic ' +
    'Note="R60\' May cancel target Adv or Disadv on a roll %{proficiencyBonus}/long rest"',
  'Revelation In Flesh':
    'Section=ability,feature ' +
    'Note=' +
      '"May spend 1 Sorcery Point and use a bonus action to gain %{speed}\' fly Speed, %{speed*2}\' swim Speed and water breathing, or ability to squeeze through 1 inch space for 10 min",' +
      '"May spend 1 Sorcery Point and use a bonus action to gain 60\' see invisible for 10 min"',
  'Rune Carver':
    'Section=feature,feature ' +
    'Note=' +
      '"%{levels.Fighter<7?2:levels.Fighter<10?3:levels.Fighter<15?4:5} selections",' +
      '"After a long rest, may apply 1 rune each to %{levels.Fighter<7?2:levels.Fighter<10?3:levels.Fighter<15?4:5} objects worn or held"',
  'Runic Juggernaut':
    'Section=combat,combat ' +
    'Note=' +
      '"Giant\'s Might increases size to Huge and inflicts +1d10 HP damage",' +
      '"Giant\'s Might extends reach by 5\'"',
  'Runic Shield':
    'Section=combat ' +
    'Note="R60\' May use Reaction when an ally is hit to force a reroll %{proficiencyBonus}/long rest"',
  'Sanctuary Vessel':
    'Section=magic ' +
    'Note="R30\' May take 5 willing into vessel; 10 min in vessel gives the benefits of a short rest and restores +%{proficiencyBonus} HP"',
  'Seeking Spell':
    'Section=magic ' +
    'Note="May spend 2 Sorcery Points to reroll a missed spell attack"',
  'Silver Tongue':
    'Section=skill Note="Minimum 10 on Deception and Persuasion rolls"',
  'Song Of Defense':
    'Section=magic ' +
    'Note="During Bladesong, may use Reaction and expend a spell slot to reduce damage to self by 5x slot level"',
  'Song Of Victory':
    'Section=combat ' +
    'Note="+%{intelligenceModifier>?1} HP melee weapon damage during Bladesong"',
  'Sorcerous Versatility':
    'Section=feature ' +
    'Note="May replace a Metamagic option or a cantrip when boosting an ability or taking a feat"',
  'Soul Blades':
    'Section=feature ' +
    'Note="Has Homing Strikes and Psychic Teleportation features"',
  'Spreading Spores':
    'Section=combat Note="May use a bonus action to move Halo Of Spores 30\'"',
  'Star Map':
    'Section=magic ' +
    'Note="Knows <i>Guidance</i> cantrip/May cast <i>Guiding Bolt</i> %{proficiencyBonus}/long rest" ' +
    'Spells=' +
      'Guidance,"Guiding Bolt"',
  'Starry Form':
    'Section=magic ' +
    'Note="May spend a Wild Shape use and use a bonus action to change into a constellation of an archer (R60\' may use a bonus action to make a ranged spell attack that inflicts %{magicNotes.twinklingConstellations?2:1}d8+%{wisdomModifier} HP radiant), a chalice (R30\' casting a healing spell restores %{magicNotes.twinklingConstellations?2:1}d8+%{wisdomModifier} to another), or a dragon (gains a minimum 10 on concentration rolls)"',
  'Steady Aim':
    'Section=combat ' +
    'Note="May use a bonus action and forego move to gain Adv on attack"',
  'Steel Defender':
    'Section=combat ' +
    'Note="May create a mechanical companion (AC %{15+(combatNotes.improvedDefender?2:0)}; HP %{levels.Artificer*5+intelligenceModifier+2} (<i>Mending</i> repairs 2d6 HP, self-repair 2d8+%{proficiencyBonus} HP 3/dy); Attack +%{spellAttackModifier.A} inflicts 1d8+%{proficiencyBonus} HP force; may use Reaction for R5\' inflict Disadv on attack; MV 40\'; Dexterity Save +%{proficiencyBonus+1}; Constitution Save +%{proficiencyBonus+2}; immune to poison and charmed, exhausted, poisoned, and surprised conditions)"',
  'Steps Of Night':
    'Section=ability ' +
    'Note="May use a bonus action to gain %{speed}\' fly Speed in dim or no light for 1 min %{proficiencyBonus}/long rest"',
  'Stone Rune':
    'Section=combat,feature,skill ' +
    'Note=' +
      '"R30\' May use Reaction to charm and halt target (DC %{8+proficiencyBonus+constitutionModifier} Wisdom ends) for 1 min %{1+(combatNotes.masterOfRunes?1:0)}/short rest",' +
      '"120\' Darkvision",' +
      '"Adv on Insight"',
  'Storm Rune':
    'Section=combat,skill ' +
    'Note=' +
      '"Immune to surprise; may use a bonus action and use Reaction to impose Adv or Disadv on rolls on a target w/in 60\' each rd for 1 min %{1+(combatNotes.masterOfRunes?1:0)}/short rest",' +
      '"Adv on Arcana"',
  'Summon Wildfire Spirit':
    'Section=magic ' +
    'Note="R30\' May spend 1 Wild Shape use to inflict 2d6 HP fire in a 10\' radius (DC %{spellDifficultyClass.D} Dexterity neg) and summon an obedient Wildfire Spirit (AC 13, HP %{levels.Druid*5+5}, MV/Fly 30\', Attack R60\' +%{spellAttackModifier.D} inflicts 1d6+%{proficiencyBonus} HP fire, Teleport targets in 5\' radius 15\', inflicting 1d6+%{proficiencyBonus} on those left behind (DC %{spellDifficultyClass.D} Dexterity neg)) for 1 hr"',
  'Swarmkeeper Magic':
    'Spells=' +
      '"3:Faerie Fire,Mage Hand",' +
      '"5:Web",' +
      '"9:Gaseous Form",' +
      '"13:Arcane Eye",' +
      '"17:Insect Plague"',
  'Swarming Dispersal':
    'Section=combat ' +
    'Note="When hit, may use Reaction to gain resistance and teleport 30\' %{proficiencyBonus}/long rest"',
  'Symbiotic Entity':
    'Section=combat ' +
    'Note="May expend 1 Wild Shape use to gain %{levels.Druid*4} temporary HP, dbl Halo Of Spores damage, and +1d6 HP necrotic on melee hits for 10 min or until temporary HP lost"',
  'Telekinetic Adept':
    'Section=feature ' +
    'Note="Has Psi-Powered Leap and Telekinetic Thrust features"',
  'Telekinetic Master':
    'Section=magic ' +
    'Note="May cast <i>Telekinesis</i> and use a bonus action to make a weapon attack 1/rd while concentrating 1/long rest (may spend a Psionic Energy die for additional)" ' +
    'Spells=' +
      'Telekinesis',
  'Telekinetic Movement':
    'Section=feature ' +
    'Note="R30\' May move a Large target 30\' 1/short rest (may spend a Psionic Energy die for additional)"',
  'Telekinetic Thrust':
    'Section=combat ' +
    'Note="May inflict knocked prone or 10\' push w/Psionic Strike (DC %{8+proficiencyBonus+intelligenceModifier} Strength neg)"',
  'Telepathic Speech':
    'Section=feature ' +
    'Note="R30\' May use a bonus action to gain telepathic communication w/target for %{levels.Sorcerer} min"',
  'Tentacle Of The Deeps':
    'Section=magic ' +
    'Note="R60\' May use a bonus action to summon a 10\' tentacle that moves 30\' and inflicts %{levels.Warlock<10?1:2}d8 HP cold and -10\' speed 2/rd for 1 min %{proficiencyBonus}/long rest"',
  'Thunder Gauntlets':
    'Section=combat ' +
    'Note="Each gauntlet inflicts 1d8 HP thunder and Disadv on attacks on others for 1 rd"',
  'Tokens Of The Departed':
    'Section=combat,feature,save ' +
    'Note=' +
      '"After a Sneak Attack hit, destroying a Soul Trinket gives an immediate Wails From The Grave use",' +
      '"May create %{proficiencyBonus} Soul Trinkets from creatures that die w/in 30\'/May destroy a Soul Trinket to gain an answer to a question",' +
      '"Adv on Constitution and saves vs. death while in possession of a Soul Trinket"',
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
    'Note=' +
      '"May use a bonus action to cancel Adv on attacks on self for 1 min 1/long rest (may spend 5 Sorcery Points for additional)",' +
      '"May use a bonus action to gain minimum 10 on attack, ability, and saving throws for 1 min 1/long rest (may spend 5 Sorcery Points for additional)"',
  'Transmuted Spell':
    'Section=magic ' +
    'Note="May spend 1 Sorcery Point to change a spell\'s damage type"',
  'Twilight Domain':
    'Spells=' +
      '"1:Faerie Fire",1:Sleep,' +
      '3:Moonbeam,"3:See Invisibility",' +
      '"5:Aura Of Vitality","5:Leomund\'s Tiny Hut",' +
      '"7:Aura Of Life","7:Greater Invisibility",' +
      '"9:Circle Of Power",9:Mislead',
  'Twilight Sanctuary':
    'Section=magic ' +
    'Note="May use Channel Divinity to create a 30\' radius for 1 min that gives targets choice of 1d6+%{levels.Cleric} temporary HP or an end to charmed or frightened"',
  'Twilight Shroud':'Section=magic Note="Twilight Sanctuary gives half cover"',
  'Twinkling Constellations':
    'Section=magic,magic ' +
    'Note=' +
      '"Increased Starry Form effects",' +
      '"Dragon Starry Form gives 20\' fly Speed/May switch between Starry Forms 1/rd"',
  'Unfailing Inspiration':
    'Section=magic ' +
    'Note="Bardic Inspiration target keeps die after a failed use"',
  'Universal Speech':
    'Section=magic ' +
    'Note="R60\' %{charismaModifier>?1} targets understand self for 1 hr 1/long rest (may spend a spell slot for additional)"',
  'Unsettling Words':
    'Section=magic ' +
    'Note="R60\' May spend 1 Bardic Inspiration die and use a bonus action to inflict -roll on target\'s next save for 1 rd"',
  'Unstable Backlash':
    'Section=magic ' +
    'Note="May use Reaction after taking damage or failing a save to trigger a Wild Magic effect"',
  'Vigilant Blessing':
    'Section=combat Note="Touch gives 1 creature Adv on next Initiative"',
  'Vigilant Rebuke':
    'Section=combat ' +
    'Note="R30\' May use Reaction to inflict 2d8+%{charismaModifier} HP force on attacker after a successful Charisma, Intelligence, or Wisdom save"',
  'Visage Of The Astral Self':
    'Section=feature,skill ' +
    'Note=' +
      '"May spend 1 Ki Point and use a bonus action to gain 120\' Darkvision, R600\' voice, and R60\' private voice for 10 min",' +
      '"May spend 1 Ki Point and use a bonus action to gain Adv on Insight and Intimidation for 10 min"',
  'Voice Of Authority':
    'Section=magic ' +
    'Note="Ally self spell target may use Reaction to make an attack"',
  'Wails From The Grave':
    'Section=combat ' +
    'Note="R30\' After a Sneak Attack hit, may inflict %{(levels.Rogue+1)//4}d6 HP necrotic on a second creature %{proficiencyBonus}/long rest"',
  'Warping Implosion':
    'Section=magic ' +
    'Note="May teleport 120\'; 30\' radius around starting position inflicts 3d10 HP and 30\' pull (Strength half HP only) 1/long rest (may spend 5 Sorcery Points for additional)"',
  "Watcher's Will":
    'Section=magic ' +
    'Note="R30\' May use Channel Divinity to give self and %{charismaModifier>?1} others Adv on Charisma, Intelligence, and Wisdom throws for 1 min"',
  'Whispers Of The Dead':
    'Section=skill Note="May gain proficiency in choice of skill 1/short rest"',
  'Wild Surge':
    'Section=magic ' +
    'Note="Triggers a DC %{8+proficiencyBonus+constitutionModifier} Wild Magic effect when entering rage"',
  'Wizardly Quill':
    'Section=magic ' +
    'Note="May use a bonus action to create a quill that produces multicolored, erasable writing and copies spells at 2 min/level"',
  'Writhing Tide':
    'Section=ability ' +
    'Note="May use a bonus action to gain 10\' fly Speed and hover for 1 min %{proficiencyBonus}/long rest"'

};
Tasha.SPELLS = {
  'Blade Of Disaster':
    'School=Conjuration ' +
    'Level=K9,S9,W9 ' +
    'Description="R60\' Self controls a blade that moves 30\' and attacks 2/rd, inflicting 4d12 HP force x3@18 each, for conc up to 1 min"',
  'Booming Blade':
    'School=Evocation ' +
    'Level=A0,K0,S0,W0 ' +
    'Description="Struck foe suffers %{(level+7)//6}d8 HP thunder on next move w/in 1 rd"',
  'Dream Of The Blue Veil':
    'School=Conjuration ' +
    'Level=B7,K7,S7,W7 ' +
    'Description="R20\' Self and 8 willing targets view another world for 6 hr, then teleport to it"',
  'Green-Flame Blade':
    'School=Evocation ' +
    'Level=A0,K0,S0,W0 ' +
    'Description="Struck foe suffers +%{(level+1)//6}d8 HP fire, and an adjacent target suffers %{(level+1)//6}d8+%{mdf} HP fire"',
  'Intellect Fortress':
    'School=Abjuration ' +
    'Level=A3,B3,K3,S3,W3 ' +
    'AtHigherLevels="affects +1 target" ' +
    'Description="R30\' Willing target gains resistance to psychic damage and Adv on Intelligence, Wisdom, and Charisma saves for conc up to 1 hr"',
  'Lightning Lure':
    'School=Evocation ' +
    'Level=A0,K0,S0,W0 ' +
    'Description="R15\' Pulls target 10\' and inflicts %{(level+5)//6}d8 HP lightning (Strength neg)"',
  'Mind Sliver':
    'School=Enchantment ' +
    'Level=K0,S0,W0 ' +
    'Description="R60\' Target suffers %{(level+7)//6}d6 HP psychic and -1d4 on next save w/in 1 rd (Intelligence neg)"',
  'Spirit Shroud':
    'School=Necromancy ' +
    'Level=C3,K3,P3,W3 ' +
    'AtHigherLevels="inflicts +1d8 HP/2 levels" ' +
    'Description="R10\' Self hits inflict +1d8 HP choice of radiant, necrotic, or cold, and 1 target/rd suffers -10\' Speed for 1 rd, for conc up to 1 min"',
  'Summon Aberration':
    'School=Conjuration ' +
    'Level=K4,W4 ' +
    'AtHigherLevels="increases summoned creature\'s AC, HP, number of attacks, and damage" ' +
    'Description="R90\' Summoned beholderkin, slaad, or star spawn aberrant spirit obeys self for conc up to 1 hr"',
  'Summon Beast':
    'School=Conjuration ' +
    'Level=D2,R2 ' +
    'AtHigherLevels="increases summoned creature\'s AC, HP, number of attacks, and damage" ' +
    'Description="R90\' Summoned air, land, or water bestial spirit obeys self for conc up to 1 hr"',
  'Summon Celestial':
    'School=Conjuration ' +
    'Level=C5,P5 ' +
    'AtHigherLevels="increases summoned creature\'s AC, HP, number of attacks, and damage" ' +
    'Description="R90\' Summoned avenger or defender celestial spirit obeys self for conc up to 1 hr"',
  'Summon Construct':
    'School=Conjuration ' +
    'Level=A4,W4 ' +
    'AtHigherLevels="increases summoned creature\'s AC, HP, number of attacks, and damage" ' +
    'Description="R90\' Summoned clay, metal, or stone construct spirit obeys self for conc up to 1 hr"',
  'Summon Elemental':
    'School=Conjuration ' +
    'Level=D4,"K4 [The Fathomless]",R4,W4 ' +
    'AtHigherLevels="increases summoned creature\'s AC, HP, number of attacks, and damage" ' +
    'Description="R90\' Summoned air, earth, fire, or water elemental spirit obeys self for conc up to 1 hr"',
  'Summon Fey':
    'School=Conjuration ' +
    'Level=D3,K3,R3,W3 ' +
    'AtHigherLevels="increases summoned creature\'s AC, HP, number of attacks, and damage" ' +
    'Description="R90\' Summoned fuming, mirthful, or tricksy fey spirit obeys self for conc up to 1 hr"',
  'Summon Fiend':
    'School=Conjuration ' +
    'Level=K6,W6 ' +
    'AtHigherLevels="increases summoned creature\'s AC, HP, number of attacks, and damage" ' +
    'Description="R90\' Summoned demon, devil, or yugoloth fiendish spirit obeys self for conc up to 1 hr"',
  'Summon Shadowspawn':
    'School=Conjuration ' +
    'Level=K3,W3 ' +
    'AtHigherLevels="increases summoned creature\'s AC, HP, number of attacks, and damage" ' +
    'Description="R90\' Summoned fury, despair, or fear shadow spirit obeys self for conc up to 1 hr"',
  'Summon Undead':
    'School=Necromancy ' +
    'Level=K3,W3 ' +
    'AtHigherLevels="increases summoned creature\'s AC, HP, number of attacks, and damage" ' +
    'Description="R90\' Summoned ghostly, putrid, or skeletal undead spirit obeys commands for conc up to 1 hr"',
  'Sword Burst':
    'School=Conjuration ' +
    'Level=K0,S0,W0 ' +
    'Description="5\' radius inflicts %{(level+7)//6}d6 HP force (Dexterity neg)"',
  "Tasha's Caustic Brew":
    'School=Evocation ' +
    'Level=A1,S1,W1 ' +
    'AtHigherLevels="inflicts +2d4 HP" ' +
    'Description="30\'x5\' line inflicts 2d4 HP/rd acid for conc up to 1 min (Dexterity neg; removal ends)"',
  "Tasha's Mind Whip":
    'School=Enchantment ' +
    'Level=S2,W2 ' +
    'AtHigherLevels="affects +1 target" ' +
    'Description="R90\' Target suffers 3d6 HP psychic, no Reaction, and a single action for 1 rd (Intelligence half HP only)"',
  "Tasha's Otherworldly Guise":
    'School=Transmutation ' +
    'Level=K6,S6,W6 ' +
    'Description="Self gains immunity to choice of fire damage, poison damage, and poisoned condition or radiant damage, necrotic damage, and charmed condition, 40\' fly Speed, +2 AC, and magical weapon attacks using spell attack in place of strength or dexterity 2/rd for conc up to 1 min"'
};
Tasha.SPELLS_LEVELS_ADDED = {
  'Acid Splash':'A0',
  'Aid':'A2,B2,R2',
  'Alarm':'A1',
  'Alter Self':'A2',
  'Animate Objects':'A5',
  'Antipathy/Sympathy':'B8',
  'Arcane Eye':'A4',
  'Arcane Lock':'A2',
  'Augury':'D2,W2',
  'Aura Of Life':'C4',
  'Aura Of Purity':'C4',
  'Aura Of Vitality':'C3,D3',
  "Bigby's Hand":'A5,"K5 [The Fathomless]",S5',
  'Blink':'A3',
  'Blur':'A2,"K2 [Marid]"',
  'Burning Hands':'"K1 [Efreeti]"',
  'Color Spray':'B1',
  'Command':'B1',
  'Cone Of Cold':'A5,D5,"K5 [The Fathomless]","K5 [Marid]"',
  'Continual Flame':'A2,D2',
  'Control Water':'"K4 [The Fathomless]","K4 [Marid]"',
  'Create Food And Water':'A3,"K3 [The Genie]"',
  'Create Or Destroy Water':'"K1 [The Fathomless]"',
  'Creation':'A5,"K5 [The Genie]"',
  'Cure Wounds':'A1',
  'Dancing Lights':'A0',
  'Darkvision':'A2',
  'Demiplane':'S8',
  'Detect Evil And Good':'"K1 [The Genie]"',
  'Detect Magic':'A1',
  'Disguise Self':'A1',
  'Dispel Magic':'A3',
  'Divination':'D4,W4',
  'Dominate Beast':'R4',
  'Elemental Weapon':'A3,D3,R3',
  'Enhance Ability':'A2,R2,W2',
  'Enlarge/Reduce':'A2,B2,D2',
  'Entangle':'R1',
  'Expeditious Retreat':'A1',
  'Fabricate':'A4',
  'Faerie Fire':'A1',
  'False Life':'A1',
  'Feather Fall':'A1',
  'Fire Bolt':'A0',
  'Fire Shield':'D4,"K4 [Efreeti]",S4',
  'Fireball':'A3,K3 [Efreeti]"',
  'Flame Blade':'S2',
  'Flame Strike':'"K5 [Efreeti]"',
  'Flaming Sphere':'S2',
  'Flesh To Stone':'D6,S6',
  'Fly':'A3',
  'Fog Cloud':'"K1 [Marid]"',
  'Freedom Of Movement':'A4',
  'Gate':'K9',
  'Gentle Repose':'P2',
  'Glyph Of Warding':'A3',
  'Grease':'A1,S1',
  'Greater Invisibility':'"K4 [Djinni]"',
  'Greater Restoration':'A5,R5',
  'Guidance':'A0',
  'Gust Of Wind':'"K2 [The Fathomless]","K2 [Djinni]",R2',
  'Haste':'A3',
  'Heat Metal':'A2',
  "Heroes' Feast":'B6',
  'Ice Storm':'A4',
  'Identify':'A1',
  'Incendiary Cloud':'D8',
  'Invisibility':'A2',
  'Jump':'A1',
  "Leomund's Secret Chest":'A4',
  'Lesser Restoration':'A2',
  'Levitate':'A2',
  'Light':'A0',
  'Lightning Bolt':'"K3 [The Fathomless]"',
  'Longstrider':'A1',
  'Mage Hand':'A0',
  'Magic Mouth':'A2',
  'Magic Weapon':'A2,R2,S2',
  'Mass Healing Word':'B3',
  'Meld Into Stone':'"K3 [Dao]",R3',
  'Mending':'A0',
  'Message':'A0',
  'Mirror Image':'B2',
  'Mislead':'K5',
  "Mordenkainen's Faithful Hound":'A4',
  "Mordenkainen's Private Sanctum":'A4',
  "Otiluke's Freezing Sphere":'S6',
  "Otiluke's Resilient Sphere":'A4',
  'Phantasmal Force':'"K2 [The Genie]"',
  'Phantasmal Killer':'B4,"K4 [The Genie]"',
  'Planar Binding':'K5',
  'Poison Spray':'A0',
  'Power Word Heal':'C9',
  'Prayer Of Healing':'P2',
  'Prestidigitation':'A0',
  'Prismatic Spray':'B7',
  'Prismatic Wall':'B9',
  'Protection From Evil And Good':'D1',
  'Protection From Energy':'A3',
  'Protection From Poison':'A2',
  'Purify Food And Drink':'A1',
  "Rary's Telepathic Bond":'B5',
  'Ray Of Frost':'A0',
  'Resistance':'A0',
  'Revivify':'A3,D3,R3',
  'Rope Trick':'A2',
  'Sanctuary':'A1,"K1 [Dao]"',
  'Scorching Ray':'A2,"K2 [Efreeti]"',
  'Searing Smite':'R1',
  'See Invisibility':'A2',
  'Seeming':'"K5 [Djinni]"',
  'Shocking Grasp':'A0',
  'Silence':'"K2 [The Fathomless]"',
  'Sleet Storm':'"K3 [The Fathomless]","K3 [Marid]"',
  'Slow':'B3',
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
  'Thunderwave':'"K1 [The Fathomless]","K1 [Djinni]"',
  'Vampiric Touch':'S3',
  'Wall Of Fire':'A4',
  'Wall Of Stone':'A5,"K5 [Dao]"',
  'Warding Bond':'P2',
  'Water Breathing':'A3',
  'Water Walk':'A3',
  'Web':'A2',
  'Weird':'K9',
  'Wish':'"K9 [The Genie]"',
  'Wind Wall':'A3,"K3 [Djinni]"'
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
  rules, classes, classFeatures, classSelectables, deitiesDomains
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
    Tasha.classRulesExtra(rules, c);
  }
  for(let c in classes) {
    rules.choiceRules(rules, 'Class', c, classes[c]);
    Tasha.classRulesExtra(rules, c);
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
Tasha.magicRules = function(rules, spells, spellsLevels) {
  SRD5E.magicRules(rules, {}, spells);
  for(let s in spellsLevels) {
    let defn = PHB5E.SPELLS[s] || (window.Xanathar ? Xanathar.SPELLS[s] : null);
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
  for(let f in feats) {
    Tasha.featRulesExtra(rules, f);
  }
};

/*
 * Defines in #rules# the rules associated with class #name# that cannot be
 * derived directly from the attributes passed to classRules.
 */
Tasha.classRulesExtra = function(rules, name) {

  let classLevel = 'levels.' + name;

  if(name == 'Artificer') {
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
  } else if(name == 'Barbarian') {
    rules.defineRule
      ('skillNotes.primalKnowledge', classLevel, '=', 'source<10 ? 1 : 2');
  } else if(name == 'Cleric') {
    rules.defineRule('clericHasDivineStrike',
      'features.Order Domain', '=', '1',
      'features.Twilight Domain', '=', '1'
    );
    rules.defineRule
      ('clericHasPotentSpellcasting', 'features.Order Domain', '=', '1');
    rules.defineRule('divineStrikeDamageType',
      'features.Order Domain', '=', '"psychic"',
      'features.Twilight Domain', '=', '"radiant"'
    );
    rules.defineRule
      ('combatNotes.divineStrike', classLevel, '=', 'source<14 ? 1 : 2');
    rules.defineRule
      ('combatNotes.divineStrike.1', classLevel, '=', '"psychic"');
    rules.defineRule
      ('magicNotes.potentSpellcasting.1', 'wisdomModifier', '=', null);
    rules.defineRule
      ('combatNotes.divineStrike', classLevel, '=', 'source<14 ? 1 : 2');
    rules.defineRule
      ('combatNotes.divineStrike.1', classLevel, '=', '"radiant"');
    // SRD5E.classRulesExtra removes the domain requirement for None clerics
    SRD5E.classRulesExtra(rules, 'Cleric');
  } else if(name == 'Druid') {
    rules.defineRule('magicNotes.starryForm', // Italics noop
      'magicNotes.twinklingConstellations', '+', 'null'
    );
  } else if(name == 'Fighter') {
    rules.defineRule // Italics noop
      ('combatNotes.cloudRune', 'combatNotes.masterOfRunes', '+', 'null');
    rules.defineRule('combatNotes.combatSuperiority',
      'combatNotes.fightingStyle(SuperiorTechnique)', '+=', '1'
    );
    rules.defineRule('combatNotes.combatSuperiority.1',
      'combatNotes.fightingStyle(SuperiorTechnique)', '^=', '6'
    );
    rules.defineRule('combatNotes.combatSuperiority.2',
      'combatNotes.fightingStyle(SuperiorTechnique)', '+=', '1'
    );
    rules.defineRule("combatNotes.giant'sMight", // Italics noop
      'combatNotes.greatStature', '+', 'null',
      'combatNotes.runicJuggernaut', '+', 'null'
    );
    rules.defineRule('features.Combat Superiority',
      'combatNotes.fightingStyle(SuperiorTechnique)', '=', '1'
    );
    rules.defineRule('weapons.Unarmed.2',
      'combatNotes.fightingStyle(UnarmedFighting)', '^', '"1d6"'
    );
    rules.defineRule
      ('features.Psi-Powered Leap', 'featureNotes.telekineticAdept', '=', null);
    rules.defineRule('features.Telekinetic Thrust',
      'featureNotes.telekineticAdept', '=', null
    );
    rules.defineRule('featureNotes.psionicPower',
      classLevel, '=', 'source<5 ? 6 : source<11 ? 8 : source<17 ? 10 : 12'
    );
    rules.defineRule('selectableFeatureCount.Fighter (Rune)',
      'featureNotes.runeCarver', '?', null,
      classLevel, '=', 'source<7 ? 2 : source<10 ? 3 : source<15 ? 4 : 5'
    );
  } else if(name == 'Paladin') {
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
    rules.defineRule // Italics noop
      ('combatNotes.gatheredSwarm', 'combatNotes.mightySwarm', '+', 'null');
    rules.defineRule // Italics noop
      ('skillNotes.canny', 'featureNotes.deftExplorer', '?', null);
    rules.defineRule
      ('spellSlots.D0', 'magicNotes.fightingStyle(DruidicWarrior)', '+=', '2');
  } else if(name == 'Rogue') {
    rules.defineRule('featureNotes.psionicPower',
      classLevel, '=', 'source<5 ? 6 : source<11 ? 8 : source<17 ? 10 : 12'
    );
    rules.defineRule
      ('features.Homing Strikes', 'featureNotes.soulBlades', '=', '1');
    rules.defineRule
      ('features.Psychic Teleportation', 'featureNotes.soulBlades', '=', '1');
  } else if(name == 'Warlock') {
    rules.defineRule('genieEnergy',
      'features.Dao', '=', '"bludgeoning"',
      'features.Djinni', '=', '"thunder"',
      'features.Efreeti', '=', '"fire"',
      'features.Marid', '=', '"cold"'
    );
    rules.defineRule('selectableFeatureCount.Warlock (Genie Kind)',
      'features.The Genie', '=', '1'
    );
  } else if(name == 'Wizard') {
    rules.defineRule
      ('combatNotes.extraAttack', 'features.Bladesinging', '+=', '1');
  }

};

/*
 * Defines in #rules# the rules associated with feat #name# that cannot be
 * derived directly from the attributes passed to featRules.
 */
Tasha.featRulesExtra = function(rules, name) {
  if(name == 'Artificer Initiate') {
    rules.defineRule
      ('casterLevels.A', 'magicNotes.artificerInitiate', '^=', '1');
    rules.defineRule
      ('spellSlots.A0', 'magicNotes.artificerInitiate', '+=', '2');
    rules.defineRule
      ('spellSlots.A1', 'magicNotes.artificerInitiate', '+=', '1');
  } else if(name == 'Eldritch Adept') {
    rules.defineRule('selectableFeatureCount.Warlock (Eldritch Invocation)',
      'magicNotes.eldritchAdept', '+=', '1'
    );
    // Override class requirement for Warlock Eldritch Invocation features
    let features = rules.getChoices('selectableFeatures');
    for(let f in features) {
      if(f.match(/^Warlock/) && features[f].match(/Eldritch Invocation/)) {
        f = f.charAt(0).toLowerCase() + f.substring(1).replaceAll(' ', '');
        rules.defineRule('validationNotes.' + f + 'SelectableFeature',
          'features.' + name, '^', '0'
        );
      }
    }
  } else if(name == 'Fighting Initiate') {
    rules.defineRule('selectableFeatureCount.Fighter (Fighting Style)',
      'featureNotes.fightingInitiate', '+=', '1'
    );
    // Override class requirement for Fighter Fighting Style features
    let features = rules.getChoices('selectableFeatures');
    for(let f in features) {
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
    let features = rules.getChoices('selectableFeatures');
    for(let f in features) {
      if(f.match(/^Sorcerer/) && features[f].match(/Metamagic/)) {
        f = f.charAt(0).toLowerCase() + f.substring(1).replaceAll(' ', '');
        rules.defineRule('validationNotes.' + f + 'SelectableFeature',
          'features.' + name, '^', '0'
        );
      }
    }
  } else if(name == 'Telekinetic') {
    // Use featureSpells here instead of folding into feature definition to
    // avoid spurious linkage to Fighter class.
    SRD5E.featureSpells(rules, name, name, 'level', ['Mage Hand']);
  } else if(name == 'Telepathic') {
    // Use featureSpells here instead of folding into feature definition to
    // avoid spurious linkage to Sorcerer class.
    SRD5E.featureSpells(rules, name, name, 'level', ['Detect Thoughts']);
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
