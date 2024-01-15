## 5th Edition supplements plugin for the Quilvyn RPG character sheet generator.

The quilvyn-5e-supplements package bundles modules that extend Quilvyn to work
with 5th edition supplements of D&D, applying the rules from the following
books:

- <a href="https://dnd.wizards.com/products/eberron">Eberron: Rising From the Last War</a>
- <a href="https://dnd.wizards.com/products/sword-coast-adventurers-guide">Sword Coast Adventurer's Guide</a>
- <a href="https://dnd.wizards.com/products/tashas-cauldron-everything">Tasha's Cauldron of Everything</a>
- <a href="https://dnd.wizards.com/products/volos-guide-to-monsters">Volo's Guide to Monsters</a>
- <a href="https://dnd.wizards.com/products/xanathars-guide-everything">Xanathar's Guide to Everything</a>

### Requirements

quilvyn-5e-supplements relies on the 5th Edition SRD module installed by the
quilvyn-5E package and the core modules installed by the quilvyn-core package.

### Installation

To use quilvyn-5e-supplements, unbundle the release package, making sure that
the contents of the plugins/ subdirectory are placed into the corresponding
Quilvyn installation subdirectory, then append the following lines to the file
plugins/plugins.js:

    RULESETS["Tasha's Cauldron supplement to D&D 5E rules"] = {
      url:'plugins/Tasha.js',
      group:'5E',
      supplement:'D&D 5E'
    };
    RULESETS["Volo's Guide supplement to D&D 5E rules - Character Races"] = {
      url:'plugins/Volo.js',
      group:'5E',
      supplement:'D&D 5E'
    };
    RULESETS["Volo's Guide supplement to D&D 5E rules - Monstrous Races"] = {
      url:'plugins/Volo.js',
      group:'5E',
      supplement:'D&D 5E'
    };
    RULESETS["Xanathar's Guide supplement to D&D 5E rules"] = {
      url:'plugins/Xanathar.js',
      group:'5E',
      supplement:'D&D 5E'
    };
    RULESETS['Eberron Campaign Setting using D&D 5E rules'] = {
      url:'plugins/Eberron5E.js',
      group:'5E',
      require:'PHB5E.js'
    };
    RULESETS['Sword Coast Campaign Setting using D&D 5E rules'] = {
      url:'plugins/SwordCoast.js',
      group:'5E',
      require:'PHB5E.js'
    };

### Usage

Once the package plugins are installed as described above, start Quilvyn and
check the boxes next to one or more of the rule sets shown above from the rule
sets menu in the initial window.
