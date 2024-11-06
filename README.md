# 🔍 SecretMessageDecoder
**⚠️ Only for educational purpose**

> *Context:*
I came across this tech test that was so fun to get through because it really got me thinking the work around.

## 💡Question
Write a function that takes in the URL for such a Google Doc as an argument, retrieves and parses the data in the document, and prints the grid of characters.
When printed in a fixed-width font, the characters in the grid will form a graphic showing a sequence of uppercase letters, which is the secret message.

The document specifies the Unicode characters in the grid, along with the x- and y-coordinates of each character.

The minimum possible value of these coordinates is 0. There is no maximum possible value, so the grid can be arbitrarily large.

Any positions in the grid that do not have a specified character should be filled with a space character.

You can assume the document will always have the same format as the example document linked above.

For example, the simplified example document linked above draws out the letter 'F':
```bash
█▀▀▀
█▀▀
█  
```

Note that the coordinates (0, 0) will always correspond to the same corner of the grid as in this example, so make sure to understand in which directions the x- and y-coordinates
increase.

### Specifications

- Your code must be written in Python (preferred) or JavaScript.
- You may use external libraries.
- You may write helper functions, but there should be one function that:
   - Takes in one argument, which is a string containing the URL for the Google Doc with the input data, AND
   - When called, prints the grid of characters specified by the input data, displaying a graphic of correctly oriented uppercase letters.


## 🪄 Coding
Here is the step by step that I ran into after -quite a lot- of thinking:
1. Read the online document, scrape the code and extract the coordinates and corresponding character.
   ```bash
   # output from the test document:

   [
        { xCoordinate: 0, yCoordinate: 0, character: '█' },
        { xCoordinate: 0, yCoordinate: 1, character: '█' },
        { xCoordinate: 0, yCoordinate: 2, character: '█' },
        { xCoordinate: 1, yCoordinate: 1, character: '▀' },
        { xCoordinate: 1, yCoordinate: 2, character: '▀' },
        { xCoordinate: 2, yCoordinate: 1, character: '▀' },
        { xCoordinate: 2, yCoordinate: 2, character: '▀' },
        { xCoordinate: 3, yCoordinate: 2, character: '▀' }
    ]
   ```
2. Since the coordinates are basically are a x-location-point and y-location-point we're facing basically a grid, which can be "translated" as a two dimentional array.
3. Map the coordinates and get the dimensions for the grid that will be used to display the message, through the max y-coordinte for the cols of the grid, and the x-coordinate for the rows.
4. Generate the grid and fill it with empty spaces (or "·" which I used just to not see the grid "empty").
   ```bash
   # output:

        [
            [ '·', '·', '·', '·' ],
            [ '·', '·', '·', '·' ],
            [ '·', '·', '·', '·' ]
        ]
   ```
5. Map the coordinates and replace the elements in the grid on each specific coordinate (x, y).
    ```bash
    # output:

        █▀▀▀
        █▀▀ 
        █  
    ```

## 📦 Dependencies
[Puppeteer](https://www.npmjs.com/package/puppeteer)