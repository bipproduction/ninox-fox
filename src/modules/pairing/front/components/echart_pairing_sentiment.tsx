"use client"
import React, { useState } from 'react';
import { EChartsOption, color } from "echarts";
import EChartsReact from "echarts-for-react";
import { useShallowEffect } from '@mantine/hooks';
import { Box, Group, Text } from '@mantine/core';
import _ from 'lodash';
import { COLOR_EMOTION, COLOR_EMOTION_NEW } from '@/modules/_global';

const dataKabupaten = [
  {
    id: 1,
    name: "DENPASAR"
  },
  {
    id: 2,
    name: "BADUNG"
  },
  {
    id: 3,
    name: "BULELENG"
  },
  {
    id: 4,
    name: "BANGLI"
  },
  {
    id: 5,
    name: "GIANYAR"
  },
  {
    id: 6,
    name: "JEMBRANA"
  },
  {
    id: 7,
    name: "KARANGASEM"
  },
  {
    id: 8,
    name: "KLUNGKUNG"
  },
  {
    id: 9,
    name: "TABANAN"
  },
]

export default function EchartPairingSentiment({ data }: { data: any }) {
  const [options, setOptions] = useState<EChartsOption>({})
  const [dataChart, setDataChart] = useState<any>()

  useShallowEffect(() => {
    setDataChart({
      mendukung: data.mendukung,
      mempertimbangkan: data.mempertimbangkan,
      tidaktahu: data.tidaktahu,
      tidakmendukung: data.tidakmendukung,
    })

    loadData(dataChart)

  }, [dataChart, data])

  const loadData = (dataLoad: any) => {
    const option: EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
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
          data: ['Potensi Mendukung', 'Mempertimbangkan', 'Tidak Tahu', 'Potensi Tidak Mendukung'],
          axisLabel: {
            // rotate: 45,
            color: "white",
            fontSize: 10
          },
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            show: true,
          },
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
            color: "white",
            formatter: (a: any) => {
              return `${a}%`;
            },
          },
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '70%',
          data: Object.keys(dataChart ?? []).map(
            (v: any) =>
            ({
              name: v,
              value: dataChart[v],
              itemStyle: {
                color:
                  COLOR_EMOTION_NEW.find((v2) => _.lowerCase(v2.name) == v)
                    ?.color ?? "gray",
              },
            })
          ),
        }
      ]
    };
    setOptions(option);
  }

  return (
    <>
      <Box
        style={{
          background: "rgba(0,0,0,0.3)",
          padding: 10,
          borderRadius: 10
        }}
      >
        <Group justify='space-between'>
          <Text fz={25} ml={20} fw={"bold"} c={"white"}>{_.upperCase(data.name)}</Text>
          <Text fz={16} mr={20} c={"white"}>ANALISIS SENTIMEN</Text>
        </Group>
        <EChartsReact style={{ height: 500, width: "100%" }} option={options} />
      </Box>

    </>
  );
}
