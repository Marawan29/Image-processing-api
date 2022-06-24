import sharp from 'sharp';
import fs from 'fs';

const resizeImage = async (
  imagePath: string,
  imageWidth: number,
  imageHeight: number,
  thumbPath: string
): Promise<Buffer | void> => {
  //process the image using the attributes passed to the function
  const Image = sharp(imagePath)
    .resize(imageWidth, imageHeight)
    .toBuffer()
    //if processed well cache the image
    .then((processedImage: Buffer): Buffer => {
      fs.promises
        .writeFile(thumbPath, processedImage)
        //catch if error happened while caching
        .catch((): void => {
          throw new Error("Image hasn't been cached for unexpected reason");
        });
      return processedImage;
    })
    //if the image was't processed reject the promise
    .catch((): void => {
      throw new Error("Couldn't process the image for unexpected reason");
    });
    return Image;
};

export default resizeImage;
