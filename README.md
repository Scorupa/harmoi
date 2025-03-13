### Running project locally

`npm run dev`

---

### Updating Github Pages

`npm run predeploy`  
`npm run deploy`

### Adding new Glyphs

1. Commit and push svgs to harmoiGlyphs repo directly. (Do NOT push from here)
2. Once you have enough glyphs, `git submodule update --remote --checkout`
3. Add commit (changing commit submodule points to) and push
4. then update github pages (see above)

### (memo) React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
