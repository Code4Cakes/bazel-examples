import { mockRepository } from '@intf/testing';

export default {
  CurrentUserRepository: mockRepository(['get']),
  DownloadsListRepository: mockRepository(['fetch', 'delete']),
  FisNavigationRepository: mockRepository(['fetch']),
  InstitutionsRepository: mockRepository([
    'getBranding',
    'updateBranding',
    'resetBranding',
  ]),
  PeopleRepository: mockRepository(['getCurrentUser']),
  WorkItemsRepository: mockRepository(['fetchPaginated']),
};
