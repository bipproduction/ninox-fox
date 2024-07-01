'use client'
import React, { useState } from 'react';
import { EChartsOption, color } from "echarts";
import EChartsReact from "echarts-for-react";
import { useShallowEffect } from '@mantine/hooks';
import * as echarts from 'echarts';
import { Box, Button, Divider, Group, LoadingOverlay, Menu } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

export default function NewChartCandidate() {
  const [options, setOptions] = useState<EChartsOption>({});

  useShallowEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const option: EChartsOption = {
      color: ['green', 'gray', 'red'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['24 Mei', '25 Mei', '26 Mei', '27 Mei', '28 Mei', '29 Mei', '30 Mei'],
          axisLabel: {
            color: "white",
            rotate: 30
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
        },
      ],
      series: [
        {
          name: 'Positive',
          type: 'line',
          showSymbol: false,
          data: [0, 0, 0, 0, 0, 0, 0],
          stack: 'z',
          color: 'green',
          areaStyle: {
            opacity: 1,
            // color: "#076918"
            color: new echarts.graphic.LinearGradient(1, 1, 1, 0, [
              {
                offset: 0,
                color: 'rgb(35,13,55)'
              },
              {
                offset: 1,
                color: 'rgba(8,106,24,1)'
              }
            ])
          },
          smooth: true,
        },
        {
          name: 'Neutral',
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: [0, 0, 0, 0, 0, 0, 0],
          color: "#EBEBEB",
          stack: 'x',
          areaStyle: {
            opacity: 1,
            // color: "#FFFFFF"
            color: new echarts.graphic.LinearGradient(1, 1, 1, 0, [
              {
                offset: 0,
                color: 'rgb(35,13,55)'
              },
              {
                offset: 1,
                color: 'rgba(255,255,255,1)'
              }
            ])
          }
        },
        {
          name: 'Negative',
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: [0, 0, 0, 0, 0, 0, 0],
          color: "red",
          stack: 'y',
          areaStyle: {
            opacity: 1,
            // color: "#A71211"
            color: new echarts.graphic.LinearGradient(1, 1, 1, 0, [
              {
                offset: 0,
                color: 'rgb(35,13,55)'
              },
              {
                offset: 1,
                color: 'rgba(124,3,13,1)'
              }
            ])
          }
        },

      ]
    }
    setOptions(option);
  }
  return (
    <>
      <Group justify='flex-end'>
        <Group>
          <Button size="xs">Minggu</Button>
          <Divider orientation="vertical" />
          <Button size="xs">Bulan</Button>
          <Divider orientation="vertical" />
          <Menu  position='bottom-end'>
            <Menu.Target>
              <Button size="xs">Kustom</Button>
            </Menu.Target>
            <Menu.Dropdown p={20}>
              <DatePicker
                type="range"
              />
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
      <Box
      >
        <EChartsReact style={{ height: 320, }} option={options} />
      </Box>
    </>
  );
}