// 차트 옵션들을 관리하는 파일

export const createBaseChartOptions = (isVisible: boolean) => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: isVisible ? 2000 : 0,
    easing: "easeInOutQuart" as const,
  },
  plugins: {
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      titleColor: "#fff",
      bodyColor: "#fff",
      borderColor: "rgba(255, 255, 255, 0.1)",
      borderWidth: 1,
      cornerRadius: 8,
      animation: {
        duration: 300,
      },
    },
  },
});

export const baseScalesOptions = {
  y: {
    beginAtZero: true,
    grid: {
      color: "rgba(0, 0, 0, 0.1)",
    },
    ticks: {
      color: "#6b7280",
    },
    animation: {
      duration: 1500,
    },
  },
  x: {
    grid: {
      display: false,
    },
    ticks: {
      color: "#6b7280",
    },
    animation: {
      duration: 1500,
    },
  },
};

export const createChartOptions = (isVisible: boolean) => {
  const baseChartOptions = createBaseChartOptions(isVisible);

  return {
    barOptions: {
      ...baseChartOptions,
      plugins: {
        ...baseChartOptions.plugins,
        legend: {
          display: false,
        },
      },
      scales: baseScalesOptions,
    },

    lineOptions: {
      ...baseChartOptions,
      plugins: {
        ...baseChartOptions.plugins,
        legend: {
          display: false,
        },
      },
      scales: baseScalesOptions,
    },

    doughnutOptions: {
      ...baseChartOptions,
      layout: {
        padding: {
          top: 10,
          bottom: 10,
          left: 10,
          right: 10,
        },
      },
      plugins: {
        ...baseChartOptions.plugins,
        legend: {
          position: "bottom" as const,
          labels: {
            color: "#6b7280",
            padding: 20,
            usePointStyle: true,
          },
        },
      },
    },
  };
};
