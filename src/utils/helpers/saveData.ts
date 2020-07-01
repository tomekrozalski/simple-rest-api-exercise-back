import * as aws from 'aws-sdk';

import { dataType } from 'utils/types/data.type';

const s3 = new aws.S3({});

const saveData = (values: dataType): Promise<dataType> =>
  new Promise((resolve, reject) => {
    s3.upload(
      {
        Bucket: 'simple-rest-api-exercise',
        Key: 'data.json',
        Body: JSON.stringify(values, null, '  '),
        ACL: 'public-read',
      },
      (errors, data) => {
        if (errors) {
          reject(errors);
        } else {
          resolve();
        }
      },
    );
  });

export default saveData;
