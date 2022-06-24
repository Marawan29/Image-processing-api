import path from 'path';
import fs from 'fs';
import resizeImage from '../../../routes/api/sharpResizer';

describe('tests sharp resizer functionality', (): void => {
  //declare paths
  const imagePath = path.resolve(
    __dirname,
    `../../../../assets/images/kira.jpg`
  );
  const thumbPath = path.resolve(
    __dirname,
    `../../../../assets/thumbnails/testThumb.jpg`
  );
  it('tests if the sharpResizer resize well', async (): Promise<void> => {
    await expectAsync(
      resizeImage(imagePath, 640, 360, thumbPath)
    ).toBeResolved();
  });

  it('tests if the sharpResizer caches well', async (): Promise<void> => {
    //return the resizer buffer to a varible then try to cache it
    const processedImage = await resizeImage(imagePath, 640, 360, thumbPath);
    await expectAsync(
      fs.promises.writeFile(thumbPath, processedImage as Buffer)
    ).toBeResolved();
  });
});
