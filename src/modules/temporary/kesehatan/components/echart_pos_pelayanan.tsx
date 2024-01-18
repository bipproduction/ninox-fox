"use client"
import { Box } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { EChartsOption } from 'echarts';
import EChartsReact from 'echarts-for-react';
import React, { useState } from 'react';

export default function EchartPosPelayanan() {
  const [options, setOptions] = useState<EChartsOption>({});

  useShallowEffect(() => {
    loadData()
  }, [])

  async function loadData() {
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
          ['data',  'Jumlah pos pembinaan terpadu','Jumlah posyandu aktif'],
          // ['Denpasar', 280, 231],
          ['Denpasar', 459, 208],
          // ['Badung', 12, 212],
          // ['Giayar', 32, 33],
          // ['Buleleng', 23, 32],
          // ['Klungkung', 44, 43],
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
          splitLine: {
            lineStyle: {
              color: "gray",
              opacity: 0.1
            }
          },
          axisLabel: {
            color: "white"
          },
        }
      ],
      series: [
        {
        type: 'bar', itemStyle: {
          color: "orange"
        }
      },
        {
        type: 'bar', itemStyle: {
          color: "green"
        }
      },
    ]
    };
    setOptions(option)
  }

  return (
    <>
      <Box
        pt={10}
      >
        <EChartsReact style={{ height: 400 }} option={options} />
      </Box>
    </>
  );
}

