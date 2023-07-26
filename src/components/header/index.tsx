import './index.scss';
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
    <p className="header" p="y-20px">
      This is Header Test count is
    </p>
  );
}
