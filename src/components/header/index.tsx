import SvgIcon from '../SvgIcon';
import './index.scss';

// 这种只会发出一个请求
import ids from 'virtual:svg-icons-names';
console.log(ids);
const iconUrls = ids
  .filter((item) => item.includes('-'))
  .map((item) => item.slice(5));
console.log(iconUrls);

// 这种情况还是会发出http请求
// const modules = import.meta.glob('../../assets/svgs/logo-*.svg', {
//   eager: true,
// });
// // const iconUrls = Object.values(modules).map((mod: any) => mod.default);
// const iconUrls = Object.values(modules).map((mod: any) => {
//   const fileName = mod.default.split('/').pop();
//   const [svgName] = fileName.split('.');
//   return svgName;
// });

// import Worker from './example.js?worker';
// import init from './fib.wasm?init';

// 处理worker文件
// const worker = new Worker();
// worker.addEventListener('message', (e) => {
//   console.log(e);
// });

// 处理wams文件
// type FibFunc = (num: number) => number;
// init({}).then((instance) => {
//   const fibFunc = instance.exports.fib as FibFunc;
//   console.log(fibFunc(10));
// });

export function Header() {
  return (
    <div>
      <p className="header" p="y-20px">
        This is Header Test count is
      </p>
      {iconUrls.map((item) => (
        <SvgIcon name={item} key={item} width="50" height="50" />
      ))}
    </div>
  );
}
