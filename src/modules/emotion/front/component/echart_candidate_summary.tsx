'use client'
import React, { useState } from 'react';
import { EChartsOption, color } from "echarts";
import EChartsReact from "echarts-for-react";
import { useShallowEffect } from '@mantine/hooks';
import * as echarts from 'echarts';
import { Box, Button, Divider, Group, LoadingOverlay, Menu } from '@mantine/core';
import moment from 'moment';
import { DatePicker } from '@mantine/dates';
import toast from 'react-simple-toasts';
import { funGetEmotionChartNew } from '../..';

export default function EchartCandidateSummary({ data, candidate }: { data: any, candidate: any }) {
    const [options, setOptions] = useState<EChartsOption>({})
    const [listData, setListData] = useState(data)
    const [value, setValue] = useState<[Date | null, Date | null]>([null, null])
    const [showPopDate, setPopDate] = useState(false)
    const [isButton, setButton] = useState('week')
    const [newDateStart, setNewDateStart] = useState(moment(new Date("2023-09-01")).format("YYYY-MM-DD"))
    const [newDateEnd, setNewDateEnd] = useState(moment(new Date()).format("YYYY-MM-DD"))
    const [okButton, setOkButton] = useState(false)
    const [isLoadingMonth, setLoadingMonth] = useState(false)
    const [isLoadingWeek, setLoadingWeek] = useState(false)
    const [isLoadingCustom, setLoadingCustom] = useState(false)
    const [loadingData, setLoadingData] = useState(false)

    async function onChooseTime(time: any) {
        let startDate
        setButton(time)
        let endDate = moment(new Date()).format('YYYY-MM-DD')
        if (time == 'month') {
            setLoadingMonth(true)
            setLoadingData(true)
            startDate = moment(new Date()).subtract(1, "months").format("YYYY-MM-DD")
        } else if (time == 'week') {
            setLoadingWeek(true)
            setLoadingData(true)
            startDate = moment(new Date()).subtract(7, "days").format("YYYY-MM-DD");
        } else if (time == 'custom') {
            setLoadingCustom(true)
            setLoadingData(true)
            startDate = newDateStart
            endDate = newDateEnd
        }

        if (time == 'custom') setPopDate(false)

        const loadChart = await funGetEmotionChartNew({ candidate: candidate.id, startDate: startDate, endDate: endDate })
        setListData(loadChart)
        loadData(loadChart)
        setLoadingCustom(false)
        setLoadingMonth(false)
        setLoadingWeek(false)
        setLoadingData(false)

    }

    useShallowEffect(() => {
        loadData(listData)
    }, [listData])

    const loadData = (dataChart: any) => {
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
                    data: !dataChart
                        ? []
                        : dataChart!.map((v: any) => v.date),
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
                    data: !dataChart
                        ? []
                        : dataChart!.map((v: any) => v.positive),
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
                    data: !dataChart
                        ? []
                        : dataChart!.map((v: any) => v.neutral),
                    color: "#f5f5f5",
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
                    data: !dataChart
                        ? []
                        : dataChart!.map((v: any) => v.negative),
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
            <Box>
                <Group justify='flex-end'>
                    <Group>
                        <Button size="xs" loading={isLoadingWeek} variant={(isButton == 'week') ? 'filled' : 'subtle'} c={"white"} onClick={() => onChooseTime('week')}>Minggu</Button>
                        <Divider orientation="vertical" />
                        <Button size="xs" loading={isLoadingMonth} variant={(isButton == 'month') ? 'filled' : 'subtle'} c={"white"} onClick={() => onChooseTime('month')}>Bulan</Button>
                        <Divider orientation="vertical" />
                        <Menu opened={showPopDate} position='bottom-end'>
                            <Menu.Target>
                                <Button size="xs" loading={isLoadingCustom} variant={(isButton == 'custom') ? 'filled' : 'subtle'} c={"white"} onClick={() => setPopDate(true)}>Kustom</Button>
                            </Menu.Target>
                            <Menu.Dropdown p={20}>
                                <DatePicker
                                    type="range"
                                    value={value}
                                    minDate={new Date('2023-09-01')}
                                    maxDate={new Date()}
                                    onChange={(v) => {
                                        setValue(v)
                                        if (v[0] && v[1]) {
                                            const diferent = moment(v[1]).diff(
                                                moment(v[0]),
                                                "days"
                                            );

                                            if (diferent < 8)
                                                return toast('Please select date more than 7 days, or user 1 week option button', { theme: 'dark' });
                                            setNewDateStart(moment(v[0]).format("YYYY-MM-DD"))
                                            setNewDateEnd(moment(v[1]).format("YYYY-MM-DD"))
                                            setOkButton(true);
                                        } else {
                                            setOkButton(false);
                                        }
                                    }
                                    }
                                />
                                <Group justify="space-between" mt={10} >
                                    <Button
                                        onClick={() => setPopDate(false)}
                                        w={100}
                                        p={10}
                                        variant="outline"
                                        style={{
                                            backgroundColor: 'white'
                                        }}
                                    >
                                        BATAL
                                    </Button>
                                    {okButton && (
                                        <Button
                                            onClick={() => { onChooseTime('custom') }}
                                            w={100}
                                            variant="filled"
                                        >
                                            OK
                                        </Button>
                                    )}
                                </Group>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Group>
                <Box pos={"relative"}>
                    <LoadingOverlay
                        visible={loadingData}
                        overlayProps={{ radius: "sm", blur: "8px", bg: "rgba(27,11,47,0.8)" }}
                        loaderProps={{ color: "white" }}
                    />
                    <EChartsReact style={{
                        height: 320
                    }} option={options} />
                </Box>
            </Box>
        </>
    );
}
