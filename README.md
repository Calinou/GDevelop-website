GDevelop website
===

This is the repository for the new website for **[GDevelop](http://www.compilgames.net)**, the open source game creator requiring no programming skills.

Any contribution, design or wording enhancements is welcome! Open issues if you having anything to say or, even better, submit a pull request. You can also discuss with the community on **[GDevelop forums](http://forum.compilgames.net)**.

## Development

### Installation

Ensure you have [Node.js](https://nodejs.org) installed. Bower is used for managing front-end dependencies and grunt is used to launch tasks.

    npm install -g bower
    npm install -g grunt-cli
    npm install
    bower install

### Workflow

To update index.html with bower dependencies, compile stylesheets and javascript files, launch grunt:

    grunt

A grunt *watch* task is available that monitor any changes to the .js or .scss files:

    grunt watch

## License

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/).

GDevelop is under the MIT and GPL v3 licenses: check out the [GD repository](https://github.com/4ian/GD) for more information and how to contribute to the software.
