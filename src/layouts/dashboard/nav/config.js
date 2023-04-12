// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
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
];

export default navConfig;
