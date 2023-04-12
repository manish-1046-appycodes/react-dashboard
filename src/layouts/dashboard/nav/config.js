// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  // {
  //   title: 'search',
  //   path: '/dashboard/search',
  //   icon: icon('search_icon'),
  // icon: icon('ic_analytics'),
  // },
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'profile',
    path: '/dashboard/profile',
    icon: icon('ic_user'),
  },
  {
    title: 'history',
    path: '/dashboard/history',
    icon: icon('history_icon'),
  },
  {
    title: 'FAQ',
    path: '/dashboard/faq',
    icon: icon('faq_icon'),
  },
  {
    title: 'help',
    path: '/dashboard/help',
    icon: icon('ic_lock'),
  },
  {
    title: 'products',
    path: '/dashboard/products',
    icon: icon('ic_lock'),
  },
  {
    title: 'users',
    path: '/dashboard/users',
    icon: icon('ic_lock'),
  },
  {
    title: 'blogs',
    path: '/dashboard/blogs',
    icon: icon('ic_lock'),
  },
  {
    title: 'test',
    path: '/dashboard/test',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
