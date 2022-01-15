This directory contains the javascript api to interact with the
Flash theme.  Contents should not be modified.  For usage please
see the documentation.

DEVELOPMENT:

themeapi.js is the only file that needs included.  It is created
from the other js files using smusher.pl.  Usage for this is:

1. delete themeapi.js
2. perl smusher.pl

the perl script will optimize and concat all .js files in the
directory into themeapi.js
