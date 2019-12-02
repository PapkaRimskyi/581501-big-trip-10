const createFilterData = () => {
  return [
    {
      inputCardId: `filter-everything`,
      inputValue: `everything`,
      inputChecked: true,
      labelName: `Everything`,
    },
    {
      inputCardId: `filter-future`,
      inputValue: `future`,
      inputChecked: false,
      labelName: `Future`,
    },
    {
      inputCardId: `filter-past`,
      inputValue: `past`,
      inputChecked: false,
      labelName: `Past`,
    },
  ];
};

export {createFilterData};
