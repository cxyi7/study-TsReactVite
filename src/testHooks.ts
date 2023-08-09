import { Plugin } from 'vite';

export default function testHookPlugin(): Plugin {
  return {
    name: 'test-hook-plugin',

    // vite独有钩子
    config(config) {
      console.log('config');
    },
    // vite独有钩子
    configResolved(resolveConfig) {
      console.log('resolveConfig');
    },
    // 通用钩子
    options(opts) {
      console.log('options');
      return opts;
    },
    // vite独有钩子
    configureServer(server) {
      console.log('configureServer');
      setTimeout(() => {
        process.kill(process.pid, 'SIGTERM');
      }, 30000);
    },
    // 通用钩子
    buildStart() {
      console.log('buildStart');
    },
    // 通用钩子 --> 手动终止后调用
    buildEnd() {
      console.log('buildEnd1');
    },
    // 通用钩子 --> 手动终止后调用
    closeBundle() {
      console.log('closeBundle');
    },
  };
}
