export const conditionGradients = {
  warm: {
    day: 'linear-gradient(45deg, #fa709a, #daab2c)',
    night: 'linear-gradient(45deg, #3b3772, #97718c)',
  },
  cold: {
    day: 'linear-gradient(45deg, #bd90bd, #6eaab1)',
    night: 'linear-gradient(45deg, #243949, #517fa4)',
  },
};

export const warmWeatherCodes = new Set([1000, 1003, 1006, 1009]);
export const coldWeatherCodes = new Set([
  1030, 1063, 1066, 1069, 1072, 1087, 1114, 1117, 1135, 1147, 1150, 1153, 1168, 1171, 1180, 1183,
  1186, 1189, 1192, 1195, 1198, 1201, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1240,
  1243, 1246, 1249, 1252, 1255, 1258, 1261, 1264, 1273, 1276, 1279, 1282,
]);
