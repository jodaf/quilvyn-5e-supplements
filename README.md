## 5th Edition supplements plugin for the Quilvyn RPG character sheet generator.

The quilvyn-5E-supplements package bundles modules that extend Quilvyn to work
fifth edition supplements of D&D, applying the rules of the following books:

- <a href="https://dnd.wizards.com/products/tabletop-games/rpg-products/sc-adventurers-guide">Sword Coast Adventurer's Guide</a>
- <a href="https://dnd.wizards.com/products/tabletop-games/rpg-products/volos-guide-to-monsters">Volo's Guide to Monsters</a>
- <a href="https://dnd.wizards.com/products/tabletop-games/rpg-products/xanathars-guide-everything">Xanathar's Guide to Everything</a>

### Requirements

quilvyn-5E-supplements relies on the 5th Edition SRD module and the core
modules installed by the quilvyn-core package.

### Installation

To use quilvyn-5E-supplements, unbundle the release package into the plugins/
subdirectory within the Quilvyn installation directory, then append the
following lines to the file plugins/plugins.js:

    RULESETS["Volo's Guide supplement to D&D 5E rules - Character Races"] = {
      url:'Volo.js',
      group:'5E',
      supplement:'D&D 5E'
    };
    RULESETS["Volo's Guide supplement to D&D 5E rules - Monstrous Races"] = {
      url:'Volo.js',
      group:'5E',
      supplement:'D&D 5E'
    };
    RULESETS["Xanathar's Guide supplement to D&D 5E rules"] = {
      url:'Xanathar.js',
      group:'5E',
      supplement:'D&D 5E'
    };
    RULESETS['Sword Coast Campaign Setting using D&D 5E rules'] = {
      url:'SwordCoast.js',
      group:'5E',
      require:'D&D 5E'
    };

### Usage

Once the package plugins are installed as described above, start Quilvyn and
choose one or more of the rule sets shown above from the Rules menu in the
initial window.
