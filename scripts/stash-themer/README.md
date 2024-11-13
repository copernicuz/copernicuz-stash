# Stash Base CSS Creator

This is a small script which transforms Stash's original CSS file into something that's easy to theme.

It works by deleting any CSS rules that don't have anything to do with color, and then injects CSS variables into the rest.

In the resulting output a `:root` rule is injected with a set of CSS variables of which you can just change the colors of to your liking.

## How to use it

You can either transform the CSS yourself (recommended) or copy the ready-made one from releases and edit that.

It's recommended to transform it yourself because the release may be out of date in relation to Stash.

### Transform it yourself

You need Node.js to do this.

You also only need to do this once.

- Clone this repo
- In your browser, go to a running Stash instance, open browser dev tools and save the complete CSS file
  - Chrome: Sources tab -> assets -> index-*.css
  - Firefox: Style Editor -> in search bar type "index-"
- In a CLI run `node transform.js <css file you just saved>`. It will create custom.css
- Continue to the next section

### Editing custom.css

Simply edit the variables at the top of custom.css to your liking and place the file at the root of Stash's config folder.

Make sure "Custom CSS enabled" is toggled on in Stash (Settings -> Interface -> Custom CSS).

Then clear cache and refresh in your browser.