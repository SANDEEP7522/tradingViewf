import { useEffect, useRef } from 'react'
import {
  createChart,
  CandlestickSeries,
  HistogramSeries,
  ColorType,
  type UTCTimestamp,
} from 'lightweight-charts'
import type { Candle } from '@/types/nfo'

// "2026-06-19 09:18:00+05:30" → epoch seconds
const toTime = (s: string): UTCTimestamp =>
  Math.floor(new Date(s).getTime() / 1000) as UTCTimestamp

const CandleChart = ({ candles }: { candles: Candle[] }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const chart = createChart(ref.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#94a3b8',
      },
      grid: {
        vertLines: { color: '#1e293b' },
        horzLines: { color: '#1e293b' },
      },
      timeScale: { timeVisible: true, secondsVisible: false, borderColor: '#334155' },
      rightPriceScale: { borderColor: '#334155' },
      crosshair: { mode: 0 },
      autoSize: true,
    })

    // sorted + de-duped by time (lightweight-charts requirement)
    const sorted = [...candles].sort((a, b) => toTime(a.date) - toTime(b.date))

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#10b981',
      downColor: '#f43f5e',
      borderVisible: false,
      wickUpColor: '#10b981',
      wickDownColor: '#f43f5e',
    })
    candleSeries.setData(
      sorted.map((c) => ({
        time: toTime(c.date),
        open: c.open,
        high: c.high,
        low: c.low,
        close: c.close,
      })),
    )

    // volume histogram (bottom overlay)
    const volSeries = chart.addSeries(HistogramSeries, {
      priceScaleId: '',
      priceFormat: { type: 'volume' },
    })
    volSeries.priceScale().applyOptions({ scaleMargins: { top: 0.8, bottom: 0 } })
    volSeries.setData(
      sorted.map((c) => ({
        time: toTime(c.date),
        value: c.volume,
        color: c.close >= c.open ? '#10b98155' : '#f43f5e55',
      })),
    )

    chart.timeScale().fitContent()

    return () => chart.remove()
  }, [candles])

  return <div ref={ref} className="h-[440px] w-full" />
}

export default CandleChart
