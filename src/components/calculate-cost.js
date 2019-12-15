const countExtraServices = (extraServicesCollection) => {
  let extraServicesSum = 0;
  if (extraServicesCollection.length !== 0) {
    for (let service of extraServicesCollection) {
      extraServicesSum += +service.price;
    }
  }
  return extraServicesSum;
};

export const calculateRouteCost = (routesData) => {
  const costInput = document.querySelector(`.trip-info__cost-value`);
  let sum = 0;
  for (let i = 0; i < routesData.length; i++) {
    const {tripCost, extraServices} = routesData[i];
    sum += +tripCost + countExtraServices(extraServices);
  }
  costInput.textContent = sum;
};
