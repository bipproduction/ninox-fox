'use client'
import React, { useState } from 'react';
import { EChartsOption, color } from "echarts";
import EChartsReact from "echarts-for-react";
import { useShallowEffect } from '@mantine/hooks';
import { Box, Center } from '@mantine/core';

export default function EchartPopularityBarDummy() {
  const [options, setOptions] = useState<EChartsOption>({})

  useShallowEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const option: EChartsOption = {
      legend: {
        bottom: "0%",
        textStyle: {
          color: "white"
        }
      },
      tooltip: {},
      dataset: {
        source: [
          ['data', 'Potensi Mendukung', 'Mempertimbangkan', 'Tidak Tahu', 'Potensi Tidak Mendukung'],
          [``, 43, 22, 67, 27],
        ]
      },
      xAxis: [
        {
          type: 'category',
          axisLabel: {
            color: "white",
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          show: true,
          max: "100",
          splitLine: {
            lineStyle: {
              color: "gray",
              opacity: 0.5
            }
          },
          axisLabel: {
            formatter: `{value}% `,
            color: "white"
          },
        }
      ],
      series: [
        {
          type: 'bar',
          label: {
            show: true,
            position: 'inside',
            color: 'white',
            formatter: function (params: any) {
              return params.value[1] + "%";
            },
          },
          itemStyle: {
            color: "#40BF56",
          }
        },
        {
          type: 'bar', itemStyle: {
            color: "#FAB007"
          },
          label: {
            show: true,
            position: 'inside',
            color: 'white',
            formatter: function (params: any) {
              return params.value[2] + "%";
            },
          },
        },
        {
          type: 'bar', itemStyle: {
            color: "#858E96"
          },
          label: {
            show: true,
            position: 'inside',
            color: 'white',
            formatter: function (params: any) {
              return params.value[3] + "%";
            },
          },
        },
        {
          type: 'bar', itemStyle: {
            color: "#F95252"
          },
          label: {
            show: true,
            position: 'inside',
            color: 'white',
            formatter: function (params: any) {
              return params.value[4] + "%";
            },
          },
        },
      ]
    };
    setOptions(option)
  }
  return (
    <>
      <Box pt={0}>
        <EChartsReact style={{ height: 400 }} option={options} />
      </Box>
    </>
  );
}

