
const F2 = require('../../index');
const data = require('../data/candle.json');

describe('candle', () => {
  const canvas = document.createElement('canvas');
  canvas.width = 500;
  canvas.height = 500;
  document.body.appendChild(canvas);

  data.sort(function(obj1, obj2) {
    return obj1.time > obj2.time ? 1 : -1;
  });
  data.forEach(function(obj) {
    obj.range = [ obj.start, obj.end, obj.max, obj.min ];
    obj.trend = (obj.start <= obj.end) ? 0 : 1;
  });
  const chart = new F2.Chart({
    el: canvas
  });
  // 配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
  chart.axis('range', {
    label: {
      fontSize: 14
    }
  });
  // 配置time刻度文字样式
  const label = {
    fill: '#979797',
    font: '14px san-serif',
    offset: 6
  };
  chart.axis('time', {
    label(text, index, total) {
      const cfg = label;
      // 第一个点左对齐，最后一个点右对齐，其余居中，只有一个点时左对齐
      if (index === 0) {
        cfg.textAlign = 'start';
      }
      if (index > 0 && index === total - 1) {
        cfg.textAlign = 'end';
      }
      return cfg;
    }
  });
  chart.source(data, {
    range: {
      tickCount: 5
    },
    time: {
      tickCount: 3
    }
  });
  chart.schema().position('time*range')
    .color('trend', function(trend) {
      return [ '#C00000', '#19B24B' ][trend];
    })
    .shape('candle');
  chart.render();
});
