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
    rules, Tasha.CLASSES_SELECTABLES_ADDED, Tasha.DEITIES_DOMAINS_ADDED,
    Tasha.PATHS
  );
  SRD5E.magicRules(rules, {}, Tasha.SPELLS);
  Tasha.magicRules(rules, Tasha.SPELLS_LEVELS_ADDED);
  SRD5E.talentRules(rules, Tasha.FEATS, Tasha.FEATURES, {}, {}, {}, {});

}

Tasha.VERSION = '2.2.1.0';

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
    '"3:Psi Warrior:Martial Archetype",' +
    '"3:Rune Knight:Martial Archetype"',
  'Monk':
    '"3:Way Of Mercy:Monastic Tradition",' +
    '"3:Way Of The Astral Self:Monastic Tradition"',
  'Paladin':
    '"3:Oath Of Glory:Sacred Oath",' +
    '"3:Oath Of The Watchers:Sacred Oath"',
  'Ranger':
    '"3:Fey Wanderer:Ranger Archetype",' +
    '"3:Swarmkeeper:Ranger Archetype"',
  'Rogue':
    '"3:Phantom:Roguish Archetype",' +
    '"3:Soul Knife:Roguish Archetype"',
  'Sorcerer':
    '"1:Aberrant Mind:Sorcerous Origin",' +
    '"1:Clockwork Soul:Sorcerous Origin"',
  'Warlock':
    '"1:Fathomless:Otherworldly Patron",' +
    '"1:The Genie:Otherworldly Patron"',
  'Wizard':
    '"2:Bladesinger:Arcane Tradition",' +
    '"2:Order Of Scribes:Arcane Tradition"'
};
Tasha.DEITIES_DOMAINS_ADDED = {
  'Eberron-Aureon':'Order',
  'FR-Bane':'Order',
  'Dragonlance-Majere':'Order',
  'Greyhawk-Pholtus':'Order',
  'FR-Tyr':'Order',
  'Greyhawk-Wee Jas':'Order',
  'NH-Angharradh':'Peace',
  'NH-Berronar Truesilver':'Peace',
  'Eberron-Boldrei':'Peace,Twilight',
  'NH-Cyrrollalee':'Peace',
  'FR-Eldath':'Peace',
  'NH-Gaerdal Ironhand':'Peace',
  'Dragonlance-Paladine':'Peace',
  'Greyhawk-Rao':'Peace',
  'Greyhawk-Celestian':'Twilight',
  'Eberron-Dol Arrah':'Twilight',
  'FR-Helm':'Twilight',
  'FR-Ilmater':'Twilight',
  'Dragonlance-Mishalkal':'Twilight',
  'FR-Selune':'Twilight',
  'NH-Yondalla':'Twilight'
};
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
  'Silver Tongue':
    'Section=skill Note="Min 10 roll on Deception and Persuasion"',
  'Song Of Defense':
    'Section=magic Note="Expend spell slot to reduce damage by 5x slot level"',
  'Song Of Victory':'Section=combat Note="+%V damage for 1 min 2/short rest"',
  'Telepathic Speech':
    'Section=feature ' +
    'Note="R30\' Communicate telepatically w/target for %{levels.Sorcerer} min"',
  'Training In War And Song':
    'Section=combat,skill ' +
    'Note=' +
      '"Armor Proficiency (Light)/Weapon Proficiency (Choose 1 from any)",' +
      '"Skill Proficiency (Performance)"',
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
  'Aid':'Peace2',
  'Alarm':'Watchers1',
  'Animate Dead':'Spores3',
  'Aura Of Life':'Twilight4,Wildfire4',
  'Aura Of Purity':'Peace4,Watchers4',
  'Aura Of Vitality':'Twilight3',
  'Banishment':'Watchers4',
  'Beacon Of Hope':'Peace3',
  'Blight':'Spores4',
  'Blindness/Deafness':'Spores2',
  'Burning Hands':'Wildfire1',
  'Chill Touch':'Spores1',
  'Circle Of Power':'Twilight5',
  'Cloudkill':'Spores5',
  'Command':'Order1',
  'Commune':'Glory5,Order5',
  'Compulsion':'Glory4,Order4',
  'Confusion':'Spores4',
  'Contagion':'Spores5',
  'Counterspell':'Watchers3',
  'Cure Wounds':'Wildfire1',
  'Detect Magic':'Watchers1',
  'Dominate Person':'Order5',
  'Enhance Ability':'Glory2',
  'Faerie Fire':'Twilight1',
  'Fire Shield':'Wildfire4',
  'Flame Strike':'Glory5,Wildfire5',
  'Flaming Sphere':'Wildfire2',
  'Freedom Of Movement':'Glory4',
  'Gaseous Form':'Spores3',
  'Gentle Repose':'Spores2',
  'Greater Invisibility':'Twilight4',
  'Greater Restoration':'Peace5',
  'Guiding Bolt':'Glory1',
  'Haste':'Glory3',
  'Heroism':'Glory1,Order1,Peace1',
  'Hold Monster':'Watchers5',
  'Hold Person':'Order2',
  "Leomund's Tiny Hut":'Twilight3',
  'Locate Creature':'Order4',
  'Magic Weapon':'Glory2',
  'Mass Cure Wounds':'Wildfire5',
  'Mass Healing Word':'Order3',
  'Mislead':'Twilight5',
  'Moonbeam':'Twilight2,Watchers2',
  'Nondetection':'Watchers3',
  "Otiluke's Resilient Sphere":'Peace4',
  'Plant Growth':'Wildfire3',
  'Protection From Energy':'Glory3',
  "Rary's Telepathic Bond":'Peace5',
  'Revivify':'Wildfire3',
  'Sanctuary':'Peace1',
  'Scorching Ray':'Wildfire2',
  'Scrying':'Watchers5',
  'See Invisibility':'Twilight2,Watchers2',
  'Sending':'Peace3',
  'Sleep':'Twilight1',
  'Slow':'Order3',
  'Warding Bond':'Peace2',
  'Zone Of Truth':'Order2',
};

/* Defines rules related to basic character identity. */
Tasha.identityRules = function(
  rules, classSelectables, deitiesDomains, paths
) {

  QuilvynUtils.checkAttrTable
    (paths, ['Features', 'Selectables', 'Group', 'Level', 'SpellAbility', 'SpellSlots', 'Spells']);

  for(var clas in classSelectables) {
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
    if(!PHB5E.SPELLS[s]) {
      console.log('Unknown spell "' + s + '"');
      continue;
    }
    rules.choiceRules
      (rules, 'Spell', s, PHB5E.SPELLS[s] + ' Level=' + spellsLevels[s]);
  }
};

/* Defines the rules related to character classes. */
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
