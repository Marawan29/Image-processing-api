import request from 'supertest';
import fs from 'fs';
import path from 'path';
import app from '../../../index';

describe('GET /api/image', (): void => {
  it('tests if a good query (with every thing else is well and no thumbnail cached before) responds with status code 200', async (done): Promise<void> => {
    //declare a path for expected thumbnail to remove it in case it exist
    const imagePath = path.resolve(
      __dirname,
      `../../../../assets/thumbnails/kira--640--360.jpg`
    );
    //check if thumb alreay created
    fs.promises
      .access(imagePath, fs.constants.F_OK)
      //if a thumbnail exists
      .then(
        (): void => {
          //remove old thumb then request the endpoit
          fs.promises
            .unlink(imagePath)
            .then((): void => {
              request(app)
                .get('/api/image?image=kira&width=640&height=360')
                .then((response): void => {
                  expect(response.status).toBe(200);
                  done();
                });
            })
            .catch(() => {
              throw new Error("Couldn't remove the old thumb before testing");
            });
        }, //if no thumbnail exist
        (): void => {
          request(app)
            .get('/api/image?image=kira&width=640&height=360')
            .then((response): void => {
              expect(response.status).toBe(200);
              done();
            });
        }
      );
  });

  it('tests if a good query (with every thing else is well and no thumbnail cached before) responds with status code 200', async (done): Promise<void> => {
    //create a dummy file before requesting the endpoint to make sure it serves a cached thumb
    fs.promises
      .writeFile(
        path.resolve(__dirname, `../../../../assets/thumbnails/kira--1--1.jpg`),
        'Dummy File to test serving cached thumbs'
      )
      .then((): void => {
        request(app)
          .get('/api/image?image=kira&width=1&height=1')
          .then((response): void => {
            expect(response.status).toBe(200);
            done();
          });
      })
      .catch((): void => {
        throw new Error("Couldn't remove the old thumb before testing");
      });
  });

  it('tests if a wrong querys are responded to with status code 400', async (done): Promise<void> => {
    request(app)
      .get('/api/image')
      .then((response): void => {
        expect(response.status).toBe(400);
        done();
      });
  });

  it('tests if a good querys (but no image exist) responds with status code 404', async (done): Promise<void> => {
    request(app)
      .get("/api/imagee?image=doesn'texsitblablabla&width=640&height=360")
      .then((response): void => {
        expect(response.status).toBe(404);
        done();
      });
  });
});
