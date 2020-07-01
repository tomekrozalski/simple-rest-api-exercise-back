import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { dataType } from 'utils/types/data.type';
import {
  getData as getDataFromAWS,
  saveData as saveDataToAWS,
} from 'utils/helpers';

@Injectable()
export class AppService {
  async getData(): Promise<dataType> {
    try {
      const data: dataType = await getDataFromAWS();
      return data;
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async addFlow({ category, code, name }): Promise<dataType> {
    const data = await this.getData();

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

      await saveDataToAWS(updatedData);
      return this.getData();
    }

    throw new BadRequestException(
      `Category ${category} does not exist in database`,
    );
  }

  async deleteFlow({ category, code }): Promise<dataType> {
    const data = await this.getData();

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

      await saveDataToAWS(updatedData);
      return this.getData();
    }

    throw new BadRequestException(
      `Category ${category} does not exist in database`,
    );
  }
}
