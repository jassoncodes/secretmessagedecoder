const doc1 =
  "https://docs.google.com/document/d/e/2PACX-1vRMx5YQlZNa3ra8dYYxmv-QIQ3YJe8tbI3kqcuC7lQiZm-CSEznKfN_HYNSpoXcZIV3Y_O3YoUB1ecq/pub";

const doc2 =
  "https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub";

// import puppeteer from "puppeteer";
const puppeteer = require("puppeteer");

const getCoordinates = async (url) => {
  if (url === undefined) {
    throw new Error(`url paramareter error`);
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const coordinates = await page.evaluate(() => {
    const trElements = document.querySelectorAll(
      "#contents div table > tbody > tr"
    );

    return Array.from(trElements)
      .slice(1)
      .map((trElement) => {
        const xCoordinate = Number(
          trElement.children[0].querySelector("p").querySelector("span")
            .innerText
        );
        const yCoordinate = Number(
          trElement.children[2].querySelector("p").querySelector("span")
            .innerText
        );
        const character = trElement.children[1]
          .querySelector("p")
          .querySelector("span").innerText;

        return { xCoordinate, yCoordinate, character };
      });
  });

  await browser.close();

  return coordinates;
};

const generateGrid = (maxCols, maxRows) => {
  let matrix = [];

  for (let i = 0; i < maxCols; i++) {
    let rows = [];
    for (let i = 0; i < maxRows; i++) {
      rows.push(" ");
    }
    matrix.push(rows);
  }

  return matrix;
};

const generateMessage = (coordinates) => {
  // get grid limits
  let maxX = 0;
  let maxY = 0;

  coordinates.forEach((coordinate) => {
    if (coordinate.xCoordinate > maxX) {
      maxX = coordinate.xCoordinate;
    }
    if (coordinate.yCoordinate > maxY) {
      maxY = coordinate.yCoordinate;
    }
  });

  let grid = generateGrid(maxY + 1, maxX + 1);
  console.log(grid);

  // populate grid
  for (let coordinate of coordinates) {
    grid[coordinate.yCoordinate][coordinate.xCoordinate] = coordinate.character;
  }
  return grid.reverse();
};

const messaggeDecoder = async (url) => {
  const coordinates = await getCoordinates(url);

  console.log(coordinates);

  let messageGrid = generateMessage(coordinates);

  for (let row of messageGrid) {
    console.log(row.join(""));
  }
};

messaggeDecoder(doc2);

messaggeDecoder(doc1);
