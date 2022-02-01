import type { A, B, C } from './types';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function main() {
  var i: number = getRandomInt(10);
  var methods: C;

  if (i < 5) {
    methods = {
      method: (id: number) => {
        console.log(id);
      },
      str: 'yata',
      rata: 5,
    };
  } else {
    methods = {
      method: (id: number) => {
        id += 5;
        console.log(id);
      },
      str: 'wesh',
    };
  }
  methods.method(i);
}
