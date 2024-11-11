# copernicuz-stash

Custom Stash scripts I've written and use.

## Installing

In Stash, go to Settings > Interface > Custom JavaScript and enable it.

Then either simply copy & paste the contents of a script, or import it from CDN like so to also get auto-updates:

```js
import autoGenerateMarkers from "https://cdn.jsdelivr.net/gh/copernicuz/copernicuz-stash@main/scripts/autoGenerateMarkers.js";
```

Once I figure out how to make this a proper plugin it'll also be possible to add this as a repo to Stash and install my scripts from the UI directly.

## Why not a userscript?

I don't like userscripts because they're not easily portable between browsers. Adding scripts to Stash directly allows for easier backup, and it instantly works across all browsers.
