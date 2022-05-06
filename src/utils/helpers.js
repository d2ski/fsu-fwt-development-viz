export const getClassName = function (rec) {
  const group = rec?.properties?.group || rec?.group;

  if (group === "FWT") return "fwt-state";
  if (group === "FSU") return "fsu-state";
  if (group === "FSU-B") return "fsu-b-state";
  if (group === "NGHBR") return "neighbour-state";
  return "";
};
