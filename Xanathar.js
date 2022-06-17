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
 * PATHS, etc.) can be manipulated to modify the choices.
 */
function Xanathar(edition, rules) {

  if(window.PHB5E == null) {
    alert('The Xanathar module requires use of the PHB5E module');
    return;
  }

  if(rules == null)
    rules = PHB5E.rules;
  Xanathar.identityRules(
    rules, Xanathar.CLASSES_SELECTABLES_ADDED, Xanathar.DEITIES_DOMAINS_ADDED,
    Xanathar.PATHS
  );
  Xanathar.magicRules(rules, Xanathar.SPELLS, Xanathar.SPELLS_LEVELS_ADDED);
  Xanathar.talentRules
    (rules, Xanathar.FEATS, Xanathar.FEATURES, Xanathar.TOOLS_ADDED);

}

Xanathar.VERSION = '2.3.1.1';

Xanathar.CLASSES_SELECTABLES_ADDED = {
  'Barbarian':
    '"3:Path Of The Ancestral Guardian:Primal Path",' +
    '"3:Path Of The Storm Herald:Primal Path",' +
    '"3:Path Of The Zealot:Primal Path"',
  'Bard':
    '"3:College Of Glamour:Bard College",' +
    '"3:College Of Swords:Bard College",' +
    '"3:College Of Whispers:Bard College"',
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
    '"3:Oath Of Conquest:Sacred Oath","3:Oath Of Redemption:Sacred Oath"',
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
    '"2:War Magic:Arcane Tradition"'
};
Xanathar.DEITIES_DOMAINS_ADDED = {
  'None':'Forge,Grave',
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
  'Dragon Fear':'Type=General Require="race == \'Dragonborn\'"',
  'Dragon Hide':'Type=General Require="race == \'Dragonborn\'"',
  'Drow High Magic':'Type=General Require="race == \'Dark Elf\'"',
  'Dwarven Fortitude':'Type=General Require="race =~ \'Dwarf\'"',
  'Elven Accuracy':'Type=General Require="race =~ \'Elf\'"',
  'Fade Away':'Type=General Require="race =~ \'Gnome\'"',
  'Fey Teleportation':'Type=General Require="race == \'High Elf\'"',
  'Flames Of Phlegethos':'Type=General Require="race == \'Tiefling\'"',
  'Infernal Constitution':'Type=General Require="race == \'Tiefling\'"',
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
    'Note="Raise slain humanoid as obedient specter w/%V temporary HP, +%1 attack until long rest 1/long rest"',
  'Agile Parry':
    'Section=combat ' +
    'Note="+2 AC for 1 rd after unarmed attack if armed w/a Kensei melee weapon"',
  'Ambush Master':
    'Section=combat ' +
    'Note="Adv on Initiative, allies gain Adv on attacks on foe struck in first turn for 1 rd"',
  'Ancestral Protectors':
    'Section=combat ' +
    'Note="First foe struck during rage hindered fighting others (Disadv on attack, target has resistance to damage) for 1 rd"',
  'Arcane Archer Lore':
    'Section=magic,skill ' +
    'Note="Know <i>Druidcraft</i> or <i>Prestidigitation</i> cantrip",' +
         '"Skill Proficiency (Choose 1 from Arcana, Nature)"',
  'Arcane Deflection':
    'Section=magic ' +
    'Note="When hit, use Reaction to trade 1 rd non-cantrip casting for +2 AC or +4 save"',
  'Arcane Shot':'Section=combat Note="Use 1 of %V effects 1/rd 2/short rest"',
  'Armor Of Hexes':
    'Section=combat ' +
    'Note="50% chance to force Hexblade\'s Curse target attack to miss self"',
  "Artisan's Blessing":
    'Section=magic ' +
    'Note="Use Channel Divinity to craft up to 100 GP metal item in 1 hr"',
  'Aspect Of The Moon':
    'Section=save Note="Immunity to sleep, no need for normal sleep"',
  'Aura Of Conquest':
    'Section=magic Note="R%V\' Frightened foes unable to move"',
  'Aura Of The Guardian':
    'Section=magic ' +
    'Note="R%V\' Use Reaction to transfer damage from other to self"',
  'Balm Of The Summer Court':
    'Section=magic ' +
    'Note="R120\' Distribute %Vd6 HP healing and %V temporary HP to targets 1/long rest"',
  'Banishing Arrow':
    'Section=combat ' +
    'Note="Arrow inflicts +%Vd6 HP force and sends target to Feywild (DC %1 Cha neg) for 1 rd"',
  'Beguiling Arrow':
    'Section=combat ' +
    'Note="Arrow inflicts +%Vd6 HP psychic, target charmed by ally w/in 30\' (DC %1 Wis neg)"',
  'Blade Flourish':
    'Section=combat Note="Gain +10\' move and use flourish during attack 1/rd"',
  'Blessing Of The Forge':
    'Section=magic ' +
    'Note="Touched weapon or armor gains +1 bonus until long rest 1/long rest"',
  'Bonus Celestial Cantrips':
    'Section=magic Note="Know <i>Light</i> and <i>Sacred Flame</i> cantrips"',
  'Born To The Saddle':
    'Section=skill ' +
    'Note="Adv on saves vs. falling off mount, land on feet after 10\' fall from mount, dis/mount costs 5\' move"',
  'Bursting Arrow':
    'Section=combat Note="Arrow inflicts +%Vd6 HP force damage in 10\' radius"',
  'Cavalier Bonus Proficiency':
    'Section=skill ' +
    // TODO choice of skill proficiency or language
    'Note="Skill Proficiency (Choose 1 from Animal Handling, History, Insight, Performance, Persuasion)"',
  'Celestial Radiance':
    'Section=save Note="Resistance to necrotic, radiant damage"',
  'Celestial Resilience':
    'Section=magic ' +
    'Note="Self gains %V temporary HP, 5 others gain %1 temporary HP 1/short rest"',
  'Circle Of Mortality':
    'Section=magic ' +
    'Note="Cure spells maximized for HP 0 targets, cast R30\' <i>Spare The Dying</i>"',
  'Cloak Of Flies':
    'Section=magic,skill ' +
    'Note="R5\' %V HP poison damage 1/short rest",' +
         '"Gain Adv on Intimidate, R5\' inflict %{charismaModifier} HP poison, suffer Disadv other Cha 1/short rest"',
  'Conquering Presence':
    'Section=magic ' +
    'Note="R30\' Use Channel Divinity to frighten targets for 1 min (DC %V Wis neg)"',
  'Consult The Spirits':
    'Section=magic ' +
    'Note="Cast <i>Augury</i> or <i>Clairvoyance</i> via spirits 1/short rest"',
  'Curving Shot':
    'Section=combat ' +
    'Note="Redirect magic arrow miss to other target w/in 60\'"',
  'Defensive Flourish':
    'Section=combat ' +
    'Note="Spend 1 Bardic Inspiration to inflict +1d%V damage and gain +1d%V AC for 1 rd"',
  'Deflecting Shroud':
    'Section=magic ' +
    'Note="R60\' Arcane Deflection strikes 3 targets with %V HP force"',
  'Deft Strike':
    'Section=combat ' +
    'Note="Spend 1 Ki Point to inflict +%V damage with Kensei weapon 1/rd"',
  'Detect Portal':
    'Section=magic Note="R1 mile Sense planar portal 1/short rest"',
  'Distant Strike':
    'Section=combat ' +
    'Note="Teleport 10\' before attack, attack 3 different creatures"',
  'Divine Fury':
    'Section=combat ' +
    'Note="First hit during each turn during rage inflicts +1d6+%V HP necrotic or radiant"',
  'Divine Magic':'Section=magic Note="Access to Cleric spells"',
  'Dread Ambusher':
    'Section=combat Note="+%V Initiative/+10\' Speed and additional weapon attack w/+1d8 HP weapon damage on first turn"',
  "Drunkard's Luck":
    'Section=feature ' +
    'Note="Spend 2 Ki Points to cancel Disadv on ability, attack, or save roll"',
  'Drunken Master Bonus Proficiencies':
    'Section=skill ' +
    'Note="Skill Proficiency (Performance)/Tool Proficiency (Brewer\'s Supplies)"',
  'Drunken Technique':
    'Section=combat ' +
    'Note="Disengage and gain +10\' Speed during Flurry Of Blows"',
  'Durable Magic':
    'Section=combat,save ' +
    'Note="+2 AC during spell conc","+2 saves during spell conc"',
  'Ear For Deceit':'Section=skill Note="Minimum 8 on Insight checks"',
  'Eldritch Smite':
    'Section=combat ' +
    'Note="Spend spell slot to inflict +(slot level + 1)d8 HP force w/pact weapon and knock prone"',
  'Elegant Courtier':
    'Section=save,skill ' +
    // TODO Choice of Int, Cha if already has Wis
    'Note="Save Proficiency (Wisdom)","+%V Persuasion"',
  'Elegant Maneuver':
    'Section=skill Note="Bonus action for Adv on Acrobatics or Athletics"',
  'Emissary Of Peace':
    'Section=skill Note="Use Channel Energy to gain +5 Persuasion for 10 min"',
  'Emissary Of Redemption':
    'Section=combat,save ' +
    'Note="When not attacking, successful attacker takes radiant damage equal to half inflicted",' +
         '"Resistance to all attack damage when not attacking"',
  'Empowered Healing':
    'Section=magic Note="R5\' Spend 1 Sorcery Point to reroll self or ally healing 1/rd"',
  'Enfeebling Arrow':
    'Section=combat ' +
    'Note="Arrow inflicts +%Vd6 HP necrotic damage and half damage on attacks by target (DC %1 Con neg) for 1 rd"',
  'Enthralling Performance':
    'Section=magic ' +
    'Note="R60\' 1 min performance charms %V listeners (DC %1 Will neg) for 1 hr 1/short rest"',
  'Ethereal Step':
    'Section=magic Note="Self becomes ethereal until end of turn 1/short rest"',
  'Ever-Ready Shot':
    'Section=combat Note="Minimum 1 Arcane Shot use after initiative"',
  'Eye For Detail':
    'Section=skill ' +
    'Note="Bonus Perception check to spot hidden item or Investigation to uncover clue"',
  'Eye For Weakness':
    'Section=combat Note="+3d6 HP Sneak Attack during Insightful Fighting"',
  'Eyes Of The Dark':
    'Section=feature,magic ' +
    'Note="R120\' See normally in darkness",' +
         '"Cast <i>Darkness</i> using spell slot or 2 Sorcery Points"',
  'Eyes Of The Grave':
    'Section=magic Note="R60\' Detect undead for 1 rd %V/long rest"',
  'Faithful Summons':
    'Section=magic ' +
    'Note="Automatically summons 4 creatures to protect for 1 hr when self incapacitated 1/long rest"',
  'Fanatical Focus':'Section=save Note="Reroll failed save 1/rage"',
  'Fancy Footwork':
    'Section=combat Note="Attacked foe cannot make OA against self for 1 rd"',
  'Favored By The Gods':
    'Section=feature Note="Add 2d4 to failed attack or save 1/short rest"',
  'Ferocious Charger':
    'Section=combat ' +
    'Note="Hit after 10\' move knocks foe prone 1/rd (DC %V Str neg)"',
  'Fighting Spirit':
    'Section=combat ' +
    'Note="Gain Adv on attacks and %V temporary HP for 1 tn 3/long rest"',
  'Forge Bonus Proficiencies':
    'Section=feature ' +
    'Note="Armor Proficiency (Heavy)/Tool Proficiency (Smith\'s Tools)"',
  'Ghostly Gaze':
    'Section=magic ' +
    'Note="See 30\' through solid objects for conc or 1 min 1/short rest"',
  'Gift Of The Depths':
    'Section=ability,feature,magic ' +
    'Note="%V\' Swim",' +
         '"Breathe water",' +
         '"Cast <i>Water Breathing</i> 1/long rest"',
  'Gift Of The Ever-Living Ones':
    'Section=combat Note="Maximum healing w/in 100\' of familiar"',
  'Grasp Of Hadar':
    'Section=magic Note="<i>Eldritch Blast</i> pulls target 10\'"',
  'Grasping Arrow':
    'Section=combat ' +
    'Note="Arrow inflicts +%Vd6 HP poison damage and -10\' Speed and %Vd6 HP slashing/rd for 1 min (DC %1 Athletics check ends)"',
  'Guardian Spirit':
    'Section=magic ' +
    'Note="Summoned creatures in Spirit Totem aura regain %V HP each rd"',
  'Heart Of The Storm':
    'Section=magic,save ' +
    'Note="R10\' Targets suffer %V HP lightning or thunder when self casts lightning or thunder spell",' +
         '"Resistance to lightning and thunder damage"',
  'Hearth Of Moonlight And Shadow':
    'Section=magic ' +
    'Note="30\' radius gives total cover and +5 Stealth and Perception during rest"',
  'Healing Light':
    'Section=magic Note="R60\' Heal %Vd6 HP/long rest, %1d6/heal"',
  'Hex Warrior':
    'Section=combat,feature ' +
    'Note="+%V attack and damage (Cha instead of Str) w/touched weapon until long rest 1/long rest",' +
         '"Armor Proficiency (Medium/Shield)/Weapon Proficiency (Martial)"',
  "Hexblade's Curse":
    'Section=magic ' +
    'Note="R30\' Self +%V damage and crit on 19 vs. target, regain %1 HP if target dies for 1 min 1/short rest"',
  'Hidden Paths':
    'Section=magic ' +
    'Note="Teleport self 60\' or willing touched 30\' %V/long rest"',
  'Hold The Line':
    'Section=combat Note="R5\' Foe move provokes OA; hit negates move"',
  'Hound Of Ill Omen':
    'Section=combat Note="R120\' Spend 3 Sorcery Points to summon hound to attack target as dire wolf w/%V temporary HP, moving through obstacles, for 5 min or until reduced to 0 HP"',
  "Hunter's Sense":
    'Section=combat ' +
    'Note="R60\' Sense immunities, resistances, and vulnerabilities of target %V/long rest"',
  'Improved Pact Weapon':
    'Section=combat ' +
    'Note="Bows and crossbows allowed as pact weapon; weapon gains +1 attack and damage and can be used as spell focus"',
  'Insightful Fighting':
    'Section=combat ' +
    'Note="Insight vs. foe Deception gives Sneak Attack w/out Adv for 1 min"',
  'Insightful Manipulator':
    'Section=feature ' +
    'Note="Learn 2 of relative Cha, Int, Wis, and levels of target after 1 min study"',
  'Intoxicated Frenzy':
    'Section=combat ' +
    'Note="Gain 3 additional Flurry Of Blows attacks on 3 different foes"',
  'Invincible Conqueror':
    'Section=combat,save ' +
    'Note="Gain extra attack and crit on 19 for 1 min 1/long rest",' +
         '"Gain resistance to all damage for 1 min 1/long rest"',
  // TODO Choice of Int, Cha if already has Wis
  'Iron Mind':'Section=save Note="Save Proficiency (Wisdom)"',
  'Keeper Of Souls':
    'Section=magic ' +
    'Note="R60\' Dying target heals HD HP on other target 1/rd"',
  'Kensei Weapons':
    'Section=combat ' +
    'Note="Proficiency in choice of %V non-heavy melee or ranged weapons"',
  "Kensei's Shot":
    'Section=combat ' +
    'Note="Inflict +1d4 HP damage with ranged Kensei weapon as bonus action"',
  'Lance Of Lethargy':
    'Section=magic Note="<i>Eldritch Blast</i> inflicts -10\' Speed for 1 rd"',
  'Leap To Your Feat':
    'Section=ability Note="Standing from prone costs 5\' movement"',
  'Maddening Hex':
    'Section=magic ' +
    'Note="R30\' Bonus action inflicts %V HP psychic damage to targets in 5\' radius of curse target"',
  'Magic Arrow':'Section=combat Note="Arrows count as magic weapons"',
  'Magic Kensei Weapons':
    'Section=combat Note="Attacks with Kensei weapons count as magical"',
  "Magic-User's Nemesis":
    'Section=combat ' +
    'Note="R60\' Use Reaction to foil target cast or teleport (DC %V Wis neg) 1/short rest"',
  'Mantle Of Inspiration':
    'Section=magic ' +
    'Note="R60\' Bardic Inspiration gives %1 targets %V temporary HP and immediate move w/out OA"',
  'Mantle Of Majesty':
    'Section=magic Note="Cast <i>Command</i> 1/rd for conc or 1 min 1/long rest"',
  'Mantle Of Whispers':
    'Section=magic ' +
    'Note="R30\' Capture dying person\'s shadow to use as disguise (Insight vs. +5 Deception to see through) 1/short rest"',
  'Master Duelist':'Section=combat Note="Reroll miss with Adv 1/short rest"',
  'Master Of Hexes':
    'Section=magic Note="R30\' Redirect Hexblade\'s Curse when target dies"',
  'Master Of Intrigue':
    'Section=feature,skill ' +
    'Note="Mimic accent and speech patterns after 1 min listening",' +
         '"+2 Language Count/Tool Proficiency (Disguise Kit/Forgery Kit/Choose 1 from any Game)"',
  'Master Of Tactics':'Section=combat Note="R30\' Help as bonus action"',
  "Master's Flourish":
    'Section=combat Note="Use 1d6 instead of Bardic Inspiration for flourish"',
  'Mighty Summoner':
    'Section=magic ' +
    'Note="Summoned creatures gain +2 HP/HD and magical natural weapons"',
  'Misdirection':
    'Section=combat ' +
    'Note="Use Reaction to redirect attack on self to creature providing self cover"',
  'Mobile Flourish':
    'Section=combat ' +
    'Note="Spend 1 Bardic Inspiration to inflict +1d%V damage and 5\' + 1d%V\' push"',
  'One With The Blade':
    'Section=feature Note="Magic Kensei Weapons and Deft Strike features"',
  'Otherworldly Wings':'Section=ability Note="30\' Fly"',
  'Panache':
    'Section=skill ' +
    'Note="Use Persuasion vs. Insight to give hostile target Disadv on attacks on others or charm non-hostile for 1 min"',
  'Path To The Grave':
    'Section=magic ' +
    'Note="R30\' Use Channel Divinity to make target vulnerable to all damage for 1 rd"',
  'Path Of The Kensei':
    'Section=feature ' +
    'Note="Kensei Weapons, Agile Parry, Kensei\'s Shot, and Way Of The Brush features"',
  'Piercing Arrow':
    'Section=combat ' +
    'Note="Arrow passes through cover harmlessly and inflicts +%Vd6 HP piercing damage to targets in 30\'x1\' line (DC %1 Dex half)"',
  'Planar Warrior':
    'Section=combat ' +
    'Note="R30\' Self hit on target inflicts +%Vd8 HP damage and becomes force damage"',
  'Power Surge':
    'Section=magic ' +
    'Note="Store magic from %V countered spells, use for +%1 HP force spell damage 1/rd"',
  'Protective Spirit':
    'Section=combat Note="Regain 1d6+%V HP at end of turn if below %1 HP"',
  'Psychic Blades (Whispers)':
    'Section=combat ' +
    'Note="Spend 1 Bardic Inspiration to inflict +%Vd6 HP psychic damage 1/rd"',
  'Radiant Soul':
    'Section=magic,save ' +
    'Note="+%V HP radiant and fire spell damage",' +
         '"Resistance to radiant damage"',
  'Radiant Sun Bolt':
    'Section=combat ' +
    'Note="R30\' Ranged touch attack at +%V inflicts 1d%1+%2 HP radiant 1/rd, spend 1 Ki Point for 2/rd"',
  'Rage Beyond Death':
    'Section=combat Note="Remain conscious at 0 HP until rage ends"',
  'Raging Storm (Desert)':
    'Section=combat ' +
    'Note="R10\' Use Reaction to inflict %V HP fire on successful attacker (DC %1 Dex neg)"',
  'Raging Storm (Sea)':
    'Section=combat ' +
    'Note="R10\' Use Reaction after successful attack to knock foe prone (DC %V Str neg)"',
  'Raging Storm (Tundra)':
    'Section=magic Note="Immobilize target in Storm Aura (DC %V Str neg) for 1 rd 1/rd"',
  'Rakish Audacity':
    'Section=combat ' +
    'Note="+%1 Initiative/Use Sneak Attack w/out Adv vs. solo foe"',
  'Rapid Strike':
    'Section=combat Note="Trade Adv on attacks for extra attack 1/rd"',
  'Rebuke The Violent':
    'Section=magic ' +
    'Note="R30\' Use Channel Divinity to inflict equal damage on successful attacker of other (DC %V Wis half)"',
  'Redirect Attack':
    'Section=combat ' +
    'Note="Spend 1 Ki Point to redirect foe miss to adjacent creature"',
  'Relentless Hex':
    'Section=magic Note="Teleport 30\' to be adjacent to curse target"',
  'Saint Of Forge And Fire':
    'Section=combat,save ' +
    'Note="Resistance to non-magical bludgeoning, piercing, and slashing damage in heavy armor",' +
         '"Immunity to fire damage"',
  'Samurai Bonus Proficiency':
    'Section=skill ' +
    // TODO choice of skill proficiency or language
    'Note="Skill Proficiency (Choose 1 from History, Insight, Performance, Persuasion)"',
  'Scornful Rebuke':
    'Section=combat Note="Inflict %V HP psychic on successful attacker"',
  'Searing Arc Strike':
    'Section=magic ' +
    'Note="Spend 2-%V Ki Points to cast <i>Burning Hands</i> after attack"',
  'Searing Sunburst':
    'Section=magic ' +
    'Note="R150\' 20\' radius inflicts 2d6 HP radiant (DC %V Con neg), spend 1-3 Ki Points for +2d6 HP radiant each"',
  'Searing Vengeance':
    'Section=combat ' +
    'Note="Regain %V HP, stand, and inflict R30\' 2d8+%1 radiant damage and blindness for 1 rd upon death saving throw 1/long rest"',
  'Seeking Arrow':
    'Section=combat ' +
    'Note="Arrow ignores 3/4 cover, inflicts +%Vd6 HP force damage, and reveals target (DC %1 Dex half and no reveal)"',
  "Sentinel At Death's Door":
    'Section=magic Note="R30\' Negate critical hit %V/long rest"',
  'Shadow Arrow':
    'Section=combat ' +
    'Note="Arrow inflicts +%Vd6 HP psychic damage and 5\' vision (DC %1 Wis neg) for 1 rd"',
  'Shadow Lore':
    'Section=magic ' +
    'Note="R30\' Target obeys self commands (DC %V Wis neg) for 8 hr"',
  'Shadow Walk':
    'Section=magic ' +
    'Note="Bonus action to teleport 120\' between dim or dark areas"',
  'Shadowy Dodge':
    'Section=combat Note="Use Reaction to impose Disadv on attacker"',
  'Sharpen The Blade':
    'Section=combat ' +
    'Note="Spend 1-3 Ki Points to gain equal bonus on Kensei weapon attack and damage for 1 min"',
  'Shielding Storm':
    'Section=magic Note="R10\' Targets gain resistance to %V damage"',
  'Shroud Of Shadow':'Section=magic Note="Cast <i>Invisibility</i> at will"',
  'Skirmisher':
    'Section=combat ' +
    'Note="Use Reaction to move half speed when foe comes w/in 5\'"',
  'Slashing Flourish':
    'Section=combat ' +
    'Note="Spend 1 Bardic Inspiration to inflict +1d%V HP weapon damage on target and adjacent foe"',
  "Slayer's Counter":
    'Section=combat ' +
    'Note="When Slayer\'s Prey target forces saving throw, successful Reaction attack yields success"',
  "Slayer's Prey":
    'Section=combat ' +
    'Note="R60\' Inflict +1d6 HP weapon damage on target w/1st attack each turn until short rest"',
  'Soul Of Deceit':
    'Section=save ' +
    'Note="Immune to telepathy and truth compulsion, use Deception vs. Insight to present false thoughts"',
  'Soul Of The Forge':
    'Section=combat,save ' +
    'Note="+1 AC in heavy armor","Resistance to fire damage"',
  'Spectral Defense':
    'Section=combat Note="Use Reaction upon damage to gain resistance"',
  'Speech Of The Woods':'Section=skill Note="Learn sylvan, speak w/beasts"',
  'Spirit Shield':
    'Section=combat ' +
    'Note="R30\' Use Reaction to reduce damage to ally by %Vd6 HP"',
  'Spirit Totem (Bear)':
    'Section=magic ' +
    'Note="R60\' Targets in 30\' radius gain %V temporary HP and Adv on Str for 1 min 1/short rest"',
  'Spirit Totem (Hawk)':
    'Section=magic ' +
    'Note="R60\' Targets in 30\' radius gain Adv on Perception and self use Reaction to give Adv on attack for 1 min 1/short rest"',
  'Spirit Totem (Unicorn)':
    'Section=magic ' +
    'Note="R60\' Allies gain Adv to detect creatures in 30\' radius for 1 min, self heal spells restore +%V HP 1/short rest"',
  "Stalker's Flurry":'Section=combat Note="Reroll weapon miss 1/rd"',
  'Steady Eye':
    'Section=skill ' +
    'Note="Adv on Perception and Investigation after moving half speed"',
  'Storm Guide':
    'Section=magic ' +
    'Note="Stop rain in 20\' radius or direct winds in 100\' radius for 1 rd"',
  "Storm's Fury":
    'Section=combat ' +
    'Note="Use Reaction to inflict %V HP lightning and 20\' push on successful melee attacker (DC %1 Str neg push)"',
  'Strength Before Death':
    'Section=combat Note="Take extra turn when brought to 0 HP 1/long rest"',
  'Strength Of The Grave':
    'Section=combat ' +
    'Note="DC 5 + damage Cha check to retain 1 HP when reduced to 0 by non-critical, non-radiant damage 1/long rest"',
  'Storm Aura (Desert)':
    'Section=magic Note="10\' radius inflicts %V HP fire during rage 1/rd"',
  'Storm Aura (Sea)':
    'Section=magic ' +
    'Note="R10\' Target suffers %Vd6 HP lightning (DC %1 Dex half) during rage 1/rd"',
  'Storm Aura (Tundra)':
    'Section=magic Note="R10\' Targets gain %V temporary HP during rage 1/rd"',
  'Storm Soul (Desert)':
    'Section=magic,save ' +
    'Note="Touch lights unpossessed flammable objects",' +
         '"Resistance to fire damage, unaffected by extreme heat"',
  'Storm Soul (Sea)':
    'Section=ability,save ' +
    'Note="30\' Swim, breathe water",' +
         '"Resistance to lightning damage"',
  'Storm Soul (Tundra)':
    'Section=magic,save ' +
    'Note="Touch freezes unoccupied 5\' cu water for 1 min",' +
         '"Resistance to cold damage, unaffected by extreme cold"',
  'Sudden Strike':
    'Section=combat Note="Extra attack can use 2nd Sneak Attack on different foe"',
  'Sun Shield':
    'Section=combat,magic ' +
    'Note="Use Reaction to inflict %V HP radiant on successful melee attacker",' +
         '"Emit bright light in 30\' radius at will"',
  'Superior Mobility':'Section=ability Note="+10 Speed"',
  'Supernatural Defense':
    'Section=save ' +
    'Note="+1d6 saves and grapple escape vs. Slayer\'s Prey target"',
  'Survivalist':'Section=skill Note="Dbl Proficiency on Nature and Survival"',
  'Swords Bonus Proficiencies':
    'Section=feature ' +
    'Note="Armor Proficiency (Medium)/Weapon Proficiency (Scimitar)"',
  'Tempestuous Magic':
    'Section=magic Note="Fly 10\' before or after casting spell level 1+"',
  'Tactical Wit':'Section=combat Note="+%V Initiative"',
  'Tipsy Sway':
    'Section=feature Note="Leap To Your Feat and Redirect Attack features"',
  'Tireless Spirit':
    'Section=combat Note="Minimum 1 Fighting Spirit use after initiative"',
  'Tomb Of Levistus':
    'Section=magic ' +
    'Note="Use Reaction to create self ice cover that gives %V temporary HP for 1 rd 1/short rest"',
  "Trickster's Escape":
    'Section=magic Note="Cast <i>Freedom Of Movement</i> 1/long rest"',
  'Umbral Form':
    'Section=magic ' +
    'Note="Spend 6 Sorcery Points to become shadow (move through objects, resistance to non-force, non-radiant damage) for 1 min"',
  'Umbral Sight':'Section=feature Note="Darkvision, invisible to darkvision"',
  'Unbreakable Majesty':
    'Section=magic ' +
    'Note="Foes cannot attack self for 1 min (DC %V Cha suffers Disadv on saves vs. self spells)"',
  'Unearthly Recovery':
    'Section=magic Note="Regain %V HP when below %V HP 1/long rest"',
  'Unerring Accuracy':'Section=combat Note="Reroll monk weapon miss 1/rd"',
  'Unerring Eye':
    'Section=feature ' +
    'Note="R30\' Sense illusions and other deceptions %V/long rest"',
  'Unwavering Mark':
    'Section=combat ' +
    'Note="Struck foe suffers Disadv on attacks on others and provokes self bonus attack w/Adv and +%V HP weapon damage for 1 rd %1/long rest"',
  'Vigilant Defender':
    'Section=combat Note="Use Reaction for OA on every other creature\'s turn"',
  'Warding Maneuver':
    'Section=combat ' +
    'Note="R5\' Give +1d8 AC and damage resistance to ally when struck %V/long rest"',
  'Wind Speaker':'Section=skill Note="Speak Primordial and dialects"',
  'Vengeful Ancestors':
    'Section=combat ' +
    'Note="Damage prevented by Spirit Shield rebounds on attacker as force damage"',
  'Walker In Dreams':
    'Section=magic Note="After short rest, cast <i>Dream</i>, <i>Scrying</i>, or <i>Teleportation Circle</i> connected to last long rest place 1/long rest"',
  'Warrior Of The Gods':
    'Section=feature ' +
    'Note="Life-restoring spell to self needs no material components"',
  'Way Of The Brush':
    'Section=skill ' +
    'Note="Tool Proficiency (Choose 1 from Calligrapher\'s Supplies, Painter\'s Supplies)"',
  'Wind Soul':
    'Section=ability,magic,save ' +
    'Note="60\' Fly",' +
         '"R30\' Self and %V others fly 30\' for 1 hr 1/long rest",' +
         '"Immunity to lightning and thunder damage"',
  'Words Of Terror':
    'Section=magic ' +
    'Note="1 min conversation frightens target (DC %V Wisdom neg) for 1 hr 1/short rest"',
  'Zealous Presence':
    'Section=combat ' +
    'Note="R60\' Battle cry gives 10 targets Adv on attacks and saving throws for 1 rd 1/long rest"',
  // Feats
  'Bountiful Luck':
    'Section=feature ' +
    'Note="R30\' Use Reaction to allow ally to reroll natural 1 on attack, ability, or saving throw"',
  'Dragon Fear':
    'Section=ability,combat ' +
    'Note="Ability Boost (Choose 1 from Strength, Constitution, Charisma)",' +
         '"R30\' Targets frightened for 1 min (DC %V Wis neg)"',
  'Dragon Hide':
    'Section=ability,combat ' +
    'Note="Ability Boost (Choose 1 from Strength, Constitution, Charisma)",' +
         '"AC +3 in no armor, use claws as natural slashing weapon"',
  'Drow High Magic':
    'Section=magic ' +
    'Note="Cast <i>Detect Magic</i> at will, <i>Dispel Magic</i> and <i>Levitate</i> 1/long rest"',
  'Dwarven Fortitude':
    'Section=ability,combat ' +
    'Note="+1 Constitution",' +
         '"Dodge restores 1 HD+%{constitutionModifier} (minimum 1) HP"',
  'Elven Accuracy':
    'Section=ability,combat ' +
    'Note="Ability Boost (Choose 1 from Dexterity, Intelligence, Wisdom, Charisma)",' +
         '"Reroll 1 die when attacking using Dex, Int, Wis, or Cha w/Adv"',
  'Fade Away':
    'Section=ability,combat ' +
    'Note="Ability Boost (Choose 1 from Dexterity, Intelligence)",' +
         '"Become invisible after taking damage for 1 rd 1/short rest"',
  'Fey Teleportation':
    'Section=ability,magic,skill ' +
    'Note="Ability Boost (Choose 1 from Charisma, Intelligence)",' +
         '"Cast <i>Misty Step</i> 1/short rest",' +
         '"Know Sylvan"',
  'Flames Of Phlegethos':
    'Section=ability,magic ' +
    'Note="Ability Boost (Choose 1 from Charisma, Intelligence)",' +
         '"Fire spells reroll 1s on damage, inflict 1d4 HP fire on adjacent creatures, and give 30\' light for 1 rd"',
  'Infernal Constitution':
    'Section=ability,save ' +
    'Note="+1 Constitution",' +
         '"Resistance to cold and poison damage, Adv on saves vs. poison"',
  'Orcish Fury':
    'Section=ability,combat ' +
    'Note="Ability Boost (Choose 1 from Strength, Constitution)",' +
         '"Extra damage die 1/short rest, use Reaction after Relentless Endurance for extra attack"',
  'Prodigy':
    'Section=feature,skill ' +
    'Note="Skill Proficiency (Choose 1 from any)/Tool Proficiency (Choose 1 from any)/Language (any)",' +
         '"Dbl proficiency on chosen skill"',
  'Second Chance':
    'Section=ability,combat ' +
    'Note="Ability Boost (Choose 1 from Dexterity, Constitution, Charisma)",' +
         '"Use Reaction to force foe attack reroll 1/short rest"',
  'Squat Nimbleness':
    'Section=ability,feature,combat ' +
    'Note="Ability Boost (Choose 1 from Strength, Dexterity)/+5 Speed",' +
         '"Skill Proficiency (Choose 1 from Acrobatics, Athletics)",' +
         '"Adv on Athletics or Acrobatics to break grapple"',
  'Wood Elf Magic':
    'Section=magic ' +
    'Note="Know 1 D0 cantrip, cast <i>Longstrider</i> and <i>Pass Without Trace</i> 1/long rest"'
};
Xanathar.PATHS = {
  'Arcane Archer':
    'Group=Fighter Level=levels.Fighter ' +
    'Features=' +
      '"3:Arcane Archer Lore","3:Arcane Shot","7:Curving Shot",' +
      '"7:Magic Arrow","15:Ever-Ready Shot","18:Improved Shots"',
  'Cavalier':
    'Group=Fighter Level=levels.Fighter ' +
    'Features=' +
      '"3:Born To The Saddle","3:Cavalier Bonus Proficiency",' +
      '"3:Unwavering Mark","7:Warding Maneuver","10:Hold The Line",' +
      '"15:Ferocious Charger","18:Vigilant Defender"',
  'Circle Of Dreams':
    'Group=Druid Level=levels.Druid ' +
    'Features=' +
      '"2:Balm Of The Summer Court","6:Hearth Of Moonlight And Shadow",' +
      '"10:Hidden Paths","14:Walker In Dreams"',
  'Circle Of The Shepherd':
    'Group=Druid Level=levels.Druid ' +
    'Features=' +
      '"2:Speech Of The Woods","2:Spirit Totem (Bear)",' +
      '"2:Spirit Totem (Hawk)","2:Spirit Totem (Unicorn)",' +
      '"6:Mighty Summoner","10:Guardian Spirit","14:Faithful Summons"',
  'College Of Glamour':
    'Group=Bard Level=levels.Bard ' +
    'Features=' +
      '"3:Enthralling Performance","3:Mantle Of Inspiration",' +
      '"6:Mantle Of Majesty","14:Unbreakable Majesty"',
  'College Of Swords':
    'Group=Bard Level=levels.Bard ' +
    'Features=' +
      '"3:Blade Flourish","3:Defensive Flourish","3:Mobile Flourish",' +
      '"3:Slashing Flourish","3:Swords Bonus Proficiencies","6:Extra Attack",' +
      '"14:Master\'s Flourish" ' +
    'Selectables=' +
      '"3:Fighting Style (Dueling)","3:Fighting Style (Two-Weapon Fighting)"',
  'College Of Whispers':
    'Group=Bard Level=levels.Bard ' +
    'Features=' +
      '"3:Psychic Blades (Whispers)","3:Words Of Terror","6:Mantle Of Whispers",' +
      '"14:Shadow Lore"',
  'Divine Soul':
    'Group=Sorcerer Level=levels.Sorcerer ' +
    'Features=' +
      '"1:Divine Magic","1:Favored By The Gods",' +
      '"6:Empowered Healing","14:Otherworldly Wings","18:Unearthly Recovery"',
  'Forge Domain':
    'Group=Cleric Level=levels.Cleric ' +
    'Features=' +
      '"1:Blessing Of The Forge","1:Forge Bonus Proficiencies",' +
      '"2:Artisan\'s Blessing","6:Soul Of The Forge","8:Divine Strike",' +
      '"17:Saint Of Forge And Fire" ' +
    'Spells=' +
      '"1:Identify,Searing Smite",' +
      '"3:Heat Metal,Magic Weapon",' +
      '"5:Elemental Weapon,Protection From Energy",' +
      '"7:Fabricate,Wall Of Fire",' +
      '"9:Animate Objects,Creation"',
  'Gloom Stalker':
    'Group=Ranger Level=levels.Ranger ' +
    'Features=' +
      '"3:Dread Ambusher","3:Umbral Sight","7:Iron Mind",' +
      '"11:Stalker\'s Flurry","15:Shadowy Dodge" ' +
    'Spells=' +
      '"3:Disguise Self",' +
      '"5:Rope Trick",' +
      '"9:Fear",' +
      '"13:Greater Invisibility",' +
      '"17:Seeming"',
  'Grave Domain':
    'Group=Cleric Level=levels.Cleric ' +
    'Features=' +
      '"1:Circle Of Mortality","1:Eyes Of The Grave","2:Path To The Grave",' +
      '"6:Sentinel At Death\'s Door","8:Potent Spellcasting",' +
      '"17:Keeper Of Souls" ' +
    'Spells=' +
      '"1:Bane,False Life",' +
      '"3:Gentle Repose,Ray Of Enfeeblement",' +
      '"5:Revivify,Vampiric Touch",' +
      '"7:Blight,Death Ward",' +
      '"9:Antilife Shell,Raise Dead"',
  'Horizon Walker':
    'Group=Ranger Level=levels.Ranger ' +
    'Features=' +
      '"3:Detect Portal","3:Planar Warrior","7:Ethereal Step",' +
      '"11:Distant Strike","15:Spectral Defense" ' +
    'Spells=' +
      '"3:Protection From Evil And Good",' +
      '"5:Misty Step",' +
      '"9:Haste",' +
      '"13:Banishment",' +
      '"17:Teleportation Circle"',
  'Inquisitive':
    'Group=Rogue Level=levels.Rogue ' +
    'Features=' +
      '"3:Ear For Deceit","3:Eye For Detail","3:Insightful Fighting",' +
      '"9:Steady Eye","13:Unerring Eye","17:Eye For Weakness"',
  'Mastermind':
    'Group=Rogue Level=levels.Rogue ' +
    'Features=' +
      '"3:Master Of Intrigue","3:Master Of Tactics",' +
      '"9:Insightful Manipulator","13:Misdirection","17:Soul Of Deceit"',
  'Monster Slayer':
    'Group=Ranger Level=levels.Ranger ' +
    'Features=' +
      '"3:Hunter\'s Sense","3:Slayer\'s Prey","7:Supernatural Defense",' +
      '"11:Magic-User\'s Nemesis","15:Slayer\'s Counter" ' +
    'Spells=' +
      '"3:Protection From Evil And Good",' +
      '"5:Zone Of Truth",' +
      '"9:Magic Circle",' +
      '"13:Banishment",' +
      '"17:Hold Monster"',
  'Oath Of Conquest':
    'Group=Paladin Level=levels.Paladin ' +
    'Features=' +
      '"3:Conquering Presence","3:Guided Strike","7:Aura Of Conquest",' +
      '"15:Scornful Rebuke","20:Invincible Conqueror" ' +
    'Spells=' +
      '"3:Armor Of Agathys,Command",' +
      '"5:Hold Person,Spiritual Weapon",' +
      '"9:Bestow Curse,Fear",' +
      '"13:Dominate Beast,Stoneskin",' +
      '"17:Cloudkill,Dominate Person"',
  'Oath Of Redemption':
    'Group=Paladin Level=levels.Paladin ' +
    'Features=' +
      '"3:Emissary Of Peace","3:Rebuke The Violent","7:Aura Of The Guardian",' +
      '"15:Protective Spirit","20:Emissary Of Redemption" ' +
    'Spells=' +
      '"3:Sanctuary,Sleep",' +
      '"5:Calm Emotions,Hold Person",' +
      '"9:Counterspell,Hypnotic Pattern",' +
      '"13:Otiluke\'s Resilient Sphere,Stoneskin",' +
      '"17:Hold Monster,Wall Of Force"',
  'Path Of The Ancestral Guardian':
    'Group=Barbarian Level=levels.Barbarian ' +
    'Features=' +
      '"3:Ancestral Protectors","6:Spirit Shield","10:Consult The Spirits",' +
      '"14:Vengeful Ancestors"',
  'Path Of The Storm Herald':
    'Group=Barbarian Level=levels.Barbarian ' +
    'Features=' +
      '"features.Storm Aura (Desert) ? 6:Storm Soul (Desert)",' +
      '"features.Storm Aura (Sea) ? 6:Storm Soul (Sea)",' +
      '"features.Storm Aura (Tundra) ? 6:Storm Soul (Tundra)",' +
      '"10:Shielding Storm",' +
      '"features.Storm Aura (Desert) ? 14:Raging Storm (Desert)",' +
      '"features.Storm Aura (Sea) ? 14:Raging Storm (Sea)",' +
      '"features.Storm Aura (Tundra) ? 14:Raging Storm (Tundra)" ' +
    'Selectables=' +
      '"3:Storm Aura (Desert):Storm Aura","3:Storm Aura (Sea):Storm Aura",' +
      '"3:Storm Aura (Tundra):Storm Aura"',
  'Path Of The Zealot':
    'Group=Barbarian Level=levels.Barbarian ' +
    'Features=' +
      '"3:Divine Fury","3:Warrior Of The Gods","6:Fanatical Focus",' +
      '"10:Zealous Presence","14:Rage Beyond Death"',
  'Samurai':
    'Group=Fighter Level=levels.Fighter ' +
    'Features=' +
      '"3:Fighting Spirit","3:Samurai Bonus Proficiency",' +
      '"7:Elegant Courtier","10:Tireless Spirit","15:Rapid Strike",' +
      '"18:Strength Before Death"',
  'Scout':
    'Group=Rogue Level=levels.Rogue ' +
    'Features=' +
      '"3:Skirmisher","3:Survivalist","9:Superior Mobility",' +
      '"13:Ambush Master","17:Sudden Strike"',
  'Shadow Magic':
    'Group=Sorcerer Level=levels.Sorcerer ' +
    'Features=' +
      '"1:Eyes Of The Dark","1:Strength Of The Grave",' +
      '"6:Hound Of Ill Omen","14:Shadow Walk","18:Umbral Form"',
  'Storm Sorcery':
    'Group=Sorcerer Level=levels.Sorcerer ' +
    'Features=' +
      '"1:Wind Speaker","1:Tempestuous Magic","6:Heart Of The Storm",' +
      '"6:Storm Guide","14:Storm\'s Fury","18:Wind Soul"',
  'Swashbuckler':
    'Group=Rogue Level=levels.Rogue ' +
    'Features=' +
      '"3:Fancy Footwork","3:Rakish Audacity","9:Panache",' +
      '"13:Elegant Maneuver","17:Master Duelist"',
  'The Celestial':
    'Group=Warlock Level=levels.Warlock ' +
    'Features=' +
      '"1:Bonus Celestial Cantrips","1:Healing Light","6:Radiant Soul",' +
      '"10:Celestial Resilience","14:Searing Vengeance"',
  'The Hexblade':
    'Group=Warlock Level=levels.Warlock ' +
    'Features=' +
      '"1:Hexblade\'s Curse","1:Hex Warrior","6:Accursed Specter",' +
      '"10:Armor Of Hexes","14:Master Of Hexes"',
  'War Magic':
    'Group=Wizard Level=levels.Wizard ' +
    'Features=' +
      '"2:Arcane Deflection","2:Tactical Wit","6:Power Surge",' +
      '"10:Durable Magic","14:Deflecting Shroud"',
  'Way Of The Drunken Master':
    'Group=Monk Level=levels.Monk ' +
    'Features=' +
      '"3:Drunken Master Bonus Proficiencies","3:Drunken Technique",' +
      '"6:Tipsy Sway","11:Drunkard\'s Luck","17:Intoxicated Frenzy"',
  'Way Of The Kensei':
    'Group=Monk Level=levels.Monk ' +
    'Features=' +
      '"3:Path Of The Kensei","6:One With The Blade","11:Sharpen The Blade",' +
      '"17:Unerring Accuracy"',
  'Way Of The Sun Soul':
    'Group=Monk Level=levels.Monk ' +
    'Features=' +
      '"3:Radiant Sun Bolt","6:Searing Arc Strike","11:Searing Sunburst",' +
      '"17:Sun Shield"'
};
Xanathar.SPELLS = {

  "Abi-Dalzim's Horrid Wilting":
    'School=Necromancy ' +
    'Level=S8,W8 ' +
    'Description="R150\' 30\' radius withers plants, creatures suffer 12d8 HP necrotic (Con half, plants and water elementals Disadv)"',
  'Absorb Elements':
    'School=Abjuration ' +
    'Level=D1,R1,S1,W1 ' +
    'Description="Self can use Reaction to reduce energy damage by half, self hit next turn inflicts +1d6 HP"',
  "Aganazzar's Scorcher":
    'School=Evocation ' +
    'Level=S2,W2 ' +
    'Description="Creatures in 5\' by 30\' path suffer 3d8 HP fire (Dex half)"',
  'Beast Bond':
    'School=Divination ' +
    'Level=D1,R1 ' +
    'Description="Touched friendly beast up to 3 HD has telepathic link w/self, Adv on attacks on foes adjacent to self for conc or 10 min"',
  'Bones Of The Earth':
    'School=Transmutation ' +
    'Level=D6 ' +
    'Description="R120\' Six 5\'x30\' pillars burst from the ground, inflict 6d6 HP bludgeoning and pin creatures caught between top and ceiling (Dex neg, Str frees)"',
  'Catapult':
    'School=Transmutation ' +
    'Level=S1,W1 ' +
    'Description="R60\' Up to 5 lb object flies 90\', strikes for 3d8 HP bludgeoning (Dex neg)"',
  'Catnap':
    'School=Enchantment ' +
    'Level=B3,S3,W3 ' +
    'Description="R30\' Three willing targets sleep for 10 min, gain benefits of short rest"',
  'Cause Fear':
    'School=Necromancy ' +
    'Level=K1,W1 ' +
    'Description="R60\' Target frightened (Disadv on ability checks and attacks) for conc or 1 min (Wis neg each turn)"',
  'Ceremony':
    'School=Abjuration ' +
    'Level=C1,P1 ' +
    'Description="Self performs rites of atonement, bless water, coming of age, dedication, funeral, or wedding"',
  'Chaos Bolt':
    'School=Evocation ' +
    'Level=S1 ' +
    'Description="R120\' Ranged spell attack inflicts 2d8+1d6 HP of random type"',
  'Charm Monster':
    'School=Enchantment ' +
    'Level=B4,D4,K4,S4,W4 ' +
    'Description="R30\' Target regards you as a friend (Wis neg) for 1 hr or until harmed"',
  'Control Flames':
    'School=Transmutation ' +
    'Level=D0,S0,W0 ' +
    'Description="R60\' Target flame up to 5\' cu expands 5\', extinguishes, doubles light area for 1 hr, or forms shapes for 1 hr"',
  'Control Winds':
    'School=Transmutation ' +
    'Level=D5,S5,W5 ' +
    'Description="R300\' Air in 100\' cu creates gusts, downdraft, or updraft for conc or 1 hr"',
  'Create Bonfire':
    'School=Conjuration ' +
    'Level=D0,K0,S0,W0 ' +
    'Description="R60\' Creates 5\' fire that inflicts %{(level+7)//6}d8 HP fire (Dex neg) for conc or 1 min"',
  'Create Homunculus':
    'School=Transmutation ' +
    'Level=W6 ' +
    'Description="Self creates magical companion, suffers 2d4 HP piercing"',
  'Crown Of Stars':
    'School=Evocation ' +
    'Level=K7,S7,W7 ' +
    'Description="Creates seven flames around self that give 30\' light, ranged touch w/each inflicts 4d12 HP radiant for 1 hr"',
  'Danse Macabre':
    'School=Necromancy ' +
    'Level=K5,W5 ' +
    'Description="R60\' Creates from corpses up to 5 skeletons and zombies that obey self and attack at +%{?modifier?} for conc or 1 hr"',
  'Dawn':
    'School=Evocation ' +
    'Level=C5,W5 ' +
    'Description="R60\' Sunlight in 30\' radius inflicts 4d10 HP radiant, moves 60\'/rd for conc or 1 min"',
  "Dragon's Breath":
    'School=Transmutation ' +
    'Level=S2,W2 ' +
    'Description="Touched gains ability to breathe acid, cold, fire, lightning, or poison, inflicting 3d6 HP in a 15\' cone for conc or 1 min"',
  'Druid Grove':
    'School=Abjuration ' +
    'Level=D6 ' +
    'Description="Touched area up to 90\' cu responds to intruders w/chosen hostile effect for 1 dy"',
  'Dust Devil':
    'School=Conjuration ' +
    'Level=D2,S2,W2 ' +
    'Description="R60\' Inflicts 1d8 HP bludgeoning and pushes 10\' (Str half HP, no push) for conc or 1 min"',
  'Earthbind':
    'School=Transmutation ' +
    'Level=D2,K2,S2,W2 ' +
    'Description="R300\' Reduces target fly speed to 0 for conc or 1 min (Str neg)"',
  'Earth Tremor':
    'School=Evocation ' +
    'Level=B1,D1,S1,W1 ' +
    'Description="10\' radius knocks prone and inflicts 1d6 HP bludgeoning (Dex neg)"',
  'Elemental Bane':
    'School=Transmutation ' +
    'Level=D4,K4,W4 ' +
    'Description="R90\' Target loses resistance to and takes +2d6 HP from next hit of chosen energy type for conc or 1 min"',
  'Enemies Abound':
    'School=Enchantment ' +
    'Level=B3,K3,S3,W3 ' +
    'Description="R120\' Target regards all creatures as enemies for conc or 1 min (Int neg)"',
  'Enervation':
    'School=Necromancy ' +
    'Level=K5,S5,W5 ' +
    'Description="R60\' Target suffers 4d6 HP necrotic/rd and self regains half for conc or 1 min (Dex 2d6 HP for 1 rd)"',
  'Erupting Earth':
    'School=Transmutation ' +
    'Level=D3,S3,W3 ' +
    'Description="R120\' 20\' cu inflicts 3d12 HP bludgeoning (Dex half) and makes terrain difficult"',
  'Far Step':
    'School=Conjuration ' +
    'Level=K5,S5,W5 ' +
    'Description="Self teleports 60\'/rd for conc or 1 min"',
  'Find Greater Steed':
    'School=Conjuration ' +
    'Level=P4 ' +
    'Description="R30\' Summons mount (minimum Intelligence 6) that can speak and communicate telepathically w/self"',
  'Flame Arrows':
    'School=Transmutation ' +
    'Level=D3,R3,S3,W3 ' +
    'Description="Touched 12 pieces ammunition inflict +1d6 HP fire on hit for conc or 1 hr"',
  'Frostbite':
    'School=Evocation ' +
    'Level=D0,K0,S0,W0 ' +
    'Description="Target suffers 1d6 HP cold and Disadv on attack in next turn (Con neg)"',
  'Guardian Of Nature':
    'School=Transmutation ' +
    'Level=D4,R4 ' +
    'Description="Changes self into Primal Beast (+10\' Speed, 120\' Darkvision, Adv on Str, melee inflicts +1d6 HP force) or Great Tree (10 temporary HP, Adv on Con, Adv on Dex and Wis attack, 15\' radius difficult terrain) for conc or 1 min"',
  'Gust':
    'School=Transmutation ' +
    'Level=D0,S0,W0 ' +
    'Description="R30\' Push creature 5\' (Str neg) or object 10\', or create light breeze"',
  'Healing Spirit':
    'School=Conjuration ' +
    'Level=D2,R2 ' +
    'Description="R60\' Allies in 5\' cu heal 1d6/rd for conc, %{wisdomModifier+1>?2} times, or 1 min"',
  'Holy Weapon':
    'School=Evocation ' +
    'Level=C5,P5 ' +
    'Description="Touched weapon emits 30\' bright light, inflicts +2d8 HP radiant for conc or 1 hr; blast at end inflicts 4d8 HP radiant and blindness for 1 min in 30\' radius (Con half damage, no blindness)"',
  'Ice Knife':
    'School=Evocation ' +
    'Level=D1,S1,W1 ' +
    'Description="R60\' Ranged spell attack inflicts 1d10 HP piercing and 2d6 HP cold in 5\' radius (Dex neg)"',
  'Illusory Dragon':
    'School=Illusion ' +
    'Level=W8 ' +
    'Description="R120\' Shadow dragon frightens (Wis neg), moves 60\'/rd, inflicts 7d6 HP choice of energy in 60\' cone (Save half) for conc or 1 min"',
  'Immolation':
    'School=Evocation ' +
    'Level=S5,W5 ' +
    'Description="R90\' Target suffers 8d6 HP fire/rd (Save half, ends spell) for conc or 1 min"',
  'Infernal Calling':
    'School=Conjuration ' +
    'Level=K5,W5 ' +
    'Description="R90\' Summons uncontrolled devil for conc or 1 hr"',
  'Infestation':
    'School=Conjuration ' +
    'Level=D0,K0,S0,W0 ' +
    'Description="R30\' Target suffers 1d6 HP poison and moves randomly 5\' (Con neg)"',
  'Investiture Of Flame':
    'School=Transmutation ' +
    'Level=D6,K6,S6,W6 ' +
    'Description="Self emits 30\' bright light, gains immunity to fire and Adv on saves vs. cold, inflicts 1d10 fire in 5\' radius, and can create a 15\'x5\' line of fire that inflicts 4d8 HP fire (Dex half) for conc or 10 min"',
  'Investiture Of Ice':
    'School=Transmutation ' +
    'Level=D6,K6,S6,W6 ' +
    'Description="Self gains immunity to cold and Adv on saves vs. fire, moves normally across ice or snow, radiates 10\' difficult terrain, and can create a 15\' cone of freezing wind that inflicts 4d6 HP cold and slows for 1 rd (Dex half, no slow) for conc or 10 min"',
  'Investiture Of Stone':
    'School=Transmutation ' +
    'Level=D6,K6,S6,W6 ' +
    'Description="Self gains resistance to non-magical bludgeoning, piercing, and slashing, can radiate 15\' radius shaking that knocks prone (Dex neg), and can move through earth and stone for conc or 10 min"',
  'Investiture Of Wind':
    'School=Transmutation ' +
    'Level=D6,K6,S6,W6 ' +
    'Description="Ranged attacks on self suffer Disadv, self can fly 60\'/rd and can create R60\' 15\' cu swirling wind that inflicts 2d10 HP bludgeoning for conc or 10 min"',
  'Invulnerability':
    'School=Abjuration ' +
    'Level=W9 ' +
    'Description="Self gains immunity to all damage for conc or 10 min"',
  'Life Transference':
    'School=Necromancy ' +
    'Level=C3,W3 ' +
    'Description="R30\' Self suffers 4d8 HP necrotic, target regains dbl"',
  'Maddening Darkness':
    'School=Evocation ' +
    'Level=K8,W8 ' +
    'Description="R150\' 60\' radius magical darkness inflicts 8d8 HP psychic/rd (Wis half) for conc or 10 min"',
  'Maelstrom':
    'School=Evocation ' +
    'Level=D5 ' +
    'Description="R120\' 30\' radius swirling water inflicts 6d6 HP bludgeoning/rd and pulls creatures toward center for conc or 1 min"',
  'Magic Stone':
    'School=Transmutation ' +
    'Level=D0,K0 ' +
    'Description="3 touched stones attack at +%{?modifier?}, inflict 1d6+%{?modifier?} HP bludgeoning for 1 min"',
  'Mass Polymorph':
    'School=Transmutation ' +
    'Level=B9,S9,W9 ' +
    'Description="R120\' 10 targets transform into beasts, gain temporary HP for conc or 1 hr"',
  "Maximilian's Earthen Grasp":
    'School=Transmutation ' +
    'Level=S2,W2 ' +
    'Description="R30\' Inflicts 2d6 HP bludgeoning and restrains (Str neg), inflicts additional 2d6 HP/rd for conc or 1 min (Str escapes)"',
  "Melf's Minute Meteors":
    'School=Evocation ' +
    'Level=S3,W3 ' +
    'Description="R120\' 6 meteors each inflict 2d6 HP fire 2/rd for conc or 10 min"',
  'Mental Prison':
    'School=Illusion ' +
    'Level=K6,S6,W6 ' +
    'Description="R60\' Target suffers 5d6 HP psychic and becomes trapped by illusionary danger (escape inflicts 10d6 HP psychic) for conc or 1 min (Int initial HP only)"',
  'Mighty Fortress':
    'School=Conjuration ' +
    'Level=W8 ' +
    'Description="R1 mile 120\' sq fortress rises for 1 wk"',
  'Mind Spike':
    'School=Divination ' +
    'Level=K2,S2,W2 ' +
    'Description="R60\' Target suffers 3d8 HP psychic (Wis half) and self knows target location for conc or 1 hr"',
  'Mold Earth':
    'School=Transmutation ' +
    'Level=D0,S0,W0 ' +
    'Description="R30\' Excavates, colors, or changes movement difficulty of 5\' cu"',
  'Negative Energy Flood':
    'School=Necromancy ' +
    'Level=K5,W5 ' +
    'Description="R60\' Living target suffers 5d12 necrotic (Con half), rises as zombie if slain; undead target gains 5d12 temporary HP for 1 hr"',
  'Power Word Pain':
    'School=Enchantment ' +
    'Level=K7,S7,W7 ' +
    'Description="R60\' Target up to 100 HP slows to 10\', suffers Disadv on attack, ability, and saves, and requires successful Con save to cast until Con save"',
  'Primal Savagery':
    'School=Transmutation ' +
    'Level=D0 ' +
    'Description="Self next unarmed attack inflicts %{(level+7)//6}d10 HP acid"',
  'Primordial Ward':
    'School=Abjuration ' +
    'Level=D6 ' +
    'Description="Self gains resistance to acid, cold, fire, lightning, and thunder and may convert to immunity for 1 turn for conc or 1 min"',
  'Psychic Scream':
    'School=Enchantment ' +
    'Level=B9,K9,S9,W9 ' +
    'Description="R90\' 10 targets suffer 14d6 HP psychic and become stunned (Int half damage and ends stunning)"',
  'Pyrotechnics':
    'School=Transmutation ' +
    'Level=B2,S2,W2 ' +
    'Description="R60\' Target fire emits fireworks (R10\' blinded 1 rd (Con neg)) or 20\' smoke for 1 min"',
  'Scatter':
    'School=Conjuration ' +
    'Level=K6,S6,W6 ' +
    'Description="R30\' 5 targets teleported 120\' (Wis neg)"',
  'Shadow Blade':
    'School=Illusion ' +
    'Level=K2,S2,W2 ' +
    'Description="Self wields shadow sword (Adv on attacks in dim light, inflicts 2d8 HP psychic, finesse and light properties, range 20/60) for conc or 1 min"',
  'Shadow Of Moil':
    'School=Necromancy ' +
    'Level=K4 ' +
    'Description="10\' radius dims light, gives self resistance to radiant, inflicts 2d8 HP necrotic on successful attacker for conc or 1 min"',
  'Shape Water':
    'School=Transmutation ' +
    'Level=D0,S0,W0 ' +
    'Description="R30\' 5\' cu water moves 5\' or forms animated shapes, changes color or opacity, or freezes for 1 hr"',
  'Sickening Radiance':
    'School=Evocation ' +
    'Level=K4,S4,W4 ' +
    'Description="R120\' 30\' radius inflicts 4d10 HP radiant and exhaustion and lights creatures for conc or 10 min (Con neg)"',
  'Skill Empowerment':
    'School=Transmutation ' +
    'Level=B5,S5,W5 ' +
    'Description="Touched gains dbl proficiency in chosen skill for conc or 1 hr"',
  'Skywrite':
    'School=Transmutation ' +
    'Level=B2,D2,W2 ' +
    'Description="Clouds form 10 words for conc or 1 hr"',
  'Snare':
    'School=Abjuration ' +
    'Level=D1,R1,W1 ' +
    'Description="Touched magical trap snares first to cross for 8 hr (Int detects; Dex neg)"',
  "Snilloc's Snowball Storm":
    'School=Evocation ' +
    'Level=S2,W2 ' +
    'Description="R90\' 5\' radius inflicts 3d6 HP cold (Dex half)"',
  'Soul Cage':
    'School=Necromancy ' +
    'Level=K6,W6 ' +
    'Description="R60\' Self uses trapped dying soul 6 times to regain 2d8 HP, answer a question, gain Adv on next attack, ability, or saving throw, or scry for 10 min for 8 hr"',
  'Steel Wind Strike':
    'School=Conjuration ' +
    'Level=R5,W5 ' +
    'Description="R30\' Self attacks 5 targets, inflicting 6d10 force on each, then optionally teleports to within 5\' of one target"',
  'Storm Sphere':
    'School=Evocation ' +
    'Level=S4,W4 ' +
    'Description="R150\' 20\' radius inflicts 2d6 HP bludgeoning (Str neg) and emits 60\' bolt that inflicts 4d6 HP lightning 1/rd for conc or 1 min"',
  'Summon Greater Demon':
    'School=Conjuration ' +
    'Level=K4,W4 ' +
    'Description="R60\' Demon up to CR 5 obeys self until Cha save for conc or 1 hr"',
  'Summon Lesser Demons':
    'School=Conjuration ' +
    'Level=K3,W3 ' +
    'Description="R60\' Demons up to CR 1 attack nearest creature for conc or 1 hr"',
  'Synaptic Static':
    'School=Enchantment ' +
    'Level=B5,K5,S5,W5 ' +
    'Description="R120\' Creatures in 20\' radius suffer 8d6 HP psychic and -1d6 attack, ability, and concentration for 1 min (Int half, ends other penalties)"',
  'Temple Of The Gods':
    'School=Conjuration ' +
    'Level=C7 ' +
    'Description="R120\' Creates 120\' sq temple that bars divination and specified creature types (Cha suffer -1d4 attack, ability, and saving throws) and grants +%{wisdomModifier} bonus to healing for 1 dy"',
  "Tenser's Transformation":
    'School=Transmutation ' +
    'Level=W6 ' +
    'Description="Self gains 50 temporary HP, +2d12 HP force weapon damage, Armor Proficiency (Heavy/Shield), Weapon Proficiency (Martial), Save Proficiency (Constitution/Strength), Extra Attack for conc or 10 min, suffers exhaustion afterward (Con neg)"',
  'Thunderclap':
    'School=Evocation ' +
    'Level=B0,D0,K0,S0,W0 ' +
    'Description="5\' radius inflicts 1d6 HP thunder"',
  'Thunder Step':
    'School=Conjuration ' +
    'Level=K3,S3,W3 ' +
    'Description="Self and 1 other teleport 90\', 10\' radius around initial location inflicts 3d10 HP thunder (Con half)"',
  'Tidal Wave':
    'School=Conjuration ' +
    'Level=D3,S3,W3 ' +
    'Description="R120\' 30\'x10\' inflicts 4d8 HP bludgeoning and knocks prone (Dex half)"',
  'Tiny Servant':
    'School=Transmutation ' +
    'Level=W3 ' +
    'Description="Touched object sprouts arms and legs, obeys commands for 8 hr"',
  'Toll The Dead':
    'School=Necromancy ' +
    'Level=C0,K0,W0 ' +
    'Description="R60\' Target suffers 1d8 HP necrotic (damaged target 1d12 HP necrotic)"',
  'Transmute Rock':
    'School=Transmutation ' +
    'Level=D5,W5 ' +
    'Description="R120\' 40\' cu changes between rock and mud"',
  'Vitriolic Sphere':
    'School=Evocation ' +
    'Level=S4,W4 ' +
    'Description="R150\' 20\' radius inflicts 10d4 HP acid, then 5d4 HP acid next rd (Dex half initial and none next rd)"',
  'Wall Of Light':
    'School=Evocation ' +
    'Level=K5,S5,W5 ' +
    'Description="R120\' 60\'x 10\' wall lights 120\', inflicts 4d8 HP radiant and blinds (Con half and not blind), emits 60\' ray that inflicts 4d8 HP radiant for conc or 10 min"',
  'Wall Of Sand':
    'School=Evocation ' +
    'Level=W3 ' +
    'Description="R90\' 30\'x10\' wall slows passers to 1/3 Speed and blocks vision for conc or 10 min"',
  'Wall Of Water':
    'School=Evocation ' +
    'Level=D3,S3,W3 ' +
    'Description="R60\' 30\'x10\' wall inflicts Disadv on ranged attacks and half damage on fire for conc or 10 min"',
  'Warding Wind':
    'School=Evocation ' +
    'Level=B2,D2,S2,W2 ' +
    'Description="10\' radius deafens, extinguishes flames, bars gas and fog, and inflicts difficult terrain and Disadv on ranged attacks"',
  'Watery Sphere':
    'School=Conjuration ' +
    'Level=D4,S4,W4 ' +
    'Description="R90\' 5\' sphere traps 4 targets (Str ejects) for conc or 1 min"',
  'Whirlwind':
    'School=Evocation ' +
    'Level=D7,S7,W7 ' +
    'Description="R300\' 10\' radius inflicts 10d6 HP bludgeoning (Dex half) and restrains (Str neg) for conc or 1 min"',
  'Word Of Radiance':
    'School=Evocation ' +
    'Level=C0 ' +
    'Description="R5\' Targets suffer %{level+7//6}d6 HP radiant (Con neg)"',
  'Wrath Of Nature':
    'School=Evocation ' +
    'Level=D5,R5 ' +
    'Description="R120\' Animates 60\' cu of trees (inflict 4d6 HP slashing (Dex neg)), undergrowth (inflict difficult terrain), vines (restrain (Str neg)), and rocks (ranged spell inflicts 3d8 HP bludgeoning, knocks prone (Dex not prone)) for conc or 1 min"',
  'Zephyr Strike':
    'School=Transmutation ' +
    'Level=R1 ' +
    'Description="Self moves w/out OA for conc or 1 min and gains Adv on attacks, +1d8 HP force, and +30\' Speed for 1 rd"'

};
Xanathar.SPELLS_LEVELS_ADDED = {
  'Banishing Smite':'"K5 [The Hexblade]"',
  'Blink':'"K3 [The Hexblade]"',
  'Blur':'"K2 [The Hexblade]"',
  'Branding Smite':'"K2 [The Hexblade]"',
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
  rules, classSelectables, deitiesDomains, paths
) {
  SRD5E.identityRules(rules, {}, {}, {}, {}, paths, {});
  for(var clas in classSelectables) {
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
    Xanathar.pathRulesExtra(rules, path);
  }
};

/* Defines rules related to magic use. */
Xanathar.magicRules = function(rules, spells, spellsLevels) {
  SRD5E.magicRules(rules, {}, spells);
  for(var s in spellsLevels) {
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
  for(var f in feats) {
    Xanathar.featRulesExtra(rules, f);
  }
};

/*
 * Defines in #rules# the rules associated with feat #name# that cannot be
 * derived directly from the attributes passed to featRules.
 */
Xanathar.featRulesExtra = function(rules, name) {

  if(name == 'Dragon Fear') {
    rules.defineRule('combatNotes.dragonFear',
      'proficiencyBonus', '=', '8 + source',
      'charismaModifier', '+', null
    );
  } else if(name == 'Dragon Hide') {
    rules.defineRule('armorClass', 'combatNotes.dragonHide.1', '+', null);
    rules.defineRule('combatNotes.dragonHide.1',
      'combatNotes.dragonHide', '?', null,
      'armor', '=', 'source == "None" ? 3 : null'
    );
    SRD5E.weaponRules(rules, 'Claws', 0, ['Un'], '1d4', null);
    rules.defineRule('weapons.Claws', 'combatNotes.dragonHide', '=', '1');
  } else if(name == 'Drow High Magic') {
    SRD5E.featureSpells(
      rules, 'Drow High Magic', 'S', null,
      ['Detect Magic,Levitate,Dispel Magic']
    );
    rules.defineRule('casterLevels.Drow High Magic',
      'features.Drow High Magic', '?', null,
      'level', '=', null,
      'levels.Sorcerer', 'v', 0
    );
    rules.defineRule
      ('casterLevels.S', 'casterLevels.Drow High Magic', '^=', null);
  } else if(name == 'Fey Teleportation') {
    rules.defineRule('languageCount', 'skillNotes.feyTeleportation', '+=', '1');
    rules.defineRule
      ('languages.Sylvan', 'skillNotes.feyTeleportation', '=', '1');
    SRD5E.featureSpells(rules, 'Fey Teleportation', 'W', null, ['Misty Step']);
    rules.defineRule('casterLevels.Fey Teleportation',
      'features.Fey Teleportation', '?', null,
      'level', '=', null,
      'levels.Wizard', 'v', 0
    );
    rules.defineRule
      ('casterLevels.W', 'casterLevels.Fey Teleportation', '^=', null);
  } else if(name == 'Prodigy') {
    rules.defineRule('languageCount', 'featureNotes.prodigy', '+=', '1');
    rules.defineRule('skillChoiceCount', 'featureNotes.prodigy', '+=', '1');
    rules.defineRule('toolChoiceCount', 'featureNotes.prodigy', '+=', '1');
  } else if(name == 'Wood Elf Magic') {
    rules.defineRule('spellSlots.D0', 'magicNotes.woodElfMagic', '+=', '1');
    SRD5E.featureSpells
      (rules, 'Wood Elf Magic', 'D', null, ['Longstrider,Pass Without Trace']);
    rules.defineRule('casterLevels.Wood Elf Magic',
      'features.Wood Elf Magic', '?', null,
      'level', '=', null,
      'levels.Druid', 'v', 0
    );
    rules.defineRule
      ('casterLevels.D', 'casterLevels.Wood Elf Magic', '^=', null);
  }

};

/* Defines the rules related to character classes. */
Xanathar.pathRulesExtra = function(rules, name) {

  var pathLevel =
    name.charAt(0).toLowerCase() + name.substring(1).replaceAll(' ', '') +
    'Level';

  if(name == 'Arcane Archer') {
    rules.defineRule('arcaneShotDC',
      'features.Arcane Shot', '?', null,
      'proficiencyBonus', '=', '8 + source',
      'intelligenceModifier', '+', null
    );
    rules.defineRule
      ('combatNotes.banishingArrow', pathLevel, '=', 'source>=18 ? "2" : "0"');
    rules.defineRule('combatNotes.banishingArrow.1', 'arcaneShotDC', '=', null);
    rules.defineRule
      ('combatNotes.beguilingArrow', pathLevel, '=', 'source>= 18 ? "4" : "2"');
    rules.defineRule('combatNotes.beguilingArrow.1', 'arcaneShotDC', '=', null);
    rules.defineRule
      ('combatNotes.burstingArrow', pathLevel, '=', 'source>= 18 ? "4" : "2"');
    rules.defineRule
      ('combatNotes.enfeeblingArrow', pathLevel, '=', 'source>=18 ? "4" : "2"');
    rules.defineRule
      ('combatNotes.enfeeblingArrow.1', 'arcaneShotDC', '=', null);
    rules.defineRule
      ('combatNotes.graspingArrow', pathLevel, '=', 'source>=18 ? "4" : "2"');
    rules.defineRule('combatNotes.graspingArrow.1', 'arcaneShotDC', '=', null);
    rules.defineRule
      ('combatNotes.piercingArrow', pathLevel, '=', 'source>=18 ? "2" : "1"');
    rules.defineRule('combatNotes.piercingArrow.1', 'arcaneShotDC', '=', null);
    rules.defineRule
      ('combatNotes.seekingArrow', pathLevel, '=', 'source>=18 ? "2" : "1"');
    rules.defineRule('combatNotes.seekingArrow.1', 'arcaneShotDC', '=', null);
    rules.defineRule
      ('combatNotes.shadowArrow', pathLevel, '=', 'source>=18 ? "4" : "2"');
    rules.defineRule('combatNotes.shadowArrow.1', 'arcaneShotDC', '=', null);
    rules.defineRule('selectableFeatureCount.Fighter (Arcane Shot)',
      pathLevel, '=',
        'source>=18 ? 6 : source>=15 ? 5 : source>=10 ? 4 : source>=7 ? 3 : 2'
    );
    SRD5E.featureSpells(rules, 'Arcane Archer Lore', 'D', null, ['Druidcraft']);
    SRD5E.featureSpells
      (rules, 'Arcane Archer Lore', 'W', null, ['Prestidigitation']);
    // Don't need to set caster level, since neither of these cantrips has
    // variable effects.
  } else if(name == 'Cavalier') {
    rules.defineRule('combatNotes.ferociousCharger',
      'proficiencyBonus', '=', '8 + source',
      'strengthModifier', '+', null
    );
    rules.defineRule('combatNotes.unwaveringMark',
      pathLevel, '=', 'Math.floor(source / 2)'
    );
    rules.defineRule('combatNotes.unwaveringMark.1',
      'features.Unwavering Mark', '?', null,
      'strengthModifier', '=', 'Math.max(source, 1)'
    );
    rules.defineRule('combatNotes.wardingManeuver',
      'constitutionModifier', '=', 'Math.max(source, 1)'
    );
  } else if(name == 'Circle Of Dreams') {
    rules.defineRule('magicNotes.balmOfTheSummerCourt', pathLevel, '=', null);
    rules.defineRule
      ('magicNotes.hiddenPaths', 'wisdomModifier', '=', 'Math.max(source, 1)');
    SRD5E.featureSpells(
      rules, 'Walker In Dreams', 'D', null,
      ['Dream,Scrying,Teleportation Circle']
    );
  } else if(name == 'Circle Of The Shepherd') {
    rules.defineRule
      ('languages.Sylvan', pathLevel, '=', 'source>=2 ? 1 : null');
    rules.defineRule
      ('magicNotes.spiritTotem(Bear)', pathLevel, '=', '5 + source');
    rules.defineRule('magicNotes.spiritTotem(Unicorn)', pathLevel, '=', null);
    rules.defineRule
      ('magicNotes.guardianSpirit', pathLevel, '=', 'Math.floor(source / 2)');
  } else if(name == 'College Of Glamour') {
    rules.defineRule('magicNotes.enthrallingPerformance',
      'charismaModifier', '=', 'Math.max(source, 1)'
    );
    rules.defineRule('magicNotes.enthrallingPerformance.1',
      'features.Enthralling Performance', '?', null,
      'spellDifficultyClass.B', '=', null
    );
    rules.defineRule('magicNotes.mantleOfInspiration',
      pathLevel, '=', 'Math.min(Math.floor(source / 5) * 3 + 5, 14)'
    );
    rules.defineRule('magicNotes.mantleOfInspiration.1',
      'features.Mantle Of Inspiration', '?', null,
      'charismaModifier', '=', 'Math.max(source, 1)'
    );
    rules.defineRule
      ('magicNotes.unbreakableMajesty', 'spellDifficultyClass.B', '=', null);
    SRD5E.featureSpells(rules, 'Mantle Of Majesty', 'B', null, ['Command']);
  } else if(name == 'College Of Swords') {
    // Have to hard-code these proficiencies, since featureRules only handles
    // notes w/a single type of granted proficiency
    rules.defineRule('armorProficiency.Medium',
      'featureNotes.swordsBonusProficiencies', '=', '1'
    );
    rules.defineRule('weaponProficiency.Scimitar',
      'featureNotes.swordsBonusProficiencies', '=', '1'
    );
    rules.defineRule
      ('combatNotes.defensiveFlourish', 'bardicInspirationDie', '=', null);
    rules.defineRule
      ('combatNotes.extraAttack', pathLevel, '+=', 'source>=6 ? 1 : null');
    rules.defineRule
      ('combatNotes.mobileFlourish', 'bardicInspirationDie', '=', null);
    rules.defineRule
      ('combatNotes.slashingFlourish', 'bardicInspirationDie', '=', null);
    rules.defineRule
      ('selectableFeatureCount.Bard (Fighting Style)', pathLevel, '=', '1');
  } else if(name == 'College Of Whispers') {
    rules.defineRule('combatNotes.psychicBlades(Whispers)',
      pathLevel, '=', 'source>=15 ? 8 : source>=10 ? 5 : source>=5 ? 3 : 2'
    );
    rules.defineRule
      ('magicNotes.shadowLore', 'spellDifficultyClass.B', '=', null);
    rules.defineRule
      ('magicNotes.wordsOfTerror', 'spellDifficultyClass.B', '=', null);
  } else if(name == 'Divine Soul') {
    rules.defineRule('magicNotes.unearthlyRecovery',
      'hitPoints', '=', 'Math.floor(source / 2)'
    );
  } else if(name == 'Forge Domain') {
    // Have to hard-code these proficiencies, since featureRules only handles
    // notes w/a single type of granted proficiency
    rules.defineRule('armorProficiency.Heavy',
      'featureNotes.forgeBonusProficiencies', '=', '1'
    );
    rules.defineRule("toolProficiency.Smith's Tools",
      'featureNotes.forgeBonusProficiencies', '=', '1'
    );
    rules.defineRule('armorClass', 'combatNotes.soulOfTheForge.1', '+', null);
    rules.defineRule
      ('combatNotes.divineStrike', pathLevel, '=', 'source<14 ? 1 : 2');
    rules.defineRule('combatNotes.divineStrike.1', pathLevel, '=', '"fire"');
    // Show Soul Of The Forge note even when not in heavy armor
    rules.defineRule('combatNotes.soulOfTheForge.1',
      'combatNotes.soulOfTheForge', '?', null,
      'armorWeight', '=', 'source == 3 ? 1 : null'
    );
  } else if(name == 'Gloom Stalker') {
    rules.defineRule('combatNotes.dreadAmbusher', 'wisdomModifier', '=', null);
    rules.defineRule
      ('features.Darkvision', 'featureNotes.umbralSight', '=', '1');
    rules.defineRule('saveProficiency.Wisdom', 'saveNotes.ironMind', '=', '1');
  } else if(name == 'Grave Domain') {
    rules.defineRule('magicNotes.eyesOfTheGrave',
      'wisdomModifier', '=', 'Math.max(source, 1)'
    );
    rules.defineRule
      ('magicNotes.potentSpellcasting.1', 'wisdomModifier', '=', null);
    rules.defineRule("magicNotes.sentinelAtDeath'sDoor",
      'wisdomModifier', '=', 'Math.max(source, 1)'
    );
    SRD5E.featureSpells
      (rules, 'Circle Of Mortality', 'C', null, ['Spare The Dying']);
  } else if(name == 'Horizon Walker') {
    rules.defineRule
      ('combatNotes.planarWarrior', pathLevel, '=', 'source>=11 ? 2 : 1');
  } else if(name == 'Monster Slayer') {
    rules.defineRule("combatNotes.hunter'sSense", 'wisdomModifier', '=', null);
    rules.defineRule
      ("combatNotes.magic-User'sNemesis", 'spellDifficultyClass.R', '=', null);
  } else if(name == 'Inquisitive') {
    rules.defineRule('featureNotes.unerringEye',
      'wisdomModifier', '=', 'Math.max(source, 1)'
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
  } else if(name == 'Oath Of Conquest') {
    rules.defineRule('combatNotes.scornfulRebuke',
      'charismaModifier', '=', 'Math.max(source, 1)'
    );
    rules.defineRule
      ('magicNotes.auraOfConquest', pathLevel, '=', 'source>=18 ? 30 : 10');
    rules.defineRule('magicNotes.conqueringPresence',
      'spellDifficultyClass.P', '=', null
    );
  } else if(name == 'Oath Of Redemption') {
    rules.defineRule('combatNotes.protectiveSpirit',
      pathLevel, '=', 'Math.floor(source / 2)'
    );
    rules.defineRule('combatNotes.protectiveSpirit.1',
      'features.Protective Spirit', '?', null,
      'hitPoints', '=', 'Math.floor(source / 2)'
    );
    rules.defineRule
      ('magicNotes.auraOfTheGuardian', pathLevel, '=', 'source>=18 ? 30 : 10');
    rules.defineRule('magicNotes.rebukeTheViolent',
      'spellDifficultyClass.P', '=', null
    );
  } else if(name == 'Path Of The Ancestral Guardian') {
    rules.defineRule('combatNotes.spiritShield',
      pathLevel, '=', 'source>=14 ? 4 : source>=10 ? 3 : 2'
    );
    SRD5E.featureSpells
      (rules, 'Consult The Spirits', 'C', null, ['Augury,Clairvoyance']);
    rules.defineRule('casterLevels.Consult The Spirits',
      'features.Consult The Spirits', '?', null,
      pathLevel, '=', null,
      'levels.Cleric', 'v', 0
    );
    rules.defineRule
      ('casterLevels.C', 'casterLevels.Consult The Spirits', '^=', null);
  } else if(name == 'Path Of The Storm Herald') {
    rules.defineRule('combatNotes.ragingStorm(Desert)',
      pathLevel, '=', 'Math.floor(source / 2)'
    );
    rules.defineRule('combatNotes.ragingStorm(Desert).1',
      'proficiencyBonus', '=', '8 + source',
      'constitutionModifier', '+', null
    );
    rules.defineRule('combatNotes.ragingStorm(Sea)',
      'proficiencyBonus', '=', '8 + source',
      'constitutionModifier', '+', null
    );
    rules.defineRule('magicNotes.ragingStorm(Tundra)',
      'proficiencyBonus', '=', '8 + source',
      'constitutionModifier', '+', null
    );
    rules.defineRule('magicNotes.shieldingStorm',
      'features.Storm Aura (Desert)', '=', '"fire"',
      'features.Storm Aura (Sea)', '=', '"lightning"',
      'features.Storm Aura (Tundra)', '=', '"cold"'
    );
    rules.defineRule
      ('selectableFeatureCount.Barbarian (Storm Aura)', pathLevel, '=', '1');
    rules.defineRule('magicNotes.stormAura(Desert)',
      pathLevel, '=', 'Math.floor(source / 5) + 2'
    );
    rules.defineRule('magicNotes.stormAura(Sea)',
      pathLevel, '=', 'Math.max(Math.floor(source / 5), 1)'
    );
    rules.defineRule('magicNotes.stormAura(Sea).1',
      'features.Storm Aura (Sea)', '?', null,
      'proficiencyBonus', '=', '8 + source',
      'constitutionModifier', '+', null
    );
    rules.defineRule('magicNotes.stormAura(Tundra)',
      pathLevel, '=', 'Math.floor(source / 5) + 2'
    );
  } else if(name == 'Path Of The Zealot') {
    rules.defineRule
      ('combatNotes.divineFury', pathLevel, '=', 'Math.floor(source / 2)');
  } else if(name == 'Samurai') {
    rules.defineRule('combatNotes.fightingSpirit',
      pathLevel, '=', 'source>=15 ? 15 : source>=10 ? 10 : 5'
    );
    rules.defineRule
      ('saveProficiency.Wisdom', 'saveNotes.elegantCourtier', '=', '1');
    rules.defineRule('skillNotes.elegantCourtier', 'wisdomModifier', '=', null);
  } else if(name == 'Scout') {
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
  } else if(name == 'Shadow Magic') {
    rules.defineRule('magicNotes.eyesOfTheDark', pathLevel, '?', 'source>=3');
    rules.defineRule
      ('combatNotes.houndOfIllOmen', pathLevel, '=', 'Math.floor(source / 2)');
    SRD5E.featureSpells(rules, 'Eyes Of The Dark', 'S', null, ['Darkness']);
  } else if(name == 'Storm Sorcery') {
    rules.defineRule("combatNotes.storm'sFury", pathLevel, '=', null);
    rules.defineRule("combatNotes.storm'sFury.1",
      "features.Storm's Fury", '?', null,
      'spellDifficultyClass.S', '=', null
    );
    rules.defineRule('languageCount', 'skillNotes.windSpeaker', '+', '5');
    rules.defineRule('languages.Aquan', 'skillNotes.windSpeaker', '=', '1');
    rules.defineRule('languages.Auran', 'skillNotes.windSpeaker', '=', '1');
    rules.defineRule('languages.Ignan', 'skillNotes.windSpeaker', '=', '1');
    rules.defineRule
      ('languages.Primordial', 'skillNotes.windSpeaker', '=', '1');
    rules.defineRule('languages.Terran', 'skillNotes.windSpeaker', '=', '1');
    rules.defineRule
      ('magicNotes.heartOfTheStorm', pathLevel, '=', 'Math.floor(source / 2)');
    rules.defineRule
      ('magicNotes.windSoul', 'charismaModifier', '=', '3 + source');
  } else if(name == 'Swashbuckler') {
    rules.defineRule('combatNotes.rakishAudacity.1',
      'features.Rakish Audacity', '?', null,
      'charismaModifier', '=', null
    );
    // Dummy rule to italicize combatNotes.rakishAudacity
    rules.defineRule('initiative', 'combatNotes.rakishAudacity', '+', '0');
  } else if(name == 'The Celestial') {
    rules.defineRule('combatNotes.searingVengeance',
      'hitPoints', '=', 'Math.floor(source / 2)'
    );
    rules.defineRule('combatNotes.searingVengeance.1',
      'features.Searing Vengeance', '?', null,
      'charismaModifier', '=', null
    );
    rules.defineRule('magicNotes.healingLight', pathLevel, '=', 'source + 1');
    rules.defineRule('magicNotes.healingLight.1',
      'features.Healing Light', '?', null,
      'charismaModifier', '=', 'Math.max(source, 1)'
    );
    rules.defineRule('magicNotes.radiantSoul', 'charismaModifier', '=', null);
    rules.defineRule('magicNotes.celestialResilience',
      pathLevel, '=', null,
      'charismaModifier', '+', null
    );
    rules.defineRule('magicNotes.celestialResilience.1',
      'features.Celestial Resilience', '?', null,
      pathLevel, '=', 'Math.floor(source / 2)',
      'charismaModifier', '+', null
    );
    SRD5E.featureSpells
      (rules, 'Bonus Celestial Cantrips', 'K', null, ['Light,Sacred Flame']);
    // Place these Eldritch Invocation spells here, since we don't have a
    // classRulesExtra function that defines general Warlock rules.
    SRD5E.featureSpells
      (rules, 'Gift Of The Depths', 'K', null, ['Water Breathing']);
    SRD5E.featureSpells(rules, 'Shroud Of Shadow', 'K', null, ['Invisibility']);
    SRD5E.featureSpells
      (rules, "Trickster's Escape", 'K', null, ['Freedom Of Movement']);
  } else if(name == 'The Hexblade') {
    // Have to hard-code these proficiencies, since featureRules only handles
    // notes w/a single type of granted proficiency
    rules.defineRule
      ('armorProficiency.Medium', 'featureNotes.hexWarrior', '=', '1');
    rules.defineRule
      ('armorProficiency.Shield', 'featureNotes.hexWarrior', '=', '1');
    rules.defineRule
      ('weaponProficiency.Martial', 'featureNotes.hexWarrior', '=', '1');
    rules.defineRule
      ('combatNotes.accursedSpecter', pathLevel, '=', 'Math.floor(source / 2)');
    rules.defineRule('combatNotes.accursedSpecter.1',
      'features.Accursed Specter', '?', null,
      'charismaModifier', '=', 'Math.max(source, 0)'
    );
    rules.defineRule('combatNotes.hexWarrior',
      'charismaModifier', '=', null,
      'strengthModifier', '+', '-source'
    );
    rules.defineRule
      ("magicNotes.hexblade'sCurse", 'proficiencyBonus', '=', null);
    rules.defineRule("magicNotes.hexblade'sCurse.1",
      pathLevel, '=', null,
      'charismaModifier', '+', null
    );
    // Invocations
    rules.defineRule('abilityNotes.giftOfTheDepths', 'speed', '=', null);
    rules.defineRule('magicNotes.cloakOfFlies',
      'charismaModifier', '=', 'Math.max(source, 0)'
    );
    rules.defineRule('magicNotes.maddeningHex',
      'charismaModifier', '=', 'Math.max(source, 1)'
    );
    rules.defineRule
      ('magicNotes.tombOfLevistus', 'levels.Warlock', '=', 'source * 10');
  } else if(name == 'War Magic') {
    rules.defineRule
      ('combatNotes.tacticalWit', 'intelligenceModifier', '=', null);
    rules.defineRule
      ('magicNotes.deflectingShroud', pathLevel, '=', 'Math.floor(source / 2)');
    rules.defineRule('magicNotes.powerSurge',
      'intelligenceModifier', '=', 'Math.max(source, 1)'
    );
    rules.defineRule('magicNotes.powerSurge.1',
      'features.Power Surge', '?', null,
      pathLevel, '=', 'Math.floor(source / 2)'
    );
  } else if(name == 'Way Of The Drunken Master') {
    // Have to hard-code these proficiencies, since featureRules only handles
    // notes w/a single type of granted proficiency
    rules.defineRule('skillProficiency.Performance',
      'skillNotes.drunkenMasterBonusProficiencies', '=', '1'
    );
    rules.defineRule("toolProficiency.Brewer's Supplies",
      'skillNotes.drunkenMasterBonusProficiencies', '=', '1'
    );
    rules.defineRule
      ('features.Leap To Your Feet', 'featureNotes.tipsySway', '=', '1');
    rules.defineRule
      ('features.Redirect Attack', 'featureNotes.tipsySway', '=', '1');
  } else if(name == 'Way Of The Kensei') {
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
    rules.defineRule('combatNotes.deftStrike', 'monkMeleeDieBonus', '=', null);
    rules.defineRule('combatNotes.kenseiWeapons',
      pathLevel, '=', 'source>=17 ? 5 : source>=11 ? 4 : source>=6 ? 3 : 2'
    );
    rules.defineRule
      ('weaponChoiceCount', 'combatNotes.kenseiWeapons', '+=', null);
  } else if(name == 'Way Of The Sun Soul') {
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
      (rules, 'Searing Arc Strike', 'W', null, ['Burning Hands']);
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
