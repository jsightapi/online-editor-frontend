const scaleMultiplier = {
  width1040: 0.8,
  width850: 0.6,
  width630: 0.3,
  width360: 0.2,
};

export const screenWidthMultiplier = (screenWidth: number) => {
  if (screenWidth < 360) {
    return scaleMultiplier.width360;
  }

  if (screenWidth < 630) {
    return scaleMultiplier.width630;
  }

  if (screenWidth < 850) {
    return scaleMultiplier.width850;
  }

  if (screenWidth < 1040) {
    return scaleMultiplier.width1040;
  }

  return 1;
};
