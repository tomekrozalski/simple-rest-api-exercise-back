import { writeFileSync } from 'fs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { dataType } from './data.type';
import * as data from './data.json';

@Injectable()
export class AppService {
  getData(): dataType {
    return data;
  }

  writeDataFile = (data: dataType) => {
    writeFileSync('src/data.json', JSON.stringify(data, null, '  '));
  };

  addFlow({ category, code, name }): dataType {
    const isCategoryInDB = data.categories.find(
      ({ title }) => title.toLowerCase() === category.toLowerCase(),
    );

    if (!code) {
      throw new BadRequestException('You need to attach code');
    }

    if (isCategoryInDB) {
      const updatedData = {
        categories: data.categories.map(({ flows, title }) =>
          title.toLowerCase() === category.toLowerCase()
            ? {
                title,
                flows: flows.find(flow => flow.code === code)
                  ? flows
                  : [...flows, { code, name }],
              }
            : {
                title,
                flows,
              },
        ),
      };

      this.writeDataFile(updatedData);
      return updatedData;
    }

    throw new BadRequestException(
      `Category ${category} does not exist in database`,
    );
  }

  deleteFlow({ category, code }): dataType {
    const isFlowInCategory = data.categories
      .find(({ title }) => title.toLowerCase() === category.toLowerCase())
      ?.flows.find(flow => flow.code === code);

    if (isFlowInCategory) {
      const updatedData = {
        categories: data.categories.map(({ flows, title }) =>
          title.toLowerCase() === category.toLowerCase()
            ? {
                title,
                flows: flows.filter(flow => flow.code !== code),
              }
            : {
                title,
                flows,
              },
        ),
      };

      this.writeDataFile(updatedData);
      return updatedData;
    }

    throw new BadRequestException(
      `Category ${category} does not exist in database`,
    );
  }
}
