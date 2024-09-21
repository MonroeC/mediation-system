import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const home: AppRouteModule = {
  path: '/home',
  name: '首页',
  component: LAYOUT,
  meta: {
    hideChildrenInMenu: true,
    icon: 'ion:home',
    title: '首页',
    orderNo: 1,
    hideMenu: true,
  },
};

export default home;
