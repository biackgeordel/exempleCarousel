const boutonSuivant = document.querySelector(".suivant");
const boutonPrecedent = document.querySelector(".precedent");
const containerScroll = document.querySelector("div.container-scroll");
const cont = document.querySelector("div.container-scroll");
const tabElement = containerScroll.querySelectorAll(".element-scroll");

let index = 0;
targetCurrent = 0; //tag move
const deplacement = (tabBloc) => {
  let pos = 0;
  return tabBloc.reduce((acc, element) => {
    if (acc.length === 0) {
      pos = element.clientWidth;
      acc.push(pos);
    } else {
      pos = pos + element.clientWidth;
      acc.push(pos);
    }
    acc = acc.filter((el) => el !== 0);
    return acc;
  }, []);
};

const start = () => {
  return Math.round(containerScroll.getBoundingClientRect().left);
};
const init = (list) => {
  // index = 0;
  list.forEach((element) => {
    element.style.transform = `translateX(0px)`;
  });
  console.log("init: ", ...list);
  retour = true;
};

function scroll(listElement) {
  //on recupere dans list le tableau des elements
  const list = [...listElement];
  let listNew;
  let tabdeplacement = deplacement(list);
  boutonSuivant.addEventListener("click", () => {
    listNew = scrollRight(list, tabdeplacement);
  });
  boutonPrecedent.addEventListener("click", () => {
    console.log("index retour", index);

    if (index > 0) {
      index--;

      if (index === 0) {
        init(listNew);
      } else {
        listNew = listNew.map((element) => {
          element.style.transform = `translateX(-${
            tabdeplacement[index - 1]
          }px)`;
          return element;
        });
      }
    }
  });
}
scroll(tabElement);

function scrollRight(list, tabdeplacement) {
  console.log("right", tabdeplacement[index]);
  list = list.map((element) => {
    element.style.transform = `translateX(-${tabdeplacement[index]}px)`;
    return element;
  });
  console.log(list);

  if (index < list.length - 1) {
    index++;
  }
  return list;
}

window.addEventListener("resize", () => {
  init([...tabElement]);
});
