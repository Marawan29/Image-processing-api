import express from 'express';
import fs from 'fs';
import path from 'path';

const imagesBrowser = express.Router();

//image browser route middleware
imagesBrowser.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    //define images folder path
    const imagesPath = path.resolve(__dirname, '../../../assets/images');

    //read names of images files
    fs.promises
      .readdir(imagesPath)

      //if promise resolved and no internal error occured
      .then((filenames: string[]): void => {
        //check if no files are fetched
        if (filenames.length == 0) {
          //respond with error 404 files not found
          const sentHtmlResponse = `<body style="background-color: #282828; width: 100%; height: 100%;">
                                                    <p style="text-align:center; color: #ffcc00; font-size: 28px;">
                                                        <strong style="color:red; font-size: 96px;">Error 404</strong><br>
                                                        No files are found in the images directory :(
                                                     </P>
                                                 </body>`;
          res.status(404).send(sentHtmlResponse);
        }
        //else(then there are files found) send the brwoser/epxplorer form
        else {
          let sentHtmlResponse = `<body style="background-color: #282828; width: 100%; height: 100%;">
                        <h1 style="text-align:center; color: #ffcc00;">Images Browser</h1>
                        <p style="text-align:center; color: #ffcc00;">
                            Note: enter the size of the image you want in the fields beside it then hit<strong style="color:red;"> Get</strong>
                        </p><hr>
                        <div>`;
          //loop on each image of the files
          for (const filename of filenames) {
            //remove the extension from the file name
            const imageName = filename.replace('.jpg', '');
            //declare it's div
            sentHtmlResponse =
              sentHtmlResponse +
              `
                    <div>
                        <form action="./image" method="get" style="text-align:center; color: #ffcc00;">
                            <label for="image" style="color: red; font-size: 28px;">${imageName}&nbsp;</label>
                            <input type="text" name="image" value="${imageName}" readonly style="display: none;>
                            <label for="width">&nbsp;Width:</label>
                            <input type="number" name="width" min="1">
                            <label for="height">&nbsp;Height:</label>
                            <input type="number" name="height" min="1">
                            <input type="submit" value="Get">
                        </form><hr>
                    </div>`;
          }
          sentHtmlResponse = sentHtmlResponse + `</div></body>`;
          //respond with the images browser
          res.status(200).send(sentHtmlResponse);
        }
      })
      // If promise is rejected and internal error happend
      .catch((): void => {
        res.status(500).send("Error, Coudn't read any images");
      });
  }
);

export default imagesBrowser;
