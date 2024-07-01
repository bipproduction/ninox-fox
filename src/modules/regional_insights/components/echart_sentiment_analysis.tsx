"use client"
import React, { useState } from 'react';
import { EChartsOption, color } from "echarts";
import EChartsReact from "echarts-for-react";
import { useShallowEffect } from '@mantine/hooks';
import { Box, Button, Center, Grid, Group, Text } from '@mantine/core';
import { COLOR_EMOTION, COLOR_EMOTION_NEW, WARNA } from '@/modules/_global';
import _ from 'lodash';

export default function EchartSentimentAnalysis({ dataEmotion, dataLocked }: { dataEmotion: any, dataLocked: any }) {
  const [options, setOptions] = useState<EChartsOption>({});
  const [dataChart, setDataChart] = useState<any>()

  const locked = dataLocked
    .filter((v: any) => v.idArea === dataEmotion.id)
    .map((itm: any) => Number(itm.value))

  useShallowEffect(() => {
    setDataChart(
      {
        mendukung: Number(dataEmotion.mendukung),
        mempertimbangkan: Number(dataEmotion.mempertimbangkan),
        tidaktahu: Number(dataEmotion.tidaktahu),
        tidakmendukung: Number(dataEmotion.tidakmendukung),
      }
    )
    loadData(dataChart)

  }, [dataEmotion, dataChart])

  const loadData = (dataLoad: any) => {
    const option: EChartsOption = {
      title: {
        text: "ANALISIS SENTIMEN",
        textStyle: {
          color: "white"
        }
      },
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
          splitLine: {
            lineStyle: {
              color: "gray",
              opacity: 0.5
            }
          },
          axisLabel: {
            formatter: `{value}`,
            color: "white"
          },
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '70%',
          data: Object.keys(dataLoad ?? []).map(
            (v: any) =>
            ({
              name: v,
              value: dataLoad[v],
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
        <EChartsReact style={{ height: 350, }} option={options} />
        <Group justify='space-between'>
          <Group pl={30}>
            <Box>
              <Text c={WARNA.merah_emotion} fz={15}>Suara Terkunci</Text>
              <Text ta={'center'} c={WARNA.hijau_emotion} fz={25} fw={'bold'}>{Intl.NumberFormat("id-ID").format(Number(locked))}</Text>
            </Box>
            <Box mr={20}>
              <Text c={WARNA.merah_emotion} fz={15}>Suara Terfilter</Text>
              <Text ta={'center'} c={WARNA.hijau_emotion} fz={25} fw={'bold'}>{Intl.NumberFormat("id-ID").format(Number(dataEmotion.filtered))}</Text>
            </Box>
          </Group>
        </Group>
      </Box>
    </>
  );
}
