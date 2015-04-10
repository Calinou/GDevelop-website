GDevelop website
===

This is the repository for the new website for **[GDevelop](http://www.compilgames.net)**, the open source game creator requiring no programming skills.

Any contribution, design or wording enhancements is welcome! Open issues if you having anything to say or, even better, submit a pull request. You can also discuss with the community on **[GDevelop forums](http://forum.compilgames.net)**.

If you want to **translate the website to your language**, just go on [the Crowdin translation project](https://crowdin.com/project/gdevelop-website)!

## Development

Ensure you have [Node.js](https://nodejs.org) installed. Bower is used for managing front-end dependencies, EJS templates files are used to write the pages and gulp is used to launch tasks. 

Translations are stored into *locale* directory, in plain JSON files. Internationalized files (for example, main-fr.html for main.ejs) are automatically build for each language with a catalog which has a high translation ratio (>70% translated strings).

### Installation

    npm install -g bower
    npm install -g gulp
    npm install
    bower install

### Workflow

To generate HTML pages from .ejs files, with bower dependencies, compiled stylesheets and javascript files, launch gulp:

    gulp

A gulp *watch* task is available that monitors any changes to the .ejs, .js or .scss files:

    gulp watch

Simply open main.html to see the website. Language redirections is handled by index.php (require that you access to this file using a PHP server).

### Updating translations

In .ejs files, make sure that any string to be translated is wrapped inside a call to `_` function (this mimics gettext way of marking strings to translate):

    <p><%= _('Text to translate') %></p>

 * Update *locale/catalog.json* by running `gulp update-translation`.
 * The *catalog.json* should then be uploaded to the [the Crowdin translation project](https://crowdin.com/project/gdevelop-website) by the project administrator.
 * To update the translations, build the project on the Crowdin page, download the archive and replace *.json* files in *locale* directory by the ones contained in the archive.

## License

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/).

GDevelop is under the MIT and GPL v3 licenses: check out the [GD repository](https://github.com/4ian/GD) for more information and how to contribute to the software.
