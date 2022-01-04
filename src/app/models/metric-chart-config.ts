import { MetricChartConfigItem } from "./metric-chart-config-item";

export interface MetricChartConfig {
    id: string,
    name: string,
    appKey?: string,
    instanceId?: string,
    metrics: MetricChartConfigItem[],
    resultCount: number
}