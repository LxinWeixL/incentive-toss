# Two Random Toss Website

An interactive React website for two random tosses:

1. Toss 1 randomly selects a trial number from 1 to 180.
2. Toss 2 uses the entered value, delay, and chance to randomly determine whether the value-delay outcome is selected.
3. The third panel calculates the total incentive:

```text
Total incentive = 10 SGD instant incentive + add-on incentive
```

If Toss 2 is selected, the add-on incentive equals the entered value and displays the delay.  
If Toss 2 is not selected, the add-on incentive is 0 SGD.

## Public link

After GitHub Pages deployment finishes, the public website link is:

https://lxinweixl.github.io/incentive-toss/

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal.

## Build

```bash
npm run build
```
