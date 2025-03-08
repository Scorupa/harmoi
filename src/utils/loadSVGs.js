const svgModules = import.meta.glob('../../harmoiGlyphs/*.svg');

export const loadSVGs = async () => {
  const entries = await Promise.all(
    Object.entries(svgModules).map(async ([path, importer]) => {
      const name = path.split('/').pop().replace('.svg', '');
      const module = await importer();
      return { name, src: module.default || module.ReactComponent };
    })
  );
  return entries;
};
