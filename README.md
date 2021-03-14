# WC3 DotA Info

[![Netlify Status](https://api.netlify.com/api/v1/badges/47086135-bad0-4788-b17a-600e461faac6/deploy-status)](https://app.netlify.com/sites/wc3-dota-info/deploys)

A single-page web app containing info on Warcraft III DotA. Currently only has data for heroes. This is the front end part of the website. Layout is not fully responsive, adding support for mobile viewport in the future.

You can view a demo deployed on Netlify here: https://wc3-dota-info.netlify.app/

## How to use

Run `npm install` once first.

1. Start up a [resource server](https://github.com/jp06/wc3-dota-info-api) to fetch resources from. Its endpoint must match the set `SNOWPACK_PUBLIC_RESOURCE_SERVER` environment variable on the host. If you're running on a local environment, you don't need to change anything because it is set to `http://localhost:4000` by default at the `.env` file.
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
* [Suke](https://twitter.com/Sukeart) - I used as background his [art here](https://www.deviantart.com/su-ke/art/Dota-1-320811752) which was also used as the loading screen in versions 6.76 to 6.83d.