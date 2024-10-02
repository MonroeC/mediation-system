import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const client: AppRouteModule = {
  path: '/client',
  name: '委案方',
  component: LAYOUT,
  redirect: '/client/list',
  meta: {
    hideChildrenInMenu: true,
    icon: 'mdi:bookshelf',
    title: '委案方',
    orderNo: 2,
  },
  children: [
    {
      path: 'list',
      name: '委案方',
      component: () => import('@/views/client/list/index.vue'),
      meta: {
        title: '委案方',
      },
    },
  ],
};

export default client;
