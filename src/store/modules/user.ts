import type { UserInfo } from '#/store';
import type { ErrorMessageMode } from '#/axios';
import { defineStore } from 'pinia';
import { store } from '@/store';
import { RoleEnum } from '@/enums/roleEnum';
import { PageEnum } from '@/enums/pageEnum';
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY, LAST_UPDATE_TIME_KEY } from '@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '@/utils/auth';
import { GetUserInfoModel, LoginParams } from '@/api/sys/model/userModel';
import { doLogout, getUserInfo, loginApi, refreshTokenApi } from '@/api/sys/user';
import { useI18n } from '@/hooks/web/useI18n';
import { useMessage } from '@/hooks/web/useMessage';
import { router } from '@/router';
import { usePermissionStore } from '@/store/modules/permission';
import { RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic';
import { isArray } from '@/utils/is';
import { h } from 'vue';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
  // 令牌刷新时间，单位分钟
  tokenRefreshTime: number;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
    // 令牌刷新时间，单位分钟
    tokenRefreshTime: 25,
  }),
  getters: {
    getUserInfo(state): UserInfo {
      return state.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(state): string {
      return state.token || getAuthCache<string>(TOKEN_KEY);
    },
    getRoleList(state): RoleEnum[] {
      return state.roleList.length > 0 ? state.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY);
    },
    getSessionTimeout(state): boolean {
      return !!state.sessionTimeout;
    },
    getLastUpdateTime(state): number {
      return state.lastUpdateTime;
    },
    getCacheLastUpdateTime(): number {
      return getAuthCache<number>(LAST_UPDATE_TIME_KEY);
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
      setAuthCache(TOKEN_KEY, info);
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    setCacheLastUpdateTime() {
      setAuthCache(LAST_UPDATE_TIME_KEY, new Date().getTime());
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.roleList = [];
      this.sessionTimeout = false;
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const data = await loginApi(loginParams, mode);
        const { accessToken: token } = data;
        // save token
        this.setToken(token);
        return this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;
      // get user info
      const userInfo = await this.getUserInfoAction();

      const sessionTimeout = this.sessionTimeout;
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        const permissionStore = usePermissionStore();

        // 动态路由加载（首次）
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction(userInfo?.menus);
          [...routes, PAGE_NOT_FOUND_ROUTE].forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw);
          });
          // 记录动态路由加载完成
          permissionStore.setDynamicAddedRoute(true);
        }

        goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME));
      }
      return userInfo;
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null;
      const userInfo = await getUserInfo();
      const { roles = [] } = userInfo;
      if (isArray(roles)) {
        this.setRoleList(roles);
      } else {
        userInfo.roles = [];
        this.setRoleList([]);
      }
      this.setUserInfo(userInfo);
      this.setCacheLastUpdateTime();
      this.refreshToken();
      return userInfo;
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          await doLogout();
        } catch {
          console.log('注销Token失败');
        }
      }
      this.setToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      if (goLogin) {
        // 直接回登陆页
        router.replace(PageEnum.BASE_LOGIN);
      } else {
        // 回登陆页带上当前路由地址
        router.replace({
          path: PageEnum.BASE_LOGIN,
          query: {
            redirect: encodeURIComponent(router.currentRoute.value.fullPath),
          },
        });
      }
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          // 主动登出，不带redirect地址
          await this.logout(true);
        },
      });
    },
    /**
     * 刷新令牌
     */
    async refreshToken() {
      let timer: any = null;
      const tokenRefreshTime = this.tokenRefreshTime;
      const loginTime = this.getCacheLastUpdateTime;
      const nowTime = new Date().getTime();
      const needTime = tokenRefreshTime * 60 * 1000 - (nowTime - loginTime);
      if (needTime <= 0) {
        // 重定向到登录页
        this.logout(true);
        return;
      }
      const needMinute = Math.floor(needTime / 1000 / 60);
      const needSecond = Math.floor((needTime / 1000) % 60);
      console.log(`还需要${needMinute}分${needSecond}秒刷新token`);
      timer = setTimeout(() => {
        refreshTokenApi()
          .then((res) => {
            const { accessToken } = res;
            this.setToken(accessToken);
            console.log('刷新Token成功');
            this.setCacheLastUpdateTime();
          })
          .catch(() => {
            console.error('刷新Token失败');
            this.logout(true);
          })
          .finally(() => {
            clearTimeout(timer);
          });
      }, needTime);
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
