import Chart from 'react-apexcharts';

const CircleChart = ({ a: requestedPlace, b: fetchedPlace }) => {
  const options = {
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          margin: 0,
          size: '70%',
          background: '#fff',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: '#f2f2f2',
          strokeWidth: '97%',
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35,
          },
        },

        dataLabels: {
          showOn: 'always',
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '13px',
          },
          value: {
            formatter: (val) => {
              return parseInt('10', val);
            },
            color: '#111',
            fontSize: '30px',
            show: true,
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        gradientToColors: ['#ABE5A1', '#52BA97'],
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: 'round',
    },
    labels: ['Requested Places', 'Fetched Places'],
  };

  const series = [requestedPlace, fetchedPlace];

  return (
    <div id="chart">
      <Chart options={options} series={series} type="radialBar" height={350} />
    </div>
  );
};

export default CircleChart;
