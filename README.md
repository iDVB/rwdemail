# rwdemail
Responsive or Basic Email Development in a box! Automate Everything, from SASS precomiling, CSS Inlining, CSS/HTML and Image Minification, S3 Image Hosting and [Litmus](https://litmus.com) email testing. With the help of [INK templates](http://zurb.com/ink/docs.php) and its CSS boilerplate, designing emails of any kind is a breeze.

## Features
* Image Optimization with [jpegtran](http://jpegclub.org/jpegtran/) and [OptiPNG](http://optipng.sourceforge.net/)
* HTML templating with [EJS](https://github.com/visionmedia/ejs) and [more](https://github.com/dwightjack/grunt-ejs-render)
* SCSS stylesheets with [SASS](http://sass-lang.com/)
* Inlining CSS styles with [Email-Builder](https://github.com/yargalot/Email-Builder)
* CSS/HTML Minification
* Local Test Server with [Connect](https://github.com/gruntjs/grunt-contrib-connect)
* Automated [Litmus](https://litmus.com) Email Tests with [Email-Builder](https://github.com/yargalot/Email-Builder)
* HTML/CSS Responsive Email Framework with [Zurb's INK](http://zurb.com/ink/)

## Install
1. Create *'Projects'* directory in C: drive
1. Open Git Bash in *'C:/Projects'*
1. Clone this git repo `git clone https://github.com/iDVB/rwdemail.git`
1. Git bash into this directory `cd rwdemail`
1. Install [Python v2.\*.\*](https://www.python.org/download/)
  * **MUST be version 2** and **MUST be Windows binary. NOT x64**
1. Install [Ruby](http://rubyinstaller.org/downloads/)
  * Make sure to check "Add Ruby executables to your PATH" when prompted
1. In Git Bash, install SASS `gem install sass`
1. Install [Node](http://nodejs.org/download/)
  * **MUST be 32-bit version. NOT 64-bit**
1. Using Node's 'Node.js Command Prompt' cd to the repo directory  `cd C:/Projects/rwdemail`
1. Install all Node packages `npm install`

Everything should be installed. To test, in your Git Bash run `grunt` 

## Requirements
* **On OSX:** Xcode
* **On Windows:** MS Visual Studio 2012 for Windows Desktop (Express version works well)
* Grunt-cli >= 0.1.7 and Grunt >=0.4.2 (`npm install grunt-cli -g`)
* Python >= 2.7.6 ([installers](https://www.python.org/downloads/))
* Ruby >= 1.9.3 ([installers](http://www.ruby-lang.org/en/downloads/))
* SASS >= 3.2.19 (`gem install sass`)
* Node.js >= 0.10.20 ([install wiki](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager))

## Ink (http://zurb.com/ink/)
Supported Clients (may be outdated, please see [Ink Docs](http://zurb.com/ink/docs.php#compatibility))
* Apple Mail (Desktop)
* Apple Mail (iOS)
* Outlook (2000, 2002, 2003)
* Outlook (2007, 2010, 2013)
* Outlook (2011)
* Thunderbird
* Android
* Gmail (Desktop)
* Gmail (Mobile, iOS, Android)
* Outlook 2011 for Mac
* AOL Mail
* Hotmail
* Outlook.com

# Thanks
- [dwitghtjack](https://github.com/dwightjack) for [grunt-email-boilerplate](https://github.com/dwightjack/grunt-email-boilerplate/blob/master/README.md) which this was based on
- [yargalot](https://github.com/yargalot) for [Email-Builder](https://github.com/yargalot/Email-Builder) which is used

## License
Copyright (c) 2014 Dan Van Brunt Licensed under the MIT license.

## To Do:
- suggestions welcome

