# WC3 DotA Info

A single-page web app containing info on WarCraft III DotA. Currently only has data for heroes. This is the front end part of the website.

## How to use

Run `npm install` once first.

1. Start up a [resource server](http://github.com) to fetch resources from. Its endpoint must match the set `SNOWPACK_PUBLIC_RESOURCE_SERVER` environment variable on the host, or at the `.env` file if you are just running locally.
2. Run `npm start` to run the app in development mode. Open http://localhost:8080 to view it in the browser.

## Building

Run `npm run build` for building the app for production to the `build/` folder. Don't forget to set the appropriate `SNOWPACK_PUBLIC_RESOURCE_SERVER` value (the resource API endpoint) before building.

## To-do list

* Make layout responsive on various viewport sizes and orientations.
* Add items.
* Handle other abilities of heroes not in `UnitAbilities.slk`.

## Credits

* [flowtsohg (GhostWolf)](https://github.com/flowtsohg) - I used his [mdx-m3-viewer](https://github.com/flowtsohg/mdx-m3-viewer) library for the model viewer.
* [d07RiV](https://github.com/d07RiV) - I took some reference from his [wc3data](https://github.com/d07RiV/wc3data)'s model viewer code on how to set the camera to portrait view.