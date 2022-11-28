# Refactor Typescript

## For each day

- use nodenext imports (.js)
- migrate tests to vitest
  - replace unneeded `_` with '\_'
  - split input reading to a separate line
- adjust readme references for the part files
- create benchmark scripts in package.json files
- rename every parse and interpret files to parse.function and
  interpret.function
- rename the runner function in p1.ts files to p1, and p2 in p2.ts
- change json import or get rid of the annoying node warnings
- rename input objects to resources, and the read fn to getResources

### Later once /js is done

- migrate each capability
- vitest coverage fix, hoist to root
