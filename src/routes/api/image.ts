import express from 'express';
import fs from 'fs';
import path from 'path';
import resizeImage from './sharpResizer';

const image = express.Router();

image.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    //fetch query data
    const imageName = req.query['image'] as string;
    const imageWidth = parseInt((req.query['width'] as string) || '0', 10);
    const imageHeight = parseInt((req.query['height'] as string) || '0', 10);

    //check if there is any problem with the query
    if (imageName == '' || imageWidth < 1 || imageHeight < 1) {
      //declare response to be responsed with
      let wrongQueryInputResponse = 'Please make sure you entered a correct';
      //if condtions to better detrmine which is the wrong query data and add it to the response
      //check the imageName query
      if (imageName == '') {
        wrongQueryInputResponse = wrongQueryInputResponse + ' name,';
      }
      //check the imageWidth query
      if (imageWidth < 1) {
        wrongQueryInputResponse = wrongQueryInputResponse + ' width,';
      }
      //check the imageHeight query
      if (imageHeight < 1) {
        wrongQueryInputResponse = wrongQueryInputResponse + ' heghit,';
      }
      //respond with the detected wrong query input
      res.status(400).send(wrongQueryInputResponse);
    } else {
      //get the path of the full image
      const imagePath = path.resolve(
        __dirname,
        `../../../assets/images/${imageName}.jpg`
      );
      //check if the image exist
      fs.promises
        .access(imagePath, fs.constants.F_OK)
        //if the image exists
        .then((): void => {
          //check if the image can be read
          fs.promises
            .access(imagePath, fs.constants.R_OK)
            //if the image can be read
            .then((): void => {
              //get the path of the thumbnail
              const thumbPath = path.resolve(
                __dirname,
                `../../../assets/thumbnails/${imageName}--${imageWidth}--${imageHeight}.jpg`
              );
              //check if the thumbnail can be read
              fs.promises
                .access(thumbPath, fs.constants.R_OK)
                //if the thumbnail can be read
                .then(
                  (): void => {
                    //read the file
                    fs.promises
                      .readFile(thumbPath)
                      .then((thumbnail: Buffer): void => {
                        res.status(200).type('jpg').send(thumbnail);
                      });
                  }, //if the thumbnail can't be read or doesn't exist
                  (): void => {
                    resizeImage(imagePath, imageWidth, imageHeight, thumbPath)
                      .then((processedImage: Buffer | void): void => {
                        res
                          .status(200)
                          .type('jpg')
                          .send(processedImage as Buffer);
                      })
                      .catch((): void => {
                        res
                          .status(500)
                          .send('<p>Error proccesing the image :(</p>');
                      });
                  }
                );
              //if the thumbnail can't be read or doesn't exist
            })
            //if the image can't be read
            .catch((): void => {
              res
                .status(403)
                .send(
                  "<p>You don't have permissions to access this file or it's corrupted<p>"
                );
            });
        })
        //if the image doesn't exist
        .catch((): void => {
          res.status(404).send("<p>Image doesn't exist<p>");
        });
    }
  }
);

export default image;
