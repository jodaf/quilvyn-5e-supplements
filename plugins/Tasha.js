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

Tasha.VERSION = '2.4.2.0';

Tasha.CLASSES = {
  'Artificer': // (ref Eberron5E)
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
      '"features.Armorer ? 3:Armorer Spells",' +
      '"features.Armorer ? 3:Arcane Armor",' +
      '"features.Armorer ? 3:Armor Model",' +
      '"features.Armorer ? 3:Tools Of The Trade",' +
      '"features.Armorer || features.Battle Smith ? 5:Extra Attack",' +
      '"features.Armorer ? 9:Armor Modifications",' +
      '"features.Guardian Armor ? 3:Thunder Gauntlets",' +
      '"features.Guardian Armor ? 3:Defensive Field",' +
      '"features.Guardian Armor ? 15:Perfected Armor (Guardian Armor)",' +
      '"features.Infiltrator Armor ? 3:Lightning Launcher",' +
      '"features.Infiltrator Armor ? 3:Powered Steps",' +
      '"features.Infiltrator Armor ? 3:Dampening Field",' +
      '"features.Infiltrator Armor ? 15:Perfected Armor (Infiltrator Armor)",' +
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
    '"features.Deft Explorer ? 1:Canny",' +
    '"1:Favored Foe",' +
    '"2:Spellcasting Focus",' +
    '"3:Primal Awareness",' +
    '"4:Martial Versatility",' +
    '"features.Deft Explorer ? 6:Roving",' +
    '"10:Nature\'s Veil",' +
    '"features.Deft Explorer ? 10:Tireless",' +
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
    'Type=General Require="weaponProficiency.Martial Weapons"',
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

  // Classes

  // Artificer (ref Eberron5E)
  'Artificer Specialist':'Section=feature Note="1 selection"',
  'Flash Of Genius':
    'Section=feature ' +
    'Note="R30\' Can use a reaction to give an ally +%{intelligenceModifier} on an ability check or save %{intelligenceModifier>1?intelligenceModifier+\' times\':\'once\'} per long rest"',
  'Infuse Item':
    'Section=feature,magic ' +
    'Note=' +
      '"%{(levels.Artificer+6)//4*2} selections",' +
      '"Can infuse %{(levels.Artificer+6)//4+(magicNotes.armorModifications?2:0)} items simultaneously"',
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
    'Section=magic ' +
    'Note="After a long rest, can store in an item an A1 or A2 spell that can be cast %{intelligenceModifier*2>?2} times"',
  // Spellcasting as SRD5E
  'The Right Tool For The Job':
    'Section=skill Note="Can spend 1 hr to create a set of artisan\'s tools"',
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
    'Section=skill Note="Tool Proficiency (Alchemist\'s Supplies)"',
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
  // Armorer
  'Arcane Armor':
    'Section=combat ' +
    'Note="Self armor has no Strength requirement, covers the entire body, replaces missing limbs, cannot be unwillingly removed, and can be put on or taken off in 1 action"',
  'Armor Model':
    'Section=feature,feature ' +
    'Note=' +
      '"1 selection",' +
      '"Can change selection after a rest"',
  'Armor Modifications':
    'Section=magic,magic ' +
    'Note=' +
      '"Can infuse 2 additional armor pieces",' +
      '"Can apply individual infusions to armor chest, boots, helmet, and weapon"',
  'Armorer Spells':
    'Spells=' +
      '"3:Magic Missile",3:Thunderwave,' +
      '"5:Mirror Image",5:Shatter,' +
      '"9:Hypnotic Pattern","9:Lightning Bolt",' +
      '"13:Fire Shield","13:Greater Invisibility",' +
      '17:Passwall,"17:Wall Of Force"',
  'Dampening Field':
    'Section=skill Note="Arcane Armor gives advantage on Stealth"',
  'Defensive Field':
    'Section=combat ' +
    'Note="Can use a bonus action to gain %{level} temporary hit points %{proficiencyBonus} times per long rest"',
  // Extra Attack as SRD5E
  'Lightning Launcher':
    'Section=combat ' +
    'Note="Range 90\'/300\' attack inflicts 1d6 HP lightning, +1d6 HP lightning once per rd"',
  'Perfected Armor (Guardian Armor)':
    'Section=combat ' +
    'Note="R30\' Can use a reaction to pull a Huge or smaller creature up to 30\' (save DC %{spellDifficultyClass.A} Strength negates) and attack if within 5\' afterward %{proficiencyBonus} times per long rest"',
  'Perfected Armor (Infiltrator Armor)':
    'Section=combat ' +
    'Note="Lightning Launcher inflicts disadvantage on attacks on self for 1 rd, and the next attack on the target within 1 rd gains advantage and inflicts +1d6 HP lightning"',
  'Powered Steps':'Section=ability Note="+5 Speed"',
  'Thunder Gauntlets':
    'Section=combat ' +
    'Note="Each gauntlet inflicts 1d8 HP thunder and disadvantage on attacks on others for 1 rd"',
  'Tools Of The Trade':
    'Section=combat,skill ' +
    'Note=' +
      '"Armor Proficiency (Heavy)",' +
      '"Tool Proficiency (Smith\'s Tools)"',
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
    'Section=skill Note="Tool Proficiency (Woodcarver\'s Tools)"',
  'Eldritch Cannon':
    'Section=combat ' +
    'Note="Can create a magical cannon (armor class 18; %{levels.Artificer*5} hit points (<i>Mending</i> repairs 2d6 hit points); can move 15\') flamethrower (15\' cone inflicts %{2+(combatNotes.explosiveCannon?1:0)}d8 HP fire (save DC %{spellDifficultyClass.A} Dexterity half)), force ballista (R120\' inflicts %{2+(combatNotes.explosiveCannon?1:0)}d8 force and pushes 5\'), or protector (R10\' targets gain 1d8+%{intelligenceModifier>?1} temporary hit points) for 1 hr once per long rest; can spend spell slots to create additional cannons"',
  'Explosive Cannon':
    'Section=combat,combat ' +
    'Note=' +
      '"Eldritch cannon inflicts +1d8 HP damage",' +
      '"R60\' Can destroy an eldritch cannon to inflict 3d8 HP force (save DC %{spellDifficultyClass.A} Dexterity half) in a 20\' radius"',
  'Fortified Position':
    'Section=combat ' +
    'Note=' +
      '"Can have 2 eldritch cannons simultaneously, and eldritch cannons give allies in a 10\' radius half cover"',
  // Battle Smith
  'Arcane Jolt':
    'Section=combat ' +
    'Note="Magic weapon or Steel Defender attack inflicts +%{2+(combatNotes.improvedDefender?2:0)}d6 HP force or restores %{2+(combatNotes.improvedDefender?2:0)}d6 hit points to 1 target in a 30\' radius %{intelligenceModifier>1?intelligenceModifier+\' times\':\'once\'} per long rest"',
  'Battle Ready':
    'Section=combat,combat ' +
    'Note=' +
      '"Weapon Proficiency (Martial Weapons)",' +
      '"+%{intelligenceModifier-strengthModifier} (Intelligence instead of Strength) or +%{intelligenceModifier-dexterityModifier} (Intelligence instead of Dexterity) attack and damage with magic weapons"',
  'Battle Smith Spells':
    'Spells=' +
      '"3:Heroism","3:Shield",' +
      '"5:Branding Smite","5:Warding Bond",' +
      '"9:Aura Of Vitality","9:Conjure Barrage",' +
      '"13:Aura Of Purity","13:Fire Shield",' +
      '"17:Banishing Smite","17:Mass Cure Wounds"',
  'Battle Smith Tool Proficiency':
    'Section=skill Note="Tool Proficiency (Smith\'s Tools)"',
  // Extra Attack as SRD5E
  'Improved Defender':
    'Section=combat,combat ' +
    'Note=' +
      '"Arcane Jolt inflicts +2d6 HP or restores +2d6 hit points, and Steel Defender gains +2 armor class",' +
      '"Steel Defender Deflect Attack inflicts 1d4+%{intelligenceModifier} HP force"',
  'Steel Defender':
    'Section=combat ' +
    'Note="Can create a mechanical companion (armor class %{15+(combatNotes.improvedDefender?2:0)}; %{levels.Artificer*5+intelligenceModifier+2} hit points (<i>Mending</i> repairs 2d6 hit points and can self-repair 2d8+%{proficiencyBonus} hit points 3 times per day); +%{spellAttackModifier.A} attack inflicts 1d8+%{proficiencyBonus} HP force; can use a reaction to inflict disadvantage on attack in a 5\' radius; can move 40\'; Dexterity save +%{proficiencyBonus+1}; Constitution save +%{proficiencyBonus+2}; immune to poison and charmed, exhausted, poisoned, and surprised conditions)"',
  // Infusions
  'Arcane Propulsion Armor':
    'Section=magic ' +
    'Note="Infused armor gives +5\' Speed, cannot be removed unwillingly, and replaces missing limbs; range 20\'/60\' magical gauntlets inflict 1d8 HP force, then return"',
  'Armor Of Magical Strength':
    'Section=magic ' +
    'Note="Wearer of infused armor with 6 charges can spend a charge to gain +Intelligence modifier on a Strength check or save, or to use a reaction to avoid being knocked prone; the armor regains 1d6 charges each dawn"',
  'Boots Of The Winding Path':
    'Section=magic ' +
    'Note="Wearer of infused boots can use a bonus action to teleport back to a space within 15\'"',
  'Enhanced Arcane Focus':
    'Section=magic ' +
    'Note="Infused rod, staff, or wand gives +%{levels.Artificer<10?1:2} spell attacks that ignore half cover"',
  'Enhanced Defense':
    'Section=magic ' +
    'Note="Infused armor or shield gives +%{levels.Artificer<10?1:2} armor class"',
  'Enhanced Weapon':
    'Section=magic ' +
    'Note="Infused weapon gives +%{levels.Artificer<10?1:2} attack and damage"',
  'Helm Of Awareness':
    'Section=magic ' +
    'Note="Infused helmet gives advantage on initiative, and the wearer cannot be surprised"',
  'Homunculus Servant':
    'Section=magic ' +
    'Note="Can create a mechanical companion (armor class 13; %{levels.Artificer+intelligenceModifier+1} hit points; R30\' +%{spellAttackModifier.A} attack inflicts 1d4+%{proficiencyBonus} HP force; Evasion; Channel Magic)"',
  'Mind Sharpener':
    'Section=magic ' +
    'Note="Infused armor or robes with 4 charges allows the wearer to use a reaction and 1 charge to change a spell concentration roll from failure to success; the item regains 1d4 charges each dawn"',
  'Radiant Weapon':
    'Section=magic ' +
    'Note="Infused weapon with 4 charges gives +1 attack and damage and emits a 30\' bright light on command; the wielder can use a reaction and 1 charge to blind a successful attacker (save DC %{spellDifficultyClass.A} Constitution negates) for 1 rd; the weapon regains 1d4 charges each dawn"',
  'Repeating Shot':
    'Section=magic ' +
    'Note="Infused ammunition weapon gives +1 attack and damage and automatically creates its own ammunition"',
  'Replicate Magic Item':
    'Section=magic Note="Can replicate a chosen wondrous item"',
  'Repulsion Shield':
    'Section=magic ' +
    'Note="Infused shield with 4 charges gives +1 armor class, and the holder can use a reaction and 1 charge to push a successful attacker 15\'; the shield regains 1d4 charges each dawn"',
  'Resistant Armor':
    'Section=magic ' +
    'Note="Infused armor gives +1 armor class and resistance to a chosen damage type"',
  'Returning Weapon':
    'Section=magic ' +
    'Note="Infused thrown weapon gives +1 attack and damage and returns after being thrown"',
  'Spell-Refueling Ring':
    'Section=magic ' +
    'Note="Infused ring allows recovery of a level 3 spell once per day"',

  // Barbarian
  'Instinctive Pounce':
    'Section=combat Note="Can move %{speed//2}\' when entering rage"',
  'Primal Knowledge':
    'Section=skill ' +
    'Note="Skill Proficiency (Choose %V from Animal Handling, Athletics, Intimidation, Nature, Perception, Survival)"',
  // Path Of The Beast
  'Bestial Soul':
    'Section=ability,combat ' +
    'Note=' +
      '"Until the next rest, can gain a choice of: a %{speed}\' swim Speed and water breathing; a %{speed}\' climb Speed and ability to climb difficult surfaces; add Athletics roll to jump distances",' +
      '"Natural weapons count as magic"',
  'Call The Hunt':
    'Section=combat ' +
    'Note="R30\' During rage, can give %{constitutionModifier>?1} willing target%{constitutionModifier>1?\'s\':\'\'} +1d6 HP damage once per rd and self 5 temporary hit points per target %{proficiencyBonus} times per long rest"',
  'Form Of The Beast':
    'Section=combat ' +
    'Note="During rage, can use bite (inflicts 1d8+%{strengthModifier} HP piercing, and a hit restores %{proficiencyBonus} hit points to self once per rd when below %{hitPoints//2} hit points), claws (inflicts 1d6+%{strengthModifier} HP slashing each and can make an additional attack once per rd), or tail (+5\' reach inflicts 1d8+%{strengthModifier} HP slashing and can use a reaction when hit by a foe within 10\' to gain +1d8 armor class)"',
  'Infectious Fury':
    'Section=combat ' +
    'Note="Hit with a natural weapon can force the target to use its reaction to attack a chosen creature or can inflict +2d12 HP psychic (save DC %{8+constitutionModifier+proficiencyBonus} Wisdom negates) %{proficiencyBonus} times per long rest"',
  // Path Of Wild Magic
  'Bolstering Magic':
    'Section=magic ' +
    'Note="Touch gives a choice of +1d3 attacks and ability checks for 10 min or recovery of a level 1d3 spell slot %{proficiencyBonus} times per long rest"',
  'Controlled Surge':
    'Section=magic Note="Can choose from 2 effects when triggering Wild Magic"',
  'Magic Awareness':
    'Section=magic ' +
    'Note="R60\' Can detect the presence and schools of spells and magic items for 1 rd %{proficiencyBonus} times per long rest"',
  'Unstable Backlash':
    'Section=magic ' +
    'Note="Can use a reaction after taking damage or failing a save during rage to trigger a Wild Magic effect"',
  'Wild Surge':
    'Section=magic ' +
    'Note="Triggers a DC %{8+proficiencyBonus+constitutionModifier} Wild Magic effect when entering rage"',

  // Bard
  'Bardic Versatility':
    'Section=feature ' +
    'Note="Can replace a skill expertise or a cantrip when boosting an ability or taking a feat"',
  'Magical Inspiration':
    'Section=magic ' +
    'Note="Bardic Inspiration die roll can be added to spell harm or healing"',
  // College Of Creation
  'Animating Performance':
    'Section=magic ' +
    'Note="R30\' Can animate an obedient Large object (armor class 16; %{levels.Bard*5+10} hit points; move or fly 30\'; +%{spellAttackModifier.B} attack inflicts 1d10+%{proficiencyBonus} HP; Irrepressible Dance R10\' inflicts -10\' or +10\' Speed) for 1 hr once per long rest; can spend level 3 or higher spell slots to animate additional objects"',
  'Creative Crescendo':
    'Section=magic ' +
    'Note="Can use Performance Of Creation to create %{(charismaModifier-1)>?1} additional small object%{charismaModifier>2?\'s\':\'\'}"',
  'Mote Of Potential':
    'Section=magic ' +
    'Note="Bardic Inspiration adds the better of two rolls on an ability check, inflicts the die roll HP thunder (save DC %{spellDifficultyClass.B} Constitution negates) to the target and chosen creatures within 5\' on an attack, or gives the roll + %{charismaModifier} temporary hit points on a save"',
  'Performance Of Creation':
    'Section=magic ' +
    'Note="R10\' Can create a %{levels.Bard<6?\'Medium\':levels.Bard<14?\'Large\':\'Huge\'} object worth %{levels.Bard*20} GP for %{proficiencyBonus} hr once per long rest; can spend level 2 or higher spell slots to create additional objects"',
  // College Of Eloquence
  'Infectious Inspiration':
    'Section=magic ' +
    'Note="R60\' Can use a reaction after a successful Bardic Inspiration use to grant an extra die to a different target %{charismaModifier>1?charismaModifier+\' times\':\'once\'} per long rest"',
  'Silver Tongue':
    'Section=skill ' +
    'Note="Scores a minimum of 10 on Deception and Persuasion rolls"',
  'Unfailing Inspiration':
    'Section=magic ' +
    'Note="Bardic Inspiration targets keep the die after a failed use"',
  'Universal Speech':
    'Section=magic ' +
    'Note="R60\' %{charismaModifier>?1} target%{charismaModifier>1?\'s\':\'\'} understand%{charismaModifier>1?\'\':\'s\'} self for 1 hr once per long rest; can spend spell slots for additional uses"',
  'Unsettling Words':
    'Section=magic ' +
    'Note="R60\' Can spend 1 Bardic Inspiration die and use a bonus action to inflict -roll on the target\'s next save within 1 rd"',

  // Cleric
  'Blessed Strikes':
    'Section=combat ' +
    'Note="Can inflict +1d8 radiant with a cantrip or a weapon hit once per rd"',
  'Cantrip Versatility':
    'Section=magic ' +
    'Note="Can replace a cantrip when boosting an ability or taking a feat"',
  'Harness Divine Power':
     'Section=magic ' +
     'Note="Can use Channel Divinity and a bonus action to regain a spell slot up to level %{(proficiencyBonus+1)//2} %V time%{magicNotes.harnessDivinePower>1?\'s\':\'\'} per long rest"',
  // Order Domain
  'Bonus Proficiencies (Order Domain)':
    'Section=combat,skill ' +
    'Note=' +
      '"Armor Proficiency (Heavy)",' +
      '"Skill Proficiency (Choose 1 from Intimidation, Persuasion)"',
  // Divine Strike as SRD5E
  'Embodiment Of The Law':
    'Section=magic ' +
    'Note="Can cast a 1-action enchantment spell as a bonus action %{wisdomModifier>1?wisdomModifier+\' times\':\'once\'} per long rest"',
  'Order Domain':
    'Spells=' +
      '"1:Command","1:Heroism",' +
      '"3:Hold Person","3:Zone Of Truth",' +
      '"5:Mass Healing Word","5:Slow",' +
      '"7:Compulsion","7:Locate Creature",' +
      '"9:Commune","9:Dominate Person"',
  "Order's Demand":
    'Section=magic ' +
    'Note="R30\' Can use Channel Divinity to charm targets (save DC %{spellDifficultyClass.C} Wisdom negates; damage ends) for 1 rd"',
  "Order's Wrath":
    'Section=combat ' +
    'Note="Once per rd, can curse a Divine Strike target so that the next ally hit within 1 rd inflicts +2d8 psychic"',
  'Voice Of Authority':
    'Section=magic ' +
    'Note="Allied target of a self spell can use a reaction to make an attack"',
  // Peace Domain
  'Balm Of Peace':
    'Section=magic ' +
    'Note="Can use Channel Divinity to move %{speed}\' without provoking opportunity attacks, restoring 2d6+%{wisdomModifier} hit points to each target within 5\'"',
  'Emboldening Bond':
    'Section=magic ' +
    'Note="R30\' Can give %{proficiencyBonus} willing targets +1d4 on an attack, ability check, or save once per rd for 10 min when within 30\' of another %{proficiencyBonus} times per long rest"',
  'Expansive Bond':
    'Section=magic ' +
    'Note="The range of Emboldening Bond and Protective Bond increases to 60\', and Protective Bond gives resistance to the damage taken"',
  'Implement Of Peace':
    'Section=skill ' +
    'Note="Skill Proficiency (Choose 1 from Insight, Performance, Persuasion)"',
  'Peace Domain':
    'Spells=' +
      '"1:Heroism","1:Sanctuary",' +
      '"3:Aid","3:Warding Bond",' +
      '"5:Beacon Of Hope","5:Sending",' +
      '"7:Aura Of Purity","7:Otiluke\'s Resilient Sphere",' +
      '"9:Greater Restoration","7:Rary\'s Telepathic Bond"',
  // Potent Spellcasting as SRD5E
  'Protective Bond':
    'Section=magic ' +
    'Note="An Emboldening Bond member can use a reaction to teleport 30\' and take another\'s damage"',
  // Twilight Domain
  'Bonus Proficiencies (Twilight Domain)':
    'Section=combat ' +
    'Note="Armor Proficiency (Heavy)/Weapon Proficiency (Martial Weapons)"',
  // Divine Strike as SRD5E
  'Eyes Of Night':
    'Section=feature ' +
    'Note="R300\' Darkvision can be shared with %{wisdomModifier>1?wisdomModifier+\' others\':\'1 other\'} within 10\' for 1 hr once per long rest; can spend a spell slot for additional uses"',
  'Steps Of Night':
    'Section=ability ' +
    'Note="Can use a bonus action to gain a %{speed}\' fly Speed in dim or no light for 1 min %{proficiencyBonus} times per long rest"',
  'Twilight Domain':
    'Spells=' +
      '"1:Faerie Fire","1:Sleep",' +
      '"3:Moonbeam","3:See Invisibility",' +
      '"5:Aura Of Vitality","5:Leomund\'s Tiny Hut",' +
      '"7:Aura Of Life","7:Greater Invisibility",' +
      '"9:Circle Of Power","9:Mislead"',
  'Twilight Sanctuary':
    'Section=magic ' +
    'Note="Can use Channel Divinity to create a 30\' radius for 1 min that gives targets a choice of 1d6+%{levels.Cleric} temporary hit points or an end to a charmed or frightened condition"',
  'Twilight Shroud':'Section=magic Note="Twilight Sanctuary gives half cover"',
  'Vigilant Blessing':
    'Section=combat Note="Touched gains advantage on the next initiative"',

  // Druid
  // Cantrip Versatility as above
  'Wild Companion':
    'Section=magic ' +
    'Note="Can spend a Wild Shape use to cast <i>Find Familiar</i>, summoning a fey spirit for %{levels.Druid//2} hr" ' +
    'Spells=' +
      '"Find Familiar"',
  // Circle Of Spores
  'Circle Of Spores':
    'Spells=' +
      '"2:Chill Touch",' +
      '"3:Blindness/Deafness","3:Gentle Repose",' +
      '"5:Animate Dead","5:Gaseous Form",' +
      '"7:Blight","7:Confusion",' +
      '"9:Cloudkill","9:Contagion"',
  'Fungal Body':
    'Section=combat,save ' +
    'Note=' +
      '"Has immunity to critical hits",' +
      '"Has immunity to the blinded, deafened, frightened, and poisoned conditions"',
  'Fungal Infestation':
    'Section=magic ' +
    'Note="R10\' Can use a reaction to animate a creature upon death into an obedient zombie with 1 hit point for 1 hr %{wisdomModifier>1?wisdomModifier+\' times\':\'once\'} per long rest"',
  'Halo Of Spores':
    'Section=combat ' +
    'Note="R10\' Can use a reaction to inflict 1d%{levels.Druid<6?4:levels.Druid<10?6:levels.Druid<14?8:10} HP necrotic on a target (save DC %{spellDifficultyClass.D} Constitution negates)"',
  'Spreading Spores':
    'Section=combat ' +
    'Note="Can use a bonus action to move the Halo Of Spores 30\'"',
  'Symbiotic Entity':
    'Section=combat ' +
    'Note="Can expend 1 Wild Shape use to gain %{levels.Druid*4} temporary hit points, double the Halo Of Spores damage, and inflict +1d6 HP necrotic on melee hits for 10 min or until the temporary hit points are lost"',
  // Circle Of Stars
  'Cosmic Omen':
    'Section=combat ' +
    'Note="R30\' Can use a reaction to increase or decrease an attack, ability, or save roll by 1d6 %{proficiencyBonus} times per long rest"',
  'Full Of Stars':
    'Section=save ' +
    'Note="Starry Form gives resistance to bludgeoning, piercing, and slashing"',
  'Star Map':
    'Section=magic ' +
    'Note="Knows the <i>Guidance</i> cantrip and can cast <i>Guiding Bolt</i> %{proficiencyBonus} times per long rest" ' +
    'Spells=' +
      'Guidance,"Guiding Bolt"',
  'Starry Form':
    'Section=magic ' +
    'Note="Can spend a Wild Shape use and use a bonus action to change into a constellation of an archer (R60\' can use a bonus action to make a ranged spell attack that inflicts %{magicNotes.twinklingConstellations?2:1}d8+%{wisdomModifier} HP radiant), a chalice (R30\' casting a healing spell restores %{magicNotes.twinklingConstellations?2:1}d8+%{wisdomModifier} to another), or a dragon (scores a minimum of 10 on concentration rolls)"',
  'Twinkling Constellations':
    'Section=magic,magic ' +
    'Note=' +
      '"Has increased Starry Form effects",' +
      '"Dragon Starry Form gives a 20\' fly Speed, and can switch between Starry Forms once per rd"',
  // Circle Of Wildfire
  'Blazing Revival':
    'Section=magic ' +
    'Note="R120\' Can extinguish the Wildfire Spirit to regain %{hitPoints//2} hit points when reduced to 0 hit points once per long rest"',
  'Cauterizing Flames':
    'Section=magic ' +
    'Note="R30\' Can create a spectral flame for 1 min when a creature dies and later use it to heal 2d10+%{wisdomModifier} hit points or to inflict 2d10+%{wisdomModifier} HP fire on another in the same space %{proficiencyBonus} times per long rest"',
  'Circle Of Wildfire':
    'Spells=' +
      '"2:Burning Hands","2:Cure Wounds",' +
      '"3:Flaming Sphere","3:Scorching Ray",' +
      '"5:Plant Growth",5:Revivify,' +
      '"7:Aura Of Life","7:Fire Shield",' +
      '"9:Flame Strike","9:Mass Cure Wounds"',
  'Enhanced Bond':
    'Section=magic ' +
    'Note="When the Wildfire Spirit is present, spells can be cast through it, fire spells inflict +1d8 HP fire, and healing spells restore +1d8 hit points"',
  'Summon Wildfire Spirit':
    'Section=magic ' +
    'Note="R30\' Can spend a Wild Shape use to inflict 2d6 HP fire in a 10\' radius (save DC %{spellDifficultyClass.D} Dexterity negates) and summon an obedient Wildfire Spirit (armor class 13; %{levels.Druid*5+5} hit points; move or fly 30\'; R60\' +%{spellAttackModifier.D} attack inflicts 1d6+%{proficiencyBonus} HP fire; can teleport targets in a 5\' radius 15\', inflicting 1d6+%{proficiencyBonus} on those left behind (save DC %{spellDifficultyClass.D} Dexterity negates)) for 1 hr"',

  // Fighter
  'Fighting Style (Blind Fighting)':
    'Section=combat Note="R10\' Can detect the locations of unseen creatures"',
  'Fighting Style (Interception)':
    'Section=combat ' +
    'Note="R5\' Can use a reaction to negate 1d10+%{proficiencyBonus} HP damage to another"',
  'Fighting Style (Superior Technique)':
    'Section=combat ' +
    'Note="Has the Combat Superiority feature with 1 maneuver and 1 superiority die"',
  'Fighting Style (Thrown Weapon Fighting)':
    'Section=combat ' +
    'Note="Can draw a thrown weapon as part of an attack, and thrown weapons inflict +2 HP"',
  'Fighting Style (Unarmed Fighting)':
    'Section=combat,combat ' +
    'Note=' +
      '"Unarmed strike inflicts 1d6+%{strengthModifier} HP bludgeoning",' +
      '"Unarmed strike inflicts 1d8+%{strengthModifier} bludgeoning when unarmed and shieldless/Can inflict 1d4 HP bludgeoning to a grappled foe"',
  'Martial Versatility':
    'Section=combat ' +
    'Note="Can replace a Fighting Style or maneuver when boosting an ability or taking a feat"',
  // Maneuver Options
  'Ambush':
    'Section=combat,skill ' +
    'Note=' +
      '"Can spend 1 superiority die to add the roll to initiative",' +
      '"Can spend 1 superiority die to add the roll to a Stealth check"',
  'Bait And Switch':
    'Section=combat ' +
    'Note="Can spend 1 superiority die to swap places with an adjacent willing creature and to boost the armor class of either self or the other creature for 1 rd by the rolled value"',
  'Brace':
    'Section=combat ' +
    'Note="Can spend 1 superiority die and use a reaction to attack a creature that moves into range, adding the roll to the damage"',
  'Commanding Presence':
    'Section=skill ' +
    'Note="Can spend 1 superiority die to add the roll to an Intimidation, Performance, or Persuasion check"',
  'Grappling Strike':
    'Section=combat ' +
    'Note="After a hit, can spend 1 superiority die to add the roll to an Athletics grapple check"',
  'Quick Toss':
    'Section=combat ' +
    'Note="Can spend 1 superiority die and use a bonus action to draw and throw a weapon, adding the roll to the damage"',
  'Tactical Assessment':
    'Section=skill ' +
    'Note="Can spend 1 superiority die to add the roll to a History, Insight, or Investigation check"',
  // Psi Warrior
  'Bulwark Of Force':
    'Section=combat ' +
    'Note="R30\' Can use a bonus action to give %{intelligenceModifier>?1} target%{intelligenceModifier>1?\'s\':\'\'} half cover for 1 min once per long rest; can spend Psionic Energy dice for additional uses"',
  'Guarded Mind':
    'Section=save ' +
    'Note="Has resistance to psychic damage/Can spend 1 Psionic Energy die to end charmed and frightened conditions"',
  'Protective Field':
    'Section=combat ' +
    'Note="R30\' Can spend 1 Psionic Energy die and use a reaction to negate 1d%{combatNotes.psionicPower}+%{intelligenceModifier>?1} HP damage"',
  'Psi-Powered Leap':
    'Section=ability ' +
    'Note="Can use a bonus action to gain a %{speed*2}\' fly Speed for 1 rd once per short rest; can spend Psionic Energy dice for additional uses"',
  'Psionic Power':
    'Section=combat ' +
    'Note="Can use %{proficiencyBonus*2} d%V Psionic Energy dice per long rest and can use a bonus action to regain 1 die once per short rest"',
  'Psionic Strike':
    'Section=combat ' +
    'Note="R30\' Can spend 1 Psionic Energy die after a hit to inflict +1d%{combatNotes.psionicPower}+%{intelligenceModifier} HP force"',
  'Telekinetic Adept':
    'Section=feature ' +
    'Note="Has Psi-Powered Leap and Telekinetic Thrust features"',
  'Telekinetic Master':
    'Section=magic ' +
    'Note="Can cast <i>Telekinesis</i> and use bonus actions while concentrating to make a weapon attack each rd once per long rest; can spend Psionic Energy dice for additional uses" ' +
    'Spells=' +
      'Telekinesis',
  'Telekinetic Movement':
    'Section=combat ' +
    'Note="R30\' Can move a Large object or creature 30\' once per short rest; can spend Psionic Energy dice for additional uses"',
  'Telekinetic Thrust':
    'Section=combat ' +
    'Note="Psionic Strike can inflict knocked prone or a 10\' push (save DC %{8+proficiencyBonus+intelligenceModifier} Strength negates)"',
  // Rune Knight
  'Bonus Proficiencies (Rune Knight)':
    'Section=skill Note="Tool Proficiency (Smith\'s Tools)/Language (Giant)"',
  'Cloud Rune':
    'Section=combat,skill ' +
    'Note=' +
      '"R30\' Can use a reaction to redirect damage to a different target %{combatNotes.masterOfRunes?\'2 times\':\'once\'} per short rest",' +
      '"Has advantage on Sleight Of Hand and Deception"',
  'Fire Rune':
    'Section=combat,skill ' +
    'Note=' +
      '"After a hit, can restrain and inflict +2d6 HP fire each rd (save DC %{8+proficiencyBonus+constitutionModifier} Strength ends) for 1 min %{combatNotes.masterOfRunes?\'2 times\':\'once\'} per short rest",' +
      '"+%{proficiencyBonus} when using proficient tools"',
  'Frost Rune':
    'Section=ability,save,skill ' +
    'Note=' +
      '"Can use a bonus action to gain +2 on Strength and Constitution checks for 10 min once per short rest",' +
      '"Can use a bonus action to gain +2 on Strength and Constitution saves for 10 min once per short rest",' +
      '"Has advantage on Animal Handling and Intimidation"',
  "Giant's Might":
    'Section=ability,combat,save ' +
    'Note=' +
      '"Can use a bonus action to gain advantage on Strength checks for 1 min %{proficiencyBonus} times per long rest",' +
      '"Can use a bonus action to grow to %{combatNotes.runicJuggernaut?\\"Huge, with +5\' reach,\\":\'Large\'} and inflict +1d%{combatNotes.runicJuggernaut?10:combatNotes.greatStature?8:6} HP damage with a weapon or unarmed strike once per rd for 1 min %{proficiencyBonus} times per long rest",' +
      '"Can use a bonus action to gain advantage on Strength saves for 1 min %{proficiencyBonus} times per long rest"',
  'Great Stature':
    'Section=combat,feature ' +
    'Note=' +
      '"Has increased Giant\'s Might effects",' +
      '"Has increased height by 3d4\\""',
  'Hill Rune':
    'Section=save ' +
    'Note="Has advantage vs. poison and resistance to poison damage/Can use a bonus action to gain resistance to bludgeoning, piercing, and slashing for 1 min %{combatNotes.masterOfRunes?\'2 times\':\'once\'} per short rest"',
  'Master Of Runes':
    'Section=combat Note="Can invoke runes twice per short rest"',
  'Rune Carver':
    'Section=feature,feature ' +
    'Note=' +
      '"%V selections",' +
      '"After a long rest, can apply 1 rune each to %{featureNotes.runeCarver} objects worn or held"',
  'Runic Juggernaut':
    'Section=combat Note="Has increased Giant\'s Might effects"',
  'Runic Shield':
    'Section=combat ' +
    'Note="R60\' Can use a reaction when another creature is hit to force a reroll %{proficiencyBonus} times per long rest"',
  'Stone Rune':
    'Section=combat,feature,skill ' +
    'Note=' +
      '"R30\' Can use a reaction to charm and halt a target (save DC %{8+proficiencyBonus+constitutionModifier} Wisdom ends) for 1 min %{combatNotes.masterOfRunes?\'2 times\':\'once\'} per short rest",' +
      '"Has 120\' Darkvision",' +
      '"Has advantage on Insight"',
  'Storm Rune':
    'Section=combat,skill ' +
    'Note=' +
      '"Has immunity to surprise/R60\' Can use a bonus action and a reaction to give advantage or disadvantage on a roll each rd for 1 min %{combatNotes.masterOfRunes?\'2 times\':\'once\'} per short rest",' +
      '"Has advantage on Arcana"',

  // Monk
  'Dedicated Weapon':
    'Section=combat ' +
    'Note="Can designate a non-heavy weapon as monk weapon once per short rest"',
  'Focused Aim':
    'Section=combat ' +
    'Note="Can spend 1, 2, or 3 ki points to add 2, 4, or 6 to a failed attack roll"',
  'Ki-Fueled Attack':
    'Section=combat ' +
    'Note="Performing an action that spends a ki point allows using a bonus action to attack with a monk weapon"',
  'Quickened Healing':
    'Section=combat ' +
    'Note="Can spend 2 ki points to regain 1d%{combatNotes.martialArts}+%{proficiencyBonus} hit points"',
  // Way Of Mercy
  'Flurry Of Healing And Harm':
    'Section=combat ' +
    'Note="Can substitute Hand Of Healing for each Flurry Of Blows strike and add Hand Of Harm to one Flurry Of Blows strike"',
  'Hand Of Harm':
    'Section=combat ' +
    'Note="Can spend 1 ki point to inflict +1d%{combatNotes.martialArts}+%{wisdomModifier} HP necrotic with an unarmed strike once per rd"',
  'Hand Of Healing':
    'Section=combat ' +
    'Note="Can spend 1 ki point or forego 1 Flurry Of Blows strike to use touch to restore 1d%{combatNotes.martialArts}+%{wisdomModifier} hit points"',
  'Hand Of Ultimate Mercy':
    'Section=magic ' +
    'Note="Can spend 5 ki points to revive a corpse dead up to 24 hr, restoring 4d10+%{wisdomModifier} hit points and removing conditions, once per long rest"',
  'Implements Of Mercy':
    'Section=feature,skill ' +
    'Note=' +
      '"Owns a mask associated with the Way Of Mercy",' +
      '"Skill Proficiency (Insight; Medicine)/Tool Proficiency (Herbalism Kit)"',
  "Physician's Touch":
    'Section=combat ' +
    'Note="Can use Hand Of Healing to end a disease or condition and Hand Of Harm to inflict poisoned for 1 rd"',
  // Way Of The Astral Self
  'Arms Of The Astral Self':
    'Section=ability,combat ' +
    'Note=' +
      '"Can spend 1 ki point and use a bonus action to gain +%{wisdomModifier-strengthModifier} on Strength checks for 10 min",' +
      '"Can spend 1 ki point and use a bonus action to inflict 2d%{combatNotes.martialArts} HP force (save DC %{kiSaveDC} Dexterity negates) to targets in a 10\' radius and gain +5\' unarmed reach, +%{wisdomModifier-maxDexOrStrMod} unarmed attack, and +%{wisdomModifier-maxDexOrStrMod} HP force unarmed damage for 10 min"',
  'Awakened Astral Self':
    'Section=combat ' +
    'Note="Can spend 5 ki points and use a bonus action to gain +2 armor class and a third Arms Of The Astral Self attack each rd"',
  'Body Of The Astral Self':
    'Section=combat ' +
    'Note="While using both Arms and Visage Of The Astral Self, can use a reaction to negate 1d10+%{wisdomModifier} HP acid, cold, fire, force, lightning, or thunder damage and can inflict +1d%{combatNotes.martialArts} HP damage with Arms Of The Astral Self once per rd"',
  'Visage Of The Astral Self':
    'Section=feature,skill ' +
    'Note=' +
      '"Can spend 1 ki point and use a bonus action to gain 120\' Darkvision, R600\' voice, and R60\' private voice for 10 min",' +
      '"Can spend 1 ki point and use a bonus action to gain advantage on Insight and Intimidation for 10 min"',

  // Paladin
  'Fighting Style (Blessed Warrior)':
    'Section=magic,magic ' +
    'Note=' +
      '"Knows 2 C0 cantrips",' +
      '"Can replace a C0 cantrip when gaining a level"',
  // Fighting Style (Blind Fighting) as above
  // Fighting Style (Interception) as above
  // Harness Divine Power as above
  // Martial Versatility as above
  // Oath Of Glory
  'Aura Of Alacrity':
    'Section=ability,combat ' +
    'Note=' +
      '"+10 Speed",' +
      '"Allies who begin a turn within %{levels.Paladin<18?5:10}\' gain +10\' Speed for 1 rd"',
  'Glorious Defense':
    'Section=combat ' +
    'Note="R10\' Can use a reaction to give a successful attack target +%{charismaModifier>?1} armor class and, if this causes the attacker to miss, to attack the attacker, %{charismaModifier>1?charismaModifier+\' times\':\'once\'} per long rest"',
  'Inspiring Smite':
    'Section=combat ' +
    'Note="R30\' Can use Channel Divinity as a bonus action after a Divine Smite to distribute 2d8+%{levels.Paladin} temporary hit points"',
  'Living Legend':
    'Section=ability,combat,save ' +
    'Note=' +
      '"Can gain advantage on Charisma for 1 min once per long rest; can spend level 5 spell slots for additional uses",' +
      '"Can change a miss into a hit once per rd for 1 min once per long rest; can spend level 5 spell slots for additional uses",' +
      '"Can use a reaction to reroll failed saves for 1 min once per long rest; can spend level 5 spell slots for additional uses"',
  'Oath Of Glory':
    'Spells=' +
      '"3:Guiding Bolt","3:Heroism",' +
      '"5:Enhance Ability","5:Magic Weapon",' +
      '"9:Haste","9:Protection From Energy",' +
      '"13:Compulsion","13:Freedom Of Movement",' +
      '"17:Commune","17:Flame Strike"',
  'Peerless Athlete':
    'Section=ability,skill ' +
    'Note=' +
      '"Can use Channel Divinity and a bonus action to double carry and lift for 10 min",' +
      '"Can use Channel Divinity and a bonus action to gain advantage on Athletics and Acrobatics and +10\' high and long jumps for 10 min"',
  // Oath Of The Watchers
  'Abjure The Extraplanar':
    'Section=combat ' +
    'Note="R30\' Can use Channel Divinity to turn aberrations, celestials, elementals, fey, and fiends (save DC %{spellDifficultyClass.P} Wisdom negates) for 1 min"',
  'Aura Of The Sentinel':
    'Section=combat,combat ' +
    'Note=' +
      '"+%{proficiencyBonus} Initiative",' +
      '"R%{levels.Paladin<18?10:30}\' Targets gain +%{proficiencyBonus} Initiative"',
  'Mortal Bulwark':
    'Section=combat,feature ' +
    'Note=' +
      '"Can use a bonus action to gain advantage on attacks vs. aberrations, celestials, elementals, fey, and fiends and to inflict banishment with a successful attack (save DC %{spellDifficultyClass.P} Charisma negates for 24 hr) for 1 min once per long rest; can spend level 5 spell slots for additional uses",' +
      '"Can use a bonus action to gain 120\' truesight for 1 min once per long rest; can spend level 5 spell slots for additional uses"',
  'Oath Of The Watchers':
    'Spells=' +
      '"3:Alarm","3:Detect Magic",' +
      '"5:Moonbeam","5:See Invisibility",' +
      '"9:Counterspell","9:Nondetection",' +
      '"13:Aura Of Purity","13:Banishment",' +
      '"17:Hold Monster","17:Scrying"',
  "Watcher's Will":
    'Section=ability ' +
    'Note="R30\' Can use Channel Divinity to give self and %{charismaModifier>1?charismaModifier+\' others\':\'1 other\'} advantage on Charisma, Intelligence, and Wisdom for 1 min"',
  'Vigilant Rebuke':
    'Section=combat ' +
    'Note="R30\' Can use a reaction to inflict 2d8+%{charismaModifier} HP force on an attacker who triggers a successful Charisma, Intelligence, or Wisdom save"',

  // Ranger
  'Canny':
    'Section=skill,skill ' +
    'Note=' +
      '"Language (Choose 2 from any)",' +
      '"+%{proficiencyBonus} on a chosen proficient skill"',
  'Deft Explorer':
    'Section=feature ' +
    'Note="Has the Canny%{levels.Ranger<6?\' feature\':levels.Ranger<10?\' and Roving features\':\', Roving, and Tireless features\'}"',
  'Favored Foe':
    'Section=combat ' +
    'Note="Can mark a target with a successful attack for concentration up to 1 min %{proficiencyBonus} times per long rest; the first hit each rd on a marked foe inflicts +1d%{levels.Ranger<6?4:levels.Ranger<14?6:8} HP weapon damage"',
  // Fighting Style (Blind Fighting) as above
  'Fighting Style (Druidic Warrior)':
    'Section=magic,magic ' +
    'Note=' +
      '"Knows 2 D0 cantrips",' +
      '"Can replace a D0 cantrip when gaining a level"',
  // Fighting Style (Thrown Weapon Fighting) as above
  // Martial Versatility as above
  "Nature's Veil":
    'Section=magic ' +
    'Note="Can use a bonus action to become invisible for 1 rd %{proficiencyBonus} times per long rest"',
  'Primal Awareness':
    'Section=magic ' +
    'Note="Can cast %{levels.Ranger<17?\'\':\'<i>Commune With Nature</i>, \'}%{levels.Ranger<13?\'\':\'<i>Locate Creature</i>, \'}%{levels.Ranger<9?\'\':\'<i>Speak With Plants</i>, \'}%{levels.Ranger<5?\'\':\'<i>Beast Sense</i>\'}%{levels.Ranger<5?\'\':levels.Ranger<9?\' and \':\', and \'}<i>Speak With Animals</i> once%{levels.Ranger<5?\'\':\' each\'} per long rest" ' +
    'Spells=' +
      '"1:Speak With Animals",' +
       '"5:Beast Sense",' +
       '"9:Speak With Plants",' +
       '"13:Locate Creature",' +
       '"17:Commune With Nature"',
  'Roving':
    'Section=ability,ability ' +
    'Note=' +
      '"+5 Speed",' +
      '"Has a %{speed}\' climb Speed and a %{speed}\' swim Speed"',
  'Spellcasting Focus':
    'Section=magic Note="Can use a druidic focus for ranger spells"',
  'Tireless':
    'Section=combat ' +
    'Note="Can gain 1d8+%{wisdomModifier} temporary hit points %{proficiencyBonus} times per long rest, and a short rest reduces exhaustion by 1"',
  // Fey Wanderer
  'Beguiling Twist':
    'Section=combat,save ' +
    'Note=' +
      '"R120\' Can use a reaction to redirect a failed charm or fright effect to a different target for 1 min (save DC %{spellDifficultyClass.R} Wisdom ends)",' +
      '"Has advantage vs. charm and fright"',
  'Dreadful Strikes':
    'Section=combat ' +
    'Note="Can inflict +1d%{levels.Ranger<11?4:6} HP psychic with a weapon once per rd"',
  'Fey Reinforcements':
    'Section=magic ' +
    'Note="Can cast <i>Summon Fey</i>, optionally for 1 min instead of for concentration, once per long rest" ' +
    'Spells=' +
      '"Summon Fey"',
  'Fey Wanderer Magic':
    'Section=feature,magic ' +
    'Note=' +
      '"Fey association shows a minor physical effect",' +
      '"Knows the %{levels.Ranger<17?\'\':\'<i>Mislead</i>, \'}%{levels.Ranger<13?\'\':\'<i>Dimension Door</i>, \'}%{levels.Ranger<9?\'\':\'<i>Dispel Magic</i>, \'}%{levels.Ranger<5?\'\':\'<i>Misty Step<i>\'}%{levels.Ranger<5?\'\':levels.Ranger<9?\' and \':\', and \'}<i>Charm Person</i> spell%{levels.Ranger<5?\'\':\'s\'}" ' +
    'Spells=' +
      '"3:Charm Person",' +
      '"5:Misty Step",' +
      '"9:Dispel Magic",' +
      '"13:Dimension Door",' +
      '"17:Mislead"',
  'Misty Wanderer':
    'Section=magic ' +
    'Note="Can cast <i>Misty Step</i>, targeting self and 1 willing adjacent target, %{wisdomModifier>1?wisdomModifier+\' times\':\'once\'} per long rest" ' +
    'Spells=' +
      '"Misty Step"',
  'Otherworldly Glamour':
    'Section=ability,skill ' +
    'Note=' +
      '"+%{wisdomModifier>?1} Charisma checks",' +
      '"Skill Proficiency (Choose 1 from Deception, Performance, Persuasion)"',
  // Swarmkeeper
  'Gathered Swarm':
    'Section=combat ' +
    'Note="After 1 successful attack each rd, can move 5\', move the target 15\' (save DC %{spellDifficultyClass.R} Strength negates), or inflict +1d%{combatNotes.mightySwarm?8:6} HP piercing"',
  'Mighty Swarm':
    'Section=combat,combat ' +
    'Note=' +
      '"Gathered Swarm inflicts 1d8",' +
      '"Gathered Swarm gives half cover when moving self or knocks prone when moving foe"',
  'Swarming Dispersal':
    'Section=combat ' +
    'Note="Can use a reaction when hit to gain resistance to the damage and to teleport 30\' %{proficiencyBonus} times per long rest"',
  'Swarmkeeper Magic':
    'Section=magic ' +
    'Note=' +
      '"Knows the %{levels.Ranger<17?\'\':\'<i>Insect Plague</i>, \'}%{levels.Ranger<13?\'\':\'<i>Arcane Eye</i>, \'}%{levels.Ranger<9?\'\':\'<i>Gaseous Form</i>, \'}%{levels.Ranger<5?\'\':\'<i>Web</i>\'}%{levels.Ranger<5?\'\':levels.Ranger<9?\' and \':\', and \'}<i>Faerie Fire</i> spell%{levels.Ranger<5?\'\':\'s\'} and the <i>Mage Hand</i> cantrip" ' +
    'Spells=' +
      '"3:Faerie Fire,Mage Hand",' +
      '"5:Web",' +
      '"9:Gaseous Form",' +
      '"13:Arcane Eye",' +
      '"17:Insect Plague"',
  'Writhing Tide':
    'Section=ability ' +
    'Note="Can use a bonus action to gain a 10\' fly Speed and to hover for 1 min %{proficiencyBonus} times per long rest"',

  // Rogue
  'Steady Aim':
    'Section=combat ' +
    'Note="Can use a bonus action and forego move to gain advantage on an attack"',
  // Phantom
  "Death's Friend":
    'Section=combat,feature ' +
    'Note=' +
      '"Wails From The Grave also affects the Sneak Attack target",' +
      '"Has a minimum of 1 Soul Trinket available after a long rest"',
  'Ghost Walk':
    'Section=feature ' +
    'Note="Can use a bonus action to gain a 10\' fly Speed, impose disadvantage on foe attacks, and move through objects for 10 min once per long rest; can destroy Soul Trinkets for additional uses"',
  'Tokens Of The Departed':
    'Section=combat,feature,save ' +
    'Note=' +
      '"After a Sneak Attack hit, destroying a Soul Trinket gives an immediate Wails From The Grave use",' +
      '"Can create %{proficiencyBonus} Soul Trinkets from creatures that die within 30\'; can later destroy one to gain an answer to a question",' +
      '"Has advantage on Constitution and saves vs. death while in possession of a Soul Trinket"',
  'Wails From The Grave':
    'Section=combat ' +
    'Note="R30\' After a Sneak Attack hit, can inflict %{(levels.Rogue+1)//4}d6 HP necrotic on another target %{proficiencyBonus} times per long rest"',
  'Whispers Of The Dead':
    'Section=skill ' +
    'Note="Can gain proficiency in a choice of skill once per short rest"',
  // Soulknife
  'Homing Strikes':
    'Section=combat ' +
    'Note="Can add 1d%{combatNotes.psionicPower} to a failed Psychic Blade attack, spending a Psionic Energy die if the sum is enough to hit"',
  'Psi-Bolstered Knack':
    'Section=skill ' +
    'Note="Can add a Psionic Energy die roll to a failed proficient skill or tool check, spending the die only if the modified check succeeds"',
  // Psionic Power as above
  'Psychic Blades':
    'Section=combat ' +
    'Note="Can use a free hand to attack with a R60\' magic psychic blade, inflicting 1d6+%{strengthModifier>?dexterityModifier} HP psychic; if both hands are free, can use a bonus action for a second blade attack that inflicts 1d4+%{strengthModifier>?dexterityModifier}"',
  'Psychic Teleportation':
    'Section=combat ' +
    'Note="Can spend 1 Psionic Energy die and use a bonus action to teleport 1d%{combatNotes.psionicPower}x10\'"',
  'Psychic Veil':
    'Section=magic ' +
    'Note="Can become invisible for 1 hr once per long rest; inflicting damage or forcing a saving throw ends; can spend Psionic Energy dice for additional uses"',
  'Psychic Whispers':
    'Section=skill ' +
    'Note="Can establish telepathic communication within 1 mile with %{proficiencyBonus} visible creatures for 1d%{combatNotes.psionicPower} hr once per long rest; can spend Psionic Energy dice for additional uses"',
  'Rend Mind':
    'Section=combat ' +
    'Note="Can inflict stunned (save DC %{8+dexterityModifier+proficiencyBonus} Wisdom ends) for 1 min with a Psychic Blade Sneak Attack once per long rest; can spend 3 Psionic Energy dice per additional use"',
  'Soul Blades':
    'Section=feature ' +
    'Note="Has the Homing Strikes and Psychic Teleportation features"',

  // Sorcerer
  'Magical Guidance':
    'Section=ability ' +
    'Note="Can spend 1 Sorcery Point to reroll a failed ability check"',
  'Seeking Spell':
    'Section=magic ' +
    'Note="Can spend 2 Sorcery Points to reroll a missed spell attack"',
  'Sorcerous Versatility':
    'Section=feature ' +
    'Note="Can replace a Metamagic option or a cantrip when boosting an ability or taking a feat"',
  'Transmuted Spell':
    'Section=magic ' +
    'Note="Can spend 1 Sorcery Point to change an acid, cold, fire, lightning, poison, or thunder spell\'s damage type to another from that list"',
  // Aberrant Mind
  'Psionic Sorcery':
    'Section=magic ' +
    'Note="Can cast a spell using Sorcery Points equal to the spell level and no verbal or somatic components"',
  'Psionic Spells':
    'Section=magic ' +
    'Note="Can replace a Psionic Spells spell when gaining a Sorcerer level" ' +
    'Spells=' +
      '"1:Arms Of Hadar","1:Dissonant Whispers","1:Mind Sliver",' +
      '"3:Calm Emotions","3:Detect Thoughts",' +
      '"5:Hunger Of Hadar","5:Sending",' +
      '"7:Evard\'s Black Tentacles","7:Summon Aberration",' +
      '"9:Rary\'s Telepathic Bond","9:Telekinesis"',
  'Psychic Defenses':
    'Section=save ' +
    'Note="Has resistance to psychic damage and advantage vs. charm and fright"',
  'Revelation In Flesh':
    'Section=ability,feature ' +
    'Note=' +
      '"Can spend 1 Sorcery Point and use a bonus action to gain a %{speed}\' fly Speed, a %{speed*2}\' swim Speed and water breathing, or the ability to squeeze through a 1\\" space, for 10 min",' +
      '"Can spend 1 Sorcery Point and use a bonus action to see invisible creatures within 60\' for 10 min"',
  'Telepathic Speech':
    'Section=skill ' +
    'Note="R30\' Can use a bonus action to gain telepathic communication in a shared language while within %{charismaModifier>1?charismaModifier+\' miles\':\'1 mile\'} of the target for %{levels.Sorcerer} min"',
  'Warping Implosion':
    'Section=magic ' +
    'Note="Can teleport 120\'; the 30\' radius around the starting position inflicts 3d10 HP force and a 30\' pull (save Strength half HP only) once per long rest; can spend 5 Sorcery Points per additional use"',
  // Clockwork Soul
  'Bastion Of Law':
    'Section=magic ' +
    'Note="R30\' Can spend 1 - 5 Sorcery Points to negate an equal number of d8s HP damage to the target before the next use or long rest"',
  'Clockwork Cavalcade':
    'Section=magic ' +
    'Note="30\' cube restores 100 HP total among targets, repairs damaged objects, and dispels target spells up to 6th level once per long rest; can spend 7 Sorcery Points for each additional use"',
  'Clockwork Magic':
    'Section=feature,magic ' +
    'Note=' +
      '"Displays a physical manifestation of Clockwork Soul",' +
      '"Can replace a Clockwork Magic spell when gaining a Sorcerer level" ' +
    'Spells=' +
      '"1:Alarm","1:Protection From Evil And Good",' +
      '"3:Aid","3:Lesser Restoration",' +
      '"5:Dispel Magic","5:Protection From Energy",' +
      '"7:Freedom Of Movement","7:Summon Construct",' +
      '"9:Greater Restoration","9:Wall Of Force"',
  'Restore Balance':
    'Section=magic ' +
    'Note="R60\' Can cancel a target\'s advantage or disadvantage on a roll %{proficiencyBonus} times per long rest"',
  'Trance Of Order':
    'Section=combat,feature ' +
    'Note=' +
      '"Can use a bonus action to cancel advantage on attacks on self for 1 min once per long rest; can spend 5 Sorcery Points for each additional use",' +
      '"Can use a bonus action to score a minimum of 10 on attack, ability, and saving rolls for 1 min once per long rest; can spend 5 Sorcery Points for each additional use"',

  // Warlock
  'Bond Of The Talisman':
    'Section=magic ' +
    'Note="Self or talisman wearer can teleport to the other %{proficiencyBonus} times per long rest"',
  'Eldritch Mind':
    'Section=magic ' +
    'Note="Has advantage on Constitution saves to maintain concentration"',
  'Eldritch Versatility':
    'Section=magic ' +
    'Note="Can replace a cantrip%{levels.Warlock<12?\' or Pact Boon option\':\', Pact Boon option, or Mystic Arcanum spell\'} when boosting an ability or taking a feat"',
  'Far Scribe':
    'Section=magic ' +
    'Note="Can cast <i>Sending</i>, targeting one of %{proficiencyBonus} creatures who have written their names in the Book Of Shadows, without using a spell slot or material components" ' +
    'Spells=' +
      'Sending',
  'Gift Of The Protectors':
    'Section=magic ' +
    'Note="Creatures who have written their names in the Book Of Shadows retain 1 hit point when reduced to 0 hit points once per long rest"',
  'Investment Of The Chain Master':
    'Section=magic ' +
    'Note="Familiar gains a 40\' fly or swim Speed, gains magical attacks, and inflicts DC %{spellDifficultyClass.K} saves; self can use a bonus action to command it to attack and a reaction to give it resistance to damage"',
  'Pact Of The Talisman':
    'Section=magic ' +
    'Note="Talisman gives wearer +1d4 ability checks %{proficiencyBonus} times per long rest"',
  'Protection Of The Talisman':
    'Section=magic ' +
    'Note="Talisman wearer can add +1d4 to a failed save %{proficiencyBonus} times per long rest"',
  'Rebuke Of The Talisman':
    'Section=magic ' +
    'Note="R30\' When the talisman wearer takes damage, self can use a reaction to inflict %{proficiencyBonus} HP psychic and a 10\' push on the attacker"',
  'Undying Servitude':
    'Section=magic ' +
    'Note="Can cast <i>Animate Dead</i> once per long rest" ' +
    'Spells=' +
      '"Animate Dead"',
  // The Fathomless
  'Fathomless Plunge':
    'Section=magic ' +
    'Note="R30\' Can teleport self and 5 willing targets 1 mile to a known body of water once per short rest"',
  'Gift Of The Sea':
    'Section=ability Note="Has a 40\' swim Speed and can breathe water"',
  'Grasping Tentacles':
    'Section=magic ' +
    'Note="Can cast <i>Evard\'s Black Tentacles</i> with unbreakable concentration and gain %{levels.Warlock} temporary hit points once per long rest" ' +
    'Spells=' +
      '"Evard\'s Black Tentacles"',
  'Guardian Coil':
    'Section=magic ' +
    'Note="Can use a reaction to reduce damage taken within 10\' of Tentacle Of The Deeps by %{levels.Warlock<10?1:2}d8 HP"',
  'Oceanic Soul':
    'Section=save,skill ' +
    'Note=' +
      '"Has resistance to cold damage",' +
      '"While submerged, can understand and be understood by any speaking creature"',
  'Tentacle Of The Deeps':
    'Section=magic ' +
    'Note="R60\' Can use a bonus action to summon a 10\' tentacle that can move 30\' and inflicts %{levels.Warlock<10?1:2}d8 HP cold and -10 Speed once per rd for 1 min %{proficiencyBonus} times per long rest"',
  // The Genie
  'Elemental Gift':
    'Section=ability,save ' +
    'Note=' +
      '"Can use a bonus action to gain a 30\' fly Speed for 10 min %{proficiencyBonus} times per long rest",' +
      '"Has resistance to %{genieEnergy} damage"',
  "Genie's Vessel":
    'Section=combat ' +
    'Note=' +
      '"Can inflict +%{proficiencyBonus} HP %{genieEnergy} once per rd and retreat into a vessel with armor class %{spellDifficultyClass.K} and %{levels.Warlock+proficiencyBonus} hit points for %{proficiencyBonus*2} hr once per long rest"',
  'Limited Wish':
    'Section=magic ' +
    'Note="Can gain the effects of a 6th level, 1-action spell once per 1d4 long rests"',
  'Sanctuary Vessel':
    'Section=magic ' +
    'Note="R30\' Can take 5 willing creatures into Genie\'s Vessel; 10 min within gives the benefits of a short rest, and spending Hit Dice restores +%{proficiencyBonus} hit points"',

  // Wizard
  'Cantrip Formulas':
    'Section=magic Note="Can replace a W0 cantrip once per long rest"',
  // Bladesinging (ref SwordCoast)
  'Bladesong':
    'Section=ability,combat,feature,magic,skill ' +
    'Note=' +
      '"+10 Speed during Bladesong",' +
      '"+%{intelligenceModifier>?1} Armor Class during Bladesong",' +
      '"Can use a bonus action to gain Bladesong features for 1 min 2 times per short rest; medium armor, heavy armor, or a shield negates",' +
      '"+%{intelligenceModifier>?1} Constitution to retain spell concentration during Bladesong",' +
      '"Has advantage on Acrobatics during Bladesong"',
  // Extra Attack as SRD5E
  'Song Of Defense':
    'Section=combat ' +
    'Note="Can use a reaction and expend a spell slot during Bladesong to reduce damage to self by 5x the slot level"',
  'Song Of Victory':
    'Section=combat ' +
    'Note="+%{intelligenceModifier>?1} HP melee weapon damage during Bladesong"',
  'Training In War And Song':
    'Section=combat,skill ' +
    'Note=' +
      '"Armor Proficiency (Light)/Weapon Proficiency (Choose 1 from any One-Handed)",' +
      '"Skill Proficiency (Performance)"',
  // Order Of Scribes
  'Awakened Spellbook':
    'Section=magic ' +
    'Note="Held spellbook allows performing a ritual casting in the spell\'s normal casting time once per long rest, using the spellbook as a focus, and changing a spell\'s damage type when casting it"',
  'Manifest Mind':
    'Section=magic ' +
    'Note="R300\' Can use a bonus action to see with darkvision, hear, and cast spells %{proficiencyBonus} times through a ghostly object that emits 10\' dim light and can move 30\' per rd once per long rest; can spend spell slots for additional uses"',
  'Master Scrivener':
    'Section=magic ' +
    'Note="R5\' After a long rest, can create a scroll, usable only by self, for a 1-action, 1st or 2nd level spell from Awakened Spellbook; reading the scroll casts the spell at 1 level higher than normal/Wizardly Quill produces spell scrolls at 1/2 the normal time and cost"',
  'One With The Word':
    'Section=combat,skill ' +
    'Note=' +
      '"Upon taking damage when Manifest Mind is active, can use a reaction to negate the damage and remove 3d6 spell levels from Awakened Spellbook for 1d6 long rests once per long rest",' +
      '"Has advantage on Arcana"',
  'Wizardly Quill':
    'Section=magic ' +
    'Note="Can use a bonus action to create a quill that produces multicolored, erasable writing and copies spells at 2 min per level"',

  // Feats
  'Artificer Initiate':
    'Section=magic,skill ' +
    'Note=' +
      '"Knows 1 artificer cantrip and can cast a chosen A1 spell once per long rest",' +
      '"Tool Proficiency (Choose 1 from any Artisan)"',
  'Chef':
    'Section=ability,magic,skill ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Constitution, Wisdom)",' +
      '"Food prepared during a short rest adds 1d8 to hit points regained from using Hit Dice by %{proficiencyBonus+4} diners, and treats prepared during a long rest give %{proficiencyBonus} eaters %{proficiencyBonus} temporary hit points within 8 hr",' +
      '"Tool Proficiency (Cook\'s Utensils)"',
  'Crusher':
    'Section=ability,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Constitution, Strength)",' +
      '"Can move a foe up to 1 size larger 5\' with a bludgeoning hit once per rd, and a critical bludgeoning hit gives allies advantage on attacks on that foe for 1 rd"',
  'Eldritch Adept':
    'Section=magic,magic ' +
    'Note=' +
      '"Knows 1 Eldritch Invocation",' +
      '"Can replace Eldritch Invocation when gaining a level"',
  'Fey Touched':
    'Section=ability,magic ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Charisma, Intelligence, Wisdom)",' +
      '"Can cast <i>Misty Step</i> and a chosen level 1 divination or enchantment spell once per long rest" ' +
    'Spells=' +
      '"Misty Step"',
  'Fighting Initiate':
    'Section=combat,combat ' +
    'Note=' +
      '"Knows 1 Fighting Style",' +
      '"Can replace a Fighting Style when boosting an ability or taking a feat"',
  'Gunner':
    'Section=ability,combat,combat ' +
    'Note=' +
      '"+1 Dexterity",' +
      '"Weapon Proficiency (Firearms)",' +
      '"Loading does not slow firearm attacks, and being adjacent to a foe does not inflict disadvantage on ranged attacks"',
  'Metamagic Adept':
    'Section=magic,magic ' +
    'Note=' +
      '"Knows 2 Metamagic options and has 2 Sorcery Points",' +
      '"Can replace a Metamagic option when boosting an ability or taking a feat"',
  'Piercer':
    'Section=ability,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Strength, Dexterity)",' +
      '"Can reroll 1 piercing damage die once per rd and adds 1 die to piercing critical damage"',
  'Poisoner':
    'Section=combat,skill,skill ' +
    'Note=' +
      '"Attacks negate poison resistance/Can use a bonus action to coat a weapon with poison lasting 1 min that inflicts 2d8 HP poison and the poisoned condition (save DC 14 Constitution negates) for 1 rd",' +
      '"Tool Proficiency (Poisoner\'s Kit)",' +
      '"1 hr process using a Poisoner\'s Kit creates %{proficiencyBonus} poison doses"',
  'Shadow Touched':
    'Section=ability,magic ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Charisma, Intelligence, Wisdom)",' +
      '"Can cast <i>Invisibility</i> and a chosen level 1 illusion or necromancy spell once per long rest" ' +
    'Spells=' +
      'Invisibility',
  'Skill Expert':
    'Section=ability,skill,skill ' +
    'Note=' +
      '"Ability Boost (Choose 1 from any)",' +
      '"Skill Proficiency (Choose 1 from any)",' +
      '"+%{proficiencyBonus} on a chosen proficient skill"',
  'Slasher':
    'Section=ability,combat ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Strength, Dexterity)",' +
      '"Can inflict -10 Speed for 1 rd with a slashing attack, and a critical slashing hit inflicts disadvantage on the foe\'s attacks for 1 rd"',
  'Telekinetic':
    'Section=ability,combat,magic ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Charisma, Intelligence, Wisdom)",' +
      '"R30\' Can use a bonus action to move a target 5\' (save DC %{8+proficiencyBonus} + ability modifier Strength negates)",' +
      '"Knows the <i>Mage Hand</i> cantrip"',
    // Spells attribute left off--see featRulesExtra
  'Telepathic':
    'Section=ability,magic,skill ' +
    'Note=' +
      '"Ability Boost (Choose 1 from Charisma, Intelligence, Wisdom)",' +
      '"Can cast <i>Detect Thoughts</i> (DC %{8+proficiencyBonus} + ability modifier Wisdom negates) once per long rest",' +
      '"R60\' Can speak telepathically in a shared language"'
    // Spells attribute left off--see featRulesExtra

};
Tasha.SPELLS = {
  'Blade Of Disaster':
    'School=Conjuration ' +
    'Level=K9,S9,W9 ' +
    'Description="R60\' Self controls a rift blade that can move 30\' as a bonus action and attack 2 times per rd, inflicting 4d12 HP force x3@18 each, for concentration up to 1 min"',
  'Booming Blade': // ref SwordCoast
    'School=Evocation ' +
    'Level=A0,K0,S0,W0 ' +
    'Description="Struck foe suffers %{(level+7)//6}d8 HP thunder on its next move within 1 rd"',
  'Dream Of The Blue Veil':
    'School=Conjuration ' +
    'Level=B7,K7,S7,W7 ' +
    'Description="R20\' Self and 8 willing targets view another world for 6 hr, then teleport to it"',
  'Green-Flame Blade': // ref SwordCoast
    'School=Evocation ' +
    'Level=A0,K0,S0,W0 ' +
    'Description="Struck foe suffers +%{(level+1)//6}d8 HP fire, and an adjacent target suffers %{(level+1)//6}d8+%{mdf} HP fire"',
  'Intellect Fortress':
    'School=Abjuration ' +
    'Level=A3,B3,K3,S3,W3 ' +
    'AtHigherLevels="affects +1 target" ' +
    'Description="R30\' Willing target gains resistance to psychic damage and advantage on Intelligence, Wisdom, and Charisma saves for concentration up to 1 hr"',
  'Lightning Lure': // ref SwordCoast
    'School=Evocation ' +
    'Level=A0,K0,S0,W0 ' +
    'Description="R15\' Pulls the target 10\' and inflicts %{(level+5)//6}d8 HP lightning if this brings it to within 5\' (save Strength negates)"',
  'Mind Sliver':
    'School=Enchantment ' +
    'Level=K0,S0,W0 ' +
    'Description="R60\' Inflicts %{(level+7)//6}d6 HP psychic and -1d4 on the target\'s next save within 1 rd (save Intelligence negates)"',
  'Spirit Shroud':
    'School=Necromancy ' +
    'Level=C3,K3,P3,W3 ' +
    'AtHigherLevels="inflicts +1d8 HP per 2 levels" ' +
    'Description="R10\' Self hits inflict +1d8 HP of a choice of radiant, necrotic, or cold, and 1 target per rd suffers -10 Speed for 1 rd, for concentration up to 1 min"',
  'Summon Aberration':
    'School=Conjuration ' +
    'Level=K4,W4 ' +
    'AtHigherLevels="increases the armor class by 1, hit points by 10, and attack damage by 1" ' +
    'Description="R90\' Summons an obedient aberrant spirit (armor class 15; 40 hit points; move 30\'; multiattack equal to half the spell level) of type beholderkin (R150\' inflicts 1d8+7 HP psychic; fly 30\'), slaad (inflicts 1d10+7 HP slashing and negates healing for 1 rd; regenerates 5 hit points per rd), or star spawn (inflicts 1d8+7 HP psychic, plus 2d6 HP psychic (save Wisdom negates) in a 5\' radius) for concentration up to 1 hr"',
  'Summon Beast':
    'School=Conjuration ' +
    'Level=D2,R2 ' +
    'AtHigherLevels="increases the armor class by 1, hit points by 5, and attack damage by 1" ' +
    'Description="R90\' Summons an obedient bestial spirit (armor class 13; multiattack equal to half the spell level; inflicts 1d8+6 piercing) of air (20 hit points; fly 60\'; does not provoke opportunity attacks when flying out of reach), land (30 hit points; move and climb 30\'; has advantage on attacks when within 5\' of an ally), or water (30 hit points; swim 30\'; water-breathing; has advantage on attacks when within 5\' of an ally) for concentration up to 1 hr"',
  'Summon Celestial':
    'School=Conjuration ' +
    'Level=C5,P5 ' +
    'AtHigherLevels="increases the armor class by 1, hit points by 10, attack damage by 1, and healing by 1" ' +
    'Description="R90\' Summons an obedient celestial spirit (40 hit points; move 30\' and fly 40\'; multiattack equal to half the spell level; touch restores 2d8+5 hit points once per day) of type avenger (armor class 16; R150\' inflicts 2d6+7 HP radiant) or defender (armor class 18; inflicts 1d10+8 HP radiant and gives 1d10 temporary hit points to a creature within 10\') for concentration up to 1 hr"',
  'Summon Construct':
    'School=Conjuration ' +
    'Level=A4,W4 ' +
    'AtHigherLevels="increases the armor class by 1, hit points by 15, and attack damage by 1" ' +
    'Description="R90\' Summons an obedient construct spirit (armor class 17; 40 hit points; move 30\'; multiattack equal to half the spell level; slam inflicts 1d8+8) of clay (attacks an adjacent creature or moves 15\' as a reaction to damage), metal (inflicts 1d10 HP fire on adjacent melee attackers), or stone (can inflict half Speed and loss of reactions (save Wisdom negates) on creatures within 10\') for concentration up to 1 hr"',
  'Summon Elemental':
    'School=Conjuration ' +
    'Level=D4,"K4 [The Fathomless]",R4,W4 ' +
    'AtHigherLevels="increases the armor class by 1, hit points by 10, and attack damage by 1" ' +
    'Description="R90\' Summons an obedient elemental spirit (armor class 15; 50 hit points; move 40\'; multiattack equal to half the spell level; slam inflicts 1d10+8 HP fire or bludgeoning) of air (fly 40\'; can move through a 1\\" gap without squeezing), earth (burrow 40\'), fire (can move through a 1\\" gap without squeezing), or water (swim 40\'; can move through a 1\\" gap without squeezing) for concentration up to 1 hr"',
  'Summon Fey':
    'School=Conjuration ' +
    'Level=D3,K3,R3,W3 ' +
    'AtHigherLevels="increases the armor class by 1, hit points by 10, and piercing damage by 1" ' +
    'Description="R90\' Summons an obedient fey spirit (armor class 15; 30 hit points; move 40\' and can teleport 30\'; multiattack equal to half the spell level; short sword inflicts 1d6+6 HP piercing plus 1d6 force), of type fuming (has advantage on the next attack in the same turn after teleporting), mirthful (can charm 1 creature (save Wisdom negates) within 10\' after teleporting), or tricksy (can create darkness in a 5\' cube for 1 rd after teleporting) for concentration up to 1 hr"',
  'Summon Fiend':
    'School=Conjuration ' +
    'Level=K6,W6 ' +
    'AtHigherLevels="increases the armor class by 1, hit points by 15, and damage by 1" ' +
    'Description="R90\' Summons an obedient fiendish spirit (armor class 18; move 40\'; multiattack equal to half the spell level) of type demon (50 hit points; climb 40\'; bite inflicts 1d12+9 HP necrotic; death or end of spell inflicts 2d10+6 HP fire (save Dexterity half) in a 10\' radius), devil (40 hit points; fly 60\'; R150\' flame inflicts 2d6+9 fire) or yugoloth (60 hit points; claws inflict 1d8+9 slashing and allow teleporting 30\' afterward) for concentration up to 1 hr"',
  'Summon Shadowspawn':
    'School=Conjuration ' +
    'Level=K3,W3 ' +
    'AtHigherLevels="increases the armor class by 1, hit points by 15, and attack damage by 1" ' +
    'Description="R90\' Summons an obedient shadow spirit (armor class 14; 35 hit points; move 40\'; multiattack equal to half the spell level; inflicts 1d12+6 cold; R30\' scream inflicts frightened (save Wisdom ends) once per day) of type fury (has advantage when attacking frightened foes), despair (R5\' inflicts -20 Speed), or fear (uses a bonus action to hide in dim light or darkness) for concentration up to 1 hr"',
  'Summon Undead':
    'School=Necromancy ' +
    'Level=K3,W3 ' +
    'AtHigherLevels="increases the armor class by 1, hit points by 10, and attack damage by 1" ' +
    'Description="R90\' Summons an obedient undead spirit (armor class 14; move 30\'; multiattack equal to half the spell level) of type ghostly (30 hit points; fly 40\'; moves through creatures and objects; inflicts 1d8+6 HP necrotic and frightened (save Wisdom HP only)), putrid (30 hit points; R5\' aura inflicts poisoned (save Constitution negates) for 1 rd; inflicts 1d6+6 slashing, plus paralysis (save Constitution HP negates) for 1 rd on a poisoned target), or skeletal (20 hit points; R150\' inflicts 2d4+6 HP necrotic) for concentration up to 1 hr"',
  'Sword Burst': // ref SwordCoast
    'School=Conjuration ' +
    'Level=K0,S0,W0 ' +
    'Description="5\' radius inflicts %{(level+7)//6}d6 HP force (save Dexterity negates)"',
  "Tasha's Caustic Brew":
    'School=Evocation ' +
    'Level=A1,S1,W1 ' +
    'AtHigherLevels="inflicts +2d4 HP" ' +
    'Description="30\'x5\' line inflicts 2d4 HP acid per rd for concentration up to 1 min (save Dexterity negates; removing the acid ends)"',
  "Tasha's Mind Whip":
    'School=Enchantment ' +
    'Level=S2,W2 ' +
    'AtHigherLevels="affects +1 target" ' +
    'Description="R90\' Inflicts 3d6 HP psychic, loss of reactions, and only 1 choice of a move, action, or bonus action for 1 rd (save Intelligence half HP only)"',
  "Tasha's Otherworldly Guise":
    'School=Transmutation ' +
    'Level=K6,S6,W6 ' +
    'Description="Self gains immunity either to fire, poison, and the poisoned condition or to radiant, necrotic, and the charmed condition, a 40\' fly Speed, +2 armor class, and 2 magical weapon attacks per rd using the spell attack modifier in place of Strength or Dexterity for concentration up to 1 min"'
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
  'Fireball':'A3,"K3 [Efreeti]"',
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
  Object.assign(Tasha.SPELLS_LEVELS_ADDED, {
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
    // Delete existing definitions to avoid change warnings
    let school = QuilvynUtils.getAttrValue(defn, 'School').substring(0, 4);
    QuilvynUtils.getAttrValueArray(defn, 'Level').forEach(l => {
      delete rules.choices.spells[s + '(' + l + ' ' + school + ')'];
    });
    rules.choiceRules(rules, 'Spell', s, defn.replace('Level=', 'Level=' + spellsLevels[s] + ','));
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
    // (ref SwordCoast)
    rules.defineRule('armorerLevel',
      'features.Armorer', '?', null,
      'level', '=', null
    );
    rules.defineRule('battleSmithLevel',
      'features.Battle Smith', '?', null,
      'level', '=', null
    );
    rules.defineRule('combatNotes.arcaneJolt',
      'combatNotes.improvedDefender', '+', 'null' // italics
    );
    rules.defineRule('combatNotes.eldritchCannon',
      'combatNotes.explosiveCannon', '+', 'null' // italics
    );
    rules.defineRule('combatNotes.extraAttack',
      'armorerLevel', '+=', 'source>=5 ? 1 : null',
      'battleSmithLevel', '+=', 'source>=5 ? 1 : null'
    );
    rules.defineRule('magicNotes.infuseItem',
      'magicNotes.armorModifications', '+', 'null' // italics
    );
    rules.defineRule('magicNotes.magicItemAdept',
      'magicNotes.magicItemMaster', '+', 'null', // italics
      'magicNotes.magicItemSavant', '+', 'null' // italics
    );
    rules.defineRule('magicNotes.spellcasting.1', classLevel, '=', '1');
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
      ('magicNotes.potentSpellcasting.1', 'wisdomModifier', '=', null);
    rules.defineRule('magicNotes.harnessDivinePower',
      'levels.Cleric', '+=', 'source<6 ? 1 : source<18 ? 2 : 3'
    );
    // SRD5E.classRulesExtra removes the domain requirement for None clerics
    SRD5E.classRulesExtra(rules, 'Cleric');
  } else if(name == 'Druid') {
    rules.defineRule('magicNotes.starryForm',
      'magicNotes.twinklingConstellations', '+', 'null' // italics
    );
  } else if(name == 'Fighter') {
    rules.defineRule('combatNotes.cloudRune',
      'combatNotes.masterOfRunes', '+', 'null' // italics
    );
    rules.defineRule('combatNotes.combatSuperiority',
      'combatNotes.fightingStyle(SuperiorTechnique)', '+=', '1'
    );
    rules.defineRule('combatNotes.combatSuperiority.1',
      'combatNotes.fightingStyle(SuperiorTechnique)', '^=', '6'
    );
    rules.defineRule('combatNotes.combatSuperiority.2',
      'combatNotes.fightingStyle(SuperiorTechnique)', '+=', '1'
    );
    rules.defineRule("combatNotes.giant'sMight",
      'combatNotes.greatStature', '+', 'null', // italics
      'combatNotes.runicJuggernaut', '+', 'null' // italics
    );
    rules.defineRule('combatNotes.psionicPower',
      classLevel, '=', 'source<5 ? 6 : source<11 ? 8 : source<17 ? 10 : 12'
    );
    rules.defineRule('featureNotes.runeCarver',
      classLevel, '=', 'source<7 ? 2 : source<10 ? 3 : source<15 ? 4 : 5'
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
    rules.defineRule('selectableFeatureCount.Fighter (Rune)',
      'featureNotes.runeCarver', '=', null
    );
  } else if(name == 'Paladin') {
    rules.defineRule('magicNotes.harnessDivinePower',
      'levels.Paladin', '+=', 'source<7 ? 1 : source<15 ? 2 : 3'
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
    rules.defineRule('combatNotes.gatheredSwarm',
      'combatNotes.mightySwarm', '+', 'null' // italics
    );
    rules.defineRule('skillNotes.canny',
      'featureNotes.deftExplorer', '+', 'null' // italics
    );
    rules.defineRule
      ('spellSlots.D0', 'magicNotes.fightingStyle(DruidicWarrior)', '+=', '2');
    rules.defineRule
      ('casterLevels.D', 'magicNotes.fightingStyle(DruidicWarrior)', '^=', '1');
  } else if(name == 'Rogue') {
    rules.defineRule('combatNotes.psionicPower',
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
      'combatNotes.fightingInitiate', '+=', '1'
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
      'magicNotes.metamagicAdept', '+=', '2'
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
