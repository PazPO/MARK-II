'use strict';

const buildAPI = methods => {
  const api = {};
  for (const method of methods) {
    api[method] = (...args) => new Promise((resolve, reject) => {
      const url = `/api/${method}`;
      console.log(url, args);
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(args),
      }).then(res => {
        const { status } = res;
        if (status !== 200) {
          reject(new Error(`Status Code: ${status}`));
          return;
        }
        resolve(res.json());
      });
    });
  }
  return api;
};

const api = buildAPI(['sql', 'rect', 'move', 'rotate', 'read', 'render', 'resize']);

const show = async () => {
  const svg = await api.render('Rect1');
  const output = document.getElementById('output');
  output.innerHTML = svg;
};

const scenario = async () => {
  //const name='Select';
  const data = await api.sql('Select');
  console.dir({ data });
  //const output = document.getElementById('output');
  
  

};

scenario();
