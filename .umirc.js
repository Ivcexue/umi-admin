import routes from './config/routes';
import proxy from './config/proxy';
const { UMI_ENV } = process.env;
export default {
  treeShaking: true,
  routes,
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true,
        },
        dynamicImport: true,
        title: '轻云OA管理后台',
        default: 'zh-CN',
        dll: false,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
        hd: false,
      },
    ],
  ],
  proxy: proxy[UMI_ENV || 'dev'],
};

