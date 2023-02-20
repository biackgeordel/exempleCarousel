const boutonSuivant = document.querySelector(".suivant");
const boutonPrecedent = document.querySelector(".precedent");
const containerScroll = document.querySelector("div.container-scroll");
const cont = document.querySelector("div.container-scroll");
const tabElement = containerScroll.querySelectorAll(".element-scroll");

let index = 0;
targetCurrent = 0; //tag move
let retour = false;

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
};
const positionReel = (list, tabdeplacement) => {
  list.forEach((element) => {
    element.style.transform = `translateX(-${tabdeplacement[index - 1]}px)`;
  });
  return true;
};

function scroll(listElement) {
  //on recupere dans list le tableau des elements
  const list = [...listElement];
  let listNew;
  let tabdeplacement = deplacement(list);
  boutonSuivant.addEventListener("click", () => {
    if (retour) {
      tabdeplacement = deplacement(list);
      // index++;
      retour = false;
    }
    listNew = scrollRight(list, tabdeplacement);
  });

  boutonPrecedent.addEventListener("click", () => {
    if (retour) {
      tabdeplacement = deplacement(list);
      retour = false;
    }
    console.log("index retour", index);
    scrollLeft(listNew, tabdeplacement);
  });
}
scroll(tabElement);

function scrollRight(list, tabdeplacement) {
  console.log(...tabdeplacement);
  console.log(tabdeplacement[index]);
  list = list.map((element) => {
    element.style.transform = `translateX(-${tabdeplacement[index]}px)`;
    return element;
  });
  if (index < list.length - 2) {
    index++;
  }
  return list;
}

function scrollLeft(listNew, tabdeplacement) {
  if (index > 0) {
    index--;

    if (index === 0) {
      init(listNew);
    } else {
      listNew = listNew.map((element) => {
        element.style.transform = `translateX(-${tabdeplacement[index - 1]}px)`;
        return element;
      });
    }
  }
}

window.addEventListener("resize", () => {
  const list = [...tabElement];
  console.log(index);
  const position = deplacement(list);
  if (index !== 0) {
    retour = positionReel(list, position);
  } else {
    init(list);
  }
});
