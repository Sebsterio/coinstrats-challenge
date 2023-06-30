# Coinstrats Challenge

by Sebastian Rosloniec

## How to run

```
npm i
npm run dev
```

## Notes

- I used a different websocket endpoint than the one provided by you due to CORS issues.
- I chose to use the useWebSocket hook for convenience (e.g. it handles unmounting out of the box)
- Ditto for MaterialUI - decent styles with minimal effort
- Filtering of the data could be done in the view layers and/or incorporated into the Mui table, but I ran out of time. Besides, it would be a tradeoff of performance for UX (state persistance). Of course, there are many other ways to optimize it, such as virtualization, caching, SWR, etc., which I suppose is beyond the scope of this challenge.
- The spreading of the props into components is not how I'd do it in production, but it gets the job done in prototyping.
- The styles in my final commit are not fully complete and there may be some redundancies, but unfortunately I'm out of time.

Thanks!
