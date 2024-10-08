import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const management: AppRouteModule = {
  path: '/case',
  name: '案件管理',
  component: LAYOUT,
  redirect: '/case/list',
  meta: {
    hideChildrenInMenu: true,
    icon: 'mdi:bookshelf',
    title: '案件管理',
    orderNo: 2,
  },
  children: [
    {
      path: 'list',
      name: '案件管理',
      component: () => import('@/views/case/list/index.vue'),
      meta: {
        title: '案件管理',
      },
    },
    {
      path: 'list/detail/:id',
      name: '案件详情',
      component: () => import('@/views/case/detail/index.vue'),
      meta: {
        title: '案件详情',
        currentActiveMenu: '/case',
        realPath: '/case/list/detail',
      },
    },
    {
      path: 'list/add',
      name: '新增案件',
      component: () => import('@/views/case/add/index.vue'),
      meta: {
        title: '新增案件',
        currentActiveMenu: '/case',
        realPath: '/case/list/add',
      },
    },
  ],
};

export default management;
