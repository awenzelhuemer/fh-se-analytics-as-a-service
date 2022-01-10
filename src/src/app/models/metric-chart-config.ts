import { MetricChartConfigItem } from "./metric-chart-config-item";
import { MetricChartSize } from "./metric-chart-size";

export interface MetricChartConfig {
    id: string,
    name: string,
    appKey?: string,
    instanceId?: string,
    metrics: MetricChartConfigItem[],
    resultCount: number,
    size: MetricChartSize
}