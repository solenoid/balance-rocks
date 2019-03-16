# Balance Rocks

Experimental website.

This is geared towards trying out a mix of tried and true approaches along with any type of experimental approach to see how they work together.

When there is a lack of experiments being tried it should serve as a good starting point for a somewhat realistic website / app that has sensible approaches in play.

## Getting Started

You'll need to get dependencies and copy static resources to get going initially.

```
npm run build
```

To run things locally start up the webpack dev server.

```
npm start
```

After that's running visit the site:

<http://localhost:3000/>

## Contributions

This is more of a personal project until it hits a steady state. So feel free to fork and try out your own experiments, but trying to get them integrated back here isn't a goal.

## Experiments

### Hooks

Something to note regarding hooks is that the react-hot-loader story is still a bit complex and hopefully that settles down more throughout time.

Context about what's been hard and current resolutions that are tucked in docs too:

- <https://github.com/gaearon/react-hot-loader/issues/1088>
- <https://github.com/gaearon/react-hot-loader/issues/1173>
- <https://github.com/reactjs/rfcs/pull/74>

## Coming Soon

### Build pipeline

Likely headed towards travis-ci.

### Production ready JS

Make sure the built JS is optimized well and can serve correctly outside of dev.

### Settle down styling

Likely getting in a simple css approach.

### API secrets locally and after deploy

Earlier versions fetched data from an API with the right token, but the current version just bakes in a single pull of that data. Getting secrets and fetched data woven through will mean this has a more realistic data fetching approach.

The Pexel API key is available after login over here once you've requested it:

<https://www.pexels.com/api/new/>
