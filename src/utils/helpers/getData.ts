import * as aws from 'aws-sdk';

import { dataType } from 'utils/types/data.type';

const s3 = new aws.S3({});

const getData = (): Promise<dataType> =>
  new Promise((resolve, reject) => {
    s3.getObject(
      {
        Bucket: 'simple-rest-api-exercise',
        Key: 'data.json',
      },
      (errors, data) => {
        if (errors) {
          reject('AWS S3 did not return data');
        } else {
          resolve(JSON.parse(data.Body.toString()));
        }
      },
    );
  });

export default getData;
